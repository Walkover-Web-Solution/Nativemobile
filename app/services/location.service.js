"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var _ = require("lodash");
var LocationService = (function () {
    function LocationService(_http) {
        this._http = _http;
        this.GoogleApiURL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCaphDTQJXyr1lhnaXP_nm7a5dqgr5KVJU';
    }
    LocationService.prototype.GetCity = function (location) {
        var query = "";
        if (location.Country !== undefined) {
            query += "address=" + location.QueryString + "&components=country:" + location.Country + "|administrative_area:" + location.QueryString;
        }
        else if (location.AdministratorLevel !== undefined) {
            query += "address=" + location.QueryString + "&components=administrative_area:" + location.QueryString;
        }
        else if (location.OnlyCity) {
            if (location.QueryString && location.QueryString !== '') {
                query += "address=" + location.QueryString;
            }
            else {
                query += "address=''";
            }
        }
        else {
            query += "components=country:" + location.QueryString;
        }
        return this._http.get(this.GoogleApiURL + '&' + query)
            .map(function (res) {
            var r = res.json();
            var data = r.results.filter(function (i) { return _.includes(i.types, 'locality'); });
            return data;
        });
    };
    return LocationService;
}());
LocationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0Msc0NBQXFDO0FBRXJDLDBCQUE0QjtBQUc1QixJQUFhLGVBQWU7SUFHMUIseUJBQW9CLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBRnZCLGlCQUFZLEdBQVcsK0ZBQStGLENBQUM7SUFHL0gsQ0FBQztJQUVNLGlDQUFPLEdBQWQsVUFBZSxRQUEyQjtRQUN4QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsS0FBSyxJQUFJLGFBQVcsUUFBUSxDQUFDLFdBQVcsNEJBQXVCLFFBQVEsQ0FBQyxPQUFPLDZCQUF3QixRQUFRLENBQUMsV0FBYSxDQUFDO1FBQ2hJLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckQsS0FBSyxJQUFJLGFBQVcsUUFBUSxDQUFDLFdBQVcsd0NBQW1DLFFBQVEsQ0FBQyxXQUFhLENBQUM7UUFDcEcsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsS0FBSyxJQUFJLGFBQVcsUUFBUSxDQUFDLFdBQWEsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxJQUFJLFlBQVksQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxJQUFJLHdCQUFzQixRQUFRLENBQUMsV0FBYSxDQUFDO1FBQ3hELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ25ELEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDUCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDO0FBNUJZLGVBQWU7SUFEM0IsaUJBQVUsRUFBRTtxQ0FJZ0IsV0FBSTtHQUhwQixlQUFlLENBNEIzQjtBQTVCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgR2VvTG9jYXRpb25TZWFyY2ggfSBmcm9tICcuLi9tb2RlbHMvb3RoZXItbW9kZWxzL0dlb0xvY2F0aW9uU2VhcmNoJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2F0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgR29vZ2xlQXBpVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9rZXk9QUl6YVN5Q2FwaERUUUpYeXIxbGhuYVhQX25tN2E1ZHFncjVLVkpVJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKSB7XG4gIH1cblxuICBwdWJsaWMgR2V0Q2l0eShsb2NhdGlvbjogR2VvTG9jYXRpb25TZWFyY2gpIHtcbiAgICBsZXQgcXVlcnkgPSBgYDtcbiAgICBpZiAobG9jYXRpb24uQ291bnRyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBxdWVyeSArPSBgYWRkcmVzcz0ke2xvY2F0aW9uLlF1ZXJ5U3RyaW5nfSZjb21wb25lbnRzPWNvdW50cnk6JHtsb2NhdGlvbi5Db3VudHJ5fXxhZG1pbmlzdHJhdGl2ZV9hcmVhOiR7bG9jYXRpb24uUXVlcnlTdHJpbmd9YDtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLkFkbWluaXN0cmF0b3JMZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBxdWVyeSArPSBgYWRkcmVzcz0ke2xvY2F0aW9uLlF1ZXJ5U3RyaW5nfSZjb21wb25lbnRzPWFkbWluaXN0cmF0aXZlX2FyZWE6JHtsb2NhdGlvbi5RdWVyeVN0cmluZ31gO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uT25seUNpdHkpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5RdWVyeVN0cmluZyAmJiBsb2NhdGlvbi5RdWVyeVN0cmluZyAhPT0gJycpIHtcbiAgICAgICAgcXVlcnkgKz0gYGFkZHJlc3M9JHtsb2NhdGlvbi5RdWVyeVN0cmluZ31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnkgKz0gYGFkZHJlc3M9JydgO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeSArPSBgY29tcG9uZW50cz1jb3VudHJ5OiR7bG9jYXRpb24uUXVlcnlTdHJpbmd9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuR29vZ2xlQXBpVVJMICsgJyYnICsgcXVlcnkpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IHIgPSByZXMuanNvbigpO1xuICAgICAgICBsZXQgZGF0YSA9IHIucmVzdWx0cy5maWx0ZXIoKGkpID0+IF8uaW5jbHVkZXMoaS50eXBlcywgJ2xvY2FsaXR5JykpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=