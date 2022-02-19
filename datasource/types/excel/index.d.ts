import { IControl, SourceCode, ITableDefinition } from '@datahu/core';
import { BaseDataSource, BaseDataSourceOption } from '../base';
import { ExcelHelper } from './ExcelHelper';
export declare class ExcelDataSourceOption extends BaseDataSourceOption {
    static controls: Array<IControl>;
    source: string;
    customStart: boolean;
    startRow: number;
    startColumn: number;
}
export declare class ExcelDataSource extends BaseDataSource {
    helper?: ExcelHelper;
    constructor(language: string, config?: ExcelDataSourceOption);
    config: ExcelDataSourceOption;
    icon: string;
    sourceCode: SourceCode;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
}
