"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpWrapper_service_1 = require("./httpWrapper.service");
var core_1 = require("@angular/core");
var catchmanger_1 = require("./catchManager/catchmanger");
var comapny_api_1 = require("./apiurls/comapny.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var SettingsTaxesService = (function () {
    function SettingsTaxesService(errorHandler, _http, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     * Create Tax
     */
    SettingsTaxesService.prototype.CreateTax = function (model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + comapny_api_1.COMPANY_API.TAX.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /**
     * Update Tax
     */
    SettingsTaxesService.prototype.UpdateTax = function (model, taxUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + comapny_api_1.COMPANY_API.TAX.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)) + '/' + taxUniqueName, model).map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /**
     * Delete Tax
     */
    SettingsTaxesService.prototype.DeleteTax = function (taxUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + comapny_api_1.COMPANY_API.TAX.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)) + '/' + taxUniqueName).map(function (res) {
            var data = res.json();
            data.request = taxUniqueName;
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, taxUniqueName); });
    };
    return SettingsTaxesService;
}());
SettingsTaxesService = __decorate([
    core_1.Injectable(),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService,
        general_service_1.GeneralService, Object])
], SettingsTaxesService);
exports.SettingsTaxesService = SettingsTaxesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MudGF4ZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLnRheGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2REFBMkQ7QUFDM0Qsc0NBQTZEO0FBRzdELDBEQUEwRDtBQUMxRCxxREFBb0Q7QUFDcEQscURBQW1EO0FBQ25ELG1EQUFxRTtBQUdyRSxJQUFhLG9CQUFvQjtJQUsvQiw4QkFBb0IsWUFBMEIsRUFBVSxLQUF5QixFQUM3RCxlQUErQixFQUE2QyxNQUEwQjtRQUR0RyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQzdELG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUE2QyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtJQUMxSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBUyxHQUFoQixVQUFpQixLQUFLO1FBQXRCLGlCQVFDO1FBUEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcseUJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNwSixJQUFJLElBQUksR0FBMkIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBUyxHQUFoQixVQUFpQixLQUFLLEVBQUUsYUFBcUI7UUFBN0MsaUJBUUM7UUFQQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDekssSUFBSSxJQUFJLEdBQTJCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0NBQVMsR0FBaEIsVUFBaUIsYUFBcUI7UUFBdEMsaUJBUUM7UUFQQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNySyxJQUFJLElBQUksR0FBMkIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBVyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQXpELENBQXlELENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLG9CQUFvQjtJQURoQyxpQkFBVSxFQUFFO0lBTzJDLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGFBQU0sQ0FBQyw4QkFBYSxDQUFDLENBQUE7cUNBRHJELDBCQUFZLEVBQWlCLHdDQUFrQjtRQUM1QyxnQ0FBYztHQU54QyxvQkFBb0IsQ0ErQ2hDO0FBL0NZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9odHRwV3JhcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvbG9naW5Nb2RlbHMnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vY2F0Y2hNYW5hZ2VyL2NhdGNobWFuZ2VyJztcbmltcG9ydCB7IENPTVBBTllfQVBJIH0gZnJvbSAnLi9hcGl1cmxzL2NvbWFwbnkuYXBpJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZywgSVNlcnZpY2VDb25maWdBcmdzIH0gZnJvbSAnLi9zZXJ2aWNlLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1RheGVzU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB1c2VyOiBVc2VyRGV0YWlscztcbiAgcHJpdmF0ZSBjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHByaXZhdGUgX2h0dHA6IEh0dHBXcmFwcGVyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZ2VuZXJhbFNlcnZpY2U6IEdlbmVyYWxTZXJ2aWNlLCBAT3B0aW9uYWwoKSBASW5qZWN0KFNlcnZpY2VDb25maWcpIHByaXZhdGUgY29uZmlnOiBJU2VydmljZUNvbmZpZ0FyZ3MpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgVGF4XG4gICAqL1xuICBwdWJsaWMgQ3JlYXRlVGF4KG1vZGVsKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBhbnk+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBDT01QQU5ZX0FQSS5UQVgucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKSwgbW9kZWwpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPGFueSwgYW55PiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnJlcXVlc3QgPSBtb2RlbDtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxhbnksIGFueT4oZSwgbW9kZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgVGF4XG4gICAqL1xuICBwdWJsaWMgVXBkYXRlVGF4KG1vZGVsLCB0YXhVbmlxdWVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxhbnksIGFueT4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodGhpcy5jb25maWcuYXBpVXJsICsgQ09NUEFOWV9BUEkuVEFYLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSkgKyAnLycgKyB0YXhVbmlxdWVOYW1lLCBtb2RlbCkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8YW55LCBhbnk+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IG1vZGVsO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgYW55PihlLCBtb2RlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBUYXhcbiAgICovXG4gIHB1YmxpYyBEZWxldGVUYXgodGF4VW5pcXVlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBhbnk+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZGVsZXRlKHRoaXMuY29uZmlnLmFwaVVybCArIENPTVBBTllfQVBJLlRBWC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpICsgJy8nICsgdGF4VW5pcXVlTmFtZSkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8YW55LCBhbnk+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IHRheFVuaXF1ZU5hbWU7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8YW55LCBhbnk+KGUsIHRheFVuaXF1ZU5hbWUpKTtcbiAgfVxufVxuIl19