import {BaseComponent} from '../src/base'

test('base', () => {
  let base = new BaseComponent('zh-cn')
  let controls = base.getControls()

  expect(controls.length).toBe(2)
})
