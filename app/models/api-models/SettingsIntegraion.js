"use strict";
/**
 * Model for get SMS keys api request
 * Get call
 * API:: /company/:companyUniqueName/sms-key
 */
Object.defineProperty(exports, "__esModule", { value: true });
var IntegrationPageClass = (function () {
    function IntegrationPageClass() {
    }
    return IntegrationPageClass;
}());
exports.IntegrationPageClass = IntegrationPageClass;
var SmsKeyClass = (function () {
    function SmsKeyClass() {
    }
    return SmsKeyClass;
}());
exports.SmsKeyClass = SmsKeyClass;
var EmailKeyClass = (function () {
    function EmailKeyClass() {
    }
    return EmailKeyClass;
}());
exports.EmailKeyClass = EmailKeyClass;
var RazorPayClass = (function () {
    function RazorPayClass() {
    }
    return RazorPayClass;
}());
exports.RazorPayClass = RazorPayClass;
var RazorPayDetailsResponse = (function () {
    function RazorPayDetailsResponse() {
    }
    return RazorPayDetailsResponse;
}());
exports.RazorPayDetailsResponse = RazorPayDetailsResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NJbnRlZ3JhaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0dGluZ3NJbnRlZ3JhaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQVVIO0lBQUE7SUFJQSxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLG9EQUFvQjtBQU1qQztJQUFBO0lBR0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxrQ0FBVztBQUt4QjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQ0FBYTtBQUsxQjtJQUFBO0lBS0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSxzQ0FBYTtBQU8xQjtJQUFBO0lBTUEsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZGVsIGZvciBnZXQgU01TIGtleXMgYXBpIHJlcXVlc3RcbiAqIEdldCBjYWxsXG4gKiBBUEk6OiAvY29tcGFueS86Y29tcGFueVVuaXF1ZU5hbWUvc21zLWtleVxuICovXG5cbmltcG9ydCB7IElOYW1lVW5pcXVlTmFtZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbmFtZVVuaXF1ZU5hbWUuaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJbnRlZ3JhdGlvblBhZ2Uge1xuICBzbXNGb3JtOiBhbnk7XG4gIGVtYWlsRm9ybTogYW55O1xuICByYXpvclBheUZvcm06IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEludGVncmF0aW9uUGFnZUNsYXNzIHtcbiAgcHVibGljIHNtc0Zvcm06IFNtc0tleUNsYXNzO1xuICBwdWJsaWMgZW1haWxGb3JtOiBFbWFpbEtleUNsYXNzO1xuICBwdWJsaWMgcmF6b3JQYXlGb3JtOiBSYXpvclBheURldGFpbHNSZXNwb25zZTtcbn1cblxuZXhwb3J0IGNsYXNzIFNtc0tleUNsYXNzIHtcbiAgcHVibGljIHNlbmRlcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBhdXRoS2V5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFbWFpbEtleUNsYXNzIHtcbiAgcHVibGljIHN1YmplY3Q6IHN0cmluZztcbiAgcHVibGljIGF1dGhLZXk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFJhem9yUGF5Q2xhc3Mge1xuICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcbiAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHB1YmxpYyBhY2NvdW50OiBJTmFtZVVuaXF1ZU5hbWU7XG4gIHB1YmxpYyBhdXRvQ2FwdHVyZVBheW1lbnQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBSYXpvclBheURldGFpbHNSZXNwb25zZSB7XG4gIHB1YmxpYyBjb21wYW55TmFtZT86IHN0cmluZztcbiAgcHVibGljIHVzZXJOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBhY2NvdW50OiBJTmFtZVVuaXF1ZU5hbWU7XG4gIHB1YmxpYyBhdXRvQ2FwdHVyZVBheW1lbnQ6IGJvb2xlYW47XG4gIHB1YmxpYyBwYXNzd29yZD86IHN0cmluZztcbn1cbiJdfQ==