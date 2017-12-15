import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { topmost, Frame } from 'ui/frame';
import { Page, Color } from 'ui/page';
import { isIOS } from 'platform';
import { RouterExtensions } from 'nativescript-angular/router';
// import { Color } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-login-with-otp',
  moduleId: module.id,
  templateUrl: './login-with-otp.component.html',
  styleUrls: ['./login-with-otp.component.scss']
})
export class LoginWithOtpComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private routerExtensions: RouterExtensions, private page: Page, private frame: Frame) { }

  ngOnInit(): void {
    console.log('login-with-otp');
    // this.items = this.itemService.getItems();
    // this.page.backgroundColor = new Color(1, 0, 169, 157);
    // this.page.backgroundSpanUnderStatusBar = true;
    // this.page.actionBarHidden = true;
  }
  ngAfterViewInit() {
    // this.items = this.itemService.getItems();
    this.page.backgroundColor = new Color(1, 0, 169, 157);
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;
    // this.page.actionBar.backgroundColor = new Color('#00a99d');
    // this.page.backgroundSpanUnderStatusBar = true;
    // if (this.page.ios) {
    //   const navigationBar = (this.page.ios.controller || this.page.ios.navigationController).navigationBar;
    //   navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
    //   navigationBar.shadowImage = UIImage.new();
    //   navigationBar.translucent = false;
    //   navigationBar.barTintColor = UIColor.blueColor;
    //   navigationBar.tintColor = UIColor.redColor;
    // }
  }
  loaded() {
  }
  ngOnDestroy(): void {
    console.log('login-with-otp destroyed');
  }
  backToLogin() {
    this.routerExtensions.backToPreviousPage();
  }
}
