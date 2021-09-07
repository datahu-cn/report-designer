import {InfluxDataSource, InfluxDataSourceOption} from '@/influx'
import {Util} from '@datahu/core'
import * as Influx from 'influx'
const FieldType = Influx.FieldType

test('influx  test1', () => {
  var datasource = new InfluxDataSource('zh-cn')
  expect(datasource.language).toBe('zh-cn')
})

// test('get tables / data', async () => {
//   var config = {
//     title: '测试数据库连接',
//     host: 'rm-2ze7z3q3i3dl5v60lgo.mysql.rds.aliyuncs.com',
//     port: 3306,
//     user: 'kylin_db_admin',
//     password: 'kylin_123456!',
//     database: 'antonoil_dcr',
//     charset: '',
//     ssl: false
//   }
//   let datasource = new MysqlDataSource('zh-cn', config)
//   let tables = await datasource.getTables()
//   let data = await datasource.getData([tables[0]])
//   expect(data.length == 1).toBeTruthy()
// })

/**
 * 运行测试前，在命令行控制台运行： export NODE_TLS_REJECT_UNAUTHORIZED=0
 *
 */
test('influx get tables / data', async () => {
  let config: InfluxDataSourceOption = new InfluxDataSourceOption()

  let opt = {
    site: 'hw',
    protocol: 'https',
    host: '121.36.13.124',
    port: 8635,
    database: 'RWIS',
    username: 'rwuser',
    password: 'iAdCYPwZD5uRLKf4@'
  }

  var getSchema = function () {
    return [
      {
        // 能见度
        measurement: 'AM',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.INTEGER
        }
      },
      {
        // 温度
        measurement: 'AB',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.FLOAT
        }
      },
      {
        // 湿度
        measurement: 'AC',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.INTEGER
        }
      },
      {
        // 风向
        measurement: 'AD',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.INTEGER
        }
      },
      {
        // 风速
        measurement: 'AE',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.FLOAT
        }
      },
      {
        // 降水
        measurement: 'AF',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.FLOAT
        }
      },
      {
        // 气压
        measurement: 'AG',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.INTEGER
        }
      },
      {
        // 辐射
        measurement: 'AH',
        tags: ['site', 'device'],
        fields: {
          A: FieldType.INTEGER
        }
      }
    ]
  }

  Util.cloneTo(opt, config)
  ;(config as any).schema = getSchema()
  let datasource = new InfluxDataSource('zh-cn', config)

  let now = new Date()

  let tables = await datasource.getTables()
  let ts: any = [
    {
      useSourceCode: true,
      sourceCode: 'select * from AM where time > now() - 1h'
    }
  ]
  let data = await datasource.getData(ts)
})
