import * as Influx from 'influx';
import { ITableDefinition } from '@datahu/core';
import { InfluxDataSourceOption } from './index';
export declare class InfluxHelper {
    config: InfluxDataSourceOption;
    pool?: Influx.InfluxDB;
    constructor(config: InfluxDataSourceOption);
    createPool(): Promise<void>;
    query(sql: string): Promise<any>;
    private getColumnType;
    getTables(): Promise<Array<ITableDefinition>>;
    private getSql;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
    end(): void;
}
