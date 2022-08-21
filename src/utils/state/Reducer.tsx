import { IAction, IState } from './Store';

const setStateInLocStorage = (currentState: any) => {
  localStorage.setItem('state', JSON.stringify(currentState));
  return currentState;
};

const removeStateInLocStorage = () => {
  localStorage.removeItem('state');
};

const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'reset':
      return removeStateInLocStorage();
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
    case 'setProfileId':
      return setStateInLocStorage({
        ...state,
        profileId: action.data.profileId,
      });
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default Reducer;
