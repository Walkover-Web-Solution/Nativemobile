import { Component } from '@angular/core';

@Component({
  selector: 'ns-settings',
  moduleId: module.id,
  templateUrl: './settings.component.html',
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent {
  public items: Array<{ icon: string, text: string, path: string }>;
  constructor() {
    this.items = [
      { text: 'Company Profile', icon: String.fromCharCode(0x61), path: '' },
      { text: 'Currencies', icon: String.fromCharCode(0x61), path: '' },
      { text: 'Taxes', icon: String.fromCharCode(0x62), path: '' },
      { text: 'Permission', icon: String.fromCharCode(0x68), path: '' },
      { text: 'Logout', icon: String.fromCharCode(0x67), path: '' },
    ]
  }
}
