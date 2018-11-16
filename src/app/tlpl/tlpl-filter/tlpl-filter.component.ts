import {Component, Inject, OnDestroy} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ChartFilterType, ChartType} from '../../models/interfaces/dashboard.interface';
import {ChartCustomFilter} from '../../models/api-models/Dashboard';
import {ReportsFilterComponent} from '../../reports/components/reports-filter/reports-filter.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
// import {DashboardActions} from '../../../actions/dashboard/dashboard.action';
import * as moment from 'moment';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import { ReportsActions } from 'app/actions/reports/reports.actions';
import { TBPlBsActions } from 'app/actions/tl-pl/tl-pl.actions';

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
    selector: 'ns-tlpl-filter',
    moduleId: module.id,
    templateUrl: './tlpl-filter.component.html',
    styleUrls: ['./tlpl-filter.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class TlplFilterComponent implements OnDestroy {
    public items: Array<{ text: string, val: ChartFilterType }>;
    public selectedFilter: ChartFilterType = ChartFilterType.Custom;
    public showCustomFilterInputs: boolean = false;
    public customFilterObj: ChartCustomFilter;
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(public dialogRef: MatDialogRef<ReportsFilterComponent>, public store: Store<AppState>,
        public _reportAction: ReportsActions, public _tlPlActions: TBPlBsActions , @Inject(MAT_DIALOG_DATA) public dialogData: any) {
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

            this.store.select(s => s.tlPl).distinctUntilKeyChanged('tlplFilter').take(1).subscribe(s => {
                
                this.selectedFilter = s.tlplFilter;
                this.showCustomFilterInputs = s.tlplFilter === ChartFilterType.Custom;

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
        console.log('------Submitted--------')
        if (this.selectedFilter === ChartFilterType.Custom) {
            console.log(this.customFilterObj);
            this.customFilterObj.activeYear.startDate = moment(this.customFilterObj.activeYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.activeYear.endDate = moment(this.customFilterObj.activeYear.endDate).format('DD-MM-YYYY');

            this.customFilterObj.lastYear.startDate = moment(this.customFilterObj.lastYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.lastYear.endDate = moment(this.customFilterObj.lastYear.endDate).format('DD-MM-YYYY');
        } else {
            this.customFilterObj = new ChartCustomFilter();
        }
        let item = this.items.find(a => a.val === this.selectedFilter);
        this.store.dispatch(this._tlPlActions.setChartFilter(this.dialogData.chartType, item.val, this.customFilterObj));
        this.close();
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
