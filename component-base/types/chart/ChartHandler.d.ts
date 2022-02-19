import { IChartDefinition } from '@datahu/core';
export declare enum EventNames {
    ChartMounted = "ChartMounted",
    ChartUnmounted = "ChartUnmounted",
    ComponentMounted = "ComponentMounted",
    ComponentUnmounted = "ComponentUnmounted"
}
export interface IChartEvent {
    chart: IChartDefinition;
    name: EventNames;
    key: String;
    enabledWhenView: boolean;
    title?(): string;
    handle(arg: any): any;
}
export declare class ChartHandler {
    events: Array<IChartEvent>;
    instances: Array<any>;
    getInstance(chart: IChartDefinition): any;
    getEvents(chart: IChartDefinition): IChartEvent[];
    addInstance(instance: any): void;
    removeInstance(instance: any): void;
    checkExist(chartEvent: IChartEvent): IChartEvent | null;
    addEvent(chartEvent: IChartEvent): void;
    removeEvent(chartEvent: IChartEvent): void;
    addEvents(events: Array<IChartEvent>): void;
    removeEvents(events: Array<IChartEvent>): void;
    triggerEvent(chart: IChartDefinition, name: EventNames, args: any): void;
}
