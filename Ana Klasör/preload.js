const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    readHelpData: () => ipcRenderer.invoke('read-help-data')
});