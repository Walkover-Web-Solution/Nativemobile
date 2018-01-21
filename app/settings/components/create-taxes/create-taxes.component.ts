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
import { SettingsTaxesActions } from '~/actions/settings/taxes/settings.taxes.action';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { IFlattenAccountsResultItem } from '~/models/interfaces/flattenAccountsResultItem.interface';
import { GeneralActions } from '~/actions/general/general.actions';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { TaxResponse } from '~/models/api-models/Company';

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
  public isCreateTaxInProcess$: Observable<boolean>;
  public isCreateTaxSuccess$: Observable<boolean>;
  public flattenAccountsStream$: Observable<IFlattenAccountsResultItem[]>;
  public flatternAccountList: ValueList<string>;
  public selectedTaxObj: TaxResponse;
  private taxList$: Observable<TaxResponse[]>;
  private _sideDrawerTransition: DrawerTransitionBase;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private store: Store<AppState>, private _fb: FormBuilder, private page: Page,
    private _settingsTaxesActions: SettingsTaxesActions, private routerExtensions: RouterExtensions,
    private _generalActinos: GeneralActions, private pageRoute: PageRoute) {

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

    this.taxList$ = this.store.select(p => p.company.taxes).takeUntil(this.destroyed$);
    this.isCreateTaxInProcess$ = this.store.select(s => s.company.isCreateTaxInProcess).takeUntil(this.destroyed$);
    this.isCreateTaxSuccess$ = this.store.select(s => s.company.isCreateTaxSuccess).takeUntil(this.destroyed$);
    this.flattenAccountsStream$ = this.store.select(s => s.general.flattenAccounts).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  public ngOnInit() {
    this.store.dispatch(this._generalActinos.getFlattenAccount());

    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .subscribe(params => {
        if ('uniqueName' in params) {
          let selectedTaxUniqueName = params.uniqueName;

          this.taxList$.take(1).subscribe(taxes => {
            this.selectedTaxObj = taxes.find(tx => tx.uniqueName === selectedTaxUniqueName);
            this.taxForm.patchValue(this.selectedTaxObj);
          });
        }
      })

    this.taxTypeList = new ValueList(taxesType);
    this.taxDurationList = new ValueList(taxDuration);

    let daysArr: NsDropDownOptions[] = [];
    for (let i = 1; i <= 31; i++) {
      daysArr.push({ display: i.toString(), value: i.toString() });
    }

    this.days = new ValueList(daysArr);

    this.isCreateTaxSuccess$.subscribe(s => {
      if (s) {
        this.routerExtensions.navigate(['taxes']);
        this.store.dispatch(this._settingsTaxesActions.ResetCreateTaxUi());
      }
    });

    this.flattenAccountsStream$.subscribe(s => {
      let flattenAccounts: NsDropDownOptions[] = [];
      if (s) {
        s.forEach(ss => {
          flattenAccounts.push({ display: ss.name, value: ss.uniqueName });
        })
      }
      this.flatternAccountList = new ValueList(flattenAccounts);
    });
  }

  public fillTaxGroupForm(tax: TaxResponse) {

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

  public submit() {
    let dataToSave = this.taxForm.value;
    dataToSave.accounts = [];

    dataToSave.taxDetail = [{
      taxValue: dataToSave.taxValue,
      date: dataToSave.date
    }];

    dataToSave.taxType = this.taxTypeList.getValue(dataToSave.taxType);
    if (dataToSave.taxType === 'others') {

      let account = this.flatternAccountList.getItem(dataToSave.account);
      dataToSave.accounts.push({
        name: account.display,
        uniqueName: account.value
      });
    }

    this.store.dispatch(this._settingsTaxesActions.CreateTax(dataToSave));
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
