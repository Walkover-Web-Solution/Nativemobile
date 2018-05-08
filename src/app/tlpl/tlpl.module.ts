import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '../common';
import {TlPlRoutes} from './tlpl.routes';
import {TlPlComponent} from './tlpl.component';
import {MatAutocompleteModule} from '@angular/material';
import {AccLedgerComponent} from './ledger/acc-ledger.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(TlPlRoutes),
        ReactiveFormsModule,
        SharedModule,
        MatAutocompleteModule,
        MyDateRangePickerModule
    ],
    declarations: [TlPlComponent, AccLedgerComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: []
})
export class TlPlModule {
}
