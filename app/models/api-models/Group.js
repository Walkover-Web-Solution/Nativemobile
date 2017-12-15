"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model for create group api response
 * API:: (create-group) /company/companyUniqueName/groups
 */
var GroupResponse = (function () {
    function GroupResponse() {
    }
    return GroupResponse;
}());
exports.GroupResponse = GroupResponse;
/**
 * Model for create group api request
 * API:: (create-group) /company/companyUniqueName/groups
 */
var GroupCreateRequest = (function () {
    function GroupCreateRequest() {
    }
    return GroupCreateRequest;
}());
exports.GroupCreateRequest = GroupCreateRequest;
/**
 * Model for Update group api request
 * API:: (create-group) /company/companyUniqueName/groups
 */
var GroupUpateRequest = (function () {
    function GroupUpateRequest() {
    }
    return GroupUpateRequest;
}());
exports.GroupUpateRequest = GroupUpateRequest;
/**
 * Model for Share group api request
 * API:: (Share-group) company/:companyUniqueName/groups/:groupUniqueName/share
 * takes email as value for user field
 * its response will be success message in body
 */
var ShareGroupRequest = (function () {
    function ShareGroupRequest() {
    }
    return ShareGroupRequest;
}());
exports.ShareGroupRequest = ShareGroupRequest;
/**
 * Model for Shared-with api response
 * API:: (group-shared-with) company/:companyUniqueName/groups/:groupUniqueName/shared-with
 * its response will be array of GroupSharedWithResponse
 * Request is a GET call takes no arguments
 */
var GroupSharedWithResponse = (function () {
    function GroupSharedWithResponse() {
    }
    return GroupSharedWithResponse;
}());
exports.GroupSharedWithResponse = GroupSharedWithResponse;
/**
 * Model for Shared-with api response
 * API:: (group-shared-with) 'company/:companyUniqueName/groups/:groupUniqueName/move'
 * its response will be array of MoveGroupResponse
 * Request is a PUT call takes MoveGroupRequest arguments
 */
var MoveGroupRequest = (function () {
    function MoveGroupRequest() {
    }
    return MoveGroupRequest;
}());
exports.MoveGroupRequest = MoveGroupRequest;
var MoveGroupResponse = (function () {
    function MoveGroupResponse() {
    }
    return MoveGroupResponse;
}());
exports.MoveGroupResponse = MoveGroupResponse;
var FlattenGroupsAccountsRequest = (function () {
    function FlattenGroupsAccountsRequest() {
        this.q = '';
        this.page = 1;
        this.count = 1000;
        this.showEmptyGroups = '';
    }
    return FlattenGroupsAccountsRequest;
}());
exports.FlattenGroupsAccountsRequest = FlattenGroupsAccountsRequest;
/*
 * Model for flatten-groups-accounts api response
 * GET call
 * API:: (flatten-groups-accounts) company/:companyUniqueName/groups/flatten-groups-accounts?q=&page=1&count=10&showEmptyGroups=
 * you can pass query parameters in this as page, query as q and showEmptyGroups and count which is sent 10
 * its response will be hash as FlattenGroupsAccountsResponse
 */
var FlattenGroupsAccountsResponse = (function () {
    function FlattenGroupsAccountsResponse() {
    }
    return FlattenGroupsAccountsResponse;
}());
exports.FlattenGroupsAccountsResponse = FlattenGroupsAccountsResponse;
var UnShareGroupRequest = (function () {
    function UnShareGroupRequest() {
    }
    return UnShareGroupRequest;
}());
exports.UnShareGroupRequest = UnShareGroupRequest;
/*
 * Model for tax-hierarchy api response
 * GET call
 * API:: (groups tax-hierarchy) company/:companyUniqueName/groups/:groupUniqueName/tax-hierarchy
 * response will be hash as GroupsTaxHierarchyResponse
 */
