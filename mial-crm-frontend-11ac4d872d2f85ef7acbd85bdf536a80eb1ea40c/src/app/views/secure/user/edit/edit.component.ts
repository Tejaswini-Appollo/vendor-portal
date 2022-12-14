import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { REGEX_PATTERNS } from '@shared/constants/constants';
import { ErrorResponse } from '@shared/models/shared.model';
import { FormStateService } from '@shared/services/form-state.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GetUser, UserForm, UserResponse } from '../user.model';
import { UserService } from '../user.service';

@Component({
  templateUrl: './edit.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  editUserForm: FormGroup;
  isLoading: boolean;
  hasValidationError: boolean;
  validationErrors: string[];
  hasUser: boolean;
  initialLoading = true;
  private userId: number;
  private subscriptions = new Subscription();
  private currentUser: UserResponse;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService,
    private userService: UserService,
    private formState: FormStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.route.snapshot.params.id;
    this.getUserAndInitializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeForm(): void {
    this.editUserForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      park: [null],
      mobile_no: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(REGEX_PATTERNS.mobile),
        ],
      ],
      email: [null],
    });
  }

  private getUserAndInitializeForm(): void {
    const observer = this.userService.getUserDetails(this.userId).subscribe(
      (user: GetUser) => {
        this.editUserForm.patchValue({
          name: user.name,
          role: user.role,
          park: user.park_name,
          mobile_no: user.mobile_no,
          email: user.email,
        });
        this.currentUser = user;
        this.hasUser = true;
        this.initialLoading = false;
        this.formState.isFormPristine(this.editUserForm);
      },
      (error: ErrorResponse) => {
        this.toasterService.error(error.message);
        this.hasUser = false;
        this.initialLoading = false;
      }
    );
    this.subscriptions.add(observer);
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.editUserForm.controls;
  }

  onFormUpdate(): void {
    if (this.editUserForm.valid) {
      this.isLoading = true;
      const user: UserForm = {
        name: this.editUserForm.value.name,
        role_id: this.currentUser.role,
        mobile_no: this.editUserForm.value.mobile_no,
        email: this.currentUser.email,
        employee_number: '',
        agent_code: '',
      };
      const observer = this.userService.updateUser(user, this.userId).subscribe(
        () => {
          this.toasterService.success('Park user has been updated successfully');
          this.router.navigate(['users']);
        },
        (error: ErrorResponse) => {
          if (error.hasValidationError) {
            this.hasValidationError = true;
            this.validationErrors = error.errorList;
          } else {
            this.hasValidationError = false;
            window.scrollTo({ top: 0 });
            this.toasterService.error(error.message);
          }
          this.isLoading = false;
        }
      );
      this.subscriptions.add(observer);
    }
  }
}
