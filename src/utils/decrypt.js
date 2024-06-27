import CryptoJS from 'crypto-js';

/**
 * @name AESKey
 * @description 生成 AES Key
 * @return 随机生成 16 位的 AES Key
 */
export const createAesKey = () => {
  const expect = 16;
  let str = Math.random().toString(36).substring(2);
  while (str.length < expect) {
    str += Math.random().toString(36).substring(2);
  }
  str = str.substring(0, 16);
  return str;
};

/**
 * @name AES-加密
 * @param raw 待加密字段
 * @param AESKey AES Key
 * @return {string} 返回加密字段
 */
export const aesEncrypt = (raw, AESKey) => {
  const cypherKey = CryptoJS.enc.Utf8.parse(AESKey);
  CryptoJS.pad.ZeroPadding.pad(cypherKey, 4);
  const iv = CryptoJS.SHA256(AESKey).toString();
  const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) };
  return CryptoJS.AES.encrypt(raw, cypherKey, cfg).toString();
};

/**
 * @name AES-解密
 * @param raw 待解密数据
 * @param AESKey 解密 key
 * @returns {string} 返回解密字符串
 */
export const aesDecrypt = (raw, AESKey) => {
  const cypherKey = CryptoJS.enc.Utf8.parse(AESKey);
  CryptoJS.pad.ZeroPadding.pad(cypherKey, 4);
  const iv = CryptoJS.SHA256(AESKey).toString();
  const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) };
  const decrypt = CryptoJS.AES.decrypt(raw, cypherKey, cfg);
  return CryptoJS.enc.Utf8?.stringify(decrypt).toString();
};
