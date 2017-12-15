"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * draw invoice on ui and api model related class and interface
*/
var CompanyClass = (function () {
    function CompanyClass() {
    }
    return CompanyClass;
}());
var SignatureClass = (function () {
    function SignatureClass() {
    }
    return SignatureClass;
}());
var InvoiceDetailsClass = (function () {
    function InvoiceDetailsClass() {
    }
    return InvoiceDetailsClass;
}());
var GstDetailsClass = (function () {
    function GstDetailsClass() {
        this.address = [];
    }
    return GstDetailsClass;
}());
var AccountClass = (function () {
    function AccountClass() {
        this.billingDetails = new GstDetailsClass();
        this.shippingDetails = new GstDetailsClass();
    }
    return AccountClass;
}());
var ICommonItemOfTransaction = (function () {
    function ICommonItemOfTransaction() {
    }
    return ICommonItemOfTransaction;
}());
var FakeDiscountItem = (function () {
    function FakeDiscountItem() {
    }
    return FakeDiscountItem;
}());
exports.FakeDiscountItem = FakeDiscountItem;
var SalesTransactionItemClass = (function (_super) {
    __extends(SalesTransactionItemClass, _super);
    function SalesTransactionItemClass() {
        var _this = _super.call(this) || this;
        _this.stockList = [];
        _this.applicableTaxes = [];
        _this.taxRenderData = [];
        _this.amount = 0;
        _this.total = 0;
        _this.isStockTxn = false;
        _this.hsnOrSac = 'sac';
        return _this;
    }
    // basic check for valid transaction
    SalesTransactionItemClass.prototype.isValid = function () {
        var r = true;
        if (this.taxableValue === 0) {
            r = 'Without Taxable sales-invoice can\'t be generated';
        }
        if (this.accountUniqueName) {
            if (_.isEmpty(this.accountUniqueName)) {
                r = 'Product/Service can\'t be empty';
            }
        }
        else {
            r = 'Product/Service can\'t be empty';
        }
        return r;
    };
    SalesTransactionItemClass.prototype.setAmount = function (entry) {
        var _this = this;
        // delaying due to ngModel change
        setTimeout(function () {
            _this.taxableValue = _this.getTaxableValue(entry);
            var tax = _this.getTotalTaxOfEntry(entry.taxes);
            _this.total = _this.getTransactionTotal(tax, entry);
        }, 500);
    };
    SalesTransactionItemClass.prototype.getTotalTaxOfEntry = function (taxArr) {
        var count = 0;
        if (taxArr.length > 0) {
            _.forEach(taxArr, function (item) {
                count += item.amount;
            });
            return this.checkForInfinity(count);
        }
        else {
            return count;
        }
    };
    SalesTransactionItemClass.prototype.checkForInfinity = function (value) {
        return (value === Infinity) ? 0 : value;
    };
    SalesTransactionItemClass.prototype.getTransactionTotal = function (tax, entry) {
        var count = 0;
        if (tax > 0) {
            var a = this.getTaxableValue(entry) * (tax / 100);
            a = this.checkForInfinity(a);
            var b = _.cloneDeep(this.getTaxableValue(entry));
            count = a + b;
        }
        else {
            count = _.cloneDeep(this.getTaxableValue(entry));
        }
        return Number(count.toFixed(2));
    };
    /**
     * @param entry: SalesEntryClass object
     * @return taxable value after calculation
     * @scenerio one -- without stock entry -- amount - discount = taxableValue
     * @scenerio two -- stock entry { rate*qty -(discount) = taxableValue}
     */
    SalesTransactionItemClass.prototype.getTaxableValue = function (entry) {
        var count = 0;
        if (this.quantity && this.rate) {
            this.amount = this.rate * this.quantity;
            count = this.checkForInfinity((this.rate * this.quantity) - this.getTotalDiscount(entry.discounts));
        }
        else {
            count = this.checkForInfinity(this.amount - this.getTotalDiscount(entry.discounts));
        }
        return count;
    };
    /**
     * @return numeric value
     * @param discountArr collection of discount items
     */
    SalesTransactionItemClass.prototype.getTotalDiscount = function (discountArr) {
        var count = 0;
        if (discountArr.length > 0) {
            _.forEach(discountArr, function (item) {
                count += Math.abs(item.amount);
            });
        }
        return count;
    };
    return SalesTransactionItemClass;
}(ICommonItemOfTransaction));
exports.SalesTransactionItemClass = SalesTransactionItemClass;
var IRoundOff = (function () {
    function IRoundOff() {
    }
    return IRoundOff;
}());
var SalesEntryClass = (function () {
    function SalesEntryClass() {
        this.transactions = [new SalesTransactionItemClass()];
        this.taxes = [];
        this.taxList = [];
        this.discounts = [];
    }
    return SalesEntryClass;
}());
exports.SalesEntryClass = SalesEntryClass;
var ITotaltaxBreakdown = (function () {
    function ITotaltaxBreakdown() {
    }
    return ITotaltaxBreakdown;
}());
var CountryClass = (function () {
    function CountryClass() {
    }
    return CountryClass;
}());
var OtherSalesItemClass = (function () {
    function OtherSalesItemClass() {
    }
    return OtherSalesItemClass;
}());
exports.OtherSalesItemClass = OtherSalesItemClass;
var InvoiceFormClass = (function () {
    function InvoiceFormClass() {
        this.invoiceDetails = new InvoiceDetailsClass();
        this.totaltaxBreakdown = [new ITotaltaxBreakdown()];
        this.entries = [new SalesEntryClass()];
        this.commonDiscounts = [];
        this.roundOff = new IRoundOff();
        this.company = new CompanyClass();
        this.account = new AccountClass();
        this.signature = new SignatureClass();
        this.country = new CountryClass();
        this.other = new OtherSalesItemClass();
    }
    return InvoiceFormClass;
}());
exports.InvoiceFormClass = InvoiceFormClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTYWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUE0QjtBQVE1Qjs7RUFFRTtBQUNGO0lBQUE7SUFHQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUVEO0lBQUE7SUFJQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUVEO0lBQUE7SUFJQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUVEO0lBS0U7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUVEO0lBU0U7UUFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksNENBQWdCO0FBTTdCO0lBQStDLDZDQUF3QjtJQWtCckU7UUFBQSxZQUNFLGlCQUFPLFNBS1I7UUFUTSxlQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixxQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixtQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUdsQyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztJQUN4QixDQUFDO0lB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QUFtQixFQUFFLENBQUM7SUFDekMsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBJSW52b2ljZVRheCB9IGZyb20gJy4vSW52b2ljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0b2NrVW5pdCB7XG4gIHRleHQ6IHN0cmluZztcbiAgaWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBkcmF3IGludm9pY2Ugb24gdWkgYW5kIGFwaSBtb2RlbCByZWxhdGVkIGNsYXNzIGFuZCBpbnRlcmZhY2VcbiovXG5jbGFzcyBDb21wYW55Q2xhc3Mge1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgZGF0YTogYW55W107XG59XG5cbmNsYXNzIFNpZ25hdHVyZUNsYXNzIHtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGRhdGE6IHN0cmluZztcbiAgcHVibGljIHBhdGg6IHN0cmluZztcbn1cblxuY2xhc3MgSW52b2ljZURldGFpbHNDbGFzcyB7XG4gIHB1YmxpYyBpbnZvaWNlTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBpbnZvaWNlRGF0ZTogYW55O1xuICBwdWJsaWMgZHVlRGF0ZTogYW55O1xufVxuXG5jbGFzcyBHc3REZXRhaWxzQ2xhc3Mge1xuICBwdWJsaWMgZ3N0TnVtYmVyPzogYW55O1xuICBwdWJsaWMgYWRkcmVzczogc3RyaW5nW107XG4gIHB1YmxpYyBzdGF0ZUNvZGU/OiBhbnk7XG4gIHB1YmxpYyBwYW5OdW1iZXI/OiBhbnk7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWRkcmVzcyA9IFtdO1xuICB9XG59XG5cbmNsYXNzIEFjY291bnRDbGFzcyB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBkYXRhOiBzdHJpbmdbXTtcbiAgcHVibGljIGF0dGVudGlvblRvOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgbW9iaWxlTnVtYmVyPzogYW55O1xuICBwdWJsaWMgYmlsbGluZ0RldGFpbHM6IEdzdERldGFpbHNDbGFzcztcbiAgcHVibGljIHNoaXBwaW5nRGV0YWlsczogR3N0RGV0YWlsc0NsYXNzO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJpbGxpbmdEZXRhaWxzID0gbmV3IEdzdERldGFpbHNDbGFzcygpO1xuICAgIHRoaXMuc2hpcHBpbmdEZXRhaWxzID0gbmV3IEdzdERldGFpbHNDbGFzcygpO1xuICB9XG59XG5cbmNsYXNzIElDb21tb25JdGVtT2ZUcmFuc2FjdGlvbiB7XG4gIHB1YmxpYyBhbW91bnQ6IG51bWJlcjtcbiAgcHVibGljIGFjY291bnRVbmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBhY2NvdW50TmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRmFrZURpc2NvdW50SXRlbSB7XG4gIHB1YmxpYyBhbW91bnQ6IG51bWJlcjtcbiAgcHVibGljIHBhcnRpY3VsYXI6IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFNhbGVzVHJhbnNhY3Rpb25JdGVtQ2xhc3MgZXh0ZW5kcyBJQ29tbW9uSXRlbU9mVHJhbnNhY3Rpb24ge1xuICBwdWJsaWMgZGlzY291bnQ6IGFueVtdO1xuICBwdWJsaWMgaHNuT3JTYWM6IHN0cmluZztcbiAgcHVibGljIGhzbk51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgc2FjTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgcXVhbnRpdHk6IG51bWJlcjtcbiAgcHVibGljIHN0b2NrVW5pdDogc3RyaW5nO1xuICBwdWJsaWMgcmF0ZTogbnVtYmVyO1xuICBwdWJsaWMgZGF0ZTogYW55O1xuICBwdWJsaWMgdGF4YWJsZVZhbHVlOiBudW1iZXI7XG4gIHB1YmxpYyB0b3RhbD86IG51bWJlcjtcbiAgcHVibGljIGZha2VBY2NGb3JTZWxlY3QyPzogc3RyaW5nO1xuICBwdWJsaWMgaXNTdG9ja1R4bj86IGJvb2xlYW47XG4gIHB1YmxpYyBzdG9ja0RldGFpbHM/OiBhbnk7XG4gIHB1YmxpYyBzdG9ja0xpc3Q/OiBJU3RvY2tVbml0W10gPSBbXTtcbiAgcHVibGljIGFwcGxpY2FibGVUYXhlczogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHRheFJlbmRlckRhdGE6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hbW91bnQgPSAwO1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuaXNTdG9ja1R4biA9IGZhbHNlO1xuICAgIHRoaXMuaHNuT3JTYWMgPSAnc2FjJztcbiAgfVxuXG4gIC8vIGJhc2ljIGNoZWNrIGZvciB2YWxpZCB0cmFuc2FjdGlvblxuICBwdWJsaWMgaXNWYWxpZCgpIHtcbiAgICBsZXQgcjogYW55ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy50YXhhYmxlVmFsdWUgPT09IDApIHtcbiAgICAgIHIgPSAnV2l0aG91dCBUYXhhYmxlIHNhbGVzLWludm9pY2UgY2FuXFwndCBiZSBnZW5lcmF0ZWQnO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY2NvdW50VW5pcXVlTmFtZSkge1xuICAgICAgaWYgKF8uaXNFbXB0eSh0aGlzLmFjY291bnRVbmlxdWVOYW1lKSkge1xuICAgICAgICByID0gJ1Byb2R1Y3QvU2VydmljZSBjYW5cXCd0IGJlIGVtcHR5JztcbiAgICAgIH1cbiAgICB9ZWxzZSB7XG4gICAgICByID0gJ1Byb2R1Y3QvU2VydmljZSBjYW5cXCd0IGJlIGVtcHR5JztcbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICBwdWJsaWMgc2V0QW1vdW50KGVudHJ5OiBTYWxlc0VudHJ5Q2xhc3MpIHtcbiAgICAvLyBkZWxheWluZyBkdWUgdG8gbmdNb2RlbCBjaGFuZ2VcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudGF4YWJsZVZhbHVlID0gdGhpcy5nZXRUYXhhYmxlVmFsdWUoZW50cnkpO1xuICAgICAgbGV0IHRheCA9IHRoaXMuZ2V0VG90YWxUYXhPZkVudHJ5KGVudHJ5LnRheGVzKTtcbiAgICAgIHRoaXMudG90YWwgPSB0aGlzLmdldFRyYW5zYWN0aW9uVG90YWwodGF4LCBlbnRyeSk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUb3RhbFRheE9mRW50cnkodGF4QXJyOiBJSW52b2ljZVRheFtdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQ6IG51bWJlciA9IDA7XG4gICAgaWYgKHRheEFyci5sZW5ndGggPiAwKSB7XG4gICAgICBfLmZvckVhY2godGF4QXJyLCAoaXRlbTogSUludm9pY2VUYXgpID0+IHtcbiAgICAgICAgY291bnQgKz0gaXRlbS5hbW91bnQ7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrRm9ySW5maW5pdHkoY291bnQpO1xuICAgIH1lbHNlIHtcbiAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2hlY2tGb3JJbmZpbml0eSh2YWx1ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuICh2YWx1ZSA9PT0gSW5maW5pdHkpID8gMCA6IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldFRyYW5zYWN0aW9uVG90YWwodGF4OiBudW1iZXIsIGVudHJ5OiBTYWxlc0VudHJ5Q2xhc3MpOiBudW1iZXIge1xuICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcbiAgICBpZiAodGF4ID4gMCkge1xuICAgICAgbGV0IGEgPSB0aGlzLmdldFRheGFibGVWYWx1ZShlbnRyeSkgKiAodGF4IC8gMTAwKTtcbiAgICAgIGEgPSB0aGlzLmNoZWNrRm9ySW5maW5pdHkoYSk7XG4gICAgICBsZXQgYiA9IF8uY2xvbmVEZWVwKHRoaXMuZ2V0VGF4YWJsZVZhbHVlKGVudHJ5KSk7XG4gICAgICBjb3VudCA9IGEgKyBiO1xuICAgIH1lbHNlIHtcbiAgICAgIGNvdW50ID0gXy5jbG9uZURlZXAodGhpcy5nZXRUYXhhYmxlVmFsdWUoZW50cnkpKTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcihjb3VudC50b0ZpeGVkKDIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZW50cnk6IFNhbGVzRW50cnlDbGFzcyBvYmplY3RcbiAgICogQHJldHVybiB0YXhhYmxlIHZhbHVlIGFmdGVyIGNhbGN1bGF0aW9uXG4gICAqIEBzY2VuZXJpbyBvbmUgLS0gd2l0aG91dCBzdG9jayBlbnRyeSAtLSBhbW91bnQgLSBkaXNjb3VudCA9IHRheGFibGVWYWx1ZVxuICAgKiBAc2NlbmVyaW8gdHdvIC0tIHN0b2NrIGVudHJ5IHsgcmF0ZSpxdHkgLShkaXNjb3VudCkgPSB0YXhhYmxlVmFsdWV9XG4gICAqL1xuICBwdWJsaWMgZ2V0VGF4YWJsZVZhbHVlKGVudHJ5OiBTYWxlc0VudHJ5Q2xhc3MpOiBudW1iZXIge1xuICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcbiAgICBpZiAodGhpcy5xdWFudGl0eSAmJiB0aGlzLnJhdGUpIHtcbiAgICAgIHRoaXMuYW1vdW50ID0gdGhpcy5yYXRlICogdGhpcy5xdWFudGl0eTtcbiAgICAgIGNvdW50ID0gdGhpcy5jaGVja0ZvckluZmluaXR5KCh0aGlzLnJhdGUgKiB0aGlzLnF1YW50aXR5KSAtIHRoaXMuZ2V0VG90YWxEaXNjb3VudChlbnRyeS5kaXNjb3VudHMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgPSB0aGlzLmNoZWNrRm9ySW5maW5pdHkodGhpcy5hbW91bnQgLSB0aGlzLmdldFRvdGFsRGlzY291bnQoZW50cnkuZGlzY291bnRzKSk7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIG51bWVyaWMgdmFsdWVcbiAgICogQHBhcmFtIGRpc2NvdW50QXJyIGNvbGxlY3Rpb24gb2YgZGlzY291bnQgaXRlbXNcbiAgICovXG4gIHB1YmxpYyBnZXRUb3RhbERpc2NvdW50KGRpc2NvdW50QXJyOiBJQ29tbW9uSXRlbU9mVHJhbnNhY3Rpb25bXSkge1xuICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcbiAgICBpZiAoZGlzY291bnRBcnIubGVuZ3RoID4gMCkge1xuICAgICAgXy5mb3JFYWNoKGRpc2NvdW50QXJyLCAoaXRlbTogSUNvbW1vbkl0ZW1PZlRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvdW50ICs9IE1hdGguYWJzKGl0ZW0uYW1vdW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cbn1cblxuY2xhc3MgSVJvdW5kT2ZmIHtcbiAgcHVibGljIHRyYW5zYWN0aW9uOiBTYWxlc1RyYW5zYWN0aW9uSXRlbUNsYXNzO1xuICBwdWJsaWMgdW5pcXVlTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgaXNUcmFuc2FjdGlvbjogYm9vbGVhbjtcbiAgcHVibGljIGJhbGFuY2VUeXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTYWxlc0VudHJ5Q2xhc3Mge1xuICBwdWJsaWMgdW5pcXVlTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25zOiBTYWxlc1RyYW5zYWN0aW9uSXRlbUNsYXNzW107XG4gIHB1YmxpYyBkaXNjb3VudHM6IElDb21tb25JdGVtT2ZUcmFuc2FjdGlvbltdO1xuICBwdWJsaWMgdGF4ZXM6IElJbnZvaWNlVGF4W107XG4gIHB1YmxpYyB0YXhMaXN0Pzogc3RyaW5nW107XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgdGF4YWJsZVZhbHVlOiBudW1iZXI7XG4gIHB1YmxpYyBlbnRyeVRvdGFsOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudHJhbnNhY3Rpb25zID0gW25ldyBTYWxlc1RyYW5zYWN0aW9uSXRlbUNsYXNzKCldO1xuICAgIHRoaXMudGF4ZXMgPSBbXTtcbiAgICB0aGlzLnRheExpc3QgPSBbXTtcbiAgICB0aGlzLmRpc2NvdW50cyA9IFtdO1xuICB9XG59XG5cbmNsYXNzIElUb3RhbHRheEJyZWFrZG93biB7XG4gIHB1YmxpYyBhbW91bnQ6IG51bWJlcjtcbiAgcHVibGljIHZpc2libGVUYXhSYXRlOiBudW1iZXI7XG4gIHB1YmxpYyBhY2NvdW50TmFtZTogc3RyaW5nO1xuICBwdWJsaWMgYWNjb3VudFVuaXF1ZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGhhc0Vycm9yOiBib29sZWFuO1xuICBwdWJsaWMgdGF4UmF0ZTogbnVtYmVyO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG59XG5cbmNsYXNzIENvdW50cnlDbGFzcyB7XG4gIHB1YmxpYyBjb3VudHJ5TmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY291bnRyeUNvZGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE90aGVyU2FsZXNJdGVtQ2xhc3Mge1xuICBwdWJsaWMgc2hpcHBpbmdEYXRlOiBhbnk7XG4gIHB1YmxpYyBzaGlwcGVkVmlhOiBzdHJpbmc7XG4gIHB1YmxpYyB0cmFja2luZ051bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgY3VzdG9tRmllbGQxOiBzdHJpbmc7XG4gIHB1YmxpYyBjdXN0b21GaWVsZDI6IHN0cmluZztcbiAgcHVibGljIGN1c3RvbUZpZWxkMzogc3RyaW5nO1xuICBwdWJsaWMgbWVzc2FnZTI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEludm9pY2VGb3JtQ2xhc3Mge1xuICBwdWJsaWMgbG9nbzogc3RyaW5nO1xuICBwdWJsaWMgY29tcGFueTogQ29tcGFueUNsYXNzO1xuICBwdWJsaWMgY3VzdG9tZXJOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBhY2NvdW50OiBBY2NvdW50Q2xhc3M7XG4gIHB1YmxpYyBzaWduYXR1cmU6IFNpZ25hdHVyZUNsYXNzO1xuICBwdWJsaWMgdGVtcGxhdGVVbmlxdWVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyByb3VuZE9mZjogSVJvdW5kT2ZmO1xuICBwdWJsaWMgYmFsYW5jZVN0YXR1czogc3RyaW5nO1xuICBwdWJsaWMgYmFsYW5jZVN0YXR1c1NlYWxQYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyBjb21tb25EaXNjb3VudHM6IGFueVtdO1xuICBwdWJsaWMgZW50cmllczogU2FsZXNFbnRyeUNsYXNzW107XG4gIHB1YmxpYyB0b3RhbFRheGFibGVWYWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgZ3JhbmRUb3RhbDogbnVtYmVyO1xuICBwdWJsaWMgYmFsYW5jZUR1ZTogbnVtYmVyO1xuICBwdWJsaWMgdG90YWxJbldvcmRzPzogYW55O1xuICBwdWJsaWMgc3ViVG90YWw6IG51bWJlcjtcbiAgcHVibGljIHRvdGFsRGlzY291bnQ6IG51bWJlcjtcbiAgcHVibGljIHRvdGFsdGF4QnJlYWtkb3duOiBJVG90YWx0YXhCcmVha2Rvd25bXTtcbiAgcHVibGljIHRvdGFsVGF4PzogYW55O1xuICBwdWJsaWMgaW52b2ljZURldGFpbHM6IEludm9pY2VEZXRhaWxzQ2xhc3M7XG4gIHB1YmxpYyBvdGhlcj86IE90aGVyU2FsZXNJdGVtQ2xhc3M7XG4gIHB1YmxpYyBjb3VudHJ5OiBDb3VudHJ5Q2xhc3M7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW52b2ljZURldGFpbHMgPSBuZXcgSW52b2ljZURldGFpbHNDbGFzcygpO1xuICAgIHRoaXMudG90YWx0YXhCcmVha2Rvd24gPSBbbmV3IElUb3RhbHRheEJyZWFrZG93bigpXTtcbiAgICB0aGlzLmVudHJpZXMgPSBbbmV3IFNhbGVzRW50cnlDbGFzcygpXTtcbiAgICB0aGlzLmNvbW1vbkRpc2NvdW50cyA9IFtdO1xuICAgIHRoaXMucm91bmRPZmYgPSBuZXcgSVJvdW5kT2ZmKCk7XG4gICAgdGhpcy5jb21wYW55ID0gbmV3IENvbXBhbnlDbGFzcygpO1xuICAgIHRoaXMuYWNjb3VudCA9IG5ldyBBY2NvdW50Q2xhc3MoKTtcbiAgICB0aGlzLnNpZ25hdHVyZSA9IG5ldyBTaWduYXR1cmVDbGFzcygpO1xuICAgIHRoaXMuY291bnRyeSA9IG5ldyBDb3VudHJ5Q2xhc3MoKTtcbiAgICB0aGlzLm90aGVyID0gbmV3IE90aGVyU2FsZXNJdGVtQ2xhc3MoKTtcbiAgfVxufVxuLyoqXG4gKiBlbmQgZHJhdyBpbnZvaWNlIG9uIHVpIGFuZCBhcGkgbW9kZWwgcmVsYXRlZCBjbGFzcyBhbmQgaW50ZXJmYWNlXG4qL1xuXG4vLyBnZW5lcmF0ZSBzYWxlcyBpbnRlcmZhY2VcblxuaW50ZXJmYWNlIElQYXltZW50QWN0aW9uIHtcbiAgYWN0aW9uOiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZVNhbGVzUmVxdWVzdCB7XG4gIGludm9pY2U6IEludm9pY2VGb3JtQ2xhc3M7XG4gIHVwZGF0ZUFjY291bnREZXRhaWxzOiBib29sZWFuO1xuICBwYXltZW50QWN0aW9uPzogSVBheW1lbnRBY3Rpb247XG59XG4iXX0=