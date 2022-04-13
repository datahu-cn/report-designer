import {IPackageDefinition} from '@datahu/core'
import JSZip from 'jszip'

export class ZipHelper {
  static async package(definition: IPackageDefinition): Promise<Buffer> {
    let content = JSON.stringify(definition)
    let zip = new JSZip()
    zip.file('file', content)
    let buffer: Buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    })
    return buffer
  }

  static async packageBlob(definition: IPackageDefinition): Promise<Blob> {
    let content = JSON.stringify(definition)
    let zip = new JSZip()
    zip.file('file', content)
    let buffer: Blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE'
    })
    return buffer
  }

  static async unpackage(content: Buffer): Promise<IPackageDefinition> {
    let zipFiles = await JSZip.loadAsync(content)
    let text = await zipFiles.file('file')!.async('string')
    let pkg = JSON.parse(text)
    return pkg
  }
}
