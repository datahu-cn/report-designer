import { IPackageDefinition, IConnectorDefinition, ITableDefinition, IColumnDefinition, IChartDefinition, IRelationshipDefinition, DataContext, ITablePosition } from '@datahu/core';
export declare class PackageManager {
    static emptyPkg(language?: string): PackageManager;
    definition: IPackageDefinition;
    dataContext: DataContext;
    path: string;
    actions: Array<any>;
    lastSaved: Date;
    language: string;
    constructor(definition: IPackageDefinition, path: string, language?: string);
    init(): void;
    static load(path: string, disabledError?: boolean, language?: string): Promise<PackageManager>;
    static loadFrom(language?: string): Promise<PackageManager>;
    static loadFromServer(params: any, language?: string): Promise<PackageManager>;
    getConnector(id: any): IConnectorDefinition;
    getChart(): IChartDefinition;
    getTables(): Array<ITableDefinition>;
    loadData(force: boolean): Promise<void>;
    refreshTableData(tables: Array<ITableDefinition>, force?: boolean): Promise<void>;
    refreshTableDataById(tableIds: Array<string>, force?: boolean): Promise<void>;
    refreshTableDataByName(tableNames: Array<string>, force?: boolean): Promise<void>;
    refreshAllTableData(force?: boolean): Promise<void>;
    resetData(): void;
    getName(): string;
    hasPath(): boolean;
    save(showMessage?: boolean): Promise<void>;
    saveAs(showMessage?: boolean): Promise<void>;
    setPreviewImage(url: string, type: string): void;
    getTheme(): string;
    setTheme(name: string): void;
    removeConnector(connector: IConnectorDefinition): void;
    removeTable(table: ITableDefinition): void;
    addTable(table: ITableDefinition): void;
    addColumn(table: ITableDefinition, column: IColumnDefinition): void;
    /**
     * 检查关系连接冲突
     * @param relations
     * @returns 有冲突的关系
     */
    checkRelations(relations: Array<IRelationshipDefinition>): IRelationshipDefinition | null;
    updateRelations(relations: Array<IRelationshipDefinition>): void;
    editColumn(table: ITableDefinition, column: IColumnDefinition, editColumn: IColumnDefinition): void;
    renameColumn(table: ITableDefinition, column: IColumnDefinition, alias: string): void;
    editColumnWithoutUpdateData(table: ITableDefinition, column: IColumnDefinition, action: string): void;
    editColumnFilter(table: ITableDefinition, column: IColumnDefinition): void;
    editColumnType(table: ITableDefinition, column: IColumnDefinition): void;
    editColumnOrderBy(table: ITableDefinition, column: IColumnDefinition): void;
    editColumnFormula(table: ITableDefinition, column: IColumnDefinition): void;
    getTableData(table: ITableDefinition): Array<any>;
    removeColumn(table: ITableDefinition, column: IColumnDefinition): void;
    downColumn(table: ITableDefinition, column: IColumnDefinition): void;
    downTable(table: ITableDefinition): void;
    renameTable(table: ITableDefinition, alias: string): void;
    changeTableCacheType(table: ITableDefinition): void;
    editTableFormula(table: ITableDefinition): void;
    removeChart(parent: IChartDefinition, chart: IChartDefinition): void;
    addChart(parent: IChartDefinition, chart: IChartDefinition): void;
    addAction(action: string, target: any): void;
    /**
     * 切换图表的显示层次
     * @param parent
     * @param chart
     * @param level
     */
    switchLevel(parent: IChartDefinition, chart: IChartDefinition, level: number): void;
    updateTablePosition(table: ITablePosition): void;
    updateTableProperties(table: ITablePosition): void;
    updateOption(chart: IChartDefinition, arg: any): void;
    updateFields(chart: IChartDefinition): void;
    updateFilter(chart: IChartDefinition): void;
    updateGlobalFilter(): void;
    /**
     * 数据行级权限控制，更新角色设置
     * @param item
     */
    updateRole(item: any): void;
    hasChange(): boolean;
}
