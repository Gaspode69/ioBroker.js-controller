# Windows-Test: js-controller-Update über Admin

> **Achtung:** Ausschließlich auf einem entbehrlichen Testsystem ausführen. Fehler und Datenverlust können nicht ausgeschlossen werden.

## Ausgangsbasis

- aktuelle Beta-Installation von js-controller, Admin und allen installierten Adaptern
- insbesondere Admin muss unter js-controller 7.2.5 normal laufen
- empfohlen: vorher ein vollständiges ioBroker-Backup erstellen

## Testpakete installieren

Im Windows-Startmenü das **ioBroker Cmd Window** als Administrator öffnen und ausführen:

```bat
iob stop
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.admin/8caa1b1b/test-packages/dist/iobroker.admin-8.3.13.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/8993d4ba3/test-packages/dist/iobroker.js-controller-7.2.5.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/8993d4ba3/test-packages/dist/iobroker-js-controller-common-db-7.2.5.tgz"
iob upload admin
node node_modules\iobroker.js-controller\iobroker.js setup first
iob start
```

Der Testcontroller ist technisch Version 7.2.5. Damit bleiben Adapter mit der Anforderung `js-controller >= 7.2.5` lauffähig. Nur für die Hosts-Seite meldet das Controller-Testpaket selbst absichtlich Version 7.2.4, damit Admin das offizielle Update auf 7.2.5 anbietet. Beim Update wird dieses Testpaket vollständig durch den offiziellen Controller ersetzt. Das zusätzlich installierte Common-DB-Featurepaket enthält keine Versionsmanipulation und meldet danach die echte Controller-Version 7.2.5.

Unter Windows wird das Update nur angeboten, wenn der ioBroker-Hauptdienst als WinSW-Dienst unter LocalSystem läuft. Bei Installationen mit dem offiziellen Windows-Installer sollte diese passende Standardkonfiguration vorhanden sein.

Nach einem harten Neuladen des Browsers (Strg + F5) unter **Hosts** prüfen:

- angezeigt wird 7.2.4 installiert und 7.2.5 verfügbar;
- Admin und JavaScript laufen normal;
- der Updateknopf ist vorhanden.

## Verwaisten Helper-Dienst vorbereiten

Mit den folgenden Befehlen im selben **ioBroker Cmd Window** einen gestoppten Testdienst mit der Kennung des Upgrade-Helpers anlegen:

```bat
for /f "delims=" %H in ('node -e "const tools=require('@iobroker/js-controller-common').tools; process.stdout.write('iob_controller_upgrade_' + tools.getHostName().replace(/[^a-zA-Z0-9_.-]/g, '_'))"') do set "IOB_UPGRADE_HELPER=%H"
sc.exe create "%IOB_UPGRADE_HELPER%" binPath= "%SystemRoot%\System32\cmd.exe /c exit 0" start= demand
sc.exe query "%IOB_UPGRADE_HELPER%"
```

Falls `sc.exe create` meldet, dass der Dienst bereits existiert, kann mit dem vorhandenen Dienst weitergetestet werden. `sc.exe query` muss den Dienst vor dem Update finden. Das Controller-Update soll diesen verwaisten Dienst selbstständig entfernen und anschließend seinen neuen Helper normal installieren können.

Das Update über Admin starten. Es sollte die offizielle 7.2.5 installieren, die vollständige abschließende Ausgabe mit Erfolgsmeldung anzeigen und den Dienst wieder starten. Die Erfolgsmeldung am Ende der Ausgabe muss dabei ohne manuelles Nachscrollen sichtbar sein. Vorübergehende Verbindungsfehler während des Neustarts dürfen weder kurzzeitig noch dauerhaft als roter Fehler erscheinen; sobald der Host wieder die Zielversion meldet, muss der Dialog den erfolgreichen Abschluss anzeigen.

Zwischen `Server is running` und der abschließenden Erfolgsmeldung müssen die npm-Ausgaben des Updates sichtbar sein. Nur die Start- und Stop-Meldungen mit einer anschließend vom Admin rekonstruierten Erfolgsmeldung gelten nicht als vollständiger Erfolg dieses Tests.

Danach im weiterhin geöffneten **ioBroker Cmd Window** prüfen:

```bat
sc.exe query "%IOB_UPGRADE_HELPER%"
```

Erwartet wird `OpenService FAILED 1060`, weil auch der während des Updates verwendete Helper nach erfolgreichem Abschluss wieder entfernt wurde.

Nach dem erfolgreichen Update ist das js-controller-Paket wieder die offizielle 7.2.5. Der modifizierte Admin 8.3.13 und das Common-DB-Featurepaket bleiben zunächst installiert.

## Admin anschließend zurücksetzen

```bat
iob stop admin
npm install --force iobroker.admin@8.3.13 @iobroker/js-controller-common-db@7.2.5
iob upload admin
iob start admin
```

## SHA-256

```text
EE8ECE928DD11035E618C033C4446209CEAA77576A276EF263FE4581D5786160  iobroker.js-controller-7.2.5.tgz
B98A8C08415914ADFAABC06609D1D74BAF353957C5E604D5F7BE65F30FCDBB3A  iobroker-js-controller-common-db-7.2.5.tgz
47708A3FFADC5758DEDF66FC40EE42588E8F078C3DF2A9BB22BF533E2BC62CF7  iobroker.admin-8.3.13.tgz
```
