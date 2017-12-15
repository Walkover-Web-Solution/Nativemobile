"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpWrapper_service_1 = require("./httpWrapper.service");
var core_1 = require("@angular/core");
var catchmanger_1 = require("./catchManager/catchmanger");
var settings_linked_accounts_api_1 = require("./apiurls/settings.linked.accounts.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var SettingsLinkedAccountsService = (function () {
    function SettingsLinkedAccountsService(errorHandler, _http, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     * Get ebank token
     */
    SettingsLinkedAccountsService.prototype.GetEbankToken = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.GET_TOKEN.replace(':companyUniqueName', this.companyUniqueName)).map(function (res) {
            var data = res.json();
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Get all ebank accounts
     */
    SettingsLinkedAccountsService.prototype.GetAllEbankAccounts = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.GET_ALL_ACCOUNTS.replace(':companyUniqueName', this.companyUniqueName)).map(function (res) {
            var data = res.json();
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Refresh all ebank accounts
     */
    SettingsLinkedAccountsService.prototype.RefreshAllEbankAccounts = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.REFRESH_ACCOUNTS.replace(':companyUniqueName', this.companyUniqueName)).map(function (res) {
            var data = res.json();
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Reconnect account
     */
    SettingsLinkedAccountsService.prototype.ReconnectAccount = function (loginId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.RECONNECT_ACCOUNT.replace(':companyUniqueName', this.companyUniqueName).replace(':loginId', loginId)).map(function (res) {
            var data = res.json();
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Delete account
     */
    SettingsLinkedAccountsService.prototype.DeleteBankAccount = function (loginId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.DELETE_BANK_ACCOUNT.replace(':companyUniqueName', this.companyUniqueName).replace(':loginId', loginId)).map(function (res) {
            var data = res.json();
            data.queryString = { loginId: loginId };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Refresh account
     */
    SettingsLinkedAccountsService.prototype.RefreshBankAccount = function (loginId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.REFREST_ACCOUNT.replace(':companyUniqueName', this.companyUniqueName).replace(':loginId', loginId)).map(function (res) {
            var data = res.json();
            data.queryString = { loginId: loginId };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Link bank account
     */
    SettingsLinkedAccountsService.prototype.LinkBankAccount = function (dataToSend, accountId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.LINK_ACCOUNT.replace(':companyUniqueName', this.companyUniqueName).replace(':accountId', accountId), dataToSend).map(function (res) {
            var data = res.json();
            data.queryString = { accountId: accountId };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Unlink bank account
     */
    SettingsLinkedAccountsService.prototype.UnlinkBankAccount = function (accountId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.UNLINK_ACCOUNT.replace(':companyUniqueName', this.companyUniqueName).replace(':accountId', accountId)).map(function (res) {
            var data = res.json();
            data.queryString = { accountId: accountId };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Update Date
     */
    SettingsLinkedAccountsService.prototype.UpdateDate = function (date, accountId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + settings_linked_accounts_api_1.EBANKS.UPDATE_DATE.replace(':companyUniqueName', this.companyUniqueName).replace(':accountId', accountId).replace(':date', date), {}).map(function (res) {
            var data = res.json();
            data.queryString = { accountId: accountId };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    return SettingsLinkedAccountsService;
}());
SettingsLinkedAccountsService = __decorate([
    core_1.Injectable(),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService,
        general_service_1.GeneralService, Object])
], SettingsLinkedAccountsService);
exports.SettingsLinkedAccountsService = SettingsLinkedAccountsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MubGlua2VkLmFjY291bnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy5saW5rZWQuYWNjb3VudHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZEQUEyRDtBQUMzRCxzQ0FBNkQ7QUFHN0QsMERBQTBEO0FBQzFELHVGQUFnRTtBQUVoRSxxREFBbUQ7QUFDbkQsbURBQXFFO0FBR3JFLElBQWEsNkJBQTZCO0lBS3hDLHVDQUFvQixZQUEwQixFQUFVLEtBQXlCLEVBQzdELGVBQStCLEVBQTZDLE1BQTBCO1FBRHRHLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDN0Qsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQTZDLFdBQU0sR0FBTixNQUFNLENBQW9CO0lBQzFILENBQUM7SUFFRDs7T0FFRztJQUNJLHFEQUFhLEdBQXBCO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxxQ0FBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1lBQ3pILElBQUksSUFBSSxHQUFpRCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFpQyxDQUFD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WSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUN2TCxJQUFJLElBQUksR0FBOEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxTQUFTLFdBQUEsRUFBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBYyxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDSCxvQ0FBQztBQUFELENBQUMsQUF6SEQsSUF5SEM7QUF6SFksNkJBQTZCO0lBRHpDLGlCQUFVLEVBQUU7SUFPMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBaUIsd0NBQWtCO1FBQzVDLGdDQUFjO0dBTnhDLDZCQUE2QixDQXlIekM7QUF6SFksc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlckRldGFpbHMgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9sb2dpbk1vZGVscyc7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9CYXNlUmVzcG9uc2UnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgRUJBTktTIH0gZnJvbSAnLi9hcGl1cmxzL3NldHRpbmdzLmxpbmtlZC5hY2NvdW50cy5hcGknO1xuaW1wb3J0IHsgSUdldEFsbEViYW5rQWNjb3VudFJlc3BvbnNlLCBJR2V0RWJhbmtUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvU2V0dGluZ3NMaW5rZWRBY2NvdW50cyc7XG5pbXBvcnQgeyBHZW5lcmFsU2VydmljZSB9IGZyb20gJy4vZ2VuZXJhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlcnZpY2VDb25maWcsIElTZXJ2aWNlQ29uZmlnQXJncyB9IGZyb20gJy4vc2VydmljZS5jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NMaW5rZWRBY2NvdW50c1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgdXNlcjogVXNlckRldGFpbHM7XG4gIHByaXZhdGUgY29tcGFueVVuaXF1ZU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLCBwcml2YXRlIF9odHRwOiBIdHRwV3JhcHBlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2dlbmVyYWxTZXJ2aWNlOiBHZW5lcmFsU2VydmljZSwgQE9wdGlvbmFsKCkgQEluamVjdChTZXJ2aWNlQ29uZmlnKSBwcml2YXRlIGNvbmZpZzogSVNlcnZpY2VDb25maWdBcmdzKSB7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGViYW5rIHRva2VuXG4gICAqL1xuICBwdWJsaWMgR2V0RWJhbmtUb2tlbigpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxJR2V0RWJhbmtUb2tlblJlc3BvbnNlLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIEVCQU5LUy5HRVRfVE9LRU4ucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPElHZXRFYmFua1Rva2VuUmVzcG9uc2UsIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPElHZXRFYmFua1Rva2VuUmVzcG9uc2UsIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgZWJhbmsgYWNjb3VudHNcbiAgICovXG4gIHB1YmxpYyBHZXRBbGxFYmFua0FjY291bnRzKCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPElHZXRBbGxFYmFua0FjY291bnRSZXNwb25zZVtdLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIEVCQU5LUy5HRVRfQUxMX0FDQ09VTlRTLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxJR2V0QWxsRWJhbmtBY2NvdW50UmVzcG9uc2VbXSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8SUdldEFsbEViYW5rQWNjb3VudFJlc3BvbnNlW10sIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggYWxsIGViYW5rIGFjY291bnRzXG4gICAqL1xuICBwdWJsaWMgUmVmcmVzaEFsbEViYW5rQWNjb3VudHMoKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8SUdldEFsbEViYW5rQWNjb3VudFJlc3BvbnNlW10sIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgRUJBTktTLlJFRlJFU0hfQUNDT1VOVFMucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPElHZXRBbGxFYmFua0FjY291bnRSZXNwb25zZVtdLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxJR2V0QWxsRWJhbmtBY2NvdW50UmVzcG9uc2VbXSwgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVjb25uZWN0IGFjY291bnRcbiAgICovXG4gIHB1YmxpYyBSZWNvbm5lY3RBY2NvdW50KGxvZ2luSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPGFueSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBFQkFOS1MuUkVDT05ORUNUX0FDQ09VTlQucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSkucmVwbGFjZSgnOmxvZ2luSWQnLCBsb2dpbklkKSkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8YW55LCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxhbnksIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhY2NvdW50XG4gICAqL1xuICBwdWJsaWMgRGVsZXRlQmFua0FjY291bnQobG9naW5JZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZGVsZXRlKHRoaXMuY29uZmlnLmFwaVVybCArIEVCQU5LUy5ERUxFVEVfQkFOS19BQ0NPVU5ULnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLnJlcGxhY2UoJzpsb2dpbklkJywgbG9naW5JZCkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPGFueSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge2xvZ2luSWR9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBhY2NvdW50XG4gICAqL1xuICBwdWJsaWMgUmVmcmVzaEJhbmtBY2NvdW50KGxvZ2luSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPGFueSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBFQkFOS1MuUkVGUkVTVF9BQ0NPVU5ULnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLnJlcGxhY2UoJzpsb2dpbklkJywgbG9naW5JZCkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPGFueSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge2xvZ2luSWR9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKipcbiAgICogTGluayBiYW5rIGFjY291bnRcbiAgICovXG4gIHB1YmxpYyBMaW5rQmFua0FjY291bnQoZGF0YVRvU2VuZDogb2JqZWN0LCBhY2NvdW50SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPGFueSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBFQkFOS1MuTElOS19BQ0NPVU5ULnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLnJlcGxhY2UoJzphY2NvdW50SWQnLCBhY2NvdW50SWQpLCBkYXRhVG9TZW5kKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxhbnksIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHthY2NvdW50SWR9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKipcbiAgICogVW5saW5rIGJhbmsgYWNjb3VudFxuICAgKi9cbiAgcHVibGljIFVubGlua0JhbmtBY2NvdW50KGFjY291bnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZGVsZXRlKHRoaXMuY29uZmlnLmFwaVVybCArIEVCQU5LUy5VTkxJTktfQUNDT1VOVC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6YWNjb3VudElkJywgYWNjb3VudElkKSkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8YW55LCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7YWNjb3VudElkfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxhbnksIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBEYXRlXG4gICAqL1xuICBwdWJsaWMgVXBkYXRlRGF0ZShkYXRlOiBzdHJpbmcsIGFjY291bnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuY29uZmlnLmFwaVVybCArIEVCQU5LUy5VUERBVEVfREFURS5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6YWNjb3VudElkJywgYWNjb3VudElkKS5yZXBsYWNlKCc6ZGF0ZScsIGRhdGUpLCB7fSkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8YW55LCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7YWNjb3VudElkfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxhbnksIHN0cmluZz4oZSkpO1xuICB9XG59XG4iXX0=