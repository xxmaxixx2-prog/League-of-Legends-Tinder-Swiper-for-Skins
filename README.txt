Einbau:
1. index.html nach /var/www/html/lol-skin-tinder/index.html
2. js/app.js nach /var/www/html/lol-skin-tinder/js/app.js
3. scripts/sync-skins.mjs in deinen Projektordner scripts/

Danach:
node ./scripts/sync-skins.mjs

Wichtig:
- Standardmäßig blendet die Website Chromas aus.
- Der neue Haken "Chromas anzeigen" funktioniert nur für Chromas, die in der skins.json vorhanden sind.
- Das mitgelieferte Sync-Script filtert Chromas weiterhin aggressiv raus.
- Wenn du später echte Chromas per Toggle laden willst, brauchst du entweder:
  a) eine zweite skins-chromas.json
  b) oder ein Script, das alle Skins inkl. Chromas exportiert.
