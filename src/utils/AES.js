/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 10:45:32
 * @LastEditTime: 2019-12-18 11:50:04
 */
const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("b597def38402ba8c");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('9583012938476028');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let hexStr = encrypted.ciphertext.toString().toUpperCase();
  let base64Str = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hexStr));
  return base64Str
}

export default {
  Decrypt,
  Encrypt
}