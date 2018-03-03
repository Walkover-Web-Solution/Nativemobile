import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ChartFilterType, IChildGroups, IExpensesChartClosingBalanceResponse } from '../../../models/interfaces/dashboard.interface';
import { AccountChartDataLastCurrentYear } from '../../../models/view-models/AccountChartDataLastCurrentYear';
import { Observable } from 'rxjs/Observable';
import { DashboardActions } from '../../../actions/dashboard/dashboard.action';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { INameUniqueName } from '../../../models/interfaces/nameUniqueName.interface';
import * as _ from 'lodash';


@Component({
    selector: 'ns-expenses-chart,[ns-expenses-chart]',
    moduleId: module.id,
    templateUrl: `./expenses.component.html`,
    styleUrls: ["./expenses.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesChartComponent implements OnInit, OnDestroy {
    public lastPieChartAmount: number;
    public lastYearGrandAmount: any;
    public activePieChartAmount: number;
    public activeYearGrandAmount: any;
    public activeYearLabel: string;
    public lastYearLabel: string;
    public chartFilterTitle: string = '';
    public categories: string[] = [];
    public series: Array<{ name: string, data: number[] }>;
    public options: any;
    public pieChartOptions: any;
    public previousPieChartOptions: any;
    public pieSeries: Array<{ name: string, y: number, color: string }>;
    public previousPieSeries: Array<{ name: string, y: number, color: string }>;
    public expensesChartData$: Observable<IExpensesChartClosingBalanceResponse>;
    public selectedFilter$: Observable<ChartFilterType>;
    public selectedFilterType: ChartFilterType;

    public activeYearAccounts: IChildGroups[] = [];
    public lastYearAccounts: IChildGroups[] = [];
    public accountStrings: AccountChartDataLastCurrentYear[] = [];
    public activeYearAccountsRanks: number[];
    public lastYearAccountsRanks: number[];
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private cdRef: ChangeDetectorRef) {
        this.expensesChartData$ = this.store.select(p => p.dashboard.expensesChart).takeUntil(this.destroyed$);
        this.selectedFilter$ = this.store.select(s => s.dashboard.expensesChartFilter).distinctUntilChanged().takeUntil(this.destroyed$);
        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
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
                backgroundColor: '#F7FAFB'
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
                height: 200,
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
                name: 'Browser share',
                innerSize: '90%',
                data: []
            }]
        };
    }

    ngOnInit() {
        this.expensesChartData$.subscribe(exp => {
            // if (exp) {
            if (exp && exp.operatingcostActiveyear && exp.indirectexpensesActiveyear) {
                let indirectexpensesGroups = [].concat.apply([], exp.indirectexpensesActiveyear.childGroups);
                let operatingcostGroups = [].concat.apply([], exp.operatingcostActiveyear.childGroups);
                let accounts = _.unionBy(indirectexpensesGroups as IChildGroups[], operatingcostGroups as IChildGroups[]) as IChildGroups[];
                this.activeYearAccounts = accounts;
            } else {
                // this.resetActiveYearChartData();
            }

            if (exp && exp.operatingcostLastyear && exp.indirectexpensesLastyear) {
                let indirectexpensesGroups = [].concat.apply([], exp.indirectexpensesLastyear.childGroups);
                let operatingcostGroups = [].concat.apply([], exp.operatingcostLastyear.childGroups);
                let lastAccounts = _.unionBy(indirectexpensesGroups as IChildGroups[], operatingcostGroups as IChildGroups[]) as IChildGroups[];
                this.lastYearAccounts = lastAccounts;
            } else {
                // this.resetLastYearChartData();
            }

            if (exp && exp.chartTitle) {
                this.chartFilterTitle = exp.chartTitle;
            }

            if (exp && exp.lable) {
                this.activeYearLabel = exp.lable.activeYearLabel || '';
                this.lastYearLabel = exp.lable.lastYearLabel || '';
            }

            this.generateCharts();

            // this.requestInFlight = false;
        });

        this.selectedFilter$.subscribe(s => {
            this.selectedFilterType = s;
            this.fetchChartData();
        });
    }

    public fetchChartData() {
        this.store.dispatch(this._dashboardActions.getRevenueChartData());
    }

    public generateActiveYearString(): INameUniqueName[] {
        let activeStrings: INameUniqueName[] = [];
        this.activeYearAccounts.map(acc => {
            activeStrings.push({ uniqueName: acc.uniqueName, name: acc.groupName });
        });
        return activeStrings;
    }

    public generateLastYearString(): INameUniqueName[] {
        let lastStrings: INameUniqueName[] = [];
        this.lastYearAccounts.map(acc => {
            lastStrings.push({ uniqueName: acc.uniqueName, name: acc.groupName });
        });
        return lastStrings;
    }

    public generateCharts() {
        this.accountStrings = _.uniqBy(this.generateActiveYearString().concat(this.generateLastYearString()), 'uniqueName');
        this.accountStrings.forEach((ac) => {
            ac.activeYear = 0;
            ac.lastYear = 0;
            let index = -1;
            index = _.findIndex(this.activeYearAccounts, (p) => p.uniqueName === ac.uniqueName);
            if (index !== -1) {
                ac.activeYear = this.activeYearAccounts[index].closingBalance.amount;
            }
            index = -1;
            index = _.findIndex(this.lastYearAccounts, (p) => p.uniqueName === ac.uniqueName);
            if (index !== -1) {
                ac.lastYear = this.lastYearAccounts[index].closingBalance.amount;
            }
        });

        let activeAccounts = [];
        let lastAccounts = [];
        let categories = [];

        this.accountStrings.forEach(p => {
            activeAccounts.push(p.activeYear);
            lastAccounts.push(p.lastYear);
            categories.push(p.name);
        });


        this.activeYearAccountsRanks = activeAccounts;
        this.activeYearGrandAmount = _.sumBy(activeAccounts, 'amount') || 0;
        this.activePieChartAmount = this.activeYearGrandAmount >= 0 ? 100 : 0;

        this.lastYearAccountsRanks = lastAccounts;
        this.categories = categories;

        let seriesName = this.genSeriesName(this.selectedFilterType);
        this.series = [
            { name: `This ${seriesName}`, data: this.activeYearAccountsRanks },
            { name: `Last ${seriesName}`, data: this.lastYearAccountsRanks }
        ];
        this.lastYearGrandAmount = _.sumBy(lastAccounts, 'amount') || 0;
        this.lastPieChartAmount = this.lastYearGrandAmount >= 0 ? 100 : 0;
        this.renderChart();
    }

    public genSeriesName(filterType: ChartFilterType) {
        switch (filterType) {
            case ChartFilterType.ThisMonthToDate:
            case ChartFilterType.LastMonth:
                return 'Month';

            case ChartFilterType.ThisQuarterToDate:
            case ChartFilterType.LastQuater:
                return 'Quater';

            case ChartFilterType.ThisYearToDate:
            case ChartFilterType.LastYear:
                return 'Year';

            case ChartFilterType.ThisFinancialYearToDate:
            case ChartFilterType.LastFiancialYear:
                return 'Financial Year';
            default:
                return 'Custom';
        }
    }

    public renderChart() {
        this.options = Object.assign({}, this.options, {
            series: this.series,
            xAxis: Object.assign({}, this.options.xAxis, {
                categories: this.categories
            })
        });
        this.cdRef.detectChanges();
    }

    public renderPieChart(type = 'current', per) {
        if (type === 'current') {
            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                title: Object.assign({}, this.pieChartOptions.title, {
                    text: `${per}%`
                }),
                series: this.previousPieChartOptions.series.map(s => {
                    s.data = this.previousPieSeries
                    return s;
                }),
            });
        } else {

        }
    }

    public seriesSeleted(e) {
        debugger;
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

}
