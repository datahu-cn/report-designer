import { BaseComponentOption, DataOperationComponentOption, DataZoomComponentOption, GridComponentOption, LegendComponentOption, SeriesComponentOption, TooltipComponentOption, VisualMapComponentOption, XAxisComponentOption, YAxisComponentOption, EchartComponentOption } from '@datahu/component-base';
import { IControl } from '@datahu/core';
import { Cartesian2dChartComponent, FieldComponentOption } from '../cartesian2dChart';
export declare class AreaChartComponentOption extends BaseComponentOption {
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
export declare class AreaChartComponent extends Cartesian2dChartComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: AreaChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
