const { app, BrowserWindow } = require('electron') 
const path = require('path') 
function createWindow () { 
  const win = new BrowserWindow({ 
    width: 400, 
    height: 600, 
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation : false
    } 
  }) 
  win.loadURL("http://127.0.0.1:3000")
} 
app.whenReady().then(() => { 
  createWindow() 
}) 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})