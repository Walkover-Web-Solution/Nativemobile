"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BaseResponse_1 = require("../../models/api-models/BaseResponse");
var Observable_1 = require("rxjs/Observable");
// import { LoginActions } from '../actions/login.action';
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.HandleCatch = function (r, request, queryString) {
        var data = new BaseResponse_1.BaseResponse();
        // logout if invalid session detacted
        if (r.status === 0) {
            data = {
                body: null,
                code: 'Internal Error',
                message: 'something went wrong',
                status: 'error'
            };
            data.request = request;
            data.queryString = queryString;
        }
        else {
            if (r.text() === '') {
                //
                data.status = 'error';
                data.message = 'Something went wrong';
                data.body = null;
                data.code = 'Internal Error';
            }
            else {
                data = r.json();
                if (data.code === 'SESSION_EXPIRED_OR_INVALID') {
                    // this.store.dispatch({type: 'LoginOut'});
                }
                else if (data.code === '') {
                    // handle unshared company response
                    // this.store.dispatch({type: 'CompanyRefresh'});
                }
            }
            data.request = request;
            data.queryString = queryString;
        }
        return new Observable_1.Observable(function (o) {
            o.next(data);
        });
    };
    return ErrorHandler;
}());
ErrorHandler = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
function HandleCatch(r, request, queryString) {
    var data = new BaseResponse_1.BaseResponse();
    // logout if invalid session detacted
    if (r.status === 0) {
        data = {
            body: null,
            code: 'Internal Error',
            message: 'something went wrong',
            status: 'error'
        };
        data.request = request;
        data.queryString = queryString;
    }
    else {
        if (r.text() === '') {
            //
            data.status = 'error';
            data.message = 'Something went wrong';
            data.body = null;
            data.code = 'Internal Error';
        }
        else {
            data = r.json();
            if (data.code === 'SESSION_EXPIRED_OR_INVALID') {
                // this.store.dispatch('LoginOut');
                // this.store.dispatch({type: 'LoginOut'});
            }
        }
        data.request = request;
        data.queryString = queryString;
    }
    return new Observable_1.Observable(function (o) {
        o.next(data);
    });
}
exports.HandleCatch = HandleCatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2htYW5nZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXRjaG1hbmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxxRUFBb0U7QUFDcEUsOENBQTZDO0FBQzdDLDBEQUEwRDtBQUcxRCxJQUFhLFlBQVk7SUFFdkI7SUFDQSxDQUFDO0lBRU0sa0NBQVcsR0FBbEIsVUFBd0MsQ0FBTSxFQUFFLE9BQWEsRUFBRSxXQUFpQjtRQUM5RSxJQUFJLElBQUksR0FBc0MsSUFBSSwyQkFBWSxFQUF1QixDQUFDO1FBQ3RGLHFDQUFxQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxHQUFHO2dCQUNMLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLE1BQU0sRUFBRSxPQUFPO2FBQ2hCLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRTtnQkFDRixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssNEJBQTRCLENBQUMsQ0FBQyxDQUFDO29CQUMvQywyQ0FBMkM7Z0JBQzdDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDNUIsbUNBQW1DO29CQUNuQyxpREFBaUQ7Z0JBQ25ELENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDakMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQW9DLFVBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgsbUJBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTs7R0FDQSxZQUFZLENBeUN4QjtBQXpDWSxvQ0FBWTtBQTJDekIscUJBQWlELENBQU0sRUFBRSxPQUFhLEVBQUUsV0FBaUI7SUFDdkYsSUFBSSxJQUFJLEdBQXNDLElBQUksMkJBQVksRUFBdUIsQ0FBQztJQUN0RixxQ0FBcUM7SUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksR0FBRztZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFO1lBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLG1DQUFtQztnQkFDbkMsMkNBQTJDO1lBQzdDLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQW9DLFVBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBaENELGtDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gJy4uLy4uL21vZGVscy9hcGktbW9kZWxzL0Jhc2VSZXNwb25zZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbi8vIGltcG9ydCB7IExvZ2luQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvbG9naW4uYWN0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9ySGFuZGxlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwdWJsaWMgSGFuZGxlQ2F0Y2g8VFJlc3BvbmNlLCBUUmVxdWVzdD4ocjogYW55LCByZXF1ZXN0PzogYW55LCBxdWVyeVN0cmluZz86IGFueSk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPFRSZXNwb25jZSwgVFJlcXVlc3Q+PiB7XG4gICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxUUmVzcG9uY2UsIFRSZXF1ZXN0PiA9IG5ldyBCYXNlUmVzcG9uc2U8VFJlc3BvbmNlLCBUUmVxdWVzdD4oKTtcbiAgICAvLyBsb2dvdXQgaWYgaW52YWxpZCBzZXNzaW9uIGRldGFjdGVkXG4gICAgaWYgKHIuc3RhdHVzID09PSAwKSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICBib2R5OiBudWxsLFxuICAgICAgICBjb2RlOiAnSW50ZXJuYWwgRXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgICBzdGF0dXM6ICdlcnJvcidcbiAgICAgIH07XG4gICAgICBkYXRhLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoci50ZXh0KCkgPT09ICcnKSB7XG4gICAgICAgIC8vXG4gICAgICAgIGRhdGEuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgZGF0YS5tZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nJztcbiAgICAgICAgZGF0YS5ib2R5ID0gbnVsbDtcbiAgICAgICAgZGF0YS5jb2RlID0gJ0ludGVybmFsIEVycm9yJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSByLmpzb24oKTtcbiAgICAgICAgaWYgKGRhdGEuY29kZSA9PT0gJ1NFU1NJT05fRVhQSVJFRF9PUl9JTlZBTElEJykge1xuICAgICAgICAgIC8vIHRoaXMuc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdMb2dpbk91dCd9KTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNvZGUgPT09ICcnKSB7XG4gICAgICAgICAgLy8gaGFuZGxlIHVuc2hhcmVkIGNvbXBhbnkgcmVzcG9uc2VcbiAgICAgICAgICAvLyB0aGlzLnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnQ29tcGFueVJlZnJlc2gnfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRhdGEucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmc7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8VFJlc3BvbmNlLCBUUmVxdWVzdD4+KChvKSA9PiB7XG4gICAgICBvLm5leHQoZGF0YSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlQ2F0Y2g8VFJlc3BvbmNlLCBUUmVxdWVzdD4ocjogYW55LCByZXF1ZXN0PzogYW55LCBxdWVyeVN0cmluZz86IGFueSk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPFRSZXNwb25jZSwgVFJlcXVlc3Q+PiB7XG4gIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8VFJlc3BvbmNlLCBUUmVxdWVzdD4gPSBuZXcgQmFzZVJlc3BvbnNlPFRSZXNwb25jZSwgVFJlcXVlc3Q+KCk7XG4gIC8vIGxvZ291dCBpZiBpbnZhbGlkIHNlc3Npb24gZGV0YWN0ZWRcbiAgaWYgKHIuc3RhdHVzID09PSAwKSB7XG4gICAgZGF0YSA9IHtcbiAgICAgIGJvZHk6IG51bGwsXG4gICAgICBjb2RlOiAnSW50ZXJuYWwgRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIHN0YXR1czogJ2Vycm9yJ1xuICAgIH07XG4gICAgZGF0YS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICBkYXRhLnF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmc7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHIudGV4dCgpID09PSAnJykge1xuICAgICAgLy9cbiAgICAgIGRhdGEuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgIGRhdGEubWVzc2FnZSA9ICdTb21ldGhpbmcgd2VudCB3cm9uZyc7XG4gICAgICBkYXRhLmJvZHkgPSBudWxsO1xuICAgICAgZGF0YS5jb2RlID0gJ0ludGVybmFsIEVycm9yJztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHIuanNvbigpO1xuICAgICAgaWYgKGRhdGEuY29kZSA9PT0gJ1NFU1NJT05fRVhQSVJFRF9PUl9JTlZBTElEJykge1xuICAgICAgICAvLyB0aGlzLnN0b3JlLmRpc3BhdGNoKCdMb2dpbk91dCcpO1xuICAgICAgICAvLyB0aGlzLnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnTG9naW5PdXQnfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgZGF0YS5xdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nO1xuICB9XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8VFJlc3BvbmNlLCBUUmVxdWVzdD4+KChvKSA9PiB7XG4gICAgby5uZXh0KGRhdGEpO1xuICB9KTtcbn1cbiJdfQ==