"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var ngrx_devtools_nativescript_1 = require("ngrx-devtools-nativescript");
var store_devtools_1 = require("@ngrx/store-devtools");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/skip");
require("rxjs/add/operator/switchMap");
// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/filter';
require("rxjs/add/operator/catch");
require("rxjs/add/operator/take");
require("rxjs/add/operator/debounce");
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var app_component_1 = require("./app.component");
var service_module_1 = require("./services/service.module");
var service_config_1 = require("./services/service.config");
var app_constants_1 = require("./app.constants");
var store_2 = require("./store");
var actions_module_1 = require("./actions/actions.module");
var app_routing_1 = require("./app.routing");
require("nativescript-ngx-fonticon");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent],
        imports: [
            nativescript_module_1.NativeScriptModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            app_routing_1.AppRoutingModule,
            ngrx_devtools_nativescript_1.NativeScriptDevToolsMonitors,
            store_1.StoreModule.forRoot(store_2.reducers),
            store_devtools_1.StoreDevtoolsModule.instrument(),
            service_module_1.ServiceModule.forRoot(),
            actions_module_1.ActionModule.forRoot()
        ],
        providers: [
            {
                provide: core_1.NgModuleFactoryLoader,
                useClass: router_1.NSModuleFactoryLoader
            },
            {
                provide: service_config_1.ServiceConfig,
                useValue: { apiUrl: app_constants_1.Configuration.ApiUrl, appUrl: app_constants_1.Configuration.AppUrl }
            }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
;
platform_1.platformNativeScriptDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBQzVFLGdGQUE4RTtBQUM5RSx5RUFBMEU7QUFDMUUsdURBQTJEO0FBRTNELGtEQUFtRTtBQUNuRSxzREFBOEY7QUFFOUYsaUNBQStCO0FBQy9CLGtDQUFnQztBQUNoQyx1Q0FBcUM7QUFDckMsNkNBQTZDO0FBQzdDLHFDQUFxQztBQUNyQyxtQ0FBaUM7QUFDakMsa0NBQWdDO0FBQ2hDLHNDQUFvQztBQUVwQyxzQ0FBZ0U7QUFDaEUscUNBQTBDO0FBRTFDLGlEQUErQztBQUMvQyw0REFBMEQ7QUFDMUQsNERBQTBEO0FBQzFELGlEQUFnRDtBQUNoRCxpQ0FBbUM7QUFDbkMsMkRBQXdEO0FBQ3hELDZDQUFpRDtBQUNqRCxxQ0FBbUM7QUEyQm5DLElBQU0sU0FBUztJQUFmO0lBQWtCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBbkIsSUFBbUI7QUFBYixTQUFTO0lBekJkLGVBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLDRCQUFZLENBQUM7UUFDNUIsT0FBTyxFQUFFO1lBQ1Asd0NBQWtCO1lBQ2xCLDZCQUFzQjtZQUN0QixpQ0FBd0I7WUFDeEIsOEJBQWdCO1lBQ2hCLHlEQUE0QjtZQUM1QixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBUSxDQUFDO1lBQzdCLG9DQUFtQixDQUFDLFVBQVUsRUFBRTtZQUNoQyw4QkFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2Qiw2QkFBWSxDQUFDLE9BQU8sRUFBRTtTQUN2QjtRQUNELFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSw0QkFBcUI7Z0JBQzlCLFFBQVEsRUFBRSw4QkFBcUI7YUFDaEM7WUFDRDtnQkFDRSxPQUFPLEVBQUUsOEJBQWE7Z0JBQ3RCLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSw2QkFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsNkJBQWEsQ0FBQyxNQUFNLEVBQUU7YUFDekU7U0FDRjtRQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7S0FDMUIsQ0FBQztHQUNJLFNBQVMsQ0FBSTtBQUFBLENBQUM7QUFFcEIsc0NBQTJCLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGlzIGltcG9ydCBzaG91bGQgYmUgZmlyc3QgaW4gb3JkZXIgdG8gbG9hZCBzb21lIHJlcXVpcmVkIHNldHRpbmdzIChsaWtlIGdsb2JhbHMgYW5kIHJlZmxlY3QtbWV0YWRhdGEpXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHREZXZUb29sc01vbml0b3JzIH0gZnJvbSBcIm5ncngtZGV2dG9vbHMtbmF0aXZlc2NyaXB0XCI7XG5pbXBvcnQgeyBTdG9yZURldnRvb2xzTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUtZGV2dG9vbHMnO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBOU01vZHVsZUZhY3RvcnlMb2FkZXIsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2tpcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcCc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3dpdGhMYXRlc3RGcm9tJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZGVib3VuY2UnO1xuXG5pbXBvcnQgeyBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN0b3JlTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZXJ2aWNlTW9kdWxlIH0gZnJvbSBcIi4vc2VydmljZXMvc2VydmljZS5tb2R1bGVcIjtcbmltcG9ydCB7IFNlcnZpY2VDb25maWcgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zZXJ2aWNlLmNvbmZpZ1wiO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL2FwcC5jb25zdGFudHNcIjtcbmltcG9ydCB7IHJlZHVjZXJzIH0gZnJvbSBcIi4vc3RvcmVcIjtcbmltcG9ydCB7IEFjdGlvbk1vZHVsZSB9IGZyb20gXCIuL2FjdGlvbnMvYWN0aW9ucy5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0ICduYXRpdmVzY3JpcHQtbmd4LWZvbnRpY29uJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdERldlRvb2xzTW9uaXRvcnMsXG4gICAgU3RvcmVNb2R1bGUuZm9yUm9vdChyZWR1Y2VycyksXG4gICAgU3RvcmVEZXZ0b29sc01vZHVsZS5pbnN0cnVtZW50KCksXG4gICAgU2VydmljZU1vZHVsZS5mb3JSb290KCksXG4gICAgQWN0aW9uTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsXG4gICAgICB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBTZXJ2aWNlQ29uZmlnLFxuICAgICAgdXNlVmFsdWU6IHsgYXBpVXJsOiBDb25maWd1cmF0aW9uLkFwaVVybCwgYXBwVXJsOiBDb25maWd1cmF0aW9uLkFwcFVybCB9XG4gICAgfVxuICBdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG59KVxuY2xhc3MgQXBwTW9kdWxlIHsgfTtcblxucGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7XG4iXX0=