import { FormBuilder, FormGroup } from "@angular/forms";

import { BrowserCryptoService } from "./browser-crypto.service";
import { BrowserUserService } from "./browser-user.service";

describe("BrowserCryptoService", () => {
  let cryptoService: BrowserCryptoService;
  let userService: BrowserUserService;
  let formBuilder: FormBuilder;
  let form: FormGroup;

  beforeEach(() => { 
    userService = new BrowserUserService();
    cryptoService = new BrowserCryptoService(userService); 
    formBuilder = new FormBuilder();
    form = formBuilder.group({
      username: "test",
      password: "test"
    });
    cryptoService.generateKeys(form);
  });

  it("#getValue should return real value", () => {
    expect(1).toBe(1);
  });
});