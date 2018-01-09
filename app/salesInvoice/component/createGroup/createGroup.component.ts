import { Component } from '@angular/core';
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";

@Component({
  selector: 'ns-group-create',
  templateUrl: `./createGroup.component.html`,
  moduleId: module.id,
  styleUrls: [
    './createGroup.component.css'
  ]
})
export class CreateGroupComponent {
  public myItems: SegmentedBarItem[];
  public selectedIndex: number = 0;
  constructor() {
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
