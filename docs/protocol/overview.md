# Overview

You can integrate your frontend with divvi v0 to earn rewards by referring users to protocols that also use divvi v0. To do this, you need to register as a referrer and ensure that users are registered as your referrals before they interact with the protocol.

When a referred user makes an eligible transaction with a protocol, **divvi v0** will track it and send rewards to your frontend based on the revenue that user generates.

## How It Works

Your frontend must enable users to register as your referral by sending a registration transaction to the divvi v0 registry contract before they start using the protocol. This transaction links the user to your frontend as their referrer.

Once the user is registered, divvi v0 keeps track of their transactions with the protocol. If the user generates revenue for the protocol, divvi v0 calculates your reward and sends it to your frontend.

## Steps to Integrate

1. **Sign up as a referrer** by submitting a request using this [form](https://docs.google.com/forms/d/e/1FAIpQLScTXExYljGoWsw4-mMHf7nXUxXV6QSrXa5zUMPK2foUwpdwZQ/viewform).
2. **Make sure users register as referrals before using the protocol** by sending a registration transaction from the frontend. There are detailed instructions for how to do this [here](./frontends.md).

By following these simple steps, you can integrate with **divvi v0** and start earning referral rewards!
