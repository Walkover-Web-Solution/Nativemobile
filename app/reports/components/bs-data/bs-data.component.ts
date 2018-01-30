import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProfitLossData} from "~/models/api-models/tb-pl-bs";
import {AppState} from "~/store";
import {Store} from "@ngrx/store";
import {ReportsAction} from "~/actions/reports/reports.action";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Page} from "tns-core-modules/ui/page";
import {ChildGroup} from "~/models/api-models/Search";

@Component({
  selector: 'ns-bs-data,[ns-bs-data]',
  moduleId: module.id,
  templateUrl: './bs-data.component.html'
})

export class BsDataComponent implements OnInit {
  public showLoader: Observable<boolean>;
  public data$: Observable<ProfitLossData>;
  public incArr: ChildGroup[] = [];
  public expArr: ChildGroup[] = [];
  public totalIncome: number = 0;
  public totalExpense: number = 0;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _reportsActions: ReportsAction, private page: Page) {
    this.data$ = this.store.select(s => s.report.profitLossSheet.data).takeUntil(this.destroyed$);

    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
    this.fetchData(true);

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
  }

  public fetchData(refresh: boolean) {
    this.store.dispatch(this._reportsActions.getBalanceSheet(refresh));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
