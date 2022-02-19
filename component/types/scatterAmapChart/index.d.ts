import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, VisualMapComponentOption, DataOperationComponentOption, SeriesLabelComponentOption, AmapComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    category: never[];
    lon: never[];
    lat: never[];
    series: never[];
    tooltip: never[];
    visual: never[];
}
export declare class ScatterAmapSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    coordinateSystem: string;
    encode: any;
    symbol: string;
    symbolSize: Array<any>;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
    label: SeriesLabelComponentOption;
}
export declare class ScatterAmapChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    amap: AmapComponentOption;
    series: Array<ScatterAmapSeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class ScatterAmapChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    option: ScatterAmapChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
