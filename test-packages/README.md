# VERALTET – nicht mit der aktuellen Beta verwenden

Admin und JavaScript aus dem aktuellen Beta-Repository verlangen `js-controller >= 7.2.5`. Dieses ältere 7.2.4-Testpaket ist damit nicht kompatibel und darf für den aktuellen Test nicht mehr verwendet werden.

Aktuelle Anleitung und kompatibles Testpaket:

https://github.com/Gaspode69/ioBroker.js-controller/tree/test/windows-admin-controller-upgrade-v7.2.5-build/test-packages

# Windows Admin controller update test package

This branch is for testing only. It contains a patched js-controller 7.2.4 with the matching patched `@iobroker/js-controller-common-db` bundled inside it. The intended test is an update from this build to the official js-controller 7.2.5 through Admin on Windows.

## Install the test build

Stop ioBroker, open an elevated terminal in the ioBroker installation directory, and install both packages together:

```powershell
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/bb72f540f/test-packages/dist/iobroker.js-controller-7.2.4.tgz"
```

Then run the first setup and start ioBroker again:

```powershell
node node_modules/iobroker.js-controller/iobroker.js setup first
node node_modules/iobroker.js-controller/iobroker.js start
```

Open Admin, go to **Hosts**, and start the offered update to 7.2.5. The test succeeds when the controller stops, 7.2.5 installs, Admin receives the final success status, the controller starts again, and no UAC prompt appears.

## Checksums

```text
52084C2A338C6F41E879B1380FEAA6DA43F52719FE588E26527FD27E67BF5613  iobroker.js-controller-7.2.4.tgz
```

Source commit: `d3ed76c30`
