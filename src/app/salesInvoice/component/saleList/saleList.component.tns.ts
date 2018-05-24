import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {DrawerTransitionBase} from 'nativescript-ui-sidedrawer';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {MyDrawerItem} from '../../../shared/my-drawer-item/my-drawer-item';
import {RouterService} from '../../../services/router.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'ns-sale-list',
    moduleId: module.id,
    templateUrl: './saleList.component.html'
})
export class SaleListComponent implements OnInit {
    public navItemObj$: Observable<MyDrawerItem[]>;
    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;
    constructor(private store: Store<AppState>, private routerExtensions: RouterService) {
        this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).map(p => {
            for (const iterator of p) {
                if (iterator.router) {
                    if (iterator.router === '/sale') {
                        iterator.isSelected = true;
                    } else {
                        iterator.isSelected = false;
                    }
                }
            }
            return p;
        });
    }

    ngOnInit() {
        //
    }
    public get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
