# Equipping a microservo with Crocodile clips

## ~ notas

If you are conducting a class or group activity, you should consider preparing all servos ahead of time.

## ~

## Using a microservo with the @boardname@

The @boardname@ provides just enough current to operate the SG90 microservo. This servo requires 3 connections: **GND**, **3V** and a logic **pin**. In this tutorial, we will equip the servo with crocodile clips to make it easier to use. However, you could also use a shield or crocodile clips with a male connector on one end to achieve the same result.

### ~ notas

To better understand how servos work and how they are controlled, take a few minutes to read this [Brief Guide to Servos](https://www.kitronik.co.uk/pdf/a-brief-guide-to-servos.pdf).

### ~

## The easy way: Alligator/Crocodile Clip to Male Jumpers #hintconnection

The easiest way to connect a servo to the @boardname@ is to use cables with an **Alligator/Crocodile clip** on one end and a **Male jumper (pig tail)** on the other end. You can purchase bundles these cables from various electronic resellers or easily build some as shown here.

https://youtu.be/XtzsydSTXEg

### Materiales

* 1 Crocodile clip cable
* 1 male (pig tail) cable
* Cutting pliers or wire cutter
* 1 piece of heat shrink tubing and a lighter

Simply cut the cables, strip them, twist the bare wires together, and cover the connection with some heat shrink tubing.

### ~ notas

It is very **important** to ensure a good connection between the 2 cables. If the connection is weak, the microservo will not receive enough current and it will not work. **If you have access to a soldering iron, we strongly recommend that you solder this connection.**

### ~

## Direct connection

You can also connect your crocodile clips directly to the servo.

### Materiales

* Cutting pliers or wire cutter
* Tape (masking, duct tape, and/or packing tape)
* 3 crocodile clips, yellow, red and black.
* 1 micro servo 9g (SG90)

### Step 1: Cut off the connector

With the cutting pliers, cut off the dark plastic connector.

![Cutting of the plastic connector from the servo cable](https://cdn.makecode.com/blob/0d101f1b9d49182b3e0d9fe224b4a8d520891288/static/mb/projects/inchworm/servo1.jpg)

### Step 2: Strip the ends of the cables

Using the pliers or a wire stripper, strip the plastic insulation from the cables.

![Stripping the servo cable insulation](https://cdn.makecode.com/blob/844d3b9e8a16f65e0530adcb520869a52ac9746b/static/mb/projects/inchworm/servotrim.jpg)

### Step 3: Twist the wire strands together

Twist the strands of bare wire at the ends of the servo cables together.

![Strands of the servo wires twisted together](https://cdn.makecode.com/blob/1cfb72facaa3c3eeb76d7d3dad5a2d84bddc7f11/static/mb/projects/inchworm/servo3.jpg)

### Step 4: Crocodile clip

Cut a crocodile cable in two and strip off the insulation. If it's possible, try to use cables with colors that match the cables on the servo!

![Stripping insulation of a croc cable with cutting pliers](https://cdn.makecode.com/blob/68d5a41cc6c6fbecd44713e1ea1d5680964c6f38/static/mb/projects/inchworm/servo4.jpg)

### Step 5: Thread the cable ends together

Place the cables next to each other...

![Bare wires place together before threading](https://cdn.makecode.com/blob/89f1c1778e333809bff1f9790f6f247fbf21e1ee/static/mb/projects/inchworm/servo5.jpg)

... and thread them together.

![Bare wires threaded together](https://cdn.makecode.com/blob/9e52cb44579bdb5f960fd91792d05e06c0180fb6/static/mb/projects/inchworm/servo6.jpg)

### ~ notas

It is very **important** to ensure that there is a good connection between the 2 cables. If the connection is weak, the microservo will not receive enough current and it will not work. **If you have access to a soldering iron, we strongly recommend soldering this connection.**

### ~

### Paso 6: Protege la conexión

Protect the connection with heat shrink tubing, electrical tape, or duct tape.

![Wire connection protected with electrical tape](https://cdn.makecode.com/blob/9aa13b615e075f02b55e0602bef66f3f34a60e19/static/mb/projects/inchworm/servo7.jpg)

### Step 7: Repeat for all cables

Repeat the same process until all cables are connected.

![All three cables connected and taped](https://cdn.makecode.com/blob/8f53c725b17014579fb8f19893f36ad7ad53f11e/static/mb/projects/inchworm/servo8.jpg)

### Paso 8: ¡Prueba!

It's time to test and find out if your connections are all secure and that the servo will function **when the @boardname@ is powered by battery**.

* Connect the microservo cables to these pins on the @boardname@: black to **GND**, red to **3V**, and the remaining cable to pin **0**.

![Connect to the pins on the board](https://cdn.makecode.com/blob/6d10d8dc54165b3115c90637f09d5a642b956552/static/mb/projects/inchworm/circuit1.jpg)

## ~ notas

When attaching the crocodile clips to the pins, don't be afraid to clamp on to the edge of the board with the clips.

![Clippiing the cables to the edge of the board](https://cdn.makecode.com/blob/c051c01c880ae5ac3cdcfadf1f261c27dbb17520/static/mb/projects/inchworm/circuit2.jpg)

## ~

* Download the following code to your @boardname@.

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

## Calibrating

Use the [servo calibrator](/projects/servo-calibrator) program to determine the best angles to use for your make.

## Troubleshooting

If your servo seems to stutter and remain stuck at a particular position, it means that it's not receiving enough power. This is probably due to a weak connection or low battery level. Make sure that each connection is good and check your batteries.