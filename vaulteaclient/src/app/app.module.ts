import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CryptoService } from "./abstract/services/crypto.service";
import { UserService } from "./abstract/services/user.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { BrowserCryptoService } from "./services/browser-crypto.service";

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
    { provide: CryptoService, useClass: BrowserCryptoService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
