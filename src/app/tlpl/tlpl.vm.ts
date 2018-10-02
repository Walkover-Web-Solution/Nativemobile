import {IFlattenGroupsAccountsDetail} from '../models/interfaces/flattenGroupsAccountsDetail.interface';

export class TlPlFlGWAList {
    constructor(public name: string, public uniqueName: string, public isGroup: boolean = true, public parentGrpUniqueName?: string) {

    }
}

export class TlPlVM {
    constructor() {

    }

    prepareFlGWAList(flattenGroupsAccounts: IFlattenGroupsAccountsDetail[]): TlPlFlGWAList[] {
        const flGWAList: TlPlFlGWAList[] = [];

        flattenGroupsAccounts.map(fl => {
            if (fl.accountDetails) {
                fl.accountDetails.map(fla => {
                    flGWAList.push(new TlPlFlGWAList(fla.name, fla.uniqueName, false, fla.groupUniqueName));
                });
            }
            flGWAList.push(new TlPlFlGWAList(fl.groupName, fl.groupUniqueName));
        });
        return flGWAList;
    }
}
