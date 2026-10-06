# Bluetooth UART Service

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Um einen der Bluetooth-"Dienste" des @boardname@ mit einem anderen Gerät wie einem Smartphone zu nutzen, muss es zunächst [mit dem @boardname@ gekoppelt werden](/reference/bluetooth/bluetooth-pairing). Nach dem Koppeln kann das andere Gerät eine Verbindung zum @boardname@ herstellen und Daten über viele der @boardname@-Funktionen austauschen.

## ~

Der Bluetooth UART-Dienst ermöglicht es einem anderen Gerät, z. B. einem Smartphone, beliebige Daten mit dem @boardname@ in kleinen Blöcken die dann wieder verbunden werden sollen, auszutauschen. UART[(https://en. wikipedia. rg/wiki/Universal_asynchronous_receiver/transmitter) steht für Universal Asynchronous Receiver Transmitter und ist eine Möglichkeit zur seriellen Datenkommunikation üblicherweise zwischen zwei Geräten, die über eine physikalische, kabelgebundene Verbindung verbunden sind. Der Bluetooth-UART-Dienst emuliert das Verhalten eines physikalischen UART-Systems und ermöglicht den Austausch von maximal 20 Bytes Daten in beide Richtungen.

Wenn dieser Dienst verwendet setzt der @boardname@ einen 60 Byte-Puffer und die empfangenen Daten werden im Puffer gesammelt, bis er voll ist. Wenn du den UART-Dienst von deinem @boardname@ programmierst, kannst du ein Sonderzeichen angeben, das kennzeichnet, dass die gesamte Nachricht aus maximal drei Chunks von dem verbundenen Gerät an der anderen Seite gesendet wurde. An diesem Punkt gibt der @boardname@ den gesamten Inhalt seines Puffers an jeden Code frei, der versucht, ihn zu lesen. Mit anderen Worten dieses Sonderzeichen, bekannt als "Trennzeichen" (delimiter) wird von dem Gerät verwendet, das mit dem @boardname@ verbunden ist, um zu kennzeichnen: "Ich habe meine ganze Nachricht gesendet, Sie können sie jetzt verwenden".

Du kannst den UART-Dienst für viele Dinge nutzen. Es ist egal, was du für Nachrichten schickst, was es sehr flexibel macht. Du kannst ein Ratespiel erstellen mit Fragen und Antworten, die zwischen @boardname@ und einem Smartphone weitergeleitet werden, oder du kannst eine Kamera mit dem @boardname@ verbinden und Bilddaten aus den Pins in Chunks über Bluetooth auf ein Smartphone übermitteln. Es gibt sehr viele Möglichkeiten.

Um den Bluetooth-UART-Dienst von einem anderen Gerät aus nutzen zu können, benötigst du zusätzlichen @boardname@ Code, der Daten aus dem UART-Puffer liest und / oder Daten in den Puffer für die Übertragung über Bluetooth auf ein anderes Gerät schreibt.

```sig
bluetooth.startUartService();
```

## Beispiel: Starten des Bluetooth-UART-Dienstes

Der folgende Code zeigt den Start des Bluetooth-UART-Dienstes:

```blocks
bluetooth.startUartService();
```

## Video - UART Service Ratespiel

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Fortgeschritten

Weiterführende Informationen zum @boardname@ Bluetooth UART-Dienst, einschließlich Informationen zur Verwendung eines Smartphones, findet man in der [@boardname@ technischen Dokumentation der Universität Lancaster](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Siehe auch

[Über Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth-Profilübersicht ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth-Profil-Referenz](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth auf @boardname@ Ressourcen](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
Bluetooth
```