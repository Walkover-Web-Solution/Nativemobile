import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// nativescript
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptCommonModule} from 'nativescript-angular/common';

import {SharedModule} from '../shared/shared.module';
import {TlPlRoutes} from './tlpl.routes';
import {RouterModule} from '../common';
import {TlPlComponent} from './tlpl.component';
import {AccLedgerComponent} from './ledger/acc-ledger.component';
import {CompoundEntryDialogComponent} from './compoundEntryDialog/compoundEntryDialog.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        FormsModule,
        RouterModule.forChild(TlPlRoutes),
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [TlPlComponent, AccLedgerComponent, CompoundEntryDialogComponent],
    entryComponents: [CompoundEntryDialogComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TlPlModule {
}
