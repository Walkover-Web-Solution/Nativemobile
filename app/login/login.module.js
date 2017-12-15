"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// nativescript
var router_1 = require("nativescript-angular/router");
// app
var shared_module_1 = require("../shared/shared.module");
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
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.NativeScriptRouterModule.forChild(exports.routes)],
            declarations: components_1.COMPONENTS.slice(),
            schemas: [core_1.NO_ERRORS_SCHEMA],
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQTJEO0FBRzNELGVBQWU7QUFDZixzREFBdUU7QUFFdkUsTUFBTTtBQUNOLHlEQUF1RDtBQUN2RCwyQ0FBa0c7QUFFckYsUUFBQSxNQUFNLEdBQVc7SUFDNUI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSwyQkFBYztLQUMxQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixTQUFTLEVBQUUsa0NBQXFCO0tBQ2pDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsRUFBRSw0QkFBZTtLQUMzQjtDQUNGLENBQUM7QUFPRjtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBTHZCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLDRCQUFZLEVBQUUsaUNBQXdCLENBQUMsUUFBUSxDQUFDLGNBQU0sQ0FBQyxDQUFDO1lBQ2xFLFlBQVksRUFBTSx1QkFBVSxRQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO0FBQWYsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuLy8gbmF0aXZlc2NyaXB0XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG4vLyBhcHBcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENPTVBPTkVOVFMsIExvZ2luQ29tcG9uZW50LCBMb2dpbldpdGhPdHBDb21wb25lbnQsIEZvcmdvdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICcnLFxuICAgIGNvbXBvbmVudDogTG9naW5Db21wb25lbnRcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdsb2dpbi13aXRoLW90cCcsXG4gICAgY29tcG9uZW50OiBMb2dpbldpdGhPdHBDb21wb25lbnRcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdmb3Jnb3QtcGFzc3dvcmQnLFxuICAgIGNvbXBvbmVudDogRm9yZ290Q29tcG9uZW50XG4gIH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGUsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UU10sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUgeyB9XG4iXX0=