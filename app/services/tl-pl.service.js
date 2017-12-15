"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var httpWrapper_service_1 = require("./httpWrapper.service");
var router_1 = require("@angular/router");
var catchmanger_1 = require("./catchManager/catchmanger");
var tl_pl_api_1 = require("./apiurls/tl-pl.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var TlPlService = (function () {
    function TlPlService(errorHandler, _http, _router, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._router = _router;
        this._generalService = _generalService;
        this.config = config;
        this.b64toBlob = function (b64Data, contentType, sliceSize) {
            var blob;
            var byteArray;
            var byteArrays;
            var byteCharacters;
            var byteNumbers;
            var i;
            var offset;
            var slice;
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            byteCharacters = atob(b64Data);
            byteArrays = [];
            offset = 0;
            while (offset < byteCharacters.length) {
                slice = byteCharacters.slice(offset, offset + sliceSize);
                byteNumbers = new Array(slice.length);
                i = 0;
                while (i < slice.length) {
                    byteNumbers[i] = slice.charCodeAt(i);
                    i++;
                }
                byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
                offset += sliceSize;
            }
            blob = new Blob(byteArrays, {
                type: contentType
            });
            return blob;
        };
    }
    /**
     * Get Trial Balance
     */
    TlPlService.prototype.GetTrailBalance = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + tl_pl_api_1.TB_PL_BS_API.GET_TRIAL_BALANCE
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), { from: request.from, to: request.to, refresh: request.refresh })
            .map(function (res) {
            var data = res.json();
            data.request = request;
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, request); });
    };
    /**
     * get Profit/Loss
     */
    TlPlService.prototype.GetProfitLoss = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var filteredRequest = (Object.keys(request)
            .filter(function (p) { return request[p] != null; })
            .reduce(function (r, i) {
            return (__assign({}, r, (_a = {}, _a[i] = request[i], _a)));
            var _a;
        }, {}));
        return this._http.get(this.config.apiUrl + tl_pl_api_1.TB_PL_BS_API.GET_PROFIT_LOSS
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), filteredRequest)
            .map(function (res) {
            var data = res.json();
            data.request = request;
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, request); });
    };
    /**
     * get BalanceSheet
     */
    TlPlService.prototype.GetBalanceSheet = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var filteredRequest = (Object.keys(request)
            .filter(function (p) { return request[p] != null; })
            .reduce(function (r, i) {
            return (__assign({}, r, (_a = {}, _a[i] = request[i], _a)));
            var _a;
        }, {}));
        return this._http.get(this.config.apiUrl + tl_pl_api_1.TB_PL_BS_API.GET_BALANCE_SHEET
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), filteredRequest)
            .map(function (res) {
            var data = res.json();
            data.request = request;
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    TlPlService.prototype.DownloadTrialBalanceExcel = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + tl_pl_api_1.TB_PL_BS_API.DOWNLOAD_TRIAL_BALANCE_EXCEL
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), request)
            .map(function (res) {
            var data = _this.b64toBlob(res.json().body, 'application/xml', 512);
            return res.json();
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    TlPlService.prototype.DownloadBalanceSheetExcel = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var filteredRequest = (Object.keys(request)
            .filter(function (p) { return request[p] != null; })
            .reduce(function (r, i) {
            return (__assign({}, r, (_a = {}, _a[i] = request[i], _a)));
            var _a;
        }, {}));
        return this._http.get(this.config.apiUrl + tl_pl_api_1.TB_PL_BS_API.DOWNLOAD_BALANCE_SHEET_EXCEL
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), filteredRequest)
            .map(function (res) {
            var data = _this.b64toBlob(res.json().body, 'application/xml', 512);
            return res.json();
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    TlPlService.prototype.DownloadProfitLossExcel = function (request) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var filteredRequest = (Object.keys(request)
            .filter(function (p) { return request[p] != null; })
            .reduce(function (r, i) {
            return (__assign({}, r, (_a = {}, _a[i] = request[i], _a)));
            var _a;
        }, {}));
        return this._http.get(this.config.apiUrl + tl_pl_api_1.TB_PL_BS_API.DOWNLOAD_PROFIT_LOSS_EXCEL
            .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), filteredRequest)
            .map(function (res) {
            var data = _this.b64toBlob(res.json().body, 'application/xml', 512);
            return res.json();
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    return TlPlService;
}());
TlPlService = __decorate([
    core_1.Injectable(),
    __param(4, core_1.Optional()), __param(4, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService, router_1.Router,
        general_service_1.GeneralService, Object])
], TlPlService);
exports.TlPlService = TlPlService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGwtcGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRsLXBsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsaUNBQStCO0FBQy9CLDZEQUEyRDtBQUMzRCwwQ0FBeUM7QUFJekMsMERBQTBEO0FBQzFELGlEQUFtRDtBQUVuRCxxREFBbUQ7QUFDbkQsbURBQXFFO0FBR3JFLElBQWEsV0FBVztJQUl0QixxQkFBb0IsWUFBMEIsRUFBUyxLQUF5QixFQUFTLE9BQWUsRUFDcEYsZUFBK0IsRUFBNkMsTUFBMEI7UUFEdEcsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDcEYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQTZDLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBd0dsSCxjQUFTLEdBQUcsVUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVM7WUFDbEQsSUFBSSxJQUFJLENBQUM7WUFDVCxJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksVUFBVSxDQUFDO1lBQ2YsSUFBSSxjQUFjLENBQUM7WUFDbkIsSUFBSSxXQUFXLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksS0FBSyxDQUFDO1lBQ1YsV0FBVyxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFDaEMsU0FBUyxHQUFHLFNBQVMsSUFBSSxHQUFHLENBQUM7WUFDN0IsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxPQUFPLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdB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Q0FBQyxBQTVJRCxJQTRJQztBQTVJWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7SUFNMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBZ0Isd0NBQWtCLEVBQWtCLGVBQU07UUFDbkUsZ0NBQWM7R0FMeEMsV0FBVyxDQTRJdkI7QUE1SVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvbG9naW5Nb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgVEJfUExfQlNfQVBJIH0gZnJvbSAnLi9hcGl1cmxzL3RsLXBsLmFwaSc7XG5pbXBvcnQgeyBBY2NvdW50RGV0YWlscywgQmFsYW5jZVNoZWV0UmVxdWVzdCwgUHJvZml0TG9zc1JlcXVlc3QsIFRyaWFsQmFsYW5jZUV4cG9ydEV4Y2VsUmVxdWVzdCwgVHJpYWxCYWxhbmNlUmVxdWVzdCB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL3RiLXBsLWJzJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZywgSVNlcnZpY2VDb25maWdBcmdzIH0gZnJvbSAnLi9zZXJ2aWNlLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUbFBsU2VydmljZSB7XG4gIHByaXZhdGUgY29tcGFueVVuaXF1ZU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSB1c2VyOiBVc2VyRGV0YWlscztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLCBwdWJsaWMgX2h0dHA6IEh0dHBXcmFwcGVyU2VydmljZSwgcHVibGljIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZ2VuZXJhbFNlcnZpY2U6IEdlbmVyYWxTZXJ2aWNlLCBAT3B0aW9uYWwoKSBASW5qZWN0KFNlcnZpY2VDb25maWcpIHByaXZhdGUgY29uZmlnOiBJU2VydmljZUNvbmZpZ0FyZ3MpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgVHJpYWwgQmFsYW5jZVxuICAgKi9cbiAgcHVibGljIEdldFRyYWlsQmFsYW5jZShyZXF1ZXN0OiBUcmlhbEJhbGFuY2VSZXF1ZXN0KTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8QWNjb3VudERldGFpbHMsIFRyaWFsQmFsYW5jZVJlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIFRCX1BMX0JTX0FQSS5HRVRfVFJJQUxfQkFMQU5DRVxuICAgICAgLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSksIHtmcm9tOiByZXF1ZXN0LmZyb20sIHRvOiByZXF1ZXN0LnRvLCByZWZyZXNoOiByZXF1ZXN0LnJlZnJlc2h9KVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8QWNjb3VudERldGFpbHMsIFRyaWFsQmFsYW5jZVJlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxBY2NvdW50RGV0YWlscywgVHJpYWxCYWxhbmNlUmVxdWVzdD4oZSwgcmVxdWVzdCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBQcm9maXQvTG9zc1xuICAgKi9cbiAgcHVibGljIEdldFByb2ZpdExvc3MocmVxdWVzdDogUHJvZml0TG9zc1JlcXVlc3QpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxBY2NvdW50RGV0YWlscywgUHJvZml0TG9zc1JlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgbGV0IGZpbHRlcmVkUmVxdWVzdCA9IChPYmplY3Qua2V5cyhyZXF1ZXN0KVxuICAgICAgLmZpbHRlcihwID0+IHJlcXVlc3RbcF0gIT0gbnVsbClcbiAgICAgIC5yZWR1Y2UoKHIsIGkpID0+ICh7Li4uciwgW2ldOiByZXF1ZXN0W2ldfSksIHt9KSk7XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgVEJfUExfQlNfQVBJLkdFVF9QUk9GSVRfTE9TU1xuICAgICAgLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSksIGZpbHRlcmVkUmVxdWVzdClcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPEFjY291bnREZXRhaWxzLCBQcm9maXRMb3NzUmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgICBkYXRhLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPEFjY291bnREZXRhaWxzLCBQcm9maXRMb3NzUmVxdWVzdD4oZSwgcmVxdWVzdCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBCYWxhbmNlU2hlZXRcbiAgICovXG4gIHB1YmxpYyBHZXRCYWxhbmNlU2hlZXQocmVxdWVzdDogQmFsYW5jZVNoZWV0UmVxdWVzdCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPEFjY291bnREZXRhaWxzLCBCYWxhbmNlU2hlZXRSZXF1ZXN0Pj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIGxldCBmaWx0ZXJlZFJlcXVlc3QgPSAoT2JqZWN0LmtleXMocmVxdWVzdClcbiAgICAgIC5maWx0ZXIocCA9PiByZXF1ZXN0W3BdICE9IG51bGwpXG4gICAgICAucmVkdWNlKChyLCBpKSA9PiAoey4uLnIsIFtpXTogcmVxdWVzdFtpXX0pLCB7fSkpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIFRCX1BMX0JTX0FQSS5HRVRfQkFMQU5DRV9TSEVFVFxuICAgICAgLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSksIGZpbHRlcmVkUmVxdWVzdClcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPEFjY291bnREZXRhaWxzLCBCYWxhbmNlU2hlZXRSZXF1ZXN0PiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8YW55LCBhbnk+KGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBEb3dubG9hZFRyaWFsQmFsYW5jZUV4Y2VsKHJlcXVlc3Q6IFRyaWFsQmFsYW5jZUV4cG9ydEV4Y2VsUmVxdWVzdCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPGFueSwgYW55Pj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIFRCX1BMX0JTX0FQSS5ET1dOTE9BRF9UUklBTF9CQUxBTkNFX0VYQ0VMXG4gICAgICAucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKSwgcmVxdWVzdClcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuYjY0dG9CbG9iKHJlcy5qc29uKCkuYm9keSwgJ2FwcGxpY2F0aW9uL3htbCcsIDUxMik7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8YW55LCBhbnk+KGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBEb3dubG9hZEJhbGFuY2VTaGVldEV4Y2VsKHJlcXVlc3Q6IFByb2ZpdExvc3NSZXF1ZXN0KTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBhbnk+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgbGV0IGZpbHRlcmVkUmVxdWVzdCA9IChPYmplY3Qua2V5cyhyZXF1ZXN0KVxuICAgICAgLmZpbHRlcihwID0+IHJlcXVlc3RbcF0gIT0gbnVsbClcbiAgICAgIC5yZWR1Y2UoKHIsIGkpID0+ICh7Li4uciwgW2ldOiByZXF1ZXN0W2ldfSksIHt9KSk7XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgVEJfUExfQlNfQVBJLkRPV05MT0FEX0JBTEFOQ0VfU0hFRVRfRVhDRUxcbiAgICAgIC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLCBmaWx0ZXJlZFJlcXVlc3QpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmI2NHRvQmxvYihyZXMuanNvbigpLmJvZHksICdhcHBsaWNhdGlvbi94bWwnLCA1MTIpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgYW55PihlKSk7XG4gIH1cblxuICBwdWJsaWMgRG93bmxvYWRQcm9maXRMb3NzRXhjZWwocmVxdWVzdDogUHJvZml0TG9zc1JlcXVlc3QpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxhbnksIGFueT4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICBsZXQgZmlsdGVyZWRSZXF1ZXN0ID0gKE9iamVjdC5rZXlzKHJlcXVlc3QpXG4gICAgICAuZmlsdGVyKHAgPT4gcmVxdWVzdFtwXSAhPSBudWxsKVxuICAgICAgLnJlZHVjZSgociwgaSkgPT4gKHsuLi5yLCBbaV06IHJlcXVlc3RbaV19KSwge30pKTtcblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBUQl9QTF9CU19BUEkuRE9XTkxPQURfUFJPRklUX0xPU1NfRVhDRUxcbiAgICAgIC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLCBmaWx0ZXJlZFJlcXVlc3QpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmI2NHRvQmxvYihyZXMuanNvbigpLmJvZHksICdhcHBsaWNhdGlvbi94bWwnLCA1MTIpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgYW55PihlKSk7XG4gIH1cblxuICBwcml2YXRlIGI2NHRvQmxvYiA9IChiNjREYXRhLCBjb250ZW50VHlwZSwgc2xpY2VTaXplKSA9PiB7XG4gICAgbGV0IGJsb2I7XG4gICAgbGV0IGJ5dGVBcnJheTtcbiAgICBsZXQgYnl0ZUFycmF5cztcbiAgICBsZXQgYnl0ZUNoYXJhY3RlcnM7XG4gICAgbGV0IGJ5dGVOdW1iZXJzO1xuICAgIGxldCBpO1xuICAgIGxldCBvZmZzZXQ7XG4gICAgbGV0IHNsaWNlO1xuICAgIGNvbnRlbnRUeXBlID0gY29udGVudFR5cGUgfHwgJyc7XG4gICAgc2xpY2VTaXplID0gc2xpY2VTaXplIHx8IDUxMjtcbiAgICBieXRlQ2hhcmFjdGVycyA9IGF0b2IoYjY0RGF0YSk7XG4gICAgYnl0ZUFycmF5cyA9IFtdO1xuICAgIG9mZnNldCA9IDA7XG4gICAgd2hpbGUgKG9mZnNldCA8IGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCkge1xuICAgICAgc2xpY2UgPSBieXRlQ2hhcmFjdGVycy5zbGljZShvZmZzZXQsIG9mZnNldCArIHNsaWNlU2l6ZSk7XG4gICAgICBieXRlTnVtYmVycyA9IG5ldyBBcnJheShzbGljZS5sZW5ndGgpO1xuICAgICAgaSA9IDA7XG4gICAgICB3aGlsZSAoaSA8IHNsaWNlLmxlbmd0aCkge1xuICAgICAgICBieXRlTnVtYmVyc1tpXSA9IHNsaWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIGJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ5dGVOdW1iZXJzKTtcbiAgICAgIGJ5dGVBcnJheXMucHVzaChieXRlQXJyYXkpO1xuICAgICAgb2Zmc2V0ICs9IHNsaWNlU2l6ZTtcbiAgICB9XG4gICAgYmxvYiA9IG5ldyBCbG9iKGJ5dGVBcnJheXMsIHtcbiAgICAgIHR5cGU6IGNvbnRlbnRUeXBlXG4gICAgfSk7XG4gICAgcmV0dXJuIGJsb2I7XG4gIH1cbn1cbiJdfQ==