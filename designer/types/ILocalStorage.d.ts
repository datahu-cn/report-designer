export interface ILocalStorage {
    getStore(): any;
    setUserStore(arg: any): any;
    removeUserStore(arg: any): any;
    setLanguageStore(arg: any): any;
    storeRecenty(arg: any): any;
    addPlugin(arg: any): any;
    removePlugin(arg: any): any;
}
