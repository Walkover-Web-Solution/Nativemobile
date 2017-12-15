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
var login_service_1 = require("../../services/login.service");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
var ForgotComponent = /** @class */ (function () {
    function ForgotComponent(itemService, routerExtensions, page) {
        this.itemService = itemService;
        this.routerExtensions = routerExtensions;
        this.page = page;
    }
    ForgotComponent.prototype.ngOnInit = function () {
        console.log('forgot Password');
        // this.items = this.itemService.getItems();
        this.page.backgroundColor = new page_1.Color(1, 0, 169, 157);
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.actionBarHidden = true;
    };
    ForgotComponent.prototype.ngOnDestroy = function () {
        console.log('forgot-password destroyed');
    };
    ForgotComponent.prototype.backToLogin = function () {
        this.routerExtensions.backToPreviousPage();
    };
    ForgotComponent = __decorate([
        core_1.Component({
            selector: 'ns-forgot-password',
            moduleId: module.id,
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService, router_1.RouterExtensions, page_1.Page])
    ], ForgotComponent);
    return ForgotComponent;
}());
exports.ForgotComponent = ForgotComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNkQ7QUFDN0QsOERBQTREO0FBQzVELGdDQUFzQztBQUd0QyxzREFBK0Q7QUFRL0Q7SUFDRSx5QkFBb0IsV0FBeUIsRUFBVSxnQkFBa0MsRUFBVSxJQUFVO1FBQXpGLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRWxILGtDQUFRLEdBQVI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksWUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0QscUNBQVcsR0FBWDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFmVSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1NBQ2hELENBQUM7eUNBRWlDLDRCQUFZLEVBQTRCLHlCQUFnQixFQUFnQixXQUFJO09BRGxHLGVBQWUsQ0FnQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztBQWhCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvZ2luLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZSwgQ29sb3IgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1mb3Jnb3QtcGFzc3dvcmQnLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9yZ290Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBMb2dpblNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnZm9yZ290IFBhc3N3b3JkJyk7XG4gICAgLy8gdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcbiAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKDEsIDAsIDE2OSwgMTU3KTtcbiAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2ZvcmdvdC1wYXNzd29yZCBkZXN0cm95ZWQnKTtcbiAgfVxuICBiYWNrVG9Mb2dpbigpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gIH1cbn1cbiJdfQ==