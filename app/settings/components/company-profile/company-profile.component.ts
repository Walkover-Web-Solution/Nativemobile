import { Component, ViewChild } from '@angular/core';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { CompanyResponse, States } from '~/models/api-models/Company';
import { createSelector } from 'reselect';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValueList } from 'nativescript-drop-down';
import { NsDropDownOptions } from '~/models/other-models/HelperModels';
import { IContriesWithCodes } from '~/shared/static-data/countryWithCodes';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-company-profile',
  moduleId: module.id,
  templateUrl: './company-profile.component.html'
})

export class CompanyProfileComponent implements OnInit {

  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  public selectedCompany$: Observable<CompanyResponse>;
  public companyProfileForm: FormGroup;
  public countrySourceStream$: Observable<IContriesWithCodes[]>;
  public countrySource: ValueList<string>;
  public stateStream$: Observable<States[]>;
  public stateSource: ValueList<string>;
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
    });

    this.countrySourceStream$ = this.store.select(s => s.general.contriesWithCodes);
    this.stateStream$ = this.store.select(s => s.general.states);
    this.selectedCompany$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      if (!companies) {
        return;
      }

      return companies.find(cmp => cmp.uniqueName === uniqueName);
    })).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  public ngOnInit() {
    this.companyProfileForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      panNumber: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      address: [''],
      baseCurrency: [''],
      isMultipleCurrency: ['']
    });

    this.selectedCompany$.subscribe(s => {
      if (s) {
        this.companyProfileForm.patchValue(s);
      }
    });

    // this.countrySourceStream$.subscribe(countries => {
    //   let cntArray: NsDropDownOptions[] = [];
    //   if (countries) {
    //     countries.forEach(cnt => {
    //       cntArray.push({ display: `${cnt.countryflag} - ${cnt.countryName}`, value: cnt.countryflag });
    //     });
    //   }
    //   this.countrySource = new ValueList(cntArray);
    // });

    this.stateStream$.subscribe(states => {
      let statesArray: NsDropDownOptions[] = [];
      if (states) {
        states.forEach(stt => {
          statesArray.push({ display: `${stt.code} - ${stt.name}`, value: stt.code });
        });
      }
      this.stateSource = new ValueList(statesArray);
    });
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  public submit() {

  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
