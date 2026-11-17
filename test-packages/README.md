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
npm install --force "https://raw.githubusercontent.com/Gaspode69/ioBroker.admin/ec327469/test-packages/dist/iobroker.admin-8.3.13.tgz" "https://raw.githubusercontent.com/Gaspode69/ioBroker.js-controller/64f729834/test-packages/dist/iobroker.js-controller-7.2.5.tgz"
iob upload admin
node node_modules\iobroker.js-controller\iobroker.js setup first
iob start
```

Der Testcontroller ist technisch Version 7.2.5. Damit bleiben Adapter mit der Anforderung `js-controller >= 7.2.5` lauffähig. Nur für die Hosts-Seite meldet er absichtlich Version 7.2.4, damit Admin das offizielle Update auf 7.2.5 anbietet.

Nach einem harten Neuladen des Browsers (Strg + F5) unter **Hosts** prüfen:

- angezeigt wird 7.2.4 installiert und 7.2.5 verfügbar;
- Admin und JavaScript laufen normal;
- der Updateknopf ist vorhanden.

Das Update über Admin starten. Es sollte die offizielle 7.2.5 installieren, die abschließende Erfolgsmeldung anzeigen und den Dienst wieder starten.

Nach dem erfolgreichen Update ist der js-controller wieder vollständig die offizielle 7.2.5. Der modifizierte Admin 8.3.13 bleibt zunächst installiert.

## Admin anschließend zurücksetzen

```bat
iob stop admin
npm install --force iobroker.admin@8.3.13
iob upload admin
iob start admin
```

## SHA-256

```text
107FD167EF035ED87985FD056FED28904E629523574386229120197DE4269A97  iobroker.js-controller-7.2.5.tgz
4FEE3DEAA9389AC4245831DE65BC878518265509B196231DA2E54CDEA937745A  iobroker.admin-8.3.13.tgz
```
