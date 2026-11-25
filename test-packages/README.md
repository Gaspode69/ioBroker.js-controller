# Windows-Test des aktuellen PR #3637

Dieser Build basiert vollständig auf dem freigegebenen PR-Commit
`57db46b3272505fba0a0f7aeaf17d15d18493d91`, einschließlich Bluefox' Master-Merge und Changelog.
Alle zwölf Runtime-Pakete tragen `8.0.0-alpha.26-20261124-26d6e1bcd`.
Die Upgrade-Implementierung ist unverändert. Einzige Änderung am Controller-Quellcode:
Die Host-Anzeige meldet für diesen Test `8.0.0-alpha.25-20261124-86bf1182d`, damit Admin das
Update auf die offizielle alpha.26 anbietet. Die Paketversionen werden nicht abgesenkt.

Nur auf der entbehrlichen Windows-Testinstallation ausführen. Voraussetzung: Node.js >= 22.22.2
(empfohlen die vorhandene Node.js 24), WinSW-Hauptdienst als LocalSystem und funktionierender Admin.
Das zusätzliche Admin-Testpaket 8.3.13 mit dediziertem Status-Endpunkt und automatischem Scrollen
wird vom Installationsskript ebenfalls installiert.

## Separaten Testordner vorbereiten

In einer normalen CMD, außerhalb der ioBroker-Installation:

```bat
mkdir C:\ioBroker-Tests
cd /d C:\ioBroker-Tests
git clone --branch test/windows-admin-controller-upgrade-current https://github.com/Gaspode69/ioBroker.js-controller.git controller-pr3637
```

## Pakete installieren

Die zur Testinstallation gehörende **ioBroker Command line** aus dem Startmenü öffnen
(Administratorrechte, aktuelles Verzeichnis ist das Root dieser ioBroker-Instanz).
Das Skript über seinen vollständigen Pfad aufrufen:

```bat
C:\ioBroker-Tests\controller-pr3637\test-packages\install.bat
```

Das Skript prüft die SHA-256-Prüfsummen aller zwölf Archive, stoppt ioBroker, installiert die
zusammenpassenden Pakete und den Test-Admin, lädt Admin hoch, führt `setup first` aus und startet ioBroker.
Es richtet kein Repository ein und führt noch kein UI-Upgrade aus.

## Festes Updateziel anbieten

Das beiliegende Repository enthält ausschließlich den Controller mit dem festen offiziellen Updateziel
alpha.26. Es dient anstelle eines wechselnden Alpha-Repositories für diesen einen Test.
In derselben ioBroker Command line:

```bat
iob repo add pr3637-test C:\ioBroker-Tests\controller-pr3637\test-packages\upgrade-target.json
iob repo set pr3637-test
iob update
iob repo
```

Bei einem wiederholten Test mit bereits vorhandenem Eintrag `repo add` auslassen.
Browser mit Strg+F5 neu laden. Unter **Hosts** müssen alpha.25 installiert und alpha.26 verfügbar sein.
Vor dem Update muss Admin normal funktionieren. Nicht versehentlich das stabile Updateziel 7.2.5 verwenden.

## Verwaisten Helper testen und UI-Update starten

In der ioBroker Command line:

```bat
for /f "delims=" %H in ('node -e "const tools=require('@iobroker/js-controller-common').tools; process.stdout.write('iob_controller_upgrade_' + tools.getHostName().replace(/[^a-zA-Z0-9_.-]/g, '_'))"') do set "IOB_UPGRADE_HELPER=%H"
sc.exe create "%IOB_UPGRADE_HELPER%" binPath= "%SystemRoot%\System32\cmd.exe /c exit 0" start= demand
sc.exe query "%IOB_UPGRADE_HELPER%"
```

Falls der Helper bereits existiert, den vorhandenen Dienst verwenden.
Anschließend das Update auf alpha.26 **über die Hosts-Seite in Admin** starten.

Erwartet werden vollständige npm-Ausgabe, sichtbare abschließende Erfolgsmeldung und Neustart des
Hauptdienstes. Eine von Admin nachträglich rekonstruierte Erfolgsmeldung ohne vollständige npm-Ausgabe
reicht nicht als Erfolg. Im Controller-Log sollte `Final information delivered` den verwendeten
Endpunkt `/controller-upgrade-status` nennen.

Danach prüfen:

```bat
iob version
node -p "require('./node_modules/iobroker.js-controller/package.json').version"
iob status
sc.exe query "%IOB_UPGRADE_HELPER%"
```

Die aus `package.json` gelesene Paketversion muss alpha.26 melden. Die Anzeige von `iob version`
und der Hosts-Seite kann bei Alpha-Paketen der Version aus `io-package.json` entsprechen (hier 8.0.0).
Die künstliche Host-Anzeige alpha.25 muss verschwunden sein, da das offizielle Controller-Paket die
Testanpassung ersetzt hat. Beim Helper wird Fehler **1060** erwartet, weil er entfernt wurde.
Admin und einige Adapter prüfen.

## Nach dem Test

Das Controller-Update ersetzt nur das Controller-Paket. Weitere lokal gebaute Pakete und der
Test-Admin bleiben zunächst installiert. Das Test-Repository anschließend deaktivieren und entfernen:

```bat
iob repo unset pr3637-test
iob repo del pr3637-test
iob repo
```

Die zuvor verwendeten Repositories wieder aktivieren. Bei der entbehrlichen Testinstallation ist eine
Neuinstallation der einfachste vollständige Rückweg. Kein In-place-Downgrade auf Controller 7 voraussetzen.

## Build und Prüfung

Die Pakete wurden aus diesem Checkout gebaut. `build.mjs` kopiert die Build-Ausgaben in einen temporären
Paketordner und ersetzt interne `file:`-Abhängigkeiten durch die exakte gemeinsame Version.
`dist/manifest.json` dokumentiert Quellcommit, Version, Archivnamen und SHA-256-Prüfsummen.

```bat
npm ci --ignore-scripts
npm run build
npm run test-controller
node test-packages\build.mjs
```

Der vollständige interaktive Windows-Test muss mit diesen Paketen noch durchgeführt werden.
