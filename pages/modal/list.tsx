import { NextPage } from 'next'
import { ListModal } from '@reservoir0x/reservoir-kit-ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { useRouter } from 'next/router'

const DEFAULT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_DEFAULT_COLLECTION_ID ||
  '0x60e4d786628fea6478f785a6d7e704777c86a7c6'
const DEFAULT_TOKEN_ID = process.env.NEXT_PUBLIC_DEFAULT_TOKEN_ID || '9498'

const chainId: number = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1)

let mainnetSymbol = 'ETH'

switch (chainId) {
  case 1:
  case 5: {
    mainnetSymbol = 'ETH'
    break
  }
  case 137: {
    mainnetSymbol = 'MATIC'
    break
  }
}

const Index: NextPage = () => {
  const router = useRouter()
  const [collectionId, setCollectionId] = useState(DEFAULT_COLLECTION_ID)
  const [tokenId, setTokenId] = useState(DEFAULT_TOKEN_ID)
  const [currencies] = useState<
    { contract: string; symbol: string; decimals?: number }[] | undefined
  >([
    {
      contract: '0x0000000000000000000000000000000000000000',
      symbol: mainnetSymbol,
    },
    {
      contract: '0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557',
      symbol: 'USDC',
      decimals: 6,
    },
  ])
  const deeplinkOpenState = useState(true)
  const hasDeeplink = router.query.deeplink !== undefined

  return (
    <div
      style={{
        display: 'flex',
        height: 50,
        width: '100%',
        gap: 12,
        padding: 24,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 150,
      }}
    >
      <ConnectButton />

      <div>
        <label>Collection Id: </label>
        <input
          type="text"
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
        />
      </div>
      <div>
        <label>Token Id: </label>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>

      <ListModal
        trigger={
          <button
            style={{
              marginTop: 50,
              padding: 24,
              background: 'blue',
              color: 'white',
              fontSize: 18,
              border: '1px solid #ffffff',
              borderRadius: 8,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            List Item
          </button>
        }
        collectionId={collectionId}
        tokenId={tokenId}
        currencies={currencies}
        openState={hasDeeplink ? deeplinkOpenState : undefined}
        onGoToToken={() => console.log('Awesome!')}
        onListingComplete={(data) => {
          console.log('Listing Complete', data)
        }}
        onListingError={(error, data) => {
          console.log('Transaction Error', error, data)
        }}
        onClose={() => {
          console.log('ListModal Closed')
        }}
      />
    </div>
  )
}

export default Index