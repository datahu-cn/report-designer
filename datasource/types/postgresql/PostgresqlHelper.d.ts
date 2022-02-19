import { ITableDefinition, ITableQueryPager } from '@datahu/core';
export declare class PostgresqlHelper {
    config: any;
    pool?: any;
    constructor(config: any);
    createPool(): Promise<void>;
    query(sql: string): Promise<any>;
    private getColumnType;
    getTables(pager: ITableQueryPager): Promise<any>;
    private getSql;
    getData(tables: Array<ITableDefinition>): Promise<Array<any>>;
    end(): Promise<void>;
}
