import {Dark} from './dark'
import {Blue} from './blue'
import {Macarons} from './macarons'
import {Vintage} from './vintage'
import {Util} from '../common'

let themes: any = {
  default: Macarons,
  // Macarons,
  Blue,
  Vintage,
  Dark
}

export function getThemes(): any {
  return themes
}

export function applyTheme(option: any, themeName: string, chart: any) {
  let theme = themes[themeName]
  let opt = theme.option
  if (chart && chart.constructor && chart.constructor.name) {
    let chartName = chart.constructor.name.substring(
      0,
      chart.constructor.name.length - 'Component'.length
    )
    if (theme.charts && theme.charts[chartName]) {
      opt = theme.charts[chartName]
    } else if (theme.charts['Base']) {
      opt = theme.charts['Base']
    }
  }
  Util.assignTo(opt, option, true)
}

export function getTheme(name: string): any {
  if (themes[name]) {
    return themes[name]
  }
  return themes['default']
}
