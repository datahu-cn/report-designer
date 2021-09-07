import {PageLayoutComponent} from './pageLayout'
import {GridLayoutComponent} from './gridLayout'
import {LineChartComponent} from './lineChart'
import {AreaChartComponent} from './areaChart'
import {BarChartComponent} from './barChart'
import {BarHorizontalChartComponent} from './barHorizontalChart'
import {ScatterChartComponent} from './scatterChart'
import {SimpleSlicerComponent} from './simpleSlicer'
import {DataTableComponent} from './dataTable'
import {RichTextComponent} from './richText'
import {PieChartComponent} from './pieChart'
import {SingleCardComponent} from './singleCard'
import {RadarChartComponent} from './radarChart'
import {CandlestickChartComponent} from './candlestickChart'
import {WaterfallChartComponent} from './waterfallChart'
import {TreeMapChartComponent} from './treeMapChart'
import {GaugeChartComponent} from './gaugeChart'
import {FunnelChartComponent} from './funnelChart'
import {EchartsChartComponent} from './echartsChart'
import {DensityMapChartComponent} from './densityMapChart'
import {ScatterAmapChartComponent} from './scatterAmapChart'
import {LinesAmapChartComponent} from './linesAmapChart'
import {HeatAmapChartComponent} from './heatAmapChart'
import {SplitLayoutComponent} from './splitLayout'

export * from './chart'

let Components = [
  LineChartComponent,
  AreaChartComponent,
  BarChartComponent,
  BarHorizontalChartComponent,
  PieChartComponent,
  ScatterChartComponent,
  CandlestickChartComponent,
  WaterfallChartComponent,
  TreeMapChartComponent,
  GaugeChartComponent,
  FunnelChartComponent,
  RadarChartComponent,
  DataTableComponent,
  DensityMapChartComponent,
  HeatAmapChartComponent,
  LinesAmapChartComponent,
  ScatterAmapChartComponent,
  SingleCardComponent,
  RichTextComponent,
  SimpleSlicerComponent,
  EchartsChartComponent,
  GridLayoutComponent,
  PageLayoutComponent,
  SplitLayoutComponent
]

export function getComponents(): any {
  let obj: any = {}
  for (let c of Components) {
    obj[c.name] = c
  }
  return obj
}
