# volume

Ottieni il livello di volume corrente del sintetizzatore audio.

```sig
music.volume()
```

### ~hint

#### Simulatore

Usare `||music:volume||` funziona sul @boardname@. It might not work in the simulator on every browser.

### ~

## Returns

* un [numero](/types/number) che è l'attuale livello di volume di uscita dal sintetizzatore audio. Il valore può essere compreso tra `0` per silenzioso e `255` per il suono più forte.

## Vedi anche

[set volume](/reference/music/set-volume)

```package
musica
```