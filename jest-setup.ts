/* eslint-disable @typescript-eslint/no-var-requires */
const nodeCrypto = require("crypto");

Object.defineProperty(window, "crypto", {
  value: {
    subtle: nodeCrypto.webcrypto.subtle,
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
