import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { Router, NavigationEnd } from '@angular/router';
import { GeneralService } from './services/general.service';

// app
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router, private _generalService: GeneralService) {
  }
  ngOnInit(): void {
    this.store.select(s => s.session).subscribe(ss => {
      if (ss.user) {
        this._generalService.user = ss.user.user;
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
