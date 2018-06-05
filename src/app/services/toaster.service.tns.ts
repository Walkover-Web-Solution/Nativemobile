import {Injectable} from '@angular/core';
import {APP_DEFAULT_TITLE} from '../app.constants';
import * as ToastModule from "nativescript-toast";
import { Toast } from "nativescript-toast";
import {SnackBar} from 'nativescript-snackbar';
import * as dialogs from 'ui/dialogs';
import { isIOS } from "platform";

let snackbar = new SnackBar();

@Injectable()
export class ToasterService {
    private previousToast: Toast = null;
    constructor() {

    }

    public successToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        snackbar.simple(msg, 'black', 'green');
        // this.show(msg);
    }

    public errorToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        snackbar.simple(msg, 'black', 'red');
        // this.show(msg);
    }

    public warningToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        snackbar.simple(msg, 'black', 'orange');
        // this.show(msg);
    }

    public infoToast(msg: string = 'Something went wrong', title: string = APP_DEFAULT_TITLE): void {
        this.show(msg);
    }

    public clearAllToaster(): void {
        //
    }

    public confirm(obj: any) {
        return dialogs.confirm(obj);
    }

    private show(message: string, long?: boolean) {
        if (this.previousToast) {
            this.previousToast.cancel();
            this.previousToast = null;
        }

        let t = ToastModule.makeText(message);

        // if (!isIOS) {
        //     (<any>t).getView().getChildAt(0).setTypeface(this.androidTypeface);
        // }

        t.show();
        this.previousToast = t;
    }
}
