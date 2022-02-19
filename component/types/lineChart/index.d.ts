import { IControl } from '@datahu/core';
import { Cartesian2dChartComponent, Cartesian2dChartComponentOption } from '../cartesian2dChart/index';
declare class LineChartComponentOption extends Cartesian2dChartComponentOption {
    static controls: Array<IControl>;
}
export declare class LineChartComponent extends Cartesian2dChartComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: LineChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
