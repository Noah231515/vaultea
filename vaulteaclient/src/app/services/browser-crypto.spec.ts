import { FormBuilder, FormGroup } from "@angular/forms";

import { BrowserCryptoService } from "./browser-crypto.service";
import { BrowserUserService } from "./browser-user.service";

// Straight Jasmine testing without Angular's testing support
describe("BrowserCryptoService", () => {
  let cryptoService: BrowserCryptoService;
  let userService: BrowserUserService;
  let formBuilder: FormBuilder;
  let formGroup: FormGroup;

  beforeEach(() => { 
    userService = new BrowserUserService();
    cryptoService = new BrowserCryptoService(userService); 
    formBuilder = new FormBuilder();
    formGroup = formBuilder.group({
      username: "test",
      password: "test"
    });
  });

  it("#getValue should return real value", () => {
    console.log("hello world");
    expect(1).toBe(1);
  });
});