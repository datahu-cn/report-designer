import { BaseComponentOption, DataOperationComponentOption, DataZoomComponentOption, GridComponentOption, LegendComponentOption, SeriesComponentOption, TooltipComponentOption, VisualMapComponentOption, XAxisComponentOption, YAxisComponentOption } from '@datahu/component-base';
import { IControl } from '@datahu/core';
import { Cartesian2dChartComponent, FieldComponentOption } from '../cartesian2dChart';
export declare class BarChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    grid: GridComponentOption;
    xAxis: XAxisComponentOption;
    yAxis: YAxisComponentOption;
    dataZoom: Array<DataZoomComponentOption>;
    series: Array<SeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class BarChartComponent extends Cartesian2dChartComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: BarChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
