import { Component, ViewChild, OnDestroy } from "@angular/core";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Component({
    selector: 'ns-reports-filter',
    moduleId: module.id,
    templateUrl: './reports-filter.component.html'
})
export class ReportsFilterComponent implements OnDestroy {
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor() {

    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
