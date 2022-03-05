import { IControl } from '@datahu/core';
import { BaseComponent, BaseComponentOption, DataOperationComponentOption, StyleComponentOption } from '@datahu/component-base';
declare class SlicerComponentOption {
    static controls: never[];
    type: string;
    slider: boolean;
    vertical: boolean;
    step: number;
    stepWidth: string;
    tooltipVisible: boolean;
    showMinMark: boolean;
    showMaxMark: boolean;
    showYearMark: boolean;
    showMonthMark: boolean;
    showDayMark: boolean;
    showHourMark: boolean;
    showMinuteMark: boolean;
    showWeekMark: boolean;
    marks: Array<string>;
    reverse: boolean;
    placeholder: string;
    placeholders: Array<string>;
    defaultValue: string | null;
    defaultValues: Array<string | null>;
    ranges: Array<string>;
    style: StyleComponentOption;
    itemLayout: string;
    itemStyle: StyleComponentOption;
    selectedItemStyle: StyleComponentOption;
}
declare class SimpleSlicerFieldComponentOption {
    static controls: never[];
    series: never[];
}
declare class AnimationComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    showPlayBtn: boolean;
    loop: boolean;
    playInterval: number;
    inverse: boolean;
    steps: number;
}
declare class SimpleSlicerComponentOption extends BaseComponentOption {
    static controls: never[];
    fields: SimpleSlicerFieldComponentOption;
    dataOperation: DataOperationComponentOption;
    slicer: SlicerComponentOption;
    animation: AnimationComponentOption;
}
export declare class SimpleSlicerComponent extends BaseComponent {
    isLayout: boolean;
    icon: string;
    constructor(language: string);
    title: string;
    option: SimpleSlicerComponentOption;
    getComponent(): import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}
export {};
