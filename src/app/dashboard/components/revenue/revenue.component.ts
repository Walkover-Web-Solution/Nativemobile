import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChartFilterType, IRevenueChartClosingBalanceResponse, IChildGroups } from '../../../models/interfaces/dashboard.interface';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../../../actions/dashboard/dashboard.action';
import { AccountChartDataLastCurrentYear } from '../../../models/view-models/AccountChartDataLastCurrentYear';
import * as _ from 'lodash';
import { INameUniqueName } from '../../../models/interfaces/nameUniqueName.interface';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'ns-revenue-chart,[ns-revenue-chart]',
    moduleId: module.id,
    templateUrl: `./revenue.component.html`,
    styleUrls: ["./revenue.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueChartComponent implements OnInit, OnDestroy {
    public categories: string[] = [];
    public series: Array<{ name: string, data: number[] }>;
    public options: any;
    public pieChartOptions: any;
    public previousPieChartOptions: any;
    public pieSeries: Array<{ name: string, y: number, color: string }>;
    public previousPieSeries: Array<{ name: string, y: number, color: string }>;
    public revenueChartData$: Observable<IRevenueChartClosingBalanceResponse>;
    public selectedFilter$: Observable<ChartFilterType>;

    public activeYearAccounts: IChildGroups[] = [];
    public lastYearAccounts: IChildGroups[] = [];
    public accountStrings: AccountChartDataLastCurrentYear[] = [];
    public activeYearAccountsRanks: number[];
    public lastYearAccountsRanks: number[];

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private cdRef: ChangeDetectorRef) {
        this.revenueChartData$ = this.store.select(p => p.dashboard.revenueChart).takeUntil(this.destroyed$);
        this.selectedFilter$ = this.store.select(s => s.dashboard.revenueChartFilter).takeUntil(this.destroyed$);
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
        this.revenueChartData$.subscribe(rvn => {
            // if (rvn) {
            if (rvn && rvn.revenuefromoperationsActiveyear && rvn.otherincomeActiveyear) {
                let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsActiveyear.childGroups);
                let otherincomeAccounts = [].concat.apply([], rvn.otherincomeActiveyear.childGroups);
                let groups = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
                this.activeYearAccounts = groups;
            } else {
                // this.resetActiveYearChartData();
            }

            if (rvn && rvn.revenuefromoperationsLastyear && rvn.otherincomeLastyear) {
                let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsLastyear.childGroups);
                let otherincomeAccounts = [].concat.apply([], rvn.otherincomeLastyear.childGroups);
                let lastAccounts = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
                this.lastYearAccounts = lastAccounts;
            } else {
                // this.resetLastYearChartData();
            }

            // if (rvn && rvn.chartTitle) {
            //     this.chartFilterTitle = rvn.chartTitle;
            // }

            // if (rvn && rvn.lable) {
            //     this.activeYearChartFormatedDate = rvn.lable.activeYearLabel || '';
            //     this.lastYearChartFormatedDate = rvn.lable.lastYearLabel || '';
            // }

            this.generateCharts();

            // this.requestInFlight = false;
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
        // this.activeYearGrandAmount = _.sumBy(activeAccounts, 'amount') || 0;
        // this.activePieChartAmount = this.activeYearGrandAmount >= 1 ? 100 : 0;

        this.lastYearAccountsRanks = lastAccounts;
        this.categories = categories;
        this.series = [
            { name: 'Active Year', data: this.activeYearAccountsRanks },
            { name: 'Last Year', data: this.lastYearAccountsRanks }
        ];
        this.renderChart();
        // this.lastYearGrandAmount = _.sumBy(lastAccounts, 'amount') || 0;
        // this.lastPieChartAmount = this.lastYearGrandAmount >= 1 ? 100 : 0;
        // this.series.push({ name: 'current', data:  });
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

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
