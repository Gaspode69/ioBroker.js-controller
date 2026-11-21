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
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.admin/8caa1b1b/test-packages/dist/iobroker.admin-8.3.13.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/54890977c/test-packages/dist/iobroker.js-controller-7.2.5.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/54890977c/test-packages/dist/iobroker-js-controller-common-db-7.2.5.tgz"
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

Das Update über Admin starten. Es sollte die offizielle 7.2.5 installieren, die vollständige abschließende Ausgabe mit Erfolgsmeldung anzeigen und den Dienst wieder starten. Vorübergehende Verbindungsfehler während des Neustarts dürfen weder kurzzeitig noch dauerhaft als roter Fehler erscheinen; sobald der Host wieder die Zielversion meldet, muss der Dialog den erfolgreichen Abschluss anzeigen.

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
69DDC7F89C6ACEE03278DD5674269693891344376E74F49CFFAA0E0BF23B6E1A  iobroker.js-controller-7.2.5.tgz
B98A8C08415914ADFAABC06609D1D74BAF353957C5E604D5F7BE65F30FCDBB3A  iobroker-js-controller-common-db-7.2.5.tgz
47708A3FFADC5758DEDF66FC40EE42588E8F078C3DF2A9BB22BF533E2BC62CF7  iobroker.admin-8.3.13.tgz
```
