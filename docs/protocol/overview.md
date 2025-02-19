# Overview

You can integrate your frontend with divvi V0 to earn rewards by referring users to protocols that also use divvi V0. To do this, you need to register as a referrer and ensure that users are registered as your referrals before they interact with the protocol.

When a referred user makes an eligible transaction with a protocol, **divvi V0** will track it and send rewards to your frontend based on the revenue that user generates.

## How It Works

Your frontend must enable users to register as your referral by sending a registration transaction to the divvi V0 registry contract before they start using the protocol. This transaction links the user to your frontend as their referrer.

Once the user is registered, divvi V0 keeps track of their transactions with the protocol. If the user generates revenue for the protocol, divvi V0 calculates your reward and sends it to the reward address you provided.

## Steps to Integrate

1. **Sign up as a referrer** by submitting a request using this [form](https://docs.google.com/forms/d/e/1FAIpQLScTXExYljGoWsw4-mMHf7nXUxXV6QSrXa5zUMPK2foUwpdwZQ/viewform).
2. **Make sure users register as referrals before using the protocol** by sending a registration transaction from the frontend. There are detailed instructions for how to do this [here](./frontends.md).

By following these simple steps, you can integrate with **divvi V0** and start earning divvi rewards!
