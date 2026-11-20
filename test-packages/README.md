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
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.admin/3a25922c/test-packages/dist/iobroker.admin-8.3.13.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/c5d04b639/test-packages/dist/iobroker.js-controller-7.2.5.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/c5d04b639/test-packages/dist/iobroker-js-controller-common-db-7.2.5.tgz"
iob upload admin
node node_modules\iobroker.js-controller\iobroker.js setup first
iob start
```

Der Testcontroller ist technisch Version 7.2.5. Damit bleiben Adapter mit der Anforderung `js-controller >= 7.2.5` lauffähig. Nur für die Hosts-Seite meldet das Controller-Testpaket selbst absichtlich Version 7.2.4, damit Admin das offizielle Update auf 7.2.5 anbietet. Beim Update wird dieses Testpaket vollständig durch den offiziellen Controller ersetzt. Das zusätzlich installierte Common-DB-Featurepaket enthält keine Versionsmanipulation und meldet danach die echte Controller-Version 7.2.5.

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
E3C7A67EDC8FBD785FF19AA4BDBEF4624E87F4FD3C3B200A61C948318A33A2F5  iobroker.js-controller-7.2.5.tgz
ABE96EDEC305C223669A07EC88ADD7B95208E2EC0EF0AE355BA51958106C5BEB  iobroker-js-controller-common-db-7.2.5.tgz
AF60A4FD49DF4132DFFE59A56F681C2EF0F86AFB71909778F4995EA4B3F587DD  iobroker.admin-8.3.13.tgz
```
