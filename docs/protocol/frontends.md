# Frontend Integration

## Request a referrer ID

To receive divvi rewards in divvi V0, a frontend builder must register
as a referrer by submitting a request using this [form](https://docs.google.com/forms/d/e/1FAIpQLScTXExYljGoWsw4-mMHf7nXUxXV6QSrXa5zUMPK2foUwpdwZQ/viewform).

## Start recording referrals

A frontend can use their referrer ID to register new protocol users
as referrals. When those users begin transacting with protocols in a
way that's eligible for rewards, divvi V0 will periodically distribute
those rewards to the frontend.

The simplest way to register a new user as a referral is by submitting
a transaction from the user that invokes the function
`registerReferral` on the `Registry` contract. A frontend will only
want to do this if they expect the user to transact with a specific
protocol and that user has not been registered for that protocol yet.

There are examples at [here](https://github.com/mobilestack-xyz/funding-layer/tree/main/scripts).
