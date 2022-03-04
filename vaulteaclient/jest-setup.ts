/* eslint-disable @typescript-eslint/no-var-requires */
const nodeCrypto = require("crypto");

Object.defineProperty(window, "crypto", {
  value: {
    crypto: nodeCrypto,
    subtle: nodeCrypto.subtle,
    getRandomValues: (arr: any[]) => nodeCrypto.randomBytes(arr.length)
  }
});

Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => {
      return "";
    }
  })
});
