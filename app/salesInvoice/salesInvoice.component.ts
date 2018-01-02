import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-sales-invoice',
  moduleId: module.id,
  templateUrl: `./salesInvoice.component.html`,
  styleUrls: ['./salesInvoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
