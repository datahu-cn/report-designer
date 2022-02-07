/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: 'datahu',
  artifactName: '${productName}-${os}-${version}.${ext}',
  win: {
    publish: [
      {
        provider: 'generic',
        url: 'https://cdn.datahu.cn/update/'
      }
    ]
  },
  mac: {
    publish: [
      {
        provider: 'generic',
        url: 'https://cdn.datahu.cn/update/'
      }
    ]
  },
  directories: {
    output: 'dist/app',
    buildResources: 'build',
    app: 'dist/source'
  }
}
