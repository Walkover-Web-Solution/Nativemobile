import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ReportsActions} from '../../../actions/reports/reports.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {Observable} from 'rxjs/Observable';
import {ChartFilterType, IReportChartData} from '../../../models/interfaces/dashboard.interface';
import {CategoryHistoryResponse, GroupHistoryResponse} from '../../../models/api-models/Dashboard';
import {zip} from 'rxjs/observable/zip';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material';
import {ReportsFilterComponent} from '../reports-filter/reports-filter.component';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
    selector: 'ns-pl-chart,[ns-pl-chart]',
    moduleId: module.id,
    templateUrl: './pl-chart.component.html',
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
    public options: any;
    public pieChartOptions: any;
    public previousPieChartOptions: any;
    public previousSeries: Array<{ name: string, data: number[], stack: string }>;

    public pieSeries: Array<{ name: string, y: number, color: string }>;
    public previousPieSeries: Array<{ name: string, y: number, color: string }>;
    public per: number = 50;
    public activeChart: string = 'current';
    public pieTotal: number = 0;
    public previousPieTotal: number = 0;
    public pieLable: string = '';
    public previousPieLable: string = '';
    public noData: boolean = false;
    public selectedFilter$: Observable<ChartFilterType>;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private _reportsActions: ReportsActions, private cd: ChangeDetectorRef,
        public dialog: MatDialog) {
        this.currentData$ = this.store.select(st => st.report.currentData).takeUntil(this.destroyed$);
        this.previousData$ = this.store.select(st => st.report.previousData).takeUntil(this.destroyed$);
        this.options = {
            chart: {
                type: 'column',
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
                labels: {
                    formatter: function () {
                        let obj = this.chart.userOptions.series;
                        let totalArr = [];
                        obj[0].data.forEach((d, i) => {
                            totalArr.push(obj[0].data[i] || 0 + obj[1].data[i] || 0 + obj[2].data[i] || 0);
                        });
                        let total = 0;
                        total = totalArr.reduce((t, n) => t + n, 0);

                        return `<span>${this.value}<br />
                        <p style="color:#63B351;">${totalArr[this.pos] ? totalArr[this.pos].toFixed(0) : 0}/-</p><br />
                        <p style="color:#63B351;">(${((((totalArr[this.pos] ? totalArr[this.pos].toFixed(0) : 0) * 100) / total) || 0).toFixed(2)}%)</p></span>`;
                    },
                    style: {
                        "fontSize": '12px'
                    }
                },
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
                height: 200,
                backgroundColor: '#F7FAFB',
                width: window.innerWidth > 414 ? ((414 / 2) - 50) : ((window.innerWidth / 2) - 50)
            },
            credits: {
                enabled: false
            },
            title: {
                text: '0%',
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
                name: '',
                innerSize: '90%',
                data: []
            }]
        };
        this.previousPieChartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 200,
                width: window.innerWidth > 414 ? ((414 / 2) - 50) : ((window.innerWidth / 2) - 50)
            // backgroundColor: '#F7FAFB'
            },
            credits: {
                enabled: false
            },
            title: {
                text: '0%',
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
                name: '',
                innerSize: '90%',
                data: []
            }]
        };
        this.selectedFilter$ = this.store.select(s => s.report.profitLossChartFilter).takeUntil(this.destroyed$);
    }

    public ngOnInit() {
        zip(this.currentData$, this.previousData$).subscribe(chartData => {
            let incomeData = null;
            let expensesData = null;
            let previousIncomeData = null;
            let previousExpensesData = null;
            let legendData = null;
            let previousLegendData = null;

            if (chartData[0] && chartData[1]) {
                this.resetSeriesData();
                incomeData = chartData[0].incomeData;
                expensesData = chartData[0].expensesData;
                legendData = chartData[0].legend;
                this.pieLable = chartData[0].lable;

                previousIncomeData = chartData[1].incomeData;
                previousExpensesData = chartData[1].expensesData;
                previousLegendData = chartData[1].legend;
                this.previousPieLable = chartData[1].lable;
            } else {
                this.noData = true;
            }

            this.genSeries(incomeData, expensesData, legendData);
            this.genPreviousSeries(previousIncomeData, previousExpensesData, previousLegendData);
        });
        this.selectedFilter$.distinctUntilChanged().subscribe(s => {
            this.store.dispatch(this._reportsActions.getIncomeData());
            this.store.dispatch(this._reportsActions.getExpensesData());
        });

        (window as any).onresize = () => {
            this.pieChartOptions.chart.width = window.innerWidth > 414 ? ((414 / 2) - 50) : ((window.innerWidth / 2) - 50);
            this.previousPieChartOptions.chart.width = window.innerWidth > 414 ? ((414 / 2) - 50) : ((window.innerWidth / 2) - 50);
            if (!this.cd['destroyed']) {
                this.cd.detectChanges();
            }
        }
    }

    public ngAfterViewInit() {
        // this.store.dispatch(this._reportsActions.getIncomeData());
        // this.store.dispatch(this._reportsActions.getExpensesData());
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

    public onChartPointSelection(e, type) {
        if (e && e.point) {
            this.renderPiePer(type, Number((e.point.percentage).toFixed(2)));
        }
    }

    public onChartSelection(type: string) {
        if (this.activeChart !== type) {
            this.activeChart = type;
            this.renderActiveChart(type);
            this.renderOptions(type === 'current' ? this.series : this.previousSeries);
            this.store.dispatch(this._reportsActions.setActiveChartType(type));
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
                }),
                title: Object.assign({}, this.pieChartOptions.title, {
                    text: this.pieTotal > 0 ? '100%' : '0%'
                })
            });
        } else {
            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                series: this.previousPieChartOptions.series.map(s => {
                    s.data = this.previousPieSeries
                    return s;
                }),
                title: Object.assign({}, this.previousPieChartOptions.title, {
                    text: this.previousPieTotal > 0 ? '100%' : '0%'
                })
            });
        }
        this.cd.detectChanges();
        setTimeout(() => {
            this.pichartclass = true;
        }, 1000);
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

    public renderActiveChart(type: string) {
        if (type === 'current') {
            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                chart: Object.assign({}, this.pieChartOptions.chart, {
                    backgroundColor: '#F7FAFB'
                })
            });

            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                chart: Object.assign({}, this.previousPieChartOptions.chart, {
                    backgroundColor: '#FFFFFF'
                })
            });

        } else {
            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                chart: Object.assign({}, this.previousPieChartOptions.chart, {
                    backgroundColor: '#F7FAFB'
                })
            });

            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                chart: Object.assign({}, this.pieChartOptions.chart, {
                    backgroundColor: '#FFFFFF'
                })
            });
        }
    }
    public openFilter() {
        let dialog = this.dialog.open(ReportsFilterComponent, {
            panelClass:'filter-dialog'
        });
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
