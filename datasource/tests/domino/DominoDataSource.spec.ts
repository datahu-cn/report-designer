import {DominoDataSource} from '@/domino'
import {Crypto} from '../../../core'

// test('test1', () => {
//   var datasource = new SqlServerDataSource('zh-cn')
//   expect(datasource.language).toBe('zh-cn')
// })

test('domino get tables / data', async () => {
  var config: any = {
    title: '测试数据库连接',
    url: 'http://10.211.55.11',
    database: 'admin4.nsf',
    view: 'All Requests by Server',
    username: 'f m zhengliu/ZHENGLIU5E80',
    password: Crypto.Encrypt('fengye1314', 'sjwkdjsklwjfdlks')
  }
  try {
    let datasource = new DominoDataSource('zh-cn', config)
    let tables = await datasource.getTables()
    let data = await datasource.getData([tables[0]])

    expect(data.length == 1).toBeTruthy()
  } catch (e) {
    console.error(e)
    throw e
  }
})
