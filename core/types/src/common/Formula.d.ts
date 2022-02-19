export declare class Formula {
    /**
     * 等于
     * @param a
     * @param b
     * @returns
     */
    static eq(a: any, b: any): boolean;
    /**
     * 不等于
     * @param a
     * @param b
     * @returns
     */
    static notEq(a: any, b: any): boolean;
    /**
     * 大于
     * @param a
     * @param b
     * @returns
     */
    static gt(a: any, b: any): boolean;
    /**
     * 大于等于
     * @param a
     * @param b
     * @returns
     */
    static gtOrEq(a: any, b: any): boolean;
    /**
     * 小于
     * @param a
     * @param b
     * @returns
     */
    static lt(a: any, b: any): boolean;
    /**
     * 小于等于
     * @param a
     * @param b
     * @returns
     */
    static ltOrEq(a: any, b: any): boolean;
    /**
     * 为空
     * @param a
     * @param b
     * @returns
     */
    static isNull(a: any): boolean;
    /**
     * 不为空
     * @param a
     * @param b
     * @returns
     */
    static isNotNull(a: any): boolean;
    /**
     * 包含
     * @param a
     * @param b
     * @returns
     */
    static contains(a: any, b: any): boolean;
    /**
     * 不包含
     * @param a
     * @param b
     * @returns
     */
    static notContains(a: any, b: any): boolean;
    /**
     * 开头是
     * @param a
     * @param b
     * @returns
     */
    static startsWith(a: any, b: any): any;
    /**
     * 开头不是
     * @param a
     * @param b
     * @returns
     */
    static notStartsWith(a: any, b: any): boolean;
    /**
     * 是否存在， 字符、数字、时间等格式需要单独处理
     * @param a
     * @param b
     * @returns
     */
    static in(a: any, b: Array<any>): boolean;
    /**
     * 去掉重复值后的集合
     * @param items
     * @param field
     * @returns
     */
    static distinct(items: Array<any>, field?: string): Array<any>;
    /**
     * 唯一计数， 排除了重复值
     * @param items
     * @param field
     * @returns
     */
    static distinctCount(items: Array<any>, field?: string): number;
    /**
     * 计数， 没有排除重复值
     * @param items
     * @param field
     * @returns
     */
    static count(items: Array<any>, field?: string): number;
    /**
     * 求和
     * @param items
     * @param field
     * @returns
     */
    static sum(items: Array<any>, field?: string): number;
    /**
     * 最大值
     * @param items
     * @param field
     * @returns
     */
    static max(items: Array<any>, field?: string): any;
    /**
     * 最小值
     * @param items
     * @param field
     * @returns
     */
    static min(items: Array<any>, field?: string): any;
    /**
     * 最小值
     * @param items
     * @param field
     * @returns
     */
    static first(items: Array<any>, field?: string): any;
    /**
     * 最小值
     * @param items
     * @param field
     * @returns
     */
    static last(items: Array<any>, field?: string): any;
    /**
     * 平均值
     * @param items
     * @param field
     * @returns
     */
    static avg(items: Array<any>, field?: string): number;
    /**
     * 集合
     * @param items
     * @param field
     * @returns
     */
    static collection(items: Array<any>, field?: string): any;
}
