const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('fs');
const compare  = require('fast-json-patch').compare;

const createWindow = () => {
    let leftJson = null;
    let rightJson = null;
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        width: 1200,
        height: 1000
    })

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
            win.setTitle(title)
        }
    )

    ipcMain.on('read-file', (event, path, flag) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
                mainWindow.webContents.send('update-json', data, flag);
                compareHandle(data, flag);
            }
        });
    })

    // 定义一个函数来替换路径指定的值
    function updateJsonValue(obj, path, newValue, style) {
        // 移除开头的斜杠，并将路径分割成部分
        const parts = path.substring(1).split('/');
        // 初始化正在处理的对象
        let currentPart = obj;
        // 遍历所有的部分，除了最后一个
        for (let i = 0; i < parts.length - 1; i++) {
        currentPart = currentPart[parts[i]];
        }
        // 取得最后一个部分
        const lastPart = parts[parts.length - 1];
        if (newValue == null || newValue === '') {
            // 替换值
            currentPart[lastPart] = '<span class=' + style + '>' + currentPart[lastPart] + '</span>';
        } else {
            currentPart[lastPart] = '<span class=' + style + '>' + newValue + '</span>';
        }
    }

    function compareHandle(jsonData, flag)
    {
        if (flag === 'left')
        {
            leftJson = jsonData;
        } else {
            rightJson = jsonData;
        }
        if (leftJson != null && rightJson != null)
        {
            let rightJsonObj = JSON.parse(rightJson);
            let leftJsonObj = JSON.parse(leftJson);
            let diffs = compare(leftJsonObj, rightJsonObj);
            mainWindow.webContents.send('compare-diffs', diffs);
            console.log(diffs);
            // 处理左侧json：将remove部分标记出来 | 处理右侧json：将replace和add部分标记出来
            let jsonLeftString = "";
            let jsonRightString = "";
            // jsonRightString = addHighlight(jsonRightString, change.path, change.value);
            diffs.forEach(change => {
                if (change.op === 'remove') {
                    updateJsonValue(leftJsonObj, change.path, null, 'red-text');
                } else if (change.op === 'add') {
                    updateJsonValue(rightJsonObj, change.path, change.value, 'blue-text');
                } else {
                    updateJsonValue(rightJsonObj, change.path, change.value, 'yellow-text');
                    updateJsonValue(leftJsonObj, change.path, null, 'yellow-text');
                }
            });
            jsonRightString = JSON.stringify(rightJsonObj,null, 2);
            jsonLeftString = JSON.stringify(leftJsonObj,null, 2);
            console.log(jsonLeftString);
            console.log(jsonRightString);
            mainWindow.webContents.send('update-json', jsonRightString, 'right');
            mainWindow.webContents.send('update-json', jsonLeftString, 'left');
        }
    }

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})