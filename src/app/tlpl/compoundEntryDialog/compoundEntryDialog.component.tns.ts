import {Component, Inject, OnInit} from '@angular/core';
import {ITransactionItem} from '../../models/interfaces/ledger.interface';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: 'ns-compound-entry-dialog',
    templateUrl: './compoundEntryDialog.component.html',
    moduleId: module.id,
})

export class CompoundEntryDialogComponent implements OnInit {
    entryTotal: number = 0;
    dialogData: { compoundEntries: ITransactionItem[], entryDate: string | Date };

    constructor(private params: ModalDialogParams) {
        this.dialogData = this.params.context.data;
        console.log(JSON.stringify(this.dialogData.compoundEntries));
    }

    ngOnInit() {
        this.entryTotal = this.dialogData.compoundEntries.reduce((ac, cv) => {
            return ac + cv.amount
        }, 0);
    }

    close() {
        this.params.closeCallback();
    }
}
