import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page, Color } from 'ui/page';
import { topmost } from 'ui/frame';
import { isIOS } from 'platform';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { LoginActions } from '../../../actions/login/login.action';
import { ResetPasswordV2 } from '../../../models/api-models/Login';
import { Observable } from 'rxjs';

@Component({
  selector: 'ns-forgot-password',
  moduleId: module.id,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: FormGroup;
  constructor(private routerExtensions: RouterExtensions, private page: Page, private _fb: FormBuilder,
    private store: Store<AppState>, private _loginActions: LoginActions) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      uniqueKey: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.confirmPasswordValidator });
    // this.items = this.itemService.getItems();
    this.page.backgroundColor = new Color(1, 0, 169, 157);
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;
  }
  ngOnDestroy(): void {
    console.log('forgot-password destroyed');
  }
  backToLogin() {
    this.routerExtensions.backToPreviousPage();
  }

  forgotPassword() {
    this.store.dispatch(this._loginActions.forgotPasswordRequest(this.forgotPasswordForm.value.uniqueKey));
  }

  resetPassword() {
    let resetPasswordRequest = new ResetPasswordV2();
    let resetPasswordFormValues = this.forgotPasswordForm.value;

    resetPasswordRequest.uniqueKey = resetPasswordFormValues.uniqueKey;
    resetPasswordRequest.verificationCode = resetPasswordFormValues.verificationCode;
    resetPasswordRequest.newPassword = resetPasswordFormValues.newPassword;

    this.store.dispatch(this._loginActions.restPasswordV2Request(resetPasswordRequest));
  }

  confirmPasswordValidator(control: AbstractControl) {
    const passwordControl = control.get('newPassword');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== '' && confirmPasswordControl.value !== '') {
        if (passwordControl.value !== confirmPasswordControl.value) {
          return {
            passwordNotMatched: true
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
