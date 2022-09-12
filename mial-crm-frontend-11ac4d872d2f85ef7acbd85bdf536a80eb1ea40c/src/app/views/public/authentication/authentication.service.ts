import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SetUser } from './store/authentication.action';
import {
  AuthenticationState as UserDetail,
  ForgotPwdRequestParams,
  ForgotPwdResponse,
  LoginRequestParams,
  LoginResponse,
  ResetPwdResponse,
} from './authentication.model';
import { getToken, getUserRole } from './store/authentication.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private store: Store) {}

  get token(): string {
    let authToken: string;
    this.store
      .select(getToken)
      .pipe(take(1))
      .subscribe((token: string) => {
        authToken = token;
      });
    return authToken;
  }

  get currentRole(): string {
    let userRole: string;
    this.store
      .select(getUserRole)
      .pipe(take(1))
      .subscribe((role: string) => {
        userRole = role;
      });
    return userRole;
  }

  role(): string {
    let userRole: string;
    this.store
      .select(getUserRole)
      .pipe(take(1))
      .subscribe((role: string) => {
        userRole = role.toUpperCase().split(' ').join('_');
      });
    return userRole;
  }

  login(params: LoginRequestParams): Observable<void> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/v1/login`, params, {
        observe: 'response',
      })
      .pipe(
        map((httpResponse: HttpResponse<LoginResponse>) => {
          const userDetails: UserDetail = {
            name: httpResponse.body.name,
            email: httpResponse.body.email,
            role: httpResponse.body.role,
            token: httpResponse.headers.get('Authorization'),
          };
          this.store.dispatch(new SetUser(userDetails));
        })
      );
  }

  forgotPassword(params: ForgotPwdRequestParams): Observable<ForgotPwdResponse> {
    return this.httpClient.post<ForgotPwdResponse>(
      `${this.apiUrl}/v1/passwords/send_reset_password_link`,
      params
    );
  }

  logout(): Observable<null> {
    return this.httpClient.delete<null>(`${this.apiUrl}/v1/logout`);
  }

  resetPassword(params, token): Observable<ResetPwdResponse> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<ResetPwdResponse>(`${this.apiUrl}/v1/passwords/reset`, params, {
      headers: headers,
    });
  }
}
