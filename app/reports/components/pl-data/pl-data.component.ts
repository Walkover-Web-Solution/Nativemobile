import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProfitLossData} from "~/models/api-models/tb-pl-bs";
import {AppState} from "~/store";
import {Store} from "@ngrx/store";
import {ReportsAction} from "~/actions/reports/reports.action";

@Component({
  selector: 'ns-pl-data,[ns-pl-data]',
  templateUrl: 'pl-data.component.html'
})

export class PlDataComponent implements OnInit {
  public showLoader: Observable<boolean>;
  public data$: Observable<ProfitLossData>;

  constructor(private store: Store<AppState>, private _reportsActions: ReportsAction) {
  }

  ngOnInit() {
    this.fetchData(true);
  }

  public fetchData(refresh: boolean) {
    this.store.dispatch(this._reportsActions.getProfitLossSheet(refresh));
  }
}
