import {OracleDataSource, OracleDataSourceOption} from '@/oracle'
import {Util, Crypto, ITableQueryPager} from '../../../core'

test('oracle get tables / data', async () => {
  var config = new OracleDataSourceOption()
  Util.cloneTo(
    {
      title: '测试数据库连接',
      host: '47.95.141.248',
      port: 1521,
      username: 'system',
      password: Crypto.Encrypt('oracle', 'sjwkdjsklwjfdlks'),
      database: 'orcl',
      oracleClient:
        '/Users/zhengliu/Desktop/workspace/work/oracle/instantclient_19_8'
    },
    config
  )
  let datasource = new OracleDataSource('zh-cn', config)
  let pager: ITableQueryPager = {
    current: 1,
    pageSize: 20,
    desc: false,
    searchText: ''
  }
  let data = await datasource.getTables(pager)
  for (let t of data.tables) {
    if (t.name == 'TEST_TABLE') {
      let data = await datasource.getData([t])
      expect(data.length == 1).toBeTruthy()
    }
  }
})
