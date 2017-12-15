"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var httpWrapper_service_1 = require("./httpWrapper.service");
var router_1 = require("@angular/router");
var inventory_api_1 = require("./apiurls/inventory.api");
var _ = require("lodash");
var catchmanger_1 = require("./catchManager/catchmanger");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var InventoryService = (function () {
    function InventoryService(errorHandler, _http, _router, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._router = _router;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     * return flatten group list
     * @param rawList array of IGroupsWithStocksHierarchyMinItem
     * @param parents an empty []
     */
    InventoryService.prototype.makeStockGroupsFlatten = function (rawList, parents) {
        var _this = this;
        var a = _.map(rawList, function (item) {
            var result;
            if (item.childStockGroups && item.childStockGroups.length > 0) {
                result = _this.makeStockGroupsFlatten(item.childStockGroups, []);
                result.push({
                    label: item.name,
                    value: item.uniqueName
                });
            }
            else {
                result = {
                    label: item.name,
                    value: item.uniqueName
                };
            }
            return result;
        });
        return _.flatten(a);
    };
    InventoryService.prototype.CreateStockGroup = function (model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + inventory_api_1.INVENTORY_API.CREATE_STOCK_GROUP.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /**
     * Update StockGroup
     */
    InventoryService.prototype.UpdateStockGroup = function (model, stockGroupUniquename) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + inventory_api_1.INVENTORY_API.UPDATE_STOCK_GROUP.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniquename)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { stockGroupUniquename: stockGroupUniquename };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model, { stockGroupUniquename: stockGroupUniquename }); });
    };
    /**
     * Delete StockGroup
     */
    InventoryService.prototype.DeleteStockGroup = function (stockGroupUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + inventory_api_1.INVENTORY_API.DELETE_STOCK_GROUP.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniqueName))).map(function (res) {
            var data = res.json();
            data.request = stockGroupUniqueName;
            data.queryString = { stockGroupUniqueName: stockGroupUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, stockGroupUniqueName, { stockGroupUniqueName: stockGroupUniqueName }); });
    };
    InventoryService.prototype.GetGroupsStock = function (stockGroupUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.GROUPS_STOCKS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniqueName))).map(function (res) {
            var data = res.json();
            data.request = stockGroupUniqueName;
            data.queryString = { stockGroupUniqueName: stockGroupUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, stockGroupUniqueName, { stockGroupUniqueName: stockGroupUniqueName }); });
    };
    /**
     * get Groups with Stocks
     */
    // public GetGroupsWithStocksFlatten(q: string = '', page: number = 1, count: string = '100000000'): Observable<BaseResponse<GroupsWithStocksFlatten, string>> {
    //   this.store.take(1).subscribe(s => {
    //     if (s.session.user) {
    //       this.user = s.session.user.user;
    //     }
    //     this.companyUniqueName = s.session.companyUniqueName;
    //   });
    //   return this._http.get(this.config.apiUrl + INVENTORY_API.GROUPS_WITH_STOCKS_FLATTEN.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':q', encodeURIComponent(q || '').replace(':page', page.toString()).replace(':count', count.toString())).map((res) => {
    //     let data: BaseResponse<GroupsWithStocksFlatten, string> = res.json();
    //     data.request = '';
    //     data.queryString = { q, page, count };
    //     return data;
    //   }).catch((e) => this.errorHandler.HandleCatch<GroupsWithStocksFlatten, string>(e, '', { q, page, count }));
    // }
    InventoryService.prototype.GetGroupsWithStocksFlatten = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.GROUPS_WITH_STOCKS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', {}); });
    };
    /**
     * get Stocks
     */
    InventoryService.prototype.GetStocks = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.STOCKS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = {};
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', {}); });
    };
    /**
     * GetManufacturingStocks
     */
    InventoryService.prototype.GetManufacturingStocks = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.MANUFACTURING_STOCKS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = {};
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', {}); });
    };
    /**
     * GetManufacturingStocks
     */
    InventoryService.prototype.GetManufacturingStocksForCreateMF = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.CREATE_NEW_MANUFACTURING_STOCKS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = {};
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', {}); });
    };
    /**
     * get Stocks with hierarchy
     */
    InventoryService.prototype.GetGroupsWithStocksHierarchyMin = function (q, page, count) {
        var _this = this;
        if (q === void 0) { q = ''; }
        if (page === void 0) { page = 1; }
        if (count === void 0) { count = ''; }
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.GROUPS_WITH_STOCKS_HIERARCHY.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':q', encodeURIComponent(q || '')).replace(':page', encodeURIComponent(page.toString())).replace(':count', encodeURIComponent(count.toString()))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = { q: q, page: page, count: count };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', { q: q, page: page, count: count }); });
    };
    /**
     * Create StockUnit
     */
    InventoryService.prototype.CreateStockUnit = function (model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + inventory_api_1.INVENTORY_API.CREATE_STOCK_UNIT.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /**
     * Update StockUnit
     */
    InventoryService.prototype.UpdateStockUnit = function (model, uName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + inventory_api_1.INVENTORY_API.UPDATE_STOCK_UNIT.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':uName', uName), model).map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { uName: uName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model, { uName: uName }); });
    };
    /**
     * Delete StockUnit
     */
    InventoryService.prototype.DeleteStockUnit = function (uName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + inventory_api_1.INVENTORY_API.DELETE_STOCK_UNIT.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':uName', uName)).map(function (res) {
            var data = res.json();
            data.request = uName;
            data.queryString = { uName: uName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, uName, { uName: uName }); });
    };
    /**
     * get StockUnits
     */
    InventoryService.prototype.GetStockUnit = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.STOCK_UNIT.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = {};
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', {}); });
    };
    /**
     * Create Stock
     */
    InventoryService.prototype.CreateStock = function (model, stockGroupUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = encodeURIComponent(this._generalService.companyUniqueName);
        return this._http.post(this.config.apiUrl + inventory_api_1.INVENTORY_API.CREATE_STOCK.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { stockGroupUniqueName: stockGroupUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model, { stockGroupUniqueName: stockGroupUniqueName }); });
    };
    /**
     * Update Stock
     */
    InventoryService.prototype.UpdateStock = function (model, stockGroupUniqueName, stockUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + inventory_api_1.INVENTORY_API.UPDATE_STOCK.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniqueName)).replace(':stockUniqueName', encodeURIComponent(stockUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { stockGroupUniqueName: stockGroupUniqueName, stockUniqueName: stockUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, model, { stockGroupUniqueName: stockGroupUniqueName, stockUniqueName: stockUniqueName }); });
    };
    /**
     * Delete Stock
     */
    InventoryService.prototype.DeleteStock = function (stockGroupUniqueName, stockUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + inventory_api_1.INVENTORY_API.DELETE_STOCK.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniqueName)).replace(':stockUniqueName', encodeURIComponent(stockUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = { stockGroupUniqueName: stockGroupUniqueName, stockUniqueName: stockUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', { stockGroupUniqueName: stockGroupUniqueName, stockUniqueName: stockUniqueName }); });
    };
    /**
     * get Stockdetails
     */
    InventoryService.prototype.GetStockDetails = function (stockGroupUniqueName, stockUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.STOCK_DETAIL.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockGroupUniqueName', encodeURIComponent(stockGroupUniqueName)).replace(':stockUniqueName', encodeURIComponent(stockUniqueName))).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = { stockGroupUniqueName: stockGroupUniqueName, stockUniqueName: stockUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', { stockGroupUniqueName: stockGroupUniqueName, stockUniqueName: stockUniqueName }); });
    };
    /**
     * get Get-Rate-For-Stoke
     */
    InventoryService.prototype.GetRateForStoke = function (stockUniqueName, model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + inventory_api_1.INVENTORY_API.GET_RATE_FOR_STOCK.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName)).replace(':stockUniqueName', encodeURIComponent(stockUniqueName)), model).map(function (res) {
            var data = res.json();
            data.request = '';
            data.queryString = { stockUniqueName: stockUniqueName };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, '', { stockUniqueName: stockUniqueName }); });
    };
    /**
     * get GetStocksReport
     */
    InventoryService.prototype.GetStocksReport = function (stockReportRequest) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + inventory_api_1.INVENTORY_API.STOCK_REPORT.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))
            .replace(':stockGroupUniqueName', encodeURIComponent(stockReportRequest.stockGroupUniqueName))
            .replace(':stockUniqueName', encodeURIComponent(stockReportRequest.stockUniqueName))
            .replace(':from', encodeURIComponent(stockReportRequest.from))
            .replace(':to', encodeURIComponent(stockReportRequest.to))
            .replace(':count', encodeURIComponent(stockReportRequest.count.toString()))
            .replace(':page', encodeURIComponent(stockReportRequest.page.toString())))
            .map(function (res) {
            var data = res.json();
            data.request = stockReportRequest;
            data.queryString = {
                stockGroupUniqueName: stockReportRequest.stockGroupUniqueName,
                stockUniqueName: stockReportRequest.stockUniqueName,
                from: stockReportRequest.from,
                to: stockReportRequest.to,
                count: stockReportRequest.count,
                page: stockReportRequest.page
            };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e, stockReportRequest, {
            stockGroupUniqueName: stockReportRequest.stockGroupUniqueName,
            stockUniqueName: stockReportRequest.stockUniqueName,
            from: stockReportRequest.from,
            to: stockReportRequest.to,
            count: stockReportRequest.count,
            page: stockReportRequest.page
        }); });
    };
    return InventoryService;
}());
InventoryService = __decorate([
    core_1.Injectable(),
    __param(4, core_1.Optional()), __param(4, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService, router_1.Router,
        general_service_1.GeneralService, Object])
], InventoryService);
exports.InventoryService = InventoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUE2RDtBQUM3RCxpQ0FBK0I7QUFDL0IsNkRBQTJEO0FBQzNELDBDQUF5QztBQUN6Qyx5REFBd0Q7QUFDeEQsMEJBQTZCO0FBSzdCLDBEQUEwRDtBQUUxRCxxREFBbUQ7QUFDbkQsbURBQXFFO0FBR3JFLElBQWEsZ0JBQWdCO0lBSTNCLDBCQUFvQixZQUEwQixFQUFTLEtBQXlCLEVBQVMsT0FBZSxFQUNwRixlQUErQixFQUE2QyxNQUEwQjtRQUR0RyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFTLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNwRixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBNkMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7SUFDMUgsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpREFBc0IsR0FBN0IsVUFBOEIsT0FBNEMsRUFBRSxPQUFPO1FBQW5GLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQUk7WUFDMUIsSUFBSSxNQUFNLENBQUM7WUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFD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a0IsQ0FBQyxvQkFBb0I7Z0JBQzdELGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxlQUFlO2dCQUNuRCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsSUFBSTtnQkFDN0IsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLO2dCQUMvQixJQUFJLEVBQUUsa0JBQWtCLENBQUMsSUFBSTthQUM5QixDQUNBO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUEwQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUU7WUFDNUcsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CO1lBQzdELGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxlQUFlO1lBQ25ELElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJO1lBQzdCLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLO1lBQy9CLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJO1NBQzlCLENBQUMsRUFQYyxDQU9kLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFSCx1QkFBQztBQUFELENBQUMsQUF0VUQsSUFzVUM7QUF0VVksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7SUFNMkMsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDhCQUFhLENBQUMsQ0FBQTtxQ0FEckQsMEJBQVksRUFBZ0Isd0NBQWtCLEVBQWtCLGVBQU07UUFDbkUsZ0NBQWM7R0FMeEMsZ0JBQWdCLENBc1U1QjtBQXRVWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVhdGVTdG9ja1JlcXVlc3QsIFN0b2NrRGV0YWlsUmVzcG9uc2UsIFN0b2NrR3JvdXBSZXF1ZXN0LCBTdG9ja0dyb3VwUmVzcG9uc2UsIFN0b2NrUmVwb3J0UmVxdWVzdCwgU3RvY2tSZXBvcnRSZXNwb25zZSwgU3RvY2tzUmVzcG9uc2UsIFN0b2NrVW5pdFJlcXVlc3QsIFN0b2NrVW5pdFJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvSW52ZW50b3J5JztcbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyU2VydmljZSB9IGZyb20gJy4vaHR0cFdyYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSU5WRU5UT1JZX0FQSSB9IGZyb20gJy4vYXBpdXJscy9pbnZlbnRvcnkuYXBpJztcbmltcG9ydCAqIGFzICBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBHcm91cHNXaXRoU3RvY2tzSGllcmFyY2h5TWluIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvR3JvdXBzV2l0aFN0b2Nrcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0Jhc2VSZXNwb25zZSc7XG5pbXBvcnQgeyBVc2VyRGV0YWlscyB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL2xvZ2luTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vY2F0Y2hNYW5hZ2VyL2NhdGNobWFuZ2VyJztcbmltcG9ydCB7IElHcm91cHNXaXRoU3RvY2tzSGllcmFyY2h5TWluSXRlbSB9IGZyb20gJy4uL21vZGVscy9pbnRlcmZhY2VzL2dyb3Vwc1dpdGhTdG9ja3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZywgSVNlcnZpY2VDb25maWdBcmdzIH0gZnJvbSAnLi9zZXJ2aWNlLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnZlbnRvcnlTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHVzZXI6IFVzZXJEZXRhaWxzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHB1YmxpYyBfaHR0cDogSHR0cFdyYXBwZXJTZXJ2aWNlLCBwdWJsaWMgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nZW5lcmFsU2VydmljZTogR2VuZXJhbFNlcnZpY2UsIEBPcHRpb25hbCgpIEBJbmplY3QoU2VydmljZUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IElTZXJ2aWNlQ29uZmlnQXJncykge1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBmbGF0dGVuIGdyb3VwIGxpc3RcbiAgICogQHBhcmFtIHJhd0xpc3QgYXJyYXkgb2YgSUdyb3Vwc1dpdGhTdG9ja3NIaWVyYXJjaHlNaW5JdGVtXG4gICAqIEBwYXJhbSBwYXJlbnRzIGFuIGVtcHR5IFtdXG4gICAqL1xuICBwdWJsaWMgbWFrZVN0b2NrR3JvdXBzRmxhdHRlbihyYXdMaXN0OiBJR3JvdXBzV2l0aFN0b2Nrc0hpZXJhcmNoeU1pbkl0ZW1bXSwgcGFyZW50cykge1xuICAgIGxldCBhID0gXy5tYXAocmF3TGlzdCwgKGl0ZW0pID0+IHtcbiAgICAgIGxldCByZXN1bHQ7XG4gICAgICBpZiAoaXRlbS5jaGlsZFN0b2NrR3JvdXBzICYmIGl0ZW0uY2hpbGRTdG9ja0dyb3Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMubWFrZVN0b2NrR3JvdXBzRmxhdHRlbihpdGVtLmNoaWxkU3RvY2tHcm91cHMsIFtdKTtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgICAgICAgdmFsdWU6IGl0ZW0udW5pcXVlTmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICAgIHZhbHVlOiBpdGVtLnVuaXF1ZU5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIF8uZmxhdHRlbihhKTtcbiAgfVxuXG4gIHB1YmxpYyBDcmVhdGVTdG9ja0dyb3VwKG1vZGVsOiBTdG9ja0dyb3VwUmVxdWVzdCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPFN0b2NrR3JvdXBSZXNwb25zZSwgU3RvY2tHcm91cFJlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLkNSRUFURV9TVE9DS19HUk9VUC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLCBtb2RlbCkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8U3RvY2tHcm91cFJlc3BvbnNlLCBTdG9ja0dyb3VwUmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5yZXF1ZXN0ID0gbW9kZWw7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8U3RvY2tHcm91cFJlc3BvbnNlLCBTdG9ja0dyb3VwUmVxdWVzdD4oZSwgbW9kZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgU3RvY2tHcm91cFxuICAgKi9cbiAgcHVibGljIFVwZGF0ZVN0b2NrR3JvdXAobW9kZWw6IFN0b2NrR3JvdXBSZXF1ZXN0LCBzdG9ja0dyb3VwVW5pcXVlbmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tHcm91cFJlc3BvbnNlLCBTdG9ja0dyb3VwUmVxdWVzdD4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WRU5UT1JZX0FQSS5VUERBVEVfU1RPQ0tfR1JPVVAucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKS5yZXBsYWNlKCc6c3RvY2tHcm91cFVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tHcm91cFVuaXF1ZW5hbWUpKSwgbW9kZWwpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFN0b2NrR3JvdXBSZXNwb25zZSwgU3RvY2tHcm91cFJlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IG1vZGVsO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtzdG9ja0dyb3VwVW5pcXVlbmFtZX07XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8U3RvY2tHcm91cFJlc3BvbnNlLCBTdG9ja0dyb3VwUmVxdWVzdD4oZSwgbW9kZWwsIHtzdG9ja0dyb3VwVW5pcXVlbmFtZX0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgU3RvY2tHcm91cFxuICAgKi9cbiAgcHVibGljIERlbGV0ZVN0b2NrR3JvdXAoc3RvY2tHcm91cFVuaXF1ZU5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLkRFTEVURV9TVE9DS19HUk9VUC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja0dyb3VwVW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChzdG9ja0dyb3VwVW5pcXVlTmFtZSkpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxzdHJpbmcsIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5yZXF1ZXN0ID0gc3RvY2tHcm91cFVuaXF1ZU5hbWU7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge3N0b2NrR3JvdXBVbmlxdWVOYW1lfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIHN0cmluZz4oZSwgc3RvY2tHcm91cFVuaXF1ZU5hbWUsIHtzdG9ja0dyb3VwVW5pcXVlTmFtZX0pKTtcbiAgfVxuXG4gIHB1YmxpYyBHZXRHcm91cHNTdG9jayhzdG9ja0dyb3VwVW5pcXVlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tHcm91cFJlc3BvbnNlLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuR1JPVVBTX1NUT0NLUy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja0dyb3VwVW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChzdG9ja0dyb3VwVW5pcXVlTmFtZSkpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxTdG9ja0dyb3VwUmVzcG9uc2UsIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5yZXF1ZXN0ID0gc3RvY2tHcm91cFVuaXF1ZU5hbWU7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge3N0b2NrR3JvdXBVbmlxdWVOYW1lfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja0dyb3VwUmVzcG9uc2UsIHN0cmluZz4oZSwgc3RvY2tHcm91cFVuaXF1ZU5hbWUsIHtzdG9ja0dyb3VwVW5pcXVlTmFtZX0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgR3JvdXBzIHdpdGggU3RvY2tzXG4gICAqL1xuICAvLyBwdWJsaWMgR2V0R3JvdXBzV2l0aFN0b2Nrc0ZsYXR0ZW4ocTogc3RyaW5nID0gJycsIHBhZ2U6IG51bWJlciA9IDEsIGNvdW50OiBzdHJpbmcgPSAnMTAwMDAwMDAwJyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPEdyb3Vwc1dpdGhTdG9ja3NGbGF0dGVuLCBzdHJpbmc+PiB7XG4gIC8vICAgdGhpcy5zdG9yZS50YWtlKDEpLnN1YnNjcmliZShzID0+IHtcbiAgLy8gICAgIGlmIChzLnNlc3Npb24udXNlcikge1xuICAvLyAgICAgICB0aGlzLnVzZXIgPSBzLnNlc3Npb24udXNlci51c2VyO1xuICAvLyAgICAgfVxuICAvLyAgICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHMuc2Vzc2lvbi5jb21wYW55VW5pcXVlTmFtZTtcbiAgLy8gICB9KTtcbiAgLy8gICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WRU5UT1JZX0FQSS5HUk9VUFNfV0lUSF9TVE9DS1NfRkxBVFRFTi5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpxJywgZW5jb2RlVVJJQ29tcG9uZW50KHEgfHwgJycpLnJlcGxhY2UoJzpwYWdlJywgcGFnZS50b1N0cmluZygpKS5yZXBsYWNlKCc6Y291bnQnLCBjb3VudC50b1N0cmluZygpKSkubWFwKChyZXMpID0+IHtcbiAgLy8gICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8R3JvdXBzV2l0aFN0b2Nrc0ZsYXR0ZW4sIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAvLyAgICAgZGF0YS5yZXF1ZXN0ID0gJyc7XG4gIC8vICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0geyBxLCBwYWdlLCBjb3VudCB9O1xuICAvLyAgICAgcmV0dXJuIGRhdGE7XG4gIC8vICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPEdyb3Vwc1dpdGhTdG9ja3NGbGF0dGVuLCBzdHJpbmc+KGUsICcnLCB7IHEsIHBhZ2UsIGNvdW50IH0pKTtcbiAgLy8gfVxuICBwdWJsaWMgR2V0R3JvdXBzV2l0aFN0b2Nrc0ZsYXR0ZW4oKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8R3JvdXBzV2l0aFN0b2Nrc0hpZXJhcmNoeU1pbiwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLkdST1VQU19XSVRIX1NUT0NLUy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxHcm91cHNXaXRoU3RvY2tzSGllcmFyY2h5TWluLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9ICcnO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPEdyb3Vwc1dpdGhTdG9ja3NIaWVyYXJjaHlNaW4sIHN0cmluZz4oZSwgJycsIHt9KSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IFN0b2Nrc1xuICAgKi9cbiAgcHVibGljIEdldFN0b2NrcygpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxTdG9ja3NSZXNwb25zZSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLlNUT0NLUy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxTdG9ja3NSZXNwb25zZSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnJlcXVlc3QgPSAnJztcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7fTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja3NSZXNwb25zZSwgc3RyaW5nPihlLCAnJywge30pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRNYW51ZmFjdHVyaW5nU3RvY2tzXG4gICAqL1xuICBwdWJsaWMgR2V0TWFudWZhY3R1cmluZ1N0b2NrcygpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxTdG9ja3NSZXNwb25zZSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLk1BTlVGQUNUVVJJTkdfU1RPQ0tTLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFN0b2Nrc1Jlc3BvbnNlLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9ICcnO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHt9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPFN0b2Nrc1Jlc3BvbnNlLCBzdHJpbmc+KGUsICcnLCB7fSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldE1hbnVmYWN0dXJpbmdTdG9ja3NcbiAgICovXG4gIHB1YmxpYyBHZXRNYW51ZmFjdHVyaW5nU3RvY2tzRm9yQ3JlYXRlTUYoKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tzUmVzcG9uc2UsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WRU5UT1JZX0FQSS5DUkVBVEVfTkVXX01BTlVGQUNUVVJJTkdfU1RPQ0tTLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFN0b2Nrc1Jlc3BvbnNlLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9ICcnO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHt9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPFN0b2Nrc1Jlc3BvbnNlLCBzdHJpbmc+KGUsICcnLCB7fSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBTdG9ja3Mgd2l0aCBoaWVyYXJjaHlcbiAgICovXG4gIHB1YmxpYyBHZXRHcm91cHNXaXRoU3RvY2tzSGllcmFyY2h5TWluKHE6IHN0cmluZyA9ICcnLCBwYWdlOiBudW1iZXIgPSAxLCBjb3VudDogc3RyaW5nID0gJycpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxHcm91cHNXaXRoU3RvY2tzSGllcmFyY2h5TWluLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuR1JPVVBTX1dJVEhfU1RPQ0tTX0hJRVJBUkNIWS5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpxJywgZW5jb2RlVVJJQ29tcG9uZW50KHEgfHwgJycpKS5yZXBsYWNlKCc6cGFnZScsIGVuY29kZVVSSUNvbXBvbmVudChwYWdlLnRvU3RyaW5nKCkpKS5yZXBsYWNlKCc6Y291bnQnLCBlbmNvZGVVUklDb21wb25lbnQoY291bnQudG9TdHJpbmcoKSkpKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxHcm91cHNXaXRoU3RvY2tzSGllcmFyY2h5TWluLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9ICcnO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtxLCBwYWdlLCBjb3VudH07XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8R3JvdXBzV2l0aFN0b2Nrc0hpZXJhcmNoeU1pbiwgc3RyaW5nPihlLCAnJywge3EsIHBhZ2UsIGNvdW50fSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBTdG9ja1VuaXRcbiAgICovXG4gIHB1YmxpYyBDcmVhdGVTdG9ja1VuaXQobW9kZWw6IFN0b2NrVW5pdFJlcXVlc3QpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxTdG9ja1VuaXRSZXNwb25zZSwgU3RvY2tVbml0UmVxdWVzdD4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuQ1JFQVRFX1NUT0NLX1VOSVQucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKSwgbW9kZWwpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFN0b2NrVW5pdFJlc3BvbnNlLCBTdG9ja1VuaXRSZXF1ZXN0PiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnJlcXVlc3QgPSBtb2RlbDtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja1VuaXRSZXNwb25zZSwgU3RvY2tVbml0UmVxdWVzdD4oZSwgbW9kZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgU3RvY2tVbml0XG4gICAqL1xuICBwdWJsaWMgVXBkYXRlU3RvY2tVbml0KG1vZGVsOiBTdG9ja1VuaXRSZXF1ZXN0LCB1TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tVbml0UmVzcG9uc2UsIFN0b2NrVW5pdFJlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuVVBEQVRFX1NUT0NLX1VOSVQucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKS5yZXBsYWNlKCc6dU5hbWUnLCB1TmFtZSksIG1vZGVsKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxTdG9ja1VuaXRSZXNwb25zZSwgU3RvY2tVbml0UmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5yZXF1ZXN0ID0gbW9kZWw7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge3VOYW1lfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja1VuaXRSZXNwb25zZSwgU3RvY2tVbml0UmVxdWVzdD4oZSwgbW9kZWwsIHt1TmFtZX0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgU3RvY2tVbml0XG4gICAqL1xuICBwdWJsaWMgRGVsZXRlU3RvY2tVbml0KHVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpVXJsICsgSU5WRU5UT1JZX0FQSS5ERUxFVEVfU1RPQ0tfVU5JVC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzp1TmFtZScsIHVOYW1lKSkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IHVOYW1lO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHt1TmFtZX07XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBzdHJpbmc+KGUsIHVOYW1lLCB7dU5hbWV9KSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IFN0b2NrVW5pdHNcbiAgICovXG4gIHB1YmxpYyBHZXRTdG9ja1VuaXQoKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tVbml0UmVzcG9uc2VbXSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLlNUT0NLX1VOSVQucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKSkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8U3RvY2tVbml0UmVzcG9uc2VbXSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnJlcXVlc3QgPSAnJztcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7fTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja1VuaXRSZXNwb25zZVtdLCBzdHJpbmc+KGUsICcnLCB7fSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBTdG9ja1xuICAgKi9cbiAgcHVibGljIENyZWF0ZVN0b2NrKG1vZGVsOiBDcmVhdGVTdG9ja1JlcXVlc3QsIHN0b2NrR3JvdXBVbmlxdWVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxTdG9ja0RldGFpbFJlc3BvbnNlLCBDcmVhdGVTdG9ja1JlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuQ1JFQVRFX1NUT0NLLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSkucmVwbGFjZSgnOnN0b2NrR3JvdXBVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHN0b2NrR3JvdXBVbmlxdWVOYW1lKSksIG1vZGVsKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxTdG9ja0RldGFpbFJlc3BvbnNlLCBDcmVhdGVTdG9ja1JlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IG1vZGVsO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtzdG9ja0dyb3VwVW5pcXVlTmFtZX07XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8U3RvY2tEZXRhaWxSZXNwb25zZSwgQ3JlYXRlU3RvY2tSZXF1ZXN0PihlLCBtb2RlbCwge3N0b2NrR3JvdXBVbmlxdWVOYW1lfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBTdG9ja1xuICAgKi9cbiAgcHVibGljIFVwZGF0ZVN0b2NrKG1vZGVsOiBDcmVhdGVTdG9ja1JlcXVlc3QsIHN0b2NrR3JvdXBVbmlxdWVOYW1lOiBzdHJpbmcsIHN0b2NrVW5pcXVlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tEZXRhaWxSZXNwb25zZSwgQ3JlYXRlU3RvY2tSZXF1ZXN0Pj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLlVQREFURV9TVE9DSy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja0dyb3VwVW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChzdG9ja0dyb3VwVW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja1VuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tVbmlxdWVOYW1lKSksIG1vZGVsKS5tYXAoKHJlcykgPT4ge1xuICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxTdG9ja0RldGFpbFJlc3BvbnNlLCBDcmVhdGVTdG9ja1JlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucmVxdWVzdCA9IG1vZGVsO1xuICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtzdG9ja0dyb3VwVW5pcXVlTmFtZSwgc3RvY2tVbmlxdWVOYW1lfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja0RldGFpbFJlc3BvbnNlLCBDcmVhdGVTdG9ja1JlcXVlc3Q+KGUsIG1vZGVsLCB7c3RvY2tHcm91cFVuaXF1ZU5hbWUsIHN0b2NrVW5pcXVlTmFtZX0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgU3RvY2tcbiAgICovXG4gIHB1YmxpYyBEZWxldGVTdG9jayhzdG9ja0dyb3VwVW5pcXVlTmFtZTogc3RyaW5nLCBzdG9ja1VuaXF1ZU5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLkRFTEVURV9TVE9DSy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja0dyb3VwVW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChzdG9ja0dyb3VwVW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja1VuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tVbmlxdWVOYW1lKSkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnJlcXVlc3QgPSAnJztcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7c3RvY2tHcm91cFVuaXF1ZU5hbWUsIHN0b2NrVW5pcXVlTmFtZX07XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBzdHJpbmc+KGUsICcnLCB7c3RvY2tHcm91cFVuaXF1ZU5hbWUsIHN0b2NrVW5pcXVlTmFtZX0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgU3RvY2tkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgR2V0U3RvY2tEZXRhaWxzKHN0b2NrR3JvdXBVbmlxdWVOYW1lOiBzdHJpbmcsIHN0b2NrVW5pcXVlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8U3RvY2tEZXRhaWxSZXNwb25zZSwgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZFTlRPUllfQVBJLlNUT0NLX0RFVEFJTC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb21wYW55VW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja0dyb3VwVW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChzdG9ja0dyb3VwVW5pcXVlTmFtZSkpLnJlcGxhY2UoJzpzdG9ja1VuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tVbmlxdWVOYW1lKSkpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFN0b2NrRGV0YWlsUmVzcG9uc2UsIHN0cmluZz4gPSByZXMuanNvbigpO1xuICAgICAgZGF0YS5yZXF1ZXN0ID0gJyc7XG4gICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge3N0b2NrR3JvdXBVbmlxdWVOYW1lLCBzdG9ja1VuaXF1ZU5hbWV9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPFN0b2NrRGV0YWlsUmVzcG9uc2UsIHN0cmluZz4oZSwgJycsIHtzdG9ja0dyb3VwVW5pcXVlTmFtZSwgc3RvY2tVbmlxdWVOYW1lfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBHZXQtUmF0ZS1Gb3ItU3Rva2VcbiAgICovXG4gIHB1YmxpYyBHZXRSYXRlRm9yU3Rva2Uoc3RvY2tVbmlxdWVOYW1lOiBzdHJpbmcsIG1vZGVsOiBhbnkpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxhbnksIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuR0VUX1JBVEVfRk9SX1NUT0NLLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSkucmVwbGFjZSgnOnN0b2NrVW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudChzdG9ja1VuaXF1ZU5hbWUpKSwgbW9kZWwpLm1hcCgocmVzKSA9PiB7XG4gICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPGFueSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICBkYXRhLnJlcXVlc3QgPSAnJztcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7c3RvY2tVbmlxdWVOYW1lfTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja0RldGFpbFJlc3BvbnNlLCBzdHJpbmc+KGUsICcnLCB7c3RvY2tVbmlxdWVOYW1lfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBHZXRTdG9ja3NSZXBvcnRcbiAgICovXG4gIHB1YmxpYyBHZXRTdG9ja3NSZXBvcnQoc3RvY2tSZXBvcnRSZXF1ZXN0OiBTdG9ja1JlcG9ydFJlcXVlc3QpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxTdG9ja1JlcG9ydFJlc3BvbnNlLCBTdG9ja1JlcG9ydFJlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVkVOVE9SWV9BUEkuU1RPQ0tfUkVQT1JULnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSlcbiAgICAgIC5yZXBsYWNlKCc6c3RvY2tHcm91cFVuaXF1ZU5hbWUnLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tSZXBvcnRSZXF1ZXN0LnN0b2NrR3JvdXBVbmlxdWVOYW1lKSlcbiAgICAgIC5yZXBsYWNlKCc6c3RvY2tVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHN0b2NrUmVwb3J0UmVxdWVzdC5zdG9ja1VuaXF1ZU5hbWUpKVxuICAgICAgLnJlcGxhY2UoJzpmcm9tJywgZW5jb2RlVVJJQ29tcG9uZW50KHN0b2NrUmVwb3J0UmVxdWVzdC5mcm9tKSlcbiAgICAgIC5yZXBsYWNlKCc6dG8nLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tSZXBvcnRSZXF1ZXN0LnRvKSlcbiAgICAgIC5yZXBsYWNlKCc6Y291bnQnLCBlbmNvZGVVUklDb21wb25lbnQoc3RvY2tSZXBvcnRSZXF1ZXN0LmNvdW50LnRvU3RyaW5nKCkpKVxuICAgICAgLnJlcGxhY2UoJzpwYWdlJywgZW5jb2RlVVJJQ29tcG9uZW50KHN0b2NrUmVwb3J0UmVxdWVzdC5wYWdlLnRvU3RyaW5nKCkpKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFN0b2NrUmVwb3J0UmVzcG9uc2UsIFN0b2NrUmVwb3J0UmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgICBkYXRhLnJlcXVlc3QgPSBzdG9ja1JlcG9ydFJlcXVlc3Q7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7XG4gICAgICAgICAgc3RvY2tHcm91cFVuaXF1ZU5hbWU6IHN0b2NrUmVwb3J0UmVxdWVzdC5zdG9ja0dyb3VwVW5pcXVlTmFtZSxcbiAgICAgICAgICBzdG9ja1VuaXF1ZU5hbWU6IHN0b2NrUmVwb3J0UmVxdWVzdC5zdG9ja1VuaXF1ZU5hbWUsXG4gICAgICAgICAgZnJvbTogc3RvY2tSZXBvcnRSZXF1ZXN0LmZyb20sXG4gICAgICAgICAgdG86IHN0b2NrUmVwb3J0UmVxdWVzdC50byxcbiAgICAgICAgICBjb3VudDogc3RvY2tSZXBvcnRSZXF1ZXN0LmNvdW50LFxuICAgICAgICAgIHBhZ2U6IHN0b2NrUmVwb3J0UmVxdWVzdC5wYWdlXG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxTdG9ja1JlcG9ydFJlc3BvbnNlLCBTdG9ja1JlcG9ydFJlcXVlc3Q+KGUsIHN0b2NrUmVwb3J0UmVxdWVzdCwge1xuICAgICAgICBzdG9ja0dyb3VwVW5pcXVlTmFtZTogc3RvY2tSZXBvcnRSZXF1ZXN0LnN0b2NrR3JvdXBVbmlxdWVOYW1lLFxuICAgICAgICBzdG9ja1VuaXF1ZU5hbWU6IHN0b2NrUmVwb3J0UmVxdWVzdC5zdG9ja1VuaXF1ZU5hbWUsXG4gICAgICAgIGZyb206IHN0b2NrUmVwb3J0UmVxdWVzdC5mcm9tLFxuICAgICAgICB0bzogc3RvY2tSZXBvcnRSZXF1ZXN0LnRvLFxuICAgICAgICBjb3VudDogc3RvY2tSZXBvcnRSZXF1ZXN0LmNvdW50LFxuICAgICAgICBwYWdlOiBzdG9ja1JlcG9ydFJlcXVlc3QucGFnZVxuICAgICAgfSkpO1xuICB9XG5cbn1cbiJdfQ==