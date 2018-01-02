import { Component, OnInit } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ns-tax-rate',
  moduleId: module.id,
  templateUrl: `./taxRate.component.html`,
  styleUrls: ['./taxRate.component.css']
})
export class TaxRateComponent implements OnInit {
  public chartType: string;
  public items: Array<{ text: string, selected: boolean, val: string }>;
  constructor(private routerExtensions: RouterExtensions, private pageRoute: PageRoute, private store: Store<AppState>) {

    this.items = [
      { val: '1', text: 'GST', selected: false },
      { val: '2', text: 'IGST', selected: false },
      { val: '3', text: 'GST 1', selected: false },
      { val: '4', text: 'GST 5%', selected: false },
      { val: '5', text: 'I GST 1', selected: false },
    ];

  }

  ngOnInit() {

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

  }

  setSelectedItem(selVal) {
    this.items.forEach(p => {
      if (p.val === selVal) {
        p.selected = true;
      }
    });
  }
}
