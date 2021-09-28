import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UiKitModule } from '../ui-kit/ui-kit.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    UiKitModule,
  ]
})
export class AuthenticationModule { }
