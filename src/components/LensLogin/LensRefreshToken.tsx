import { useCallback, useEffect, useRef } from 'react';
import {
  executeMutation,
  LENS_REFRESH_AUTHENTICATION_GQP,
} from '../../clients/LensGraphQL';
import { useLensLogin } from '../../utils/useLensLogin';
import { useGlobalStore } from '../../utils/state/StoreApi';

const LensRefreshToken = (props: any) => {
  const { isConnected, refreshToken } = useLensLogin();
  const { setAccessToken, setRefreshToken } = useGlobalStore();
  const intervalRef = useRef<any>();

  const execRefreshToken = useCallback(async () => {
    const refreshResponse = await executeMutation(
      LENS_REFRESH_AUTHENTICATION_GQP,
      {
        request: { refreshToken },
      }
    );
    setAccessToken(refreshResponse.data.refresh.accessToken);
    setRefreshToken(refreshResponse.data.refresh.refreshToken);
  }, [refreshToken, setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => execRefreshToken(), 300000); // refresh every 5min
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [isConnected, execRefreshToken]);

  return props.children;
};

export default LensRefreshToken;
