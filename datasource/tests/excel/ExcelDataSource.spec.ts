import {ExcelDataSource} from '@/excel/ExcelDataSource'

// test('test1', () => {
//   var datasource = new SqlServerDataSource('zh-cn')
//   expect(datasource.language).toBe('zh-cn')
// })

test('get excel tables / data', async () => {
  var config = {
    title: '测试数据库连接',
    customStart: false,
    startRow: 1,
    startColumn: 1,
    source: ['', '/Users/zhengliu/Desktop/workspace/test/阿米巴数据.xlsx']
  }
  let datasource = new ExcelDataSource('zh-cn', config)
  let tables = await datasource.getTables()
  let data = await datasource.getData([tables[0]])

  expect(data.length == 1).toBeTruthy()
})
