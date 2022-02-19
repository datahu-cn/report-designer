import { DataMergeMethod } from '@datahu/core';
import { BaseComponent, BaseComponentOption, StyleComponentOption } from '@datahu/component-base';
declare class CardItemComponentOption {
    static controls: never[];
    showLabel: boolean;
    labelPosition: string;
    itemStyle: StyleComponentOption;
    labelStyle: StyleComponentOption;
    valueStyle: StyleComponentOption;
}
declare class CardComponentOption {
    static controls: never[];
    style: StyleComponentOption;
    emptyText: string;
    layout: string;
}
declare class SingleCardFieldComponentOption {
    static controls: never[];
    series: never[];
}
declare class SingleCardComponentOption extends BaseComponentOption {
    static controls: never[];
    mergeMethod: DataMergeMethod;
    fields: SingleCardFieldComponentOption;
    card: CardComponentOption;
    cardItems: Array<CardItemComponentOption>;
}
export declare class SingleCardComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: SingleCardComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
