import {SqlServerDataSource} from '@/sqlserver/SqlServerDataSource'

// test('test1', () => {
//   var datasource = new SqlServerDataSource('zh-cn')
//   expect(datasource.language).toBe('zh-cn')
// })

test('sql server get tables / data', async () => {
  var config = {
    title: '测试数据库连接',
    server: '114.215.220.172',
    port: 3341,
    user: '9kylin',
    password: 'Kylin!QAZ2wsx',
    database: 'agendadb',
    options: {
      encrypt: false //不设置此属性 报错
    }
  }
  let datasource = new SqlServerDataSource('zh-cn', config)
  let tables = await datasource.getTables()
  let data = await datasource.getData([tables[0]])

  expect(data.length == 1).toBeTruthy()
})
