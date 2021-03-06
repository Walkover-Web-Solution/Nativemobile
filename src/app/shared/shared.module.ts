import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {MyDrawerItemComponent} from './my-drawer-item/my-drawer-item.component';
import {MyDrawerComponent} from './my-drawer/my-drawer.component';
import {MyButonComponent} from './my-button/my-botton.component';
import {MyLogoutComponent} from './logout-button/logout-botton.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {MyChipsComponent} from './my-chips/my-chips.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {MyHeaderComponent} from './my-header/my-header.component';
import {LaddaModule} from 'angular2-ladda';
import {AuthServiceConfig, GoogleLoginProvider, LinkedinLoginProvider, SocialLoginModule} from 'ng4-social-login';
import {VsForDirective} from './ng2-vs-for/ng2-vs-for';

const matModules = [MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMomentDateModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressSpinnerModule
];

const SOCIAL_CONFIG = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('641015054140-3cl9c3kh18vctdjlrt9c8v0vs85dorv2.apps.googleusercontent.com')
    },
    {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider('817roify24ig8g')
    }
], false);

export function provideConfig() {
    return SOCIAL_CONFIG;
}


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        LaddaModule.forRoot({
            style: 'slide-left',
            spinnerSize: 30
        }),
        SocialLoginModule,
        ...matModules
    ],
    declarations: [
        MyDrawerComponent,
        MyDrawerItemComponent,
        MyButonComponent,
        MyLogoutComponent,
        PieChartComponent,
        MyChipsComponent,
        MyHeaderComponent,
        VsForDirective
    ],
    exports: [
        MyDrawerComponent,
        MyButonComponent,
        MyLogoutComponent,
        MyChipsComponent,
        PieChartComponent,
        MyHeaderComponent,
        LaddaModule,
        VsForDirective,
        ...matModules
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
    ]
})
export class SharedModule {
}
