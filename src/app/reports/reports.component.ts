import {Component} from '@angular/core';
import {RouterService} from '../services/router.service';
import {ChartType} from '../models/interfaces/dashboard.interface';
import {Config} from '../common/utils';

@Component({
    selector: 'ns-reports',
    moduleId: module.id,
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})

export class ReportsComponent {
    public chartType: ChartType = ChartType.ProfitLoss;
    public width: number = 0;
    public pageTitle: string = 'Profit And Loss';
    constructor(private _routerExtension: RouterService) {
        if (Config.IS_WEB) {
            this.width = (window as any).innerWidth;
        }
    }

    goBack() {
        this._routerExtension.router.navigate(['/home']);
    }

    pageChanged(args) {
        this.pageTitle = args.index === 0 ? 'Profit And Loss' : 'Balance Sheet';
    }
}
