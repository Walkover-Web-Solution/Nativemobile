import {map, takeUntil} from 'rxjs/operators';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {RouterService} from '../../../services/router.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {MyDrawerItem} from '../../../shared/my-drawer-item/my-drawer-item';
import {MyDrawerComponent} from '../../../shared/my-drawer/my-drawer.component';

@Component({
    selector: 'ns-currencies',
    moduleId: module.id,
    templateUrl: './currencies.component.html'
})

export class CurrenciesComponent implements OnInit, OnDestroy {
    public navItemObj$: Observable<MyDrawerItem[]>;
    @ViewChild('myDrawer') public myDrawer: MyDrawerComponent;
    public currenciesStream$: Observable<string[]>;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private routerExtensions: RouterService) {
        this.currenciesStream$ = this.store.select(state => state.general.currencies).pipe(takeUntil(this.destroyed$));
        this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).pipe(map(p => {
            for (const iterator of p) {
                if (iterator.router) {
                    if (iterator.router === '/settings') {
                        iterator.isSelected = true;
                    } else {
                        iterator.isSelected = false;
                    }
                }
            }
            return p;
        }));
    }

    public ngOnInit() {
        //
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public toggleDrawer() {
        this.myDrawer.toggle();
    }
}
