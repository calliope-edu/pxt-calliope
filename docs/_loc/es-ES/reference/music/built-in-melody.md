# Melodía integrada

Obtiene una cadena melódica para una melodía integrada.

```sig
music.builtInMelody(Melodies.Dadadadum)
```

Dispone de una colección de melodías integradas. Eliges una seleccionando el nombre de la melodía.

## Parámetros

- **melodía**: Un nombre para la melodía. Las melodías disponibles son:

> * `dadadum`
> * `entertainer`
> * `prelude`
> * `ode`
> * `nyan`
> * `ringtone`
> * `funk`
> * `blues`
> * `birthday`
> * `wedding`
> * `funeral`
> * `punchline`
> * `baddy`
> * `chase`
> * `ba ding`
> * `wawawawaa`
> * `jump up`
> * `jump down`
> * `power up`
> * `power down`

## Devuelve

- una [cadena](/types/string) que contiene la melodía.

## Ejemplo

Reproduce la melodía integrada para **blues**.

```blocks
music.startMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once)
```

## Ver también

[comienza melodía](/reference/music/start-melody),
[efecto de sonido integradot](/reference/music/builtin-sound-effect)