"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Model for get eledger transactions api request
 * GET call
 * API:: ( mail ledger ) company/:companyUniqueName/accounts/:accountUniqueName/eledgers?refresh=false
 * Response will be success message and array of EledgerResponse in body
 */
var EledgerResponse = (function () {
    function EledgerResponse() {
    }
    return EledgerResponse;
}());
exports.EledgerResponse = EledgerResponse;
/*
 * Model for trash eledger transaction api request
 * PUT call
 * API:: ( mail ledger ) company/:companyUniqueName/accounts/:accountUniqueName/eledgers/map/:transactionId
 * Response will be success message
 */
var EledgerMapRequest = (function () {
    function EledgerMapRequest() {
    }
    return EledgerMapRequest;
}());
exports.EledgerMapRequest = EledgerMapRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlZGdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVsZWRnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7R0FLRztBQUNIO0lBQUE7SUFJQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLDBDQUFlO0FBTTVCOzs7OztHQUtHO0FBRUg7SUFBQTtJQUVBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUVsZWRnZXJUcmFuc2FjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvZWxlZGdlci5pbnRlcmZhY2UnO1xuXG4vKlxuICogTW9kZWwgZm9yIGdldCBlbGVkZ2VyIHRyYW5zYWN0aW9ucyBhcGkgcmVxdWVzdFxuICogR0VUIGNhbGxcbiAqIEFQSTo6ICggbWFpbCBsZWRnZXIgKSBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9hY2NvdW50cy86YWNjb3VudFVuaXF1ZU5hbWUvZWxlZGdlcnM/cmVmcmVzaD1mYWxzZVxuICogUmVzcG9uc2Ugd2lsbCBiZSBzdWNjZXNzIG1lc3NhZ2UgYW5kIGFycmF5IG9mIEVsZWRnZXJSZXNwb25zZSBpbiBib2R5XG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVkZ2VyUmVzcG9uc2Uge1xuICBwdWJsaWMgdHJhbnNhY3Rpb25zOiBJRWxlZGdlclRyYW5zYWN0aW9uW107XG4gIHB1YmxpYyB0cmFuc2FjdGlvbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBkYXRlOiBzdHJpbmc7XG59XG5cbi8qXG4gKiBNb2RlbCBmb3IgdHJhc2ggZWxlZGdlciB0cmFuc2FjdGlvbiBhcGkgcmVxdWVzdFxuICogUFVUIGNhbGxcbiAqIEFQSTo6ICggbWFpbCBsZWRnZXIgKSBjb21wYW55Lzpjb21wYW55VW5pcXVlTmFtZS9hY2NvdW50cy86YWNjb3VudFVuaXF1ZU5hbWUvZWxlZGdlcnMvbWFwLzp0cmFuc2FjdGlvbklkXG4gKiBSZXNwb25zZSB3aWxsIGJlIHN1Y2Nlc3MgbWVzc2FnZVxuICovXG5cbmV4cG9ydCBjbGFzcyBFbGVkZ2VyTWFwUmVxdWVzdCB7XG4gIHB1YmxpYyB1bmlxdWVOYW1lOiBzdHJpbmc7XG59XG4iXX0=