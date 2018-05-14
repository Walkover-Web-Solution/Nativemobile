import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '../common';
import {TlPlRoutes} from './tlpl.routes';
import {TlPlComponent} from './tlpl.component';
import {MatAutocompleteModule} from '@angular/material';
import {AccLedgerComponent} from './ledger/acc-ledger.component';
import {MyDateRangePickerModule} from 'mydaterangepicker';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CompoundEntryDialogComponent} from './compoundEntryDialog/compoundEntryDialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(TlPlRoutes),
        ReactiveFormsModule,
        SharedModule,
        MatAutocompleteModule,
        MyDateRangePickerModule,
        InfiniteScrollModule
    ],
    declarations: [TlPlComponent, AccLedgerComponent, CompoundEntryDialogComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [CompoundEntryDialogComponent]
})
export class TlPlModule {
}
