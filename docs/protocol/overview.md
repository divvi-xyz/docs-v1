# Overview

Divvi is an on-chain rewards protocol that connects builders and protocols in a mutually beneficial way.

Protocols launch Divvi Campaigns by funding reward contracts to incentivize usage of their products. Each campaign defines its own reward structure and KPIs, which determine how builders earn based on the impact they drive.

Builders integrate Divvi into their apps to refer users to those protocols. When referred users interact with the protocols on-chain, Divvi attributes that activity back to the builder—enabling rewards to be earned based on real user impact.

Divvi manages tracking, attribution, and payouts, so builders can focus on creating high-quality user experiences while getting rewarded for the value they generate.

## How It Works

After integrating Divvi and registering a user, Divvi takes care of the rest:

**User registration**  
Your app appends referral metadata to a transaction. Once the transaction is confirmed and registered, the user is linked to you as their referrer.

**Activity tracking**  
Divvi monitors the user’s on-chain activity with the Campaigns that you have signed up for.

**Reward calculation**  
Divvi periodically calculates your rewards based on referred user activity and publishes the results on-chain.

**Claiming rewards**  
You can claim your rewards directly from Divvi’s smart contracts whenever you're ready.

## Getting Started

Integrating Divvi is simple. At a high level, builders need to:

1. Register yourself in the Divvi ecosystem using a wallet address
1. Join the Divvi Campaigns that you want to participate in
1. Build user experiences that drive engagement with those campaigns
1. Append referral metadata to your users' first transaction
1. Register that transaction hash with Divvi
1. That’s it! Divvi handles tracking, attribution, and reward calculation. You can claim your rewards periodically from the reward contracts directly.

👉 To make this even easier, use this [guided onboarding experience](https://app.divvi.xyz/builders) for builders. You’ll be walked through the process step-by-step, with no need to manage raw contract calls manually.

## DivviRegistry Contract Details

The DivviRegistry contract is deployed at 0xEdb51A8C390fC84B1c2a40e0AE9C9882Fa7b7277 on the Optimism network.

**ABI**: You can find the contract ABI [here](https://optimistic.etherscan.io/address/0xEdb51A8C390fC84B1c2a40e0AE9C9882Fa7b7277#readProxyContract) by clicking on the implementation contract address and scrolling down to the "Contract ABI" section.
