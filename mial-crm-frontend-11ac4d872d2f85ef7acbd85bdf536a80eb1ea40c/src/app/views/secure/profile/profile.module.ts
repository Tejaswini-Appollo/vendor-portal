import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewProfileComponent } from './view/view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from '@shared/shared.module';
import { EditProfileComponent } from './edit/edit.component';

@NgModule({
  declarations: [ViewProfileComponent, ChangePasswordComponent, EditProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
