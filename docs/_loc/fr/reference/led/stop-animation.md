# Arrêter l'animation

Arrêtez l’animation en cours de lecture et toutes les animations en attente de lecture.

```sig
led.stopAnimation()
```

## Exemple

This program sets up the `stop animation` part of the program, and then shows a string that you can stop with button `B`.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    led.stopAnimation();
});
basic.showString("STOP ME! STOP ME! PLEASE, WON'T SOMEBODY STOP ME?");
```

## ~indice

It's important to set up `stop animation` before showing the animation, so the `stop animation` part of the program will be ready to go.

## ~

## Voir Aussi

[affichages LED](/reference/basic/show-leds), [afficher l'icône](/reference/basic/show-icon), [traçage LED](/reference/led/plot)>