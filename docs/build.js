const fse = require('fs-extra')
fse.copySync('./docs/.vitepress/dist', '../server/public/docs')
