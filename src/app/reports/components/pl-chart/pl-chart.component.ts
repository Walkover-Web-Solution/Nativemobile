import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ReportsActions } from '../../../actions/reports/reports.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Observable } from 'rxjs/Observable';
import { IReportChartData, ChartFilterType } from '../../../models/interfaces/dashboard.interface';
import { ReplaySubject } from 'rxjs';
import { CategoryHistoryResponse, GroupHistoryResponse } from '../../../models/api-models/Dashboard';
import { zip } from 'rxjs/observable/zip';
import { Options } from 'highcharts';
import { ChartComponent } from 'angular2-highcharts';
import * as _ from 'lodash';

@Component({
    selector: 'ns-pl-chart,[ns-pl-chart]',
    moduleId: module.id,
    templateUrl: `./pl-chart.component.html`,
    styleUrls: ["./pl-chart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlChartComponent implements OnInit, OnDestroy, AfterViewInit {
    public pichartclass: boolean = false;
    public currentData$: Observable<IReportChartData>;
    public previousData$: Observable<IReportChartData>;
    public profitLossChartFilter$: Observable<ChartFilterType>;
    public categories: string[] = [];
    public series: Array<{ name: string, data: number[], stack: string }>;
    public options: Options;
    public pieChartOptions: Options;
    public previousPieChartOptions: Options;
    @ViewChild('chart') public chartComponent: ChartComponent;
    public previousSeries: Array<{ name: string, data: number[], stack: string }>;

    public pieSeries: Array<{ name: string, y: number, color: string }>;
    public previousPieSeries: Array<{ name: string, y: number, color: string }>;

    public currentPieTotal = {
        revenueAmountTotal: 0,
        indirectexpensesTotal: 0,
        operatingcost: 0
    };

    public previousPieTotal = {
        revenueAmountTotal: 0,
        indirectexpensesTotal: 0,
        operatingcost: 0
    };

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private _reportsActions: ReportsActions, private cd: ChangeDetectorRef) {
        this.currentData$ = this.store.select(st => st.report.currentData).takeUntil(this.destroyed$);
        this.previousData$ = this.store.select(st => st.report.previousData).takeUntil(this.destroyed$);
        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total fruit consumtion, grouped by gender'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of fruits'
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
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: 0,
                endAngle: 360,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            tooltip: {
                enabled: false
            },
            yAxis: {
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                min: 0,
                max: 200,
                title: {
                    text: 'Speed'
                },
                labels: {
                    y: 50
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{ name: 'revenue', data: [] }]
        };
        this.previousPieChartOptions = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: 0,
                endAngle: 360,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            tooltip: {
                enabled: false
            },
            yAxis: {
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                min: 0,
                max: 200,
                title: {
                    text: 'Speed'
                },
                labels: {
                    y: 50
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{ name: 'revenue', data: [] }]
        };
    }

    public ngOnInit() {
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

                previousIncomeData = chartData[1].incomeData;
                previousExpensesData = chartData[1].expensesData;

            }
            this.genSeries(incomeData, expensesData, legendData);
            this.genPreviousSeries(previousIncomeData, previousExpensesData, legendData);
        });
    }

    public ngAfterViewInit() {
        this.store.dispatch(this._reportsActions.getIncomeData());
        this.store.dispatch(this._reportsActions.getExpensesData());
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
        this.calculateTotals('current');
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

            this.currentPieTotal.revenueAmountTotal = Number((incomeTotal + indirectexpensesTotal + operatingcost).toFixed(2));
            this.currentPieTotal.indirectexpensesTotal = indirectexpensesTotal;
            this.currentPieTotal.operatingcost = operatingcost;

            this.pieSeries = [{ name: 'revenue', y: this.currentPieTotal.revenueAmountTotal, color: 'red' },
            { name: 'indirectexpenses', y: indirectexpensesTotal, color: 'green' },
            { name: 'operatingcost', y: operatingcost, color: 'blue' }];

            this.renderPieOptions('current', this.currentPieTotal.revenueAmountTotal);
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

            this.previousPieTotal.revenueAmountTotal = Number((incomeTotal + indirectexpensesTotal + operatingcost).toFixed(2));
            this.previousPieTotal.indirectexpensesTotal = indirectexpensesTotal;
            this.previousPieTotal.operatingcost = operatingcost;

            this.previousPieSeries = [{ name: 'revenue', y: this.previousPieTotal.revenueAmountTotal, color: 'red' },
            { name: 'indirectexpenses', y: indirectexpensesTotal, color: 'green' },
            { name: 'operatingcost', y: operatingcost, color: 'blue' }];
            this.renderPieOptions('previous', this.previousPieTotal.revenueAmountTotal);
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

    public renderPieOptions(type: string = 'current', total) {
        if (type === 'current') {
            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                series: this.pieChartOptions.series.map(s => {
                    s.data = this.pieSeries;
                    return s;
                }),
                yAxis: Object.assign({}, this.pieChartOptions.yAxis, {
                    max: total
                })
            });
        } else {
            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                series: this.previousPieChartOptions.series.map(s => {
                    s.data = this.previousPieSeries
                    return s;
                }),
                yAxis: Object.assign({}, this.pieChartOptions.yAxis, {
                    max: total
                })
            });
        }
        this.cd.detectChanges();
        setTimeout(() => {
            this.pichartclass = true;
        }, 1000);
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
