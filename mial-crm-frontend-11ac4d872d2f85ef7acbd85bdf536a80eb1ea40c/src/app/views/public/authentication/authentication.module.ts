import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppFooterModule } from '@coreui/angular';
import { SharedModule } from '@shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [CommonModule, AuthenticationRoutingModule, AppFooterModule, SharedModule],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class AuthenticationModule {}
