import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, GridComponentOption, XAxisComponentOption, YAxisComponentOption, SeriesComponentOption, VisualMapComponentOption, DataOperationComponentOption, SeriesLabelComponentOption, MarkPointComponentOption, MarkLineComponentOption, MarkAreaComponentOption, EchartComponentOption } from '@datahu/component-base';
export declare class WaterfallSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
    stack: string;
    label: SeriesLabelComponentOption;
    smooth: number;
    markPoint: MarkPointComponentOption;
    markLine: MarkLineComponentOption;
    markArea: MarkAreaComponentOption;
}
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    waterfallSeries: never[];
    series: never[];
    tooltip: never[];
    visual: never[];
}
export declare class WaterfallChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    echart?: EchartComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    grid: GridComponentOption;
    xAxis: XAxisComponentOption;
    yAxis: YAxisComponentOption;
    waterfallSeries: Array<SeriesComponentOption>;
    series: Array<SeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class WaterfallChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: WaterfallChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
