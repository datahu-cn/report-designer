import { IPackageDefinition } from '@datahu/core';
/**
 * 报表保存时，将插件加入到报表定义文件中
 * @param pkg
 * @returns
 */
export declare function setPackagePlugins(pkg: IPackageDefinition): any[];
/**
 * 加载 报表定义文件中的插件， 如果文件中的插件与本地插件重名， 优先使用本地的插件
 * @param pkg
 */
export declare function loadPackagePlugins(pkg: IPackageDefinition): Promise<void>;
export declare function loadDevComponents(): Promise<void>;
export declare function getPlugins(): any;
export declare function loadPlugins(): Promise<void>;
export declare function addPlugin(): Promise<void>;
export declare function removePlugin(plugin: any): Promise<void>;
