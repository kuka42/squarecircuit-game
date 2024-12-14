const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let win;

function createWindow() {
  const iconPath = path.join(__dirname, 'icon.ico'); // Path to the icon

  win = new BrowserWindow({
    fullscreen: true,  // Makes the window fullscreen
    frame: false,      // Removes window frame
    webPreferences: {
      nodeIntegration: true
    },
    icon: iconPath     // Set the icon
  });

  win.loadFile('sc.html');

  // Optionally, hide the menu bar
  win.setMenu(null);

  // Add the ESC key listener to quit the app
  win.webContents.on('keydown', (e) => {
    if (e.key === 'Escape') {
      app.quit();  // Close the application when ESC is pressed
    }
  });

  // Register the ESC key globally for the entire app, so even when the window is not focused, ESC quits the app
  globalShortcut.register('Escape', () => {
    app.quit();  // Close the application when ESC is pressed
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Unregister the global ESC key when the app quits
app.on('will-quit', () => {
  globalShortcut.unregister('Escape');
});
