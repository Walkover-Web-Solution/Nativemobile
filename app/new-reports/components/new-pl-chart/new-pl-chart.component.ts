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
  selector: 'ns-new-pl-chart,[ns-new-pl-chart]',
  moduleId: module.id,
  templateUrl: `./new-pl-chart.component.html`,
  styleUrls: ["./new-pl-chart.component.scss"]
})
export class NewPlChartComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private page: Page, private _reportActions: ReportsAction, private cd: ChangeDetectorRef) {
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
