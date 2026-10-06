# set Volume

Set the volume for the sound synthesizer.

```sig
music.setVolume(128)
```

### ~indice

#### Simulateur

`||music:set volume||` works on the @boardname@. It might not work in the simulator on every browser.

### ~

## Paramètres

* `volume`: the volume of of the sounds played to the sound output. The volume [number](/types/number) can be between `0` for silent and `255` for the loudest sound.

## Exemple #example

Set the synthesizer volume to something quieter.

```blocks
music.setVolume(50)
```

## Voir Aussi

[volume](/reference/music/volume)

```package
musique
```