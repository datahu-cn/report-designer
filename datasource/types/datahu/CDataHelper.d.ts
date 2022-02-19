import { ITableDefinition } from '@datahu/core';
export interface ICDataConfig {
    user: any;
    tables: Array<string>;
}
export declare class CDataHelper {
    config: ICDataConfig;
    constructor(config: ICDataConfig);
    request(arg: any): Promise<any>;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
