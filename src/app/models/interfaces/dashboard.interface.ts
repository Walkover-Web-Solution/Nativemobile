import { INameUniqueName } from './nameUniqueName.interface';
import { IClosingBalance, IForwardBalance } from './ledger.interface';
import { ClosingBalanceResponse, CategoryHistoryResponse, GroupHistoryResponse } from '../api-models/Dashboard';

export interface IPeriodBalances {
    periodBalances: IPeriodBalancesitem[];
}

export interface IPeriodBalancesitem {
    from: string;
    monthlyBalance: number;
    to: string;
    yearlyBalance: number;
}

export interface IGroupHistoryGroups extends INameUniqueName {
    category: string;
    intervalBalances: IIntervalBalancesItem[];
}

export interface IIntervalBalancesItem {
    closingBalance: IClosingBalance;
    creditTotal: number;
    debitTotal: number;
    from: string;
    openingBalance: IForwardBalance;
    to: string;
}

export interface IDashboardCbMainItem {
    forwardedBalance: IForwardBalance;
    creditTotal: number;
    debitTotal: number;
    closingBalance: IClosingBalance;
    childGroups: IChildGroups[];
    accounts: ICbAccount[];
    uniqueName: string;
    category: string;
    groupName: string;
}

export interface IChildGroups {
    forwardedBalance: IForwardBalance;
    creditTotal: number;
    debitTotal: number;
    closingBalance: IClosingBalance;
    childGroups: IChildGroups[];
    accounts: ICbAccount[];
    uniqueName: string;
    groupName: string;
    category: any;
}

export interface ICbAccount {
    creditTotal: number;
    debitTotal: number;
    closingBalance: IClosingBalance;
    openingBalance: IForwardBalance;
    uniqueName: string;
    name: string;
}

export interface IExpensesChartClosingBalanceResponse {
    label?: IChartLabelType;
    chartTitle?: string;
    operatingcostActiveyear?: ClosingBalanceResponse;
    operatingcostLastyear?: ClosingBalanceResponse;
    indirectexpensesActiveyear?: ClosingBalanceResponse;
    indirectexpensesLastyear?: ClosingBalanceResponse;
}

export interface IRevenueChartClosingBalanceResponse {
    label?: IChartLabelType;
    chartTitle?: string;
    revenuefromoperationsActiveyear?: ClosingBalanceResponse;
    revenuefromoperationsLastyear?: ClosingBalanceResponse;
    otherincomeActiveyear?: ClosingBalanceResponse;
    otherincomeLastyear?: ClosingBalanceResponse;
}

export interface IProfitLossChartResponse {
    lable?: IChartLabelType;
    chartTitle?: string;
    profitLossActiveYear?: any[],
    profitLossLastYear?: any[],
    legend?: string[]
}

export class IComparisionChartResponse {
    // Referesh
    public refresh?: boolean;
    // revenue
    public revenueActiveYear?: any[];
    public revenueActiveYearMonthly?: any[];
    public revenueActiveYearYearly?: any[];
    public revenueLastYear?: any[];
    public revenueLastYearMonthly?: any[];
    public revenueLastYearYearly?: any[];
    // expenses
    public ExpensesActiveYear?: any[];
    public ExpensesActiveYearMonthly?: any[];
    public ExpensesActiveYearYearly?: any[];
    public ExpensesLastYear?: any[];
    public ExpensesLastYearMonthly?: any[];
    public ExpensesLastYearYearly?: any[];
    // networth
    public NetworthActiveYear?: any;
    public NetworthActiveYearMonthly?: any[];
    public NetworthActiveYearYearly?: any[];
    public NetworthLastYear?: any;
    public NetworthLastYearMonthly?: any[];
    public NetworthLastYearYearly?: any[];
    // P/L
    public ProfitLossActiveYear?: any;
    public ProfitLossActiveYearMonthly?: any[];
    public ProfitLossActiveYearYearly?: any[];
    public ProfitLossLastYear?: any;
    public ProfitLossLastYearMonthly?: any[];
    public ProfitLossLastYearYearly?: any[];
}

export interface ProfitLossChart {
    networth: any[];
    profitLoss: any[];
    monthlyBalances?: any;
    yearlyBalances?: any;
}

export interface IBankAccount {
    amount: number;
    transactionDate: string;
    loginId: string;
    reconnect: boolean;
    accountNumber?: any;
    currencyCode: string;
    accountId: number;
    linkedAccount: INameUniqueName;
    name: string;
}

let cost = {
    // revenue
    revenueActiveYear: [],
    revenueActiveYearMonthly: [],
    revenueActiveYearYearly: [],
    revenueLastYear: [],
    revenueLastYearMonthly: [],
    revenueLastYearYearly: [],
    // expenses
    ExpensesActiveYear: [],
    ExpensesActiveYearMonthly: [],
    ExpensesActiveYearYearly: [],
    ExpensesLastYear: [],
    ExpensesLastYearMonthly: [],
    ExpensesLastYearYearly: [],
    // networth
    NetworthActiveYear: {
        networth: [],
        profitLoss: []
    },
    NetworthActiveYearMonthly: [],
    NetworthActiveYearYearly: [],
    NetworthLastYear: {
        networth: [],
        profitLoss: []
    },
    NetworthLastYearMonthly: [],
    NetworthLastYearYearly: [],
    // P/L
    ProfitLossActiveYear: {
        networth: [],
        profitLoss: []
    },
    ProfitLossActiveYearMonthly: [],
    ProfitLossActiveYearYearly: [],
    ProfitLossLastYear: {
        networth: [],
        profitLoss: []
    },
    ProfitLossLastYearMonthly: [],
    ProfitLossLastYearYearly: [],
};


export enum ChartFilterType {
    ThisMonthToDate,
    ThisQuarterToDate,
    ThisFinancialYearToDate,
    ThisYearToDate,
    LastMonth,
    LastQuater,
    LastFiancialYear,
    LastYear,
    Custom
}

export enum ChartType {
    Revenue,
    Expense,
    ProfitLoss
}

export interface IChartLabelType {
    activeYearLabel?: string;
    lastYearLabel?: string;
}

export interface IReportChartData {
    incomeData: CategoryHistoryResponse;
    expensesData: GroupHistoryResponse;
    legend: string[];
    from: string;
    to: string;
    lable: string;
}
export interface ILoader {
    showLoader?: boolean;
}
