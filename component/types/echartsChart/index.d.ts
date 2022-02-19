import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, DataOperationComponentOption } from '@datahu/component-base';
export declare class FieldComponentOption {
    static controls: never[];
    xaxis: never[];
    series: never[];
}
declare class EchartsOptionComponentOption {
    static controls: Array<IControl>;
    map: string;
    code: string;
}
export declare class EchartsChartComponentOption extends BaseComponentOption {
    static controls: Array<IControl>;
    fields: FieldComponentOption;
    dataOperation: DataOperationComponentOption;
    echarts: EchartsOptionComponentOption;
}
export declare class EchartsChartComponent extends BaseComponent {
    icon: string;
    constructor(language: string);
    title: string;
    option: EchartsChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
