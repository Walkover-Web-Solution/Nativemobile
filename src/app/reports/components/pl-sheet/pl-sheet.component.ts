import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../store';
import { ReportsActions } from '../../../actions/reports/reports.actions';
import { Store } from '@ngrx/store';
import { ProfitLossDataV3 } from '../../../models/api-models/tb-pl-bs';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
    selector: 'ns-pl-sheet,[ns-pl-sheet]',
    moduleId: module.id,
    templateUrl: './pl-sheet.component.html'
})

export class PlSheetComponent implements OnInit, OnDestroy {
    public data$: Observable<ProfitLossDataV3>;
    public chartFilterTitle$: Observable<string>;
    public totalIncome: number = 0;
    public totalExpense: number = 0;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(private store: Store<AppState>, private _reportsActions: ReportsActions) {
        this.data$ = this.store.select(s => s.report.profitLossSheet.data).takeUntil(this.destroyed$);
        this.chartFilterTitle$ = this.store.select(s => s.report.profirLossChartFilterTitle).takeUntil(this.destroyed$);
    }

    ngOnInit() {
        this.store.select(s => s.report.profitLossChartFilter)
            .takeUntil(this.destroyed$)
            .subscribe(s => {
                this.fetchData(false);
            });

        this.store.select(s => s.report.activeChartType)
            .takeUntil(this.destroyed$)
            .subscribe(s => {
                this.fetchData(false);
            });

        this.data$.subscribe(dt => {
            if (dt) {
                if (dt.revenue && dt.revenue.amount) {
                    this.totalIncome = dt.revenue.amount;
                } else {
                    this.totalIncome = 0;
                }

                if (dt.otherExpenses && dt.operatingExpenses) {
                    if (dt.otherExpenses.amount || dt.operatingExpenses.amount) {
                        this.totalExpense = dt.otherExpenses.amount || 0 + dt.operatingExpenses.amount || 0;
                    }
                } else {
                    this.totalExpense = 0;
                }
            }
        });
    }

    public fetchData(refresh: boolean) {
        this.store.dispatch(this._reportsActions.getProfitLossSheet(refresh));
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
