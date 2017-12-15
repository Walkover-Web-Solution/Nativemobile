// import { Injectable } from '@angular/core';
// import { HttpWrapperService } from './httpWrapper.service';
// import { Store } from '@ngrx/store';
// import { AppState } from '../store/roots';
// import { Observable } from 'rxjs/Observable';
// import { BaseResponse } from '../models/api-models/BaseResponse';
// import { BankAccountsResponse } from '../models/api-models/Dashboard';
// import { SETTINGS_LINKED_ACCOUNTS_API } from './apiurls/settings.linked-accounts.api';
// import { ErrorHandler } from './catchManager/catchmanger';
// import { UserDetails } from '../models/api-models/loginModels';
// @Injectable()
// export class SettingsLinkedAccountsService {
//   private user: UserDetails;
//   private companyUniqueName: string;
//   private roleUniqueName: string;
//   constructor(private errorHandler: ErrorHandler,private _http: HttpWrapperService, private store: Store<AppState>) { }
//   public GetBankAccounts(): Observable<BaseResponse<BankAccountsResponse[], string>> {
//     this.store.take(1).subscribe(s => {
//       if (s.session.user) {
//         this.user = s.session.user.user;
//       }
//       this.companyUniqueName = s.session.companyUniqueName;
//     });
//     return this._http.get(SETTINGS_LINKED_ACCOUNTS_API.BANK_ACCOUNTS.replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))).map((res) => {
//       let data: BaseResponse<BankAccountsResponse[], string> = res.json();
//       data.request = '';
//       return data;
//     }).catch((e) => this.errorHandler.HandleCatch<BankAccountsResponse[], string>(e, '', ));
//   }
//   /*
//   * Delete Account
//   */
//   public DeleteBankAccounts(token: string): Observable<BaseResponse<string, string>> {
//     this.store.take(1).subscribe(s => {
//       if (s.session.user) {
//         this.user = s.session.user.user;
//       }
//       this.companyUniqueName = s.session.companyUniqueName;
//     });
//     return this._http.delete(SETTINGS_LINKED_ACCOUNTS_API.REMOVE_ACCOUNT
//       .replace(':companyUniqueName', encodeURIComponent(this.companyUniqueName))
//       .replace(':loginId', token)
//     ).map((res) => {
//       let data: BaseResponse<string, string> = res.json();
//       data.request = token;
//       return data;
//     }).catch((e) => this.errorHandler.HandleCatch<string, string>(e));
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MubGlua2VkLWFjY291bnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy5saW5rZWQtYWNjb3VudHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsOERBQThEO0FBQzlELHVDQUF1QztBQUN2Qyw2Q0FBNkM7QUFDN0MsZ0RBQWdEO0FBQ2hELG9FQUFvRTtBQUNwRSx5RUFBeUU7QUFDekUseUZBQXlGO0FBQ3pGLDZEQUE2RDtBQUM3RCxrRUFBa0U7QUFFbEUsZ0JBQWdCO0FBQ2hCLCtDQUErQztBQUMvQywrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDLG9DQUFvQztBQUNwQywwSEFBMEg7QUFFMUgseUZBQXlGO0FBQ3pGLDBDQUEwQztBQUMxQyw4QkFBOEI7QUFDOUIsMkNBQTJDO0FBQzNDLFVBQVU7QUFDViw4REFBOEQ7QUFDOUQsVUFBVTtBQUNWLGlLQUFpSztBQUNqSyw2RUFBNkU7QUFDN0UsMkJBQTJCO0FBQzNCLHFCQUFxQjtBQUNyQiwrRkFBK0Y7QUFDL0YsTUFBTTtBQUVOLE9BQU87QUFDUCxxQkFBcUI7QUFDckIsT0FBTztBQUNQLHlGQUF5RjtBQUN6RiwwQ0FBMEM7QUFDMUMsOEJBQThCO0FBQzlCLDJDQUEyQztBQUMzQyxVQUFVO0FBQ1YsOERBQThEO0FBQzlELFVBQVU7QUFDViwyRUFBMkU7QUFDM0UsbUZBQW1GO0FBQ25GLG9DQUFvQztBQUNwQyx1QkFBdUI7QUFDdkIsNkRBQTZEO0FBQzdELDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckIseUVBQXlFO0FBQ3pFLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gaW1wb3J0IHsgSHR0cFdyYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9odHRwV3JhcHBlci5zZXJ2aWNlJztcbi8vIGltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuLy8gaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICcuLi9zdG9yZS9yb290cyc7XG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbi8vIGltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0Jhc2VSZXNwb25zZSc7XG4vLyBpbXBvcnQgeyBCYW5rQWNjb3VudHNSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9hcGktbW9kZWxzL0Rhc2hib2FyZCc7XG4vLyBpbXBvcnQgeyBTRVRUSU5HU19MSU5LRURfQUNDT1VOVFNfQVBJIH0gZnJvbSAnLi9hcGl1cmxzL3NldHRpbmdzLmxpbmtlZC1hY2NvdW50cy5hcGknO1xuLy8gaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9jYXRjaE1hbmFnZXIvY2F0Y2htYW5nZXInO1xuLy8gaW1wb3J0IHsgVXNlckRldGFpbHMgfSBmcm9tICcuLi9tb2RlbHMvYXBpLW1vZGVscy9sb2dpbk1vZGVscyc7XG5cbi8vIEBJbmplY3RhYmxlKClcbi8vIGV4cG9ydCBjbGFzcyBTZXR0aW5nc0xpbmtlZEFjY291bnRzU2VydmljZSB7XG4vLyAgIHByaXZhdGUgdXNlcjogVXNlckRldGFpbHM7XG4vLyAgIHByaXZhdGUgY29tcGFueVVuaXF1ZU5hbWU6IHN0cmluZztcbi8vICAgcHJpdmF0ZSByb2xlVW5pcXVlTmFtZTogc3RyaW5nO1xuLy8gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLHByaXZhdGUgX2h0dHA6IEh0dHBXcmFwcGVyU2VydmljZSwgcHJpdmF0ZSBzdG9yZTogU3RvcmU8QXBwU3RhdGU+KSB7IH1cblxuLy8gICBwdWJsaWMgR2V0QmFua0FjY291bnRzKCk6IE9ic2VydmFibGU8QmFzZVJlc3BvbnNlPEJhbmtBY2NvdW50c1Jlc3BvbnNlW10sIHN0cmluZz4+IHtcbi8vICAgICB0aGlzLnN0b3JlLnRha2UoMSkuc3Vic2NyaWJlKHMgPT4ge1xuLy8gICAgICAgaWYgKHMuc2Vzc2lvbi51c2VyKSB7XG4vLyAgICAgICAgIHRoaXMudXNlciA9IHMuc2Vzc2lvbi51c2VyLnVzZXI7XG4vLyAgICAgICB9XG4vLyAgICAgICB0aGlzLmNvbXBhbnlVbmlxdWVOYW1lID0gcy5zZXNzaW9uLmNvbXBhbnlVbmlxdWVOYW1lO1xuLy8gICAgIH0pO1xuLy8gICAgIHJldHVybiB0aGlzLl9odHRwLmdldChTRVRUSU5HU19MSU5LRURfQUNDT1VOVFNfQVBJLkJBTktfQUNDT1VOVFMucmVwbGFjZSgnOmNvbXBhbnlVbmlxdWVOYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29tcGFueVVuaXF1ZU5hbWUpKSkubWFwKChyZXMpID0+IHtcbi8vICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8QmFua0FjY291bnRzUmVzcG9uc2VbXSwgc3RyaW5nPiA9IHJlcy5qc29uKCk7XG4vLyAgICAgICBkYXRhLnJlcXVlc3QgPSAnJztcbi8vICAgICAgIHJldHVybiBkYXRhO1xuLy8gICAgIH0pLmNhdGNoKChlKSA9PiB0aGlzLmVycm9ySGFuZGxlci5IYW5kbGVDYXRjaDxCYW5rQWNjb3VudHNSZXNwb25zZVtdLCBzdHJpbmc+KGUsICcnLCApKTtcbi8vICAgfVxuXG4vLyAgIC8qXG4vLyAgICogRGVsZXRlIEFjY291bnRcbi8vICAgKi9cbi8vICAgcHVibGljIERlbGV0ZUJhbmtBY2NvdW50cyh0b2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+PiB7XG4vLyAgICAgdGhpcy5zdG9yZS50YWtlKDEpLnN1YnNjcmliZShzID0+IHtcbi8vICAgICAgIGlmIChzLnNlc3Npb24udXNlcikge1xuLy8gICAgICAgICB0aGlzLnVzZXIgPSBzLnNlc3Npb24udXNlci51c2VyO1xuLy8gICAgICAgfVxuLy8gICAgICAgdGhpcy5jb21wYW55VW5pcXVlTmFtZSA9IHMuc2Vzc2lvbi5jb21wYW55VW5pcXVlTmFtZTtcbi8vICAgICB9KTtcbi8vICAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUoU0VUVElOR1NfTElOS0VEX0FDQ09VTlRTX0FQSS5SRU1PVkVfQUNDT1VOVFxuLy8gICAgICAgLnJlcGxhY2UoJzpjb21wYW55VW5pcXVlTmFtZScsIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbXBhbnlVbmlxdWVOYW1lKSlcbi8vICAgICAgIC5yZXBsYWNlKCc6bG9naW5JZCcsIHRva2VuKVxuLy8gICAgICkubWFwKChyZXMpID0+IHtcbi8vICAgICAgIGxldCBkYXRhOiBCYXNlUmVzcG9uc2U8c3RyaW5nLCBzdHJpbmc+ID0gcmVzLmpzb24oKTtcbi8vICAgICAgIGRhdGEucmVxdWVzdCA9IHRva2VuO1xuLy8gICAgICAgcmV0dXJuIGRhdGE7XG4vLyAgICAgfSkuY2F0Y2goKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLkhhbmRsZUNhdGNoPHN0cmluZywgc3RyaW5nPihlKSk7XG4vLyAgIH1cbi8vIH1cbiJdfQ==