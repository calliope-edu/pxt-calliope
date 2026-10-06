# está Sonando

Comprueba si se reproduce sonido en alguna salida de sonido.

```sig
music.isSoundPlaying()
```

### ~ reminder

Esta función requiere el hardware Calliope mini 3. Si utilizas esta función con una placa Calliope mini 1 o 2, verás el código de error **927** en la pantalla.

### ~

El sonido se reproduce en el altavoz integrado o en la clavija de salida de audio seleccionada. Puedes comprobar si se está reproduciendo algún sonido en alguna de estas salidas.

## Devuelve

- un valor [boolean](/types/boolean) que será "cierto" si el sonido se está reproduciendo en el altavoz incorporado o en el pin de audio. En caso contrario, el valor es "falso".

## Ejemplo #example

Detiene todos los sonidos si se está reproduciendo alguno.

```blocks
if (music.isSoundPlaying()) {
    music.stopAllSounds()
}
```

## Ver también

[set built-in speaker enabled](/reference/music/set-built-in-speaker-enabled),
[set audio pin](/reference/pins/set-audio-pin)

```package
música
```