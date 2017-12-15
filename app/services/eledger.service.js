"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var httpWrapper_service_1 = require("./httpWrapper.service");
var router_1 = require("@angular/router");
var catchmanger_1 = require("./catchManager/catchmanger");
var eledger_api_1 = require("./apiurls/eledger.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var EledgerService = (function () {
    function EledgerService(errorHandler, _http, _router, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._router = _router;
        this._generalService = _generalService;
        this.config = config;
    }
    /*
    * Eledger get transactions
    * Response will be an array of EledgerResponse in body
    * refresh is optional
    * conditional making url
    */
    EledgerService.prototype.GetEledgerTransactions = function (accountUniqueName, refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var URL = this.config.apiUrl + eledger_api_1.ELEDGER_API.GET.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':accountUniqueName', encodeURIComponent(accountUniqueName));
        if (refresh) {
            URL = URL + '?refresh=true';
        }
        return this._http.get(URL).map(function (res) {
            var data = res.json();
            data.queryString = { accountUniqueName: accountUniqueName, refresh: refresh };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', { accountUniqueName: accountUniqueName, refresh: refresh }); });
    };
    /*
    * Trash Eledger transaction
    * Response will be string in body
    */
    EledgerService.prototype.TrashEledgerTransaction = function (accountUniqueName, transactionId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + eledger_api_1.ELEDGER_API.TRASH.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':accountUniqueName', encodeURIComponent(accountUniqueName)).replace(':transactionId', transactionId)).map(function (res) {
            var data = res.json();
            data.queryString = { accountUniqueName: accountUniqueName, transactionId: transactionId };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', { accountUniqueName: accountUniqueName, transactionId: transactionId }); });
    };
    /*
    * Map Eledger transaction
    * Response will be string in body
    */
    EledgerService.prototype.MapEledgerTransaction = function (model, accountUniqueName, transactionId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + eledger_api_1.ELEDGER_API.MAP.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':accountUniqueName', encodeURIComponent(accountUniqueName)).replace(':transactionId', transactionId), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { accountUniqueName: accountUniqueName, transactionId: transactionId };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, model, { accountUniqueName: accountUniqueName, transactionId: transactionId }); });
    };
    return EledgerService;
}());
EledgerService = __decorate([
    core_1.Injectable(),
    __param(4, core_1.Optional()), __param(4, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService, router_1.Router,
        general_service_1.GeneralService, Object])
], EledgerService);
exports.EledgerService = EledgerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlZGdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxlZGdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELGlDQUErQjtBQUMvQiw2REFBMkQ7QUFDM0QsMENBQXlDO0FBSXpDLDBEQUEwRDtBQUMxRCxxREFBb0Q7QUFFcEQscURBQW1EO0FBQ25ELG1EQUFxRTtBQUdyRSxJQUFhLGNBQWM7SUFJekIsd0JBQW9CLFlBQTBCLEVBQVMsS0FBeUIsRUFBUyxPQUFlLEVBQ3BGLGVBQStCLEVBQTZDLE1BQTBCO1FBRHRHLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ3BGLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUE2QyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtJQUMxSCxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFDSywrQ0FBc0IsR0FBN0IsVUFBOEIsaUJBQXlCLEVBQUUsT0FBd0I7UUFBakYsaUJBWUM7UUFad0Qsd0JBQUEsRUFBQSxlQUF3QjtRQUMvRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLHlCQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDOUwsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQzlCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNqQyxJQUFJLElBQUksR0FBNEMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9ELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxpQkFBaUIsbUJBQUEsRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBNEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLGlCQUFpQixtQkFBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsRUFBN0YsQ0FBNkYsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRDs7O01BR0U7SUFDSyxnREFBdUIsR0FBOUIsVUFBK0IsaUJBQXlCLEVBQUUsYUFBcUI7UUFBL0UsaUJBUUM7UUFQQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDL1AsSUFBSSxJQUFJLEdBQWlDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUMsaUJBQWlCLG1CQUFBLEVBQUUsYUFBYSxlQUFBLEVBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBQyxpQkFBaUIsbUJBQUEsRUFBRSxhQUFhLGVBQUEsRUFBQyxDQUFDLEVBQXhGLENBQXdGLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQ7OztNQUdFO0lBQ0ssOENBQXFCLEdBQTVCLFVBQTZCLEtBQXdCLEVBQUUsaUJBQXlCLEVBQUUsYUFBcUI7UUFBdkcsaUJBV0M7UUFWQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsRUFBRSxLQUFLLENBQUM7YUFDdlAsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNQLElBQUksSUFBSSxHQUE0QyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFDLGlCQUFpQixtQkFBQSxFQUFFLGFBQWEsZUFBQSxFQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUE0QixDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUMsaUJBQWlCLG1CQUFBLEVBQUUsYUFBYSxlQUFBLEVBQUMsQ0FBQyxFQUF0RyxDQUFzRyxDQUFDLENBQUM7SUFDMUgsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQztBQTNEWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7SUFNMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBZ0Isd0NBQWtCLEVBQWtCLGVBQU07UUFDbkUsZ0NBQWM7R0FMeEMsY0FBYyxDQTJEMUI7QUEzRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvbG9naW5Nb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgRUxFREdFUl9BUEkgfSBmcm9tICcuL2FwaXVybHMvZWxlZGdlci5hcGknO1xuaW1wb3J0IHsgRWxlZGdlck1hcFJlcXVlc3QsIEVsZWRnZXJSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0VsZWRnZXInO1xuaW1wb3J0IHsgR2VuZXJhbFNlcnZpY2UgfSBmcm9tICcuL2dlbmVyYWwuc2VydmljZSc7XG5pbXBvcnQgeyBTZXJ2aWNlQ29uZmlnLCBJU2VydmljZUNvbmZpZ0FyZ3MgfSBmcm9tICcuL3NlcnZpY2UuY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVsZWRnZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHVzZXI6IFVzZXJEZXRhaWxzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHB1YmxpYyBfaHR0cDogSHR0cFdyYXBwZXJTZXJ2aWNlLCBwdWJsaWMgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nZW5lcmFsU2VydmljZTogR2VuZXJhbFNlcnZpY2UsIEBPcHRpb25hbCgpIEBJbmplY3QoU2VydmljZUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IElTZXJ2aWNlQ29uZmlnQXJncykge1xuICB9XG5cbiAgLypcbiAgKiBFbGVkZ2VyIGdldCB0cmFuc2FjdGlvbnNcbiAgKiBSZXNwb25zZSB3aWxsIGJlIGFuIGFycmF5IG9mIEVsZWRnZXJSZXNwb25zZSBpbiBib2R5XG4gICogcmVmcmVzaCBpcyBvcHRpb25hbFxuICAqIGNvbmRpdGlvbmFsIG1ha2luZyB1cmxcbiAgKi9cbiAgcHVibGljIEdldEVsZWRnZXJUcmFuc2FjdGlvbnMoYWNjb3VudFVuaXF1ZU5hbWU6IHN0cmluZywgcmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8RWxlZGdlclJlc3BvbnNlW10sIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICBsZXQgVVJMID0gdGhpcy5jb25maWcuYXBpVXJsICsgRUxFREdFUl9BUEkuR0VULnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSkucmVwbGFjZSgnOmFjY291bnRVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KGFjY291bnRVbmlxdWVOYW1lKSk7XG4gICAgaWYgKHJlZnJlc2gpIHtcbiAgICAgIFVSTCA9IFVSTCArICc/cmVmcmVzaD10cnVlJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KFVSTCkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8RWxlZGdlclJlc3BvbnNlW10sIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHthY2NvdW50VW5pcXVlTmFtZSwgcmVmcmVzaH07XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8RWxlZGdlclJlc3BvbnNlW10sIHN0cmluZz4oZSwgJycsIHthY2NvdW50VW5pcXVlTmFtZSwgcmVmcmVzaH0pKTtcbiAgfVxuXG4gIC8qXG4gICogVHJhc2ggRWxlZGdlciB0cmFuc2FjdGlvblxuICAqIFJlc3BvbnNlIHdpbGwgYmUgc3RyaW5nIGluIGJvZHlcbiAgKi9cbiAgcHVibGljIFRyYXNoRWxlZGdlclRyYW5zYWN0aW9uKGFjY291bnRVbmlxdWVOYW1lOiBzdHJpbmcsIHRyYW5zYWN0aW9uSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGlVcmwgKyBFTEVER0VSX0FQSS5UUkFTSC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzphY2NvdW50VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChhY2NvdW50VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzp0cmFuc2FjdGlvbklkJywgdHJhbnNhY3Rpb25JZCkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge2FjY291bnRVbmlxdWVOYW1lLCB0cmFuc2FjdGlvbklkfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIHN0cmluZz4oZSwgJycsIHthY2NvdW50VW5pcXVlTmFtZSwgdHJhbnNhY3Rpb25JZH0pKTtcbiAgfVxuXG4gIC8qXG4gICogTWFwIEVsZWRnZXIgdHJhbnNhY3Rpb25cbiAgKiBSZXNwb25zZSB3aWxsIGJlIHN0cmluZyBpbiBib2R5XG4gICovXG4gIHB1YmxpYyBNYXBFbGVkZ2VyVHJhbnNhY3Rpb24obW9kZWw6IEVsZWRnZXJNYXBSZXF1ZXN0LCBhY2NvdW50VW5pcXVlTmFtZTogc3RyaW5nLCB0cmFuc2FjdGlvbklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxzdHJpbmcsIEVsZWRnZXJNYXBSZXF1ZXN0Pj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBFTEVER0VSX0FQSS5NQVAucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKS5yZXBsYWNlKCc6YWNjb3VudFVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQoYWNjb3VudFVuaXF1ZU5hbWUpKS5yZXBsYWNlKCc6dHJhbnNhY3Rpb25JZCcsIHRyYW5zYWN0aW9uSWQpLCBtb2RlbClcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgRWxlZGdlck1hcFJlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5yZXF1ZXN0ID0gbW9kZWw7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7YWNjb3VudFVuaXF1ZU5hbWUsIHRyYW5zYWN0aW9uSWR9O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPHN0cmluZywgRWxlZGdlck1hcFJlcXVlc3Q+KGUsIG1vZGVsLCB7YWNjb3VudFVuaXF1ZU5hbWUsIHRyYW5zYWN0aW9uSWR9KSk7XG4gIH1cblxufVxuIl19