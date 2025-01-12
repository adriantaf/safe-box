const { app, BrowserWindow, ipcMain, shell, autoUpdater, dialog } = require('electron');
const path = require('path');
const DB_QUERYS = require('./db/querys.cjs');

let mainWindow;

// Manejar la solicitud de abrir un enlace externo
ipcMain.handle('open-external', async (_, url) => {
  await shell.openExternal(url);
});

// Eventos DB
ipcMain.handle('db-select-all', () => DB_QUERYS.selectAll());
ipcMain.handle('db-select', (_, id) => DB_QUERYS.select(id));
ipcMain.handle('db-insert', (_, plaform, username, password, creationDate) => {
  DB_QUERYS.insert(plaform, username, password, creationDate);
});
ipcMain.handle('db-delete', (_, id) => DB_QUERYS.remove(id));
ipcMain.handle('db-update-platform', (_, id, newValue) => DB_QUERYS.updatePlatform(id, newValue));
ipcMain.handle('db-update-username', (_, id, newValue) => DB_QUERYS.updateUsername(id, newValue));
ipcMain.handle('db-update-password', (_, id, newValue) => DB_QUERYS.updatePassword(id, newValue));
ipcMain.handle('db-update-date', (_, id, newValue) => DB_QUERYS.updateDate(id, newValue));

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../assets/icons/safe-box.ico')
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.setMenu(null);
  }

  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Event listeners for autoUpdater
autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Actualización disponible',
    message: 'Hay una nueva versión disponible. Se descargará en segundo plano.',
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: 'Actualización lista',
      message: 'Se ha descargado una nueva versión. ¿Quieres reiniciar la aplicación para actualizar?',
      buttons: ['Reiniciar', 'Más tarde'],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});