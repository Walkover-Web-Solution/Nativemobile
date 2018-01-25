import { Component } from '@angular/core';
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: 'ns-reports',
  moduleId: module.id,
  templateUrl: './reports.component.html',
})

export class ReportsComponent {
  constructor(private _routerExtension: RouterExtensions) {

  }

  goBack() {
    this._routerExtension.back();
  }
}
