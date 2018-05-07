import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { MyDrawerItem } from '../../../shared/my-drawer-item/my-drawer-item';
import { AppState } from '../../../store';
import { RouterService } from '../../../services/router.service';
import { MyDrawerComponent } from '../../../shared/my-drawer/my-drawer.component';
import { DashboardActions } from '../../../actions/dashboard/dashboard.action';

@Component({
    selector: 'ns-dashboard-chart',
    moduleId: module.id,
    templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnInit, OnDestroy {

    public navItemObj$: Observable<MyDrawerItem[]>;
    @ViewChild('myDrawer') public myDrawer: MyDrawerComponent;
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
        // this.store.dispatch(this._dashboardActions.getExpensesChartData());
        // this.store.dispatch(this._dashboardActions.getRevenueChartData());
    }
    public toggleDrawer() {
        this.myDrawer.toggle();
    }

    public ngOnDestroy() {
        this.store.dispatch(this._dashboardActions.resetDashboardState());
    }
}
