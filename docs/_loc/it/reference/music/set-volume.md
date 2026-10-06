# set Volume

Set the volume for the sound synthesizer.

```sig
music.setVolume(128)
```

### ~hint

#### Simulatore

`||music:set volume||` works on the @boardname@. It might not work in the simulator on every browser.

### ~

## Parametri

* `volume`: the volume of of the sounds played to the sound output. The volume [number](/types/number) can be between `0` for silent and `255` for the loudest sound.

## Example #example

Set the synthesizer volume to something quieter.

```blocks
music.setVolume(50)
```

## Vedi anche

[volume](/reference/music/volume)

```package
musica
```