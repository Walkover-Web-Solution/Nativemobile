import { Injectable, Optional, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpWrapperService } from './httpWrapper.service';
import { LOGIN_API } from './apiurls/login.api';
import { BaseResponse } from '../models/api-models/BaseResponse';
import { AuthKeyResponse, LinkedInRequestModel, SignupWithMobile, UserDetails, VerifyEmailModel, VerifyEmailResponseModel, VerifyMobileModel, VerifyMobileResponseModel } from '../models/api-models/loginModels';
import { ErrorHandler } from './catchManager/catchmanger';
import { Headers, Http } from '@angular/http';
import { GeneralService } from './general.service';
import { SignUpWithPassword, LoginWithPassword, ResetPasswordV2 } from '../models/api-models/Login';
import { ServiceConfig, IServiceConfigArgs } from './service.config';

let config = require('../config/config');
@Injectable()
export class AuthenticationService {
  constructor(private errorHandler: ErrorHandler,
    public _Http: Http,
    public _http: HttpWrapperService,
    public _router: Router,
    private _generalService: GeneralService,
    @Optional() @Inject(ServiceConfig) private config: IServiceConfigArgs) {
  }
  public SignupWithEmail(email: string): Observable<BaseResponse<string, string>> {
    console.log(email);
    return this._http.post(config.config.ApiUrl + LOGIN_API.SignupWithEmail, { email }).map((res) => {
      console.log(JSON.stringify(res.json));
      let data: BaseResponse<string, string> = res.json();
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<string, string>(e, email));
  }
  public VerifyEmail(model: VerifyEmailModel): Observable<BaseResponse<VerifyEmailResponseModel, VerifyEmailModel>> {
    return this._http.post(config.config.ApiUrl + LOGIN_API.VerifyEmail, model).map((res) => {
      let data: BaseResponse<VerifyEmailResponseModel, VerifyEmailModel> = res.json();
      data.request = model;
      // console.log(data);
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<VerifyEmailResponseModel, VerifyEmailModel>(e, model));
  }

  public ForgotPassword(email: string): Observable<BaseResponse<string, string>> {
    return this._http.put(config.config.ApiUrl +
      LOGIN_API.ForgotPassword.replace(':email', email), null).map((res) => {
        let data: BaseResponse<string, string> = res.json();
        // data.request = modele;
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<string, string>(e));
  }

  public ResetPasswordV2(request: ResetPasswordV2): Observable<BaseResponse<string, ResetPasswordV2>> {
    return this._http.put(config.config.ApiUrl +
      LOGIN_API.ResetPasswordV2, request).map((res) => {
        let data: BaseResponse<string, ResetPasswordV2> = res.json();
        data.request = request;
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<string, ResetPasswordV2>(e));
  }

  public SignupWithMobile(model: SignupWithMobile): Observable<BaseResponse<string, SignupWithMobile>> {
    return this._http.post(config.config.ApiUrl + LOGIN_API.SignupWithMobile, model).map((res) => {
      let data: BaseResponse<string, SignupWithMobile> = res.json();
      data.request = model;
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<string, SignupWithMobile>(e, model));
  }
  public VerifyOTP(modele: VerifyMobileModel): Observable<BaseResponse<VerifyMobileResponseModel, VerifyMobileModel>> {
    return this._http.post(config.config.ApiUrl + LOGIN_API.VerifyOTP, modele).map((res) => {
      let data: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = res.json();
      data.request = modele;
      // console.log(data);
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<VerifyMobileResponseModel, VerifyMobileModel>(e, modele));
  }
  public SignupWithPassword(modele: SignUpWithPassword): Observable<BaseResponse<VerifyMobileResponseModel, SignUpWithPassword>> {
    return this._http.post(config.config.ApiUrl + LOGIN_API.SignupWithPassword, modele).map((res) => {
      let data: BaseResponse<VerifyMobileResponseModel, SignUpWithPassword> = res.json();
      data.request = modele;
      // console.log(data);
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<VerifyMobileResponseModel, SignUpWithPassword>(e, modele));
  }
  public LoginWithPassword(modele: LoginWithPassword): Observable<BaseResponse<VerifyMobileResponseModel, LoginWithPassword>> {
    return this._http.post(config.config.ApiUrl + LOGIN_API.LoginWithPassword, modele).map((res) => {
      let data: BaseResponse<VerifyMobileResponseModel, LoginWithPassword> = res.json();
      data.request = modele;
      // console.log(data);
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<VerifyMobileResponseModel, LoginWithPassword>(e, modele));
  }
  public VerifyNumber(modele: SignupWithMobile): Observable<BaseResponse<string, SignupWithMobile>> {
    return this._http.post(this.config.apiUrl + LOGIN_API.VerifyNumber, modele).map((res) => {
      let data: BaseResponse<string, SignupWithMobile> = res.json();
      data.request = modele;
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<string, SignupWithMobile>(e, modele));
  }
  public VerifyNumberOTP(modele: VerifyMobileModel): Observable<BaseResponse<string, VerifyMobileModel>> {
    return this._http.put(this.config.apiUrl + LOGIN_API.VerifyNumber, modele).map((res) => {
      let data: BaseResponse<string, VerifyMobileModel> = res.json();
      data.request = modele;
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<string, VerifyMobileModel>(e));
  }
  public ClearSession(): Observable<BaseResponse<string, string>> {
    let userName = this._generalService.user.uniqueName;
    return this._http.delete(this.config.apiUrl + LOGIN_API.CLEAR_SESSION.replace(':userUniqueName', encodeURIComponent(userName))).map((res) => {
      let data: BaseResponse<string, string> = res.json();
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<string, string>(e));
  }
  public LoginWithGoogle(token: string) {
    let args: any = {};
    args.headers = new Headers();
    args.headers.append('cache-control', 'no-cache');
    args.headers.append('Content-Type', 'application/json');
    args.headers.append('Accept', 'application/json');
    args.headers.append('Access-Token', token);
    return this._Http.get(this.config.apiUrl + LOGIN_API.LOGIN_WITH_GOOGLE, args).map((res) => {
      let data: BaseResponse<VerifyEmailResponseModel, string> = res.json();
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<VerifyEmailResponseModel, string>(e, args));
  }
  public LoginWithLinkedin(model: LinkedInRequestModel) {
    let args: any = {};
    args.headers = new Headers();
    args.headers.append('cache-control', 'no-cache');
    args.headers.append('Content-Type', 'application/json');
    args.headers.append('Accept', 'application/json');
    args.headers.append('Access-Token', model.token);
    args.headers.append('User-Email', model.email);
    return this._Http.get(this.config.apiUrl + LOGIN_API.LOGIN_WITH_LINKEDIN, args).map((res) => {
      let data: BaseResponse<VerifyEmailResponseModel, LinkedInRequestModel> = res.json();
      data.request = model;
      return data;
    }).catch((e) => this.errorHandler.HandleCatch<VerifyEmailResponseModel, LinkedInRequestModel>(e, args));
  }
  public SetSettings(model): Observable<BaseResponse<string, string>> {
    let uniqueName = this._generalService.user.uniqueName;
    return this._http.put(this.config.apiUrl + LOGIN_API.SET_SETTINGS
      .replace(':userUniqueName', encodeURIComponent(uniqueName)), model).map((res) => {
        let data: BaseResponse<string, string> = res.json();
        data.request = '';
        data.queryString = {};
        // data.response.results.forEach(p => p.isOpen = false);
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<string, string>(e, ''));
  }
  public FetchUserDetails(): Observable<BaseResponse<UserDetails, string>> {
    let sessionId = this._generalService.user.uniqueName;
    return this._http.get(this.config.apiUrl + LOGIN_API.FETCH_DETAILS
      .replace(':sessionId', sessionId)).map((res) => {
        let data: BaseResponse<UserDetails, string> = res.json();
        data.request = '';
        data.queryString = {};
        // data.response.results.forEach(p => p.isOpen = false);
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<UserDetails, string>(e, ''));
  }
  public GetSubScribedCompanies(): Observable<BaseResponse<string, string>> {
    let userUniqueName = this._generalService.user.uniqueName;
    return this._http.get(this.config.apiUrl + LOGIN_API.SUBSCRIBED_COMPANIES
      .replace(':userUniqueName', userUniqueName)).map((res) => {
        let data: BaseResponse<string, string> = res.json();
        data.request = '';
        data.queryString = {};
        // data.response.results.forEach(p => p.isOpen = false);
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<string, string>(e, ''));
  }
  public AddBalance(model): Observable<BaseResponse<string, string>> {
    let uniqueName = this._generalService.user.uniqueName;
    return this._http.get(this.config.apiUrl + LOGIN_API.ADD_BALANCE
      .replace(':uniqueName', uniqueName)).map((res) => {
        let data: BaseResponse<string, string> = res.json();
        data.request = '';
        data.queryString = {};
        // data.response.results.forEach(p => p.isOpen = false);
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<string, string>(e, ''));
  }
  public GetAuthKey(): Observable<BaseResponse<AuthKeyResponse, string>> {
    let uniqueName = this._generalService.user.uniqueName;
    return this._http.get(this.config.apiUrl + LOGIN_API.GET_AUTH_KEY
      .replace(':uniqueName', uniqueName)).map((res) => {
        let data: BaseResponse<AuthKeyResponse, string> = res.json();
        data.request = '';
        data.queryString = {};
        // data.response.results.forEach(p => p.isOpen = false);
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<AuthKeyResponse, string>(e, ''));
  }
  public RegenerateAuthKey(): Observable<BaseResponse<AuthKeyResponse, string>> {
    let userEmail = this._generalService.user.email;
    return this._http.put(this.config.apiUrl + LOGIN_API.REGENERATE_AUTH_KEY
      .replace(':userEmail', userEmail), {}).map((res) => {
        let data: BaseResponse<AuthKeyResponse, string> = res.json();
        data.request = '';
        data.queryString = {};
        // data.response.results.forEach(p => p.isOpen = false);
        return data;
      }).catch((e) => this.errorHandler.HandleCatch<AuthKeyResponse, string>(e, ''));
  }
}
