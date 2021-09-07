import {
  IFilterInfo,
  FilterExpression,
  DataFilter,
  DataMergeType,
  FilterType
} from '@/data/DataFilter'
import {Util} from '@/common'
import {IRelationshipDefinition, RelationshipType} from '@/package'

test('DataFilter1', () => {
  let filterInfos: Array<IFilterInfo> = [
    {
      field: {
        tableId: '1',
        columnId: '2',
        mergeType: DataMergeType.none,
        mergeCode: ''
      },
      mergeExpression: FilterExpression.or,
      filterType: FilterType.advanced,
      enabled: true,
      conditions: [
        {expression: FilterExpression.eq, value: '34a'},
        {expression: FilterExpression.contains, value: '55'}
      ],
      values: [],
      code: ''
    }
  ]

  let structure = {'1': 'application', '2': 'name'}
  let data = {application: [{name: '34'}, {name: '3455'}, {name: '4533'}]}
  let result = new DataFilter(filterInfos, structure).filter(data, [])
  expect(result.application.length).toBe(1)
})

test('DataFilter2', () => {
  let filterInfos: Array<IFilterInfo> = [
    {
      field: {
        tableId: '2',
        columnId: '21',
        mergeType: DataMergeType.none,
        mergeCode: ''
      },
      mergeExpression: FilterExpression.or,
      filterType: FilterType.advanced,
      enabled: true,
      conditions: [{expression: FilterExpression.eq, value: '2'}],
      values: [],
      code: ''
    },
    {
      field: {
        tableId: '2',
        columnId: '21',
        mergeType: DataMergeType.none,
        mergeCode: ''
      },
      mergeExpression: FilterExpression.and,
      filterType: FilterType.code,
      enabled: true,
      conditions: [],
      values: '2',
      code: (a: any, b: any): boolean => {
        return a == b
      }
    }
  ]

  let structure = {
    '1': 'application',
    '11': 'name',
    '12': 'category',
    '2': 'applicationCategory',
    '21': 'id',
    '22': 'name'
  }
  let data = {
    application: [
      {name: '34', category: '1'},
      {name: '3455', category: '2'},
      {name: '4533', category: '2'}
    ],
    applicationCategory: [
      {id: '1', name: 'c1'},
      {id: '2', name: 'c2'}
    ]
  }

  let relationships: Array<IRelationshipDefinition> = [
    {from: ['2', '21'], to: ['1', '12'], type: RelationshipType.OneWay}
  ]
  let result = new DataFilter(filterInfos, structure).filter(
    data,
    relationships
  )
  expect(result.application.length).toBe(2)
})

test('DataFilter3', () => {
  let filterInfos: Array<IFilterInfo> = [
    {
      field: {
        tableId: '2',
        columnId: '21',
        mergeType: DataMergeType.none,
        mergeCode: ''
      },
      mergeExpression: FilterExpression.and,
      filterType: FilterType.code,
      enabled: true,
      conditions: [],
      values: '2',
      code: (a: any, b: any): boolean => {
        return a == b
      }
    }
  ]

  let structure = {
    '1': 'application',
    '11': 'name',
    '12': 'category',
    '2': 'applicationCategory',
    '21': 'id',
    '22': 'name'
  }
  let data = {
    application: [
      {name: '34', category: '1'},
      {name: '3455', category: '2'},
      {name: '4533', category: '2'}
    ],
    applicationCategory: [
      {id: '1', name: 'c1'},
      {id: '2', name: 'c2'}
    ]
  }

  let relationships: Array<IRelationshipDefinition> = [
    {from: ['2', '21'], to: ['1', '12'], type: RelationshipType.OneWay}
  ]
  let result = new DataFilter(filterInfos, structure).filter(
    data,
    relationships
  )
  expect(result.application.length).toBe(2)
})
