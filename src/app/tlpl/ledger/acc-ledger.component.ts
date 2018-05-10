import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TBPlBsActions} from '../../actions/tl-pl/tl-pl.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {TransactionsRequest, TransactionsResponse} from '../../models/api-models/Ledger';
import {IMyDateRangeModel, IMyDrpOptions} from 'mydaterangepicker';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/shareReplay';

@Component({
    selector: 'ns-acc-ledger',
    moduleId: module.id,
    templateUrl: './acc-ledger.component.html',
    styleUrls: ['./acc-ledger.component.scss']
})
export class AccLedgerComponent implements OnInit, OnDestroy {
    @Input() accUniqueName: string;
    public request: TransactionsRequest;
    public myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd-mm-yyyy',
    };
    public dateModel: any = {
        beginDate: {year: 2018, month: 10, day: 9},
        endDate: {year: 2018, month: 10, day: 19}
    };
    public transactionData$: Observable<TransactionsResponse>;
    public isTransactionRequestInProcess$: Observable<boolean>;
    public activeTab: 'credit' | 'debit' = 'debit';
    public totalPages: number = 1;
    public diffTotal: number = 0;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(public _tlPlActions: TBPlBsActions, private store: Store<AppState>) {
        this.request = new TransactionsRequest();
        this.transactionData$ = this.store.select(p => p.tlPl.transactionsResponse).takeUntil(this.destroyed$).shareReplay();
        this.isTransactionRequestInProcess$ = this.store.select(p => p.tlPl.transactionInProgress).takeUntil(this.destroyed$);
    }

    ngOnInit() {
        this.request.from = `${this.dateModel.beginDate.day}-${this.dateModel.beginDate.month}-${this.dateModel.beginDate.year}`;
        this.request.to = `${this.dateModel.endDate.day}-${this.dateModel.endDate.month}-${this.dateModel.endDate.year}`;
        this.request.accountUniqueName = this.accUniqueName;
        this.getTrxData();

        this.transactionData$.subscribe(t => {
            if (t) {
                this.totalPages = t.totalPages;
                this.diffTotal = (t.closingBalance.amount - t.forwardedBalance.amount);
            }
        });
    }

    loadMore() {
        if (this.request.page === this.totalPages) {
            return;
        } else {
            this.request.page = this.request.page + 1;
            this.store.dispatch(this._tlPlActions.GetMoreTransactions(this.request));
        }
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        let formatted = event.formatted.split(' - ');
        this.request.from = formatted[0];
        this.request.to = formatted[1];
        this.request.page = 1;
        this.getTrxData();
    }

    getTrxData() {
        this.store.dispatch(this._tlPlActions.GetTransactions(this.request));
    }

    toggleActiveTab() {
        if (this.activeTab === 'credit') {
            this.activeTab = 'debit';
        } else {
            this.activeTab = 'credit';
        }
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
