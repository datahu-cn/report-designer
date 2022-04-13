/// <reference types="node" />
import { IPackageDefinition } from '@datahu/core';
export declare class ZipHelper {
    static package(definition: IPackageDefinition): Promise<Buffer>;
    static packageBlob(definition: IPackageDefinition): Promise<Blob>;
    static unpackage(content: Buffer): Promise<IPackageDefinition>;
}
