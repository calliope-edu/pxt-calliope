# Boolean

Ein boolescher Wert hat einen von zwei möglichen Werten: `true` (wahr) oder `false` (falsch). Boolesche (logische) Operatoren (*and*, *or*, *not*) verbinden die booleschen Werte und ergeben einen neuen booleschen Wert. Vergleichsoperatoren auf andere Typen ([Zahlen](/types/number), [Zeichenketten](/types/string)) ergeben einen booleschen Wert.

Diese Blöcke stellen die booleschen Werte `true` und `false` dar, die überall eingefügt werden können, wo ein boolescher Wert erwartet wird:

```block
let on = true;
```

Die nächsten drei Blöcke stellen die drei booleschen (logischen) Operatoren dar:

```block
let and = true && false;
let or = true || false;
let not = !true;
```

Die nächsten sechs Blöcke stellen Vergleichsoperatoren dar, die einen booleschen Wert liefern. Die meisten Vergleiche, die du machen wirst, beziehen sich auf [Zahlen](/types/number):

```block
let equality = 42 == 42;
let inequality = 42 != 42;
let lowerThan = 42 < 0;
let greaterThan = 42 > 0;
let lowerOrEqualThan =42 <= 0;
let greaterOrEqualThan = 42 >= 0;
```

Boolesche Werte und Operatoren werden oft mit einer [if](/blocks/logic/if) oder [while](/blocks/loops/while)-Anweisung verwendet, um festzustellen, welcher Code als nächstes ausgeführt wird. Zum Beispiel:

```block
let a = 5
let b = 87

if (a < b) {
    a += 1
}

while (a < b) {
    a += 1
}
```

## Funktionen, die einen booleschen Wert zurückgeben

Einige Funktionen geben einen booleschen Wert zurück, den du in einer booleschen Variablen speichern kannst. Der folgende Code erhält beispielsweise den Ein/Aus-Zustand von `point (1, 2)` und speichert diesen in der booleschen Variable `on`. Dann löscht der Code den Bildschirm, wenn `on` `true` ist:

## Boolesche Operationen

Boolesche Operatoren haben Boolesche Eingangswerte und berechnen daraus ein Boolesches Ergebnis:

## Konjunktion: `A and B`

`A and b` ergibt `true`, wenn-und-nur-wenn sowohl A als auch B true sind:

```block
let off = false && false;
let off2 = false && true;
let off3 = true && false;
let on = true && true;
```

## Disjunktion: `A or B`

`A oder B` wird als `wahr` ausgewertet, wenn `entweder A` wahr oder `B` wahr ist oder wenn sowohl `A` als auch `B` wahr sind:

```block
let off = false || false;
let on = false || true;
let on2 = true || false;
let on3 = true || true;
```

## Negation: `not A`

`not A` ergibt das Gegenteil (Negation) von A:

```block
let on = !false;
let off = !true;
```

##  #examples

## Beispiel: `AND`-Operator

In diesem Beispiel wird LED `3,3` aktiviert, wenn die beiden LEDs `1,1` und `2,2` an sind:

```blocks
if (led.point(1,1) && led.point(2,2)) {
   led.plot(3,3)
}
```

## Beispiel: Vergleiche von Zahlen und Zeichenketten

Wenn du zwei Zahlen vergleichst, erhältst du einen booleschen Wert, z. B. bei dem Vergleich `x < 5` im folgenden Code:

```blocks
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    let x = randint(0, 5)
    if(x < 5) {
    basic.showString("low");
    } else {
    basic.showString("high");
    }
})
```

Weitere Informationen zum Vergleichen von zwei Zahlen findest Du in der Dokumentation zu [Zahlen](/types/number).