"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// nativescript
var router_1 = require("nativescript-angular/router");
// app
var components_1 = require("./components");
exports.routes = [
    {
        path: '',
        component: components_1.LoginComponent
    },
    {
        path: 'login-with-otp',
        component: components_1.LoginWithOtpComponent
    },
    {
        path: 'forgot-password',
        component: components_1.ForgotComponent
    }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [router_1.NativeScriptRouterModule, router_1.NativeScriptRouterModule.forChild(exports.routes)],
        declarations: components_1.COMPONENTS.slice(),
        schemas: [core_1.NO_ERRORS_SCHEMA],
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBRzNELGVBQWU7QUFDZixzREFBdUU7QUFFdkUsTUFBTTtBQUNOLDJDQUFrRztBQUVyRixRQUFBLE1BQU0sR0FBVztJQUM1QjtRQUNFLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDJCQUFjO0tBQzFCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFNBQVMsRUFBRSxrQ0FBcUI7S0FDakM7SUFDRDtRQUNFLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsU0FBUyxFQUFFLDRCQUFlO0tBQzNCO0NBQ0YsQ0FBQztBQVFGLElBQWEsV0FBVztJQUF4QjtJQUEyQixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBQTVCLElBQTRCO0FBQWYsV0FBVztJQU52QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsRUFBRSxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsY0FBTSxDQUFDLENBQUM7UUFDOUUsWUFBWSxFQUFNLHVCQUFVLFFBQUM7UUFFN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7S0FDNUIsQ0FBQztHQUNXLFdBQVcsQ0FBSTtBQUFmLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbi8vIG5hdGl2ZXNjcmlwdFxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuLy8gYXBwXG5pbXBvcnQgeyBDT01QT05FTlRTLCBMb2dpbkNvbXBvbmVudCwgTG9naW5XaXRoT3RwQ29tcG9uZW50LCBGb3Jnb3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnJyxcbiAgICBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnbG9naW4td2l0aC1vdHAnLFxuICAgIGNvbXBvbmVudDogTG9naW5XaXRoT3RwQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnZm9yZ290LXBhc3N3b3JkJyxcbiAgICBjb21wb25lbnQ6IEZvcmdvdENvbXBvbmVudFxuICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLCBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFNdLFxuXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUgeyB9XG4iXX0=