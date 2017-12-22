import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { MyDrawerItem } from "./my-drawer-item";

@Component({
    selector: "MyDrawerItem",
    moduleId: module.id,
    templateUrl: "./my-drawer-item.component.html",
    styleUrls: ["./my-drawer-item.component.css"]
})
export class MyDrawerItemComponent implements OnInit {
    @Input() mydraweritem: MyDrawerItem;
    @Input() icon: string;

    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
    }
    onNavItemTap(navItemRoute: string): void {
        // this.routerExtensions.navigate([navItemRoute], {
        //     transition: {
        //         name: "fade"
        //     }
        // });
    }
}
