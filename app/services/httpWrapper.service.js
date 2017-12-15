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
            return _this._http.get(url, options);
        };
        this.post = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this._http.post(url, body, options);
        };
        this.put = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this._http.put(url, body, options);
        };
        this.delete = function (url, params, options) {
            options = _this.prepareOptions(options);
            options.search = _this.objectToParams(params);
            return _this._http.delete(url, options);
        };
        this.patch = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this._http.patch(url, body, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFdyYXBwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHBXcmFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQTRFO0FBRTVFLHFEQUFtRDtBQUduRCxJQUFhLGtCQUFrQjtJQUU3Qiw0QkFBb0IsS0FBVyxFQUFVLGVBQStCO1FBQXhFLGlCQUNDO1FBRG1CLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFHakUsUUFBRyxHQUFHLFVBQUMsR0FBVyxFQUFFLE1BQVksRUFBRSxPQUE0QjtZQUNuRSxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQTtRQUVNLFNBQUksR0FBRyxVQUFDLEdBQVcsRUFBRSxJQUFTLEVBQUUsT0FBNEI7WUFDakUsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBO1FBRU0sUUFBRyxHQUFHLFVBQUMsR0FBVyxFQUFFLElBQVMsRUFBRSxPQUE0QjtZQUNoRSxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUE7UUFFTSxXQUFNLEdBQUcsVUFBQyxHQUFXLEVBQUUsTUFBWSxFQUFFLE9BQTRCO1lBQ3RFLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQTtRQUVNLFVBQUssR0FBRyxVQUFDLEdBQVcsRUFBRSxJQUFTLEVBQUUsT0FBNEI7WUFDbEUsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFBO0lBM0JELENBQUM7SUE2Qk0sMkNBQWMsR0FBckIsVUFBc0IsT0FBMkI7UUFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDL0MsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELGtDQUFrQztRQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFckQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRU0sd0NBQVcsR0FBbEIsVUFBbUIsS0FBSztRQUN0QixNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLFVBQVUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRU0sMkNBQWMsR0FBckIsVUFBc0IsTUFBVztRQUFqQyxpQkFLQztRQUxxQix1QkFBQSxFQUFBLFdBQVc7UUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztZQUNuQyxJQUFJLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLE1BQU0sQ0FBSSxLQUFLLFNBQUksV0FBYSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFSCx5QkFBQztBQUFELENBQUMsQUE5REQsSUE4REM7QUE5RFksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7cUNBR2dCLFdBQUksRUFBMkIsZ0NBQWM7R0FGN0Qsa0JBQWtCLENBOEQ5QjtBQTlEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cFdyYXBwZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwLCBwcml2YXRlIF9nZW5lcmFsU2VydmljZTogR2VuZXJhbFNlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgPSAodXJsOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+ID0+IHtcbiAgICBvcHRpb25zID0gdGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zKTtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHBhcmFtcztcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0ID0gKHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiA9PiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh1cmwsIGJvZHksIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHB1dCA9ICh1cmw6IHN0cmluZywgYm9keTogYW55LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4gPT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCh1cmwsIGJvZHksIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZSA9ICh1cmw6IHN0cmluZywgcGFyYW1zPzogYW55LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4gPT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMpO1xuICAgIG9wdGlvbnMuc2VhcmNoID0gdGhpcy5vYmplY3RUb1BhcmFtcyhwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHBhdGNoID0gKHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiA9PiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucGF0Y2godXJsLCBib2R5LCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmVwYXJlT3B0aW9ucyhvcHRpb25zOiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBSZXF1ZXN0T3B0aW9uc0FyZ3Mge1xuICAgIGxldCBzZXNzaW9uSWQgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5zZXNzaW9uSWQ7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgb3B0aW9ucy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbklkKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdTZXNzaW9uLUlkJywgc2Vzc2lvbklkKTtcbiAgICB9XG4gICAgLy8gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ2NhY2hlLWNvbnRyb2wnLCAnbm8tY2FjaGUnKTtcbiAgICBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsIHx8ICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jyk7XG4gIH1cblxuICBwdWJsaWMgb2JqZWN0VG9QYXJhbXMob2JqZWN0ID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICBsZXQgb2JqZWN0VmFsdWUgPSB0aGlzLmlzUHJpbWl0aXZlKG9iamVjdFt2YWx1ZV0pID8gb2JqZWN0W3ZhbHVlXSA6IEpTT04uc3RyaW5naWZ5KG9iamVjdFt2YWx1ZV0pO1xuICAgICAgcmV0dXJuIGAke3ZhbHVlfT0ke29iamVjdFZhbHVlfWA7XG4gICAgfSkuam9pbignJicpO1xuICB9XG5cbn1cbiJdfQ==