import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDetail } from '@public/authentication/authentication.model';
import { getUserDetails } from '@public/authentication/store/authentication.selector';
import { REGEX_PATTERNS } from '@shared/constants/constants';
import { ErrorResponse } from '@shared/models/shared.model';
import { FormStateService } from '@shared/services/form-state.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UpdateProfileForm } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  templateUrl: './edit.component.html',
})
export class EditProfileComponent implements OnInit, OnDestroy {
  initialLoading: boolean = true;
  hasData: boolean;
  hasValidationError: boolean;
  editProfileForm: FormGroup;
  isLoading: boolean;
  validationErrors: string[];
  private user: UserDetail;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private profileService: ProfileService,
    private toasterService: ToastrService,
    private router: Router,
    private formStateService: FormStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const observer = this.store.select(getUserDetails).subscribe((user: UserDetail) => {
      this.user = user;
      this.initialLoading = false;
      this.hasData = true;
      this.setFormValue();
    });
    this.subscription.add(observer);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initializeForm(): void {
    this.editProfileForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

      mobile_no: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(REGEX_PATTERNS.mobile),
        ],
      ],
      email: [{ value: null, disabled: true }],
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.editProfileForm.controls;
  }

  setFormValue(): void {
    this.editProfileForm.setValue({
      name: this.user.name,
      email: this.user.email,
    });
    this.formStateService.isFormPristine(this.editProfileForm);
  }

  onFormSubmit(): void {
    if (this.editProfileForm.valid) {
      this.isLoading = true;
      const userDetails: UpdateProfileForm = {
        name: this.formControls.name.value,
        mobile_no: this.formControls.mobile_no.value,
      };
      this.profileService.updateUserDetail(userDetails).subscribe(
        () => {
          this.toasterService.success('Profile has been updated successfully');
          this.router.navigateByUrl('profile');
        },
        (error: ErrorResponse) => {
          if (error.hasValidationError) {
            this.hasValidationError = true;
            this.validationErrors = error.errorList;
          } else {
            this.hasValidationError = false;
            window.scrollTo(0, 0);
            this.toasterService.error(error.message);
          }
          this.isLoading = false;
        }
      );
    }
  }
}
