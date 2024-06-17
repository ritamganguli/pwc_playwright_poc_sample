const { exec } = require('child_process');

const searchString = process.argv[2];

if (!searchString) {
    console.error('Please provide a search string.');
    process.exit(1);
}

// Construct the command to find files containing the search string
const findCommand = `grep -r "${searchString}" tests | awk -F':' '{print $1}' | sort -u`;

exec(findCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing find command: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Find command error: ${stderr}`);
        return;
    }

    // Extract file paths from the output
    const filePaths = stdout.split('\n').filter(filePath => filePath);

    if (filePaths.length === 0) {
        console.log('No files found containing the search string.');
        return;
    }

    // Use the first file path for the next search
    const firstFilePath = filePaths[0];
    // console.log(`First file path: ${firstFilePath}`);

    // Construct the command to search for 'test("' in the found files
    const searchCommand = `grep -E 'test\\("' "${firstFilePath}"`;

    exec(searchCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing search command: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Search command error: ${stderr}`);
            return;
        }

        // Process the matching lines to extract test names
        const matchingLines = stdout.split('\n')
            .map(line => {
                const match = line.match(/test\("([^"]+)"/);
                return match ? match[1] : null;
            })
            .filter(testName => testName);

        // Print the command for each test name
        matchingLines.forEach(testName => {
            console.log(`npx playwright test ${firstFilePath} -g "${testName}"`);
        });
    });
});
