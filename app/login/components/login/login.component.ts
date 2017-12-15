import { Component, OnInit, OnDestroy } from '@angular/core';
import { topmost } from 'ui/frame';
import { isIOS } from 'platform';

@Component({
  selector: 'ns-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor() { }

  public ngOnInit(): void {
    // this.items = this.itemService.getItems();
  }
  public ngOnDestroy(): void {
    console.log('login destroyed');
  }
}
