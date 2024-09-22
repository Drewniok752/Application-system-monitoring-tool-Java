const { exec } = require('child_process');
const fs = require('fs');

// Applications to check
const applicationsToCheck = [
    'chrome.exe',
    'notepad.exe',
    'calc.exe'
];

// Function to check if applications are running
function checkApplications(callback) {
    exec('tasklist', (error, stdout) => {
        const results = applicationsToCheck.map(app => {
            const isRunning = stdout.toLowerCase().includes(app.toLowerCase());
            return `Application ${app} is ${isRunning ? 'running' : 'not running'}.`;
        });
        callback(results);
    });
}

// Function to get system metr

// Run checks and save to file
function runChecks() {
    checkApplications(appResults => {
        getSystemMetrics(systemMetrics => {
            const output = [
                ...appResults,
                '',
                'System Metrics:',
                systemMetrics
            ].join('\n');

            fs.writeFileSync('appCheckResults.txt', output);
            console.log('Results saved to appCheckResults.txt');
        });
    });
}

// Execute the checks
runChecks();

