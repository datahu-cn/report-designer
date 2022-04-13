/// <reference types="node" />
import { IPackageDefinition } from '@datahu/core';
import { HeaderToolbarMenu, IDataHuDesignerOption, IDesignerUser } from './IDataHuDesignerOption';
import { WebLocalStorage } from './WebLocalStorage';
export declare abstract class WebDataHuDesignerOption implements IDataHuDesignerOption {
    toolbars: HeaderToolbarMenu[];
    language: string;
    localStorage: WebLocalStorage;
    constructor(user?: IDesignerUser | null);
    getPublishFormData(arg: any): Promise<FormData>;
    openLink(arg: any): Promise<void>;
    unpackage(buffer: Buffer): Promise<IPackageDefinition>;
    save(arg: any): Promise<any>;
    saveAs(arg: any): Promise<any>;
    openAndReadFile(): Promise<unknown>;
    useHandle(fun: Function): void;
}
