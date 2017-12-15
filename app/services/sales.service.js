"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpWrapper_service_1 = require("./httpWrapper.service");
var core_1 = require("@angular/core");
var catchmanger_1 = require("./catchManager/catchmanger");
var sales_api_1 = require("./apiurls/sales.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var SalesService = (function () {
    function SalesService(_http, errorHandler, _generalService, config) {
        this._http = _http;
        this.errorHandler = errorHandler;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     *
     * @param model : InvoiceFormClass object
     * @param updateAccount: boolean flag
     */
    SalesService.prototype.generateSales = function (model) {
        var _this = this;
        var accountUniqueName = model.invoice.account.uniqueName;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + sales_api_1.SALES_API_V2.GENERATE_SALES.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    return SalesService;
}());
SalesService = __decorate([
    core_1.Injectable(),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [httpWrapper_service_1.HttpWrapperService,
        catchmanger_1.ErrorHandler, general_service_1.GeneralService, Object])
], SalesService);
exports.SalesService = SalesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNhbGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2REFBMkQ7QUFDM0Qsc0NBQTZEO0FBRzdELDBEQUEwRDtBQUUxRCxpREFBbUQ7QUFDbkQscURBQW1EO0FBQ25ELG1EQUFxRTtBQUdyRSxJQUFhLFlBQVk7SUFLdkIsc0JBQW9CLEtBQXlCLEVBQ3pCLFlBQTBCLEVBQVUsZUFBK0IsRUFDaEMsTUFBMEI7UUFGN0QsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7SUFDakYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQ0FBYSxHQUFwQixVQUFxQixLQUEyQjtRQUFoRCxpQkFXQztRQVZDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLHdCQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxLQUFLLENBQUM7YUFDbkwsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNQLElBQUksSUFBSSxHQUErQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUErQixDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQXJFLENBQXFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTtJQVFFLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGFBQU0sQ0FBQyw4QkFBYSxDQUFDLENBQUE7cUNBRm5CLHdDQUFrQjtRQUNYLDBCQUFZLEVBQTJCLGdDQUFjO0dBTjVFLFlBQVksQ0EyQnhCO0FBM0JZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlckRldGFpbHMgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9sb2dpbk1vZGVscyc7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9CYXNlUmVzcG9uc2UnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgR2VuZXJhdGVTYWxlc1JlcXVlc3QsIEludm9pY2VGb3JtQ2xhc3MgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9TYWxlcyc7XG5pbXBvcnQgeyBTQUxFU19BUElfVjIgfSBmcm9tICcuL2FwaXVybHMvc2FsZXMuYXBpJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZywgSVNlcnZpY2VDb25maWdBcmdzIH0gZnJvbSAnLi9zZXJ2aWNlLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTYWxlc1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgdXNlcjogVXNlckRldGFpbHM7XG4gIHByaXZhdGUgY29tcGFueVVuaXF1ZU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwV3JhcHBlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHByaXZhdGUgX2dlbmVyYWxTZXJ2aWNlOiBHZW5lcmFsU2VydmljZSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChTZXJ2aWNlQ29uZmlnKSBwcml2YXRlIGNvbmZpZzogSVNlcnZpY2VDb25maWdBcmdzKSB7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG1vZGVsIDogSW52b2ljZUZvcm1DbGFzcyBvYmplY3RcbiAgICogQHBhcmFtIHVwZGF0ZUFjY291bnQ6IGJvb2xlYW4gZmxhZ1xuICAgKi9cbiAgcHVibGljIGdlbmVyYXRlU2FsZXMobW9kZWw6IEdlbmVyYXRlU2FsZXNSZXF1ZXN0KTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBHZW5lcmF0ZVNhbGVzUmVxdWVzdD4+IHtcbiAgICBsZXQgYWNjb3VudFVuaXF1ZU5hbWUgPSBtb2RlbC5pbnZvaWNlLmFjY291bnQudW5pcXVlTmFtZTtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaVVybCArIFNBTEVTX0FQSV9WMi5HRU5FUkFURV9TQUxFUy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6YWNjb3VudFVuaXF1ZU5hbWUnLCBhY2NvdW50VW5pcXVlTmFtZSksIG1vZGVsKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBHZW5lcmF0ZVNhbGVzUmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgICBkYXRhLnJlcXVlc3QgPSBtb2RlbDtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIEdlbmVyYXRlU2FsZXNSZXF1ZXN0PihlLCBtb2RlbCkpO1xuICB9XG59XG4iXX0=