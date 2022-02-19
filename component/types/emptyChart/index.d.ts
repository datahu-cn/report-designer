import { DataMergeMethod } from '@datahu/core';
import { BaseComponent, BaseComponentOption } from '@datahu/component-base';
declare class EmptyChartComponentOption extends BaseComponentOption {
    static controls: never[];
    mergeMethod: DataMergeMethod;
}
export declare class EmptyChartComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: EmptyChartComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
