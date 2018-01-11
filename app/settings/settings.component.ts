import { Component } from '@angular/core';

@Component({
  selector: 'ns-settings',
  moduleId: module.id,
  templateUrl: `./settings.component.html`
})
export class SettingsComponent {
  public items: Array<{ icon: string, text: string, path: string }>;
  constructor() {
    this.items = [
      { text: 'Company Profile', icon: '', path: '' },
      { text: 'Currencies', icon: '', path: '' },
      { text: 'Taxes', icon: '', path: '' },
      { text: 'Permission', icon: '', path: '' },
      { text: 'Logout', icon: '', path: '' },
    ]
  }
}
