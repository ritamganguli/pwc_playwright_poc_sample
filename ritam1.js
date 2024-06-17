const fs = require('fs');
const path = require('path');

// Function to recursively find files containing the search string
const findFilesContainingString = (dir, searchString, callback) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return callback(err);
        let pending = list.length;
        if (!pending) return callback(null, results);
        list.forEach(file => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (err) return callback(err);
                if (stat && stat.isDirectory()) {
                    findFilesContainingString(file, searchString, (err, res) => {
                        if (err) return callback(err);
                        results = results.concat(res);
                        if (!--pending) callback(null, results);
                    });
                } else {
                    fs.readFile(file, 'utf8', (err, data) => {
                        if (err) return callback(err);
                        if (data.includes(searchString)) {
                            results.push(file);
                        }
                        if (!--pending) callback(null, results);
                    });
                }
            });
        });
    });
};

// Function to extract test names from a file
const extractTestNames = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err);
        const testNames = [];
        const regex = /test\("([^"]+)"/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
            testNames.push(match[1]);
        }
        callback(null, testNames);
    });
};

// Main function to find files and extract test names
const main = () => {
    const searchString = process.argv[2];

    if (!searchString) {
        console.error('Please provide a search string.');
        process.exit(1);
    }

    console.log(`Searching for files containing: ${searchString}`);

    findFilesContainingString('tests', searchString, (err, filePaths) => {
        if (err) {
            console.error(`Error finding files: ${err.message}`);
            return;
        }

        if (filePaths.length === 0) {
            console.log('No files found containing the search string.');
            return;
        }

        console.log(`Found files: ${filePaths.join(', ')}`);

        const firstFilePath = filePaths[0];
        console.log(`Processing file: ${firstFilePath}`);

        extractTestNames(firstFilePath, (err, testNames) => {
            if (err) {
                console.error(`Error extracting test names: ${err.message}`);
                return;
            }

            if (testNames.length === 0) {
                console.log('No test names found in the file.');
                return;
            }

            console.log('Found test names:');
            testNames.forEach(testName => {
                console.log(`npx playwright test ${firstFilePath} -g "${testName}"`);
            });
        });
    });
};

main();
