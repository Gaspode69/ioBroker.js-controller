# Windows Admin controller update test package

This branch is for testing only. It contains a patched js-controller 7.2.4 and the matching patched `@iobroker/js-controller-common-db` package. The intended test is an update from this build to the official js-controller 7.2.5 through Admin on Windows.

## Install the test build

Stop ioBroker, open an elevated terminal in the ioBroker installation directory, and install both packages together:

```powershell
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/test/windows-admin-controller-upgrade-v7.2.4-build/test-packages/dist/iobroker-js-controller-common-db-7.2.4.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/test/windows-admin-controller-upgrade-v7.2.4-build/test-packages/dist/iobroker.js-controller-7.2.4.tgz"
```

Then run the first setup and start ioBroker again:

```powershell
node node_modules/iobroker.js-controller/iobroker.js setup first
node node_modules/iobroker.js-controller/iobroker.js start
```

Open Admin, go to **Hosts**, and start the offered update to 7.2.5. The test succeeds when the controller stops, 7.2.5 installs, Admin receives the final success status, the controller starts again, and no UAC prompt appears.

## Checksums

```text
062A3D496177D66A5A7A5FE5E4496182C8D28049486540C2D1A852EFE0826B87  iobroker-js-controller-common-db-7.2.4.tgz
29BF3EC177254D5EF1FCC6325CD5D2FAD15CA28CB6786F173A66D2FFF10DA4C6  iobroker.js-controller-7.2.4.tgz
```

Source commit: `d3ed76c30`
