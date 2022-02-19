import { ITableDefinition } from '@datahu/core';
export interface IDominoConfig {
    url: string;
    username: string;
    password: string;
    database: string;
    view: string;
    queryAll: boolean;
    params: Array<any>;
}
export declare class DominoHelper {
    config: IDominoConfig;
    constructor(config: any);
    getAxiosConig(): any;
    formatData(datas: any): Array<ITableDefinition>;
    private getUrl;
    getTables(): Promise<Array<ITableDefinition>>;
    getAllData(config: any): Promise<any[]>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
