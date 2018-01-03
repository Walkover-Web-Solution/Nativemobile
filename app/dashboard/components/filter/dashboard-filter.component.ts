import { Component, OnInit } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import { Observable } from 'rxjs';
import { ChartFilterType, ChartType } from '~/models/interfaces/dashboard.interface';

@Component({
  selector: 'ns-dashboard-filter',
  moduleId: module.id,
  templateUrl: `./dashboard-filter.component.html`,
  styleUrls: ['./dashboard-filter.component.css']
})
export class DashboardFilterComponent implements OnInit {
  public chartType: ChartType;
  public items: Array<{ text: string, selected: boolean, val: ChartFilterType }>;
  constructor(private routerExtensions: RouterExtensions, private pageRoute: PageRoute, private store: Store<AppState>,
    private _dashboardActions: DashboardActions) {

    this.items = [
      { val: ChartFilterType.ThisMonthToDate, text: 'This Month to Date', selected: false },
      { val: ChartFilterType.ThisQuarterToDate, text: 'This Quarter to Date', selected: false },
      { val: ChartFilterType.ThisFinancialYearToDate, text: 'This Financial Year to Date', selected: false },
      { val: ChartFilterType.ThisYearToDate, text: 'This Year to Date', selected: false },
      { val: ChartFilterType.LastMonth, text: 'Last Month', selected: false },
      { val: ChartFilterType.LastQuater, text: 'Last Quater', selected: false },
      { val: ChartFilterType.LastFiancialYear, text: 'Last Fiancial Year', selected: false },
      { val: ChartFilterType.LastYear, text: 'Last Year', selected: false },
      { val: ChartFilterType.Custom, text: 'Custom', selected: false },
    ];
  }

  ngOnInit() {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .subscribe((params) => {
        this.chartType = Number(params['chartType']) as ChartType;
      });
    if (this.chartType === ChartType.Revenue) {
      this.store.select(p => p.dashboard.revenueChartFilter).take(1).subscribe(s => {
        this.setSelectedItem(s);
      });
    } else {
      this.store.select(p => p.dashboard.expensesChartFilter).take(1).subscribe(s => {
        this.setSelectedItem(s);
      });
    }
  }

  onNavBtnTap() {
    this.routerExtensions.backToPreviousPage();
  }

  changeCheckedRadio(item: { val: ChartFilterType, text: string, selected: boolean }) {
    this.items.forEach(option => {
      option.selected = option.val === item.val;
    });
  }

  saveAndClose() {
    let item = this.items.find(f => f.selected);
    this.store.dispatch(this._dashboardActions.setChartFilter(this.chartType, item.val));
    // this.routerExtensions.backToPreviousPage();
    this.routerExtensions.navigateByUrl('/dashboard', { clearHistory: true });
  }

  setSelectedItem(selVal) {
    this.items.forEach(p => {
      if (p.val === selVal) {
        p.selected = true;
      }
    });
  }
}
