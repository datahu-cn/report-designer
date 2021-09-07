import {RestfulDataSource} from '@/restful/RestfulDataSource'

// test('test1', () => {
//   var datasource = new SqlServerDataSource('zh-cn')
//   expect(datasource.language).toBe('zh-cn')
// })

test('restful get tables / data', async () => {
  var config = {
    title: '测试数据库连接',
    url: 'https://admin.demo.9kylin.cn/newoa/getRequset',
    resultType: 'Object<String,Array<String,Object>>'
  }
  let datasource = new RestfulDataSource('zh-cn', config)
  let tables = await datasource.getTables()
  let data = await datasource.getData([tables[0]])

  expect(data.length == 1).toBeTruthy()
})
