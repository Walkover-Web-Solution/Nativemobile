import { Component, OnInit, OnDestroy } from '@angular/core';

// import { Item } from '../../models';
import { LoginService } from '../../services/login.service';
import { topmost } from 'ui/frame';
import { isIOS } from 'platform';
import { Configuration } from '../../../../app.constant';

@Component({
  selector: 'ns-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private itemService: LoginService) { }

  public ngOnInit(): void {
    console.log(Configuration.ApiUrl);
    console.log(Configuration.AppUrl);
    console.log(global.ApiUrl);
    console.log(global.AppUrl);
    // this.items = this.itemService.getItems();
  }
  public ngOnDestroy(): void {
    console.log('login destroyed');
  }
}
