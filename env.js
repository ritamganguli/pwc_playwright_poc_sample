const fs = require('fs');
const path = require('path');

function updateConfig(env, setBaseline) {
    const configPath = path.join(__dirname, 'config', 'testConfig.json');

    if (!fs.existsSync(configPath)) {
        console.error('Config file does not exist:', configPath);
        process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    config.env = env;
    config.setBaseline = setBaseline;

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

    console.log('Configuration updated successfully.');
}

const [, , env, setBaseline] = process.argv;

if (!env || (setBaseline !== 'true' && setBaseline !== 'false')) {
    console.error('Usage: node updateConfig.js <env> <setBaseline>');
    process.exit(1);
}

updateConfig(env, setBaseline === 'true');
