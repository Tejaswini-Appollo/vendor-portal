import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnAuthGuard],
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot_password', component: ForgotPasswordComponent },
      { path: 'reset_password', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
