import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BalanceSheetData} from "~/models/api-models/tb-pl-bs";
import {AppState} from "~/store";
import {Store} from "@ngrx/store";
import {ReportsAction} from "~/actions/reports/reports.action";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Page} from "tns-core-modules/ui/page";
import {ChildGroup} from "~/models/api-models/Search";
import {ChartFilterType} from "~/models/interfaces/dashboard.interface";

@Component({
  selector: 'ns-bs-data,[ns-bs-data]',
  moduleId: module.id,
  templateUrl: './bs-data.component.html'
})

export class BsDataComponent implements OnInit {
  public showLoader: Observable<boolean>;
  public data$: Observable<BalanceSheetData>;
  public liabilitiesArr: ChildGroup[] = [];
  public assetsArr: ChildGroup[] = [];
  public liabTotal: number = 0;
  public assetTotal: number = 0;
  public chartFilterType$: Observable<ChartFilterType>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _reportsActions: ReportsAction, private page: Page) {
    this.data$ = this.store.select(s => s.report.balanceSheet.data).takeUntil(this.destroyed$);
    this.chartFilterType$ = this.store.select(p => p.report.profitLossChartFilter).takeUntil(this.destroyed$);

    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {

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

    this.chartFilterType$.distinctUntilChanged().subscribe(s => {
      this.fetchData(true);
    });
  }

  public fetchData(refresh: boolean) {
    this.store.dispatch(this._reportsActions.getBalanceSheet(refresh));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
