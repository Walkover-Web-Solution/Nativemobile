"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GeneralService = (function () {
    function GeneralService() {
    }
    Object.defineProperty(GeneralService.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (userData) {
            this._user = userData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeneralService.prototype, "companyUniqueName", {
        get: function () {
            return this._companyUniqueName;
        },
        set: function (companyUniqueName) {
            this._companyUniqueName = companyUniqueName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeneralService.prototype, "sessionId", {
        get: function () {
            return this._sessionId;
        },
        set: function (sessionId) {
            this._sessionId = sessionId;
        },
        enumerable: true,
        configurable: true
    });
    GeneralService.prototype.resetGeneralServiceState = function () {
        this.user = null;
        this.sessionId = null;
        this.companyUniqueName = null;
    };
    return GeneralService;
}());
GeneralService = __decorate([
    core_1.Injectable()
], GeneralService);
exports.GeneralService = GeneralService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBSTNDLElBQWEsY0FBYztJQUEzQjtJQWtDQSxDQUFDO0lBN0JDLHNCQUFJLGdDQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBUyxRQUFxQjtZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUN4QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLDZDQUFpQjthQUFyQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQXNCLGlCQUF5QjtZQUM3QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7UUFDOUMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSxxQ0FBUzthQUFiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWMsU0FBaUI7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BSkE7SUFNTSxpREFBd0IsR0FBL0I7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksY0FBYztJQUQxQixpQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWtDMUI7QUFsQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyRGV0YWlscyB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL2xvZ2luTW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdlbmVyYWxTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdXNlcjogVXNlckRldGFpbHM7XG4gIHByaXZhdGUgX2NvbXBhbnlVbmlxdWVOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3Nlc3Npb25JZDogc3RyaW5nO1xuXG4gIGdldCB1c2VyKCk6IFVzZXJEZXRhaWxzIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlcjtcbiAgfVxuXG4gIHNldCB1c2VyKHVzZXJEYXRhOiBVc2VyRGV0YWlscykge1xuICAgIHRoaXMuX3VzZXIgPSB1c2VyRGF0YTtcbiAgfVxuXG4gIGdldCBjb21wYW55VW5pcXVlTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jb21wYW55VW5pcXVlTmFtZTtcbiAgfVxuXG4gIHNldCBjb21wYW55VW5pcXVlTmFtZShjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29tcGFueVVuaXF1ZU5hbWUgPSBjb21wYW55VW5pcXVlTmFtZTtcbiAgfVxuXG4gIGdldCBzZXNzaW9uSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbklkO1xuICB9XG5cbiAgc2V0IHNlc3Npb25JZChzZXNzaW9uSWQ6IHN0cmluZykge1xuICAgIHRoaXMuX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgfVxuXG4gIHB1YmxpYyByZXNldEdlbmVyYWxTZXJ2aWNlU3RhdGUoKSB7XG4gICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICB0aGlzLnNlc3Npb25JZCA9IG51bGw7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IG51bGw7XG4gIH1cbn1cbiJdfQ==