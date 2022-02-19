import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, VisualMapComponentOption, DataOperationComponentOption, SeriesLabelComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    tooltip: never[];
    visual: never[];
}
declare class DensityMapSeriesComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    map: string;
    roam: string | boolean;
    aspectScale: number;
    zoom: number;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
    };
    showLegendSymbol: boolean;
    label: SeriesLabelComponentOption;
    layoutCenter: Array<string>;
    layoutSize: number | undefined;
    left: string;
    right: string;
    top: string;
    bottom: string;
}
export declare class DensityMapChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    series: Array<DensityMapSeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class DensityMapChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: DensityMapChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
