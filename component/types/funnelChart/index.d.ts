import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, DataOperationComponentOption } from '@datahu/component-base';
declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    tooltip: never[];
}
export declare class FunnelSeriesLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    position: string;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    constructor(defaultValues?: any);
}
export declare class FunnelSeriesComponentOption {
    _enabled: boolean;
    type: string;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    min?: number;
    max?: number;
    minSize: number | string;
    maxSize: number | string;
    orient: string;
    funnelAlign: string;
    sort: string;
    gap: number;
    label: FunnelSeriesLabelComponentOption;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
    left: string;
    right: string;
    top: string;
    bottom: string;
    width: string;
    height: string;
}
declare class FunnelChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    series: Array<FunnelSeriesComponentOption>;
}
export declare class FunnelChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: FunnelChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
