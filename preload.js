const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  readFile: (path, flag) => ipcRenderer.send('read-file', path, flag),
  onUpdateJson: (callback) => ipcRenderer.on('update-json', (_event, data, flag) => callback(data, flag)),
  onCompareDiffs: (callback) => ipcRenderer.on('compare-diffs', (_event, diffs) => callback(diffs)),
})