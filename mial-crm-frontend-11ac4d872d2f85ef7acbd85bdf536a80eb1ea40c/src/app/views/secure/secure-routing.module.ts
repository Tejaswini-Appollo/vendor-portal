import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from '@shared/constants/constants';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'vendor_management',
    canActivate: [AuthenticationGuard, NgxPermissionsGuard],
    loadChildren: () => import('@secure/user/user.module').then((module) => module.UserModule),
    data: {
      permissions: {
        only: [ROLES.ADMIN],
        redirectTo: '/',
      },
    },
  },

  {
    path: '',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('@secure/profile/profile.module').then((module) => module.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
