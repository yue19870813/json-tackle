const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  ////// === main page === //////
  openAbout: (title) => ipcRenderer.send('open-about', title),
  readFile: (path, flag) => ipcRenderer.send('read-file', path, flag),
  onUpdateJson: (callback) => ipcRenderer.on('update-json', (_event, data, flag) => callback(data, flag)),
  onCompareDiffs: (callback) => ipcRenderer.on('compare-diffs', (_event, diffs) => callback(diffs)),
  onPrint: (callback) => ipcRenderer.on('print', (_event, args) => callback(args)),
  ////// === about page === //////
  // 监听md文本转换成html内容
  onMDtoHtml: (callback) => ipcRenderer.on('md-to-html', (_event, html) => callback(html)),
})