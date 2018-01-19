import { MyDrawerItem } from "~/shared/my-drawer-item/my-drawer-item";
import { CustomActions } from "~/store/customActions";
import { IContriesWithCodes } from "~/shared/static-data/countryWithCodes";
import { GeneralConst } from "~/actions/general/general.const";
import { States } from "~/models/api-models/Company";
import { BaseResponse } from "~/models/api-models/BaseResponse";

const initialNavObj: MyDrawerItem[] = [
  {
    title: 'Back',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/home',
    fontFamily: 'FontAwesome',
  } as MyDrawerItem,
  {
    title: 'Home',
    icon: String.fromCharCode(0x66),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/home'
  } as MyDrawerItem,
  {
    title: 'Dashboard',
    icon: String.fromCharCode(0x64),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/dashboard'
  } as MyDrawerItem,
  {
    title: 'Trail Balance',
    icon: String.fromCharCode(0x63),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/tb'
  } as MyDrawerItem,
  {
    title: 'Sales Invoice',
    icon: String.fromCharCode(0x6a),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/sale'
  } as MyDrawerItem,
  {
    title: 'Purchase Invoice',
    icon: String.fromCharCode(0x6b),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/purchase'
  } as MyDrawerItem,
  {
    title: 'Reports',
    icon: String.fromCharCode(0x69),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/report'
  } as MyDrawerItem,
  {
    title: 'Settings',
    icon: String.fromCharCode(0x6c),
    needTopHr: true,
    fontFamily: '1515160234',
    router: '/settings'
  } as MyDrawerItem,
];

export interface GeneralState {
  navDrawerObj: MyDrawerItem[];
  contriesWithCodes: IContriesWithCodes[];
  states: States[];
}

const initialState: GeneralState = {
  navDrawerObj: initialNavObj,
  contriesWithCodes: [],
  states: null
}

export function GeneralReducer(state: GeneralState = initialState, action: CustomActions): GeneralState {
  switch (action.type) {
    case GeneralConst.SET_COUNTRIES_WITH_CODES: {
      return Object.assign({}, state, {
        contriesWithCodes: action.payload
      })
    }

    case GeneralConst.GET_ALL_STATES_RESPONSE: {
      let result: BaseResponse<States[], string> = action.payload;
      if (result.status === 'success') {
        return Object.assign({}, state, {
          states: result.body
        })
        // return {
        //   ...state,
        //   states: result.body
        // };
      }
      return state;
    }
    default:
      return state;
  }
}
