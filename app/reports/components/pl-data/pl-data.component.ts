import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProfitLossData} from "~/models/api-models/tb-pl-bs";
import {AppState} from "~/store";
import {Store} from "@ngrx/store";
import {ReportsAction} from "~/actions/reports/reports.action";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Page} from "tns-core-modules/ui/page";
import {ChildGroup} from "~/models/api-models/Search";
import {ChartFilterType, IProfitLossChartResponse} from "~/models/interfaces/dashboard.interface";

@Component({
  selector: 'ns-pl-data,[ns-pl-data]',
  moduleId: module.id,
  templateUrl: './pl-data.component.html'
})

export class PlDataComponent implements OnInit {
  public showLoader: Observable<boolean>;
  public data$: Observable<ProfitLossData>;
  public chartFilterTitle: string = 'Custom';
  public incArr: ChildGroup[] = [];
  public expArr: ChildGroup[] = [];
  public totalIncome: number = 0;
  public totalExpense: number = 0;
  public profitLossData$: Observable<IProfitLossChartResponse>;
  public chartFilterType$: Observable<ChartFilterType>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _reportsActions: ReportsAction, private page: Page) {
    this.data$ = this.store.select(s => s.report.profitLossSheet.data).takeUntil(this.destroyed$);
    this.profitLossData$ = this.store.select(p => p.report.profitLossChart).takeUntil(this.destroyed$);
    this.chartFilterType$ = this.store.select(p => p.report.profitLossChartFilter).takeUntil(this.destroyed$);

    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {

    this.data$.subscribe(da => {
      if (da) {
        if (da.incArr) {
          this.incArr = da.incArr;
          this.totalIncome = da.incomeTotal;
        }
        if (da.expArr) {
          this.expArr = da.expArr;
          this.totalExpense = da.expenseTotal;
        }
      }
    });

    this.profitLossData$.subscribe(pld => {
      if (pld && pld.chartTitle) {
        this.chartFilterTitle = pld.chartTitle;
      }
    });

    this.chartFilterType$.distinctUntilChanged().subscribe(s => {
      this.fetchData(true);
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
