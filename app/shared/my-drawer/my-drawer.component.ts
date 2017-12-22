import { Component, Input, OnInit } from "@angular/core";
import { MyDrawerItem } from "../my-drawer-item/my-drawer-item";

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

  @Input() selectedPage: string;
  @Input() pages: MyDrawerItem[] = [{
    title: "test1",
    disabled: false,
    icon: '',
    isSelected: true,
    needTopHr: false,
    router: ''
  },
  {
    title: "test2",
    disabled: true,
    icon: String.fromCharCode(0xf073),
    isSelected: false,
    needTopHr: false,
    router: 'home'
  },
  {
    title: "test1",
    disabled: false,
    icon: '',
    isSelected: false,
    needTopHr: false,
    router: ''
  },
  {
    title: "test1",
    disabled: false,
    icon: '',
    isSelected: false,
    needTopHr: true,
    router: ''
  }];

  ngOnInit(): void {
  }
  isPageSelected(pageTitle: string): boolean {
    return pageTitle === this.selectedPage;
  }
}
