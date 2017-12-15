"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpWrapper_service_1 = require("./httpWrapper.service");
var core_1 = require("@angular/core");
var catchmanger_1 = require("./catchManager/catchmanger");
var settings_profile_api_1 = require("./apiurls/settings.profile.api");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var SettingsProfileService = (function () {
    function SettingsProfileService(errorHandler, _http, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._generalService = _generalService;
        this.config = config;
    }
    /*
    * Get company profile
    */
    SettingsProfileService.prototype.GetProfileInfo = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + settings_profile_api_1.SETTINGS_PROFILE_API.GET.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map(function (res) {
            var data = res.json();
            data.queryString = {};
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Update company profile
     */
    SettingsProfileService.prototype.UpdateProfile = function (model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + settings_profile_api_1.SETTINGS_PROFILE_API.GET.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    return SettingsProfileService;
}());
SettingsProfileService = __decorate([
    core_1.Injectable(),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService,
        general_service_1.GeneralService, Object])
], SettingsProfileService);
exports.SettingsProfileService = SettingsProfileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MucHJvZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MucHJvZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkRBQTJEO0FBQzNELHNDQUE2RDtBQUc3RCwwREFBMEQ7QUFFMUQsdUVBQXNFO0FBQ3RFLHFEQUFtRDtBQUNuRCxtREFBcUU7QUFHckUsSUFBYSxzQkFBc0I7SUFLakMsZ0NBQW9CLFlBQTBCLEVBQVUsS0FBeUIsRUFDN0QsZUFBK0IsRUFBNkMsTUFBMEI7UUFEdEcsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUM3RCxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBNkMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7SUFDMUgsQ0FBQztJQUVEOztNQUVFO0lBQ0ssK0NBQWMsR0FBckI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDJDQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDckosSUFBSSxJQUFJLEdBQXNDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQXNCLENBQUMsQ0FBQyxFQUFyRCxDQUFxRCxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOENBQWEsR0FBcEIsVUFBcUIsS0FBSztRQUExQixpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDJDQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1lBQzVKLElBQUksSUFBSSxHQUEyQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksc0JBQXNCO0lBRGxDLGlCQUFVLEVBQUU7SUFPMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBaUIsd0NBQWtCO1FBQzVDLGdDQUFjO0dBTnhDLHNCQUFzQixDQWtDbEM7QUFsQ1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlckRldGFpbHMgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9sb2dpbk1vZGVscyc7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9CYXNlUmVzcG9uc2UnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgU21zS2V5Q2xhc3MgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9TZXR0aW5nc0ludGVncmFpb24nO1xuaW1wb3J0IHsgU0VUVElOR1NfUFJPRklMRV9BUEkgfSBmcm9tICcuL2FwaXVybHMvc2V0dGluZ3MucHJvZmlsZS5hcGknO1xuaW1wb3J0IHsgR2VuZXJhbFNlcnZpY2UgfSBmcm9tICcuL2dlbmVyYWwuc2VydmljZSc7XG5pbXBvcnQgeyBTZXJ2aWNlQ29uZmlnLCBJU2VydmljZUNvbmZpZ0FyZ3MgfSBmcm9tICcuL3NlcnZpY2UuY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzUHJvZmlsZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgdXNlcjogVXNlckRldGFpbHM7XG4gIHByaXZhdGUgY29tcGFueVVuaXF1ZU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLCBwcml2YXRlIF9odHRwOiBIdHRwV3JhcHBlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2dlbmVyYWxTZXJ2aWNlOiBHZW5lcmFsU2VydmljZSwgQE9wdGlvbmFsKCkgQEluamVjdChTZXJ2aWNlQ29uZmlnKSBwcml2YXRlIGNvbmZpZzogSVNlcnZpY2VDb25maWdBcmdzKSB7XG4gIH1cblxuICAvKlxuICAqIEdldCBjb21wYW55IHByb2ZpbGVcbiAgKi9cbiAgcHVibGljIEdldFByb2ZpbGVJbmZvKCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPFNtc0tleUNsYXNzLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIFNFVFRJTkdTX1BST0ZJTEVfQVBJLkdFVC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxTbXNLZXlDbGFzcywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge307XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8U21zS2V5Q2xhc3MsIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBjb21wYW55IHByb2ZpbGVcbiAgICovXG4gIHB1YmxpYyBVcGRhdGVQcm9maWxlKG1vZGVsKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8YW55LCBhbnk+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuY29uZmlnLmFwaVVybCArIFNFVFRJTkdTX1BST0ZJTEVfQVBJLkdFVC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLCBtb2RlbCkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8YW55LCBhbnk+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IG1vZGVsO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPGFueSwgYW55PihlLCBtb2RlbCkpO1xuICB9XG59XG4iXX0=