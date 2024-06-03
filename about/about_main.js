const { app, BrowserWindow, ipcMain } = require('electron/main')

let about = {};

function showAbout () {
    fs.readFile("./../README.md", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });
}

about.showAbout = showAbout;

module.exports = about;