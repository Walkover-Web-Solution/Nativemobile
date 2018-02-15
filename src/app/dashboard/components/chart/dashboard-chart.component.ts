import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
// import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { Store } from '@ngrx/store';
import { MyDrawerItem } from '../../../shared/my-drawer-item/my-drawer-item';
import { AppState } from '../../../store';
import { RouterService } from '../../../services/router.service';
import { MyDrawerComponent } from '../../../shared/my-drawer/my-drawer.component';

@Component({
    selector: 'ns-dashboard-chart',
    moduleId: module.id,
    templateUrl: `./dashboard-chart.component.html`
})
export class DashboardChartComponent implements OnInit {

    public navItemObj$: Observable<MyDrawerItem[]>;
    @ViewChild('myDrawer') public myDrawer: MyDrawerComponent;
    constructor(private store: Store<AppState>, private routerExtensions: RouterService) {
        this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).map(p => {
            for (const iterator of p) {
                if (iterator.router) {
                    if (iterator.router === '/dashboard') {
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

    }
    public toggleDrawer() {
        this.myDrawer.toggle();
    }
}
