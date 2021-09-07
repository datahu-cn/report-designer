import {format} from 'ssf'
import {CodeExpression} from './CodeExpression'
/**
 * 格式说明： https://customformats.com/
 */
export class Formatter {
  static format(code: any, value: any) {
    if (!code) {
      return value
    }
    if (code.indexOf('return') >= 0) {
      return CodeExpression.runCode(code, ['value'], value)
    }
    return format(code, value)
  }

  static formatHtml(code: any, value: any) {
    let v = Formatter.format(code, value)
    if (v) {
      if (v.length > 8 && v[0] == '#' && v[7] == '#') {
        let color = v.substring(0, 7)
        v = v.substring(8)
        return `<span style="color:${color};">${v}</span>`
      }
    }
    return v
  }
}
