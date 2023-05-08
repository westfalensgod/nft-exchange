import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import type {AppProps} from 'next/app';
import {configureChains, createClient, WagmiConfig} from 'wagmi';
import {arbitrum, goerli, mainnet, optimism, polygon} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import {CartProvider, ReservoirKitProvider} from "@reservoir0x/reservoir-kit-ui";
import Link from "next/link";

const {chains, provider, webSocketProvider} = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const {connectors} = getDefaultWallets({
  appName: 'Reservoir Kit',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1);

function MyApp({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ReservoirKitProvider
        options={{
          chains: [
            {
              baseApiUrl: 'https://api.reservoir.tools',
              id: mainnet.id,
              active: CHAIN_ID === mainnet.id,
              apiKey: API_KEY,
            },
            {
              baseApiUrl: 'https://api-goerli.reservoir.tools',
              id: goerli.id,
              active: CHAIN_ID === goerli.id,
              apiKey: API_KEY,
            },
            {
              baseApiUrl: 'https://api-polygon.reservoir.tools',
              id: polygon.id,
              active: CHAIN_ID === polygon.id,
              apiKey: API_KEY,
            },
            {
              baseApiUrl: 'https://api-optimism.reservoir.tools',
              id: optimism.id,
              active: CHAIN_ID === optimism.id,
              apiKey: API_KEY,
            },
            {
              baseApiUrl: 'https://api-arbitrum.reservoir.tools',
              id: arbitrum.id,
              active: CHAIN_ID === arbitrum.id,
              apiKey: API_KEY,
            },
          ],
          source: 'reservoirkit.demo',
        }}
      >
        <CartProvider>
          <RainbowKitProvider chains={chains}>
            <Link href={'/'}>Home</Link>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </CartProvider>
      </ReservoirKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
