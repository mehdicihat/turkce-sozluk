const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: "Türkçe Sözlük v13",
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        app.quit();
    });
}

app.whenReady().then(() => {
    ipcMain.handle('read-help-data', async () => {
        try {
            const filePath = path.join(__dirname, 'help', 'help-data.json');
            
            const rawData = await fs.readFile(filePath, 'utf-8');
            
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Yardım dosyası okunamadı:', error);
            throw error; 
        }
    });

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});