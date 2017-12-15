"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var frame_1 = require("ui/frame");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
// import { Color } from 'tns-core-modules/ui/page/page';
var LoginWithOtpComponent = (function () {
    function LoginWithOtpComponent(routerExtensions, page, frame) {
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
    return LoginWithOtpComponent;
}());
LoginWithOtpComponent = __decorate([
    core_1.Component({
        selector: 'ns-login-with-otp',
        moduleId: module.id,
        templateUrl: './login-with-otp.component.html',
        styleUrls: ['./login-with-otp.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions, page_1.Page, frame_1.Frame])
], LoginWithOtpComponent);
exports.LoginWithOtpComponent = LoginWithOtpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4td2l0aC1vdHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4td2l0aC1vdHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTRFO0FBQzVFLGtDQUEwQztBQUMxQyxnQ0FBc0M7QUFFdEMsc0RBQStEO0FBQy9ELHlEQUF5RDtBQVF6RCxJQUFhLHFCQUFxQjtJQUNoQywrQkFBb0IsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLEtBQVk7UUFBNUUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUksQ0FBQztJQUVyRyx3Q0FBUSxHQUFSO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLDRDQUE0QztRQUM1Qyx5REFBeUQ7UUFDekQsaURBQWlEO1FBQ2pELG9DQUFvQztJQUN0QyxDQUFDO0lBQ0QsK0NBQWUsR0FBZjtRQUNFLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFlBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsOERBQThEO1FBQzlELGlEQUFpRDtRQUNqRCx1QkFBdUI7UUFDdkIsMEdBQTBHO1FBQzFHLHdGQUF3RjtRQUN4RiwrQ0FBK0M7UUFDL0MsdUNBQXVDO1FBQ3ZDLG9EQUFvRDtRQUNwRCxnREFBZ0Q7UUFDaEQsSUFBSTtJQUNOLENBQUM7SUFDRCxzQ0FBTSxHQUFOO0lBQ0EsQ0FBQztJQUNELDJDQUFXLEdBQVg7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELDJDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBbENELElBa0NDO0FBbENZLHFCQUFxQjtJQU5qQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUMvQyxDQUFDO3FDQUVzQyx5QkFBZ0IsRUFBZ0IsV0FBSSxFQUFpQixhQUFLO0dBRHJGLHFCQUFxQixDQWtDakM7QUFsQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdG9wbW9zdCwgRnJhbWUgfSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBQYWdlLCBDb2xvciB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgaXNJT1MgfSBmcm9tICdwbGF0Zm9ybSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbi8vIGltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1sb2dpbi13aXRoLW90cCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi13aXRoLW90cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLXdpdGgtb3RwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5XaXRoT3RwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBmcmFtZTogRnJhbWUpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdsb2dpbi13aXRoLW90cCcpO1xuICAgIC8vIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgLy8gdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcigxLCAwLCAxNjksIDE1Nyk7XG4gICAgLy8gdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoMSwgMCwgMTY5LCAxNTcpO1xuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAvLyB0aGlzLnBhZ2UuYWN0aW9uQmFyLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcignIzAwYTk5ZCcpO1xuICAgIC8vIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcbiAgICAvLyBpZiAodGhpcy5wYWdlLmlvcykge1xuICAgIC8vICAgY29uc3QgbmF2aWdhdGlvbkJhciA9ICh0aGlzLnBhZ2UuaW9zLmNvbnRyb2xsZXIgfHwgdGhpcy5wYWdlLmlvcy5uYXZpZ2F0aW9uQ29udHJvbGxlcikubmF2aWdhdGlvbkJhcjtcbiAgICAvLyAgIG5hdmlnYXRpb25CYXIuc2V0QmFja2dyb3VuZEltYWdlRm9yQmFyTWV0cmljcyhVSUltYWdlLm5ldygpLCBVSUJhck1ldHJpY3MuRGVmYXVsdCk7XG4gICAgLy8gICBuYXZpZ2F0aW9uQmFyLnNoYWRvd0ltYWdlID0gVUlJbWFnZS5uZXcoKTtcbiAgICAvLyAgIG5hdmlnYXRpb25CYXIudHJhbnNsdWNlbnQgPSBmYWxzZTtcbiAgICAvLyAgIG5hdmlnYXRpb25CYXIuYmFyVGludENvbG9yID0gVUlDb2xvci5ibHVlQ29sb3I7XG4gICAgLy8gICBuYXZpZ2F0aW9uQmFyLnRpbnRDb2xvciA9IFVJQ29sb3IucmVkQ29sb3I7XG4gICAgLy8gfVxuICB9XG4gIGxvYWRlZCgpIHtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnbG9naW4td2l0aC1vdHAgZGVzdHJveWVkJyk7XG4gIH1cbiAgYmFja1RvTG9naW4oKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICB9XG59XG4iXX0=