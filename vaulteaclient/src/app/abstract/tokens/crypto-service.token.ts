import { InjectionToken } from "@angular/core";

import { CryptoService } from "../../services/crypto-service.interface";

export const CRYPTO_SERVICE: InjectionToken<CryptoService> = new InjectionToken<CryptoService> ("Crypto Service Token");
