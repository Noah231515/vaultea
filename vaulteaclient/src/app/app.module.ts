import { CRYPTO_SERVICE } from "@abstract";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { USER_SERVICE } from "./abstract/tokens/user-service.token";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { BrowserCryptoService } from "./services/browser-crypto.service";
import { BrowserUserService } from "./services/browser-user.service";

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
    {provide: CRYPTO_SERVICE, useClass: BrowserCryptoService},
    {provide: USER_SERVICE, useClass: BrowserUserService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
