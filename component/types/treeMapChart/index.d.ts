import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, DataOperationComponentOption, SeriesLabelComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    parent: never[];
    tooltip: never[];
}
declare class TreeMapSeriesItemStyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: string;
    borderColor: string;
    borderWidth: number;
    borderType: string;
    borderRadius: number[];
    gapWidth: number;
}
declare class TreeMapSeriesUpperLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    position: string;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    backgroundColor: string;
}
declare class TreeMapSeriesLevelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    itemStyle: TreeMapSeriesItemStyleComponentOption;
}
export declare class TreeMapSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    name: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
    width: string;
    height: string;
    roam: string | boolean;
    leafDepth: number | undefined;
    label: SeriesLabelComponentOption;
    itemStyle: TreeMapSeriesItemStyleComponentOption;
    upperLabel: TreeMapSeriesUpperLabelComponentOption;
    levels: Array<TreeMapSeriesLevelComponentOption>;
}
export declare class TreeMapChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    series: Array<TreeMapSeriesComponentOption>;
}
export declare class TreeMapChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: TreeMapChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
