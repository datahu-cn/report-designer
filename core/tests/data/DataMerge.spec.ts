import {DataMergeType} from '@/data/DataFilter'
import {Util} from '@/common'
import {
  IChartDefinition,
  IRelationshipDefinition,
  RelationshipType
} from '@/package'
import {ChartData} from '@/data/ChartData'
import {DataContext} from '@/data'

test('DataMerge1', () => {
  let fields = {
    x: [{tableId: '2', columnId: '22', mergeType: DataMergeType.none}],
    y: [{tableId: '1', columnId: '11', mergeType: DataMergeType.count}]
  }

  let data = {}

  let relationships: Array<IRelationshipDefinition> = [
    {from: ['2', '21'], to: ['1', '12'], type: RelationshipType.OneWay}
  ]

  let chart: any = {
    id: '11111',
    option: {
      fields
    },
    children: []
  }

  let definiton: any = {
    filters: [],
    relationships,
    tables: [
      {
        id: '1',
        name: 'application',
        columns: [
          {id: '11', name: 'name'},
          {id: '12', name: 'category'}
        ],
        rows: [
          {name: '34', category: '1'},
          {name: '3455', category: '2'},
          {name: '4533', category: '2'}
        ]
      },
      {
        id: '2',
        name: 'applicationCategory',
        columns: [
          {id: '21', name: 'id'},
          {id: '22', name: 'name'}
        ],
        rows: [
          {id: '1', name: 'c1'},
          {id: '2', name: 'c2'}
        ]
      }
    ],
    chart: chart
  }
  let dataContext = new DataContext(data, definiton)
  let i18n: any = {}

  let merge1 = new ChartData(i18n, dataContext, chart)
  let result1 = merge1.rows

  dataContext.definition.relationships = []
  let merge2 = new ChartData(i18n, dataContext, chart)
  let result2 = merge2.rows

  expect(result1[1][11]).toBe(2)
  expect(result2[1][11]).toBe(3)
})
