import {Util} from '@/common'
import {ComponentControl} from '@/component'
import {ControlType, IControl} from '@/control'

export class PosComponentOption {
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.text, title: '左'})
  left?: number | string
}

export class BaseComponentOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.subset,
    title: '定位'
  })
  pos: PosComponentOption = new PosComponentOption()

  @ComponentControl({type: ControlType.subset, title: '标题'})
  title?: string = 'dd'
}

class TestComponent {
  constructor() {}
  option: any = new BaseComponentOption()
  controls: Array<IControl> = BaseComponentOption.controls
}

test('component', () => {
  let t = new TestComponent()
  expect(t.controls.length).toBe(2)
})
