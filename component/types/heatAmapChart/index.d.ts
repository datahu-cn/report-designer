import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, LegendComponentOption, DataOperationComponentOption, AmapComponentOption, RangeComponentOption, StyleComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    category: never[];
    lon: never[];
    lat: never[];
    series: never[];
    visual: never[];
}
export declare class HeatAmapSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    coordinateSystem: string;
    encode: any;
    pointSize: number;
    blurSize: number;
}
export declare class HeatMapVisualMapComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    showLabel: boolean;
    type: string;
    color: Array<string>;
    dimension: number | null;
    seriesIndex: number | null;
    min: number;
    max: number;
    precision: number;
    range: Array<number>;
    inRange: RangeComponentOption;
    outOfRange: RangeComponentOption;
    align: string;
    text: Array<string>;
    calculable: boolean;
    orient: string;
    left: string;
    right: string | null;
    top: string;
    bottom: string | null;
    itemWidth: string;
    itemHeight: string;
    textStyle: StyleComponentOption;
}
export declare class HeatAmapChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    legend: LegendComponentOption;
    amap: AmapComponentOption;
    series: Array<HeatAmapSeriesComponentOption>;
    visualMap: Array<HeatMapVisualMapComponentOption>;
}
export declare class HeatAmapChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    option: HeatAmapChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
