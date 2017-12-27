import { Component, OnInit } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';

@Component({
  selector: 'ns-dashboard-filter',
  moduleId: module.id,
  templateUrl: `./dashboard-filter.component.html`
})
export class DashboardFilterComponent implements OnInit {
  public chartType: string;
  public items: Array<{ text: string, selected: boolean, val: string }>;
  constructor(private routerExtensions: RouterExtensions, private pageRoute: PageRoute, private store: Store<AppState>,
    private _dashboardActions: DashboardActions) {

    this.items = [
      { val: '1', text: 'This Month to Date', selected: false },
      { val: '2', text: 'This Quarter to Date', selected: false },
      { val: '3', text: 'This Financial Year to Date', selected: false },
      { val: '4', text: 'This Year to Date', selected: false },
      { val: '5', text: 'Last Month', selected: false },
      { val: '6', text: 'Last Quater', selected: false },
      { val: '7', text: 'Last Fiancial Year', selected: false },
      { val: '8', text: 'Last Year', selected: false },
      { val: '9', text: 'Custom', selected: false },
    ];

  }

  ngOnInit() {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .subscribe((params) => {
        this.chartType = params['chartType'];
      });

    // this.store.select(p => p.dashboard).map(f => {
    //   if (this.chartType === 'revenue') {
    //     this.selectedFilterVal = f.revenueChartFilter;
    //   } else {
    //     this.selectedFilterVal = f.expensesChartFilter;
    //   }
    // })
  }

  onNavBtnTap() {
    this.routerExtensions.backToPreviousPage();
  }

  changeCheckedRadio(item: { val: string, text: string, selected: boolean }) {
    this.items.forEach(option => {
      option.selected = option.val === item.val;
    });
  }

  saveAndClose() {
    let item = this.items.find(f => f.selected);
    this.store.dispatch(this._dashboardActions.setChartFilter(this.chartType, item.val));
    this.routerExtensions.backToPreviousPage();
  }

  setSelectedItem(selVal) {
    this.items.forEach(p => {
      if (p.val === selVal) {
        p.selected = true;
      }
    })
  }
}
