import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { MyDrawerItem } from '../../../shared/my-drawer-item/my-drawer-item';
import { AppState } from '../../../store';
import { RouterService } from '../../../services/router.service';
import { DashboardActions } from '../../../actions/dashboard/dashboard.action';

@Component({
    selector: 'ns-dashboard-chart',
    moduleId: module.id,
    templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnInit, OnDestroy {

    public navItemObj$: Observable<MyDrawerItem[]>;
    @ViewChild("drawer") public drawerComponent: any;
    private _sideDrawerTransition: any;
    constructor(private store: Store<AppState>, private routerExtensions: RouterService, private _dashboardActions: DashboardActions) {
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

    public get sideDrawerTransition(): any {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public ngOnDestroy() {
        this.store.dispatch(this._dashboardActions.resetDashboardState());
    }
}
