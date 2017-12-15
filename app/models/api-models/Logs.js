"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model for Audit Logs api request
 * API:: (Audit Logs) company/:companyUniqueName/logs?page=:page
 * Audit Logs API details
 * In Request Payload, either
 * A.   "fromDate" and "toDate" params will be sent    OR
 * B.   "logDate"   OR
 * C.   "entryDate"
 * NOTE:: entity options value can be  [ group, company, account, ledger, voucher, logs, invoice, proforma, company_settings ]
 * NOTE:: its response will be a hash containing a key logs
 */
var LogsRequest = (function () {
    function LogsRequest() {
    }
    return LogsRequest;
}());
exports.LogsRequest = LogsRequest;
/**
 * Model for Audit Logs api response
 * API:: (Audit Logs) company/:companyUniqueName/logs?page=:page
 */
var LogsResponse = (function () {
    function LogsResponse() {
    }
    return LogsResponse;
}());
exports.LogsResponse = LogsResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7Ozs7Ozs7OztHQVVHO0FBRUg7SUFBQTtJQVVBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksa0NBQVc7QUFZeEI7OztHQUdHO0FBQ0g7SUFBQTtJQUtBLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTG9nUmVxdWVzdCwgSUxvZ3NJdGVtIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9sb2dzLmludGVyZmFjZSc7XG4vKipcbiAqIE1vZGVsIGZvciBBdWRpdCBMb2dzIGFwaSByZXF1ZXN0XG4gKiBBUEk6OiAoQXVkaXQgTG9ncykgY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvbG9ncz9wYWdlPTpwYWdlXG4gKiBBdWRpdCBMb2dzIEFQSSBkZXRhaWxzXG4gKiBJbiBSZXF1ZXN0IFBheWxvYWQsIGVpdGhlclxuICogQS4gICBcImZyb21EYXRlXCIgYW5kIFwidG9EYXRlXCIgcGFyYW1zIHdpbGwgYmUgc2VudCAgICBPUlxuICogQi4gICBcImxvZ0RhdGVcIiAgIE9SXG4gKiBDLiAgIFwiZW50cnlEYXRlXCJcbiAqIE5PVEU6OiBlbnRpdHkgb3B0aW9ucyB2YWx1ZSBjYW4gYmUgIFsgZ3JvdXAsIGNvbXBhbnksIGFjY291bnQsIGxlZGdlciwgdm91Y2hlciwgbG9ncywgaW52b2ljZSwgcHJvZm9ybWEsIGNvbXBhbnlfc2V0dGluZ3MgXVxuICogTk9URTo6IGl0cyByZXNwb25zZSB3aWxsIGJlIGEgaGFzaCBjb250YWluaW5nIGEga2V5IGxvZ3NcbiAqL1xuXG5leHBvcnQgY2xhc3MgTG9nc1JlcXVlc3QgaW1wbGVtZW50cyBJTG9nUmVxdWVzdCB7XG4gIHB1YmxpYyBmcm9tRGF0ZT86IHN0cmluZztcbiAgcHVibGljIHRvRGF0ZT86IHN0cmluZztcbiAgcHVibGljIG9wZXJhdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgdXNlclVuaXF1ZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGFjY291bnRVbmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBncm91cFVuaXF1ZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGVudHJ5RGF0ZT86IHN0cmluZztcbiAgcHVibGljIGxvZ0RhdGU/OiBzdHJpbmc7XG4gIHB1YmxpYyBlbnRpdHk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBNb2RlbCBmb3IgQXVkaXQgTG9ncyBhcGkgcmVzcG9uc2VcbiAqIEFQSTo6IChBdWRpdCBMb2dzKSBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9sb2dzP3BhZ2U9OnBhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIExvZ3NSZXNwb25zZSB7XG4gIHB1YmxpYyBsb2dzOiBJTG9nc0l0ZW1bXTtcbiAgcHVibGljIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgcHVibGljIHNpemU6IG51bWJlcjtcbiAgcHVibGljIHRvdGFsRWxlbWVudHM6IG51bWJlcjtcbn1cbiJdfQ==