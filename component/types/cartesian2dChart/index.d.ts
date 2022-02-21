import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, GridComponentOption, XAxisComponentOption, YAxisComponentOption, SeriesComponentOption, VisualMapComponentOption, DataOperationComponentOption, DataZoomComponentOption, EchartComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    tooltip: never[];
    visual: never[];
}
export declare class Cartesian2dChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    echart?: EchartComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    grid: GridComponentOption;
    xAxis: XAxisComponentOption;
    yAxis: YAxisComponentOption;
    dataZoom: Array<DataZoomComponentOption>;
    series: Array<SeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class Cartesian2dChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    option: Cartesian2dChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
