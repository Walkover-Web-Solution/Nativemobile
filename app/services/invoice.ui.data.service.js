"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Invoice_1 = require("../models/api-models/Invoice");
var _ = require("lodash");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var TemplateContentUISectionVisibility = (function () {
    function TemplateContentUISectionVisibility() {
        this.header = true;
        this.table = false;
        this.footer = false;
    }
    return TemplateContentUISectionVisibility;
}());
exports.TemplateContentUISectionVisibility = TemplateContentUISectionVisibility;
var InvoiceUiDataService = (function () {
    function InvoiceUiDataService() {
        this.customTemplate = new BehaviorSubject_1.BehaviorSubject(new Invoice_1.CustomTemplateResponse());
        this.isLogoVisible = new Subject_1.Subject();
        this.isCompanyNameVisible = new Subject_1.Subject();
        this.logoPath = new Subject_1.Subject();
        this.selectedSection = new Subject_1.Subject();
        // Current company real values
        this.companyGSTIN = new BehaviorSubject_1.BehaviorSubject(null);
        this.companyPAN = new BehaviorSubject_1.BehaviorSubject(null);
        //
    }
    /**
     * initCustomTemplate
     */
    InvoiceUiDataService.prototype.initCustomTemplate = function (companyUniqueName, companies, defaultTemplate) {
        if (companyUniqueName === void 0) { companyUniqueName = ''; }
        if (companies === void 0) { companies = []; }
        this.isLogoVisible.next(true);
        var uniqueName = companyUniqueName;
        var currentCompany = companies.find(function (company) { return company.uniqueName === uniqueName; });
        if (currentCompany) {
            this.companyName = currentCompany.name;
            this.companyAddress = currentCompany.address;
            if (currentCompany.gstDetails[0]) {
                this.companyGSTIN.next(currentCompany.gstDetails[0].gstNumber);
            }
            if (currentCompany.panNumber) {
                this.companyPAN.next(currentCompany.panNumber);
            }
        }
        this.isCompanyNameVisible.next(true);
        if (defaultTemplate) {
            if (this.companyName) {
                defaultTemplate.sections[0].content[0].label = this.companyName;
                defaultTemplate.sections[2].content[9].label = this.companyName;
            }
            if (this.companyAddress) {
                defaultTemplate.sections[2].content[7].label = this.companyAddress;
            }
            this.customTemplate.next(_.cloneDeep(defaultTemplate));
        }
        this.selectedSection.next({
            header: true,
            table: false,
            footer: false
        });
    };
    /**
     * setCustomTemplate
     */
    InvoiceUiDataService.prototype.setCustomTemplate = function (template) {
        this.customTemplate.next(template);
    };
    /**
     * setLogoVisibility
     */
    InvoiceUiDataService.prototype.setLogoVisibility = function (value) {
        this.isLogoVisible.next(value);
    };
    /**
     * setCompanyNameVisibility
     */
    InvoiceUiDataService.prototype.setCompanyNameVisibility = function (value) {
        this.isCompanyNameVisible.next(value);
    };
    /**
     * setLogoPath
     */
    InvoiceUiDataService.prototype.setLogoPath = function (path) {
        this.logoPath.next(path);
    };
    /**
     * setSelectedSection
     */
    InvoiceUiDataService.prototype.setSelectedSection = function (section) {
        var state = {
            header: false,
            table: false,
            footer: false
        };
        state[section] = true;
        this.selectedSection.next(state);
    };
    /**
     * resetCustomTemplate
     */
    InvoiceUiDataService.prototype.resetCustomTemplate = function () {
        this.customTemplate.next(new Invoice_1.CustomTemplateResponse());
    };
    InvoiceUiDataService.prototype.BRToNewLine = function (template) {
        template.sections[2].content[5].label = template.sections[2].content[5].label.replace(/<br\s*[\/]?>/gi, '\n');
        template.sections[2].content[6].label = template.sections[2].content[6].label.replace(/<br\s*[\/]?>/gi, '\n');
        template.sections[2].content[9].label = template.sections[2].content[9].label.replace(/<br\s*[\/]?>/gi, '\n');
        return template;
    };
    /**
     * setTemplateUniqueName
     */
    InvoiceUiDataService.prototype.setTemplateUniqueName = function (uniqueName, mode, customCreatedTemplates, defaultTemplate) {
        if (customCreatedTemplates === void 0) { customCreatedTemplates = []; }
        if (customCreatedTemplates && customCreatedTemplates.length) {
            var allTemplates = _.cloneDeep(customCreatedTemplates);
            var selectedTemplate = allTemplates.find(function (template) { return template.uniqueName === uniqueName; });
            if (selectedTemplate) {
                // mode === 'create' &&
                if ((selectedTemplate.sections[0].content[9].field !== 'trackingNumber' || selectedTemplate.sections[1].content[4].field !== 'description') && defaultTemplate) {
                    selectedTemplate.sections = _.cloneDeep(defaultTemplate.sections);
                }
                if (selectedTemplate.sections[0].content[0].display) {
                    this.isCompanyNameVisible.next(true);
                }
                if (this.companyName && mode === 'create') {
                    selectedTemplate.sections[2].content[9].label = this.companyName;
                }
                if (this.companyAddress && mode === 'create') {
                    selectedTemplate.sections[2].content[7].label = this.companyAddress;
                }
                selectedTemplate.sections[0].content[0].label = this.companyName;
                if (!selectedTemplate.logoUniqueName) {
                    this.isLogoVisible.next(false);
                }
                else {
                    this.isLogoVisible.next(true);
                }
                if (selectedTemplate.sections[0].content.length === 24) {
                    selectedTemplate.sections[0].content[24] = {
                        display: true,
                        label: 'Attention To',
                        field: 'attentionTo',
                        width: null
                    };
                }
                selectedTemplate = this.BRToNewLine(selectedTemplate);
                // console.log('THe selected template is :', selectedTemplate);
                this.customTemplate.next(_.cloneDeep(selectedTemplate));
            }
            if (selectedTemplate.sections[0].content.length === 24) {
                selectedTemplate.sections[0].content[24] = {
                    display: true,
                    label: 'Attention To',
                    field: 'attentionTo',
                    width: null
                };
            }
            selectedTemplate = this.BRToNewLine(selectedTemplate);
            // console.log('THe selected template is :', selectedTemplate);
            this.customTemplate.next(_.cloneDeep(selectedTemplate));
        }
    };
    return InvoiceUiDataService;
}());
InvoiceUiDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], InvoiceUiDataService);
exports.InvoiceUiDataService = InvoiceUiDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS51aS5kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZvaWNlLnVpLmRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyx3Q0FBdUM7QUFDdkMsd0RBQXNFO0FBQ3RFLDBCQUE0QjtBQUM1Qix3REFBdUQ7QUFHdkQ7SUFBQTtRQUNTLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixXQUFNLEdBQVksS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFBRCx5Q0FBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksZ0ZBQWtDO0FBUS9DLElBQWEsb0JBQW9CO0lBYy9CO1FBWk8sbUJBQWMsR0FBNEMsSUFBSSxpQ0FBZSxDQUFDLElBQUksZ0NBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQzVHLGtCQUFhLEdBQXFCLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ2hELHlCQUFvQixHQUFxQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUN2RCxhQUFRLEdBQW9CLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzFDLG9CQUFlLEdBQWdELElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ3BGLDhCQUE4QjtRQUN2QixpQkFBWSxHQUE0QixJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsZUFBVSxHQUE0QixJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFNckUsRUFBRTtJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLGlEQUFrQixHQUF6QixVQUEwQixpQkFBOEIsRUFBRSxTQUFpQyxFQUFFLGVBQXVDO1FBQTFHLGtDQUFBLEVBQUEsc0JBQThCO1FBQUUsMEJBQUEsRUFBQSxjQUFpQztRQUN6RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUNwRixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztZQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNoRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3JFLENBQUM7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGdEQUFpQixHQUF4QixVQUF5QixRQUFnQztRQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxnREFBaUIsR0FBeEIsVUFBeUIsS0FBYztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1REFBd0IsR0FBL0IsVUFBZ0MsS0FBYztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLDBDQUFXLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaURBQWtCLEdBQXpCLFVBQTBCLE9BQWU7UUFDdkMsSUFBSSxLQUFLLEdBQUc7WUFDVixNQUFNLEVBQUUsS0FBSztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDO1FBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrREFBbUIsR0FBMUI7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGdDQUFzQixFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sMENBQVcsR0FBbEIsVUFBbUIsUUFBUTtRQUN6QixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLG9EQUFxQixHQUE1QixVQUE2QixVQUFrQixFQUFFLElBQVksRUFBRSxzQkFBcUQsRUFBRSxlQUF1QztRQUE5Rix1Q0FBQSxFQUFBLDJCQUFxRDtRQUNsSCxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN2RCxJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBRTNGLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDckIsdUJBQXVCO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQy9KLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEUsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbkUsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUN0RSxDQUFDO2dCQUNELGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRzt3QkFDekMsT0FBTyxFQUFFLElBQUk7d0JBQ2IsS0FBSyxFQUFFLGNBQWM7d0JBQ3JCLEtBQUssRUFBRSxhQUFhO3dCQUNwQixLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2dCQUNKLENBQUM7Z0JBRUQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN0RCwrREFBK0Q7Z0JBRS9ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHO29CQUN6QyxPQUFPLEVBQUUsSUFBSTtvQkFDYixLQUFLLEVBQUUsY0FBYztvQkFDckIsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLEtBQUssRUFBRSxJQUFJO2lCQUNaLENBQUM7WUFDSixDQUFDO1lBRUQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RELCtEQUErRDtZQUUvRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQXpLRCxJQXlLQztBQXpLWSxvQkFBb0I7SUFGaEMsaUJBQVUsRUFBRTs7R0FFQSxvQkFBb0IsQ0F5S2hDO0FBektZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQ3VzdG9tVGVtcGxhdGVSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0ludm9pY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgQ29tcGFueVJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2FwaS1tb2RlbHMvQ29tcGFueSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUNvbnRlbnRVSVNlY3Rpb25WaXNpYmlsaXR5IHtcbiAgcHVibGljIGhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyB0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZm9vdGVyOiBib29sZWFuID0gZmFsc2U7XG59XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIEludm9pY2VVaURhdGFTZXJ2aWNlIHtcblxuICBwdWJsaWMgY3VzdG9tVGVtcGxhdGU6IEJlaGF2aW9yU3ViamVjdDxDdXN0b21UZW1wbGF0ZVJlc3BvbnNlPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobmV3IEN1c3RvbVRlbXBsYXRlUmVzcG9uc2UoKSk7XG4gIHB1YmxpYyBpc0xvZ29WaXNpYmxlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGlzQ29tcGFueU5hbWVWaXNpYmxlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGxvZ29QYXRoOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgc2VsZWN0ZWRTZWN0aW9uOiBTdWJqZWN0PFRlbXBsYXRlQ29udGVudFVJU2VjdGlvblZpc2liaWxpdHk+ID0gbmV3IFN1YmplY3QoKTtcbiAgLy8gQ3VycmVudCBjb21wYW55IHJlYWwgdmFsdWVzXG4gIHB1YmxpYyBjb21wYW55R1NUSU46IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgcHVibGljIGNvbXBhbnlQQU46IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcblxuICBwcml2YXRlIGNvbXBhbnlOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgY29tcGFueUFkZHJlc3M6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXRDdXN0b21UZW1wbGF0ZVxuICAgKi9cbiAgcHVibGljIGluaXRDdXN0b21UZW1wbGF0ZShjb21wYW55VW5pcXVlTmFtZTogc3RyaW5nID0gJycsIGNvbXBhbmllczogQ29tcGFueVJlc3BvbnNlW10gPSBbXSwgZGVmYXVsdFRlbXBsYXRlOiBDdXN0b21UZW1wbGF0ZVJlc3BvbnNlKSB7XG4gICAgdGhpcy5pc0xvZ29WaXNpYmxlLm5leHQodHJ1ZSk7XG4gICAgbGV0IHVuaXF1ZU5hbWUgPSBjb21wYW55VW5pcXVlTmFtZTtcbiAgICBsZXQgY3VycmVudENvbXBhbnkgPSBjb21wYW5pZXMuZmluZCgoY29tcGFueSkgPT4gY29tcGFueS51bmlxdWVOYW1lID09PSB1bmlxdWVOYW1lKTtcbiAgICBpZiAoY3VycmVudENvbXBhbnkpIHtcbiAgICAgIHRoaXMuY29tcGFueU5hbWUgPSBjdXJyZW50Q29tcGFueS5uYW1lO1xuICAgICAgdGhpcy5jb21wYW55QWRkcmVzcyA9IGN1cnJlbnRDb21wYW55LmFkZHJlc3M7XG4gICAgICBpZiAoY3VycmVudENvbXBhbnkuZ3N0RGV0YWlsc1swXSkge1xuICAgICAgICB0aGlzLmNvbXBhbnlHU1RJTi5uZXh0KGN1cnJlbnRDb21wYW55LmdzdERldGFpbHNbMF0uZ3N0TnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29tcGFueS5wYW5OdW1iZXIpIHtcbiAgICAgICAgdGhpcy5jb21wYW55UEFOLm5leHQoY3VycmVudENvbXBhbnkucGFuTnVtYmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc0NvbXBhbnlOYW1lVmlzaWJsZS5uZXh0KHRydWUpO1xuICAgIGlmIChkZWZhdWx0VGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmNvbXBhbnlOYW1lKSB7XG4gICAgICAgIGRlZmF1bHRUZW1wbGF0ZS5zZWN0aW9uc1swXS5jb250ZW50WzBdLmxhYmVsID0gdGhpcy5jb21wYW55TmFtZTtcbiAgICAgICAgZGVmYXVsdFRlbXBsYXRlLnNlY3Rpb25zWzJdLmNvbnRlbnRbOV0ubGFiZWwgPSB0aGlzLmNvbXBhbnlOYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY29tcGFueUFkZHJlc3MpIHtcbiAgICAgICAgZGVmYXVsdFRlbXBsYXRlLnNlY3Rpb25zWzJdLmNvbnRlbnRbN10ubGFiZWwgPSB0aGlzLmNvbXBhbnlBZGRyZXNzO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXN0b21UZW1wbGF0ZS5uZXh0KF8uY2xvbmVEZWVwKGRlZmF1bHRUZW1wbGF0ZSkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uLm5leHQoe1xuICAgICAgaGVhZGVyOiB0cnVlLFxuICAgICAgdGFibGU6IGZhbHNlLFxuICAgICAgZm9vdGVyOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldEN1c3RvbVRlbXBsYXRlXG4gICAqL1xuICBwdWJsaWMgc2V0Q3VzdG9tVGVtcGxhdGUodGVtcGxhdGU6IEN1c3RvbVRlbXBsYXRlUmVzcG9uc2UpIHtcbiAgICB0aGlzLmN1c3RvbVRlbXBsYXRlLm5leHQodGVtcGxhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldExvZ29WaXNpYmlsaXR5XG4gICAqL1xuICBwdWJsaWMgc2V0TG9nb1Zpc2liaWxpdHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlzTG9nb1Zpc2libGUubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q29tcGFueU5hbWVWaXNpYmlsaXR5XG4gICAqL1xuICBwdWJsaWMgc2V0Q29tcGFueU5hbWVWaXNpYmlsaXR5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc0NvbXBhbnlOYW1lVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRMb2dvUGF0aFxuICAgKi9cbiAgcHVibGljIHNldExvZ29QYXRoKHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMubG9nb1BhdGgubmV4dChwYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRTZWxlY3RlZFNlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBzZXRTZWxlY3RlZFNlY3Rpb24oc2VjdGlvbjogc3RyaW5nKSB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgaGVhZGVyOiBmYWxzZSxcbiAgICAgIHRhYmxlOiBmYWxzZSxcbiAgICAgIGZvb3RlcjogZmFsc2VcbiAgICB9O1xuICAgIHN0YXRlW3NlY3Rpb25dID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbi5uZXh0KHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldEN1c3RvbVRlbXBsYXRlXG4gICAqL1xuICBwdWJsaWMgcmVzZXRDdXN0b21UZW1wbGF0ZSgpIHtcbiAgICB0aGlzLmN1c3RvbVRlbXBsYXRlLm5leHQobmV3IEN1c3RvbVRlbXBsYXRlUmVzcG9uc2UoKSk7XG4gIH1cblxuICBwdWJsaWMgQlJUb05ld0xpbmUodGVtcGxhdGUpIHtcbiAgICB0ZW1wbGF0ZS5zZWN0aW9uc1syXS5jb250ZW50WzVdLmxhYmVsID0gdGVtcGxhdGUuc2VjdGlvbnNbMl0uY29udGVudFs1XS5sYWJlbC5yZXBsYWNlKC88YnJcXHMqW1xcL10/Pi9naSwgJ1xcbicpO1xuICAgIHRlbXBsYXRlLnNlY3Rpb25zWzJdLmNvbnRlbnRbNl0ubGFiZWwgPSB0ZW1wbGF0ZS5zZWN0aW9uc1syXS5jb250ZW50WzZdLmxhYmVsLnJlcGxhY2UoLzxiclxccypbXFwvXT8+L2dpLCAnXFxuJyk7XG4gICAgdGVtcGxhdGUuc2VjdGlvbnNbMl0uY29udGVudFs5XS5sYWJlbCA9IHRlbXBsYXRlLnNlY3Rpb25zWzJdLmNvbnRlbnRbOV0ubGFiZWwucmVwbGFjZSgvPGJyXFxzKltcXC9dPz4vZ2ksICdcXG4nKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICAvKipcbiAgICogc2V0VGVtcGxhdGVVbmlxdWVOYW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGVtcGxhdGVVbmlxdWVOYW1lKHVuaXF1ZU5hbWU6IHN0cmluZywgbW9kZTogc3RyaW5nLCBjdXN0b21DcmVhdGVkVGVtcGxhdGVzOiBDdXN0b21UZW1wbGF0ZVJlc3BvbnNlW10gPSBbXSwgZGVmYXVsdFRlbXBsYXRlOiBDdXN0b21UZW1wbGF0ZVJlc3BvbnNlKSB7XG4gICAgaWYgKGN1c3RvbUNyZWF0ZWRUZW1wbGF0ZXMgJiYgY3VzdG9tQ3JlYXRlZFRlbXBsYXRlcy5sZW5ndGgpIHtcbiAgICAgIGxldCBhbGxUZW1wbGF0ZXMgPSBfLmNsb25lRGVlcChjdXN0b21DcmVhdGVkVGVtcGxhdGVzKTtcbiAgICAgIGxldCBzZWxlY3RlZFRlbXBsYXRlID0gYWxsVGVtcGxhdGVzLmZpbmQoKHRlbXBsYXRlKSA9PiB0ZW1wbGF0ZS51bmlxdWVOYW1lID09PSB1bmlxdWVOYW1lKTtcblxuICAgICAgaWYgKHNlbGVjdGVkVGVtcGxhdGUpIHtcbiAgICAgICAgLy8gbW9kZSA9PT0gJ2NyZWF0ZScgJiZcbiAgICAgICAgaWYgKChzZWxlY3RlZFRlbXBsYXRlLnNlY3Rpb25zWzBdLmNvbnRlbnRbOV0uZmllbGQgIT09ICd0cmFja2luZ051bWJlcicgfHwgc2VsZWN0ZWRUZW1wbGF0ZS5zZWN0aW9uc1sxXS5jb250ZW50WzRdLmZpZWxkICE9PSAnZGVzY3JpcHRpb24nKSAmJiBkZWZhdWx0VGVtcGxhdGUpIHsgLy8gdGhpcyBpcyBkZWZhdWx0KG9sZCkgdGVtcGxhdGVcbiAgICAgICAgICBzZWxlY3RlZFRlbXBsYXRlLnNlY3Rpb25zID0gXy5jbG9uZURlZXAoZGVmYXVsdFRlbXBsYXRlLnNlY3Rpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZFRlbXBsYXRlLnNlY3Rpb25zWzBdLmNvbnRlbnRbMF0uZGlzcGxheSkge1xuICAgICAgICAgIHRoaXMuaXNDb21wYW55TmFtZVZpc2libGUubmV4dCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb21wYW55TmFtZSAmJiBtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICAgIHNlbGVjdGVkVGVtcGxhdGUuc2VjdGlvbnNbMl0uY29udGVudFs5XS5sYWJlbCA9IHRoaXMuY29tcGFueU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29tcGFueUFkZHJlc3MgJiYgbW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICBzZWxlY3RlZFRlbXBsYXRlLnNlY3Rpb25zWzJdLmNvbnRlbnRbN10ubGFiZWwgPSB0aGlzLmNvbXBhbnlBZGRyZXNzO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGVkVGVtcGxhdGUuc2VjdGlvbnNbMF0uY29udGVudFswXS5sYWJlbCA9IHRoaXMuY29tcGFueU5hbWU7XG4gICAgICAgIGlmICghc2VsZWN0ZWRUZW1wbGF0ZS5sb2dvVW5pcXVlTmFtZSkge1xuICAgICAgICAgIHRoaXMuaXNMb2dvVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzTG9nb1Zpc2libGUubmV4dCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZFRlbXBsYXRlLnNlY3Rpb25zWzBdLmNvbnRlbnQubGVuZ3RoID09PSAyNCkge1xuICAgICAgICAgIHNlbGVjdGVkVGVtcGxhdGUuc2VjdGlvbnNbMF0uY29udGVudFsyNF0gPSB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICAgICAgbGFiZWw6ICdBdHRlbnRpb24gVG8nLFxuICAgICAgICAgICAgZmllbGQ6ICdhdHRlbnRpb25UbycsXG4gICAgICAgICAgICB3aWR0aDogbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RlZFRlbXBsYXRlID0gdGhpcy5CUlRvTmV3TGluZShzZWxlY3RlZFRlbXBsYXRlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1RIZSBzZWxlY3RlZCB0ZW1wbGF0ZSBpcyA6Jywgc2VsZWN0ZWRUZW1wbGF0ZSk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21UZW1wbGF0ZS5uZXh0KF8uY2xvbmVEZWVwKHNlbGVjdGVkVGVtcGxhdGUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdGVkVGVtcGxhdGUuc2VjdGlvbnNbMF0uY29udGVudC5sZW5ndGggPT09IDI0KSB7XG4gICAgICAgIHNlbGVjdGVkVGVtcGxhdGUuc2VjdGlvbnNbMF0uY29udGVudFsyNF0gPSB7XG4gICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICBsYWJlbDogJ0F0dGVudGlvbiBUbycsXG4gICAgICAgICAgZmllbGQ6ICdhdHRlbnRpb25UbycsXG4gICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgc2VsZWN0ZWRUZW1wbGF0ZSA9IHRoaXMuQlJUb05ld0xpbmUoc2VsZWN0ZWRUZW1wbGF0ZSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnVEhlIHNlbGVjdGVkIHRlbXBsYXRlIGlzIDonLCBzZWxlY3RlZFRlbXBsYXRlKTtcblxuICAgICAgdGhpcy5jdXN0b21UZW1wbGF0ZS5uZXh0KF8uY2xvbmVEZWVwKHNlbGVjdGVkVGVtcGxhdGUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==