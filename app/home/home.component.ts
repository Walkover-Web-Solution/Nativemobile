import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VerifyEmailResponseModel } from '../models/api-models/loginModels';
import { AppState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ns-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public userStream$: Observable<VerifyEmailResponseModel>;
  constructor(private store: Store<AppState>) {
    this.userStream$ = this.store.select(s => s.session.user);
  }

  public ngOnInit(): void {

  }
  public ngOnDestroy(): void {
    // this.lo
  }
}
