"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedInRequestModel = (function () {
    function LinkedInRequestModel() {
    }
    return LinkedInRequestModel;
}());
exports.LinkedInRequestModel = LinkedInRequestModel;
var VerifyEmailModel = (function () {
    function VerifyEmailModel() {
    }
    return VerifyEmailModel;
}());
exports.VerifyEmailModel = VerifyEmailModel;
var VerifyEmailResponseModel = (function () {
    function VerifyEmailResponseModel() {
    }
    return VerifyEmailResponseModel;
}());
exports.VerifyEmailResponseModel = VerifyEmailResponseModel;
var UserDetails = (function () {
    function UserDetails() {
    }
    return UserDetails;
}());
exports.UserDetails = UserDetails;
var SignupWithMobile = (function () {
    function SignupWithMobile() {
        this.countryCode = 91;
    }
    return SignupWithMobile;
}());
exports.SignupWithMobile = SignupWithMobile;
var SignupWithMobileResponse = (function () {
    function SignupWithMobileResponse() {
    }
    return SignupWithMobileResponse;
}());
exports.SignupWithMobileResponse = SignupWithMobileResponse;
var VerifyMobileModel = (function () {
    function VerifyMobileModel() {
        this.countryCode = 91;
    }
    return VerifyMobileModel;
}());
exports.VerifyMobileModel = VerifyMobileModel;
var VerifyMobileResponseModel = (function () {
    function VerifyMobileResponseModel() {
    }
    return VerifyMobileResponseModel;
}());
exports.VerifyMobileResponseModel = VerifyMobileResponseModel;
/**
 * Model for login-with-number api response
 * API:: (login-with-number) login-with-number?countryCode=:countryCode&mobileNumber=:mobileNumber
 * we have to pass a header named Access-Token in this request header
 * how to get access-token tou have to hit sendopt api for this and in response you will get this token
 */
var LoginWithNumberResponse = (function () {
    function LoginWithNumberResponse() {
    }
    return LoginWithNumberResponse;
}());
exports.LoginWithNumberResponse = LoginWithNumberResponse;
/**
 * Model for verify-login-otp api response
 * API:: (verify-login-otp) https://sendotp.msg91.com/api/verifyOTP
 * we have to pass a header named application-key in this request header
 * and VerifyMobileModel as request pauload
 * in return we get a response as success if otp is valid, which looks like:
 * {
 *   "status": "success",
 *  "response": {
 *       "code": "NUMBER_VERIFIED_SUCCESSFULLY",
 *       "refreshToken": "c7u0NE-Hdik8GIPmNY4vxqaOGS8DAF2cYb6Irrs8dXoEmxf3UGAFPd-luCG_o8ZrWAtVRdW0ioFc98qwNr3L3rQovoPtHDHUeLw5if0NJcIfZQ4GI0qZOmxnAeaMpLFKAxk8MIHT6S5ORRItGVJecw=="
 *   }
 * }
 * this refresh token is passed as token to login with mobile api
 */
