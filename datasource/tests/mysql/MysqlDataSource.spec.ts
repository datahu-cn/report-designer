import {MysqlDataSource} from '@/mysql/MysqlDataSource'

test('mysql test1', () => {
  var datasource = new MysqlDataSource('zh-cn')
  expect(datasource.language).toBe('zh-cn')
})

test('get mysql tables / data', async () => {
  var config = {
    title: '测试数据库连接',
    host: 'rm-2ze7z3q3i3dl5v60lgo.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'kylin_db_admin',
    password: 'kylin_123456!',
    database: 'antonoil_dcr',
    charset: '',
    ssl: false
  }
  let datasource = new MysqlDataSource('zh-cn', config)
  let tables = await datasource.getTables()
  let data = await datasource.getData([tables[0]])
  expect(data.length == 1).toBeTruthy()
})

// test('create test data', async () => {
//   var config = {
//     title: '测试数据库连接',
//     host: 'rm-2ze7z3q3i3dl5v60lgo.mysql.rds.aliyuncs.com',
//     port: 3306,
//     user: 'kylin_db_admin',
//     password: 'kylin_123456!',
//     database: 'datahu',
//     charset: '',
//     ssl: false
//   }
//   let datasource = new MysqlDataSource('zh-cn', config)

//   //let sql = `insert into area (name, date, gdp, city_id) values (？, ？, ？, ？)`
//   let now = new Date()

//   let insert = async (name: any, i: number, j: number, id: number) => {
//     let date = new Date(now.getTime() + 1000 * 60 * i)
//     let sql = `insert into area (name, date, gdp, city_id) values ('${
//       name + j
//     }', '${date.toISOString()}', ${Math.random() * 100}, ${id})`
//     await datasource.helper.query(sql)
//   }

//   try {
//     for (let i = 0; i < 10000; i++) {
//       for (let j = 0; j < 10; j++) {
//         await insert('北京区', i, j, 1)
//         await insert('上海区', i, j, 2)
//         await insert('纽约区', i, j, 3)
//         await insert('华盛顿区', i, j, 4)
//       }
//     }
//   } catch (e) {
//     console.error(e)
//   }
// })
