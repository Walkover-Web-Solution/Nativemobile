"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var login_action_1 = require("./login/login.action");
var ActionModule = ActionModule_1 = (function () {
    function ActionModule() {
    }
    ActionModule.forRoot = function () {
        return {
            ngModule: ActionModule_1,
            providers: []
        };
    };
    return ActionModule;
}());
ActionModule = ActionModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            effects_1.EffectsModule.forRoot([
                login_action_1.LoginActions
            ])
        ],
        exports: [effects_1.EffectsModule]
    })
], ActionModule);
exports.ActionModule = ActionModule;
var ActionModule_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RDtBQUM5RCx5Q0FBOEM7QUFFOUMscURBQW9EO0FBVXBELElBQWEsWUFBWTtJQUF6QjtJQU9BLENBQUM7SUFOZSxvQkFBTyxHQUFyQjtRQUNFLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxjQUFZO1lBQ3RCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksWUFBWTtJQVJ4QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCx1QkFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDcEIsMkJBQVk7YUFDYixDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBYSxDQUFDO0tBQ3pCLENBQUM7R0FDVyxZQUFZLENBT3hCO0FBUFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuXG5pbXBvcnQgeyBMb2dpbkFjdGlvbnMgfSBmcm9tICcuL2xvZ2luL2xvZ2luLmFjdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBFZmZlY3RzTW9kdWxlLmZvclJvb3QoW1xuICAgICAgTG9naW5BY3Rpb25zXG4gICAgXSlcbiAgXSxcbiAgZXhwb3J0czogW0VmZmVjdHNNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbk1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFjdGlvbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW11cbiAgICB9O1xuICB9XG59XG4iXX0=