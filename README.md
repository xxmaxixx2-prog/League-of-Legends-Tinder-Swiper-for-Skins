# League of Legends Tinder Swiper for Skins

**[Web‑Version öffnen](https://xxmaxixx2-prog.github.io/League-of-Legends-Tinder-Swiper-for-Skins/)**

## Überblick

Diese Single‑Page‑Web‑App ermöglicht es dir, alle League‑of‑Legends‑Skins im „Tinder‑Swipe“‑Stil zu durchstöbern und lokal zu bewerten. Du kannst nach Champion filtern, nach Stichwort suchen, die Reihenfolge zufällig mischen und viele weitere Filter aktivieren (z. B. nur Skins aus dem neuesten Patch oder nur weibliche Champions). Likes und Dislikes werden im Browser gespeichert und gehen bei einem Neuladen der Seite nicht verloren.

Der Skin‑Katalog wird aus der Datei `data/skins.json` geladen, die mit dem Script `scripts/sync‑skins.mjs` aus Riot Games’ **Data Dragon** generiert wird. Du brauchst kein eigenes Backend und auch keinen API‑Schlüssel – alle Daten werden clientseitig geladen.

## Vorschau

![Preview](./assets/league%20tinder%20swipe%20aracde%20caitlyn%20demo%20bild%20for%20readme.PNG)

## Rechtlicher Hinweis

Dieses Projekt wurde unter Verwendung von Richtlinien von Riot Games erstellt und wird von Riot Games weder unterstützt noch in irgendeiner Weise befürwortet. **League of Legends** und **Riot Games** sind Marken oder eingetragene Marken von Riot Games, Inc.

Gemäß der [Riot Developer API Policy](https://developer.riotgames.com/docs/lol) müssen Produkte, die Spielern dienen, im Riot Developer Portal registriert werden, auch wenn sie keine offiziellen APIs verwenden. Die Policy schreibt außerdem vor, dass das Projekt einen klar sichtbaren Haftungsausschluss enthält und keine API‑Schlüssel oder andere Geheimnisse öffentlich zugänglich sind. Dieses Repository hält sich daran: Die erforderliche Boilerplate befindet sich im Footer der Seite und es werden keine geheimen Schlüssel im Code verwendet.



## Mitwirken und Anpassungen

Verbesserungen und Erweiterungen sind willkommen! Einige Ideen:

- **Globale Bewertungen:** Ein Backend‑Dienst (z. B. Supabase oder Firebase) könnte Likes/Dislikes aller Nutzer sammeln.
- **Weitere Filter:** Filter nach Skin‑Seltenheit (Legendary, Epic etc.) oder nach Erscheinungsjahr.
- **Internationalisierung:** Übersetzung der UI in weitere Sprachen.

Wenn du das Projekt modifizierst und veröffentlichst, denke daran, es in deinem Riot Developer Portal zu aktualisieren, damit die Metadaten auf dem neuesten Stand sind.
