# Servizio UART Bluetooth

## ~hint

![](https://cdn.makecode.com/blob/5479e652051b327fa86ef770a2e277dc72052dd2/static/bluetooth/Bluetooth_SIG.png)

Per un altro dispositivo come uno smartphone, per usare i "servizi" Bluetooth che ha la @boardname@, deve prima essere "accoppiato con la @boardname@</a>. Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

Il servizio UART Bluetooth consente ad un altro dispositivo come uno smartphone per scambiare ogni dato che vuole con la @boardname@, in piccole celle che sono intese come da unire tra loro. [UART](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter) è l'acronimo di Universal Asynchronous Receiver Transmitter ed è un modo in cui è possibile eseguire comunicazioni di dati seriali, generalmente tra due dispositivi collegati tramite una connessione fisica, cablata. Il servizio UART Bluetooth emula il comportamento di un sistema UART fisico e consente lo scambio di un massimo di 20 byte di dati per volta in entrambe le direzioni.

Quando viene usato questo servizio, la @boardname@ imposta un buffer fino a 60 byte e i dati che riceve saranno accumulati nel buffer finché è completo. Quando usi il servizio UART dal codice della tua @boardname@, puoi indicare un carattere speciale che sarà usato a significare che l'intero messaggio in al massimo tre chunk è ora stato inviato dall'altro dispositivo connesso, al punto in cui la @boardname@ rilascerà i contenuti interi dei suoi buffer ad ogni codice che prova a leggerlo. In altre parole questo carattere speciale, noto come 'delimitatore' è usato dal dispositivo connesso alla @boardname@ a significare "Ho inviato il mio messaggio intero, ora puoi utilizzarlo".

You could use the UART service for many things. It doesn't care what you put in messages which makes it very flexible. Puoi creare un gioco di indovinelli, con domande e risposte che passano tra la @boardname@ ed uno smartphone o potresti connettere una camera alla @boardname@ e trasmettere dati immagine ottenuti dal connettore bordo, in cellule sul Bluetooth ad uno smartphone. There are a great many possibilities.

Per usare il servizio UART Bluetooth da un altro dispositivo ti servirà il codice aggiuntivo della @boardname@ che legge ed usa i dati dal buffer UART e/o scrive dati al buffer per la trasmissione via Bluetooth ad un altro dispositivo.

```sig
bluetooth.startUartService();
```

## Esempio: Avvia il servizio UART Bluetooth

Il codice seguente mostra l'avvio del servizio UART Bluetooth:

```blocks
bluetooth.startUartService();
```

## Video - gioco di indovinelli del servizio UART

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Advanced

Per ulteriori informazioni avanzate sul servizio @boardname@ Bluetooth UART incluse informazioni sull'uso di uno smartphone, vedi la [documentazione tecnica Lancaster University @boardname@ runtime](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## Vedi anche

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf), [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```