import { Component, ViewChild } from "@angular/core";
import { MatDialogRef, MatSelectionList } from "@angular/material";
import { ChartFilterType } from "../../../models/interfaces/dashboard.interface";
import { AppState } from "../../../store";
import { Store } from "@ngrx/store";
import { ReportsActions } from "../../../actions/reports/reports.actions";
import { ChartCustomFilter } from "../../../models/api-models/Dashboard";

@Component({
    selector: 'ns-reports-filter',
    templateUrl: './reports-filter.component.html'
})
export class ReportsFilterComponent {
    public items: Array<{ text: string, val: ChartFilterType, isSelected: boolean }>;
    public selectedFilter: ChartFilterType.Custom;
    public showCustomFilterInputs: boolean = false;
    public customFilterObj: ChartCustomFilter;
    constructor(public dialogRef: MatDialogRef<ReportsFilterComponent>, public store: Store<AppState>,
        public _reportsAction: ReportsActions) {
        this.items = [
            { val: ChartFilterType.ThisMonthToDate, text: 'This Month to Date', isSelected: false },
            { val: ChartFilterType.ThisQuarterToDate, text: 'This Quarter to Date', isSelected: false },
            { val: ChartFilterType.ThisFinancialYearToDate, text: 'This Financial Year to Date', isSelected: false },
            { val: ChartFilterType.ThisYearToDate, text: 'This Year to Date', isSelected: false },
            { val: ChartFilterType.LastMonth, text: 'Last Month', isSelected: false },
            { val: ChartFilterType.LastQuater, text: 'Last Quater', isSelected: false },
            { val: ChartFilterType.LastFiancialYear, text: 'Last Fiancial Year', isSelected: false },
            { val: ChartFilterType.LastYear, text: 'Last Year', isSelected: false },
            { val: ChartFilterType.Custom, text: 'Custom', isSelected: false },
        ];
        this.customFilterObj = new ChartCustomFilter();
    }

    public selectionChange() {
        this.showCustomFilterInputs = this.selectedFilter === ChartFilterType.Custom;
    }

    public submit() {
        this.store.dispatch(this._reportsAction.setFilterType(this.selectedFilter, this.customFilterObj));
        this.dialogRef.close();
    }
}
