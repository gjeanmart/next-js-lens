import { useStore } from './Store';

export const useGlobalStore = () => {
  const { state, dispatch } = useStore();
  return {
    ...state,
    reset: () => dispatch({ type: 'reset' }),
    setAccessToken: (accessToken: string) =>
      dispatch({ type: 'setAccessToken', data: { accessToken } }),
    setRefreshToken: (refreshToken: string) =>
      dispatch({ type: 'setRefreshToken', data: { refreshToken } }),
    setProfileId: (profileId: string) =>
      dispatch({ type: 'setProfileId', data: { profileId } }),
  };
};
