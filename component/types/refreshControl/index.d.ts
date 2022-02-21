import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption } from '@datahu/component-base';
declare class RefreshScheduleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    tables: Array<string>;
    interval: number | null;
    manual: boolean;
    refreshWhenPageLoad: boolean;
}
declare class RefreshPanelComponentOption {
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    disabledWhenDesign: boolean;
    showNextTime: boolean;
}
declare class RefreshControlComponentOption extends BaseComponentOption {
    static controls: never[];
    refreshPanel: RefreshPanelComponentOption;
    refreshSchedules: Array<RefreshScheduleComponentOption>;
}
export declare class RefreshControlComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: RefreshControlComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
