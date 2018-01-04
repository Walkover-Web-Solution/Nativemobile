import { MyDrawerItem } from "~/shared/my-drawer-item/my-drawer-item";
import { CustomActions } from "~/store/customActions";
import { IContriesWithCodes } from "~/shared/static-data/countryWithCodes";
import { GeneralConst } from "~/actions/general/general.const";

const initialNavObj: MyDrawerItem[] = [
  {
    title: 'Back',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/home'
  } as MyDrawerItem,
  {
    title: 'Home',
    icon: String.fromCharCode(0xf015),
    needTopHr: true,
    router: '/home'
  } as MyDrawerItem,
  {
    title: 'Dashboard',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/dashboard'
  } as MyDrawerItem,
  {
    title: 'Trail Balance',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/tb'
  } as MyDrawerItem,
  {
    title: 'Sales Invoice',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/sale'
  } as MyDrawerItem,
  {
    title: 'Purchase Invoice',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/purchase'
  } as MyDrawerItem,
  {
    title: 'Reports',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/report'
  } as MyDrawerItem,
  {
    title: 'Settings',
    icon: String.fromCharCode(0xf013),
    needTopHr: true,
    router: '/settings'
  } as MyDrawerItem,
];

export interface GeneralState {
  navDrawerObj: MyDrawerItem[];
  contriesWithCodes: IContriesWithCodes[];
}

const initialState: GeneralState = {
  navDrawerObj: initialNavObj,
  contriesWithCodes: []
}

export function GeneralReducer(state: GeneralState = initialState, action: CustomActions): GeneralState {
  switch (action.type) {
    case GeneralConst.SET_COUNTRIES_WITH_CODES: {
      return {
        ...state,
        contriesWithCodes: action.payload
      }
    }
    default:
      return state;
  }
}
