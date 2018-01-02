import { Component } from '@angular/core';
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";

@Component({
  selector: 'ns-stock-create',
  templateUrl: `./createStock.component.html`,
  moduleId: module.id,
  styleUrls: [
    `./createStock.component.css`
  ]
})
export class CreateStockComponent {
  public myItems: SegmentedBarItem[];
  public selectedIndex: number = 0;
  constructor() {
    this.myItems = [
      { title: 'Add Product' } as SegmentedBarItem,
      { title: 'Add Service' } as SegmentedBarItem
    ];
  }

  public onSelectedIndexChange(args) {
    let segmetedBar = args.object as SegmentedBar;
    this.selectedIndex = segmetedBar.selectedIndex;
  }
}
