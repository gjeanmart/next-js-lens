import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useGlobalStore } from './state/StoreApi';

interface LensLogin {
  isConnected: boolean;
  accountAddress?: string;
  profileId?: string
  accessToken?: string
  refreshToken?: string
}

export const useLensLogin = (redirect?: boolean) => {
  const [lensLogin, setLensLogin] = useState<LensLogin | null>();
  const account = useAccount();
  const { accessToken, refreshToken, profileId } = useGlobalStore();
  const router = useRouter();

  useEffect(() => {
    const isConnected = account.isConnected && accessToken != null && profileId != null
    setLensLogin({
      isConnected,
      accountAddress: account.address,
      profileId,
      accessToken,
      refreshToken
    });

    if(redirect && !isConnected) {
      router.push('/settings/signin');
    }
    if(redirect && isConnected) {
      router.push('/profile/my');
    }

  }, [accessToken, profileId /*account -- generate an infinite loop...*/]);

  return lensLogin;
};

export const useLensLogout = () => {
  const { reset } = useGlobalStore();
  const { disconnect } = useDisconnect();

  const logout = () => {
    reset();
    disconnect();
  };

  return { logout };
};
