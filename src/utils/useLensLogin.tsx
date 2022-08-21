import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useGlobalStore } from './state/StoreApi';

interface LensLogin {
  isConnected: boolean;
  accountAddress?: string;
}

export const useLensLogin = () => {
  const [lensLogin, setLensLogin] = useState<LensLogin | null>();
  const account = useAccount();
  const { accessToken } = useGlobalStore();

  useEffect(() => {
    setLensLogin({
      isConnected: accessToken != null && account.isConnected,
      accountAddress: account.address,
    });
  }, [accessToken, /*account -- generate an infinite loop...*/]);

  return lensLogin;
};
