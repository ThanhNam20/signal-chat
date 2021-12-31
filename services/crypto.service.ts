import { SALT } from "@env";
import CryptoES from "crypto-es";

const encryptPassWord = (password: string, salt = SALT) => {
  const encryptPassWord = CryptoES.AES.encrypt(password, salt);
  return encryptPassWord;
}

const decryptPassWord = ( encryptPassWord: string, salt = SALT) => {
  const decryptPassWord = CryptoES.AES.decrypt(encryptPassWord, salt);
  return decryptPassWord.toString(CryptoES.enc.Utf8);
}

export const CryptoService = {encryptPassWord, decryptPassWord};



