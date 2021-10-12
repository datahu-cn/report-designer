import {ExcelDataSource} from '@/excel'

// test('test1', () => {
//   var datasource = new SqlServerDataSource('zh-cn')
//   expect(datasource.language).toBe('zh-cn')
// })

test('get excel tables / data', async () => {
  var config: any = {
    title: '测试数据库连接',
    customStart: false,
    startRow: 1,
    startColumn: 1,
    source: [
      '',
      '/Users/zhengliu/Desktop/workspace/logs/线下课堂学生活动所占时间变化分析图1.xlsx'
    ]
  }
  let datasource = new ExcelDataSource('zh-cn', config)
  let tables = await datasource.getTables()
  let data = await datasource.getData([tables[0]])

  expect(data.length == 1).toBeTruthy()
})
