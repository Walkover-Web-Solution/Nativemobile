"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginComponent = (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.items = this.itemService.getItems();
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        console.log('login destroyed');
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'ns-login',
        moduleId: module.id,
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    __metadata("design:paramtypes", [])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBVTdELElBQWEsY0FBYztJQUN6QjtJQUFnQixDQUFDO0lBRVYsaUNBQVEsR0FBZjtRQUNFLDRDQUE0QztJQUM5QyxDQUFDO0lBQ00sb0NBQVcsR0FBbEI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxjQUFjO0lBTjFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztLQUN0QyxDQUFDOztHQUNXLGNBQWMsQ0FTMUI7QUFUWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3BsYXRmb3JtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbG9naW4nLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICB9XG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnbG9naW4gZGVzdHJveWVkJyk7XG4gIH1cbn1cbiJdfQ==