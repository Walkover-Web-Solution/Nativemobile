import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VerifyEmailResponseModel } from '../models/api-models/loginModels';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginActions } from '../actions/login/login.action';
import { Router } from '@angular/router';
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";



@Component({
  selector: 'ns-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  public userStream$: Observable<VerifyEmailResponseModel>;
  public colors: ['red', 'blue', 'green', 'yellow', 'orange', 'brown', 'silver'];
  public selectedColorIndex: 1;
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions, private _loginActions: LoginActions) {
    this.userStream$ = this.store.select(s => s.session.user);
  }

  public ngOnInit(): void {

  }
  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }
  public logout() {
    this.store.dispatch(this._loginActions.logout());
    this.routerExtensions.navigateByUrl('/login', { clearHistory: true });
  }
  public ngOnDestroy(): void {
    // this.lo
  }
  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }
}
