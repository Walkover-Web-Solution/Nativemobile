import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChartFilterType, ChartType, IProfitLossChartResponse, IHistoryChartData } from '~/models/interfaces/dashboard.interface';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import { Page } from 'tns-core-modules/ui/page/page';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ReportsAction } from "~/actions/reports/reports.action";
import * as _ from 'lodash';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'ns-new-pl-chart,[ns-new-pl-chart]',
  moduleId: module.id,
  templateUrl: `./new-pl-chart.component.html`,
  styleUrls: ["./new-pl-chart.component.scss"]
})
export class NewPlChartComponent implements OnInit, OnDestroy {

  public incomeData$: Observable<IHistoryChartData>;
  public expensesData$: Observable<IHistoryChartData[]>;
  public categories: string[] = [];
  public series: Array<{ name: string, data: number[] }>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private page: Page, private _reportActions: ReportsAction, private cd: ChangeDetectorRef) {
    this.incomeData$ = this.store.select(st => st.newReport.incomeData).takeUntil(this.destroyed$);
    this.expensesData$ = this.store.select(st => st.newReport.expensesData).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
    combineLatest(this.incomeData$, this.expensesData$).subscribe(chartData => {
      let incomeData;
      let expensesData;

      if (chartData[0] && chartData[1]) {
        this.resetSeriesData();
        incomeData = chartData[0];
        expensesData = chartData[1];
      }
    });
  }

  public resetSeriesData() {
    this.categories = [];
    this.series = [];
  }

  public genSeries(incomeData: IHistoryChartData, expensesData: IHistoryChartData[]) {
    let categories;
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
