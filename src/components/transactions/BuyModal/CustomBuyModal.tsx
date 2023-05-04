import {BuyModal, BuyStep, PurchaseData} from '@reservoir0x/reservoir-kit-ui'

const CustomBuyModal = () => {
  return (
    <BuyModal
      trigger={
        <button>
          Buy Token
        </button>
      }
      collectionId="0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b"
      tokenId="1236715"
      onPurchaseComplete={(data: PurchaseData) => console.log('Purchase Complete', data)}
      onPurchaseError={(error: Error, data: PurchaseData) => console.log('Transaction Error', error, data)}
      onClose={(data: PurchaseData, stepData, currentStep: BuyStep) => console.log('Modal Closed', data, stepData, currentStep)}
    >
      Test
    </BuyModal>
  )
}

export default CustomBuyModal