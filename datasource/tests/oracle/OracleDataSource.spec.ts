import {OracleDataSource, OracleDataSourceOption} from '@/oracle'
import {Util, Crypto} from '../../../core'

test('oracle get tables / data', async () => {
  var config = new OracleDataSourceOption()
  Util.cloneTo(
    {
      title: '测试数据库连接',
      host: '47.95.141.248',
      port: 1521,
      username: 'system',
      password: Crypto.Encrypt('oracle', 'sjwkdjsklwjfdlks'),
      database: 'orcl'
    },
    config
  )
  let datasource = new OracleDataSource('zh-cn', config)
  let tables = await datasource.getTables()
  for (let t of tables) {
    if (t.name == 'TEST_TABLE') {
      let data = await datasource.getData([t])
      expect(data.length == 1).toBeTruthy()
    }
  }
})
