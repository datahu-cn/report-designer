import {AES, enc} from 'crypto-ts'
export class Crypto {
  /**
   * 加密
   * @param sercet 需加密内容
   * @param iv 偏移量
   * @returns
   */
  static Encrypt(sercet: string, iv: string) {
    return AES.encrypt(sercet, iv).toString()
  }

  /**
   * 解密
   * @param ciphertext 需解密内容
   * @param iv 偏移量
   * @returns
   */
  static Decrypt(ciphertext: string, iv: string) {
    const bytes = AES.decrypt(ciphertext, iv)
    return bytes.toString(enc.Utf8)
  }
}
