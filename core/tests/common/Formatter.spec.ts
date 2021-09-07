import {Formatter} from '@/common'

test('Formatter.format', () => {
  let formatTest = (code: string, value: any, result: string) => {
    expect(Formatter.formatHtml(code, value)).toBe(result)
  }
})
