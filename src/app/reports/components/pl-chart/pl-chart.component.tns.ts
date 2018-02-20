import { ChangeDetectorRef, Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChartFilterType, ChartType, IProfitLossChartResponse, IReportChartData } from '../../../models/interfaces/dashboard.interface';
import { DashboardActions } from '../../../actions/dashboard/dashboard.action';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { GroupHistoryResponse, CategoryHistoryResponse } from '../../../models/api-models/Dashboard';
import { zip } from 'rxjs/observable/zip';
import * as platformModule from "tns-core-modules/platform";

import { EventData } from 'tns-core-modules/data/observable';
import { LoadEventData, WebView } from "tns-core-modules/ui/web-view";

let webViewInterfaceModule = require('nativescript-webview-interface');
import { Page } from '../../../common/utils/environment';
import { ReportsActions } from '../../../actions/reports/reports.actions';

@Component({
    selector: 'ns-pl-chart,[ns-pl-chart]',
    moduleId: module.id,
    templateUrl: `./pl-chart.component.html`,
    styleUrls: ["./pl-chart.component.scss"]
})
export class PlChartComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild("myWebView") webViewRef: ElementRef;
    public currentData$: Observable<IReportChartData>;
    public previousData$: Observable<IReportChartData>;
    public profitLossChartFilter$: Observable<ChartFilterType>;
    public categories: string[] = [];
    public series: Array<{ name: string, data: number[], stack: string }>;
    public options: any;
    public pieChartOptions: any;
    public previousPieChartOptions: any;
    public previousSeries: Array<{ name: string, data: number[], stack: string }>;

    public pieSeries: Array<{ name: string, y: number, color: string }>;
    public previousPieSeries: Array<{ name: string, y: number, color: string }>;
    public activeChart: string = 'current';
    public pieTotal: number = 0;
    public previousPieTotal: number = 0;
    public pieLable: string = '';
    public previousPieLable: string = '';
    public selectedFilter$: Observable<ChartFilterType>;
    public secondWebViewSRC = "~/www/profitLossChart.html"
    private oLangWebViewInterface;


    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private _reportsActions: ReportsActions, private page: Page, private cd: ChangeDetectorRef) {
        this.currentData$ = this.store.select(st => st.report.currentData).takeUntil(this.destroyed$);
        this.previousData$ = this.store.select(st => st.report.previousData).takeUntil(this.destroyed$);
        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: []
        };
        this.pieChartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 200
            },
            credits: {
                enabled: false
            },
            title: {
                text: '100%',
                verticalAlign: 'middle',
                horizontalAlign: 'middle'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: 0,
                    endAngle: 360,
                    center: ['50%', '50%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '90%',
                data: []
            }]
        };
        this.previousPieChartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 200
            },
            credits: {
                enabled: false
            },
            title: {
                text: '100%',
                verticalAlign: 'middle',
                horizontalAlign: 'middle'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: 0,
                    endAngle: 360,
                    center: ['50%', '50%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '90%',
                data: []
            }]
        };
        this.selectedFilter$ = this.store.select(s => s.report.profitLossChartFilter).takeUntil(this.destroyed$);

        (this.page as any).on((Page as any).unloadedEvent, ev => this.ngOnDestroy());
    }

    public ngOnInit() {
        this.selectedFilter$.distinctUntilChanged().subscribe(s => {
            this.store.dispatch(this._reportsActions.getIncomeData());
            this.store.dispatch(this._reportsActions.getExpensesData());
        });
    }

    public ngAfterViewInit() {
        this.setupWebViewInterface();
    }

    private setupWebViewInterface() {
        let webView: WebView = this.webViewRef.nativeElement;

        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, this.secondWebViewSRC);

        // loading languages in dropdown, on load of webView.
        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            if (!args.error) {
                this.oLangWebViewInterface.emit('dimensions',
                    {
                        width: platformModule.screen.mainScreen.widthPixels,
                        height: platformModule.screen.mainScreen.heightPixels
                    });
                zip(this.currentData$, this.previousData$).subscribe(chartData => {
                    let incomeData = null;
                    let expensesData = null;
                    let previousIncomeData = null;
                    let previousExpensesData = null;
                    let legendData = chartData[0].legend;

                    if (chartData[0] && chartData[1]) {
                        this.resetSeriesData();
                        incomeData = chartData[0].incomeData;
                        expensesData = chartData[0].expensesData;
                        this.pieLable = chartData[0].lable;

                        previousIncomeData = chartData[1].incomeData;
                        previousExpensesData = chartData[1].expensesData;
                        this.previousPieLable = chartData[1].lable;
                    }
                    this.genSeries(incomeData, expensesData, legendData);
                    this.genPreviousSeries(previousIncomeData, previousExpensesData, legendData);
                });
            }
            console.log(JSON.stringify(args.error));
        });

        // this.listenLangWebViewEvents();
    }

    public resetSeriesData() {
        this.categories = [];
        this.series = [];
        this.previousSeries = [];
        this.pieSeries = [];
        this.previousPieSeries = [];
        this.renderOptions(this.series);
    }
    public genSeries(incomeData: CategoryHistoryResponse, expensesData: GroupHistoryResponse, legendData: string[]) {
        let incomeSeries = [];
        let indirectexpensesSeries = [];
        let operatingcostSeries = [];

        if (incomeData && incomeData.intervalBalances) {
            incomeData.intervalBalances.forEach(int => {
                incomeSeries.push(int.creditTotal - int.debitTotal);
            });
        }

        if (expensesData && expensesData.groups) {
            expensesData.groups.forEach(exp => {
                if (exp.uniqueName === 'indirectexpenses') {
                    exp.intervalBalances.forEach(fa => indirectexpensesSeries.push(fa.debitTotal - fa.creditTotal));
                } else {
                    exp.intervalBalances.forEach(fa => operatingcostSeries.push(fa.debitTotal - fa.creditTotal));
                }
            });
        }

        this.series = [{ name: 'income', data: incomeSeries, stack: 'income' }, { name: 'indirectexpenses', data: indirectexpensesSeries, stack: 'expenses' },
        { name: 'operatingcost', data: operatingcostSeries, stack: 'expenses' }];
        this.categories = legendData;

        this.renderOptions(this.series);
        this.oLangWebViewInterface.emit('mainSeriesUpdated', this.options);
        this.calculateTotals('current');
    }

    public onChartSelection(e, type) {
        if (e && e.point) {
            this.renderPiePer(type, Number((e.point.percentage).toFixed(2)));
        }

        if (this.activeChart !== type) {
            this.activeChart = type;
            this.renderOptions(type === 'current' ? this.series : this.previousSeries);
        }
    }

    public genPreviousSeries(incomeData: CategoryHistoryResponse, expensesData: GroupHistoryResponse, legendData: string[]) {
        let incomeSeries = [];
        let indirectexpensesSeries = [];
        let operatingcostSeries = [];

        if (incomeData && incomeData.intervalBalances) {
            incomeData.intervalBalances.forEach(int => {
                incomeSeries.push(int.creditTotal - int.debitTotal);
            });
        }

        if (expensesData && expensesData.groups) {
            expensesData.groups.forEach(exp => {
                if (exp.uniqueName === 'indirectexpenses') {
                    exp.intervalBalances.forEach(fa => indirectexpensesSeries.push(fa.debitTotal - fa.creditTotal));
                } else {
                    exp.intervalBalances.forEach(fa => operatingcostSeries.push(fa.debitTotal - fa.creditTotal));
                }
            });
        }

        this.previousSeries = [{ name: 'income', data: incomeSeries, stack: 'income' }, { name: 'indirectexpenses', data: indirectexpensesSeries, stack: 'expenses' },
        { name: 'operatingcost', data: operatingcostSeries, stack: 'expenses' }];
        this.categories = legendData;

        // this.renderOptions(this.previousSeries);
        this.calculateTotals('previous');
    }


    public calculateTotals(type: string = 'current') {
        let incomeTotal = 0;
        let indirectexpensesTotal = 0;
        let operatingcost = 0;
        if (type === 'current') {
            this.series.forEach(s => {
                if (s.name === 'income') {
                    incomeTotal = Number(_.sum(s.data).toFixed(2));
                } else if (s.name === 'indirectexpenses') {
                    indirectexpensesTotal = Number(_.sum(s.data).toFixed(2));
                } else {
                    operatingcost = Number(_.sum(s.data).toFixed(2));
                }
            });

            this.pieSeries = [{ name: 'revenue', y: incomeTotal, color: '#58C5C4' }, { name: 'operatingcost', y: operatingcost, color: '#17989C' },
            { name: 'indirectexpenses', y: indirectexpensesTotal, color: '#BAE3E7' }];
            this.pieTotal = Number((incomeTotal + indirectexpensesTotal + operatingcost).toFixed(2));
            this.renderPieOptions('current');
        } else {
            incomeTotal = 0;
            indirectexpensesTotal = 0;
            operatingcost = 0;
            this.previousSeries.forEach(s => {
                if (s.name === 'income') {
                    incomeTotal = Number(_.sum(s.data).toFixed(2));
                } else if (s.name === 'indirectexpenses') {
                    indirectexpensesTotal = Number(_.sum(s.data).toFixed(2));
                } else {
                    operatingcost = Number(_.sum(s.data).toFixed(2));
                }
            });

            this.previousPieSeries = [{ name: 'revenue', y: incomeTotal, color: '#58C5C4' }, { name: 'operatingcost', y: operatingcost, color: '#17989C' },
            { name: 'indirectexpenses', y: indirectexpensesTotal, color: '#BAE3E7' }];
            this.previousPieTotal = Number((incomeTotal + indirectexpensesTotal + operatingcost).toFixed(2));
            this.renderPieOptions('previous');
        }
    }

    public renderOptions(series: Array<{ name: string, data: number[], stack: string }>) {
        this.options = Object.assign({}, this.options, {
            series,
            xAxis: Object.assign({}, this.options.xAxis, {
                categories: this.categories
            })
        });

        this.cd.detectChanges();

    }

    public renderPieOptions(type: string = 'current') {
        if (type === 'current') {
            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                series: this.pieChartOptions.series.map(s => {
                    s.data = this.pieSeries;
                    return s;
                })
            });
            this.oLangWebViewInterface.emit('currentPieSeriesUpdated', this.pieChartOptions);
        } else {
            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                series: this.previousPieChartOptions.series.map(s => {
                    s.data = this.previousPieSeries
                    return s;
                })
            });
            this.oLangWebViewInterface.emit('previousPieSeriesUpdated', this.previousPieChartOptions);
        }
        this.cd.detectChanges();
    }

    public renderPiePer(type: string = 'current', per: number) {
        if (type === 'current') {
            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                title: Object.assign({}, this.pieChartOptions.title, {
                    text: `${per}%`
                })
            });
        } else {
            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                title: Object.assign({}, this.previousPieChartOptions.title, {
                    text: `${per}%`
                })
            });
        }
        this.cd.detectChanges();
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }


}
