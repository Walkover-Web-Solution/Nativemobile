import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProfitLossData} from "~/models/api-models/tb-pl-bs";
import {AppState} from "~/store";
import {Store} from "@ngrx/store";
import {ReportsAction} from "~/actions/reports/reports.action";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Page} from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-pl-data,[ns-pl-data]',
  moduleId: module.id,
  templateUrl: './pl-data.component.html'
})

export class PlDataComponent implements OnInit {
  public showLoader: Observable<boolean>;
  public data$: Observable<ProfitLossData>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _reportsActions: ReportsAction, private page: Page) {
    this.data$ = this.store.select(s => s.report.profitLossSheet.data).takeUntil(this.destroyed$);

    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
    this.fetchData(true);

    this.data$.subscribe(da => {
      if (da && da.incArr) {
        da.incArr.forEach(fa => {
          console.log(JSON.stringify(fa.groupName));
        });
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