var GroupsTaxHierarchyResponse = (function () {
    function GroupsTaxHierarchyResponse() {
    }
    return GroupsTaxHierarchyResponse;
}());
exports.GroupsTaxHierarchyResponse = GroupsTaxHierarchyResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBOzs7R0FHRztBQUVIO0lBQUE7SUFnQkEsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxzQ0FBYTtBQWtCMUI7OztHQUdHO0FBQ0g7SUFBQTtJQU9BLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksZ0RBQWtCO0FBUy9COzs7R0FHRztBQUNIO0lBQUE7SUFJQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLDhDQUFpQjtBQU05Qjs7Ozs7R0FLRztBQUNIO0lBQUE7SUFHQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLDhDQUFpQjtBQUs5Qjs7Ozs7R0FLRztBQUNIO0lBQUE7SUFLQSxDQUFDO0lBQUQsOEJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLDBEQUF1QjtBQU9wQzs7Ozs7R0FLRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDRDQUFnQjtBQUk3QjtJQUFBO0lBU0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSw4Q0FBaUI7QUFXOUI7SUFBQTtRQUNTLE1BQUMsR0FBVyxFQUFFLENBQUM7UUFDZixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckIsb0JBQWUsR0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUFELG1DQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSxvRUFBNEI7QUFPekM7Ozs7OztHQU1HO0FBQ0g7SUFBQTtJQU9BLENBQUM7SUFBRCxvQ0FBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksc0VBQTZCO0FBUzFDO0lBQUE7SUFFQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGtEQUFtQjtBQUloQzs7Ozs7R0FLRztBQUNIO0lBQUE7SUFHQSxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDcmVhdGVHcm91cCB9IGZyb20gJy4uL2ludGVyZmFjZXMvZ3JvdXBDcmVhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IElOYW1lVW5pcXVlTmFtZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbmFtZVVuaXF1ZU5hbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IElVc2VySW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlckluZm8uaW50ZXJmYWNlJztcbmltcG9ydCB7IElHcm91cCB9IGZyb20gJy4uL2ludGVyZmFjZXMvZ3JvdXAuaW50ZXJmYWNlJztcbmltcG9ydCB7IElBY2NvdW50c0luZm8gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FjY291bnRJbmZvLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJRmxhdHRlbkdyb3Vwc0FjY291bnRzRGV0YWlsIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9mbGF0dGVuR3JvdXBzQWNjb3VudHNEZXRhaWwuaW50ZXJmYWNlJztcbmltcG9ydCB7IElJbmhlcml0ZWRUYXhlcyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW5oZXJpdGVkVGF4ZXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IElQYWdpbmF0ZWRSZXNwb25zZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcGFnaW5hdGVkUmVzcG9uc2UuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBNb2RlbCBmb3IgY3JlYXRlIGdyb3VwIGFwaSByZXNwb25zZVxuICogQVBJOjogKGNyZWF0ZS1ncm91cCkgL2NvbXBhbnkvY29tcGFueVVuaXF1ZU5hbWUvZ3JvdXBzXG4gKi9cblxuZXhwb3J0IGNsYXNzIEdyb3VwUmVzcG9uc2UgaW1wbGVtZW50cyBJQ3JlYXRlR3JvdXAge1xuICBwdWJsaWMgYXBwbGljYWJsZVRheGVzOiBJTmFtZVVuaXF1ZU5hbWVbXTtcbiAgcHVibGljIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwdWJsaWMgZml4ZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBncm91cHM6IElDcmVhdGVHcm91cFtdO1xuICBwdWJsaWMgaHNuTnVtYmVyPzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgcm9sZTogSU5hbWVVbmlxdWVOYW1lO1xuICBwdWJsaWMgc3NuTnVtYmVyPzogc3RyaW5nO1xuICBwdWJsaWMgc3lub255bXM/OiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjcmVhdGVkQXQ6IHN0cmluZztcbiAgcHVibGljIGNyZWF0ZWRCeTogSVVzZXJJbmZvO1xuICBwdWJsaWMgdXBkYXRlZEF0OiBzdHJpbmc7XG4gIHB1YmxpYyB1cGRhdGVkQnk6IElVc2VySW5mbztcblxufVxuXG4vKipcbiAqIE1vZGVsIGZvciBjcmVhdGUgZ3JvdXAgYXBpIHJlcXVlc3RcbiAqIEFQSTo6IChjcmVhdGUtZ3JvdXApIC9jb21wYW55L2NvbXBhbnlVbmlxdWVOYW1lL2dyb3Vwc1xuICovXG5leHBvcnQgY2xhc3MgR3JvdXBDcmVhdGVSZXF1ZXN0IGltcGxlbWVudHMgSUdyb3VwIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgdW5pcXVlTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgcGFyZW50R3JvdXBVbmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBwYXRoPzogc3RyaW5nW107XG5cbn1cblxuLyoqXG4gKiBNb2RlbCBmb3IgVXBkYXRlIGdyb3VwIGFwaSByZXF1ZXN0XG4gKiBBUEk6OiAoY3JlYXRlLWdyb3VwKSAvY29tcGFueS9jb21wYW55VW5pcXVlTmFtZS9ncm91cHNcbiAqL1xuZXhwb3J0IGNsYXNzIEdyb3VwVXBhdGVSZXF1ZXN0IHtcbiAgcHVibGljIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZT86IHN0cmluZztcbiAgcHVibGljIHVuaXF1ZU5hbWU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogTW9kZWwgZm9yIFNoYXJlIGdyb3VwIGFwaSByZXF1ZXN0XG4gKiBBUEk6OiAoU2hhcmUtZ3JvdXApIGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL2dyb3Vwcy86Z3JvdXBVbmlxdWVOYW1lL3NoYXJlXG4gKiB0YWtlcyBlbWFpbCBhcyB2YWx1ZSBmb3IgdXNlciBmaWVsZFxuICogaXRzIHJlc3BvbnNlIHdpbGwgYmUgc3VjY2VzcyBtZXNzYWdlIGluIGJvZHlcbiAqL1xuZXhwb3J0IGNsYXNzIFNoYXJlR3JvdXBSZXF1ZXN0IHtcbiAgcHVibGljIHJvbGU6IHN0cmluZztcbiAgcHVibGljIHVzZXI6IHN0cmluZztcbn1cblxuLyoqXG4gKiBNb2RlbCBmb3IgU2hhcmVkLXdpdGggYXBpIHJlc3BvbnNlXG4gKiBBUEk6OiAoZ3JvdXAtc2hhcmVkLXdpdGgpIGNvbXBhbnkvOmNvbXBhbnlVbmlxdWVOYW1lL2dyb3Vwcy86Z3JvdXBVbmlxdWVOYW1lL3NoYXJlZC13aXRoXG4gKiBpdHMgcmVzcG9uc2Ugd2lsbCBiZSBhcnJheSBvZiBHcm91cFNoYXJlZFdpdGhSZXNwb25zZVxuICogUmVxdWVzdCBpcyBhIEdFVCBjYWxsIHRha2VzIG5vIGFyZ3VtZW50c1xuICovXG5leHBvcnQgY2xhc3MgR3JvdXBTaGFyZWRXaXRoUmVzcG9uc2Uge1xuICBwdWJsaWMgcm9sZTogSU5hbWVVbmlxdWVOYW1lO1xuICBwdWJsaWMgdXNlckVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyB1c2VyTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgdXNlclVuaXF1ZU5hbWU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBNb2RlbCBmb3IgU2hhcmVkLXdpdGggYXBpIHJlc3BvbnNlXG4gKiBBUEk6OiAoZ3JvdXAtc2hhcmVkLXdpdGgpICdjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9ncm91cHMvOmdyb3VwVW5pcXVlTmFtZS9tb3ZlJ1xuICogaXRzIHJlc3BvbnNlIHdpbGwgYmUgYXJyYXkgb2YgTW92ZUdyb3VwUmVzcG9uc2VcbiAqIFJlcXVlc3QgaXMgYSBQVVQgY2FsbCB0YWtlcyBNb3ZlR3JvdXBSZXF1ZXN0IGFyZ3VtZW50c1xuICovXG5leHBvcnQgY2xhc3MgTW92ZUdyb3VwUmVxdWVzdCB7XG4gIHB1YmxpYyBwYXJlbnRHcm91cFVuaXF1ZU5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVHcm91cFJlc3BvbnNlIHtcbiAgcHVibGljIGFwcGxpY2FibGVUYXhlczogSU5hbWVVbmlxdWVOYW1lW107XG4gIHB1YmxpYyB1bmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBzeW5vbnltcz86IHN0cmluZztcbiAgcHVibGljIGFjY291bnRzOiBJQWNjb3VudHNJbmZvW107XG4gIHB1YmxpYyBkZXNjcmlwdGlvbj86IGFueTtcbiAgcHVibGljIGNhdGVnb3J5PzogYW55O1xuICBwdWJsaWMgZ3JvdXBzOiBJQ3JlYXRlR3JvdXBbXTtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEZsYXR0ZW5Hcm91cHNBY2NvdW50c1JlcXVlc3Qge1xuICBwdWJsaWMgcTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBwYWdlOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgY291bnQ6IG51bWJlciA9IDEwMDA7XG4gIHB1YmxpYyBzaG93RW1wdHlHcm91cHM6IHN0cmluZyA9ICcnO1xufVxuXG4vKlxuICogTW9kZWwgZm9yIGZsYXR0ZW4tZ3JvdXBzLWFjY291bnRzIGFwaSByZXNwb25zZVxuICogR0VUIGNhbGxcbiAqIEFQSTo6IChmbGF0dGVuLWdyb3Vwcy1hY2NvdW50cykgY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvZ3JvdXBzL2ZsYXR0ZW4tZ3JvdXBzLWFjY291bnRzP3E9JnBhZ2U9MSZjb3VudD0xMCZzaG93RW1wdHlHcm91cHM9XG4gKiB5b3UgY2FuIHBhc3MgcXVlcnkgcGFyYW1ldGVycyBpbiB0aGlzIGFzIHBhZ2UsIHF1ZXJ5IGFzIHEgYW5kIHNob3dFbXB0eUdyb3VwcyBhbmQgY291bnQgd2hpY2ggaXMgc2VudCAxMFxuICogaXRzIHJlc3BvbnNlIHdpbGwgYmUgaGFzaCBhcyBGbGF0dGVuR3JvdXBzQWNjb3VudHNSZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgRmxhdHRlbkdyb3Vwc0FjY291bnRzUmVzcG9uc2UgaW1wbGVtZW50cyBJUGFnaW5hdGVkUmVzcG9uc2Uge1xuICBwdWJsaWMgY291bnQ6IG51bWJlcjtcbiAgcHVibGljIHBhZ2U6IG51bWJlcjtcbiAgcHVibGljIHJlc3VsdHM6IElGbGF0dGVuR3JvdXBzQWNjb3VudHNEZXRhaWxbXTtcbiAgcHVibGljIHNpemU6IG51bWJlcjtcbiAgcHVibGljIHRvdGFsSXRlbXM6IG51bWJlcjtcbiAgcHVibGljIHRvdGFsUGFnZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFVuU2hhcmVHcm91cFJlcXVlc3Qge1xuICBwdWJsaWMgdXNlcjogc3RyaW5nO1xufVxuXG4vKlxuICogTW9kZWwgZm9yIHRheC1oaWVyYXJjaHkgYXBpIHJlc3BvbnNlXG4gKiBHRVQgY2FsbFxuICogQVBJOjogKGdyb3VwcyB0YXgtaGllcmFyY2h5KSBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9ncm91cHMvOmdyb3VwVW5pcXVlTmFtZS90YXgtaGllcmFyY2h5XG4gKiByZXNwb25zZSB3aWxsIGJlIGhhc2ggYXMgR3JvdXBzVGF4SGllcmFyY2h5UmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIEdyb3Vwc1RheEhpZXJhcmNoeVJlc3BvbnNlIHtcbiAgcHVibGljIGFwcGxpY2FibGVUYXhlczogSU5hbWVVbmlxdWVOYW1lW107XG4gIHB1YmxpYyBpbmhlcml0ZWRUYXhlczogSUluaGVyaXRlZFRheGVzW107XG59XG4iXX0=