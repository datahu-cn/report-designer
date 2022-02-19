import http from './http'
import {useState} from './state'
import {ref} from 'vue'
import {IChartDefinition, IPackageDefinition, PackageHelper} from '@datahu/core'

let pluginType = 'component'
let list = ref(null)

let pkgPlugins: Array<any> = []

/**
 * 报表保存时，将插件加入到报表定义文件中
 * @param pkg
 * @returns
 */
export function setPackagePlugins(pkg: IPackageDefinition) {
  let plugins: Array<any> = []
  let state = useState()
  let localPlugins = state.store[pluginType]
  let addedPluginNames: Array<any> = []
  PackageHelper.eachChart(pkg.chart, (item: IChartDefinition) => {
    if (item.pluginName && addedPluginNames.indexOf(item.pluginName) < 0) {
      let find = false
      for (let plugin of localPlugins) {
        if (plugin.name == item.pluginName) {
          plugins.push(plugin)
          find = true
          break
        }
      }
      if (!find) {
        for (let plugin of pkgPlugins) {
          if (plugin.name == item.pluginName) {
            plugins.push(plugin)
            find = true
            break
          }
        }
      }
    }
  })
  pkg.plugins = plugins
  return plugins
}

/**
 * 加载 报表定义文件中的插件， 如果文件中的插件与本地插件重名， 优先使用本地的插件
 * @param pkg
 */
export async function loadPackagePlugins(pkg: IPackageDefinition) {
  pkgPlugins = pkg.plugins
  if (pkgPlugins) {
    let state = useState()
    let localPlugins = state.store[pluginType]
    for (let plugin of pkgPlugins) {
      let has = false
      for (let localItem of localPlugins) {
        if (localItem.name == plugin.name) {
          has = true
          break
        }
      }
      if (!has) {
        let item = await importPlugin(plugin.content)
        enablePlugin(item.plugin)
      }
    }
  }
}

async function openPluginFileContent() {
  let result = (await http.request('PackageManager/openAndReadFile', {})) as any
  if (result && result.content) {
    return result.content
  }
  return ''
}

async function importPlugin(content) {
  const file = new Blob([content], {
    type: 'text/javascript'
  })
  const fileURL = URL.createObjectURL(file)
  var results: any = await import(fileURL)
  return results
}

async function enablePlugin(plugin) {
  let state = useState()
  for (let name in plugin.components) {
    state.components[name] = plugin.components[name]
    state.components[name].pluginName = plugin.name
  }
}

async function disablePlugin(plugin) {
  let state = useState()
  for (let name in plugin.components) {
    delete state.components[name]
  }
}

export async function loadDevComponents() {
  let content = await openPluginFileContent()
  if (content) {
    var results: any = await importPlugin(content)
    if (results.plugin) {
      enablePlugin(results.plugin)
    }
  }
}

export function getPlugins() {
  return list
}

export async function loadPlugins() {
  list.value = []
  let state = useState()
  let plugins = state.store[pluginType]
  if (!plugins) {
    plugins = []
    state.store[pluginType] = plugins
  }
  for (let plugin of plugins) {
    let item = await importPlugin(plugin.content)
    enablePlugin(item.plugin)
    list.value.push(item.plugin)
  }
}

export async function addPlugin() {
  let state = useState()
  let content = await openPluginFileContent()
  if (content) {
    var results: any = await importPlugin(content)
    if (results.plugin) {
      let arg = {
        type: pluginType,
        plugin: {
          name: results.plugin.name,
          description: results.plugin.description,
          version: results.version,
          content: content
        }
      }
      await http.request('LocalStore/addPlugin', arg)
      let plugins = state.store[pluginType]
      if (!plugins) {
        plugins = []
      }
      for (let item of plugins) {
        if (item.name == arg.plugin.name) {
          plugins.splice(plugins.indexOf(item), 1)
          break
        }
      }
      for (let item of list.value) {
        if (item.name == arg.plugin.name) {
          list.value.splice(plugins.indexOf(item), 1)
          disablePlugin(item)
          break
        }
      }
      plugins.push(arg.plugin)
      enablePlugin(results.plugin)
      list.value.push(results.plugin)
    }
  }
}

export async function removePlugin(plugin: any) {
  let state = useState()
  await http.request('LocalStore/removePlugin', {
    type: pluginType,
    plugin: {name: plugin.name}
  })
  let plugins = state.store[pluginType]
  if (!plugins) {
    plugins = []
  }
  for (let item of plugins) {
    if (item.name == plugin.name) {
      plugins.splice(plugins.indexOf(item), 1)
      break
    }
  }
  for (let item of list.value) {
    if (item.name == plugin.name) {
      list.value.splice(plugins.indexOf(item), 1)
      disablePlugin(item)
      break
    }
  }
}
