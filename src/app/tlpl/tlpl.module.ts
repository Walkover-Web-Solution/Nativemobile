import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '../common';
import { TlPlRoutes } from './tlpl.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(TlPlRoutes),
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: []
})
export class TlPlModule {
}
