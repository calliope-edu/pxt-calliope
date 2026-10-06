# Problembehebung: Herunterladen mit WebUSB

### ~ avatar

Hast du Probleme, deinen @boardname@ mit [WebUSB](/device/usb/webusb) zu verbinden? Lass uns versuchen herauszufinden warum!

### ~

## Schritt 1: Überprüfe das Kabel

Stelle sicher, dass dein @boardname@ mit einem Mikro-USB-Kabel mit deinem Computer verbunden ist. Im Windows Explorer oder Finder sollte zum Beispiel ein **MINI**-Laufwerk erscheinen, wenn dieser angeschlossen ist.

![MINI-Laufwerk](https://cdn.makecode.com/blob/dfb9c38f2909703273e29f02cdf2518bb3acdcd5/static/mb/device/windows-MINI-drive.gif)

**Wenn du das MINI-Laufwerk sehen kannst, gehe zu Schritt 2**.

Wenn du das Laufwerk nicht sehen kannst:

* Stelle sicher, dass das USB-Kabel funktioniert.
> Funktioniert das Kabel an einem anderen Computer? Wenn nicht, suche ein anderes Kabel, das du verwenden kannst. Einige Kabel können nur eine Stromverbindung bereitstellen und nicht wirklich Daten übertragen.
* Teste einen anderen USB-Anschluss an deinem Computer.

Ist das Kabel gut, aber du kannst das **MINI** Laufwerk trotzdem nicht sehen? Hmm, du könntest ein Problem mit deinem @boardname@ haben. Versuche dann die zusätzlichen Schritte, die auf der [FAQ](https://calliope.cc/faq) Seite unter calliope.cc beschrieben sind.

## Schritt 2: Überprüfe die Firmware-Version

Wenn deine Downloads immer noch nicht funktionieren ist es möglich, dass die Firmware-Version auf deinem @boardname@ ein Update benötigt. Überprüfe folgendes:

### 1. Gehe zum MINI-Laufwerk

Navigieren zum **MINI** Laufwerk im Dateimanager des Computers.

### 2. Öffne die Datei DETAILS.TXT

Suche nach der **DETAILS.TXT** Datei und öffne sie.

![](https://cdn.makecode.com/blob/a6a4bfeb1ab43ef8c534c15a4debf9107546e78b/static/mb/device/mini-drive-contents.gif)

### 3. Finde die Firmware-Versionsnummer heraus

Suche nach einer Zeile in der Datei, welche die Versionsnummer angibt. It should say **Version**:

![USB-Firmware-Versionsnummer in DETAILS.TXT](https://cdn.makecode.com/blob/4a759afef8f8218a3607b4a29b3a9d4ce02cbfd4/static/mb/device/details-txt.jpg)

oder **Interface Version**:

![Interface-Versionsnummer in DETAILS.TXT](https://cdn.makecode.com/blob/f348be3cf2ab627f7fdba86da2576e076c04638c/static/mb/device/details-258.gif)

Wenn die Version **0234**, **0241** oder **0243** ist, **musst** du die [USB-Firmware](/device/firmware) auf deinem @boardname@ aktualisieren. Gehe zu **Schritt 3** und folgen den Upgrade-Anweisungen.

Wenn die Version **0249**, **0250** oder höher ist, hast **du die richtige USB-Firmware**. Gehe zu Schritt **4**.

## Schritt 3: Aktualisieren der Firmware

### 1. Versetze deinen @boardname@ in den **MAINTENANCE Modus**

Um dies zu tun, trenne das USB-Kabel von dem @boardname@ und schließe das USB-Kabel wieder an, während du die Reset-Taste gedrückt hälst. Sobald du das USB-Kabel eingesteckt hast, kannst du die Reset-Taste loslassen. Du solltest nun ein **MAINTENANCE** Laufwerk anstelle des **MINI** Laufwerks sehen. Außerdem bleibt die gelbe LED-Lampe eingeschaltet.

![Wartungs-Geste](https://cdn.makecode.com/blob/1d6dcc8f366b20c97d6afb0798ab1f56d994a58a/static/mb/device/maintenance.gif)

### 2. Die USB-Firmware .Hex Datei herunterladen

Lade die USB-Firmware unter https://calliope.cc/faq/#usbfirmware herunter.

### 3. Übertragung auf das Laufwerk MAINTENANCE

Ziehe die Datei auf das `MAINTENANCE` Laufwerk.

### 4. Beachte die blinkende LED

Die gelbe LED blinkt während die `HEX` Datei kopiert wird. Wenn die Kopie beendet ist, wird die LED ausgeschaltet und der @boardname@ zurückgesetzt. Das **MAINTENANCE** Laufwerk wechselt nun zu **MINI**.

### 5. Aktualisierung abgeschlossen

Das Upgrade ist abgeschlossen! Du kannst die **DETAILS.TXT Datei öffnen,** um zu überprüfen und zu sehen, dass die Firmware-Version auf die Version der `HEX` Datei geändert wurde, die du kopiert hast.

### ~hint

#### USB-Firmware-Anleitung

Wenn du mehr über das Verbinden des Boards, den MAINTENANCE Modus, und wie man die die USB-Firmware aktualisiert, findest du mehr in der [USB-Firmware-Anleitung](https://microbit.org/guide/firmware/).

### ~

## Schritt 4: Prüfe die Browser-Version

WebUSB ist eine ziemlich neue Funktion und kann verlangen, dass du deinen Browser aktualisierst. Überprüfe ob deine Browser-Version zu einer dieser Versionen passt.

Chrome 65+ (oder ein entsprechender chromebasierter Browser) für Android, Chrome OS, Linux, macOS und Windows 10:

| Browser | Version           |
| ------- | ----------------- |
| Chrome  | 61+               |
| Edge    | 79+               |
| Safari  | Nicht unterstützt |

<br/>
Für andere Browser schaue dir die unterstützten Versionen in der **[Kann ich verwenden?](https://caniuse.com/?search=webusb)** Tabelle für WebUSB an.

## Schritt 5: Gerät verbinden

Sobald du die Firmware aktualisiert hast, öffne den **Chrome Browser**, gehe zum Editor und klicken im Zahnrad-Menü auf **Gerät koppeln**. Siehe [WebUSB](/device/usb/webusb) für eine Anleitung zum Verbinden.

Viel Spaß mit schnellen Downloads!