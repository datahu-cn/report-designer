import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, DataOperationComponentOption, AxisLabelComponentOption, SeriesLabelComponentOption, AxisLineComponentOption, AxisTickComponentOption, LineStyleComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    max: never[];
    min: never[];
    tooltip: never[];
}
export declare class RadarAreaStyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: string;
}
export declare class RadarSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    symbol: string;
    symbolSize: Array<any>;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
    lineStyle: {
        color: string;
        width: number;
        type: string;
    };
    areaStyle: RadarAreaStyleComponentOption;
    label: SeriesLabelComponentOption;
}
declare class RadarNameComponentOption {
    static controls: never[];
    show: boolean;
    formatter: string;
    color: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    backgroundColor: string;
}
export declare class SplitLineComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    lineStyle: LineStyleComponentOption;
    constructor(defaultValues?: any);
}
export declare class SplitAreaComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    areaStyle: RadarAreaStyleComponentOption;
    constructor(defaultValues?: any);
}
declare class RadarConfigComponentOption {
    static controls: never[];
    center: Array<string>;
    radius: string;
    startAngle: number;
    name: RadarNameComponentOption;
    nameGap: number;
    scale?: boolean;
    splitNumber: number;
    shape: string;
    axisLabel: AxisLabelComponentOption;
    axisLine: AxisLineComponentOption;
    axisTick: AxisTickComponentOption;
    splitLine: SplitLineComponentOption;
    splitArea: SplitAreaComponentOption;
}
export declare class RadarChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    radar: RadarConfigComponentOption;
    series: Array<RadarSeriesComponentOption>;
}
export declare class RadarChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: RadarChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
