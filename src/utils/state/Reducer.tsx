import { IAction, IState } from './Store';

const setStateInLocStorage = (currentState: any) => {
  localStorage.setItem('state', JSON.stringify(currentState));
  return currentState;
};

const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'updateFromLocalStorage':
      return action.data.newState;
    case 'setAccessToken':
      return setStateInLocStorage({
        ...state,
        accessToken: action.data.accessToken,
      });
    case 'setRefreshToken':
      return setStateInLocStorage({
        ...state,
        refreshToken: action.data.refreshToken,
      });
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default Reducer;
