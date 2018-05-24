import {Component, Inject, OnDestroy} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ChartFilterType, ChartType} from '../../../models/interfaces/dashboard.interface';
import {ChartCustomFilter} from '../../../models/api-models/Dashboard';
import {ReportsFilterComponent} from '../../../reports/components/reports-filter/reports-filter.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {DashboardActions} from '../../../actions/dashboard/dashboard.action';
import * as moment from 'moment';
import {ReplaySubject} from 'rxjs/ReplaySubject';

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
    selector: 'ns-dashboard-filter',
    moduleId: module.id,
    templateUrl: './dashboard-filter.component.html',
    styleUrls: ['./dashboard-filter.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class DashboardFilterComponent implements OnDestroy {
    public items: Array<{ text: string, val: ChartFilterType }>;
    public selectedFilter: ChartFilterType = ChartFilterType.Custom;
    public showCustomFilterInputs: boolean = false;
    public customFilterObj: ChartCustomFilter;
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(public dialogRef: MatDialogRef<ReportsFilterComponent>, public store: Store<AppState>,
        public _dashboardAction: DashboardActions, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
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

        if (this.dialogData.chartType === ChartType.Revenue) {
            this.store.select(s => s.dashboard).distinctUntilKeyChanged('revenueChartFilter').take(1).subscribe(s => {
                this.selectedFilter = s.revenueChartFilter;
                this.showCustomFilterInputs = s.revenueChartFilter === ChartFilterType.Custom;

                // if (this.showCustomFilterInputs) {
                //     this.customFilterObj.activeYear.startDate = moment(fl.profitLossChartCustomFilter.activeYear.startDate, 'DD-MM-YYYY');
                //     this.customFilterObj.activeYear.endDate = moment(fl.profitLossChartCustomFilter.activeYear.endDate, 'DD-MM-YYYY');

                //     this.customFilterObj.lastYear.startDate = moment(fl.profitLossChartCustomFilter.lastYear.startDate, 'DD-MM-YYYY');
                //     this.customFilterObj.lastYear.endDate = moment(fl.profitLossChartCustomFilter.lastYear.endDate, 'DD-MM-YYYY');
                // }
            });
        } else {
            this.store.select(s => s.dashboard).distinctUntilKeyChanged('expensesChartFilter').take(1).subscribe(s => {
                this.selectedFilter = s.expensesChartFilter;
                this.showCustomFilterInputs = s.expensesChartFilter === ChartFilterType.Custom;

                // if (this.showCustomFilterInputs) {
                //     this.customFilterObj.activeYear.startDate = moment(fl.profitLossChartCustomFilter.activeYear.startDate, 'DD-MM-YYYY');
                //     this.customFilterObj.activeYear.endDate = moment(fl.profitLossChartCustomFilter.activeYear.endDate, 'DD-MM-YYYY');

                //     this.customFilterObj.lastYear.startDate = moment(fl.profitLossChartCustomFilter.lastYear.startDate, 'DD-MM-YYYY');
                //     this.customFilterObj.lastYear.endDate = moment(fl.profitLossChartCustomFilter.lastYear.endDate, 'DD-MM-YYYY');
                // }
            });
        }

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
        if (this.selectedFilter === ChartFilterType.Custom) {
            this.customFilterObj.activeYear.startDate = moment(this.customFilterObj.activeYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.activeYear.endDate = moment(this.customFilterObj.activeYear.endDate).format('DD-MM-YYYY');

            this.customFilterObj.lastYear.startDate = moment(this.customFilterObj.lastYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.lastYear.endDate = moment(this.customFilterObj.lastYear.endDate).format('DD-MM-YYYY');
        } else {
            this.customFilterObj = new ChartCustomFilter();
        }
        let item = this.items.find(a => a.val === this.selectedFilter);
        this.store.dispatch(this._dashboardAction.setChartFilter(this.dialogData.chartType, item.val, this.customFilterObj));
        this.close();
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
