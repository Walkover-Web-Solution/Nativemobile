"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model for Audit Dashboard api request
 * API:: (Dashboard) company/:companyUniqueName/dashboard?from=:from&to=:to&interval=:interval&refresh=refresh
 * In Request Payload
 * A.   "from" and "to" params will be sent
 * interval values can be time unit we are seding monthly for now
 * refresh is boolean
 * NOTE:: we are sending an extra header called 'X-Forwarded-For': res.locales.remoteIp
 * NOTE:: its response will be a hash containing a key logs
 */
var DashboardResponse = (function () {
    function DashboardResponse() {
    }
    return DashboardResponse;
}());
exports.DashboardResponse = DashboardResponse;
/**
 * Model for group-history api request
 * POST call
 * API:: (group-history) company/:companyUniqueName/group-history?from=:from&to=:to&interval=:interval&refresh=refresh
 * In Request Payload
 * A. "from" and "to" params will be sent
 * refresh is boolean
 * interval values can be time unit we are seding monthly for now
 * NOTE:: its response will be a hash containing a GroupHistoryResponse
 */
var GroupHistoryRequest = (function () {
    function GroupHistoryRequest() {
    }
    return GroupHistoryRequest;
}());
exports.GroupHistoryRequest = GroupHistoryRequest;
/**
 * NOTE:: as discussed accounts will be null always
 */
