import { IControl, IDataSource, SourceCode, ITableDefinition, ITableQueryPager } from '@datahu/core';
export declare class BaseDataSourceOption {
    _enabled: boolean;
    static controls: Array<IControl>;
    constructor(defaultValues?: any);
    title: string;
}
export declare class BaseDataSource implements IDataSource {
    language: string;
    icon: string;
    constructor(language: string, config?: object);
    getTables(pager?: ITableQueryPager | null): Promise<ITableDefinition[]>;
    getData(tables: ITableDefinition[]): Promise<object[]>;
    disableNew?: boolean | undefined;
    title: string;
    description: string;
    sourceCode: SourceCode;
    config: any;
    private _controls;
    private formatControls;
    getControls(): Array<IControl>;
    setOption(option: any): void;
}
