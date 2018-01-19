import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { Router, NavigationEnd } from '@angular/router';
import { GeneralService } from './services/general.service';
import { GeneralActions } from '~/actions/general/general.actions';

// app
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router, private _generalService: GeneralService,
  private _generalActions: GeneralActions) {
  }
  ngOnInit(): void {
    this.store.select(s => s.session).subscribe(ss => {
      if (ss.user) {
        this._generalService.user = ss.user.user;
        this.store.dispatch(this._generalActions.setCountriesWithCodes());
        this.store.dispatch(this._generalActions.getStatesData());
        if (ss.user.statusCode !== 'AUTHENTICATE_TWO_WAY') {
          this._generalService.sessionId = ss.user.session.id;
        }
      } else {
        this._generalService.user = null;
        this._generalService.sessionId = null;
      }
      this._generalService.companyUniqueName = ss.companyUniqueName;
    });
  }
}
