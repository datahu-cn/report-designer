import { ILocalStorage } from './ILocalStorage';
export declare class WebLocalStorage implements ILocalStorage {
    key: string;
    constructor(key: string);
    getStore(): Promise<any>;
    setStore(store: any): void;
    setUserStore(arg: any): Promise<any>;
    removeUserStore(arg: any): Promise<any>;
    setLanguageStore(arg: any): Promise<any>;
    storeRecenty(filePath: string): Promise<any>;
    addPlugin(arg: any): Promise<any>;
    removePlugin(arg: any): Promise<any>;
}
