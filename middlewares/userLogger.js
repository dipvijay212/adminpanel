const fs = require('fs');
const path = require('path');

const userLogger = (username, role) => {
    const log = `${new Date().toISOString()} - Username: ${username}, Role: ${role}\n`;
    fs.appendFile(path.join(__dirname, '../log.txt'), log, (err) => {
        if (err) console.error('Failed to write log:', err);
    });
};

module.exports = userLogger;
