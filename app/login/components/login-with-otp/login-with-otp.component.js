"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { Item } from '../../models';
var login_service_1 = require("../../services/login.service");
var frame_1 = require("ui/frame");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
// import { Color } from 'tns-core-modules/ui/page/page';
var LoginWithOtpComponent = /** @class */ (function () {
    function LoginWithOtpComponent(itemService, routerExtensions, page, frame) {
        this.itemService = itemService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.frame = frame;
    }
    LoginWithOtpComponent.prototype.ngOnInit = function () {
        console.log('login-with-otp');
        // this.items = this.itemService.getItems();
        // this.page.backgroundColor = new Color(1, 0, 169, 157);
        // this.page.backgroundSpanUnderStatusBar = true;
        // this.page.actionBarHidden = true;
    };
    LoginWithOtpComponent.prototype.ngAfterViewInit = function () {
        // this.items = this.itemService.getItems();
        this.page.backgroundColor = new page_1.Color(1, 0, 169, 157);
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.actionBarHidden = true;
        // this.page.actionBar.backgroundColor = new Color('#00a99d');
        // this.page.backgroundSpanUnderStatusBar = true;
        // if (this.page.ios) {
        //   const navigationBar = (this.page.ios.controller || this.page.ios.navigationController).navigationBar;
        //   navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
        //   navigationBar.shadowImage = UIImage.new();
        //   navigationBar.translucent = false;
        //   navigationBar.barTintColor = UIColor.blueColor;
        //   navigationBar.tintColor = UIColor.redColor;
        // }
    };
    LoginWithOtpComponent.prototype.loaded = function () {
    };
    LoginWithOtpComponent.prototype.ngOnDestroy = function () {
        console.log('login-with-otp destroyed');
    };
    LoginWithOtpComponent.prototype.backToLogin = function () {
        this.routerExtensions.backToPreviousPage();
    };
    LoginWithOtpComponent = __decorate([
        core_1.Component({
            selector: 'ns-login-with-otp',
            moduleId: module.id,
            templateUrl: './login-with-otp.component.html',
            styleUrls: ['./login-with-otp.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService, router_1.RouterExtensions, page_1.Page, frame_1.Frame])
    ], LoginWithOtpComponent);
    return LoginWithOtpComponent;
}());
exports.LoginWithOtpComponent = LoginWithOtpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4td2l0aC1vdHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4td2l0aC1vdHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTRFO0FBRTVFLHVDQUF1QztBQUN2Qyw4REFBNEQ7QUFDNUQsa0NBQTBDO0FBQzFDLGdDQUFzQztBQUV0QyxzREFBK0Q7QUFDL0QseURBQXlEO0FBUXpEO0lBQ0UsK0JBQW9CLFdBQXlCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLEtBQVk7UUFBL0csZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU87SUFBSSxDQUFDO0lBRXhJLHdDQUFRLEdBQVI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsNENBQTRDO1FBQzVDLHlEQUF5RDtRQUN6RCxpREFBaUQ7UUFDakQsb0NBQW9DO0lBQ3RDLENBQUM7SUFDRCwrQ0FBZSxHQUFmO1FBQ0UsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksWUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyw4REFBOEQ7UUFDOUQsaURBQWlEO1FBQ2pELHVCQUF1QjtRQUN2QiwwR0FBMEc7UUFDMUcsd0ZBQXdGO1FBQ3hGLCtDQUErQztRQUMvQyx1Q0FBdUM7UUFDdkMsb0RBQW9EO1FBQ3BELGdEQUFnRDtRQUNoRCxJQUFJO0lBQ04sQ0FBQztJQUNELHNDQUFNLEdBQU47SUFDQSxDQUFDO0lBQ0QsMkNBQVcsR0FBWDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsMkNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFqQ1UscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQy9DLENBQUM7eUNBRWlDLDRCQUFZLEVBQTRCLHlCQUFnQixFQUFnQixXQUFJLEVBQWlCLGFBQUs7T0FEeEgscUJBQXFCLENBa0NqQztJQUFELDRCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7QUFsQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvZ2luLnNlcnZpY2UnO1xuaW1wb3J0IHsgdG9wbW9zdCwgRnJhbWUgfSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBQYWdlLCBDb2xvciB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgaXNJT1MgfSBmcm9tICdwbGF0Zm9ybSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbi8vIGltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1sb2dpbi13aXRoLW90cCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi13aXRoLW90cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLXdpdGgtb3RwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5XaXRoT3RwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBMb2dpblNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGZyYW1lOiBGcmFtZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2xvZ2luLXdpdGgtb3RwJyk7XG4gICAgLy8gdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcbiAgICAvLyB0aGlzLnBhZ2UuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKDEsIDAsIDE2OSwgMTU3KTtcbiAgICAvLyB0aGlzLnBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XG4gICAgLy8gdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcigxLCAwLCAxNjksIDE1Nyk7XG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKCcjMDBhOTlkJyk7XG4gICAgLy8gdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgIC8vIGlmICh0aGlzLnBhZ2UuaW9zKSB7XG4gICAgLy8gICBjb25zdCBuYXZpZ2F0aW9uQmFyID0gKHRoaXMucGFnZS5pb3MuY29udHJvbGxlciB8fCB0aGlzLnBhZ2UuaW9zLm5hdmlnYXRpb25Db250cm9sbGVyKS5uYXZpZ2F0aW9uQmFyO1xuICAgIC8vICAgbmF2aWdhdGlvbkJhci5zZXRCYWNrZ3JvdW5kSW1hZ2VGb3JCYXJNZXRyaWNzKFVJSW1hZ2UubmV3KCksIFVJQmFyTWV0cmljcy5EZWZhdWx0KTtcbiAgICAvLyAgIG5hdmlnYXRpb25CYXIuc2hhZG93SW1hZ2UgPSBVSUltYWdlLm5ldygpO1xuICAgIC8vICAgbmF2aWdhdGlvbkJhci50cmFuc2x1Y2VudCA9IGZhbHNlO1xuICAgIC8vICAgbmF2aWdhdGlvbkJhci5iYXJUaW50Q29sb3IgPSBVSUNvbG9yLmJsdWVDb2xvcjtcbiAgICAvLyAgIG5hdmlnYXRpb25CYXIudGludENvbG9yID0gVUlDb2xvci5yZWRDb2xvcjtcbiAgICAvLyB9XG4gIH1cbiAgbG9hZGVkKCkge1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdsb2dpbi13aXRoLW90cCBkZXN0cm95ZWQnKTtcbiAgfVxuICBiYWNrVG9Mb2dpbigpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gIH1cbn1cbiJdfQ==