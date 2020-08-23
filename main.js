const electron = require('electron')
const url = require('url')
const path = require('path')
const http = require('http')
const config = require('./config.json')

const { app, BrowserWindow, Menu} = electron
const { shell } = require('electron')
const { remote } = require('electron')

const port = config.port
const ngrokServer = config.ngrok
const herokuServer = config.heroku

let localWindow
let ngrokWindow
let herokuWindow
let mainWindow

app.on('ready', () => {

    /* CREATE WINDOW */
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences:{
            nodeIntegration: false
        }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes:true
    }))

    /* QUIT APP ON CLOSED */
    mainWindow.on('closed', () => {
        app.quit()
    })

    const MainMenu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(MainMenu)

})

function onLocalhost() {
    /* CREATE WINDOW */
    localWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Localhost',
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration: false
        }
    })

    localWindow.loadURL('http://localhost:' + port)

    /* QUIT APP ON CLOSED */
    localWindow.on('closed', () => {
        localWindow = null
    })
}

function onNgrok() {
    /* CREATE WINDOW */
    ngrokWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Ngrok',
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration: false
        }
    })

    ngrokWindow.loadURL(ngrokServer)

    /* QUIT APP ON CLOSED */
    ngrokWindow.on('closed', () => {
        ngrokWindow = null
    })
}


function onHeroku() {
    /* CREATE WINDOW */
    herokuWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Heroku',
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration: false
        }
    })

    herokuWindow.loadURL(herokuServer)

    /* QUIT APP ON CLOSED */
    herokuWindow.on('closed', () => {
        herokuWindow = null
    })
}

const template = [
    {
        label: "Select Server",
        submenu: [
            {
                label: "Localhost",
                click() {
                    onLocalhost()
                }
            },
            {
                label: "Ngrok",
                click() {
                    onNgrok()
                }
            },
            {
                label: "Heroku",
                click() {
                    onHeroku()
                }
            }
        ]
    }, 
    {
        label: "Config",
        submenu: [
            {
                label: "Open config.json",
                click() {
                    shell.openExternal(url.format({
                        pathname: path.join(__dirname, 'config.json'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
            }
        ]
    }
]



