# Frontend Integration

This guide explains how to integrate a frontend with **Divvi V0** to register user referrals and receive rewards.

## Registry Contract Details

- **Contract Address**: `0xba9655677f4e42dd289f5b7888170bc0c7da8cdc`
- **Networks**:
  - Arbitrum One
  - Base Mainnet
  - Celo Mainnet
  - Optimism Mainnet
  - Polygon POS Mainnet
- **ABI**: You can find the contract ABI on the block explorer for the network you are using. For example, on Arbitrum, it is available near the bottom of [this Arbiscan page](https://arbiscan.io/address/0xba9655677f4e42dd289f5b7888170bc0c7da8cdc#code).

## Getting Started

To participate, complete this [form](https://docs.google.com/forms/d/e/1FAIpQLScTXExYljGoWsw4-mMHf7nXUxXV6QSrXa5zUMPK2foUwpdwZQ/viewform). Once submitted, your request will be processed, and your **referrer ID** will be added to the **Registry Contract**, allowing you to register referrals and receive rewards.

## Registering User Referrals

Once your **referrer ID** is added, your frontend can register users as referrals. When these users transact with eligible protocols, **Divvi V0** distributes rewards based on their activity.

Your frontend should determine the best time to register a user as a referral. Since registration requires an on-chain transaction, the user must have enough funds to cover gas fees. To streamline the experience, we recommend including the registration transaction as part of the first transaction the user makes with the protocol. This ensures they can complete the registration and immediately proceed with their intended action.

The registration transaction must be sent before the user interacts with the protocol. Divvi V0 only tracks transactions that happen after a user has been registered as a referral.

### Checking If a User Is Already Registered

Before registering a user, it's important to check if they are already registered. Attempting to register a user who is already linked to a protocol is unnecessary and will result in a failed transaction. Use the `isUserRegistered` contract method to determine if a user is already registered with a protocol. The method returns a list of boolean values for each protocol.

```typescript
import {
  stringToHex,
  createWalletClient,
  http,
  publicActions,
  privateKeyToAccount,
} from 'viem'
import { arbitrum } from 'viem/chains'

const account = privateKeyToAccount('0x...')
const client = createWalletClient({
  chain: arbitrum,
  transport: http(),
  account,
}).extend(publicActions)

const supportedProtocols = ['protocol1', 'protocol2']
const protocolsHex = supportedProtocols.map((protocol) =>
  stringToHex(protocol, { size: 32 }),
)

const isUserRegisteredForProtocols = await client.readContract({
  address: REGISTRY_CONTRACT_ADDRESS,
  abi: registryContractAbi,
  functionName: 'isUserRegistered',
  args: [account.address, protocolsHex],
})

const protocolsToRegisterHex = protocolsHex.filter(
  (_, index) => !isUserRegisteredForProtocols[index],
)
```

### Submitting a Registration Transaction

For the protocols that the user is not already registered for, your frontend should send a transaction to register them.

```typescript
import { encodeFunctionData } from 'viem'

const referrerId = 'awesome-frontend'
const referrerIdHex = stringToHex(referrerId, { size: 32 })

const registrationTransaction = {
  from: walletAddress,
  to: REGISTRY_CONTRACT_ADDRESS,
  data: encodeFunctionData({
    abi: registryContractAbi,
    functionName: 'registerReferrals',
    args: [referrerIdHex, protocolsToRegisterHex],
  }),
}

const hash = await client.sendTransaction(registrationTransaction)
```

### Confirming Registration

If the transaction succeeded, then it is guaranteed all passed protocols were registered. Alternatively, you can read the `ReferralRegistered` event(s) to confirm all registered protocols.

```typescript
import { parseEventLogs, hexToString } from 'viem'

const receipt = await client.waitForTransactionReceipt({ hash })

if (receipt.status === 'success') {
  const parsedLogs = parseEventLogs({
    abi: registryContractAbi,
    eventName: ['ReferralRegistered'],
    logs: receipt.logs,
  })

  const registeredProtocolIds = parsedLogs.map((log) =>
    hexToString(log.args.protocolId, { size: 32 }),
  )
}
```
