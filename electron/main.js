/*
 * Copyright [2025] [Adrian Tafoya Morales]
 *
 * Licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).
 * You may not use this software for commercial purposes.
 * For more details, visit: https://creativecommons.org/licenses/by-nc/4.0/
 */

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const DB_QUERYS = require('./db/querys.cjs');

let mainWindow;

// Manejar la solicitud de abrir un enlace externo
ipcMain.handle('open-external', async (_, url) => {
  await shell.openExternal(url);
});

// Eventos DB
ipcMain.handle('db-select-all', () => DB_QUERYS.selectAll());
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
    minWidth: 600,
    minHeight: 400,
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
