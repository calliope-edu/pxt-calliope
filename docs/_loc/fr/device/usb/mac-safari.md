# Téléchargement depuis Safari pour Mac

While you're writing and testing your programs, you'll mostly be [running them in the simulator](/device/simulator), but once you've finished your program you can **compile** it and run it on your Calliope mini.

Les étapes de base sont les suivantes:

1. Connect your Calliope mini to your computer via USB
2. Click **Download** and download the `.hex` file
3. Copy the `.hex` file from your computer onto the Calliope mini drive

## Exigences

You need the following things to transfer and run a script on your Calliope mini:

* A-Male to Micro USB cable to connect your computer to your Calliope mini. This is the same cable that is commonly used to connect a smart phone to a computer.
* A PC running Windows 7 or later, or a Mac running OS X 10.6 or later

## Step 1: Connect your Calliope mini to your computer

First, connect the Calliope mini:

1. Connect the small end of the USB cable to the micro USB port on your Calliope mini.

2. Connectez l’autre extrémité du câble USB à un port USB de votre ordinateur.

Your computer should recognise your Calliope mini as a new drive. On computers running Windows, `MINI` appears as a drive under Devices and drives. On a Mac it appears as a new drive under Devices.

![](https://cdn.makecode.com/blob/16ee59aa14d97d3603fbbf565ff0a0d416c98946/static/mb/device/usb-osx-device.png)

## Étape 2: Téléchargez votre programme

1. Ouvrez votre projet sur @homeurl@
2. Click **Download**
3. When prompted, choose to **save** the compiled file onto your computer. L'invite sera différente selon le navigateur utilisé, ou selon que vous utilisez un ordinateur Windows ou un Mac

When you select **Download** in Safari a file called `Unknown` will be downloaded into your Downloads folder. Open your Downloads folder and drag and drop the file onto your `MINI` drive, under Devices:

![](https://cdn.makecode.com/blob/0a0b7f8c2bf2096fd52b520a664ebe480b547d48/static/mb/device/usb-osx-dnd.png)

## Step 3: Transfer the file to your Calliope mini

* Once you've found the folder containing your `.hex` file, drag and drop it onto your `MINI` drive
* The LED on the back of your Calliope mini flashes during the transfer (which should only take a few seconds).
* Once transferred, the code will run automatically on your Calliope mini. To rerun your program, press the reset button on the back of your Calliope mini. The reset button automatically runs the newest file on the Calliope mini.

By copying the script onto the `MINI` drive, you have programmed it into the flash memory on the Calliope mini, which means even after you unplug the Calliope mini, your program will still run if the Calliope mini is powered by battery.


## ~indice

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshoot).

## ~