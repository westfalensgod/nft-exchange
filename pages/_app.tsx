import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {ReservoirKitProvider, darkTheme, CartProvider} from '@reservoir0x/reservoir-kit-ui'
import {getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import type {AppProps} from 'next/app';
import {configureChains, createClient, WagmiConfig} from 'wagmi';
import {arbitrum, goerli, mainnet, optimism, polygon} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

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
  appName: 'nft-exchange',
  chains,
});

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1)

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ReservoirKitProvider
      options={{
        chains: [{
          id: mainnet.id,
          baseApiUrl: "https://api.reservoir.tools",
          active: true,
          apiKey: API_KEY
        }],
        source: 'reservoirkit.demo'
      }}
      theme={theme}
    >
      <WagmiConfig client={wagmiClient}>
        <CartProvider>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </CartProvider>
      </WagmiConfig>
    </ReservoirKitProvider>
  );
}

export default MyApp;
