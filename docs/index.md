# Mobile Stack Runbook

This document outlines the steps to spin up a new Mobile Stack app, beginning with the [mobilestack-runtime](https://github.com/mobilestack-xyz/mobilestack-runtime) repository; it is primarily aimed at Valora employees, however these steps should be possible to follow (with modifications) for non-employees as well.

## Setup

### Fork the `mobilestack-runtime` repo

The first step in spinning up a Mobile Stack app is forking the [mobilestack-runtime](https://github.com/mobilestack-xyz/mobilestack-runtime) repository.

### Update the User-Agent header for the app

Mobile Stack apps include code that intercepts network requests in order to add a custom User-Agent header to identify the app to backend services. You'll need to change the user agent in order to correctly identify the app. See an example of this [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/dd53112e8927c7c0f76477bfd34ead8b073744d4).

### Update the app name, bundle ID, and deep link schemes

Various pieces of configuration need to be changed within the environment config files, including `APP_BUNDLE_ID`, `APP_DISPLAY_NAME`, `DEEP_LINK_URL_SCHEME`, and `APP_REGISTRY_NAME`. Make sure to also update the `APP_NAME` value in `src/config.ts`. See [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/5622c31a17ab949fed74eaba84bfa9f6edd5c787#diff-c3095d5010e65c52737a98a5d618ea24049ebe90c8470752426081d70ed6e012) for an example.

### Set up Statsig

In order to support remote configuration for certain pieces of config and feature gates within the app, you will need to set up Statsig. First, create a new Statsig project, and add the API key to the repo within the `secrets.json` file.

After the Statsig project has been created, add in any existing feature gates/dynamic config values in the Statsig dashboard that you want your app to have access to. For gates/configs that do not need to be configured remotely, but still require some sensible defaults, you can update the checked-in default values - see [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/a3af2d4fb6785ca2e22f82f1ee7173d7b30c22ad#diff-5ccd74c1f906a5214a81bafa085cbf65bd37d22cf91c7ea26433626e8315342a) for an example.

### Remove Firebase

Currently, Mobile Stack apps do not use Firbase at all, so it should be removed from the repository. There are a couple steps required here.

First, change the `FIREBASE_ENABLED` flags in the environment files to `false`, as was done [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/fe81b44064c9e25df36d38fae41eb40a747daaf2). Then, you'll need to delete all the `google-services.json.enc` files from within the `android/app/src/*` directories, as well as all the equivalent files from the `ios/` directory. You should also make sure to remove these files from the `scripts/key_placer.sh` script. We have a pre-build script that checks to ensure that a particular `GoogleServices-Info` file is present; [this will also need to be modified](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/c30f234d5277a1006c54f132710dcf1001323b94).

Since Firebase is nominally relied upon for a couple of legacy config values, you'll need to make sure that the app contains sensible defaults for these, see [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/bcb4808f5d45b77ed691953fe40ae0d0a98df543).

There are a few minor bugfixes that need to be applied as well; eventually, these will be merged upstream so they won't need to be applied to each Mobile Stack app. You [should disable](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/37e1578d629ef161508b275771a79a40c388b270) the "Firebase Disabled" banner, since it will always be disabled. There's also a [small bug](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/9c6826b4717c895495903d907b76a44e85b072a1) that requires a check to ensure that Firebase is enabled before attempting to fetch from it. Finally, [this fix](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/e1232bc24c3e819f57fb8602b11bdc6c0806c4ee) for deep links on Android will also need to be applied.

### Set up Segment & Mixpanel

Create a new Segment project, and update `SEGMENT_API_KEY` to `secrets.json`. The exact Segment setup/data pipeline will vary app-to-app, but in most cases, the Segment project will just need to pipe data from the app into Mixpanel. This requires setting up a new Mixpanel project for the Mobile Stack app.

### Attach `APP_NAME` to support requests

This will be merged upstream, but for now, we need to make sure that support requests to Zendesk contain the app name, in order to differentiate between apps. See [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/faf3dbb519e62f682e4c5b00d613419fe91c63ee).

### Update documentation to refer to new app

There are a handful of places in documentation that will need to be updated to reference the new app. Some of these changes should eventually be pulled in upstream so we won't need to repeat them per-app. See [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/85dbab0509f2b2b8a35e32c363b952c4abdb9fa2) and [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/93bfb30f61c49e393e7b18ca86460868682e5365) for places that will need changes.

### Update the auth header

Certain backend services require a special auth header, containing a signature issued by the app. The `domain` value for this signature will need to be updated to reflect the new app name. See [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/fb285b8386e12a2a8318c9df1d36b01400446db9). [This commit](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/4be46d24355018ae546e00f401a3b99fcc9b9828) will also need to be applied, but should eventually be merged upstream.

### Configure Wallet Connect

First, create a new account/projects on WalletConnect (now [reown](https://reown.com/)) for the new Mobile Stack app, and update the `WALLET_CONNECT_PROJECT_ID` values in `secrets.json` and `config.ts` (see [here](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/b3de1d52b95c37454e3a32c5755cdfc7e985a45b)). Then, update the `WALLETCONNECT_UNIVERSAL_LINK` value in `src/config.ts` and apply the changes from [this commit](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/adf2a252682b3e4f8bd77ca7d7d5faaf818fb23c).

### Configure Cloud Account Backup

Configuring Cloud Account Backup is a multi-step process, and overlaps somewhat with Android build configuration.

First, make sure the Google developer account that will be used for releases is set up. Make sure App Signing is configured, and download the signing certificate. Next, clone [this repo](https://github.com/michalbrz/sms-retriever-hash-generator), which will be used to generate app signature hashes required by CAB. Once it's cloned, you can run `ruby google_play_sign.rb --package <PACKAGE_NAME> --google-play-key <PATH_TO_SIGNING_KEY>` *for each package name you will be releasing* in order to generate the correct hash. Once you've done this for all relevant packages, update the `SMS_RETRIEVER_APP_SIGNATURE` value in the relevant `*.env` files (see [here](https://github.com/mobilestack-xyz/mobilestack-shefi/pull/5/files#diff-74d2ea44fe6a1adb583215badb22e7e37b68ad0b4aa27db10a2948ddb9e7dc2fL4)). For each of these packages, update the mapping in the CAB backend [here](https://github.com/valora-inc/cloud-account-backup/pull/287/files) as well.

Now, in the Auth0 dashboard, for both Alfajores and Mainnet update both the "Allowed Callback URLs" and "Allowed Logout URLs" for the new app. This will just involve copying existing links and prefixing them with the desired package names. Note that since we use the same Auth0 project for all Mobile Stack apps, there's
no need to update the Auth0 API key in the `secrets.json` file.

### Configure the Android build

First, you'll need to generate an *upload key* and *keystore* for bundle signing for the Google Developer account. You can follow the instructions [here](https://developer.android.com/studio/publish/app-signing#generate-key) to generate an upload key and corresponding keystore. Use `mobilestack-key-alias` as the key alias. Make sure to use the same password for both the keystore, as well as signing key contained within it. Now, take this keystore and the password used to generate it and upload them as secrets to GSM. In `.github/workflows/release-fastlane-android.yml`, point the `ANDROID_RELEASE_KEYSTORE` and `RELEASE_STORE_PASSWORD` variables [to these secrets](https://github.com/valora-inc/wallet/pull/6039/files#diff-e809cde9eab4262034e8ffa29655d03e9cb914568b876b5d6c62c0c9f07581e4R41).

Change the [root project name](https://github.com/mobilestack-xyz/mobilestack-shefi/pull/5/files#diff-9a50ef936e92a26017fd739f42ee0a0e7f80aec39dafc0a13f27b2548ee5e51fR1) in `android/settings.gradle`.

Apply [this commit](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/12347d686af6492249b3c416ef03ce1c87a5dd63#diff-e809cde9eab4262034e8ffa29655d03e9cb914568b876b5d6c62c0c9f07581e4R107) in order to have the Android build workflow upload build artifacts to GitHub instead of directly to the Google Play Developer account. Alternatively, you can configure
a service account in the GCP project associated with the Developer account and automate the upload process.

Apply [this fix](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/047464e9ee96849997a6ebb0fb465bb3f659178c) to avoid a build error.

### Configure the iOS build

Add the `APP_STORE_ID` value to the [environment files](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/d0260bd02a05a5534518cdcaedc01798efd0f310). Update the [signing team](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/ac771e605359f14e7548967d76d042732578c6dd) for iOS. Currently, Mobile Stack iOS builds are made and uploaded to the App Store from developer's local machines.

### Set up CI workflows

Some work is required to get CI functioning correctly for Mobile Stack repos. Follow the changes from [this commit](https://github.com/mobilestack-xyz/mobilestack-shefi/commit/10b37663700359b3c54f4008ae73041d2abd1563) in order to set up new test wallets and fix some issues with the Android tests. Add `GCP_MAINNET_RELEASE_AUTOMATION_SERVICE_ACCOUNT_KEY` as a Github secret available to the workflows.

## Post-Setup

### Add support for Points

If your Mobile Stack app requires support for the Points system, you'll need to enable it in the backend by allow-listing it [here](https://github.com/valora-inc/points-functions/blob/6508c6ba6b9cdfe925dff7bc4c50e9884ecef2fa/src/services/auth.ts#L5).

### Configure custom identifier resolvers

If the Mobile Stack app requires custom resolvers for identifiers, you'll need to update the supported resolvers for the app in the `resolve-id` repository, by adding to the list [here](https://github.com/valora-inc/resolve-id/pull/337/files#diff-db66f462d76a03de8f53d993fa381b0034bdbf5e74539f4abccfc636a93c2f44R36).

### Add legacy CICO support for the app

By default, legacy CICO providers are not returned from the `fetchProviders` endpoint for Mobile Stack apps, in order to not share API keys across apps. In order to add support for particular CICO providers to the app, you'll
need to generate API keys for the app per-provider, and add them to the `cloud-functions` repository; see [here](https://github.com/valora-inc/cloud-functions/pull/447/files) for more details.
