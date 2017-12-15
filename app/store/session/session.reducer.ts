import { CustomActions } from '../customActions';
export interface SessionState {
  user: any
}

const initialState: SessionState = {
  user: null
}

export function SessionReducer(state: SessionState = initialState, action: CustomActions): SessionState {
  switch (action.type) {
    default:
      return state;
  }
}
