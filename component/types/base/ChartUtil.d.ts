import { ChartData, IChartDefinition } from '@datahu/core';
import { TooltipComponentOption } from '.';
import { ITooltip } from './Base';
import * as echarts from 'echarts';
export declare class ChartUtil {
    static getStyleString(style: any): string;
    static getSeriesValue(p: any): any;
    static getTooltipLeftName(p: any): any;
    static getTooltipFormatter(params: any, tooltips: Array<ITooltip>, option: TooltipComponentOption, data: Array<any>, chartData: ChartData, title?: number): string;
    static getFormatterValue(chartData: ChartData, datasetIndex: number | null, fieldName: string | null, value: any): any;
    static getChartOption(chart: IChartDefinition): any;
    static registerAllMaps: (option: echarts.EChartsOption) => Promise<void>;
    static jsonp: (url: string, args?: any, options?: {
        timeout: number;
    }) => Promise<unknown>;
    static requestMaps: any;
    static registerMap(name: string): Promise<void>;
}
