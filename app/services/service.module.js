"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logs_service_1 = require("./logs.service");
var catchmanger_1 = require("./catchManager/catchmanger");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var authentication_service_1 = require("./authentication.service");
var group_service_1 = require("./group.service");
var storage_service_1 = require("./storage.service");
var httpWrapper_service_1 = require("./httpWrapper.service");
var companyService_service_1 = require("./companyService.service");
var location_service_1 = require("./location.service");
var account_service_1 = require("./account.service");
var inventory_service_1 = require("./inventory.service");
var permission_service_1 = require("./permission.service");
var manufacturing_service_1 = require("./manufacturing.service");
/**
 * Home Module
 */
var search_service_1 = require("./search.service");
var tl_pl_service_1 = require("./tl-pl.service");
var ledger_service_1 = require("./ledger.service");
var dashboard_service_1 = require("./dashboard.service");
var settings_integraion_service_1 = require("./settings.integraion.service");
var settings_profile_service_1 = require("./settings.profile.service");
var settings_taxes_service_1 = require("./settings.taxes.service");
var sales_service_1 = require("./sales.service");
var invoice_service_1 = require("./invoice.service");
var invoice_templates_service_1 = require("./invoice.templates.service");
var settings_linked_accounts_service_1 = require("./settings.linked.accounts.service");
var purchase_invoice_service_1 = require("./purchase-invoice.service");
var settings_financial_year_service_1 = require("./settings.financial-year.service");
var settings_permission_service_1 = require("./settings.permission.service");
var general_service_1 = require("./general.service");
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
var ServiceModule = ServiceModule_1 = (function () {
    function ServiceModule() {
    }
    ServiceModule.forRoot = function () {
        return {
            ngModule: ServiceModule_1,
            providers: [
                general_service_1.GeneralService,
                storage_service_1.StorageService,
                catchmanger_1.ErrorHandler,
                httpWrapper_service_1.HttpWrapperService,
                authentication_service_1.AuthenticationService,
                dashboard_service_1.DashboardService,
                companyService_service_1.CompanyService,
                sales_service_1.SalesService,
                location_service_1.LocationService,
                group_service_1.GroupService,
                account_service_1.AccountService,
                inventory_service_1.InventoryService,
                permission_service_1.PermissionService,
                manufacturing_service_1.ManufacturingService,
                search_service_1.SearchService,
                invoice_service_1.InvoiceService,
                invoice_templates_service_1.InvoiceTemplatesService,
                logs_service_1.LogsService,
                tl_pl_service_1.TlPlService,
                ledger_service_1.LedgerService,
                settings_integraion_service_1.SettingsIntegrationService,
                settings_profile_service_1.SettingsProfileService,
                settings_taxes_service_1.SettingsTaxesService,
                settings_linked_accounts_service_1.SettingsLinkedAccountsService,
                purchase_invoice_service_1.PurchaseInvoiceService,
                settings_financial_year_service_1.SettingsFinancialYearService,
                settings_permission_service_1.SettingsPermissionService
            ]
        };
    };
    return ServiceModule;
}());
ServiceModule = ServiceModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, router_1.RouterModule
        ],
        exports: [common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule]
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;
var ServiceModule_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXJ2aWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE2QztBQUM3QywwREFBMEQ7QUFDMUQsc0NBQThEO0FBQzlELDBDQUErQztBQUMvQyx3Q0FBNkM7QUFDN0MsMENBQStDO0FBRS9DLG1FQUFpRTtBQUNqRSxpREFBK0M7QUFDL0MscURBQW1EO0FBQ25ELDZEQUEyRDtBQUUzRCxtRUFBMEQ7QUFDMUQsdURBQXFEO0FBQ3JELHFEQUFtRDtBQUNuRCx5REFBdUQ7QUFDdkQsMkRBQXlEO0FBQ3pELGlFQUErRDtBQUMvRDs7R0FFRztBQUNILG1EQUFpRDtBQUNqRCxpREFBOEM7QUFDOUMsbURBQWlEO0FBQ2pELHlEQUF1RDtBQUN2RCw2RUFBMkU7QUFDM0UsdUVBQW9FO0FBQ3BFLG1FQUFnRTtBQUNoRSxpREFBK0M7QUFDL0MscURBQW1EO0FBQ25ELHlFQUFzRTtBQUN0RSx1RkFBbUY7QUFDbkYsdUVBQW9FO0FBQ3BFLHFGQUFpRjtBQUNqRiw2RUFBMEU7QUFDMUUscURBQW1EO0FBR25EOztHQUVHO0FBT0gsSUFBYSxhQUFhO0lBQTFCO0lBbUNBLENBQUM7SUFsQ2UscUJBQU8sR0FBckI7UUFDRSxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsZUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsZ0NBQWM7Z0JBQ2QsZ0NBQWM7Z0JBQ2QsMEJBQVk7Z0JBQ1osd0NBQWtCO2dCQUNsQiw4Q0FBcUI7Z0JBQ3JCLG9DQUFnQjtnQkFDaEIsdUNBQWM7Z0JBQ2QsNEJBQVk7Z0JBQ1osa0NBQWU7Z0JBQ2YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsb0NBQWdCO2dCQUNoQixzQ0FBaUI7Z0JBQ2pCLDRDQUFvQjtnQkFDcEIsOEJBQWE7Z0JBQ2IsZ0NBQWM7Z0JBQ2QsbURBQXVCO2dCQUN2QiwwQkFBVztnQkFDWCwyQkFBVztnQkFDWCw4QkFBYTtnQkFDYix3REFBMEI7Z0JBQzFCLGlEQUFzQjtnQkFDdEIsNkNBQW9CO2dCQUNwQixnRUFBNkI7Z0JBQzdCLGlEQUFzQjtnQkFDdEIsOERBQTRCO2dCQUM1Qix1REFBeUI7YUFDMUI7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxhQUFhO0lBTHpCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLEVBQUUscUJBQVk7U0FDbkM7UUFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxFQUFFLG1CQUFXLEVBQUUscUJBQVksQ0FBQztLQUNuRCxDQUFDO0dBQ1csYUFBYSxDQW1DekI7QUFuQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dzU2VydmljZSB9IGZyb20gJy4vbG9ncy5zZXJ2aWNlJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vY2F0Y2hNYW5hZ2VyL2NhdGNobWFuZ2VyJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi9ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9odHRwV3JhcHBlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ29tcGFueVNlcnZpY2UgfSBmcm9tICcuL2NvbXBhbnlTZXJ2aWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9sb2NhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gJy4vaW52ZW50b3J5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuL3Blcm1pc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBNYW51ZmFjdHVyaW5nU2VydmljZSB9IGZyb20gJy4vbWFudWZhY3R1cmluZy5zZXJ2aWNlJztcbi8qKlxuICogSG9tZSBNb2R1bGVcbiAqL1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGxQbFNlcnZpY2UgfSBmcm9tICcuL3RsLXBsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGVkZ2VyU2VydmljZSB9IGZyb20gJy4vbGVkZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2V0dGluZ3NJbnRlZ3JhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NldHRpbmdzLmludGVncmFpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTZXR0aW5nc1Byb2ZpbGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXR0aW5ncy5wcm9maWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2V0dGluZ3NUYXhlc1NlcnZpY2UgfSBmcm9tICcuL3NldHRpbmdzLnRheGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2FsZXNTZXJ2aWNlIH0gZnJvbSAnLi9zYWxlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEludm9pY2VTZXJ2aWNlIH0gZnJvbSAnLi9pbnZvaWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW52b2ljZVRlbXBsYXRlc1NlcnZpY2UgfSBmcm9tICcuL2ludm9pY2UudGVtcGxhdGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2V0dGluZ3NMaW5rZWRBY2NvdW50c1NlcnZpY2UgfSBmcm9tICcuL3NldHRpbmdzLmxpbmtlZC5hY2NvdW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFB1cmNoYXNlSW52b2ljZVNlcnZpY2UgfSBmcm9tICcuL3B1cmNoYXNlLWludm9pY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBTZXR0aW5nc0ZpbmFuY2lhbFllYXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXR0aW5ncy5maW5hbmNpYWwteWVhci5zZXJ2aWNlJztcbmltcG9ydCB7IFNldHRpbmdzUGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuL3NldHRpbmdzLnBlcm1pc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lcmFsU2VydmljZSB9IGZyb20gJy4vZ2VuZXJhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlcnZpY2VDb25maWcsIElTZXJ2aWNlQ29uZmlnQXJncyB9IGZyb20gJy4vc2VydmljZS5jb25maWcnO1xuXG4vKipcbiAqIERvIG5vdCBzcGVjaWZ5IHByb3ZpZGVycyBmb3IgbW9kdWxlcyB0aGF0IG1pZ2h0IGJlIGltcG9ydGVkIGJ5IGEgbGF6eSBsb2FkZWQgbW9kdWxlLlxuICovXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2VydmljZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBHZW5lcmFsU2VydmljZSxcbiAgICAgICAgU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIEVycm9ySGFuZGxlcixcbiAgICAgICAgSHR0cFdyYXBwZXJTZXJ2aWNlLFxuICAgICAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgICAgIERhc2hib2FyZFNlcnZpY2UsXG4gICAgICAgIENvbXBhbnlTZXJ2aWNlLFxuICAgICAgICBTYWxlc1NlcnZpY2UsXG4gICAgICAgIExvY2F0aW9uU2VydmljZSxcbiAgICAgICAgR3JvdXBTZXJ2aWNlLFxuICAgICAgICBBY2NvdW50U2VydmljZSxcbiAgICAgICAgSW52ZW50b3J5U2VydmljZSxcbiAgICAgICAgUGVybWlzc2lvblNlcnZpY2UsXG4gICAgICAgIE1hbnVmYWN0dXJpbmdTZXJ2aWNlLFxuICAgICAgICBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBJbnZvaWNlU2VydmljZSxcbiAgICAgICAgSW52b2ljZVRlbXBsYXRlc1NlcnZpY2UsXG4gICAgICAgIExvZ3NTZXJ2aWNlLFxuICAgICAgICBUbFBsU2VydmljZSxcbiAgICAgICAgTGVkZ2VyU2VydmljZSxcbiAgICAgICAgU2V0dGluZ3NJbnRlZ3JhdGlvblNlcnZpY2UsXG4gICAgICAgIFNldHRpbmdzUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgIFNldHRpbmdzVGF4ZXNTZXJ2aWNlLFxuICAgICAgICBTZXR0aW5nc0xpbmtlZEFjY291bnRzU2VydmljZSxcbiAgICAgICAgUHVyY2hhc2VJbnZvaWNlU2VydmljZSxcbiAgICAgICAgU2V0dGluZ3NGaW5hbmNpYWxZZWFyU2VydmljZSxcbiAgICAgICAgU2V0dGluZ3NQZXJtaXNzaW9uU2VydmljZVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==