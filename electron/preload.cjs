const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  db: {
    selectAll: () => ipcRenderer.invoke('db-select-all'),
    insert: (platform, username, password, creationDate) => ipcRenderer.invoke('db-insert', platform, username, password, creationDate),
    delete: (id) => ipcRenderer.invoke('db-delete', id),
    updatePlatform: (id, newValue) => ipcRenderer.invoke('db-update-platform', id, newValue),
    updateUsername: (id, newValue) => ipcRenderer.invoke('db-update-username', id, newValue),
    updatePassword: (id, newValue) => ipcRenderer.invoke('db-update-password', id, newValue),
    updateDate: (id, newValue) => ipcRenderer.invoke('db-update-date', id, newValue),
  },
  openInfoWindow: () => ipcRenderer.invoke('open-info-window'),
  closeInfoWindow: () => ipcRenderer.invoke('close-info-window')
});