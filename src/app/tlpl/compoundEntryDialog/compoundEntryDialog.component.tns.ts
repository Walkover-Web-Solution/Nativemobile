import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ITransactionItem} from '../../models/interfaces/ledger.interface';
import {ModalDialogParams} from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'ns-compound-entry-dialog',
    templateUrl: './compoundEntryDialog.component.html',
    moduleId: module.id,
    // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompoundEntryDialogComponent implements OnInit, AfterViewInit {
    entryTotal: number = 0;
    dialogData: { compoundEntries: ITransactionItem[], entryDate: string | Date };

    constructor(private params: ModalDialogParams, private _cdRef: ChangeDetectorRef) {
        this.dialogData = this.params.context.data;
        // console.log(JSON.stringify(this.dialogData.compoundEntries));
    }

    ngOnInit() {
        this.entryTotal = this.dialogData.compoundEntries.reduce((ac, cv) => {
            return ac + cv.amount
        }, 0);
    }

    ngAfterViewInit() {
        // this._cdRef.detectChanges();
    }

    close() {
        this.params.closeCallback();
    }
}
