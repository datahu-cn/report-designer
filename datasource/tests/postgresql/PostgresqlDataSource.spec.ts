import {PostgresqlDataSource, PostgresqlDataSourceOption} from '@/postgresql'
import {Util, Crypto, ITableQueryPager} from '../../../core'

test('postgresql get tables / data', async () => {
  var config = new PostgresqlDataSourceOption()
  Util.cloneTo(
    {
      title: '测试数据库连接',
      host: 'pgm-2zexmnplwaw41116io.pg.rds.aliyuncs.com',
      port: 5432,
      user: 'postgres',
      password: Crypto.Encrypt('juy56dfer!#d', 'sjwkdjsklwjfdlks'),
      database: 'protest'
    },
    config
  )
  let datasource = new PostgresqlDataSource('zh-cn', config)
  let pager: ITableQueryPager = {
    current: 1,
    pageSize: 2000,
    desc: false,
    searchText: ''
  }
  let data = await datasource.getTables(pager)
  for (let t of data.tables) {
    if (t.name == 'public.testtable2') {
      let data = await datasource.getData([t])
      expect(data.length == 1).toBeTruthy()
    }
  }
})
