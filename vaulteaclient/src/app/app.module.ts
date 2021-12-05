import { CryptoBusinessLogicService, CryptoFunctionService, UserService } from "@abstract";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "@shared";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { BrowserCryptoService } from "./services/browser-crypto.service";
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
    UserService,
    { provide: CryptoBusinessLogicService, useClass: BrowserCryptoService },
    { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
