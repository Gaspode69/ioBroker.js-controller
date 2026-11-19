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
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.admin/f00f9c00/test-packages/dist/iobroker.admin-8.3.13.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/02a22b483/test-packages/dist/iobroker.js-controller-7.2.5.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/02a22b483/test-packages/dist/iobroker-js-controller-common-db-7.2.5.tgz"
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
2F9C3198AA2995E9EBAD6A20E286EA09D38B1B2DBE9FED0E80C2710A4A5D7244  iobroker.js-controller-7.2.5.tgz
ABE96EDEC305C223669A07EC88ADD7B95208E2EC0EF0AE355BA51958106C5BEB  iobroker-js-controller-common-db-7.2.5.tgz
CC584FA17203F543C28F9E6D42CBEF602D3A1F66F62E422E7866866B7A910DBD  iobroker.admin-8.3.13.tgz
```
