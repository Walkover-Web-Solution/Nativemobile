

import { LoginComponent } from './login/login.component';
import { LoginWithOtpComponent } from './login-with-otp/login-with-otp.component';
import { ForgotComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginWithEmailComponent } from './login-with-email/login-with-email.component';

export const COMPONENTS = [LoginComponent, LoginWithOtpComponent, ForgotComponent, SignUpComponent, LoginWithEmailComponent];

export * from './login/login.component';
export * from './signup/signup.component';
export * from './login-with-otp/login-with-otp.component';
export * from './login-with-email/login-with-email.component';
export * from './forgot-password/forgot-password.component';
