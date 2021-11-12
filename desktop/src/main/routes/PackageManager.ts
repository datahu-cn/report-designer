import {storeRecenty} from './LocalStore'
import {dialog} from 'electron'
import JSZip from 'jszip'

import fs from 'fs'
import Store from 'electron-store'
import {downloadFromServer} from './ServerRequest'
import {IPackageDefinition} from '@datahu/core'
const store = new Store()

export function load(arg: any): Promise<any> {
  var content = fs.readFileSync(arg.path)
  return new Promise((resolve, reject) => {
    JSZip.loadAsync(content)
      .then((zipFiles: any) => {
        zipFiles
          .file('file')
          .async('string')
          .then((text: string) => {
            var pkg = JSON.parse(text)
            storeRecenty(arg.path)
            return resolve(pkg)
          })
          .catch((e: any) => {
            return reject(e)
          })
      })
      .catch((e) => {
        return reject(e)
      })
  })
}

export async function loadFrom(arg: any, mainWindow: any): Promise<any> {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  })
  if (result.filePaths && result.filePaths.length > 0) {
    let path = result.filePaths[0] as string
    let data = await load({path})
    return Promise.resolve({data, path})
  }
  return Promise.resolve()
}

export async function loadFromServer(arg: any): Promise<any> {
  let result = await downloadFromServer(arg)
  return new Promise((resolve, reject) => {
    JSZip.loadAsync(result.data)
      .then((zipFiles: any) => {
        zipFiles
          .file('file')
          .async('string')
          .then((text: string) => {
            var pkg = JSON.parse(text)
            return resolve({data: pkg, path: result.filename})
          })
          .catch((e: any) => {
            return reject(e)
          })
      })
      .catch((e) => {
        return reject(e)
      })
  })
}

function writeZipFile(path: string, pkg: IPackageDefinition) {
  for (let table of pkg.tables) {
    if (table.formula) {
      table.rows = undefined
    }
  }
  let content = JSON.stringify(pkg)
  return new Promise((resolve: any) => {
    var zip = new JSZip()
    zip.file('file', content)
    zip
      .generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true,
        compression: 'DEFLATE'
      })
      .pipe(fs.createWriteStream(path))
      .on('finish', function () {
        resolve()
      })
  })
}

export async function save(arg: any): Promise<any> {
  await writeZipFile(arg.path, arg.pkg)
}

export async function saveAs(arg: any, mainWindow: any): Promise<any> {
  var options = {
    title: 'Save new file as...',
    defaultPath: arg.path,
    filters: [{name: '', extensions: ['datahu']}]
  }

  const result = await dialog.showSaveDialog(mainWindow, options)
  if (result.filePath) {
    let newPath = result.filePath as string
    await writeZipFile(newPath, arg.pkg)
    storeRecenty(newPath)
  }

  return result.filePath
}
