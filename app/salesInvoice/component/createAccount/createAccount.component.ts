import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { GroupService } from '~/services/group.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { GroupResponse } from '~/models/api-models/Group';
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";

@Component({
  selector: 'ns-create-account',
  templateUrl: `./createAccount.component.html`,
  moduleId: module.id
})
export class CreateAccountComponent implements OnInit {
  public addAccountForm: FormGroup;
  public flatAccountWGroupsList: ValueList<string>;
  constructor(private _fb: FormBuilder, private store: Store<AppState>, private groupService: GroupService) {
    //
  }

  public ngOnInit() {
    this.initializeNewForm();
    // get groups list and refine list
    this.groupService.GetGroupSubgroups('currentassets').subscribe(res => {
      let result: Array<{ value: string, display: string }> = [];
      if (res.status === 'success' && res.body.length > 0) {
        let sundryGrp = _.find(res.body, { uniqueName: 'sundrydebtors' });
        if (sundryGrp) {
          let flatGrps = this.groupService.flattenGroup([sundryGrp], []);
          _.forEach(flatGrps, (grp: GroupResponse) => {
            result.push({ display: grp.name, value: grp.uniqueName });
          });
        }
      }
      this.flatAccountWGroupsList = new ValueList(result);
    });
  }

  public initializeNewForm() {
    this.addAccountForm = this._fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      uniqueName: ['', [Validators.required]],
      parentGroupUniqueName: ['', [Validators.required]],
      openingBalanceType: ['CREDIT'],
      openingBalance: [0],
      mobileNo: [''],
      email: ['', Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      attentionTo: [''],
      description: [''],
      country: this._fb.group({
        countryCode: ['']
      }),
      currency: [''],
    });
  }

  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

}
