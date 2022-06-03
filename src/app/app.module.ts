import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  BrowserCryptoBusinessLogicService, BrowserCryptoFunctionService, CryptoBusinessLogicService,
  CryptoFunctionService, UserKeyService
} from "@crypto";
import { AuthInterceptor } from "@identity";
import { SnackBarService } from "@ui-kit";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UiKitModule } from "./ui-kit/ui-kit.module";
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent
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
    UiKitModule
  ],
  providers: [
    UserKeyService,
    SnackBarService,
    { provide: CryptoBusinessLogicService, useClass: BrowserCryptoBusinessLogicService },
    { provide: CryptoFunctionService, useClass: BrowserCryptoFunctionService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
