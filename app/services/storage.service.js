"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StorageService = (function () {
    function StorageService() {
        var _this = this;
        this.setItem = function (key, value) {
            _this._storage.setItem(key, JSON.stringify(value));
        };
        this.removeItem = function (key) {
            _this._storage.removeItem(key);
        };
        this.getItem = function (key) {
            var item = _this._storage.getItem(key);
            if (item && item !== 'undefined') {
                return JSON.parse(_this._storage.getItem(key));
            }
            return;
        };
        this._storage = localStorage;
    }
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLElBQWEsY0FBYztJQUl6QjtRQUFBLGlCQUVDO1FBRU0sWUFBTyxHQUFHLFVBQUMsR0FBVyxFQUFFLEtBQVU7WUFDdkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUE7UUFFTSxlQUFVLEdBQUcsVUFBQyxHQUFXO1lBQzlCLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQUVNLFlBQU8sR0FBRyxVQUFDLEdBQVc7WUFDM0IsSUFBSSxJQUFJLEdBQVEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFFRCxNQUFNLENBQUM7UUFDVCxDQUFDLENBQUE7UUFuQkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7SUFDL0IsQ0FBQztJQW1CSCxxQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksY0FBYztJQUQxQixpQkFBVSxFQUFFOztHQUNBLGNBQWMsQ0F5QjFCO0FBekJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RvcmFnZVNlcnZpY2Uge1xuXG4gIHB1YmxpYyBfc3RvcmFnZTogU3RvcmFnZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuICB9XG5cbiAgcHVibGljIHNldEl0ZW0gPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUl0ZW0gPSAoa2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVtID0gKGtleTogc3RyaW5nKTogYW55ID0+IHtcbiAgICBsZXQgaXRlbTogYW55ID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XG5cbiAgICBpZiAoaXRlbSAmJiBpdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxufVxuIl19