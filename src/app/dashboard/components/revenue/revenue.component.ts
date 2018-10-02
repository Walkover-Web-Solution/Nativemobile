
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {
    ChartFilterType,
    ChartType,
    IChildGroups,
    IRevenueChartClosingBalanceResponse
} from '../../../models/interfaces/dashboard.interface';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {DashboardActions} from '../../../actions/dashboard/dashboard.action';
import {AccountChartDataLastCurrentYear} from '../../../models/view-models/AccountChartDataLastCurrentYear';
import * as _ from 'lodash';
import {INameUniqueName} from '../../../models/interfaces/nameUniqueName.interface';
import {DashboardFilterComponent} from '../filter/dashboard-filter.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'ns-revenue-chart,[ns-revenue-chart]',
    moduleId: module.id,
    templateUrl: './revenue.component.html',
    styleUrls: ['./revenue.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueChartComponent implements OnInit, OnDestroy {
    public lastPieChartAmount: number;
    public lastYearGrandAmount: any;
    public activePieChartAmount: number;
    public activeYearGrandAmount: any;
    public activeYearLabel: string;
    public lastYearLabel: string;
    public chartFilterTitle = '';
    public categories: string[] = [];
    public series: Array<{ name: string, data: number[] }>;
    public options: any;
    public pieChartOptions: any;
    public previousPieChartOptions: any;
    public pieSeries: Array<{ name?: string, y: number, color?: string }>;
    public previousPieSeries: Array<{ name?: string, y: number, color?: string }>;
    public revenueChartData$: Observable<IRevenueChartClosingBalanceResponse>;
    public selectedFilter$: Observable<ChartFilterType>;
    public selectedFilterType: ChartFilterType;

    public activeYearAccounts: IChildGroups[] = [];
    public lastYearAccounts: IChildGroups[] = [];
    public accountStrings: AccountChartDataLastCurrentYear[] = [];
    public activeYearAccountsRanks: number[];
    public lastYearAccountsRanks: number[];

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
        this.revenueChartData$ = this.store.select(p => p.dashboard.revenueChart).pipe(takeUntil(this.destroyed$));
        this.selectedFilter$ = this.store.select(s => s.dashboard.revenueChartFilter).pipe(distinctUntilChanged(), takeUntil(this.destroyed$), );
        const that = this;
        this.options = {
            chart: {
                type: 'column',
                events: {
                    click: function (e) {
                        that.seriesSeleted.call(this, [that])
                    }
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
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
                name: 'Revenue',
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
                name: 'Revenue',
                innerSize: '90%',
                data: []
            }]
        };
    }

    ngOnInit() {
        this.revenueChartData$.subscribe(rvn => {
            // if (rvn) {
            if (rvn && rvn.revenuefromoperationsActiveyear && rvn.otherincomeActiveyear) {
                const revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsActiveyear.childGroups);
                const otherincomeAccounts = [].concat.apply([], rvn.otherincomeActiveyear.childGroups);
                const groups = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
                this.activeYearAccounts = groups;
            } else {
                // this.resetActiveYearChartData();
            }

            if (rvn && rvn.revenuefromoperationsLastyear && rvn.otherincomeLastyear) {
                const revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsLastyear.childGroups);
                const otherincomeAccounts = [].concat.apply([], rvn.otherincomeLastyear.childGroups);
                const lastAccounts = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
                this.lastYearAccounts = lastAccounts;
            } else {
                // this.resetLastYearChartData();
            }

            if (rvn && rvn.chartTitle) {
                this.chartFilterTitle = rvn.chartTitle;
            }

            if (rvn && rvn.label) {
                this.activeYearLabel = rvn.label.activeYearLabel || '';
                this.lastYearLabel = rvn.label.lastYearLabel || '';
            }

            this.generateCharts();

            // this.requestInFlight = false;
        });

        this.selectedFilter$.subscribe(s => {
            this.selectedFilterType = s;
            this.fetchChartData();
        });

        (window as any).onresize = () => {
            this.pieChartOptions.chart.width = window.innerWidth > 414 ? ((414 / 2) - 50) : ((window.innerWidth / 2) - 50);
            this.previousPieChartOptions.chart.width = window.innerWidth > 414 ? ((414 / 2) - 50) : ((window.innerWidth / 2) - 50);
            this.cdRef.detectChanges();
        }
    }

    public fetchChartData() {
        this.store.dispatch(this._dashboardActions.getActiveYearRevenueChartData());
        this.store.dispatch(this._dashboardActions.getLastYearRevenueChartData());
    }

    public generateActiveYearString(): INameUniqueName[] {
        const activeStrings: INameUniqueName[] = [];
        this.activeYearAccounts.map(acc => {
            activeStrings.push({ uniqueName: acc.uniqueName, name: acc.groupName });
        });
        return activeStrings;
    }

    public generateLastYearString(): INameUniqueName[] {
        const lastStrings: INameUniqueName[] = [];
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

        const activeAccounts = [];
        const lastAccounts = [];
        const categories = [];

        this.accountStrings.forEach(p => {
            activeAccounts.push(p.activeYear);
            lastAccounts.push(p.lastYear);
            categories.push(p.name);
        });


        this.activeYearAccountsRanks = activeAccounts;
        this.activeYearGrandAmount = _.sum(activeAccounts) || 0;
        this.activePieChartAmount = this.activeYearGrandAmount > 0 ? 100 : 0;

        this.lastYearAccountsRanks = lastAccounts;
        this.categories = categories;

        const seriesName = this.genSeriesName(this.selectedFilterType);
        this.series = [
            { name: `This ${seriesName}`, data: this.activeYearAccountsRanks, color: '#5AC4C4' } as any,
            { name: `Last ${seriesName}`, data: this.lastYearAccountsRanks, color: '#1F989C' }
        ];
        this.lastYearGrandAmount = _.sum(lastAccounts) || 0;
        this.lastPieChartAmount = this.lastYearGrandAmount > 0 ? 100 : 0;
        this.renderChart();
        this.renderPieChart('current', this.activePieChartAmount);
        this.renderPieChart('previous', this.lastPieChartAmount);
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
            if (per === 0) {
                this.pieSeries = [{ y: 100, color: '#ECECED' }];
            } else {
                this.pieSeries = [{ y: per, color: '#5AC4C4' }, { y: 100 - per, color: '#ECECED' }];
            }
            this.pieChartOptions = Object.assign({}, this.pieChartOptions, {
                title: Object.assign({}, this.pieChartOptions.title, {
                    text: `${per}%`
                }),
                series: this.pieChartOptions.series.map(s => {
                    s.data = this.pieSeries
                    return s;
                }),
            });
        } else {
            if (per === 0) {
                this.previousPieSeries = [{ y: 100, color: '#ECECED' }];
            } else {
                this.previousPieSeries = [{ y: per, color: '#1F989C' }, { y: 100 - per, color: '#ECECED' }];
            }
            // this.previousPieSeries = [{ y: per, color: '#1F989C' }, { y: 100 - per, color: '#ECECED' }];
            this.previousPieChartOptions = Object.assign({}, this.previousPieChartOptions, {
                title: Object.assign({}, this.previousPieChartOptions.title, {
                    text: `${per}%`
                }),
                series: this.previousPieChartOptions.series.map(s => {
                    s.data = this.pieSeries
                    return s;
                }),
            });
        }
        this.cdRef.detectChanges();
    }

    public seriesSeleted() {
        const __this: any = this;
        let compo: RevenueChartComponent;

        arguments[0].forEach(f => compo = f);

        if (__this.hoverPoints && __this.hoverPoints.length > 0) {
            let activePer = 0;
            let lastPer = 0;
            const activePoint = __this.hoverPoints[0].y;
            const lastPoint = __this.hoverPoints[1].y;

            activePer = Number(((activePoint * 100) / compo.activeYearGrandAmount).toFixed(2));
            lastPer = Number(((lastPoint * 100) / compo.lastYearGrandAmount).toFixed(2));

            compo.renderPieChart('current', activePer);
            compo.renderPieChart('previous', lastPer);
        }
    }

    public openFilter() {
        const dialog = this.dialog.open(DashboardFilterComponent, {
            data: { chartType: ChartType.Revenue }
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
