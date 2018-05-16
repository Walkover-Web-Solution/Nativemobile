import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {ModalDialogOptions, ModalDialogService} from 'nativescript-angular/modal-dialog';
import {TBPlBsActions} from '../../actions/tl-pl/tl-pl.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {DownloadLedgerRequest, TransactionsRequest, TransactionsResponse} from '../../models/api-models/Ledger';
import {IMyDateRangeModel, IMyDrpOptions} from 'mydaterangepicker';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/shareReplay';
import {AccountResponse} from '../../models/api-models/Account';
import {underStandingTextData} from './underStandingTextData';
import * as _ from 'lodash';
import {LedgerService} from '../../services/ledger.service';
import {ToasterService} from '../../services/toaster.service';
import * as moment from 'moment/moment';
import {Config} from '../../common/utils';
import {CompoundEntryDialogComponent} from '../compoundEntryDialog/compoundEntryDialog.component';
import {ITransactionItem} from '../../models/interfaces/ledger.interface';

@Component({
    selector: 'ns-acc-ledger',
    moduleId: module.id,
    templateUrl: './acc-ledger.component.html',
    styleUrls: ['./acc-ledger.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccLedgerComponent implements OnInit, OnDestroy, OnChanges {
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
    public isBusy: boolean = false;
    public activeTab: 'credit' | 'debit' = 'debit';
    public totalPages: number = 1;
    public diffTotal: number = 0;
    public activeAccount$: Observable<AccountResponse>;
    public accountDetailsInProgress$: Observable<boolean>;
    public ledgerUnderStandingObj = {
        accountType: '',
        text: {
            cr: '',
            dr: ''
        },
        balanceText: {
            cr: '',
            dr: ''
        }
    };
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(public _tlPlActions: TBPlBsActions, private store: Store<AppState>, private _ledgerService: LedgerService, private _toaster: ToasterService,
                private _cdRef: ChangeDetectorRef, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
        this.request = new TransactionsRequest();
        this.request.page = 0;
        this.transactionData$ = this.store.select(p => p.tlPl.transactionsResponse).takeUntil(this.destroyed$).shareReplay();
        this.isTransactionRequestInProcess$ = this.store.select(p => p.tlPl.transactionInProgress).takeUntil(this.destroyed$);
        this.activeAccount$ = this.store.select(p => p.tlPl.accountDetails).takeUntil(this.destroyed$);
        this.accountDetailsInProgress$ = this.store.select(p => p.tlPl.accountDetailsInProgress).takeUntil(this.destroyed$);
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
                this.detectChanges();
            }
        });
        this.activeAccount$.subscribe(acc => {
            if (acc) {
                this.getUnderstandingText(acc.accountType, acc.name);
            }
        });

        this.isTransactionRequestInProcess$.subscribe(bool => {
            console.log('busy', bool);

            this.isBusy = bool;
            this.detectChanges();
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('accUniqueName' in changes && changes['accUniqueName'].currentValue !== changes['accUniqueName'].previousValue) {
            this.store.dispatch(this._tlPlActions.GetLedgerAccount(changes['accUniqueName'].currentValue));
        }
    }

    loadMore() {
        if (this.request.page === this.totalPages) {
            return;
        } else {
            this.request.page = this.request.page + 1;
            this.store.dispatch(this._tlPlActions.GetMoreTransactions(this.request));
        }
    }

    downloadAttachedFile(fileName: string, e: Event) {
        e.stopPropagation();
        // this._ledgerService.DownloadAttachement(fileName).subscribe(d => {
        //     if (d.status === 'success') {
        //         let blob = base64ToBlob(d.body.uploadedFile, `image/${d.body.fileType}`, 512);
        //         return saveAs(blob, d.body.name);
        //     } else {
        //         this._toaster.errorToast(d.message);
        //     }
        // });
    }

    downloadInvoice(invoiceName: string, e: Event) {
        e.stopPropagation();
        let activeAccount = null;
        this.activeAccount$.take(1).subscribe(p => activeAccount = p);
        let downloadRequest = new DownloadLedgerRequest();
        downloadRequest.invoiceNumber = [invoiceName];

        // this._ledgerService.DownloadInvoice(downloadRequest, activeAccount.uniqueName).subscribe(d => {
        //     if (d.status === 'success') {
        //         let blob = base64ToBlob(d.body, 'application/pdf', 512);
        //         return saveAs(blob, `${activeAccount.name} - ${invoiceName}.pdf`);
        //     } else {
        //         this._toaster.errorToast(d.message);
        //     }
        // });
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
        this.detectChanges();
    }

    getUnderstandingText(selectedLedgerAccountType, accountName) {
        let data = _.cloneDeep(underStandingTextData.find(p => p.accountType === selectedLedgerAccountType));
        if (data) {
            data.balanceText.cr = data.balanceText.cr.replace('<accountName>', accountName);
            data.balanceText.dr = data.balanceText.dr.replace('<accountName>', accountName);

            data.text.dr = data.text.dr.replace('<accountName>', accountName);
            data.text.cr = data.text.cr.replace('<accountName>', accountName);
            this.ledgerUnderStandingObj = _.cloneDeep(data);
        }
    }

    openFromDatePicker(type: string = 'from') {
        if (!Config.IS_MOBILE_NATIVE) return;
        let ModalPicker = require('nativescript-modal-datetimepicker').ModalDatetimepicker;
        const picker = new ModalPicker();
        picker.pickDate({
            title: 'Select From Date',
            theme: 'dark',
            maxDate: new Date(new Date().getFullYear(), 11, 31),
            startingDate: this.request['type'] ? moment(this.request['type'], 'DD-MM-YYYY').format('DD-MM-YYYY') : new Date(new Date().getFullYear(), 11, 31),
        }).then((result) => {
            let date = `${result.day}-${result.month}-${result.year}`;
            this.request[type] = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY')
            this.request.page = 1;
            this.getTrxData();
        }).catch((error) => {
            console.log('Error: ' + JSON.stringify(error));
        });
    }

    openCompoundEntry(txnUniqueName: string) {
        let allItems: ITransactionItem[] = [];

        this.transactionData$.subscribe(t => {
            if (t) {
                allItems.push(...t.debitTransactions.filter(dt => dt.entryUniqueName === txnUniqueName));
                allItems.push(...t.creditTransactions.filter(ct => ct.entryUniqueName === txnUniqueName));
            }
        });

        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {data: {compoundEntries: allItems, entryDate: allItems[0] ? allItems[0].entryDate : ''}},
            fullscreen: true,
        };

        this.modalService.showModal(CompoundEntryDialogComponent, options);

        // this.dialog.open(CompoundEntryDialogComponent, {
        //     data: { compoundEntries: allItems, entryDate: allItems[0] ? allItems[0].entryDate : '' },
        //     height: '400px',
        //     width: '800px',
        // });
    }

    detectChanges() {
        if (!this._cdRef['destroyed']) {
            this._cdRef.detectChanges();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

const base64ToBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    let offset = 0;
    while (offset < byteCharacters.length) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        let i = 0;
        while (i < slice.length) {
            byteNumbers[i] = slice.charCodeAt(i);
            i++;
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        offset += sliceSize;
    }
    return new Blob(byteArrays, {type: contentType});
};
