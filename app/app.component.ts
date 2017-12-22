import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { Router, NavigationEnd } from '@angular/router';

// app
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {
  }
  ngOnInit(): void {
    // this.store.select(p => p.router).subscribe((p) => {
    //   console.log(JSON.stringify(p));
    // })
    // this.router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     // console.log(this.router.routerState.root.firstChild);
    //     // console.log(this.router.routerState.root.firstChild.firstChild);
    //   }
    // });
  }
}
