import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SettingsComponent } from "~/settings/settings.component";
import { CompanyProfileComponent } from "~/settings/components/company-profile/company-profile.component";


export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  },
  {
    path: 'company-profile',
    component: CompanyProfileComponent
  }
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
