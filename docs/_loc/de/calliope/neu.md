# Die richtige Vorlage für den Calliope mini wählen

Egal welche Version des Calliope mini du hast und ob du auf einem mobilen Gerät oder einem PC programmierst, du kannst immer ein **`|Neues Projekt|`** erstellen und mit dem Programmieren beginnen.

Wenn du den Calliope mini 2.x verwendest, kannst du die **`|input:Calliope mini 2.x|`** Vorlage wählen. Dadurch kann dein Calliope mini den vollen verfügbaren Arbeitsspeicher von 32KB nutzen. Die Einstellungen, die mit der Calliope mini 2.x Vorlage geladen werden, können aber auch in jedem bestehenden Projekt über das Einstellungsmenü aktiviert werden.  Die aus dieser Vorlage erstellte .HEX-Datei funktioniert dann aber auch nur auf einem **`|input:Calliope mini 2.x|`**! Möchtest du sie auch auf einem älteren Calliope mini nutzen, kannst du einfach den JavaScript Code in eine Calliope mini 1.x Vorlage kopieren und diese herunterladen.

Falls du bei der Standardvorlage (**`|functions:Calliope mini 1.x|`**-Vorlage oder **`|Neues Projekt|`**) Leistungsprobleme hast und dein Calliope mini 1.x abstürzt, könnte dies an dem verfügbaren Arbeitsspeicher liegen. Um mehr Speicherplatz für dein Programm freizugeben, kannst du in den Einstellungen die automatische Aktivierung der Bluetooth-Funktionalität deaktivieren. Bluetooth ist dann nur aktiv, während das Muster auf der LED-Matrix angezeigt wird. Um Bluetooth so zu aktivieren, kannst du jederzeit den "Klammergriff" ausführen: Halte dazu die **`Tasten A`** und **`B`** gedrückt, tippe kurz auf die **`Reset-`** Taste und halte weiterhin **`A`** und **`B`** gedrückt, bis das Muster auf der LED-Matrix erscheint. Unabhängig von der Version deines Calliope mini, muss die Bluetooth-Funktionalität immer manuell geladen werden, wenn du die Funkerweiterung in deinem Programm verwendest.

## Zusätzliche Hinweise für iOS-Benutzer:

**Wir empfehlen allen Nutzerinnen und Nutzern des Calliope mini 2.x, das Gerät einmalig beim Start mit dem Demoprogramm zu bespielen.**

Wenn du deinen Calliope mini zuvor mit einem anderen Editor programmiert oder früher einmal mit der **`|input:Calliope mini 2.x|`**-Vorlage bespielt hast, kann es passieren, dass du die Standard-Projektvorlage nicht direkt mobil überrtagen kannst. Die Bluetooth-Einstellungen haben sich in dieser Vorlage geändert, so dass einer der folgenden Schritte notwendig ist, damit dein Programm problemlos auf mobile Geräte übertragen werden kann:

### Option A: Programm 25 laden (Demoprogramm):
Führe diese Schritte aus, um das Programm mit der Nummer **`25`** auf deinen Calliope mini zu laden:
1. Drücke die Reset-Taste deines Calliope mini etwa 5 Sekunden lang, bis alle LEDs kurz aufleuchten und dann erlöschen.
2. Drücke die Taste **`A`**, um einen Schritt zurückzugehen. Dadurch wird die 25. LED auf dem Display beleuchtet.
3. Drücke gleichzeitig die Tasten  **`A`** und **`B`**, um deine Auswahl zu bestätigen und das Programm 25 zu laden. Dieser Vorgang löst auch andere Übertragungsprobleme.  Sobald abgeschlossen, wird dein Calliope mini auf seinen Werkzustand zurückgesetzt.

### Option B: Demo-Programm laden:
In der Calliope mini App navigiere zum Abschnitt **`Editoren und Programme`** und suche nach der Option **`Startprogramm`**.  Lade dieses Programm auf deinen Calliope mini und du kannst die Standard-Projektvorlage ohne Bedenken verwenden.