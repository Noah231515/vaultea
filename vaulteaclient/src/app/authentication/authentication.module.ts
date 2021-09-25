import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
    MatInputModule
  ]
})
export class AuthenticationModule { }
