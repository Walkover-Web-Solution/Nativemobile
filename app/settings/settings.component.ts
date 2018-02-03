import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { LoginActions } from '~/actions/login/login.action';
import * as dialogs from 'ui/dialogs';

@Component({
  selector: 'ns-settings',
  moduleId: module.id,
  templateUrl: './settings.component.html',
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent {
  public items: Array<{ icon: string, text: string, path: string }>;
  constructor(private routerExtensions: RouterExtensions, private store: Store<AppState>, private _loginActions: LoginActions) {
    this.items = [
      { text: 'Company Profile', icon: String.fromCharCode(0x61), path: 'company-profile' },
      { text: 'Currencies', icon: String.fromCharCode(0x61), path: 'currencies' },
      { text: 'Taxes', icon: String.fromCharCode(0x62), path: 'taxes' },
      // { text: 'Permission', icon: String.fromCharCode(0x68), path: '' },
      { text: 'Logout', icon: String.fromCharCode(0x67), path: '' },
    ]
  }

  public doAction(item) {
    if (item.text === 'Logout') {
      dialogs.confirm({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        okButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(r => {
        if (r) {
          this.store.dispatch(this._loginActions.logout());
          this.routerExtensions.navigateByUrl('/login', { clearHistory: true });
        }
      });
    } else {
      this.routerExtensions.navigate([item.path]);
    }
  }

  public goBack() {
    this.routerExtensions.back();
  }
}
