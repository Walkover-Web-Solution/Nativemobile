
export const DASHBOARD_API = {
  DASHBOARD: 'company/:companyUniqueName/dashboard?from=:from&to=:to&interval=:interval&refresh=:refresh', // get call
  GROUP_HISTORY: 'company/:companyUniqueName/group-history?from=:from&to=:to&interval=:interval&refresh=:refresh', // post call,
  HISTORY: 'company/:companyUniqueName/history?from=:from&to=:to&interval=:interval',
  CATEGORY_HISTORY: 'company/:companyUniqueName/category-history?from=:from&to=:to&interval=:interval&refresh=:refresh', // post call
  CLOSING_BALANCE: 'company/:companyUniqueName/groups/:groupUniqueName/closing-balance?from=:fromDate&to=:toDate&refresh=:refresh', // get call
  CLOSING_BALANCE_V2: 'company/:companyUniqueName/group-closing-balances?from=:fromDate&to=:toDate&refresh=:refresh', // post call
  BANK_ACCOUNTS: 'company/:companyUniqueName/ebanks', // Get call
  REFRESH_BANK_ACCOUNT: 'company/:companyUniqueName/login/:loginId/token/refresh', // get call
  RECONNECT_BANK_ACCOUNT: 'company/:companyUniqueName/login/:loginId/token/reconnect',
};
