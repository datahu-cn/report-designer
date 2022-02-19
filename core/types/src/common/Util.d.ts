import * as Url from './Url';
export declare class Util {
    private static __global;
    static groupBy(value: Array<any>, props: Array<any> | string | Function): any[][];
    static orderBy(arr: Array<any>, pro: string, desc?: boolean): any[];
    static orderByMultiple(arr: Array<any>, orders: Array<any>): any[];
    static copy(v: any, replacer?: any): any;
    static cloneTo(from: any, to: any, deep?: boolean): any;
    static convertPropertyFunctionToString(from: any, copyedObjects?: Array<any>): any;
    static filter(items: Array<any>, expression: any | Function): any[];
    static assignTo(from: any, to: any, deep?: boolean, copyedObjects?: Array<any>): any;
    static uniqueId(prefix?: string): string;
    static isNode(): boolean;
    static sequence(): string;
    static getRow(data: Array<any>, row: string): any[];
    /**
     * set has 操作访问的性能比 Array indexOf 好很多
     * @param data
     * @param row
     * @returns
     */
    static getSet(data: Array<any>, row: string): Set<any>;
    static format: (result: string, ...args: any) => string;
    static Url: typeof Url;
    static loadScript(url: any): Promise<unknown>;
    /**
     * 将表格列转换为行
     * @param rows
     * @param columns :参与转换的列
     * @param categoryColumnName ：存储列名称
     * @param valueColumnName ：存储列的值
     * @returns
     */
    static columnToRows(rows: Array<any>, columns: Array<string>, categoryColumnName?: string, valueColumnName?: string): Array<any>;
    /**
     * 获取集合的前几个元素
     * @param items  集合
     * @param number 元素数量
     * @param pro 排序属性
     * @param desc 是否降序
     * @returns
     */
    static top(items: Array<any>, number: number, pro?: string, desc?: boolean): any[];
    static http: import("axios").AxiosInstance;
    static getServerUrl(): string;
}
