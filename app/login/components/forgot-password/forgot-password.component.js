"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
var ForgotComponent = (function () {
    function ForgotComponent(routerExtensions, page) {
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
    return ForgotComponent;
}());
ForgotComponent = __decorate([
    core_1.Component({
        selector: 'ns-forgot-password',
        moduleId: module.id,
        templateUrl: './forgot-password.component.html',
        styleUrls: ['./forgot-password.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions, page_1.Page])
], ForgotComponent);
exports.ForgotComponent = ForgotComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsZ0NBQXNDO0FBR3RDLHNEQUErRDtBQVEvRCxJQUFhLGVBQWU7SUFDMUIseUJBQW9CLGdCQUFrQyxFQUFVLElBQVU7UUFBdEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRS9FLGtDQUFRLEdBQVI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksWUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0QscUNBQVcsR0FBWDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksZUFBZTtJQU4zQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztLQUNoRCxDQUFDO3FDQUVzQyx5QkFBZ0IsRUFBZ0IsV0FBSTtHQUQvRCxlQUFlLENBZ0IzQjtBQWhCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIENvbG9yIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSAndWkvZnJhbWUnO1xuaW1wb3J0IHsgaXNJT1MgfSBmcm9tICdwbGF0Zm9ybSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtZm9yZ290LXBhc3N3b3JkJyxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvcmdvdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdmb3Jnb3QgUGFzc3dvcmQnKTtcbiAgICAvLyB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoMSwgMCwgMTY5LCAxNTcpO1xuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnZm9yZ290LXBhc3N3b3JkIGRlc3Ryb3llZCcpO1xuICB9XG4gIGJhY2tUb0xvZ2luKCkge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgfVxufVxuIl19