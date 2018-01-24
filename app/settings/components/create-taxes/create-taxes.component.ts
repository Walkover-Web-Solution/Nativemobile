import {Component, ViewChild} from '@angular/core';
import {MyDrawerItem} from '~/shared/my-drawer-item/my-drawer-item';
import {Observable} from 'rxjs/Observable';
import {RadSideDrawerComponent} from 'nativescript-pro-ui/sidedrawer/angular';
import {AppState} from '~/store';
import {Store} from '@ngrx/store';
import {DrawerTransitionBase} from 'nativescript-pro-ui/sidedrawer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AfterViewInit, OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {SelectedIndexChangedEventData, ValueList} from 'nativescript-drop-down';
import {NsDropDownOptions} from '~/models/other-models/HelperModels';
import {Page} from 'tns-core-modules/ui/page/page';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import * as moment from 'moment/moment';
import {SettingsTaxesActions} from '~/actions/settings/taxes/settings.taxes.action';
import {PageRoute, RouterExtensions} from 'nativescript-angular/router';
import {IFlattenAccountsResultItem} from '~/models/interfaces/flattenAccountsResultItem.interface';
import {GeneralActions} from '~/actions/general/general.actions';
import {TaxResponse} from '~/models/api-models/Company';
import * as dialogs from 'ui/dialogs';
import {TNSFontIconService} from 'nativescript-ngx-fonticon';
import * as _ from 'lodash';

const taxesType: NsDropDownOptions[] = [
  {display: 'GST', value: 'GST'},
  {display: 'InputGST', value: 'InputGST'},
  {display: 'Others', value: 'others'}
];

const taxDuration: NsDropDownOptions[] = [
  {display: 'Monthly', value: 'MONTHLY'},
  {display: 'Quarterly', value: 'QUARTERLY'},
  {display: 'Half-Yearly', value: 'HALFYEARLY'},
  {display: 'Yearly', value: 'YEARLY'}
];

@Component({
  selector: 'ns-create-taxes',
  moduleId: module.id,
  templateUrl: './create-taxes.component.html'
})

export class CreateTaxesComponent implements OnInit, AfterViewInit {

