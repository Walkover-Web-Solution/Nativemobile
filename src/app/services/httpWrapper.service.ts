import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { LoaderService } from '../loader/loader.service';
import { GeneralService } from './general.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpWrapperService {

    constructor(private _http: HttpClient, private _loaderService: LoaderService, private _generalService: GeneralService) {
    }

    public get = (url: string, params?: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        options.params = params;
        return this._http.get(url, options).do((res) => {
            //
        }).finally(() => {
            this.hideLoader();
        });
    }

    public post = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this._http.post(url, body, options).do((res) => {
            //
        }).finally(() => {
            this.hideLoader();
        });
    }

    public put = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this._http.put(url, body, options).do((res) => {
            //
        }).finally(() => {
            this.hideLoader();
        });
    }

    public delete = (url: string, params?: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        options.search = this.objectToParams(params);
        return this._http.delete(url, options).do((res) => {
            //
        }).finally(() => {
            this.hideLoader();
        });
    }

    public patch = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this._http.patch(url, body, options).do((res) => {
            //
        }).finally(() => {
            this.hideLoader();
        });
    }

    public prepareOptions(options: any): any {
        this.showLoader();
        let sessionId = this._generalService.sessionId;
        let authKey = this._generalService.authKey;
        options = options || {};

        if (!options.headers) {
            options.headers = {} as any;
        }

        if (sessionId) {
            options.headers['Session-Id'] = sessionId;
        }
        
        if(authKey){
            options.headers['auth-key'] = authKey;
        }
        // options.withCredentials = true;
        options.headers['cache-control'] = 'no-cache';
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = 'application/json';
        options.headers = new HttpHeaders(options.headers);
        return options;
    }

    public isPrimitive(value) {
        return value == null || (typeof value !== 'function' && typeof value !== 'object');
    }

    public objectToParams(object = {}) {
        return Object.keys(object).map((value) => {
            let objectValue = this.isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
            return `${value}=${objectValue}`;
        }).join('&');
    }

    private showLoader(): void {
        this._loaderService.show();
    }

    private hideLoader(): void {
        this._loaderService.hide();
    }
}
