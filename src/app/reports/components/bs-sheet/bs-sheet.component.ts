import {takeUntil, distinctUntilChanged} from 'rxjs/operators';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {BalanceSheetData} from '../../../models/api-models/tb-pl-bs';
import {ChildGroup} from '../../../models/api-models/Search';
import {ChartFilterType} from '../../../models/interfaces/dashboard.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {ReportsActions} from '../../../actions/reports/reports.actions';

@Component({
    selector: 'ns-bs-sheet,[ns-bs-sheet]',
    moduleId: module.id,
    templateUrl: './bs-sheet.component.html',
})
export class BsSheetComponent implements OnInit, OnDestroy {
    public showLoader: Observable<boolean>;
    public data$: Observable<BalanceSheetData>;
    public liabilitiesArr: ChildGroup[] = [];
    public assetsArr: ChildGroup[] = [];
    public liabTotal = 0;
    public assetTotal = 0;
    public chartFilterType$: Observable<ChartFilterType>;

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private _reportsActions: ReportsActions) {
        this.data$ = this.store.select(s => s.report.balanceSheet.data).pipe(takeUntil(this.destroyed$));
        this.chartFilterType$ = this.store.select(p => p.report.profitLossChartFilter).pipe(takeUntil(this.destroyed$));
    }

    ngOnInit() {
        this.fetchData(true);

        this.data$.subscribe(da => {
            if (da) {
                if (da.liabilities) {
                    this.liabilitiesArr = da.liabilities;
                    this.liabTotal = da.liabTotal;
                }
                if (da.assets) {
                    this.assetsArr = da.assets;
                    this.assetTotal = da.assetTotal;
                }
            }
        });

        this.chartFilterType$.pipe(distinctUntilChanged()).subscribe(s => {
            this.fetchData(true);
        });

        this.store.select(p => p.report.activeChartType).pipe(takeUntil(this.destroyed$)).subscribe(s => {
            this.fetchData(true);
        })
    }

    public fetchData(refresh: boolean) {
        this.store.dispatch(this._reportsActions.getBalanceSheet(refresh));
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
