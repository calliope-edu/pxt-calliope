# Équiper un microservo avec des pinces crocodiles

## ~ indice

Si vous organisez une activité de classe ou de groupe, vous devez envisager de préparer tous les servos à l'avance.

## ~

## Utilisation d'un microservo avec le @boardname@

Le @boardname@ fournit juste assez de courant pour faire fonctionner le micro servo SG90. This servo requires 3 connections: **GND**, **3V** and a logic **pin**. Dans ce tutoriel, nous allons équiper le servo de pinces crocodiles pour le rendre plus facile à utiliser. Cependant, vous pouvez également utiliser un bouclier ou des pinces crocodiles avec un connecteur mâle à une extrémité pour obtenir le même résultat.

### ~ indice

Pour mieux comprendre comment fonctionnent les servos et comment ils sont contrôlés, prenez quelques minutes pour lire ce [ Bref guide des servos ](https://www.kitronik.co.uk/pdf/a-brief-guide-to-servos.pdf).

### ~

## The easy way: Alligator/Crocodile Clip to Male Jumpers #hintconnection

The easiest way to connect a servo to the @boardname@ is to use cables with an **Alligator/Crocodile clip** on one end and a **Male jumper (pig tail)** on the other end. Vous pouvez acheter des lots de ces câbles auprès de divers revendeurs électroniques ou en construire facilement comme indiqué ici.

https://youtu.be/XtzsydSTXEg

### Matériaux

* 1 Crocodile clip cable
* 1 male (pig tail) cable
* Pince coupante ou coupe-fil
* 1 morceau de gaine thermorétractable et un briquet

Coupez simplement les câbles, dénudez-les, torsadez les fils nus ensemble et recouvrez la connexion avec une gaine thermorétractable.

### ~ indice

It is very **important** to ensure a good connection between the 2 cables. Si la connexion est faible, le microservo ne recevra pas suffisamment de courant et ne fonctionnera pas. **If you have access to a soldering iron, we strongly recommend that you solder this connection.**

### ~

## Connexion directe

Vous pouvez également connecter vos pinces crocodiles directement au servo.

### Matériaux

* Pince coupante ou coupe-fil
* Tape (masking, duct tape, and/or packing tape)
* 3 pinces crocodiles, jaune, rouge et noire.
* 1 micro servo 9g (SG90)

### Étape 1: Coupez le connecteur

Avec la pince coupante, coupez le connecteur en plastique foncé.

![Découpe du connecteur en plastique du câble servo](https://cdn.makecode.com/blob/0d101f1b9d49182b3e0d9fe224b4a8d520891288/static/mb/projects/inchworm/servo1.jpg)

### Étape 2: Enlever les extrémités des câbles

À l’aide d’une pince ou d’une pince à dénuder, dénudez l’isolant en plastique des câbles.

![Dénuder l'isolation du câble servo](https://cdn.makecode.com/blob/844d3b9e8a16f65e0530adcb520869a52ac9746b/static/mb/projects/inchworm/servotrim.jpg)

### Étape 3: Torsadez les brins de fil ensemble

Torsadez ensemble les brins de fil nu aux extrémités des câbles servo.

![Brins de fils de servomoteur torsadés ensemble](https://cdn.makecode.com/blob/1cfb72facaa3c3eeb76d7d3dad5a2d84bddc7f11/static/mb/projects/inchworm/servo3.jpg)

### Step 4: Crocodile clip

Cut a crocodile cable in two and strip off the insulation. If it's possible, try to use cables with colors that match the cables on the servo!

![Stripping insulation of a croc cable with cutting pliers](https://cdn.makecode.com/blob/68d5a41cc6c6fbecd44713e1ea1d5680964c6f38/static/mb/projects/inchworm/servo4.jpg)

### Étape 5: Enfilez les extrémités du câble ensemble

Placez les câbles les uns à côté des autres...

![Les fils nus sont placés ensemble avant l'enfilage](https://cdn.makecode.com/blob/89f1c1778e333809bff1f9790f6f247fbf21e1ee/static/mb/projects/inchworm/servo5.jpg)

... et les enfiler ensemble.

![Fils nus enfilés ensemble](https://cdn.makecode.com/blob/9e52cb44579bdb5f960fd91792d05e06c0180fb6/static/mb/projects/inchworm/servo6.jpg)

### ~ indice

It is very **important** to ensure that there is a good connection between the 2 cables. Si la connexion est faible, le microservo ne recevra pas suffisamment de courant et ne fonctionnera pas. **If you have access to a soldering iron, we strongly recommend soldering this connection.**

### ~

### Étape 6: Protégez la connexion

Protégez la connexion avec une gaine thermorétractable, du ruban isolant ou du ruban adhésif.

![Connexion filaire protégée par du ruban isolant](https://cdn.makecode.com/blob/9aa13b615e075f02b55e0602bef66f3f34a60e19/static/mb/projects/inchworm/servo7.jpg)

### Étape 7: Répétez l’opération pour tous les câbles

Répétez le même processus jusqu’à ce que tous les câbles soient connectés.

![Les trois câbles sont connectés et scotchés](https://cdn.makecode.com/blob/8f53c725b17014579fb8f19893f36ad7ad53f11e/static/mb/projects/inchworm/servo8.jpg)

### Étape 8: Test!

It's time to test and find out if your connections are all secure and that the servo will function **when the @boardname@ is powered by battery**.

* Connect the microservo cables to these pins on the @boardname@: black to **GND**, red to **3V**, and the remaining cable to pin **0**.

![Connectez-vous aux broches de la carte](https://cdn.makecode.com/blob/6d10d8dc54165b3115c90637f09d5a642b956552/static/mb/projects/inchworm/circuit1.jpg)

## ~ indice

When attaching the crocodile clips to the pins, don't be afraid to clamp on to the edge of the board with the clips.

![Fixation des câbles au bord de la carte](https://cdn.makecode.com/blob/c051c01c880ae5ac3cdcfadf1f261c27dbb17520/static/mb/projects/inchworm/circuit2.jpg)

## ~

* Téléchargez le code suivant sur votre @boardname@.

```blocks
basic.forever(() => {
    pins.servoWritePin(AnalogPin.P0, pins.map(
        input.acceleration(Dimension.X),
        -512,
        512,
        0,
        180
    ))
})
```

* Test with both power sources and make sure that the servo moves when you tilt the board: >* Connected with USB. >* Powered by batteries **only** and not connected with USB.

## Calibrage

Utilisez le programme [servo calibrator](/projects/servo-calibrator) pour déterminer les meilleurs angles à utiliser pour votre marque.

## Dépannage

Si votre servo semble bégayer et rester bloqué dans une position particulière, cela signifie qu'il ne reçoit pas assez de puissance. Cela est probablement dû à une connexion faible ou à un faible niveau de batterie. Assurez-vous que chaque connexion est bonne et vérifiez vos batteries.