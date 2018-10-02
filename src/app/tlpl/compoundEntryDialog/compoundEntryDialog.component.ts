import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ITransactionItem} from '../../models/interfaces/ledger.interface';

@Component({
    selector: 'ns-compound-entry-dialog',
    templateUrl: './compoundEntryDialog.component.html'
})

export class CompoundEntryDialogComponent implements OnInit {
    entryTotal = 0;

    constructor(public dialogRef: MatDialogRef<CompoundEntryDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public dialogData: { compoundEntries: ITransactionItem[], entryDate: string | Date }) {
    }

    ngOnInit() {
        this.entryTotal = this.dialogData.compoundEntries.reduce((ac, cv) => {
            return ac + cv.amount
        }, 0);
    }

    close() {
        this.dialogRef.close();
    }
}
