import { Component, ViewChild, OnDestroy } from "@angular/core";
import { MatDialogRef, MatSelectionList } from "@angular/material";
import { ChartFilterType } from "../../../models/interfaces/dashboard.interface";
import { AppState } from "../../../store";
import { Store } from "@ngrx/store";
import { ReportsActions } from "../../../actions/reports/reports.actions";
import { ChartCustomFilter } from "../../../models/api-models/Dashboard";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

const MY_FORMATS = {
    parse: {
        dateInput: 'DD-MM-YYYY',
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


@Component({
    selector: 'ns-reports-filter',
    templateUrl: './reports-filter.component.html',
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class ReportsFilterComponent implements OnDestroy {
    public items: Array<{ text: string, val: ChartFilterType }>;
    public selectedFilter: ChartFilterType = ChartFilterType.Custom;
    public showCustomFilterInputs: boolean = false;
    public customFilterObj: ChartCustomFilter;
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(public dialogRef: MatDialogRef<ReportsFilterComponent>, public store: Store<AppState>,
        public _reportsAction: ReportsActions) {
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
        this.store.select(s => s.report).distinctUntilKeyChanged('profitLossChartFilter').takeUntil(this.destroyed$).subscribe(fl => {
            this.selectedFilter = fl.profitLossChartFilter;
            this.showCustomFilterInputs = fl.profitLossChartFilter === ChartFilterType.Custom;
            // if (this.showCustomFilterInputs) {
            //     this.customFilterObj.activeYear.startDate = moment(fl.profitLossChartCustomFilter.activeYear.startDate, 'DD-MM-YYYY');
            //     this.customFilterObj.activeYear.endDate = moment(fl.profitLossChartCustomFilter.activeYear.endDate, 'DD-MM-YYYY');

            //     this.customFilterObj.lastYear.startDate = moment(fl.profitLossChartCustomFilter.lastYear.startDate, 'DD-MM-YYYY');
            //     this.customFilterObj.lastYear.endDate = moment(fl.profitLossChartCustomFilter.lastYear.endDate, 'DD-MM-YYYY');
            // }
        });
        this.customFilterObj = new ChartCustomFilter();
    }

    public selectionChange() {
        this.showCustomFilterInputs = this.selectedFilter === ChartFilterType.Custom;
    }

    public close() {
        this.dialogRef.close();
        this.ngOnDestroy();
    }

    public submit() {
        console.log('Reports Submitted')
        if (this.selectedFilter === ChartFilterType.Custom) {
            this.customFilterObj.activeYear.startDate = moment(this.customFilterObj.activeYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.activeYear.endDate = moment(this.customFilterObj.activeYear.endDate).format('DD-MM-YYYY');

            this.customFilterObj.lastYear.startDate = moment(this.customFilterObj.lastYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.lastYear.endDate = moment(this.customFilterObj.lastYear.endDate).format('DD-MM-YYYY');
        } else {
            this.customFilterObj = new ChartCustomFilter();
        }
        let item = this.items.find(a => a.val === this.selectedFilter);
        this.store.dispatch(this._reportsAction.setFilterType({ filterTitle: item.text, filterType: item.val }, this.customFilterObj));
        this.close();
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