var GroupHistoryResponse = (function () {
    function GroupHistoryResponse() {
    }
    return GroupHistoryResponse;
}());
exports.GroupHistoryResponse = GroupHistoryResponse;
/*
 * Model: for closing balance
 * API: /company/:companyUniqueName/groups/:groupUniqueName/closing-balance?fromDate=:date1&toDate=:date2&refresh=:refresh
*/
var ClosingBalanceResponse = (function () {
    function ClosingBalanceResponse() {
    }
    return ClosingBalanceResponse;
}());
exports.ClosingBalanceResponse = ClosingBalanceResponse;
var BankAccountsResponse = (function () {
    function BankAccountsResponse() {
    }
    return BankAccountsResponse;
}());
exports.BankAccountsResponse = BankAccountsResponse;
var RefreshBankAccountResponse = (function () {
    function RefreshBankAccountResponse() {
    }
    return RefreshBankAccountResponse;
}());
exports.RefreshBankAccountResponse = RefreshBankAccountResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7Ozs7OztHQVNHO0FBQ0g7SUFBQTtJQUdBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksOENBQWlCO0FBSzlCOzs7Ozs7Ozs7R0FTRztBQUVIO0lBQUE7SUFJQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLGtEQUFtQjtBQU1oQzs7R0FFRztBQUNIO0lBQUE7SUFHQSxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLG9EQUFvQjtBQUtqQzs7O0VBR0U7QUFFRjtJQUFBO0lBVUEsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSx3REFBc0I7QUFZbkM7SUFBQTtJQUlBLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksb0RBQW9CO0FBTWpDO0lBQUE7SUFLQSxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQZXJpb2RCYWxhbmNlcywgSUdyb3VwSGlzdG9yeUdyb3VwcywgSURhc2hib2FyZENiTWFpbkl0ZW0sIElDaGlsZEdyb3VwcywgSUNiQWNjb3VudCwgSUJhbmtBY2NvdW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kYXNoYm9hcmQuaW50ZXJmYWNlJztcbmltcG9ydCB7IElGb3J3YXJkQmFsYW5jZSwgSUNsb3NpbmdCYWxhbmNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9sZWRnZXIuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBNb2RlbCBmb3IgQXVkaXQgRGFzaGJvYXJkIGFwaSByZXF1ZXN0XG4gKiBBUEk6OiAoRGFzaGJvYXJkKSBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9kYXNoYm9hcmQ/ZnJvbT06ZnJvbSZ0bz06dG8maW50ZXJ2YWw9OmludGVydmFsJnJlZnJlc2g9cmVmcmVzaFxuICogSW4gUmVxdWVzdCBQYXlsb2FkXG4gKiBBLiAgIFwiZnJvbVwiIGFuZCBcInRvXCIgcGFyYW1zIHdpbGwgYmUgc2VudFxuICogaW50ZXJ2YWwgdmFsdWVzIGNhbiBiZSB0aW1lIHVuaXQgd2UgYXJlIHNlZGluZyBtb250aGx5IGZvciBub3dcbiAqIHJlZnJlc2ggaXMgYm9vbGVhblxuICogTk9URTo6IHdlIGFyZSBzZW5kaW5nIGFuIGV4dHJhIGhlYWRlciBjYWxsZWQgJ1gtRm9yd2FyZGVkLUZvcic6IHJlcy5sb2NhbGVzLnJlbW90ZUlwXG4gKiBOT1RFOjogaXRzIHJlc3BvbnNlIHdpbGwgYmUgYSBoYXNoIGNvbnRhaW5pbmcgYSBrZXkgbG9nc1xuICovXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkUmVzcG9uc2Uge1xuICBwdWJsaWMgbmV0d29ydGg6IElQZXJpb2RCYWxhbmNlc1tdO1xuICBwdWJsaWMgcHJvZml0TG9zczogSVBlcmlvZEJhbGFuY2VzW107XG59XG5cbi8qKlxuICogTW9kZWwgZm9yIGdyb3VwLWhpc3RvcnkgYXBpIHJlcXVlc3RcbiAqIFBPU1QgY2FsbFxuICogQVBJOjogKGdyb3VwLWhpc3RvcnkpIGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL2dyb3VwLWhpc3Rvcnk/ZnJvbT06ZnJvbSZ0bz06dG8maW50ZXJ2YWw9OmludGVydmFsJnJlZnJlc2g9cmVmcmVzaFxuICogSW4gUmVxdWVzdCBQYXlsb2FkXG4gKiBBLiBcImZyb21cIiBhbmQgXCJ0b1wiIHBhcmFtcyB3aWxsIGJlIHNlbnRcbiAqIHJlZnJlc2ggaXMgYm9vbGVhblxuICogaW50ZXJ2YWwgdmFsdWVzIGNhbiBiZSB0aW1lIHVuaXQgd2UgYXJlIHNlZGluZyBtb250aGx5IGZvciBub3dcbiAqIE5PVEU6OiBpdHMgcmVzcG9uc2Ugd2lsbCBiZSBhIGhhc2ggY29udGFpbmluZyBhIEdyb3VwSGlzdG9yeVJlc3BvbnNlXG4gKi9cblxuZXhwb3J0IGNsYXNzIEdyb3VwSGlzdG9yeVJlcXVlc3Qge1xuICBwdWJsaWMgZ3JvdXBzPzogc3RyaW5nW107XG4gIHB1YmxpYyBhY2NvdW50cz86IHN0cmluZ1tdO1xuICBwdWJsaWMgY2F0ZWdvcnk/OiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBOT1RFOjogYXMgZGlzY3Vzc2VkIGFjY291bnRzIHdpbGwgYmUgbnVsbCBhbHdheXNcbiAqL1xuZXhwb3J0IGNsYXNzIEdyb3VwSGlzdG9yeVJlc3BvbnNlIHtcbiAgcHVibGljIGFjY291bnRzPzogYW55O1xuICBwdWJsaWMgZ3JvdXBzOiBJR3JvdXBIaXN0b3J5R3JvdXBzW107XG59XG5cbi8qXG4gKiBNb2RlbDogZm9yIGNsb3NpbmcgYmFsYW5jZVxuICogQVBJOiAvY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvZ3JvdXBzLzpncm91cFVuaXF1ZU5hbWUvY2xvc2luZy1iYWxhbmNlP2Zyb21EYXRlPTpkYXRlMSZ0b0RhdGU9OmRhdGUyJnJlZnJlc2g9OnJlZnJlc2hcbiovXG5cbmV4cG9ydCBjbGFzcyBDbG9zaW5nQmFsYW5jZVJlc3BvbnNlIGltcGxlbWVudHMgSURhc2hib2FyZENiTWFpbkl0ZW0sIElDaGlsZEdyb3VwcyB7XG4gIHB1YmxpYyBmb3J3YXJkZWRCYWxhbmNlOiBJRm9yd2FyZEJhbGFuY2U7XG4gIHB1YmxpYyBjcmVkaXRUb3RhbDogbnVtYmVyO1xuICBwdWJsaWMgZGViaXRUb3RhbDogbnVtYmVyO1xuICBwdWJsaWMgY2xvc2luZ0JhbGFuY2U6IElDbG9zaW5nQmFsYW5jZTtcbiAgcHVibGljIGNoaWxkR3JvdXBzOiBJQ2hpbGRHcm91cHNbXTtcbiAgcHVibGljIGFjY291bnRzOiBJQ2JBY2NvdW50W107XG4gIHB1YmxpYyB1bmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXRlZ29yeTogc3RyaW5nO1xuICBwdWJsaWMgZ3JvdXBOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBCYW5rQWNjb3VudHNSZXNwb25zZSB7XG4gIHB1YmxpYyBhY2NvdW50czogSUJhbmtBY2NvdW50W107XG4gIHB1YmxpYyBzaXRlTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgc2l0ZUlkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZyZXNoQmFua0FjY291bnRSZXNwb25zZSB7XG4gIHB1YmxpYyB0b2tlbjogc3RyaW5nO1xuICBwdWJsaWMgY29ubmVjdFVybDogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwdWJsaWMgdG9rZW5fVVJMOiBzdHJpbmc7XG59XG4iXX0=