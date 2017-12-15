"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var ngrx_devtools_nativescript_1 = require("ngrx-devtools-nativescript");
var store_devtools_1 = require("@ngrx/store-devtools");
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var app_component_1 = require("./app.component");
var board_reducer_1 = require("./board.reducer");
var logger_metareducer_1 = require("./logger.metareducer");
var board_component_1 = require("./board.component");
var player_pipe_1 = require("./player.pipe");
var service_module_1 = require("./services/service.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, board_component_1.BoardComponent, player_pipe_1.PlayerPipe],
        imports: [
            nativescript_module_1.NativeScriptModule,
            ngrx_devtools_nativescript_1.NativeScriptDevToolsMonitors,
            store_1.StoreModule.forRoot({ board: logger_metareducer_1.logger(board_reducer_1.boardReducer) }),
            store_devtools_1.StoreDevtoolsModule.instrument(),
            service_module_1.ServiceModule
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
;
platform_1.platformNativeScriptDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBQzVFLGdGQUE4RTtBQUM5RSx5RUFBMEU7QUFDMUUsdURBQTJEO0FBRTNELHNDQUF5QztBQUN6QyxxQ0FBMEM7QUFFMUMsaURBQStDO0FBQy9DLGlEQUErQztBQUMvQywyREFBOEM7QUFDOUMscURBQW1EO0FBQ25ELDZDQUEyQztBQUMzQyw0REFBMEQ7QUFhMUQsSUFBTSxTQUFTO0lBQWY7SUFBa0IsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUFuQixJQUFtQjtBQUFiLFNBQVM7SUFYZCxlQUFRLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGdDQUFjLEVBQUUsd0JBQVUsQ0FBQztRQUN4RCxPQUFPLEVBQUU7WUFDUCx3Q0FBa0I7WUFDbEIseURBQTRCO1lBQzVCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLDJCQUFNLENBQUMsNEJBQVksQ0FBQyxFQUFFLENBQUM7WUFDcEQsb0NBQW1CLENBQUMsVUFBVSxFQUFFO1lBQ2hDLDhCQUFhO1NBQ2Q7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDSSxTQUFTLENBQUk7QUFBQSxDQUFDO0FBRXBCLHNDQUEyQixFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdGhpcyBpbXBvcnQgc2hvdWxkIGJlIGZpcnN0IGluIG9yZGVyIHRvIGxvYWQgc29tZSByZXF1aXJlZCBzZXR0aW5ncyAobGlrZSBnbG9iYWxzIGFuZCByZWZsZWN0LW1ldGFkYXRhKVxuaW1wb3J0IHsgcGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0RGV2VG9vbHNNb25pdG9ycyB9IGZyb20gXCJuZ3J4LWRldnRvb2xzLW5hdGl2ZXNjcmlwdFwiO1xuaW1wb3J0IHsgU3RvcmVEZXZ0b29sc01vZHVsZSB9IGZyb20gJ0BuZ3J4L3N0b3JlLWRldnRvb2xzJztcblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IGJvYXJkUmVkdWNlciB9IGZyb20gJy4vYm9hcmQucmVkdWNlcic7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlci5tZXRhcmVkdWNlcic7XG5pbXBvcnQgeyBCb2FyZENvbXBvbmVudCB9IGZyb20gJy4vYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFBsYXllclBpcGUgfSBmcm9tICcuL3BsYXllci5waXBlJztcbmltcG9ydCB7IFNlcnZpY2VNb2R1bGUgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zZXJ2aWNlLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnQsIEJvYXJkQ29tcG9uZW50LCBQbGF5ZXJQaXBlXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHREZXZUb29sc01vbml0b3JzLFxuICAgIFN0b3JlTW9kdWxlLmZvclJvb3QoeyBib2FyZDogbG9nZ2VyKGJvYXJkUmVkdWNlcikgfSksXG4gICAgU3RvcmVEZXZ0b29sc01vZHVsZS5pbnN0cnVtZW50KCksXG4gICAgU2VydmljZU1vZHVsZVxuICBdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG59KVxuY2xhc3MgQXBwTW9kdWxlIHsgfTtcblxucGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7Il19