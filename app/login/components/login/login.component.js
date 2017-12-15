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
var app_constant_1 = require("../../../../app.constant");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(itemService) {
        this.itemService = itemService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log(app_constant_1.Configuration.ApiUrl);
        console.log(app_constant_1.Configuration.AppUrl);
        console.log(global.ApiUrl);
        console.log(global.AppUrl);
        console.log(ApiUrl);
        console.log(AppUrl);
        // this.items = this.itemService.getItems();
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        console.log('login destroyed');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'ns-login',
            moduleId: module.id,
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBRTdELHVDQUF1QztBQUN2Qyw4REFBNEQ7QUFHNUQseURBQXlEO0FBT3pEO0lBQ0Usd0JBQW9CLFdBQXlCO1FBQXpCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO0lBQUksQ0FBQztJQUVsRCxpQ0FBUSxHQUFSO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsNENBQTRDO0lBQzlDLENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFkVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN0QyxDQUFDO3lDQUVpQyw0QkFBWTtPQURsQyxjQUFjLENBZTFCO0lBQUQscUJBQUM7Q0FBQSxBQWZELElBZUM7QUFmWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gaW1wb3J0IHsgSXRlbSB9IGZyb20gJy4uLy4uL21vZGVscyc7XG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sb2dpbi5zZXJ2aWNlJztcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuY29uc3RhbnQnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbG9naW4nLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBMb2dpblNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKENvbmZpZ3VyYXRpb24uQXBpVXJsKTtcbiAgICBjb25zb2xlLmxvZyhDb25maWd1cmF0aW9uLkFwcFVybCk7XG4gICAgY29uc29sZS5sb2coZ2xvYmFsLkFwaVVybCk7XG4gICAgY29uc29sZS5sb2coZ2xvYmFsLkFwcFVybCk7XG4gICAgY29uc29sZS5sb2coQXBpVXJsKTtcbiAgICBjb25zb2xlLmxvZyhBcHBVcmwpO1xuICAgIC8vIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2xvZ2luIGRlc3Ryb3llZCcpO1xuICB9XG59XG4iXX0=