import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import {
  apolloClient,
} from '../clients/LensGraphQL';
import Layout from '../components/Layout';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from '../utils/rainbowkit';
import { StoreProvider } from '../utils/state/Store';
import LensRefreshToken from '../components/LensLogin/LensRefreshToken'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <StoreProvider>
            <LensRefreshToken>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </LensRefreshToken>
          </StoreProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
