import {app, BrowserWindow, Menu} from 'electron'
import fs from 'fs'
import {join, resolve} from 'path'
import {format} from 'url'
import ipc from './ipc'
import {setMenu} from './menu'
import * as console from 'electron-log'
import {autoUpdater} from 'electron-updater'

console.transports.console.level = 'silly'
console.transports.file.level = 'info'
autoUpdater.logger = console

let isHandleSchemeWhenStart = false
const gotTheLock = app.requestSingleInstanceLock()
// const gotTheLock = true
if (!gotTheLock) {
  app.quit()
} else {
  /**
   * Workaround for TypeScript bug
   * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
   */
  const env = import.meta.env
  console.log('env', env)

  setMenu()

  // Install "Vue.js devtools BETA"
  if (env.MODE === 'development') {
    require('electron-debug')()
    app
      .whenReady()
      .then(() => import('electron-devtools-installer'))
      .then(({default: installExtension}) => {
        /** @see https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg */
        const VUE_DEVTOOLS_BETA = 'ljjemllljcmogpfapbkkighbhhppjdbg'
        return installExtension(VUE_DEVTOOLS_BETA)
        return
      })
      .catch((e) => console.error('Failed install extension:', e))
  }

  let mainWindow: BrowserWindow | null = null

  async function createWindow() {
    console.log('createWindow')
    mainWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs.js'),
        contextIsolation: env.MODE !== 'test', // Spectron tests can't work with contextIsolation: true
        enableRemoteModule: env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
        nodeIntegration: true,
        webSecurity: false
      }
    })

    ipc.init(mainWindow)

    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test
     */
    const URL =
      env.MODE === 'development'
        ? env.VITE_DEV_SERVER_URL
        : format({
            protocol: 'file',
            pathname: join(__dirname, '../renderer/index.html'),
            slashes: true
          })

    await mainWindow.loadURL(URL)
    mainWindow.maximize()
    mainWindow.show()
    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('did-finish-load' + process.env.START_MINIMIZED)
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined')
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize()
      } else {
        mainWindow.show()
        mainWindow.focus()
      }
    })

    mainWindow.on('closed', () => {
      mainWindow = null
      ipc.close()
    })

    if (env.MODE === 'development') {
      mainWindow.webContents.openDevTools()
    }

    if (!isHandleSchemeWhenStart) {
      // 程序启动时，检查是否需要处理scheme， 如果已经处理过，下次跳过不重复处理, 只在windows 下有效， macos下走 open-url
      handleArgv(process.argv)
      isHandleSchemeWhenStart = true
    }
  }

  app.on('second-instance', (event, argv) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
    if (process.platform === 'win32') {
      // Windows
      handleArgv(argv)
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app
    .whenReady()
    .then(() => {
      createWindow()
    })
    .catch((e) => console.error('Failed create window:', e))

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
  })

  // Auto-updates
  // if (env.MODE !== 'development') {
  app
    .whenReady()
    .then(() => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e))
  // }

  // custom scheme url
  const PROTOCOL = 'datahu'
  const args = []
  if (!app.isPackaged) {
    args.push(resolve(process.argv[1]))
  }
  args.push('--')

  app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, args)

  // macOS
  app.on('open-url', (event, urlStr) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
    handleUrl(urlStr)
  })

  function handleArgv(argv: any) {
    const prefix = `${PROTOCOL}:`
    const offset = app.isPackaged ? 1 : 2
    if (argv && argv.length > 0) {
      const url = argv.find(
        (arg: any, i: any) => i >= offset && arg.startsWith(prefix)
      )
      if (url) handleUrl(url)
    }
  }

  async function handleUrl(urlStr: string) {
    // datahu://?name=1&pwd=2
    if (!mainWindow) {
      createWindow()
    }
    ipc.send({action: 'scheme', url: urlStr})
  }
}
