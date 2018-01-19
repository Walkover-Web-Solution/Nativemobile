import { Component, ViewChild } from '@angular/core';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ValueList } from 'nativescript-drop-down';
import { NsDropDownOptions } from '~/models/other-models/HelperModels';

const taxDuration: NsDropDownOptions[] = [
  { display: 'Monthly', value: 'MONTHLY' },
  { display: 'Quarterly', value: 'QUARTERLY' },
  { display: 'Half-Yearly', value: 'HALFYEARLY' },
  { display: 'Yearly', value: 'YEARLY' }
];

@Component({
  selector: 'ns-create-taxes',
  moduleId: module.id,
  templateUrl: './create-taxes.component.html'
})

export class CreateTaxesComponent implements OnInit {

  public navItemObj$: Observable<MyDrawerItem[]>;
  public taxForm: FormGroup;
  public taxDurationList: ValueList<string>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  constructor(private store: Store<AppState>, private _fb: FormBuilder) {
    this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).map(p => {
      for (const iterator of p) {
        if (iterator.router) {
          if (iterator.router === '/settings') {
            iterator.isSelected = true;
          } else {
            iterator.isSelected = false;
          }
        }
      }
      return p;
    });
  }

  public ngOnInit() {
    this.taxForm = this._fb.group({
      name: ['', Validators.required],
      taxType: ['', Validators.required],
      taxValue: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', Validators.required],
      taxFileDate: ['', Validators.required]
    });

    this.taxDurationList = new ValueList(taxDuration);
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

}
