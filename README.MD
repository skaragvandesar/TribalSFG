# Castle Day

Browserspiel aus drei Dateien: `index.html`, `style.css`, `game.js`.

## Auf GitHub Pages veröffentlichen
1. Alle drei Dateien in dasselbe Verzeichnis des Repositories hochladen (`index.html` im Hauptverzeichnis).
2. *Settings → Pages*: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Nach ein bis zwei Minuten läuft das Spiel unter `https://DEINNAME.github.io/REPO/`.

## Spielstand sichern
Im Spiel unter *Mehr → Spielstand sichern* als Datei speichern oder als Text kopieren. Einspielen funktioniert per Datei oder Text.
Der Spielstand liegt nur im Browser (localStorage) und ist an die Adresse der Seite gebunden. Vor jedem Update bitte sichern.

## Updates mit neuen Funktionen
- Neue Felder bekommen ihren Standardwert in `fresh()` (game.js). Beim Einspielen eines älteren Spielstands werden fehlende Felder automatisch ergänzt.
- Nur wenn bestehende Daten umgebaut werden, `SAVE_V` erhöhen und in `migrate()` einen Schritt `if(v<N){...}` ergänzen.
- Spielstände aus einer neueren Version werden abgelehnt, damit nichts verloren geht.
- Vor dem ersten Laden nach einem Versionswechsel legt das Spiel automatisch eine Kopie im Browser an, vor jedem Einspielen ebenfalls.
