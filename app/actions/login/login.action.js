"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var login_const_1 = require("./login.const");
var LoginActions = (function () {
    function LoginActions(action$) {
        this.action$ = action$;
    }
    LoginActions.prototype.login = function (value) {
        return {
            type: login_const_1.LoginConstants.LOGIN_SUCCESS
        };
    };
    LoginActions.prototype.validateResponse = function (response, successAction, showToast, errorAction) {
        if (showToast === void 0) { showToast = false; }
        if (errorAction === void 0) { errorAction = { type: 'EmptyAction' }; }
        if (response.status === 'error') {
            if (showToast) {
                // this._toasty.errorToast(response.message);
            }
            return errorAction;
        }
        else {
            if (showToast && typeof response.body === 'string') {
                // this._toasty.successToast(response.body);
            }
        }
        return successAction;
    };
    return LoginActions;
}());
LoginActions = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions])
], LoginActions);
exports.LoginActions = LoginActions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUtoRCw2Q0FBK0M7QUFJL0MsSUFBYSxZQUFZO0lBQ3ZCLHNCQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBRXBDLENBQUM7SUFDTSw0QkFBSyxHQUFaLFVBQWEsS0FBYTtRQUN4QixNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUUsNEJBQWMsQ0FBQyxhQUFhO1NBQ25DLENBQUE7SUFDSCxDQUFDO0lBRU8sdUNBQWdCLEdBQXhCLFVBQThDLFFBQTJDLEVBQUUsYUFBNEIsRUFBRSxTQUEwQixFQUFFLFdBQW9EO1FBQWhGLDBCQUFBLEVBQUEsaUJBQTBCO1FBQUUsNEJBQUEsRUFBQSxnQkFBK0IsSUFBSSxFQUFFLGFBQWEsRUFBRTtRQUN2TSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZCw2Q0FBNkM7WUFDL0MsQ0FBQztZQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCw0Q0FBNEM7WUFDOUMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlksWUFBWTtJQUZ4QixpQkFBVSxFQUFFO3FDQUdrQixpQkFBTztHQUR6QixZQUFZLENBdUJ4QjtBQXZCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaS1tb2RlbHMvQmFzZVJlc3BvbnNlXCI7XG5pbXBvcnQgeyBDdXN0b21BY3Rpb25zIH0gZnJvbSBcIi4uLy4uL3N0b3JlL2N1c3RvbUFjdGlvbnNcIjtcbmltcG9ydCB7IExvZ2luQ29uc3RhbnRzIH0gZnJvbSBcIi4vbG9naW4uY29uc3RcIjtcblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgTG9naW5BY3Rpb25zIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb24kOiBBY3Rpb25zKSB7XG5cbiAgfVxuICBwdWJsaWMgbG9naW4odmFsdWU6IHN0cmluZyk6IEN1c3RvbUFjdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBMb2dpbkNvbnN0YW50cy5MT0dJTl9TVUNDRVNTXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZVJlc3BvbnNlPFRSZXNwb25zZSwgVFJlcXVlc3Q+KHJlc3BvbnNlOiBCYXNlUmVzcG9uc2U8VFJlc3BvbnNlLCBUUmVxdWVzdD4sIHN1Y2Nlc3NBY3Rpb246IEN1c3RvbUFjdGlvbnMsIHNob3dUb2FzdDogYm9vbGVhbiA9IGZhbHNlLCBlcnJvckFjdGlvbjogQ3VzdG9tQWN0aW9ucyA9IHsgdHlwZTogJ0VtcHR5QWN0aW9uJyB9KTogQ3VzdG9tQWN0aW9ucyB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgaWYgKHNob3dUb2FzdCkge1xuICAgICAgICAvLyB0aGlzLl90b2FzdHkuZXJyb3JUb2FzdChyZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvckFjdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3dUb2FzdCAmJiB0eXBlb2YgcmVzcG9uc2UuYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gdGhpcy5fdG9hc3R5LnN1Y2Nlc3NUb2FzdChyZXNwb25zZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1Y2Nlc3NBY3Rpb247XG4gIH1cbn1cbiJdfQ==