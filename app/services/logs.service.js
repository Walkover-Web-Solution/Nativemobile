"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var httpWrapper_service_1 = require("./httpWrapper.service");
var router_1 = require("@angular/router");
var catchmanger_1 = require("./catchManager/catchmanger");
var logs_api_1 = require("./apiurls/logs.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var LogsService = (function () {
    function LogsService(errorHandler, _http, _router, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._router = _router;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     * get transactions
     */
    LogsService.prototype.GetAuditLogs = function (model, page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + logs_api_1.LOGS_API.AUDIT_LOGS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':page', page.toString()), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { page: page };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, model, { page: page }); });
    };
    return LogsService;
}());
LogsService = __decorate([
    core_1.Injectable(),
    __param(4, core_1.Optional()), __param(4, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService, router_1.Router,
        general_service_1.GeneralService, Object])
], LogsService);
exports.LogsService = LogsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELGlDQUErQjtBQUMvQiw2REFBMkQ7QUFDM0QsMENBQXlDO0FBSXpDLDBEQUEwRDtBQUMxRCwrQ0FBOEM7QUFFOUMscURBQW1EO0FBQ25ELG1EQUFxRTtBQUdyRSxJQUFhLFdBQVc7SUFJdEIscUJBQW9CLFlBQTBCLEVBQVMsS0FBeUIsRUFBUyxPQUFlLEVBQ3BGLGVBQStCLEVBQTZDLE1BQTBCO1FBRHRHLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ3BGLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUE2QyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtJQUMxSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQ0FBWSxHQUFuQixVQUFvQixLQUFrQixFQUFFLElBQWdCO1FBQXhELGlCQVdDO1FBWHVDLHFCQUFBLEVBQUEsUUFBZ0I7UUFDdEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsbUJBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7YUFDaEwsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNQLElBQUksSUFBSSxHQUE0QyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFDLElBQUksTUFBQSxFQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUE0QixDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUMsSUFBSSxNQUFBLEVBQUMsQ0FBQyxFQUExRSxDQUEwRSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7SUFNMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBZ0Isd0NBQWtCLEVBQWtCLGVBQU07UUFDbkUsZ0NBQWM7R0FMeEMsV0FBVyxDQXVCdkI7QUF2Qlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvbG9naW5Nb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgTE9HU19BUEkgfSBmcm9tICcuL2FwaXVybHMvbG9ncy5hcGknO1xuaW1wb3J0IHsgTG9nc1JlcXVlc3QsIExvZ3NSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0xvZ3MnO1xuaW1wb3J0IHsgR2VuZXJhbFNlcnZpY2UgfSBmcm9tICcuL2dlbmVyYWwuc2VydmljZSc7XG5pbXBvcnQgeyBTZXJ2aWNlQ29uZmlnLCBJU2VydmljZUNvbmZpZ0FyZ3MgfSBmcm9tICcuL3NlcnZpY2UuY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ3NTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHVzZXI6IFVzZXJEZXRhaWxzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHB1YmxpYyBfaHR0cDogSHR0cFdyYXBwZXJTZXJ2aWNlLCBwdWJsaWMgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nZW5lcmFsU2VydmljZTogR2VuZXJhbFNlcnZpY2UsIEBPcHRpb25hbCgpIEBJbmplY3QoU2VydmljZUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IElTZXJ2aWNlQ29uZmlnQXJncykge1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0cmFuc2FjdGlvbnNcbiAgICovXG4gIHB1YmxpYyBHZXRBdWRpdExvZ3MobW9kZWw6IExvZ3NSZXF1ZXN0LCBwYWdlOiBudW1iZXIgPSAxKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8TG9nc1Jlc3BvbnNlLCBMb2dzUmVxdWVzdD4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaVVybCArIExPR1NfQVBJLkFVRElUX0xPR1MucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKS5yZXBsYWNlKCc6cGFnZScsIHBhZ2UudG9TdHJpbmcoKSksIG1vZGVsKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8TG9nc1Jlc3BvbnNlLCBMb2dzUmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgICBkYXRhLnJlcXVlc3QgPSBtb2RlbDtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtwYWdlfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxMb2dzUmVzcG9uc2UsIExvZ3NSZXF1ZXN0PihlLCBtb2RlbCwge3BhZ2V9KSk7XG4gIH1cbn1cbiJdfQ==