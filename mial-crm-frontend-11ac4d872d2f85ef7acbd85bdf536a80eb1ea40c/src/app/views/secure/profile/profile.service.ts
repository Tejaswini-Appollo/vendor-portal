import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdatedUserDetail, UpdateResponse } from '@public/authentication/authentication.model';
import { UpdateUser } from '@public/authentication/store/authentication.action';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ChangePwdRequestParams,
  ChangePwdResponse,
  UpdateProfileForm,
  UpdateProfileRequest,
} from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private store: Store) {}

  updateUserDetail(userDetails: UpdateProfileForm): Observable<void> {
    const params: UpdateProfileRequest = {
      profile: userDetails,
    };
    return this.httpClient.put<UpdateResponse>(`${this.apiUrl}/v1/profiles`, params).pipe(
      map((response) => {
        const userDetail: UpdatedUserDetail = {
          name: response.name,
          email: response.email,
          role: response.role,
        };
        this.store.dispatch(new UpdateUser(userDetail));
      })
    );
  }

  changePassword(params: ChangePwdRequestParams): Observable<ChangePwdResponse> {
    return this.httpClient.post<ChangePwdResponse>(`${this.apiUrl}/v1/passwords/change`, params);
  }
}
