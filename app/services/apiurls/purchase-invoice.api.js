"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COMMON = 'company/:companyUniqueName/';
exports.PURCHASE_INVOICE_API = {
    INVOICE_API: COMMON + 'invoices/purchase',
    // GSTR_excel_export
    GET_TAXES: COMMON + 'tax',
    GENERATE_PURCHASE_INVOICE: COMMON + 'accounts/:accountUniqueName/' + 'invoices/generate-purchase',
    UPDATE_PURCHASE_ENTRY: COMMON + 'accounts/:accountUniqueName/' + 'ledgers/:ledgerUniqueName',
    DOWNLOAD_GSTR1_SHEET: COMMON + 'gstreturn/:report_sheet_Type?monthYear=:month&gstin=:company_gstin',
    DOWNLOAD_GSTR1_ERROR_SHEET: COMMON + 'gstreturn/:error_sheet_Type?monthYear=:month&gstin=:company_gstin',
    UPDATE_INVOICE: COMMON + 'accounts/:accountUniqueName/' + 'invoices/generate-purchase/:invoiceUniqueName',
    DOWNLOAD_GSTR2_SHEET: COMMON + 'gstreturn/gstr2_data/file?monthYear=:month&gstin=:company_gstin',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2UtaW52b2ljZS5hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwdXJjaGFzZS1pbnZvaWNlLmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQU0sTUFBTSxHQUFHLDZCQUE2QixDQUFDO0FBRWhDLFFBQUEsb0JBQW9CLEdBQUc7SUFDbEMsV0FBVyxFQUFFLE1BQU0sR0FBRyxtQkFBbUI7SUFDekMsb0JBQW9CO0lBQ3BCLFNBQVMsRUFBRSxNQUFNLEdBQUcsS0FBSztJQUN6Qix5QkFBeUIsRUFBRSxNQUFNLEdBQUcsOEJBQThCLEdBQUcsNEJBQTRCO0lBQ2pHLHFCQUFxQixFQUFFLE1BQU0sR0FBRyw4QkFBOEIsR0FBRywyQkFBMkI7SUFDNUYsb0JBQW9CLEVBQUUsTUFBTSxHQUFHLG9FQUFvRTtJQUNuRywwQkFBMEIsRUFBRSxNQUFNLEdBQUcsbUVBQW1FO0lBQ3hHLGNBQWMsRUFBRSxNQUFNLEdBQUcsOEJBQThCLEdBQUcsK0NBQStDO0lBQ3pHLG9CQUFvQixFQUFFLE1BQU0sR0FBRyxpRUFBaUU7Q0FDakcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgQ09NTU9OID0gJ2NvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lLyc7XG5cbmV4cG9ydCBjb25zdCBQVVJDSEFTRV9JTlZPSUNFX0FQSSA9IHtcbiAgSU5WT0lDRV9BUEk6IENPTU1PTiArICdpbnZvaWNlcy9wdXJjaGFzZScsICAvLyBHRVQgQU5EIFBVVCBjYWxsXG4gIC8vIEdTVFJfZXhjZWxfZXhwb3J0XG4gIEdFVF9UQVhFUzogQ09NTU9OICsgJ3RheCcsIC8vIEdFVFxuICBHRU5FUkFURV9QVVJDSEFTRV9JTlZPSUNFOiBDT01NT04gKyAnYWNjb3VudHMvOmFjY291bnRVbmlxdWVOYW1lLycgKyAnaW52b2ljZXMvZ2VuZXJhdGUtcHVyY2hhc2UnLFxuICBVUERBVEVfUFVSQ0hBU0VfRU5UUlk6IENPTU1PTiArICdhY2NvdW50cy86YWNjb3VudFVuaXF1ZU5hbWUvJyArICdsZWRnZXJzLzpsZWRnZXJVbmlxdWVOYW1lJyxcbiAgRE9XTkxPQURfR1NUUjFfU0hFRVQ6IENPTU1PTiArICdnc3RyZXR1cm4vOnJlcG9ydF9zaGVldF9UeXBlP21vbnRoWWVhcj06bW9udGgmZ3N0aW49OmNvbXBhbnlfZ3N0aW4nLCAvLyBHRVQgZ3N0cjFfZXhjZWxfZXhwb3J0IHx8IGdzdHIyX2V4Y2VsX2V4cG9ydFxuICBET1dOTE9BRF9HU1RSMV9FUlJPUl9TSEVFVDogQ09NTU9OICsgJ2dzdHJldHVybi86ZXJyb3Jfc2hlZXRfVHlwZT9tb250aFllYXI9Om1vbnRoJmdzdGluPTpjb21wYW55X2dzdGluJywgLy8gR0VUIGVycm9yX3NoZWV0X1R5cGUgPSAoZ3N0cjFfZXJyb3JfZXhwb3J0IHx8IGdzdHIyX2Vycm9yX2V4cG9ydClcbiAgVVBEQVRFX0lOVk9JQ0U6IENPTU1PTiArICdhY2NvdW50cy86YWNjb3VudFVuaXF1ZU5hbWUvJyArICdpbnZvaWNlcy9nZW5lcmF0ZS1wdXJjaGFzZS86aW52b2ljZVVuaXF1ZU5hbWUnLCAvLyBQQVRDSFxuICBET1dOTE9BRF9HU1RSMl9TSEVFVDogQ09NTU9OICsgJ2dzdHJldHVybi9nc3RyMl9kYXRhL2ZpbGU/bW9udGhZZWFyPTptb250aCZnc3Rpbj06Y29tcGFueV9nc3RpbicsIC8vIEdFVFxufTtcbiJdfQ==