import {IControl, ControlType, ComponentControl, StyleType} from '@datahu/core'
import {BaseComponent, BaseComponentOption, StyleComponentOption} from '../base'
import RichText from './RichText.vue'

class RichTextComponentOption extends BaseComponentOption {
  static controls = []

  /**
   * 富文本 JSON数据
   */
  data: any = null
}
export class RichTextComponent extends BaseComponent {
  isLayout: boolean = false
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M10.42,28.83V27.26H29.83v1.57Z" fill="#7678ed"/><path d="M31.3,7H7.24A.24.24,0,0,0,7,7.24V32.76a.24.24,0,0,0,.24.24H32.76a.24.24,0,0,0,.24-.24V7.24A.24.24,0,0,0,32.76,7Zm-.24,24.3H8.94a.24.24,0,0,1-.24-.24V8.94a.24.24,0,0,1,.24-.24H31.06a.24.24,0,0,1,.24.24V31.06A.24.24,0,0,1,31.06,31.3Z" fill="#7678ed"/><path d="M20.24,21.64h9.37a.25.25,0,0,1,.24.25V23.1a.24.24,0,0,1-.24.24H20.24A.24.24,0,0,1,20,23.1V21.89A.25.25,0,0,1,20.24,21.64Zm0-4.87h9.37a.24.24,0,0,1,.24.24v1.22a.24.24,0,0,1-.24.24H20.24a.24.24,0,0,1-.24-.24V17A.24.24,0,0,1,20.24,16.77Zm0-4.87h9.37a.24.24,0,0,1,.24.24v1.21a.25.25,0,0,1-.24.25H20.24a.25.25,0,0,1-.24-.25V12.14A.24.24,0,0,1,20.24,11.9Z" fill="#7678ed"/><path d="M10.75,11.9h7.51a.24.24,0,0,1,.24.24v.77a.24.24,0,0,1-.24.24H15.55a.25.25,0,0,0-.25.24v9.83a.25.25,0,0,1-.24.25H14a.25.25,0,0,1-.25-.25V13.39a.24.24,0,0,0-.24-.24H10.75a.24.24,0,0,1-.24-.24v-.77A.25.25,0,0,1,10.75,11.9Z" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '富文本'
  option: RichTextComponentOption = new RichTextComponentOption()
  getComponent() {
    return RichText
  }
}
