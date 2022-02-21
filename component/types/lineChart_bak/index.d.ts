import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, TooltipComponentOption, LegendComponentOption, GridComponentOption, XAxisComponentOption, YAxisComponentOption, SeriesComponentOption, VisualMapComponentOption, PolarComponentOption, AngleAxisComponentOption, RadiusAxisComponentOption, EchartComponentOption } from '@datahu/component-base';
declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
    tooltip: never[];
    visual: never[];
}
declare class LineChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    echart?: EchartComponentOption;
    tooltip?: TooltipComponentOption;
    legend: LegendComponentOption;
    grid: Array<GridComponentOption>;
    xAxis: Array<XAxisComponentOption>;
    yAxis: Array<YAxisComponentOption>;
    polar: Array<PolarComponentOption>;
    radiusAxis: Array<RadiusAxisComponentOption>;
    angleAxis: Array<AngleAxisComponentOption>;
    series: Array<SeriesComponentOption>;
    visualMap: Array<VisualMapComponentOption>;
}
export declare class LineChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    option: LineChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
