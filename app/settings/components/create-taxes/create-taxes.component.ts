import { Component, ViewChild } from '@angular/core';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ValueList, SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { NsDropDownOptions } from '~/models/other-models/HelperModels';
import { Page } from 'tns-core-modules/ui/page/page';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as moment from 'moment/moment';

const taxesType: NsDropDownOptions[] = [
  { display: 'GST', value: 'GST' },
  { display: 'InputGST', value: 'InputGST' },
  { display: 'Others', value: 'others' }
];

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
  public taxTypeList: ValueList<String>;
  public taxDurationList: ValueList<string>;
  public days: ValueList<string>;
  public showLinkedAccounts: boolean = false;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private store: Store<AppState>, private _fb: FormBuilder, private page: Page) {
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
    }).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  public ngOnInit() {
    this.taxForm = this._fb.group({
      name: ['', Validators.required],
      taxNumber: ['', Validators.required],
      taxType: ['', Validators.required],
      taxValue: ['', Validators.required],
      date: [moment().format('DD-MM-YYYY'), Validators.required],
      duration: ['', Validators.required],
      taxFileDate: ['', Validators.required],
      account: ['']
    });
    this.taxTypeList = new ValueList(taxesType);
    this.taxDurationList = new ValueList(taxDuration);

    let daysArr: NsDropDownOptions[] = [];
    for (let i = 1; i <= 31; i++) {
      daysArr.push({ display: i.toString(), value: i.toString() });
    }

    this.days = new ValueList(daysArr);

  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public taxTypeChenged(args: SelectedIndexChangedEventData) {
    let getVal = this.taxTypeList.getValue(args.newIndex);
    this.showLinkedAccounts = getVal === 'others';
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  public openDatePicker() {
    const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
    const picker = new ModalPicker();
    picker.pickDate({
      title: "Select Your Birthday",
      theme: "dark",
      maxDate: new Date(new Date().getFullYear(), 11, 31)
    }).then((result) => {
      let date = `${result.day}-${result.month}-${result.year}`
      this.taxForm.get('date').patchValue(date);
    }).catch((error) => {
      console.log("Error: " + JSON.stringify(error));
    });
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
