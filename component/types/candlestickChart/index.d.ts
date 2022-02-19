import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, GridComponentOption, XAxisComponentOption, YAxisComponentOption, SeriesComponentOption, DataOperationComponentOption, MarkPointComponentOption, MarkLineComponentOption, MarkAreaComponentOption, VisualMapComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    open: never[];
    close: never[];
    lowest: never[];
    highest: never[];
    series: never[];
    tooltip: never[];
    visual: never[];
}
export declare class CandlestickSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    itemStyle: {
        color: string;
        color0: string;
        borderColor: string;
        borderColor0: string;
        borderWidth: number;
    };
    markPoint: MarkPointComponentOption;
    markLine: MarkLineComponentOption;
    markArea: MarkAreaComponentOption;
}
export declare class CandlestickChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    grid: GridComponentOption;
    xAxis: XAxisComponentOption;
    yAxis: YAxisComponentOption;
    candlestickSeries: Array<CandlestickSeriesComponentOption>;
    series: Array<SeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class CandlestickChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: CandlestickChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
