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

@Component({
    selector: 'ns-pl-chart,[ns-pl-chart]',
    moduleId: module.id,
    templateUrl: `./pl-chart.component.html`,
    styleUrls: ["./pl-chart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlChartComponent implements OnInit, OnDestroy, AfterViewInit {
    public currentData$: Observable<IReportChartData>;
    public previousData$: Observable<IReportChartData>;
    public profitLossChartFilter$: Observable<ChartFilterType>;
    public categories: string[] = [];
    public series: Array<{ name: string, data: number[], stack: string }>;

    public options: Options;
    @ViewChild('chart') public chartComponent: ChartComponent;
    public previousSeries: Array<{ name: string, data: number[], stack: string }>;

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

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
