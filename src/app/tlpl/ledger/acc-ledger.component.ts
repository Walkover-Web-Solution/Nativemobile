import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TBPlBsActions} from '../../actions/tl-pl/tl-pl.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {TransactionsRequest} from '../../models/api-models/Ledger';
import {IMyDrpOptions} from 'mydaterangepicker';

@Component({
    selector: 'ns-acc-ledger',
    moduleId: module.id,
    templateUrl: './acc-ledger.component.html'
})
export class AccLedgerComponent implements OnInit, OnDestroy, OnChanges {
    @Input() accUniqueName: string;
    public request: TransactionsRequest;
    public myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    public dateModel: any = {
        beginDate: {year: 2018, month: 10, day: 9},
        endDate: {year: 2018, month: 10, day: 19}
    };

    constructor(public _tlPlActions: TBPlBsActions, private store: Store<AppState>) {
        this.request = new TransactionsRequest();
    }

    ngOnInit() {
        this.request.from = `${this.dateModel.beginDate.day}-${this.dateModel.beginDate.month}-${this.dateModel.beginDate.year}`;
        this.request.to = `${this.dateModel.endDate.day}-${this.dateModel.endDate.month}-${this.dateModel.endDate.year}`;
        this.request.accountUniqueName = this.accUniqueName;
        this.getTrxData();
    }

    ngOnDestroy() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if ('accUniqueName' in changes && (changes['accUniqueName'].currentValue !== changes['accUniqueName'].previousValue)) {
            // this.request.accountUniqueName = this.accUniqueName;
            // this.getTrxData();
        }
    }

    getTrxData() {
        this.store.dispatch(this._tlPlActions.GetTransactions(this.request));
    }
}