var VerifyLoginOTPResponse = (function () {
    function VerifyLoginOTPResponse() {
    }
    return VerifyLoginOTPResponse;
}());
exports.VerifyLoginOTPResponse = VerifyLoginOTPResponse;
var CreatedBy = (function () {
    function CreatedBy() {
    }
    return CreatedBy;
}());
exports.CreatedBy = CreatedBy;
var AuthKeyResponse = (function () {
    function AuthKeyResponse() {
    }
    return AuthKeyResponse;
}());
exports.AuthKeyResponse = AuthKeyResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5Nb2RlbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbk1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBQUE7SUFHQSxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLG9EQUFvQjtBQUtqQztJQUFBO0lBR0EsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw0Q0FBZ0I7QUFLN0I7SUFBQTtJQVNBLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksNERBQXdCO0FBaUJyQztJQUFBO0lBZ0JBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksa0NBQVc7QUFrQnhCO0lBQUE7UUFFUyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLDRDQUFnQjtBQUs3QjtJQUFBO0lBRUEsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0REFBd0I7QUFJckM7SUFBQTtRQUVTLGdCQUFXLEdBQVcsRUFBRSxDQUFDO0lBRWxDLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksOENBQWlCO0FBTTlCO0lBQUE7SUFTQSxDQUFDO0lBQUQsZ0NBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLDhEQUF5QjtBQVd0Qzs7Ozs7R0FLRztBQUVIO0lBQUE7SUFRQSxDQUFDO0lBQUQsOEJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLDBEQUF1QjtBQVVwQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVIO0lBQUE7SUFHQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHdEQUFzQjtBQUtuQztJQUFBO0lBS0EsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSw4QkFBUztBQU90QjtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElVc2VyRGV0YWlsIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91c2VySW5mby5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgTGlua2VkSW5SZXF1ZXN0TW9kZWwge1xuICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgcHVibGljIHRva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBWZXJpZnlFbWFpbE1vZGVsIHtcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBWZXJpZnlFbWFpbFJlc3BvbnNlTW9kZWwge1xuICBwdWJsaWMgdXNlcjogVXNlckRldGFpbHM7XG4gIHB1YmxpYyBzZXNzaW9uPzogU2Vzc2lvbjtcbiAgcHVibGljIGF1dGhLZXk/OiBzdHJpbmc7XG4gIHB1YmxpYyBpc05ld1VzZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBjb250YWN0TnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5Q29kZTogc3RyaW5nO1xuICBwdWJsaWMgc3RhdHVzQ29kZTogc3RyaW5nO1xuICBwdWJsaWMgdGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb24ge1xuICBpZDogc3RyaW5nO1xuICBleHBpcmVzQXQ6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyRGV0YWlscyB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgbW9iaWxlTm86IHN0cmluZztcbiAgcHVibGljIGNvbnRhY3RObzogc3RyaW5nO1xuICBwdWJsaWMgdW5pcXVlTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgYW5BZG1pbjogYm9vbGVhbjtcbiAgcHVibGljIGF1dGhlbnRpY2F0ZVR3b1dheTogYm9vbGVhbjtcbiAgcHVibGljIGF2YWlsYWJsZUNyZWRpdDogYm9vbGVhbjtcbiAgcHVibGljIGlzTmV3VXNlcjogYm9vbGVhbjtcbiAgcHVibGljIHN1YlVzZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBzdWJVc2VyczogYW55W107XG4gIHB1YmxpYyBjcmVhdGVkQXQ6IHN0cmluZztcbiAgcHVibGljIHVwZGF0ZWRBdDogc3RyaW5nO1xuICBwdWJsaWMgY3JlYXRlZEJ5OiBDcmVhdGVkQnk7XG4gIHB1YmxpYyB1cGRhdGVkQnk6IENyZWF0ZWRCeTtcbn1cblxuZXhwb3J0IGNsYXNzIFNpZ251cFdpdGhNb2JpbGUge1xuICBwdWJsaWMgbW9iaWxlTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5Q29kZTogbnVtYmVyID0gOTE7XG59XG5cbmV4cG9ydCBjbGFzcyBTaWdudXBXaXRoTW9iaWxlUmVzcG9uc2Uge1xuICBwdWJsaWMgY29kZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVmVyaWZ5TW9iaWxlTW9kZWwge1xuICBwdWJsaWMgbW9iaWxlTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5Q29kZTogbnVtYmVyID0gOTE7XG4gIHB1YmxpYyBvbmVUaW1lUGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFZlcmlmeU1vYmlsZVJlc3BvbnNlTW9kZWwge1xuICBwdWJsaWMgdXNlcjogVXNlckRldGFpbHM7XG4gIHB1YmxpYyBhdXRoS2V5OiBzdHJpbmc7XG4gIHB1YmxpYyBpc05ld1VzZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBjb250YWN0TnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5Q29kZTogc3RyaW5nO1xuICBwdWJsaWMgc3RhdHVzQ29kZTogc3RyaW5nO1xuICBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICBwdWJsaWMgc2Vzc2lvbj86IFNlc3Npb247XG59XG5cbi8qKlxuICogTW9kZWwgZm9yIGxvZ2luLXdpdGgtbnVtYmVyIGFwaSByZXNwb25zZVxuICogQVBJOjogKGxvZ2luLXdpdGgtbnVtYmVyKSBsb2dpbi13aXRoLW51bWJlcj9jb3VudHJ5Q29kZT06Y291bnRyeUNvZGUmbW9iaWxlTnVtYmVyPTptb2JpbGVOdW1iZXJcbiAqIHdlIGhhdmUgdG8gcGFzcyBhIGhlYWRlciBuYW1lZCBBY2Nlc3MtVG9rZW4gaW4gdGhpcyByZXF1ZXN0IGhlYWRlclxuICogaG93IHRvIGdldCBhY2Nlc3MtdG9rZW4gdG91IGhhdmUgdG8gaGl0IHNlbmRvcHQgYXBpIGZvciB0aGlzIGFuZCBpbiByZXNwb25zZSB5b3Ugd2lsbCBnZXQgdGhpcyB0b2tlblxuICovXG5cbmV4cG9ydCBjbGFzcyBMb2dpbldpdGhOdW1iZXJSZXNwb25zZSB7XG4gIHB1YmxpYyB1c2VyOiBJVXNlckRldGFpbDtcbiAgcHVibGljIGF1dGhLZXk6IHN0cmluZztcbiAgcHVibGljIGlzTmV3VXNlcjogYm9vbGVhbjtcbiAgcHVibGljIGNvbnRhY3ROdW1iZXI/OiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5Q29kZT86IHN0cmluZztcbiAgcHVibGljIHN0YXR1c0NvZGU/OiBzdHJpbmc7XG4gIHB1YmxpYyB0ZXh0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIE1vZGVsIGZvciB2ZXJpZnktbG9naW4tb3RwIGFwaSByZXNwb25zZVxuICogQVBJOjogKHZlcmlmeS1sb2dpbi1vdHApIGh0dHBzOi8vc2VuZG90cC5tc2c5MS5jb20vYXBpL3ZlcmlmeU9UUFxuICogd2UgaGF2ZSB0byBwYXNzIGEgaGVhZGVyIG5hbWVkIGFwcGxpY2F0aW9uLWtleSBpbiB0aGlzIHJlcXVlc3QgaGVhZGVyXG4gKiBhbmQgVmVyaWZ5TW9iaWxlTW9kZWwgYXMgcmVxdWVzdCBwYXVsb2FkXG4gKiBpbiByZXR1cm4gd2UgZ2V0IGEgcmVzcG9uc2UgYXMgc3VjY2VzcyBpZiBvdHAgaXMgdmFsaWQsIHdoaWNoIGxvb2tzIGxpa2U6XG4gKiB7XG4gKiAgIFwic3RhdHVzXCI6IFwic3VjY2Vzc1wiLFxuICogIFwicmVzcG9uc2VcIjoge1xuICogICAgICAgXCJjb2RlXCI6IFwiTlVNQkVSX1ZFUklGSUVEX1NVQ0NFU1NGVUxMWVwiLFxuICogICAgICAgXCJyZWZyZXNoVG9rZW5cIjogXCJjN3UwTkUtSGRpazhHSVBtTlk0dnhxYU9HUzhEQUYyY1liNklycnM4ZFhvRW14ZjNVR0FGUGQtbHVDR19vOFpyV0F0VlJkVzBpb0ZjOThxd05yM0wzclFvdm9QdEhESFVlTHc1aWYwTkpjSWZaUTRHSTBxWk9teG5BZWFNcExGS0F4azhNSUhUNlM1T1JSSXRHVkplY3c9PVwiXG4gKiAgIH1cbiAqIH1cbiAqIHRoaXMgcmVmcmVzaCB0b2tlbiBpcyBwYXNzZWQgYXMgdG9rZW4gdG8gbG9naW4gd2l0aCBtb2JpbGUgYXBpXG4gKi9cblxuZXhwb3J0IGNsYXNzIFZlcmlmeUxvZ2luT1RQUmVzcG9uc2Uge1xuICBwdWJsaWMgY29kZTogc3RyaW5nO1xuICBwdWJsaWMgcmVmcmVzaFRva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVkQnkge1xuICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgcHVibGljIG1vYmlsZU5vOiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlxdWVOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRoS2V5UmVzcG9uc2Uge1xuICBwdWJsaWMgYXV0aEtleTogc3RyaW5nO1xuICBwdWJsaWMgdW5pcXVlTmFtZTogc3RyaW5nO1xufVxuIl19