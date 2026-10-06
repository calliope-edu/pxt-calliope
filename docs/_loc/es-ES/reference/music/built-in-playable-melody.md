# Melodía reproducible integrada

Obtiene un objeto sonoro reproducible para una melodía integrada.

```sig
music.builtInPlayableMelody(Melodies.Dadadadum)
```

Una colección de melodías incorporadas está disponible como objetos de sonido [playable](/types/playable) reproducibles. Eliges una seleccionando el nombre de la melodía.

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

- un objeto [reproducible](/types/playable) que contiene la melodía.

## Ejemplo

Reproduce la melodía integrada para **blues**.

```blocks
music.play(music.builtInPlayableMelody(Melodies.Blues), music.PlaybackMode.InBackground)
```

## Ver también

[string playable](/reference/music/string-playable)