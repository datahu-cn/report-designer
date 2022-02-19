export declare class Crypto {
    /**
     * 加密
     * @param sercet 需加密内容
     * @param iv 偏移量
     * @returns
     */
    static Encrypt(sercet: string, iv: string): string;
    /**
     * 解密
     * @param ciphertext 需解密内容
     * @param iv 偏移量
     * @returns
     */
    static Decrypt(ciphertext: string, iv: string): string;
}
