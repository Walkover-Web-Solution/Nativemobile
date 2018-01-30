import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChartFilterType, ChartType, IProfitLossChartResponse } from '~/models/interfaces/dashboard.interface';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import { Page } from 'tns-core-modules/ui/page/page';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ReportsAction } from "~/actions/reports/reports.action";
import * as _ from 'lodash';

@Component({
  selector: 'ns-pl-chart,[ns-pl-chart]',
  moduleId: module.id,
  templateUrl: `./pl-chart.component.html`,
  styleUrls: ["./pl-chart.component.scss"]
})
export class PlChartComponent implements OnInit, OnDestroy {
  public chartType: ChartType = ChartType.ProfitLoss;
  public requestInFlight: boolean;
  public activeYearData: number[] = [];
  public lastYearData: number[] = [];
  public profitLossData$: Observable<IProfitLossChartResponse>;
  public activeYearRanks: ObservableArray<{ label: string, value: number }> = new ObservableArray([]);
  public lastYearRanks: ObservableArray<{ label: string, value: number }> = new ObservableArray([]);
  public activeYearGrandAmount: number = 0;
  public lastYearGrandAmount: number = 0;
  public activePieChartAmount: number = 0;
  public lastPieChartAmount: number = 0;

  public chartFilterType$: Observable<ChartFilterType>;
  public chartFilterTitle: string = 'Custom';
  public activeYearChartFormatedDate: string;
  public lastYearChartFormatedDate: string;
  private monthsArray: string[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private page: Page, private _reportActions: ReportsAction, private cd: ChangeDetectorRef) {
    this.profitLossData$ = this.store.select(p => p.report.profitLossChart).takeUntil(this.destroyed$);
    this.chartFilterType$ = this.store.select(p => p.report.profitLossChartFilter).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
    this.fetchChartData();

    this.profitLossData$.subscribe(pld => {
      if (pld && pld.profitLossActiveYear) {
        this.activeYearData = pld.profitLossActiveYear
      } else {
        this.resetActiveYearChartData();
      }

      if (pld && pld.profitLossLastYear) {
        this.lastYearData = pld.profitLossLastYear
      } else {
        this.resetLastYearChartData();
      }

      if (pld && pld.chartTitle) {
        this.chartFilterTitle = pld.chartTitle;
      }

      if (pld && pld.lable) {
        this.activeYearChartFormatedDate = pld.lable.activeYearLabel || '';
        this.lastYearChartFormatedDate = pld.lable.lastYearLabel || '';
      }

      if (pld && pld.legend) {
        this.monthsArray = pld.legend;
      }

      this.generateCharts();
      // }
      this.requestInFlight = false;
      this.cd.detectChanges();
    });

  }

  public generateCharts() {
    let activeData = [];
    let lastData = [];

    while (this.activeYearRanks.length) {
      this.activeYearRanks.pop();
    }

    while (this.lastYearRanks.length) {
      this.lastYearRanks.pop();
    }

    this.monthsArray.forEach((mn, index) => {
      activeData.push({ label: mn, value: this.activeYearData[index] || 0 });
      this.activeYearRanks.push({ label: mn, value: this.activeYearData[index] || 0 });

      lastData.push({ label: mn, value: this.lastYearData[index] || 0 });
      this.lastYearRanks.push({ label: mn, value: this.lastYearData[index] || 0 });
    });

    // this.activeYearData.forEach((ad, index) => {
    //   activeData.push({label: this.monthsArray[index], value: ad || 0});
    //   this.activeYearRanks.push({label: this.monthsArray[index], value: ad || 0});
    // });

    // this.lastYearData.forEach((ad, index) => {
    //   lastData.push({label: this.monthsArray[index], value: ad || 0});
    //   this.lastYearRanks.push({label: this.monthsArray[index], value: ad || 0});
    // });

    // this.activeYearRanks.push(activeData);
    this.activeYearGrandAmount = _.sumBy(activeData, 'value') || 0;
    this.activePieChartAmount = this.activeYearGrandAmount >= 1 ? 100 : 0;

    // this.lastYearRanks.push(lastData);
    this.lastYearGrandAmount = _.sumBy(lastData, 'value') || 0;
    this.lastPieChartAmount = this.lastYearGrandAmount >= 1 ? 100 : 0;
  }

  public fetchChartData() {
    this.requestInFlight = true;
    this.store.dispatch(this._reportActions.getProfitLossChartActiveYear(false));
    this.store.dispatch(this._reportActions.getProfitLossChartLastYear(false));
  }

  public calculatePieChartPer(t) {
    let activeYearIndexTotal = this.activeYearRanks.getItem(t.pointIndex).value || 0;
    let lastYearIndexTotal = this.lastYearRanks.getItem(t.pointIndex).value || 0;

    this.activePieChartAmount = Math.round((activeYearIndexTotal * 100) / this.activeYearGrandAmount) || 0;
    this.lastPieChartAmount = Math.round((lastYearIndexTotal * 100) / this.lastYearGrandAmount) || 0;
  }

  public resetActiveYearChartData() {
    this.activeYearData = [];
    while (this.activeYearRanks.length) {
      this.activeYearRanks.pop();
    }

    this.activeYearGrandAmount = 0;
    this.activePieChartAmount = 0;
  }

  public resetLastYearChartData() {
    this.lastYearData = [];
    while (this.lastYearRanks.length) {
      this.lastYearRanks.pop();
    }

    this.lastYearGrandAmount = 0;
    this.lastPieChartAmount = 0;
  }


  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
