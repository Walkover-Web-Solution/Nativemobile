"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var httpWrapper_service_1 = require("./httpWrapper.service");
var router_1 = require("@angular/router");
var search_api_1 = require("./apiurls/search.api");
var catchmanger_1 = require("./catchManager/catchmanger");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var SearchService = (function () {
    function SearchService(errorHandler, _http, _router, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._router = _router;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     * get GetStocksReport
     */
    SearchService.prototype.Search = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + search_api_1.SEARCH_API.SEARCH
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))
            .replace(':groupName', encodeURIComponent(request.groupName)), { from: request.fromDate, to: request.toDate, refresh: request.refresh })
            .map(function (res) {
            return res.json();
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    return SearchService;
}());
SearchService = __decorate([
    core_1.Injectable(),
    __param(4, core_1.Optional()), __param(4, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService, router_1.Router,
        general_service_1.GeneralService, Object])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxpQ0FBK0I7QUFDL0IsNkRBQTJEO0FBQzNELDBDQUF5QztBQUl6QyxtREFBa0Q7QUFFbEQsMERBQTBEO0FBQzFELHFEQUFtRDtBQUNuRCxtREFBcUU7QUFHckUsSUFBYSxhQUFhO0lBSXhCLHVCQUFvQixZQUEwQixFQUFTLEtBQXlCLEVBQVMsT0FBZSxFQUNwRixlQUErQixFQUE2QyxNQUEwQjtRQUR0RyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFTLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNwRixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBNkMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7SUFDMUgsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOEJBQU0sR0FBYixVQUFjLE9BQXNCO1FBQXBDLGlCQVdDO1FBVkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsdUJBQVUsQ0FBQyxNQUFNO2FBQ3ZELE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN6RSxPQUFPLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUMvRCxFQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUM7YUFDdEUsR0FBRyxDQUFDLFVBQUMsR0FBRztZQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQWtDLENBQUMsQ0FBQyxFQUFqRSxDQUFpRSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSxhQUFhO0lBRHpCLGlCQUFVLEVBQUU7SUFNMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBZ0Isd0NBQWtCLEVBQWtCLGVBQU07UUFDbkUsZ0NBQWM7R0FMeEMsYUFBYSxDQXdCekI7QUF4Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvbG9naW5Nb2RlbHMnO1xuaW1wb3J0IHsgU0VBUkNIX0FQSSB9IGZyb20gJy4vYXBpdXJscy9zZWFyY2guYXBpJztcbmltcG9ydCB7IFNlYXJjaFJlcXVlc3QsIFNlYXJjaFJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvU2VhcmNoJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vY2F0Y2hNYW5hZ2VyL2NhdGNobWFuZ2VyJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZywgSVNlcnZpY2VDb25maWdBcmdzIH0gZnJvbSAnLi9zZXJ2aWNlLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHVzZXI6IFVzZXJEZXRhaWxzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHB1YmxpYyBfaHR0cDogSHR0cFdyYXBwZXJTZXJ2aWNlLCBwdWJsaWMgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nZW5lcmFsU2VydmljZTogR2VuZXJhbFNlcnZpY2UsIEBPcHRpb25hbCgpIEBJbmplY3QoU2VydmljZUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IElTZXJ2aWNlQ29uZmlnQXJncykge1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBHZXRTdG9ja3NSZXBvcnRcbiAgICovXG4gIHB1YmxpYyBTZWFyY2gocmVxdWVzdDogU2VhcmNoUmVxdWVzdCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPFNlYXJjaFJlc3BvbnNlW10sIFNlYXJjaFJlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIFNFQVJDSF9BUEkuU0VBUkNIXG4gICAgICAgIC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpXG4gICAgICAgIC5yZXBsYWNlKCc6Z3JvdXBOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHJlcXVlc3QuZ3JvdXBOYW1lKSksXG4gICAgICB7ZnJvbTogcmVxdWVzdC5mcm9tRGF0ZSwgdG86IHJlcXVlc3QudG9EYXRlLCByZWZyZXNoOiByZXF1ZXN0LnJlZnJlc2h9KVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8U2VhcmNoUmVzcG9uc2VbXSwgU2VhcmNoUmVxdWVzdD4oZSkpO1xuICB9XG5cbn1cbiJdfQ==