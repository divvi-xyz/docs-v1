# Rewards

Each protocol that Divvi supports calculates impact and corresponding
rewards in a different way. Divvi v0 holds funds allocated for rewards
in protocol specific rewards contracts. This contract references the
code used to calculate rewards and provides a method for builders to
claim any pending rewards.

## Aerodrome / Velodrome

Divvi distributes **100% of trading fees** of each referral
to the referrer. For example, if My App refers user *0x123* and the user *0x123* completes a swap using Aerodrome or Velodrome, then Divvi will reward all trading fees from user *0x123's* swap to My App.

Rewards contracts: coming soon.

## Allbridge

Coming soon.

## Beefy

Divvi distributes **100% of incremental harvest revenue** of each referral
to the referrer. For example, if My App refers user *0x123* and the user *0x123* deposits
liquidity in a Beefy vault, then Divvi will reward all yield Beefy
harvests from user *0x123's* liquidity to My App.

Rewards contracts: coming soon.

## Celo

Coming soon.

## Fonbnk

Coming soon.

## Mento

Coming soon.

## Somm

Divvi distributes **10% of incremental TVL per year** of each referral to the referrer.
For example, if My App refers user *0x123* and the user *0x123* deposits
liquidity in a Somm vault for a week, then Divvi will reward 10% * 1/52 of user *0x123's* 
liquidity to My App.

Rewards contracts: coming soon.

## Vana

Coming soon.
