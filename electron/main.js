const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const DB_QUERYS = require('./db/querys.cjs');

let mainWindow;
let infoWindow = null;

// Manejar la solicitud de abrir un enlace externo
ipcMain.handle('open-external', async (_, url) => {
  await shell.openExternal(url);
});

// Eventos DB
ipcMain.handle('db-select-all', () => DB_QUERYS.selectAll());
// ipcMain.handle('db-select', (_, id) => DB_QUERYS.select(id));
ipcMain.handle('db-insert', (_, plaform, username, password, creationDate) => {
  DB_QUERYS.insert(plaform, username, password, creationDate);
});
ipcMain.handle('db-delete', (_, id) => DB_QUERYS.remove(id));
ipcMain.handle('db-update-platform', (_, id, newValue) => DB_QUERYS.updatePlatform(id, newValue));
ipcMain.handle('db-update-username', (_, id, newValue) => DB_QUERYS.updateUsername(id, newValue));
ipcMain.handle('db-update-password', (_, id, newValue) => DB_QUERYS.updatePassword(id, newValue));
ipcMain.handle('db-update-date', (_, id, newValue) => DB_QUERYS.updateDate(id, newValue));

// Eventos de la aplicación
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
    icon: path.join(__dirname, '../assets/icons/safe-box.png')
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.setMenu(null);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('open-info-window', () => {
  if (infoWindow) {
    infoWindow.focus();
    return;
  }

  infoWindow = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: false,
    minimizable: false,
    maximizable: false,
    modal: true,
    parent: BrowserWindow.getFocusedWindow(),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../assets/icons/safe-box.png')
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    infoWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}info.html`);
    infoWindow.webContents.openDevTools();
  } else {
    infoWindow.loadFile(path.join(__dirname, '../dist/info.html'));
  }

  infoWindow.setMenu(null);

  infoWindow.once('ready-to-show', () => {
    infoWindow.show();
  });

  infoWindow.on('closed', () => {
    infoWindow = null;
  });
});

ipcMain.handle('close-info-window', () => {
  if (infoWindow) {
    infoWindow.close();
  }
});
