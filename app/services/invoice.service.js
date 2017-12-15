"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpWrapper_service_1 = require("./httpWrapper.service");
var core_1 = require("@angular/core");
var catchmanger_1 = require("./catchManager/catchmanger");
var invoice_api_1 = require("./apiurls/invoice.api");
var _ = require("lodash");
var general_service_1 = require("./general.service");
var service_config_1 = require("./service.config");
var InvoiceService = (function () {
    function InvoiceService(errorHandler, _http, _generalService, config) {
        this.errorHandler = errorHandler;
        this._http = _http;
        this._generalService = _generalService;
        this.config = config;
    }
    /**
     * get INVOICES
     * URL:: company/:companyUniqueName/invoices?from=&to=
     */
    InvoiceService.prototype.GetAllInvoices = function (model, body) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        // create url conditionally
        var url = this.createQueryString(this.config.apiUrl + invoice_api_1.INVOICE_API.GET_ALL_INVOICES, model);
        return this._http.post(url.replace(':companyUniqueName', this.companyUniqueName), body)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { model: model };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, ''); });
    };
    /*
    * get all Ledgers for Invoice
    */
    InvoiceService.prototype.GetAllLedgersForInvoice = function (reqObj, model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        // create url conditionally
        var url = this.createQueryString(this.config.apiUrl + invoice_api_1.INVOICE_API.GET_ALL_LEDGERS_FOR_INVOICE, reqObj);
        return this._http.post(url.replace(':companyUniqueName', this.companyUniqueName), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { reqObj: reqObj };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, reqObj, model); });
    };
    /*
    * get url ready with querystring params
    * pass url and model obj
    */
    InvoiceService.prototype.createQueryString = function (str, model) {
        var url = str;
        if ((model.from)) {
            url = url + 'from=' + model.from + '&';
        }
        if ((model.to)) {
            url = url + 'to=' + model.to + '&';
        }
        if ((model.page)) {
            url = url + 'page=' + model.page + '&';
        }
        if ((model.count)) {
            url = url + 'count=' + model.count;
        }
        return url;
    };
    /*
    * Generate Bulk Invoice
    * method: 'POST'
    * url: '/company/:companyUniqueName/invoices/bulk-generate?combined=:combined'
    */
    InvoiceService.prototype.GenerateBulkInvoice = function (reqObj, model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        // create url
        var url = this.config.apiUrl + invoice_api_1.INVOICE_API.GENERATE_BULK_INVOICE + '=' + reqObj.combined;
        return this._http.post(url.replace(':companyUniqueName', this.companyUniqueName), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { reqObj: reqObj };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, reqObj, model); });
    };
    /**
     * PREVIEW OF GENERATED INVOICE
     * URL:: v2/company/{companyUniqueName}/accounts/{accountUniqueName}/invoices/{invoiceNumber}/preview
     */
    InvoiceService.prototype.GetGeneratedInvoicePreview = function (accountUniqueName, invoiceNumber) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + invoice_api_1.INVOICE_API_2.GENERATED_INVOICE_PREVIEW.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName).replace(':invoiceNumber', invoiceNumber))
            .map(function (res) {
            var data = res.json();
            data.request = invoiceNumber;
            data.queryString = { invoiceNumber: invoiceNumber, accountUniqueName: accountUniqueName };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, invoiceNumber); });
    };
    /**
     * Update Generated Invoice
     */
    InvoiceService.prototype.UpdateGeneratedInvoice = function (accountUniqueName, model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + invoice_api_1.INVOICE_API_2.UPDATE_GENERATED_INVOICE.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            data.queryString = { accountUniqueName: accountUniqueName };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /*
    * Preview Invoice
    * method: 'POST'
    * url: '/company/:companyUniqueName/accounts/:accountUniqueName/invoices/preview'
    */
    InvoiceService.prototype.PreviewInvoice = function (accountUniqueName, model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API_2.PREVIEW_INVOICE.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName), model)
            .map(function (res) {
            var data = res.json();
            data.request = model;
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /**
     * Generate Invoice
     */
    InvoiceService.prototype.GenerateInvoice = function (accountUniqueName, model) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API_2.GENERATE_INVOICE.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName), model)
            .map(function (res) {
            var data = res.json();
            data.request = '';
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, model); });
    };
    /**
     * get template by uniquename
     * URL:: company/:companyUniqueName/templates-v2/templateUniqueName
     */
    InvoiceService.prototype.GetInvoiceTemplateDetails = function (templateUniqueName) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + invoice_api_1.INVOICE_API_2.GET_INVOICE_TEMPLATE_DETAILS.replace(':companyUniqueName', this.companyUniqueName).replace(':templateUniqueName', templateUniqueName))
            .map(function (res) {
            var data = res.json();
            data.request = templateUniqueName;
            data.queryString = { templateUniqueName: templateUniqueName };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, templateUniqueName); });
    };
    /**
     * Delete invoice
     * URL:: company/:companyUniqueName/invoices/:invoiceUniqueName
     */
    InvoiceService.prototype.DeleteInvoice = function (invoiceNumber) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + invoice_api_1.INVOICE_API.DELETE_INVOICE.replace(':companyUniqueName', this.companyUniqueName).replace(':invoiceNumber', invoiceNumber))
            .map(function (res) {
            var data = res.json();
            data.request = invoiceNumber;
            data.queryString = { invoiceNumber: invoiceNumber };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, invoiceNumber); });
    };
    /**
     * Perform Action On Invoice
     * URL:: company/:companyUniqueName/invoices/:invoiceUniqueName
     */
    InvoiceService.prototype.PerformActionOnInvoice = function (invoiceUniqueName, action) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API.ACTION_ON_INVOICE.replace(':companyUniqueName', this.companyUniqueName).replace(':invoiceUniqueName', invoiceUniqueName), action)
            .map(function (res) {
            var data = res.json();
            data.request = invoiceUniqueName;
            data.queryString = { invoiceUniqueName: invoiceUniqueName, action: action };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e, invoiceUniqueName); });
    };
    /**
     * get invoice setting
     * URL:: company/:companyUniqueName/settings
     */
    InvoiceService.prototype.GetInvoiceSetting = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + invoice_api_1.INVOICE_API.SETTING_INVOICE.replace(':companyUniqueName', this.companyUniqueName))
            .map(function (res) {
            var data = res.json();
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * delete invoice webhook
     * URL:: company/:companyUniqueName/settings/webhooks/:webhookUniqueName
     */
    InvoiceService.prototype.DeleteInvoiceWebhook = function (uniquename) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + invoice_api_1.INVOICE_API.DELETE_WEBHOOK.replace(':companyUniqueName', this.companyUniqueName).replace(':webhookUniquename', uniquename))
            .map(function (res) {
            var data = res.json();
            data.queryString = { uniquename: uniquename };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * update invoice emailId
     * URL:: company/:companyUniqueName/invoice-setting
     */
    InvoiceService.prototype.UpdateInvoiceEmail = function (emailId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + invoice_api_1.INVOICE_API.UPDATE_INVOICE_EMAIL.replace(':companyUniqueName', this.companyUniqueName), { emailAddress: emailId })
            .map(function (res) {
            var data = res.json();
            data.queryString = { emailId: emailId };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Save Invoice Webhook
     * URL:: company/:companyUniqueName/settings/webhooks
     */
    InvoiceService.prototype.SaveInvoiceWebhook = function (webhook) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API.SAVE_INVOICE_WEBHOOK.replace(':companyUniqueName', this.companyUniqueName), webhook)
            .map(function (res) {
            var data = res.json();
            data.queryString = { webhook: webhook };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Update Invoice Setting
     * URL:: company/:companyUniqueName/settings/
     */
    InvoiceService.prototype.UpdateInvoiceSetting = function (form) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + invoice_api_1.INVOICE_API.SETTING_INVOICE.replace(':companyUniqueName', this.companyUniqueName), form)
            .map(function (res) {
            var data = res.json();
            data.queryString = { form: form };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Get razorPay details
     * URL:: company/:companyUniqueName/razorpay
     */
    InvoiceService.prototype.GetRazorPayDetail = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.get(this.config.apiUrl + invoice_api_1.INVOICE_API.GET_RAZORPAY_DETAIL.replace(':companyUniqueName', this.companyUniqueName))
            .map(function (res) {
            var data = res.json();
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Update razorPay details
     * URL:: company/:companyUniqueName/razorpay
     */
    InvoiceService.prototype.UpdateRazorPayDetail = function (form) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var newForm = _.cloneDeep(form);
        newForm.companyName = this.companyUniqueName;
        form = _.cloneDeep(newForm);
        return this._http.put(this.config.apiUrl + invoice_api_1.INVOICE_API.GET_RAZORPAY_DETAIL.replace(':companyUniqueName', this.companyUniqueName), form)
            .map(function (res) {
            var data = res.json();
            data.queryString = { form: form };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Delete razorPay details
     * URL:: company/:companyUniqueName/razorpay
     */
    InvoiceService.prototype.DeleteRazorPayDetail = function () {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.delete(this.config.apiUrl + invoice_api_1.INVOICE_API.GET_RAZORPAY_DETAIL.replace(':companyUniqueName', this.companyUniqueName))
            .map(function (res) {
            var data = res.json();
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Delete Invoice emailID
     * URL:: company/:companyUniqueName/razorpay
     */
    InvoiceService.prototype.DeleteInvoiceEmail = function (emailId) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.put(this.config.apiUrl + invoice_api_1.INVOICE_API.UPDATE_INVOICE_EMAIL.replace(':companyUniqueName', this.companyUniqueName), { emailAddress: emailId })
            .map(function (res) {
            var data = res.json();
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /**
     * Save razorPay details
     * URL:: company/:companyUniqueName/razorpay
     */
    InvoiceService.prototype.SaveRazorPayDetail = function (form) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        var newForm = _.cloneDeep(form);
        newForm.companyName = this.companyUniqueName;
        form = _.cloneDeep(newForm);
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API.GET_RAZORPAY_DETAIL.replace(':companyUniqueName', this.companyUniqueName), form)
            .map(function (res) {
            var data = res.json();
            data.queryString = { form: form };
            return data;
        })
            .catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /*
    * Download Invoice
    * API: 'accounts/:accountUniqueName/invoices/download'
    * Method: POST
    */
    InvoiceService.prototype.DownloadInvoice = function (accountUniqueName, dataToSend) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API_2.DOWNLOAD_INVOICE.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName), dataToSend).map(function (res) {
            var data = res.json();
            data.queryString = { accountUniqueName: accountUniqueName, dataToSend: dataToSend };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    /*
    * Send Invoice On Mail
    * API: 'accounts/:accountUniqueName/invoices/mail'
    * Method: POST
    */
    InvoiceService.prototype.SendInvoiceOnMail = function (accountUniqueName, dataToSend) {
        var _this = this;
        this.user = this._generalService.user;
        this.companyUniqueName = this._generalService.companyUniqueName;
        return this._http.post(this.config.apiUrl + invoice_api_1.INVOICE_API_2.SEND_INVOICE_ON_MAIL.replace(':companyUniqueName', this.companyUniqueName).replace(':accountUniqueName', accountUniqueName), dataToSend).map(function (res) {
            var data = res.json();
            data.queryString = { accountUniqueName: accountUniqueName, dataToSend: dataToSend };
            return data;
        }).catch(function (e) { return _this.errorHandler.HandleCatch(e); });
    };
    return InvoiceService;
}());
InvoiceService = __decorate([
    core_1.Injectable(),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(service_config_1.ServiceConfig)),
    __metadata("design:paramtypes", [catchmanger_1.ErrorHandler, httpWrapper_service_1.HttpWrapperService, general_service_1.GeneralService, Object])
], InvoiceService);
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW52b2ljZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkRBQTJEO0FBQzNELHNDQUE2RDtBQUc3RCwwREFBMEQ7QUFDMUQscURBQW1FO0FBSW5FLDBCQUE0QjtBQUM1QixxREFBbUQ7QUFDbkQsbURBQXFFO0FBR3JFLElBQWEsY0FBYztJQUt6Qix3QkFBb0IsWUFBMEIsRUFBVSxLQUF5QixFQUFVLGVBQStCLEVBQzdFLE1BQTBCO1FBRG5ELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDN0UsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHVDQUFjLEdBQXJCLFVBQXNCLEtBQTZCLEVBQUUsSUFBSTtRQUF6RCxpQkFjQztRQWJDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDaEUsMkJBQTJCO1FBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBVyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBQzthQUNwRixHQUFHLENBQUMsVUFBQyxHQUFHO1lBQ1AsSUFBSSxJQUFJLEdBQWtFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRixJQUFJLENBQUMsT0FB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LEdBQUcsRUFBQyxpQkFBaUIsbUJBQUEsRUFBRSxVQUFVLFlBQUEsRUFBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBaUIsQ0FBQyxDQUFDLEVBQWhELENBQWdELENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUgscUJBQUM7QUFBRCxDQUFDLEFBaFpELElBZ1pDO0FBaFpZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtJQU9SLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGFBQU0sQ0FBQyw4QkFBYSxDQUFDLENBQUE7cUNBREYsMEJBQVksRUFBaUIsd0NBQWtCLEVBQTJCLGdDQUFjO0dBTC9HLGNBQWMsQ0FnWjFCO0FBaFpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBIdHRwV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHBXcmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlckRldGFpbHMgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9sb2dpbk1vZGVscyc7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9CYXNlUmVzcG9uc2UnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuaW1wb3J0IHsgSU5WT0lDRV9BUEksIElOVk9JQ0VfQVBJXzIgfSBmcm9tICcuL2FwaXVybHMvaW52b2ljZS5hcGknO1xuaW1wb3J0IHsgQ29tbW9uUGFnaW5hdGVkUmVxdWVzdCwgR2VuZXJhdGVCdWxrSW52b2ljZVJlcXVlc3QsIEdlbmVyYXRlSW52b2ljZVJlcXVlc3RDbGFzcywgR2V0QWxsTGVkZ2Vyc0Zvckludm9pY2VSZXNwb25zZSwgSUdldEFsbEludm9pY2VzUmVzcG9uc2UsIEludm9pY2VGaWx0ZXJDbGFzcywgSW52b2ljZVRlbXBsYXRlRGV0YWlsc1Jlc3BvbnNlLCBQcmV2aWV3SW52b2ljZVJlcXVlc3QsIFByZXZpZXdJbnZvaWNlUmVzcG9uc2VDbGFzcyB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0ludm9pY2UnO1xuaW1wb3J0IHsgSW52b2ljZVNldHRpbmcgfSBmcm9tICcuLi9tb2RlbHMvaW50ZXJmYWNlcy9pbnZvaWNlLnNldHRpbmcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJhem9yUGF5RGV0YWlsc1Jlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvU2V0dGluZ3NJbnRlZ3JhaW9uJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEdlbmVyYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZywgSVNlcnZpY2VDb25maWdBcmdzIH0gZnJvbSAnLi9zZXJ2aWNlLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnZvaWNlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB1c2VyOiBVc2VyRGV0YWlscztcbiAgcHJpdmF0ZSBjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsIHByaXZhdGUgX2h0dHA6IEh0dHBXcmFwcGVyU2VydmljZSwgcHJpdmF0ZSBfZ2VuZXJhbFNlcnZpY2U6IEdlbmVyYWxTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU2VydmljZUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IElTZXJ2aWNlQ29uZmlnQXJncykge1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBJTlZPSUNFU1xuICAgKiBVUkw6OiBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9pbnZvaWNlcz9mcm9tPSZ0bz1cbiAgICovXG4gIHB1YmxpYyBHZXRBbGxJbnZvaWNlcyhtb2RlbDogQ29tbW9uUGFnaW5hdGVkUmVxdWVzdCwgYm9keSk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPElHZXRBbGxJbnZvaWNlc1Jlc3BvbnNlLCBDb21tb25QYWdpbmF0ZWRSZXF1ZXN0Pj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIC8vIGNyZWF0ZSB1cmwgY29uZGl0aW9uYWxseVxuICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZVF1ZXJ5U3RyaW5nKHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJLkdFVF9BTExfSU5WT0lDRVMsIG1vZGVsKTtcblxuICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodXJsLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLCBib2R5KVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8SUdldEFsbEludm9pY2VzUmVzcG9uc2UsIENvbW1vblBhZ2luYXRlZFJlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5yZXF1ZXN0ID0gbW9kZWw7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7bW9kZWx9O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPElHZXRBbGxJbnZvaWNlc1Jlc3BvbnNlLCBDb21tb25QYWdpbmF0ZWRSZXF1ZXN0PihlLCAnJykpO1xuICB9XG5cbiAgLypcbiAgKiBnZXQgYWxsIExlZGdlcnMgZm9yIEludm9pY2VcbiAgKi9cblxuICBwdWJsaWMgR2V0QWxsTGVkZ2Vyc0Zvckludm9pY2UocmVxT2JqOiBDb21tb25QYWdpbmF0ZWRSZXF1ZXN0LCBtb2RlbDogSW52b2ljZUZpbHRlckNsYXNzKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8R2V0QWxsTGVkZ2Vyc0Zvckludm9pY2VSZXNwb25zZSwgQ29tbW9uUGFnaW5hdGVkUmVxdWVzdD4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICAvLyBjcmVhdGUgdXJsIGNvbmRpdGlvbmFsbHlcbiAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVRdWVyeVN0cmluZyh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSS5HRVRfQUxMX0xFREdFUlNfRk9SX0lOVk9JQ0UsIHJlcU9iaik7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh1cmwucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSksIG1vZGVsKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8R2V0QWxsTGVkZ2Vyc0Zvckludm9pY2VSZXNwb25zZSwgQ29tbW9uUGFnaW5hdGVkUmVxdWVzdD4gPSByZXMuanNvbigpO1xuICAgICAgICBkYXRhLnJlcXVlc3QgPSBtb2RlbDtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtyZXFPYmp9O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPEdldEFsbExlZGdlcnNGb3JJbnZvaWNlUmVzcG9uc2UsIENvbW1vblBhZ2luYXRlZFJlcXVlc3Q+KGUsIHJlcU9iaiwgbW9kZWwpKTtcbiAgfVxuXG4gIC8qXG4gICogZ2V0IHVybCByZWFkeSB3aXRoIHF1ZXJ5c3RyaW5nIHBhcmFtc1xuICAqIHBhc3MgdXJsIGFuZCBtb2RlbCBvYmpcbiAgKi9cblxuICBwdWJsaWMgY3JlYXRlUXVlcnlTdHJpbmcoc3RyLCBtb2RlbCkge1xuICAgIGxldCB1cmwgPSBzdHI7XG4gICAgaWYgKChtb2RlbC5mcm9tKSkge1xuICAgICAgdXJsID0gdXJsICsgJ2Zyb209JyArIG1vZGVsLmZyb20gKyAnJic7XG4gICAgfVxuICAgIGlmICgobW9kZWwudG8pKSB7XG4gICAgICB1cmwgPSB1cmwgKyAndG89JyArIG1vZGVsLnRvICsgJyYnO1xuICAgIH1cbiAgICBpZiAoKG1vZGVsLnBhZ2UpKSB7XG4gICAgICB1cmwgPSB1cmwgKyAncGFnZT0nICsgbW9kZWwucGFnZSArICcmJztcbiAgICB9XG4gICAgaWYgKChtb2RlbC5jb3VudCkpIHtcbiAgICAgIHVybCA9IHVybCArICdjb3VudD0nICsgbW9kZWwuY291bnQ7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICAvKlxuICAqIEdlbmVyYXRlIEJ1bGsgSW52b2ljZVxuICAqIG1ldGhvZDogJ1BPU1QnXG4gICogdXJsOiAnL2NvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL2ludm9pY2VzL2J1bGstZ2VuZXJhdGU/Y29tYmluZWQ9OmNvbWJpbmVkJ1xuICAqL1xuXG4gIHB1YmxpYyBHZW5lcmF0ZUJ1bGtJbnZvaWNlKHJlcU9iajogeyBjb21iaW5lZDogYm9vbGVhbiB9LCBtb2RlbDogR2VuZXJhdGVCdWxrSW52b2ljZVJlcXVlc3RbXSk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgR2VuZXJhdGVCdWxrSW52b2ljZVJlcXVlc3RbXT4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICAvLyBjcmVhdGUgdXJsXG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJLkdFTkVSQVRFX0JVTEtfSU5WT0lDRSArICc9JyArIHJlcU9iai5jb21iaW5lZDtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHVybC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSwgbW9kZWwpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxzdHJpbmcsIEdlbmVyYXRlQnVsa0ludm9pY2VSZXF1ZXN0W10+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5yZXF1ZXN0ID0gbW9kZWw7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7cmVxT2JqfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIEdlbmVyYXRlQnVsa0ludm9pY2VSZXF1ZXN0W10+KGUsIHJlcU9iaiwgbW9kZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQUkVWSUVXIE9GIEdFTkVSQVRFRCBJTlZPSUNFXG4gICAqIFVSTDo6IHYyL2NvbXBhbnkve2NvbXBhbnlVbmlxdWVOYW1lfS9hY2NvdW50cy97YWNjb3VudFVuaXF1ZU5hbWV9L2ludm9pY2VzL3tpbnZvaWNlTnVtYmVyfS9wcmV2aWV3XG4gICAqL1xuICBwdWJsaWMgR2V0R2VuZXJhdGVkSW52b2ljZVByZXZpZXcoYWNjb3VudFVuaXF1ZU5hbWU6IHN0cmluZywgaW52b2ljZU51bWJlcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8UHJldmlld0ludm9pY2VSZXNwb25zZUNsYXNzLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJXzIuR0VORVJBVEVEX0lOVk9JQ0VfUFJFVklFVy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6YWNjb3VudFVuaXF1ZU5hbWUnLCBhY2NvdW50VW5pcXVlTmFtZSkucmVwbGFjZSgnOmludm9pY2VOdW1iZXInLCBpbnZvaWNlTnVtYmVyKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFByZXZpZXdJbnZvaWNlUmVzcG9uc2VDbGFzcywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucmVxdWVzdCA9IGludm9pY2VOdW1iZXI7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7aW52b2ljZU51bWJlciwgYWNjb3VudFVuaXF1ZU5hbWV9O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPFByZXZpZXdJbnZvaWNlUmVzcG9uc2VDbGFzcywgc3RyaW5nPihlLCBpbnZvaWNlTnVtYmVyKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIEdlbmVyYXRlZCBJbnZvaWNlXG4gICAqL1xuICBwdWJsaWMgVXBkYXRlR2VuZXJhdGVkSW52b2ljZShhY2NvdW50VW5pcXVlTmFtZTogc3RyaW5nLCBtb2RlbDogR2VuZXJhdGVJbnZvaWNlUmVxdWVzdENsYXNzKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBHZW5lcmF0ZUludm9pY2VSZXF1ZXN0Q2xhc3M+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJXzIuVVBEQVRFX0dFTkVSQVRFRF9JTlZPSUNFLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLnJlcGxhY2UoJzphY2NvdW50VW5pcXVlTmFtZScsIGFjY291bnRVbmlxdWVOYW1lKSwgbW9kZWwpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxzdHJpbmcsIEdlbmVyYXRlSW52b2ljZVJlcXVlc3RDbGFzcz4gPSByZXMuanNvbigpO1xuICAgICAgICBkYXRhLnJlcXVlc3QgPSBtb2RlbDtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHthY2NvdW50VW5pcXVlTmFtZX07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBHZW5lcmF0ZUludm9pY2VSZXF1ZXN0Q2xhc3M+KGUsIG1vZGVsKSk7XG4gIH1cblxuICAvKlxuICAqIFByZXZpZXcgSW52b2ljZVxuICAqIG1ldGhvZDogJ1BPU1QnXG4gICogdXJsOiAnL2NvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL2FjY291bnRzLzphY2NvdW50VW5pcXVlTmFtZS9pbnZvaWNlcy9wcmV2aWV3J1xuICAqL1xuXG4gIHB1YmxpYyBQcmV2aWV3SW52b2ljZShhY2NvdW50VW5pcXVlTmFtZTogc3RyaW5nLCBtb2RlbDogUHJldmlld0ludm9pY2VSZXF1ZXN0KTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8UHJldmlld0ludm9pY2VSZXNwb25zZUNsYXNzLCBQcmV2aWV3SW52b2ljZVJlcXVlc3Q+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSV8yLlBSRVZJRVdfSU5WT0lDRS5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6YWNjb3VudFVuaXF1ZU5hbWUnLCBhY2NvdW50VW5pcXVlTmFtZSksIG1vZGVsKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8UHJldmlld0ludm9pY2VSZXNwb25zZUNsYXNzLCBQcmV2aWV3SW52b2ljZVJlcXVlc3Q+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5yZXF1ZXN0ID0gbW9kZWw7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8UHJldmlld0ludm9pY2VSZXNwb25zZUNsYXNzLCBQcmV2aWV3SW52b2ljZVJlcXVlc3Q+KGUsIG1vZGVsKSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgSW52b2ljZVxuICAgKi9cbiAgcHVibGljIEdlbmVyYXRlSW52b2ljZShhY2NvdW50VW5pcXVlTmFtZTogc3RyaW5nLCBtb2RlbDogR2VuZXJhdGVJbnZvaWNlUmVxdWVzdENsYXNzKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8R2VuZXJhdGVJbnZvaWNlUmVxdWVzdENsYXNzLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSV8yLkdFTkVSQVRFX0lOVk9JQ0UucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSkucmVwbGFjZSgnOmFjY291bnRVbmlxdWVOYW1lJywgYWNjb3VudFVuaXF1ZU5hbWUpLCBtb2RlbClcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPEdlbmVyYXRlSW52b2ljZVJlcXVlc3RDbGFzcywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucmVxdWVzdCA9ICcnO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPEdlbmVyYXRlSW52b2ljZVJlcXVlc3RDbGFzcywgc3RyaW5nPihlLCBtb2RlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0ZW1wbGF0ZSBieSB1bmlxdWVuYW1lXG4gICAqIFVSTDo6IGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL3RlbXBsYXRlcy12Mi90ZW1wbGF0ZVVuaXF1ZU5hbWVcbiAgICovXG4gIHB1YmxpYyBHZXRJbnZvaWNlVGVtcGxhdGVEZXRhaWxzKHRlbXBsYXRlVW5pcXVlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8SW52b2ljZVRlbXBsYXRlRGV0YWlsc1Jlc3BvbnNlLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJXzIuR0VUX0lOVk9JQ0VfVEVNUExBVEVfREVUQUlMUy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6dGVtcGxhdGVVbmlxdWVOYW1lJywgdGVtcGxhdGVVbmlxdWVOYW1lKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPEludm9pY2VUZW1wbGF0ZURldGFpbHNSZXNwb25zZSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucmVxdWVzdCA9IHRlbXBsYXRlVW5pcXVlTmFtZTtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHt0ZW1wbGF0ZVVuaXF1ZU5hbWV9O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPEludm9pY2VUZW1wbGF0ZURldGFpbHNSZXNwb25zZSwgc3RyaW5nPihlLCB0ZW1wbGF0ZVVuaXF1ZU5hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgaW52b2ljZVxuICAgKiBVUkw6OiBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9pbnZvaWNlcy86aW52b2ljZVVuaXF1ZU5hbWVcbiAgICovXG4gIHB1YmxpYyBEZWxldGVJbnZvaWNlKGludm9pY2VOdW1iZXI6IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSS5ERUxFVEVfSU5WT0lDRS5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6aW52b2ljZU51bWJlcicsIGludm9pY2VOdW1iZXIpKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5yZXF1ZXN0ID0gaW52b2ljZU51bWJlcjtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtpbnZvaWNlTnVtYmVyfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIHN0cmluZz4oZSwgaW52b2ljZU51bWJlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gQWN0aW9uIE9uIEludm9pY2VcbiAgICogVVJMOjogY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvaW52b2ljZXMvOmludm9pY2VVbmlxdWVOYW1lXG4gICAqL1xuICBwdWJsaWMgUGVyZm9ybUFjdGlvbk9uSW52b2ljZShpbnZvaWNlVW5pcXVlTmFtZTogc3RyaW5nLCBhY3Rpb246IHsgYWN0aW9uOiBzdHJpbmcsIGFtb3VudD86IG51bWJlciB9KTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSS5BQ1RJT05fT05fSU5WT0lDRS5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6aW52b2ljZVVuaXF1ZU5hbWUnLCBpbnZvaWNlVW5pcXVlTmFtZSksIGFjdGlvbilcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucmVxdWVzdCA9IGludm9pY2VVbmlxdWVOYW1lO1xuICAgICAgICBkYXRhLnF1ZXJ5U3RyaW5nID0ge2ludm9pY2VVbmlxdWVOYW1lLCBhY3Rpb259O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPHN0cmluZywgc3RyaW5nPihlLCBpbnZvaWNlVW5pcXVlTmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBpbnZvaWNlIHNldHRpbmdcbiAgICogVVJMOjogY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvc2V0dGluZ3NcbiAgICovXG4gIHB1YmxpYyBHZXRJbnZvaWNlU2V0dGluZygpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxJbnZvaWNlU2V0dGluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSS5TRVRUSU5HX0lOVk9JQ0UucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSkpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxJbnZvaWNlU2V0dGluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8SW52b2ljZVNldHRpbmcsIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlbGV0ZSBpbnZvaWNlIHdlYmhvb2tcbiAgICogVVJMOjogY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvc2V0dGluZ3Mvd2ViaG9va3MvOndlYmhvb2tVbmlxdWVOYW1lXG4gICAqL1xuICBwdWJsaWMgRGVsZXRlSW52b2ljZVdlYmhvb2sodW5pcXVlbmFtZSk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSS5ERUxFVEVfV0VCSE9PSy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKS5yZXBsYWNlKCc6d2ViaG9va1VuaXF1ZW5hbWUnLCB1bmlxdWVuYW1lKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7dW5pcXVlbmFtZX07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBzdHJpbmc+KGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgaW52b2ljZSBlbWFpbElkXG4gICAqIFVSTDo6IGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL2ludm9pY2Utc2V0dGluZ1xuICAgKi9cbiAgcHVibGljIFVwZGF0ZUludm9pY2VFbWFpbChlbWFpbElkKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJLlVQREFURV9JTlZPSUNFX0VNQUlMLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLCB7ZW1haWxBZGRyZXNzOiBlbWFpbElkfSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7ZW1haWxJZH07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBzdHJpbmc+KGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIEludm9pY2UgV2ViaG9va1xuICAgKiBVUkw6OiBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9zZXR0aW5ncy93ZWJob29rc1xuICAgKi9cbiAgcHVibGljIFNhdmVJbnZvaWNlV2ViaG9vayh3ZWJob29rKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSS5TQVZFX0lOVk9JQ0VfV0VCSE9PSy5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSwgd2ViaG9vaylcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7d2ViaG9va307XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBzdHJpbmc+KGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgSW52b2ljZSBTZXR0aW5nXG4gICAqIFVSTDo6IGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL3NldHRpbmdzL1xuICAgKi9cbiAgcHVibGljIFVwZGF0ZUludm9pY2VTZXR0aW5nKGZvcm0pOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WT0lDRV9BUEkuU0VUVElOR19JTlZPSUNFLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLCBmb3JtKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtmb3JtfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCByYXpvclBheSBkZXRhaWxzXG4gICAqIFVSTDo6IGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL3Jhem9ycGF5XG4gICAqL1xuICBwdWJsaWMgR2V0UmF6b3JQYXlEZXRhaWwoKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8UmF6b3JQYXlEZXRhaWxzUmVzcG9uc2UsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WT0lDRV9BUEkuR0VUX1JBWk9SUEFZX0RFVEFJTC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFJhem9yUGF5RGV0YWlsc1Jlc3BvbnNlLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxSYXpvclBheURldGFpbHNSZXNwb25zZSwgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHJhem9yUGF5IGRldGFpbHNcbiAgICogVVJMOjogY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvcmF6b3JwYXlcbiAgICovXG4gIHB1YmxpYyBVcGRhdGVSYXpvclBheURldGFpbChmb3JtKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8UmF6b3JQYXlEZXRhaWxzUmVzcG9uc2UsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICBsZXQgbmV3Rm9ybSA9IF8uY2xvbmVEZWVwKGZvcm0pO1xuICAgIG5ld0Zvcm0uY29tcGFueU5hbWUgPSB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIGZvcm0gPSBfLmNsb25lRGVlcChuZXdGb3JtKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WT0lDRV9BUEkuR0VUX1JBWk9SUEFZX0RFVEFJTC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSwgZm9ybSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPFJhem9yUGF5RGV0YWlsc1Jlc3BvbnNlLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgZGF0YS5xdWVyeVN0cmluZyA9IHtmb3JtfTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxSYXpvclBheURldGFpbHNSZXNwb25zZSwgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIHJhem9yUGF5IGRldGFpbHNcbiAgICogVVJMOjogY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvcmF6b3JwYXlcbiAgICovXG4gIHB1YmxpYyBEZWxldGVSYXpvclBheURldGFpbCgpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpVXJsICsgSU5WT0lDRV9BUEkuR0VUX1JBWk9SUEFZX0RFVEFJTC5yZXBsYWNlKCc6Y29tcGFueVVuaXF1ZU5hbWUnLCB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YTogQmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8c3RyaW5nLCBzdHJpbmc+KGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgSW52b2ljZSBlbWFpbElEXG4gICAqIFVSTDo6IGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL3Jhem9ycGF5XG4gICAqL1xuICBwdWJsaWMgRGVsZXRlSW52b2ljZUVtYWlsKGVtYWlsSWQpOiBPYnNlcnZhYmxlPEJhc2VSZXNwb25zZTxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodGhpcy5jb25maWcuYXBpVXJsICsgSU5WT0lDRV9BUEkuVVBEQVRFX0lOVk9JQ0VfRU1BSUwucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSksIHtlbWFpbEFkZHJlc3M6IGVtYWlsSWR9KVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxzdHJpbmcsIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgcmF6b3JQYXkgZGV0YWlsc1xuICAgKiBVUkw6OiBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9yYXpvcnBheVxuICAgKi9cbiAgcHVibGljIFNhdmVSYXpvclBheURldGFpbChmb3JtKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8UmF6b3JQYXlEZXRhaWxzUmVzcG9uc2UsIHN0cmluZz4+IHtcbiAgICB0aGlzLnVzZXIgPSB0aGlzLl9nZW5lcmFsU2VydmljZS51c2VyO1xuICAgIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmFsU2VydmljZS5jb21wYW55VW5pcXVlTmFtZTtcbiAgICBsZXQgbmV3Rm9ybSA9IF8uY2xvbmVEZWVwKGZvcm0pO1xuICAgIG5ld0Zvcm0uY29tcGFueU5hbWUgPSB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIGZvcm0gPSBfLmNsb25lRGVlcChuZXdGb3JtKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaVVybCArIElOVk9JQ0VfQVBJLkdFVF9SQVpPUlBBWV9ERVRBSUwucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgdGhpcy5jb21wYW55VW5pcXVlTmFtZSksIGZvcm0pXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdGE6IEJhc2VSZXNwb25zZTxSYXpvclBheURldGFpbHNSZXNwb25zZSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4gICAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7Zm9ybX07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuSGFuZGxlQ2F0Y2g8UmF6b3JQYXlEZXRhaWxzUmVzcG9uc2UsIHN0cmluZz4oZSkpO1xuICB9XG5cbiAgLypcbiAgKiBEb3dubG9hZCBJbnZvaWNlXG4gICogQVBJOiAnYWNjb3VudHMvOmFjY291bnRVbmlxdWVOYW1lL2ludm9pY2VzL2Rvd25sb2FkJ1xuICAqIE1ldGhvZDogUE9TVFxuICAqL1xuICBwdWJsaWMgRG93bmxvYWRJbnZvaWNlKGFjY291bnRVbmlxdWVOYW1lOiBzdHJpbmcsIGRhdGFUb1NlbmQ6IHsgaW52b2ljZU51bWJlcjogc3RyaW5nW10gfSk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRoaXMudXNlciA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLnVzZXI7XG4gICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHRoaXMuX2dlbmVyYWxTZXJ2aWNlLmNvbXBhbnlVbmlxdWVOYW1lO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5jb25maWcuYXBpVXJsICsgSU5WT0lDRV9BUElfMi5ET1dOTE9BRF9JTlZPSUNFLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLnJlcGxhY2UoJzphY2NvdW50VW5pcXVlTmFtZScsIGFjY291bnRVbmlxdWVOYW1lKSwgZGF0YVRvU2VuZCkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7YWNjb3VudFVuaXF1ZU5hbWUsIGRhdGFUb1NlbmR9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPHN0cmluZywgc3RyaW5nPihlKSk7XG4gIH1cblxuICAvKlxuICAqIFNlbmQgSW52b2ljZSBPbiBNYWlsXG4gICogQVBJOiAnYWNjb3VudHMvOmFjY291bnRVbmlxdWVOYW1lL2ludm9pY2VzL21haWwnXG4gICogTWV0aG9kOiBQT1NUXG4gICovXG4gIHB1YmxpYyBTZW5kSW52b2ljZU9uTWFpbChhY2NvdW50VW5pcXVlTmFtZTogc3RyaW5nLCBkYXRhVG9TZW5kOiB7IGVtYWlsSWQ6IHN0cmluZ1tdLCBpbnZvaWNlTnVtYmVyOiBzdHJpbmdbXSB9KTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UudXNlcjtcbiAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhbFNlcnZpY2UuY29tcGFueVVuaXF1ZU5hbWU7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGlVcmwgKyBJTlZPSUNFX0FQSV8yLlNFTkRfSU5WT0lDRV9PTl9NQUlMLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpLnJlcGxhY2UoJzphY2NvdW50VW5pcXVlTmFtZScsIGFjY291bnRVbmlxdWVOYW1lKSwgZGF0YVRvU2VuZCkubWFwKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbiAgICAgIGRhdGEucXVlcnlTdHJpbmcgPSB7YWNjb3VudFVuaXF1ZU5hbWUsIGRhdGFUb1NlbmR9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPHN0cmluZywgc3RyaW5nPihlKSk7XG4gIH1cblxufVxuIl19