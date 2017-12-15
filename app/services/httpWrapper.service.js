"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var general_service_1 = require("./general.service");
var HttpWrapperService = (function () {
    function HttpWrapperService(_http, _generalService) {
        var _this = this;
        this._http = _http;
        this._generalService = _generalService;
        this.get = function (url, params, options) {
            options = _this.prepareOptions(options);
            options.params = params;
            return _this._http.get(url, options).do(function (res) {
                //
            });
        };
        this.post = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this._http.post(url, body, options).do(function (res) {
                //
            });
        };
        this.put = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this._http.put(url, body, options).do(function (res) {
                //
            });
        };
        this.delete = function (url, params, options) {
            options = _this.prepareOptions(options);
            options.search = _this.objectToParams(params);
            return _this._http.delete(url, options).do(function (res) {
                //
            });
        };
        this.patch = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this._http.patch(url, body, options).do(function (res) {
                //
            });
        };
    }
    HttpWrapperService.prototype.prepareOptions = function (options) {
        var sessionId = this._generalService.sessionId;
        options = options || {};
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        if (sessionId) {
            options.headers.append('Session-Id', sessionId);
        }
        // options.withCredentials = true;
        options.headers.append('cache-control', 'no-cache');
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
        return options;
    };
    HttpWrapperService.prototype.isPrimitive = function (value) {
        return value == null || (typeof value !== 'function' && typeof value !== 'object');
    };
    HttpWrapperService.prototype.objectToParams = function (object) {
        var _this = this;
        if (object === void 0) { object = {}; }
        return Object.keys(object).map(function (value) {
            var objectValue = _this.isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
            return value + "=" + objectValue;
        }).join('&');
    };
    return HttpWrapperService;
}());
HttpWrapperService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, general_service_1.GeneralService])
], HttpWrapperService);
exports.HttpWrapperService = HttpWrapperService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFdyYXBwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHBXcmFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQTRFO0FBRTVFLHFEQUFtRDtBQUduRCxJQUFhLGtCQUFrQjtJQUU3Qiw0QkFBb0IsS0FBVyxFQUFVLGVBQStCO1FBQXhFLGlCQUNDO1FBRG1CLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFHakUsUUFBRyxHQUFHLFVBQUMsR0FBVyxFQUFFLE1BQVksRUFBRSxPQUE0QjtZQUNuRSxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFDLEdBQUc7Z0JBQ3pDLEVBQUU7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVNLFNBQUksR0FBRyxVQUFDLEdBQVcsRUFBRSxJQUFTLEVBQUUsT0FBNEI7WUFDakUsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUMsR0FBRztnQkFDaEQsRUFBRTtZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU0sUUFBRyxHQUFHLFVBQUMsR0FBVyxFQUFFLElBQVMsRUFBRSxPQUE0QjtZQUNoRSxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLENB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RUM7QUF4RVksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7cUNBR2dCLFdBQUksRUFBMkIsZ0NBQWM7R0FGN0Qsa0JBQWtCLENBd0U5QjtBQXhFWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cFdyYXBwZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwLCBwcml2YXRlIF9nZW5lcmFsU2VydmljZTogR2VuZXJhbFNlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgPSAodXJsOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+ID0+IHtcbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zKTtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHBhcmFtcztcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodXJsLCBvcHRpb25zKS5kbygocmVzKSA9PiB7XG4gICAgICAvL1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBvc3QgPSAodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+ID0+IHtcbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHVybCwgYm9keSwgb3B0aW9ucykuZG8oKHJlcykgPT4ge1xuICAgICAgLy9cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwdXQgPSAodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+ID0+IHtcbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodXJsLCBib2R5LCBvcHRpb25zKS5kbygocmVzKSA9PiB7XG4gICAgICAvL1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZSA9ICh1cmw6IHN0cmluZywgcGFyYW1zPzogYW55LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4gPT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMpO1xuICAgIG9wdGlvbnMuc2VhcmNoID0gdGhpcy5vYmplY3RUb1BhcmFtcyhwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh1cmwsIG9wdGlvbnMpLmRvKChyZXMpID0+IHtcbiAgICAgIC8vXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGF0Y2ggPSAodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+ID0+IHtcbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wYXRjaCh1cmwsIGJvZHksIG9wdGlvbnMpLmRvKChyZXMpID0+IHtcbiAgICAgIC8vXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcHJlcGFyZU9wdGlvbnMob3B0aW9uczogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgICBsZXQgc2Vzc2lvbklkID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2Uuc2Vzc2lvbklkO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCgnU2Vzc2lvbi1JZCcsIHNlc3Npb25JZCk7XG4gICAgfVxuICAgIC8vIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdjYWNoZS1jb250cm9sJywgJ25vLWNhY2hlJyk7XG4gICAgb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgaXNQcmltaXRpdmUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpO1xuICB9XG5cbiAgcHVibGljIG9iamVjdFRvUGFyYW1zKG9iamVjdCA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCkubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgbGV0IG9iamVjdFZhbHVlID0gdGhpcy5pc1ByaW1pdGl2ZShvYmplY3RbdmFsdWVdKSA/IG9iamVjdFt2YWx1ZV0gOiBKU09OLnN0cmluZ2lmeShvYmplY3RbdmFsdWVdKTtcbiAgICAgIHJldHVybiBgJHt2YWx1ZX09JHtvYmplY3RWYWx1ZX1gO1xuICAgIH0pLmpvaW4oJyYnKTtcbiAgfVxuXG59XG4iXX0=