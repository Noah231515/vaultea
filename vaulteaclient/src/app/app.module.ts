import { CryptoBusinessLogicService, CryptoFunctionService, UserKeyService } from "@abstract";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "@shared";
import { SnackBarService } from "@ui-kit";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { BrowserCryptoBusinessLogicService } from "./shared/services/browser-crypto-business-logic.service";
import { BrowserCryptoFunctionService } from "./shared/services/browser-crypto-function.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    UserKeyService,
    SnackBarService,
    { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
    { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true,
    //   deps: [SnackBarService],

    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
