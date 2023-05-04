import { useState } from 'react'
import {ListModal} from "@reservoir0x/reservoir-kit-ui";
import {useSigner} from "wagmi";

const CustomListModal = () => {
  const openState = useState(true)
  const {data: signer} = useSigner()
  return (
    <ListModal
      trigger={
        <button>
          List Item
        </button>
      }
      collectionId="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
      tokenId="1"
      currencies={[
        {
          contract: '0x0000000000000000000000000000000000000000',
          symbol: 'ETH',
        },
        {
          contract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'USDC',
          decimals: 6
        },
      ]}
      openState={openState}
      nativeOnly={false}
      oracleEnabled={false}
      onGoToToken={() => console.log('Awesome!')}
      onListingComplete={(data) => {
        console.log('Listing Complete', data)
      }}
      onListingError={(error, data) => {
        console.log('Transaction Error', error, data)
      }}
      onClose={(data, stepData, currentStep) => {
        console.log('ListModal Closed')
      }}
    />
  )
}

export default CustomListModal