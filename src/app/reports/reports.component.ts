import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Options } from 'highcharts';

@Component({
    selector: 'ns-reports',
    moduleId: module.id,
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})

export class ReportsComponent {
    public pageTitle: string = 'Profit And Loss';
    constructor(private _routerExtension: RouterService) {
    }

    goBack() {
        this._routerExtension.router.navigate(['/home']);
    }

    pageChanged(args) {
        this.pageTitle = args.index === 0 ? 'Profit And Loss' : 'Balance Sheet';
    }
}
