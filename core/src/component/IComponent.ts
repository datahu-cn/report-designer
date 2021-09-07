import {IControl} from '../control'
import 'reflect-metadata'

export function ComponentControl(control: IControl) {
  return (target: any, propertyKey: string) => {
    control.name = propertyKey
    let propertyType: any = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey
    )
    if (propertyType && propertyType.controls) {
      control.children = propertyType.controls
    }
    if (target.constructor.controls) {
      target.constructor.controls.push(control)
    }
  }
}

export interface IComponent {
  isLayout: boolean
  language: string
  icon: string
  title: string
  description: string
  option: any
  getControls(): Array<IControl>
  getComponent(): any
  setOption(option: any): void
}
