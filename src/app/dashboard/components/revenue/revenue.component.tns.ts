import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Page } from '../../../common/utils/environment';
import { LoadEventData, WebView } from "tns-core-modules/ui/web-view";

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
    selector: 'ns-revenue-chart,[ns-revenue-chart]',
    moduleId: module.id,
    templateUrl: `./revenue.component.html`,
    styleUrls: ["./revenue.component.scss"]
})
export class RevenueChartComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild("myWebView") webViewRef: ElementRef;
    public webViewSRC = "~/www/revenueChart.html"
    private oLangWebViewInterface;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(private store: Store<AppState>, private page: Page) {
        (this.page as any).on((Page as any).unloadedEvent, ev => this.ngOnDestroy());
    }

    ngOnInit() {

    }

    public ngAfterViewInit() {
        this.setupWebViewInterface();
    }

    private setupWebViewInterface() {
        let webView: WebView = this.webViewRef.nativeElement;

        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, this.webViewSRC);

        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            if (!args.error) {

            } else {
                console.log(JSON.stringify(args.error));
            }
        });
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
