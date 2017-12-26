import { MyDrawerItem } from "~/shared/my-drawer-item/my-drawer-item";
import { CustomActions } from "~/store/customActions";

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
    router: '/dashboard'
  } as MyDrawerItem,
  {
    title: 'Reports',
    icon: String.fromCharCode(0xf060),
    needTopHr: true,
    router: '/dashboard'
  } as MyDrawerItem,
  {
    title: 'Settings',
    icon: String.fromCharCode(0xf013),
    needTopHr: true,
    router: '/dashboard'
  } as MyDrawerItem,
];

export interface GeneralState {
  navDrawerObj: MyDrawerItem[];
}

const initialState: GeneralState = {
  navDrawerObj: initialNavObj
}

export function GeneralReducer(state: GeneralState = initialState, action: CustomActions): GeneralState {
  switch (action.type) {
    default:
      return state;
  }
}
