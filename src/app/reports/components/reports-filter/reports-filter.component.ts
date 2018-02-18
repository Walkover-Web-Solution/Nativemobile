import { Component, ViewChild } from "@angular/core";
import { MatDialogRef, MatSelectionList } from "@angular/material";
import { ChartFilterType } from "../../../models/interfaces/dashboard.interface";

@Component({
    selector: 'ns-reports-filter',
    templateUrl: './reports-filter.component.html'
})
export class ReportsFilterComponent {
    public items: Array<{ text: string, val: ChartFilterType }>;
    constructor(public dialogRef: MatDialogRef<ReportsFilterComponent>) {
        this.items = [
            { val: ChartFilterType.ThisMonthToDate, text: 'This Month to Date' },
            { val: ChartFilterType.ThisQuarterToDate, text: 'This Quarter to Date' },
            { val: ChartFilterType.ThisFinancialYearToDate, text: 'This Financial Year to Date' },
            { val: ChartFilterType.ThisYearToDate, text: 'This Year to Date' },
            { val: ChartFilterType.LastMonth, text: 'Last Month' },
            { val: ChartFilterType.LastQuater, text: 'Last Quater' },
            { val: ChartFilterType.LastFiancialYear, text: 'Last Fiancial Year' },
            { val: ChartFilterType.LastYear, text: 'Last Year' },
            { val: ChartFilterType.Custom, text: 'Custom' },
        ];
    }

    public log(e) {
        console.log(e);
    }
}
