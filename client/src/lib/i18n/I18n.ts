import en from './en'
import zh_cn from './zh-cn'
import {I18nStrings} from './I18nStrings'
export class I18n {
  static get(language: string): I18nStrings {
    var messages = {
      en,
      zh_cn
    } as any
    return messages[language.toLowerCase().replace(/-/g, '_')] as I18nStrings
  }
}
