const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config');
let win;


function createWindow () {
  const { screen } = require('electron');
  let display = screen.getPrimaryDisplay();
  let posY = display.bounds.height - config.height;
  win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });

  win.loadURL(`file:///${__dirname}/index.html`);

  //win.setIgnoreMouseEvents(true);

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  globalShortcut.register(config.clickableToggleHotkey, (function(){
    let bool = false;
    return () => {
      if (win){
        bool = !bool;
        win.setIgnoreMouseEvents(bool);
      }
    }
  })())

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
