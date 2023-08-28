const crypto = require('crypto');

export const getISOString = () => {
  return new Date().toISOString();
};

export const generateToken = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const token = Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((byte:any) => characters[byte % characters.length])
    .join('');

  return token;
};