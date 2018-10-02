import {GroupsWithAccountsResponse} from '../api-models/GroupsWithAccounts';

export class GroupsWithAccountsVm extends GroupsWithAccountsResponse {
    public isActive = false;
    public isOpen = false;
}
