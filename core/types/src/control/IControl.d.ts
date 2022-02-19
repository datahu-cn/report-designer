import { DataMergeType } from '../data';
export declare enum StyleType {
    width = "width",
    height = "height",
    minWidth = "minWidth",
    maxWidth = "maxWidth",
    minHeight = "minHeight",
    maxHeight = "maxHeight",
    textAlign = "textAlign",
    alignItems = "alignItems",
    justifyContent = "justifyContent",
    fontSize = "fontSize",
    color = "color",
    fontFamily = "fontFamily",
    fontWeight = "fontWeight",
    lineHeight = "lineHeight",
    padding = "padding",
    margin = "margin",
    borderWidth = "borderWidth",
    borderColor = "borderColor",
    borderStyle = "borderStyle",
    borderRadius = "borderRadius",
    backgroundColor = "backgroundColor",
    backgroundImage = "backgroundImage"
}
export declare enum ControlType {
    custom = "custom",
    text = "text",
    textarea = "textarea",
    number = "number",
    password = "password",
    select = "select",
    boolean = "boolean",
    date = "date",
    datetime = "datetime",
    color = "color",
    file = "file",
    filePath = "filePath",
    image = "image",
    code = "code",
    fieldSelect = "fieldSelect",
    style = "style",
    styleLength = "styleLength",
    subset = "subset",
    range = "range",
    slider = "slider",
    objectSet = "objectSet",
    graph = "graph",
    graphset = "graphset",
    graphline = "graphline",
    kItemStyle = "kItemStyle",
    numberColor = "numberColor",
    screen = "screen",
    chartScope = "chartScope"
}
export declare enum FieldSelectType {
    nomal = "nomal",
    disableMerge = "disableMerge",
    mustMerge = "mustMerge"
}
export interface IControlOption {
    value: any;
    label: string;
}
export interface IControlValue {
    get: Function;
    set: Function;
}
export interface IControl {
    type: ControlType;
    name?: string;
    title: string;
    description?: string;
    multiple?: boolean;
    show?: boolean | Function | string;
    disabled?: Boolean | Function;
    required?: Boolean | Function;
    min?: number | Function;
    max?: number | Function;
    validate?: Function | string;
    options?: Array<IControlOption> | Array<any> | Function;
    children?: Array<IControl>;
    /** 表示该控件分组是否可为多组，控件对应属性值为数组 */
    array?: boolean;
    /** array 为true时， 标识数组长度是否可变 */
    addable?: boolean | Function;
    defaultValue?: any;
    /** range 类型的数据精度 */
    step?: number | Function;
    value?: IControlValue;
    /** 配置面板上显示 启用和禁用控件时生效的属性 */
    enableProperty?: string;
    mergeType?: DataMergeType;
    fieldSelectType?: FieldSelectType;
    codeDescription?: any;
}
