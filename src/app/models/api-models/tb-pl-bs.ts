import { ChildGroup, ClosingBalance, ForwardedBalance, OpeningBalance } from './Search';

export interface TrialBalanceExportExcelRequest {
    fromDate?: string;
    toDate?: string;
    export?: string;
}

export interface TrialBalanceRequest {
    from?: string;
    to?: string;
    refresh?: boolean;
    selectedDateOption?: string;
}

export interface ProfitLossRequest extends TrialBalanceRequest {
    fy?: number;
    tax: number
}

export interface BalanceSheetData {
    assets?: ChildGroup[];
    liabilities?: ChildGroup[];
    othArr?: ChildGroup[];
    assetTotal?: number;
    assetTotalEnd?: number;
    liabTotal?: number;
    liabTotalEnd?: number;
    dates?: BalanceSheetRequest;
}

export interface ProfitLossData {
    inProfit?: boolean;
    incArr?: ChildGroup[];
    expArr?: ChildGroup[];
    othArr?: ChildGroup[];
    expenseTotal?: number;
    expenseTotalEnd?: number;
    incomeTotal?: number;
    incomeTotalEnd?: number;
    closingBalance?: number;
    frowardBalance?: number;
    closingBalanceClass?: boolean;
    frowardBalanceClass?: boolean;
    dates?: ProfitLossRequest;
}

export interface AccountDetails {
    forwardedBalance: ForwardedBalance;
    creditTotal: number;
    debitTotal: number;
    closingBalance: ClosingBalance;
    openingBalance: OpeningBalance;
    groupDetails: ChildGroup[];
    message?: string;
}

export interface BalanceSheetRequest extends TrialBalanceRequest {
    fy?: number;
}

export interface BalanceSheetData {
    inProfit?: boolean;
    incArr?: ChildGroup[];
    expArr?: ChildGroup[];
    othArr?: ChildGroup[];
    expenseTotal?: number;
    incomeTotal?: number;
    closingBalance?: number;
    dates?: BalanceSheetRequest;
}

export interface ProfitLossDataV3 {
    costOfGoodsSold: number;
    grossProfit: number;
    operatingProfit: number;
    incomeBeforeTaxes: number;
    appliedTax: number;
    netIncome: number;
    revenue: {
        amount: number,
        type: string
    },
    operatingExpenses: {
        amount: number,
        type: string
    },
    otherExpenses: {
        amount: number,
        type: string
    }
}