  public navItemObj$: Observable<MyDrawerItem[]>;
  public taxForm: FormGroup;
  public taxTypeList: ValueList<String>;
  public taxDurationList: ValueList<string>;
  public days: ValueList<string>;
  public showLinkedAccounts: boolean = false;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  public isCreateTaxInProcess$: Observable<boolean>;
  public isCreateTaxSuccess$: Observable<boolean>;
  public isUpdateTaxInProcess$: Observable<boolean>;
  public isUpdateTaxSuccess$: Observable<boolean>;
  public flattenAccountsStream$: Observable<IFlattenAccountsResultItem[]>;
  public flatternAccountList: ValueList<string>;
  public selectedTaxObj: TaxResponse;
  private taxList$: Observable<TaxResponse[]>;
  private _sideDrawerTransition: DrawerTransitionBase;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _fb: FormBuilder, private page: Page,
              private _settingsTaxesActions: SettingsTaxesActions, private routerExtensions: RouterExtensions,
              private _generalActinos: GeneralActions, private pageRoute: PageRoute, private fonticon: TNSFontIconService) {

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
      account: [],
      accounts: []
    });

    this.taxList$ = this.store.select(p => p.company.taxes).takeUntil(this.destroyed$);
    this.isCreateTaxInProcess$ = this.store.select(s => s.company.isCreateTaxInProcess).takeUntil(this.destroyed$);
    this.isCreateTaxSuccess$ = this.store.select(s => s.company.isCreateTaxSuccess).takeUntil(this.destroyed$);
    this.isUpdateTaxInProcess$ = this.store.select(s => s.company.isUpdateTaxInProcess).takeUntil(this.destroyed$);
    this.isUpdateTaxSuccess$ = this.store.select(s => s.company.isUpdateTaxSuccess).takeUntil(this.destroyed$);
    this.flattenAccountsStream$ = this.store.select(s => s.general.flattenAccounts).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  public ngOnInit() {
    this.selectedTaxObj = null;
    this.store.dispatch(this._generalActinos.getFlattenAccount());

    this.taxTypeList = new ValueList(taxesType);
    this.taxDurationList = new ValueList(taxDuration);

    let daysArr: NsDropDownOptions[] = [];
    for (let i = 1; i <= 31; i++) {
      daysArr.push({display: i.toString(), value: i.toString()});
    }
    this.days = new ValueList(daysArr);

    this.flattenAccountsStream$.subscribe(s => {
      let flattenAccounts: NsDropDownOptions[] = [];
      if (s) {
        s.forEach(acc => {
          flattenAccounts.push({display: acc.name, value: acc.uniqueName});
        });
      }
      this.flatternAccountList = new ValueList<string>(flattenAccounts);
    });

    this.isCreateTaxSuccess$.subscribe(s => {
      if (s) {
        this.routerExtensions.navigate(['taxes']);
        this.store.dispatch(this._settingsTaxesActions.ResetCreateTaxUi());
      }
    });
    this.isUpdateTaxSuccess$.subscribe(s => {
      if (s) {
        this.selectedTaxObj = null;
        this.routerExtensions.navigate(['taxes']);
        this.store.dispatch(this._settingsTaxesActions.ResetUpdateTaxUi());
      }
    })
  }

  public ngAfterViewInit() {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .subscribe(params => {
        if ('uniqueName' in params) {
          let selectedTaxUniqueName = params.uniqueName;

          this.taxList$.take(1).subscribe(taxes => {
            this.selectedTaxObj = _.cloneDeep(taxes.find(tx => tx.uniqueName === selectedTaxUniqueName));
            this.fillTaxGroupForm(this.selectedTaxObj);
          });
        }
      })
  }

  public fillTaxGroupForm(tax: TaxResponse) {
    let formObj = tax;

    if (formObj.taxType) {
      formObj.taxType = this.taxTypeList.getIndex(formObj.taxType).toString();
    } else {
      formObj.taxType = this.taxTypeList.getIndex('others').toString();
      // formObj.account = this.flatternAccountList.getIndex(formObj.accounts.uniqueName)
    }
    this.taxTypeChanged({newIndex: Number(formObj.taxType)});

    if (formObj.duration) {
      formObj.duration = this.taxDurationList.getIndex(formObj.duration).toString();
    }

    if (formObj.taxFileDate) {
      formObj.taxFileDate = this.days.getIndex(formObj.taxFileDate.toString());
    }

    if (formObj.taxDetail && formObj.taxDetail.length > 0) {
      formObj.taxValue = formObj.taxDetail[0].taxValue;
      formObj.date = formObj.taxDetail[0].date;
    }

    this.taxForm.patchValue(formObj);
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public taxTypeChanged(args: Partial<SelectedIndexChangedEventData>) {
    let getVal = this.taxTypeList.getValue(args.newIndex);
    this.showLinkedAccounts = getVal === 'others';
  }

  public accountChanged(args: SelectedIndexChangedEventData) {
    let getVal = this.flatternAccountList.getItem(args.newIndex);
    this.taxForm.get('accounts').patchValue([{
      name: getVal.display,
      uniqueName: getVal.value
    }]);
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
      maxDate: new Date(new Date().getFullYear(), 11, 31),
      startingDate: this.selectedTaxObj && this.selectedTaxObj.date ? moment(this.selectedTaxObj.date, 'DD-MM-YYYY').toDate() : moment().toDate()
    }).then((result) => {
      let date = `${result.day}-${result.month}-${result.year}`
      this.taxForm.get('date').patchValue(date);
    }).catch((error) => {
      console.log("Error: " + JSON.stringify(error));
    });
  }

  public submit() {
    if (this.taxForm.invalid) {
      dialogs.alert({title: 'Error', message: 'Please Fill All Details', okButtonText: 'Close'});
      return;
    }

    let dataToSave = this.taxForm.value;
    dataToSave.taxDetail = [{
      taxValue: dataToSave.taxValue,
      date: dataToSave.date
    }];

    dataToSave.taxType = this.taxTypeList.getValue(dataToSave.taxType);
    dataToSave.duration = this.taxDurationList.getValue(dataToSave.duration);
    dataToSave.taxFileDate = this.days.getValue(dataToSave.taxFileDate);

    if (!this.selectedTaxObj) {
      dataToSave.accounts = dataToSave.taxType === 'others' ? dataToSave.accounts : [];

      this.store.dispatch(this._settingsTaxesActions.CreateTax(dataToSave));
    } else {
      dataToSave.uniqueName = this.selectedTaxObj.uniqueName;

      this.store.dispatch(this._settingsTaxesActions.UpdateTax(dataToSave));
    }
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
