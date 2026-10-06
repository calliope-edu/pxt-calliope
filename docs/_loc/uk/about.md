![](https://cdn.makecode.com/blob/413359adf5b1487dc4e538c190f8bcc5f0510e12/static/mb/device/calliope_website.jpg)

# Про платформу

## @description редактор коду A Blocks/Javascript для Calliope mini, кишенькового комп'ютера з дисплеєм 5x5, датчиками та Bluetooth.

[Calliope mini](https://calliope.cc) це [кишеньковий комп'ютер]([/device](https://calliope.cc/en/calliope-mini/tech-facts)) з відображенням 25 світлодіодів, Bluetooth і датчиками, які можуть бути запрограмовані будь-ким.

Calliope mini пропонує легкий і веселий вступ до програмування та творчості, вмикайте і програмуйте щось просто та з задоволенням, беріть з собою та налаштовуйте. Подібно до Arduino, Calliope mini може підключатися та взаємодіяти з датчиками, дисплеями та іншими пристроями.

* [Документація](/docs)

## [Обладнання: пристрій](/device)

Calliope mini укомплектований датчиками, радіо та іншими корисностями. Дізнайся про [апаратні компоненти]([/device](https://calliope.cc/en/calliope-mini/tech-facts)) Calliope mini, щоб використовувати його на максимум!

## ~ порада

** Бажаєте купити Calliope mini? ** Дивіться [список реселерів](https://calliope.cc/en/shops).

## ~

## Програмування: [Blocks](/blocks) або [JavaScript](/javascript)

Ви можете запрограмувати Calliope mini за допомогою [Blocks](/blocks) або [JavaScript](/javascript) у вашому веб-браузері через [Calliope mini APIs](/reference):

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hi!");
})
```

```typescript
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hi!");
})
```

Редактор підтримується [більшістю сучасних браузерів](/browsers), працює [офлайн](/offline) після завантаження та не потребує встановлення.

## [Скомпілювати і прошити: Ваша програма!](/device/usb)

Коли ваш код готовий, ви підключаєте Calliope mini до комп'ютера за допомогою USB-кабелю, щоб він відображався як змонтований накопичувач (з назвою MINI). If you are using the Calliope mini REV2 you also see another drive (FLASH).

Компіляція в ARM thumb машинний код з [Blocks](/blocks) або [JavaScript](/javascript) відбувається в браузері. You save the ARM binary program to a file, which you then copy to the Calliope mini drive, which flashes the Calliope mini device with the new program.

## Симулятор: перевірте свій код

You can run your code using the Calliope mini simulator, all within the confines of a web browser. Симулятор має підтримку світлодіодного екрану, кнопок, компасу, акселерометра і цифрових контактів введення/виведення.

```sim
basic.forever(() => {
  basic.showString("Hi!");
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    led.stopAnimation();
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
# . . . #
. # # # .`);
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    led.stopAnimation();
    basic.showLeds(`
. # . # .
# . # . #
# . . . #
. # . # .
. . # . .`);
});
```

## Навчайтеся!

We have tons of [projects](/projects) and [examples](/examples) to get your started!

## C++ Runtime

The [C++ Calliope mini runtime](http://lancaster-university.github.io/microbit-docs/), created at [Lancaster University](http://www.lancaster.ac.uk/), provides access to the hardware functions of the Calliope mini, as well as a set of helper functions (such as displaying a number/image/string on the LED screen).

The [Calliope mini library](/reference) mirrors the functions of the C++ library. When code is compiled to ARM machine code, the calls to JavaScript Calliope mini functions are replaced with calls to the corresponding C++ functions.

## [Інструменти командного рядка](/cli)

Бажаєте використовувати @homeurl@ у вашому улюбленому редакторі? Встановіть [інструмент для командного рядка](/cli) і користуйтеся!

## [Розширення](/extensions)

Створюйте, редагуйте та поширюйте ваші власні блоки та JavaScript за допомогою [розширень](/extensions). Розширення розміщуються на GitHub і можуть бути написані за допомогою C++, JavaScript та/ або ARM thumb.

## [Відкритий програмний код](/open-source)

Код для Calliope mini є [відкритим програмним кодом](/open-source) на GitHub. Запрошуємо учасників!

```package
фанк
```