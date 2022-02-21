import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, DataOperationComponentOption, EchartComponentOption } from '@datahu/component-base';
declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    tooltip: never[];
}
export declare class PieSeriesLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    position: string;
    formatter: string;
    alignTo: string;
    padding: number;
    borderRadius: number;
    color: string;
    fontWeight: string;
    fontFamily: string;
    fontSize: string;
    backgroundColor: string;
    lineHeight: string;
    constructor(defaultValues?: any);
}
export declare class PieSeriesComponentOption {
    _enabled: boolean;
    type: string;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    selectedMode: boolean;
    clockwise: boolean;
    startAngle: number;
    minAngle: number;
    minShowLabelAngle: number;
    roseType: boolean;
    voidLabelOverlap: boolean;
    tillShowZeroSum: boolean;
    left: string;
    right: string;
    top: string;
    bottom: string;
    center: Array<string>;
    radius: Array<any>;
    label: PieSeriesLabelComponentOption;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
        borderRadius: number[];
    };
}
declare class PieAnimationComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    actions: string[];
    seriesIndex: number;
    speed: number;
}
declare class PieChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    echart?: EchartComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    series: Array<PieSeriesComponentOption>;
    animation: PieAnimationComponentOption;
}
export declare class PieChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: PieChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
