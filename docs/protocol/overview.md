# Overview

Divvi is an on-chain rewards protocol that connects builders with rewards providers.

Builders integrate Divvi into their apps to refer users to supported providers. When those users interact with the providers on-chain, Divvi attributes that activity back to the builder. This makes it possible for builders to earn rewards based on real user impact.

Providers fund reward contracts to incentivize meaningful usage. Divvi handles tracking, attribution, and payouts so that builders can focus on building great user experiences while earning for the value they drive.

## How It Works

After integrating Divvi and registering a user, the system takes care of the rest:

**User registration**  
Your app appends referral metadata to a transaction. Once the transaction is confirmed and registered, the user is linked to your app as their referrer.

**Activity tracking**  
Divvi monitors the user’s on-chain activity with the providers you've registered agreements with.

**Reward calculation**  
Divvi periodically calculates the value your referred users generate and publishes these calculations on-chain.

**Claiming rewards**  
You can claim your share of provider-funded rewards directly from Divvi’s smart contracts whenever you're ready.

## Steps to Integrate

Integrating Divvi is simple. At a high level, builders need to:

1. Register as an entity using a wallet address
1. Create agreements with the providers they want to support
1. Append referral metadata to a meaningful transaction
1. Register the transaction hash with Divvi
1. Let Divvi handle the tracking, attribution, and rewards

👉 To make this even easier, we’ve built a [guided onboarding experience](app.divvi.xyz/builders). You’ll be walked through the process step-by-step, with no need to manage raw contract calls manually.
