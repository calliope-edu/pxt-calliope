# Appareil

### ~ indice

#### Vous cherchez à acheter un micro:bit?

See the [list of official products](https://microbit.org/buy/).

### ~

Tous les éléments qui composent le micro:bit de la BBC

![micro:bit board layout](https://makecode.com/not-found/HEAD/static/mb/device-v2.jpg)

### ~ indice

#### La version actuelle de micro:bit est V2

The version of @boardname@ is now currently at **v2**. See the what's new in MakeCode for programming the [@boardname@ v2](/device/v2).

### ~

## Écran LED et LED d'état

The red lights are [LEDs](/device/screen) (light emitting diodes) and form a 5 x 5 LED Screen.
They can be set to on/off and the brightness can be controlled.

The yellow light on the back of the micro:bit is the status LED.
It flashes yellow when the system wants to tell the user that something has happened.

Découvrez comment le @boardname@ affiche des chiffres, du texte et des images en regardant cette vidéo sur les LED:

https://www.youtube.com/watch?v=qqBmvHD5bCw

## Buttons

Buttons **A** and **B** are a form of input.  Lorsque vous appuyez sur un bouton, cela complète un circuit électrique.
Le micro:bit peut détecter l'appui/le relâchement de l'un de ses deux boutons et être programmé pour réagir en conséquence.

Button **R** on the back of the micro:bit is a system button. Il a différentes utilisations.
When you have downloaded and run your code onto your micro:bit, press Button **R** to restart and run your program from the beginning.

Find out how buttons provide input to the @boardname@ in this video:

https://www.youtube.com/watch?v=t_Qujjd_38o

## Touch

Pins **0**, **1**, **2**, and the board **logo** can work as touch buttons when they are programmed for input.

## USB connection

When you plug in your micro:bit via [USB](/device/usb), it should appear as  a `MICROBIT` drive.

If you accidentally hold down the reset button as you’re plugging in your micro:bit,
the micro:bit will appear as a `MAINTENANCE` drive instead of `MICROBIT`. C'est ce qu'on appelle le mode maintenance.

To continue programming your micro:bit YOU MUST unplug your USB and reconnect it. Check that the drive now shows as `MICROBIT`.

### ~ indice

#### Ouvrir le fichier de version

À utiliser avec précaution!
If you click on the drive while it shows the `MAINTENANCE` label,
you can see which version of firmware you have running on your micro:bit.
Le firmware de votre micro:bit devrait déjà être à jour.
Vous pouvez trouver la version du firmware dans le fichier «  'version.txt' sur le micro:bit. See the @boardname@ **[firmware](https://microbit.org/guide/firmware/)** page for more about checking your board's firmware version.

### ~

## Compass

La boussole peut détecter des champs magnétiques tels que le champ magnétique terrestre.
Comme le micro:bit dispose de cette boussole, il est possible de détecter la direction dans laquelle il se déplace.
Le micro:bit peut détecter où il fait face et son mouvement en degrés.
Ces données peuvent être utilisées par le micro:bit dans un programme ou être envoyées à un autre appareil.

## Accéléromètre

Il y a un accéléromètre sur votre micro:bit qui détecte les changements de vitesse du micro:bit.
Il convertit les informations analogiques en format numérique qui peuvent être utilisées dans les programmes micro:bit.
La sortie est en milli-g. L'appareil détectera également un petit nombre d'actions standard, par exemple les secousses, l'inclinaison et la chute libre.

Regardez cette vidéo pour découvrir comment fonctionne l'accéléromètre:

https://www.youtube.com/watch?v=byngcwjO51U

## Broches

The [pins](/device/pins) can be a form of electrical input or output.
There are labels for the input/output pins **0**, **1**, **2**, which you can attach external sensors to such as thermometers or moisture detectors.

## Microphone

Using the microphone, your programs can detect sounds that are present. You can check for loud or quiet sounds and find out what their sound level is.

## Light level

L'écran peut également être utilisé comme capteur de niveau de lumière (c'est une astuce vraiment sympa).

Learn more about how light level is detected in this light sensor video:

https://www.youtube.com/watch?v=TKhCr-dQMBY

## Température

La température est mesurée sur le @boardname@ en détectant la température de son matériau CPU physique. Comme il fonctionne presque aussi froid que l’air qui l’entoure, la température qu’il mesure pour lui-même est une bonne approximation de la température ambiante (la température à proximité et autour de lui).

Découvrez comment le @boardname@ peut détecter le chaud ou le froid dans cette vidéo de détection de température:

https://www.youtube.com/watch?v=_T4N8O9xsMA

## Durée d'exécution

The micro:bit embodies many fundamental concepts in computer science. To learn more, read [the micro:bit - a reactive system](/device/reactive).

Sometimes, your micro:bit may display an error code. For more information, see:

- [the error codes](/device/error-codes)

## Comment connecter le micro:bit à mon ordinateur?

Votre micro:bit peut être connecté à votre ordinateur via un câble micro USB.
Les données peuvent être envoyées et reçues entre le micro:bit et l'ordinateur, ce qui permet de télécharger des programmes depuis Windows, Mac et Chromebooks sur le micro:bit via cette connexion de données USB.
[Click here to read more information on how to run scripts on your micro:bit](/device/usb),
and [click here to read more about the error messages you might get](/device/error-codes).

## Alimenter votre micro:bit

When your micro:bit is connected to your computer with the micro USB, it doesn’t need another power source.  
When your micro:bit isn’t connected to your computer, tablet or mobile, you will need 2 x AAA 1.5 V batteries to power it.

The pins labelled **3V** and **GND** are the power supply pins.
You can attach an external device such as a motor to these and power it using the battery or USB.

## Communication série

The micro:bit can send and receive data via [serial communication](/device/serial). The serial data can be transferred via [USB](/reference/serial/redirect-to-usb), BLE or [redirected to pins](/reference/serial/redirect) on the edge connector.

## Antenne Bluetooth Low Energy (BLE)

Vous verrez l'étiquette BLE ANTENNA à l'arrière de votre micro:bit. Il s’agit d’un service de messagerie,
afin que les appareils puissent communiquer entre eux. Le micro:bit est un périphérique capable de communiquer avec un appareil central, comme un smartphone ou une tablette, équipé du Bluetooth Low Energy (BLE).
Le micro:bit peut envoyer et recevoir des signaux d'un appareil central afin qu'un autre appareil BLE puisse contrôler le micro:bit, ou que le micro:bit puisse contrôler un autre appareil BLE.

## Informations techniques

Le micro:bit a été conçu pour être un microcontrôleur nu destiné à être utilisé par les enfants âgés de 11 à 12 ans.
More information is available at the [Microbit Foundation web site](https://microbit.org/guide/).