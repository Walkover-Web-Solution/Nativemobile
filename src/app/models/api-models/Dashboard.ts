import {
  IBankAccount,
  ICbAccount,
  IChildGroups,
  IDashboardCbMainItem,
  IGroupHistoryGroups,
  IPeriodBalances,
  IIntervalBalancesItem
} from '../interfaces/dashboard.interface';
import { IClosingBalance, IForwardBalance } from '../interfaces/ledger.interface';
import * as moment from 'moment/moment';

/**
 * Model for Audit Dashboard api request
 * API:: (Dashboard) company/:companyUniqueName/dashboard?from=:from&to=:to&interval=:interval&refresh=refresh
 * In Request Payload
 * A.   "from" and "to" params will be sent
 * interval values can be time unit we are seding monthly for now
 * refresh is boolean
 * NOTE:: we are sending an extra header called 'X-Forwarded-For': res.locales.remoteIp
 * NOTE:: its response will be a hash containing a key logs
 */
export class DashboardResponse {
  public networth: IPeriodBalances[];
  public profitLoss: IPeriodBalances[];
}

/**
 * Model for group-history api request
 * POST call
 * API:: (group-history) company/:companyUniqueName/group-history?from=:from&to=:to&interval=:interval&refresh=refresh
 * In Request Payload
 * A. "from" and "to" params will be sent
 * refresh is boolean
 * interval values can be time unit we are seding monthly for now
 * NOTE:: its response will be a hash containing a GroupHistoryResponse
 */

export class GroupHistoryRequest {
  public groups?: string[];
  public accounts?: string[];
  public category?: string[];
}

/**
 * NOTE:: as discussed accounts will be null always
 */
export class GroupHistoryResponse {
  public accounts?: any;
  public groups: IGroupHistoryGroups[];
}

export class CategoryHistoryResponse {
  name: string;
  intervalBalances: IIntervalBalancesItem[];
}

/*
 * Model: for closing balance
 * API: /company/:companyUniqueName/groups/:groupUniqueName/closing-balance?fromDate=:date1&toDate=:date2&refresh=:refresh
*/

export class ClosingBalanceResponse implements IDashboardCbMainItem, IChildGroups {
  public forwardedBalance: IForwardBalance;
  public creditTotal: number;
  public debitTotal: number;
  public closingBalance: IClosingBalance;
  public childGroups: IChildGroups[];
  public accounts: ICbAccount[];
  public uniqueName: string;
  public category: string;
  public groupName: string;
}

export class BankAccountsResponse {
  public accounts: IBankAccount[];
  public siteName: string;
  public siteId: number;
}

export class RefreshBankAccountResponse {
  public token: string;
  public connectUrl: string;
  // tslint:disable-next-line:variable-name
  public token_URL: string;
}

export class ChartFilterConfigs {
  public ChartTitle: string;
  public activeYear: {
    startDate: string,
    endDate: string
    lable?: string
  } = { lable: '', startDate: '', endDate: '' };
  public legend?: string[];

  public lastYear: {
    startDate: string,
    endDate: string,
    lable?: string
  } = { lable: '', startDate: '', endDate: '' };
}

export class ChartCustomFilter {
  public activeYear: {
    startDate: string,
    endDate: string
  } = { startDate: moment().format('DD-MM-YYYY'), endDate: moment().format('DD-MM-YYYY') };
  public lastYear: {
    startDate: string,
    endDate: string,
  } = { startDate: moment().format('DD-MM-YYYY'), endDate: moment().format('DD-MM-YYYY') };
}
