import {Component, OnInit} from '@angular/core';
import {RouterService} from '../services/router.service';
import {ChartType} from '../models/interfaces/dashboard.interface';
import {Config} from '../common/utils';
import {AppState} from '../store';
import {Store} from '@ngrx/store';
import {ToasterService} from '../services/toaster.service';

@Component({
    selector: 'ns-reports',
    moduleId: module.id,
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
    public chartType: ChartType = ChartType.ProfitLoss;
    public width = 0;
    public pageTitle = 'Profit And Loss';

    constructor(private _routerExtension: RouterService, private store: Store<AppState>, private _toasterService: ToasterService) {
        if (Config.IS_WEB) {
            this.width = (window as any).innerWidth;
        }
    }

    public ngOnInit() {
        this.store.select(s => s.general.errorString).subscribe(s => {
            if (s && s !== '') {
                this._toasterService.errorToast(s);
            }
        });
    }

    goBack() {
        (this._routerExtension.router as any).navigate(['/home']);
    }

    pageChanged(args) {
        this.pageTitle = args.index === 0 ? 'Profit And Loss' : 'Balance Sheet';
    }
}
