"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// angular
var core_1 = require("@angular/core");
// nativescript
var router_1 = require("nativescript-angular/router");
// app
var routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.NativeScriptRouterModule, router_1.NativeScriptRouterModule.forRoot(routes)]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFVBQVU7QUFDVixzQ0FBeUM7QUFHekMsZUFBZTtBQUNmLHNEQUF1RTtBQUV2RSxNQUFNO0FBRU4sSUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFNBQVMsRUFBRSxNQUFNO0tBQ2xCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsT0FBTztRQUNiLFlBQVksRUFBRSxrQ0FBa0M7S0FDakQ7Q0FDRixDQUFDO0FBS0YsSUFBYSxnQkFBZ0I7SUFBN0I7SUFBZ0MsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUFqQyxJQUFpQztBQUFwQixnQkFBZ0I7SUFINUIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUNBQXdCLEVBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzdFLENBQUM7R0FDVyxnQkFBZ0IsQ0FBSTtBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbmd1bGFyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuLy8gbmF0aXZlc2NyaXB0XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG4vLyBhcHBcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnJyxcbiAgICByZWRpcmVjdFRvOiAnL2xvZ2luJyxcbiAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xuICB9LFxuICB7XG4gICAgcGF0aDogJ2xvZ2luJyxcbiAgICBsb2FkQ2hpbGRyZW46ICcuL2xvZ2luL2xvZ2luLm1vZHVsZSNMb2dpbk1vZHVsZSdcbiAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfVxuIl19