import { ILocalStorage } from './ILocalStorage';
export interface IDesignerUser {
    token?: string;
    user: {
        name: string;
        avatar: string;
        id: any;
    };
    server?: string;
}
export declare enum HeaderToolbarMenu {
    New = 0,
    Developer = 1,
    Open = 2,
    Recent = 3,
    Save = 4,
    SaveAs = 5,
    DataRefresh = 6,
    DataNew = 7,
    DataOnline = 8,
    DataList = 9,
    Relationship = 10,
    Role = 11,
    Publish = 12,
    Preview = 13,
    Theme = 14
}
export interface IDataHuDesignerOption {
    getData?: Function;
    getSupportDataSources?: Function;
    sms?: Function;
    login?: Function;
    logout?: Function;
    publishCheck?: Function;
    publish?: Function;
    getUserinfo?: Function;
    searchTables?: Function;
    openLink?: Function;
    getTables?: Function;
    load?: Function;
    loadFrom?: Function;
    loadFromServer?: Function;
    save?: Function;
    saveAs?: Function;
    openAndReadFile?: Function;
    localStorage?: ILocalStorage;
    useHandle?: Function;
    language?: string;
    toolbars: Array<HeaderToolbarMenu>;
}
