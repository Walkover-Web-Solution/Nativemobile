import {Injectable} from '@angular/core';
import {APP_DEFAULT_TITLE} from '../app.constants';
// import { ToastrService } from 'ngx-toastr';
// import * as Toast from 'nativescript-toast';
import {SnackBar} from 'nativescript-snackbar';
import * as dialogs from 'ui/dialogs';

let snackbar = new SnackBar();

@Injectable()
export class ToasterService {

    constructor() {

    }

    public successToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        snackbar.simple(msg, 'black', 'green');
        // let toast = Toast.makeText(msg);
        // toast.show();
    }

    public errorToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        snackbar.simple(msg, 'black', 'red');
        // let toast = Toast.makeText(msg);
        // toast.show();
    }

    public warningToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        snackbar.simple(msg, 'black', 'orange');
        // let toast = Toast.makeText(msg);
        // toast.show();
    }

    public infoToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        // let toast = Toast.makeText(msg);
        // toast.show();
    }

    public clearAllToaster(): void {
        //
    }

    public confirm(obj: any) {
        return dialogs.confirm(obj);
    }
}
