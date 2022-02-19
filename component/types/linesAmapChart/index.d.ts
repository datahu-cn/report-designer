import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, LegendComponentOption, DataOperationComponentOption, SeriesLabelComponentOption, AmapComponentOption, LineStyleComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    category: never[];
    series: never[];
    colors: never[];
    widths: never[];
}
export declare class LinesEffectComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    period?: number;
    delay?: number;
    constantSpeed: number;
    symbol: string;
    symbolSize: Array<any>;
    color: string;
    trailLength: number;
    loop: boolean;
}
export declare class LinesAmapSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    coordinateSystem: string;
    silent: boolean;
    polyline: boolean;
    effect: LinesEffectComponentOption;
    large: boolean;
    largeThreshold: number;
    symbol: string;
    symbolSize: Array<any>;
    lineStyle: LineStyleComponentOption;
    label: SeriesLabelComponentOption;
    zlevel?: number;
}
export declare class LinesAmapChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    legend: LegendComponentOption;
    amap: AmapComponentOption;
    series: Array<LinesAmapSeriesComponentOption>;
}
export declare class LinesAmapChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    option: LinesAmapChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
