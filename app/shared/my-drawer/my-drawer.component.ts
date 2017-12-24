import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { MyDrawerItem } from "../my-drawer-item/my-drawer-item";
import { Store } from "@ngrx/store";
import { AppState } from "~/store";
import { UserDetails } from "~/models/api-models/loginModels";
import { Observable } from "rxjs/Observable";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
@Component({
  selector: "MyDrawer",
  moduleId: module.id,
  templateUrl: "./my-drawer.component.html",
  styleUrls: ["./my-drawer.component.css"]
})
export class MyDrawerComponent implements OnInit {
  public user$: Observable<UserDetails>;
  @Input() selectedPage: string;
  @Output() public itemSelected: EventEmitter<MyDrawerItem> = new EventEmitter();
  @Input() pages: MyDrawerItem[];

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(p => p.session.user.user);
  }

  ngOnInit(): void {
  }
  isPageSelected(pageTitle: string): boolean {
    return pageTitle === this.selectedPage;
  }

  onNavItemTap(item: MyDrawerItem): void {
    this.itemSelected.emit(item);
  }
}
