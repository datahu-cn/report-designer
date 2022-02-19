import { IControl, IComponent, DataMergeMethod, IControlOption } from '@datahu/core';
export * from './Base';
export * from './ChartUtil';
export declare class AmapComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    viewMode: string;
    center: Array<number>;
    zoom: number;
    pitch: number;
    resizeEnable: boolean;
    mapStyle: string;
    renderOnMoving: boolean;
    echartsLayerInteractive: boolean;
    largeMode: boolean;
}
export declare class PosComponentOption {
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    left?: number;
    top?: number;
    width?: string | number;
    height?: string | number;
    fixWidth?: boolean;
    fixHeight?: boolean;
}
export declare class StyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    backgroundColor: string;
    backgroundImage: string;
    backgroundSize: string;
    textAlign: string;
    display: string;
    alignItems: string;
    justifyContent: string;
    width: string;
    height: string;
    minWidth: string;
    maxWidth: string;
    minHeight: string;
    maxHeight: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    lineHeight: string;
    borderTopWidth: string;
    borderTopColor: string;
    borderTopStyle: string;
    borderBottomWidth: string;
    borderBottomColor: string;
    borderBottomStyle: string;
    borderRightWidth: string;
    borderRightColor: string;
    borderRightStyle: string;
    borderLeftWidth: string;
    borderLeftColor: string;
    borderLeftStyle: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderBottomRightRadius: string;
    borderBottomLeftRadius: string;
    graphShape: string;
    constructor(defaultValues?: any);
}
export declare class TitleComponentOption {
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    name: string;
    position: string;
    style: StyleComponentOption;
}
export declare class ContentComponentOption {
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    style: StyleComponentOption;
}
export declare class BodyComponentOption {
    static controls: Array<IControl>;
    style: StyleComponentOption;
    overflow: string;
    constructor(defaultValues?: any);
}
export declare class TooltipComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    style: StyleComponentOption;
    constructor(defaultValues?: any);
}
export declare class LegendComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    orient: string;
    align: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
    textStyle: StyleComponentOption;
    constructor(defaultValues?: any);
}
export declare class GridComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    width: string;
    height: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
    constructor(defaultValues?: any);
}
export declare class LineStyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: string;
    width: number;
    type: string;
}
export declare class AxisLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    interval: string;
    rotate: number;
    constructor(defaultValues?: any);
}
export declare class AxisLineComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    symbol: Array<string>;
    symbolSize: Array<number>;
    symbolOffset: Array<number>;
    lineStyle: LineStyleComponentOption;
    constructor(defaultValues?: any);
}
export declare class AxisTickComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    length?: number;
    lineStyle: LineStyleComponentOption;
    constructor(defaultValues?: any);
}
export declare class XAxisComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    type: string;
    name: string;
    nameLocation: string;
    nameTextStyle: StyleComponentOption;
    position: string;
    inverse: boolean;
    min: number | string;
    max: number | string;
    axisLabel: AxisLabelComponentOption;
    constructor(defaultValues?: any);
}
export declare class YAxisComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    type: string;
    name: string;
    nameLocation: string;
    nameTextStyle: StyleComponentOption;
    position: string;
    inverse: boolean;
    min: number | string;
    max: number | string;
    axisLabel: AxisLabelComponentOption;
    constructor(defaultValues?: any);
}
export declare class SeriesLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    position: string;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    constructor(defaultValues?: any);
}
export declare class MarkPointDataLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    position: string;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    constructor(defaultValues?: any);
}
export declare class MarkLineDataLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    position: string;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    constructor(defaultValues?: any);
}
export declare class ItemStyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: string;
    borderColor: string;
    borderWidth: number;
    borderType: string;
}
export declare class MarkPointDataComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    name: string;
    type: string;
    value: number | null;
    coord: Array<number | null>;
    symbol: string;
    symbolSize: Array<any>;
    itemStyle: ItemStyleComponentOption;
    label: MarkPointDataLabelComponentOption;
}
export declare class MarkPointComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    data: Array<MarkPointDataComponentOption>;
}
export declare class AreaStyleComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: string;
    origin: string;
}
export declare class MarkLineDataComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    name: string;
    type: string;
    value: number | null;
    coord: Array<number | null>;
    symbol: string;
    symbolSize: Array<any>;
    lineStyle: LineStyleComponentOption;
    label: MarkLineDataLabelComponentOption;
}
export declare class MarkLineComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    data: Array<MarkLineDataComponentOption>;
}
export declare class MarkAreaDataLabelComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    show: boolean;
    position: string;
    formatter: string;
    fontSize: string;
    color: string;
    fontFamily: string;
    fontWeight: string;
    constructor(defaultValues?: any);
}
export declare class MarkAreaDataStartComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    name: string;
    type: string;
    value: number | null;
    coord: Array<number | null>;
    itemStyle: ItemStyleComponentOption;
    label: MarkPointDataLabelComponentOption;
}
export declare class MarkAreaDataEndComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    value: number | null;
    coord: Array<number | null>;
}
export declare class MarkAreaDataComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    0: MarkAreaDataStartComponentOption;
    1: MarkAreaDataEndComponentOption;
}
export declare class MarkAreaComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    data: Array<MarkAreaDataComponentOption>;
}
export declare class SeriesComponentOption {
    _enabled: boolean;
    _disabledType: boolean;
    _disabledSort: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    realtimeSort: boolean;
    symbol: string;
    symbolSize: Array<any>;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
        borderType: string;
        borderRadius: number[];
    };
    barWidth: string;
    barMaxWidth: string;
    barMinWidth: string;
    barMinHeight: string;
    barGap: string;
    barCategoryGap: string;
    clip: boolean;
    lineStyle: {
        color: string;
        width: number;
        type: string;
    };
    areaStyle: AreaStyleComponentOption | null;
    stack: string;
    step: string | boolean;
    label: SeriesLabelComponentOption;
    smooth: number;
    markPoint: MarkPointComponentOption;
    markLine: MarkLineComponentOption;
    markArea: MarkAreaComponentOption;
}
export declare class RangeComponentOption {
    _enabled: boolean;
    _rangeTypes: Array<string>;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    color: Array<string>;
    symbolSize: Array<number>;
    symbol: Array<string>;
}
export declare class PieceComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    min: number;
    max: number;
    value: string | null;
    label: string | null;
    color: string | null;
}
export declare class VisualMapComponentOption {
    _enabled: boolean;
    _seriesOpts: Array<any>;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    show: boolean;
    type: string;
    showLabel: boolean;
    color: Array<string>;
    dimension: number | null;
    seriesIndex: number | null;
    pieces: Array<PieceComponentOption>;
    min: number;
    max: number;
    precision: number;
    splitNumber: number;
    categories: Array<string>;
    range: Array<number>;
    inRange: RangeComponentOption;
    outOfRange: RangeComponentOption;
    align: string;
    text: Array<string>;
    calculable: boolean;
    orient: string;
    left: string;
    right: string | null;
    top: string;
    bottom: string | null;
    itemWidth: string;
    itemHeight: string;
    textStyle: StyleComponentOption;
}
export declare class PolarComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    center: Array<string>;
    radius: string;
}
export declare class AngleAxisComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    startAngle: number;
    clockwise: boolean;
    min: number | string;
    max: number | string;
    axisLabel: AxisLabelComponentOption;
}
export declare class RadiusAxisComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    name: string;
    nameLocation: string;
    nameTextStyle: StyleComponentOption;
    type: string;
    axisLabel: AxisLabelComponentOption;
}
export declare class DataOperationComponentOption {
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    _supportPartRefresh: boolean;
    _supportDrillDown: boolean;
    _supportScope: boolean;
    partRefresh: boolean;
    showDrillDown: boolean;
    showDataViewer: boolean;
    showFullScreen: boolean;
    scope: any;
}
declare class EventActionComponentOption {
    static controls: Array<IControl>;
    trigger: string;
    handler: string;
    page: string;
    link: string;
    code: string;
}
declare class EventComponentOption {
    static controls: never[];
    actions: Array<EventActionComponentOption>;
    customEvents?: Array<IControlOption>;
}
export declare class DataZoomComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    type: string;
    orient: string;
    start: number;
    end: number;
    zoomLock: boolean;
    backgroundColor: string;
    fillerColor: string;
    handleIcon: string;
    handleSize: string;
    moveHandleSize: number;
    left: string;
    right: string;
    top: string;
    bottom: string;
}
export declare class BaseComponentOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    mergeMethod: DataMergeMethod;
    event: EventComponentOption;
    body?: BodyComponentOption;
    title?: TitleComponentOption;
    content?: ContentComponentOption;
    pos: PosComponentOption;
    disableResize: boolean;
    disableDrag: boolean;
}
export declare class BaseComponent implements IComponent {
    isLayout: boolean;
    language: string;
    icon: string;
    title: string;
    description: string;
    children: Array<IComponent>;
    constructor(language: string);
    option: any;
    private _controls;
    private formatControls;
    getControls(): Array<IControl>;
    getComponent(): any;
    setOption(option: any): void;
}
