import { Component } from '@angular/core';
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

@Component({
  selector: 'ns-stock-create',
  templateUrl: `./createStock.component.html`,
  moduleId: module.id,
  styleUrls: [
    './createStock.component.css'
  ]
})
export class CreateStockComponent {
  public myItems: SegmentedBarItem[];
  public selectedIndex: number = 0;
  constructor(public _routerExtension: RouterExtensions) {
    this.myItems = [];
    let productItem = new SegmentedBarItem();
    let serviceItem = new SegmentedBarItem();

    productItem.title = 'Add Product';
    serviceItem.title = 'Add Service';

    this.myItems.push(productItem, serviceItem);
  }

  public onSelectedIndexChange(args) {
    let segmetedBar = args.object as SegmentedBar;
    this.selectedIndex = segmetedBar.selectedIndex;
  }
}
