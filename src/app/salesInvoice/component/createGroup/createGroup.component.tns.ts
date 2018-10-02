import {Component} from '@angular/core';
import {SegmentedBar, SegmentedBarItem} from 'ui/segmented-bar';
import {RouterService} from '../../../services/router.service';

@Component({
    selector: 'ns-group-create',
    templateUrl: './createGroup.component.html',
    moduleId: module.id,
})
export class CreateGroupComponent {
    public myItems: SegmentedBarItem[];
    public selectedIndex = 0;

    constructor(public _routerExtension: RouterService) {
        this.myItems = [];
        const productItem = new SegmentedBarItem();
        const serviceItem = new SegmentedBarItem();

        productItem.title = 'Add Product';
        serviceItem.title = 'Add Service';

        this.myItems.push(productItem, serviceItem);
    }

    public onSelectedIndexChange(args) {
        const segmetedBar = args.object as SegmentedBar;
        this.selectedIndex = segmetedBar.selectedIndex;
    }
}
