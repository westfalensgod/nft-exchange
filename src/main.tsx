import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ReservoirKitProvider,
  darkTheme,
} from '@reservoir0x/reservoir-kit-ui'
import {WagmiConfig, createClient} from 'wagmi'
import {getDefaultProvider} from 'ethers'
import App from './App.tsx'
import './index.css'

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
})

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReservoirKitProvider
      options={{
        chains: [{
          id: 1,
          baseApiUrl: "https://api.reservoir.tools",
          default: true,
          apiKey: process.env.API_KEY
        }],
        source: "YOUR_SOURCE"
      }}
      theme={theme}
    >
      <WagmiConfig client={client}>
        <App/>
      </WagmiConfig>
    </ReservoirKitProvider>
  </React.StrictMode>,
)
