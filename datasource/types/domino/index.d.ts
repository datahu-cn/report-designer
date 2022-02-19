import { IControl, SourceCode, ITableDefinition } from '@datahu/core';
import { BaseDataSource, BaseDataSourceOption } from '../base';
import { DominoHelper } from './DominoHelper';
export declare class DominoDataSourceOption extends BaseDataSourceOption {
    static controls: Array<IControl>;
    url: string;
    username: string;
    password: string;
    database: string;
    view: string;
    queryAll: boolean;
    params: Array<any>;
}
export declare class DominoDataSource extends BaseDataSource {
    helper?: DominoHelper;
    constructor(language: string, config?: DominoDataSourceOption);
    config: DominoDataSourceOption;
    icon: string;
    sourceCode: SourceCode;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
