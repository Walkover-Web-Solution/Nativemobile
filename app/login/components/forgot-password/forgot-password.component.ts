import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page, Color } from 'ui/page';
import { topmost } from 'ui/frame';
import { isIOS } from 'platform';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-forgot-password',
  moduleId: module.id,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {
  constructor(private routerExtensions: RouterExtensions, private page: Page) { }

  ngOnInit(): void {
    console.log('forgot Password');
    // this.items = this.itemService.getItems();
    this.page.backgroundColor = new Color(1, 0, 169, 157);
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;
  }
  ngOnDestroy(): void {
    console.log('forgot-password destroyed');
  }
  backToLogin() {
    this.routerExtensions.backToPreviousPage();
  }
}
