import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CompanyResponse, ActiveFinancialYear } from '~/models/api-models/Company';
import { createSelector } from 'reselect';

@Component({
  selector: 'ns-revenue-chart',
  moduleId: module.id,
  templateUrl: `./revenue.component.html`
})
export class RevenueChartComponent implements OnInit {
  get categoricalSource(): ObservableArray<any> {
    return this._categoricalSource;
  }
  public activeFinancialYear: ActiveFinancialYear;
  public lastFinancialYear: ActiveFinancialYear;
  public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
  private _categoricalSource: ObservableArray<any>;
  constructor(private store: Store<AppState>) {
    this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      return { companies, uniqueName };
    }));
  }

  ngOnInit() {
    this.companyData$.subscribe(res => {
      if (!res.companies) {
        return;
      }
    });

    this._categoricalSource = new ObservableArray([
      { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
      { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
      { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
    ]);
  }

}
