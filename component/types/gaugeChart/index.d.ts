import { IControl, DataMergeMethod } from '@datahu/core';
import { BaseComponent, BaseComponentOption, DataOperationComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    series: never[];
    maxField: never[];
}
export declare class GaugeProgressComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    overlap: boolean;
    clip: boolean;
    width: number;
    roundCap: boolean;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
}
export declare class GaugeAxisLineStyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: Array<Array<any>>;
    width: number;
}
export declare class GaugeAxisLineComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    roundCap: boolean;
    lineStyle: GaugeAxisLineStyleComponentOption;
}
export declare class GaugeSplitLineComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    length: number;
    distance: number;
    lineStyle: {
        color: string;
        width: number;
        type: string;
    };
}
export declare class GaugeAxisTickComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    splitNumber: number;
    length: number;
    distance: number;
    lineStyle: {
        color: string;
        width: number;
        type: string;
    };
}
export declare class GaugeAxisLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    distance: number;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    constructor(defaultValues?: any);
}
export declare class GaugePointerComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    icon: string;
    offsetCenter: Array<number>;
    length: number | string;
    width: number;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
}
export declare class GaugeDetailComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    valueAnimation: boolean;
    offsetCenter: Array<any>;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
}
export declare class GaugeTitleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    valueAnimation: boolean;
    offsetCenter: Array<any>;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
}
export declare class GaugeSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    center: Array<string>;
    radius: string;
    startAngle: number;
    endAngle: number;
    min: number;
    max: number;
    clockwise: boolean;
    splitNumber: number;
    legendHoverLink: boolean;
    axisLine: GaugeAxisLineComponentOption;
    progress: GaugeProgressComponentOption;
    splitLine: GaugeSplitLineComponentOption;
    axisTick: GaugeAxisTickComponentOption;
    axisLabel: GaugeAxisLabelComponentOption;
    pointer: GaugePointerComponentOption;
}
export declare class GaugeDataComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    title: GaugeTitleComponentOption;
    detail: GaugeDetailComponentOption;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
}
export declare class GaugeChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    mergeMethod: DataMergeMethod;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    series: Array<GaugeSeriesComponentOption>;
    gaugeData: Array<GaugeDataComponentOption>;
}
export declare class GaugeChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: GaugeChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
