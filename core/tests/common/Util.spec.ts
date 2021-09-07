import {Util} from '@/common'

test('Util.groupBy', () => {
  let data = [
    {name: 'name1', id: 'id1'},
    {name: 'name2', id: 'id2'},
    {name: 'name2', id: 'id3'}
  ]
  let r1 = Util.groupBy(data, 'name')
  let r2 = Util.groupBy(data, ['name'])
  let r3 = Util.groupBy(data, (a: any, b: any) => a.name == b.name)
  expect(r1.length).toBe(2)
  expect(r2.length).toBe(2)
  expect(r3.length).toBe(2)
})

test('Util.filter', () => {
  let data = [
    {name: 'name1', id: 'id1'},
    {name: 'name2', id: 'id2'},
    {name: 'name2', id: 'id3'}
  ]
  let r1 = Util.filter(data, {name: 'name2', id: 'id2'})
  let r2 = Util.filter(data, {name: 'name2'})
  let r3 = Util.filter(
    data,
    (item: any) => item.id == 'id1' || item.id == 'id3'
  )
  expect(r1.length).toBe(1)
  expect(r2.length).toBe(2)
  expect(r3.length).toBe(2)
})

class UtilAssign {
  name: string = 'namw1'
}

test('Util.assign', () => {
  let from = {
    ass: [new UtilAssign()]
  }
  let to = {
    ass: [{}]
  }
  let r1 = Util.assignTo(from, to, true)

  expect(r1.ass[0].name == 'namw1').toBe(true)
})

test('Util.orderByMultiple', () => {
  let data = [
    {name: '1', id: '0'},
    {name: '2', id: '1'},
    {name: '2', id: '2'}
  ]
  let r1 = Util.orderByMultiple(data, [
    {pro: 'name', desc: true},
    {pro: 'id', desc: false}
  ])

  expect(r1[0].id).toBe('1')
})
