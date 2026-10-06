# Uploading from Microsoft Edge on Windows

How to compile, transfer, and run a program on your Calliope mini on **Microsoft Edge**.

While you're writing and testing your programs, you'll mostly be [running them in the simulator](/device/simulator), but once you've finished your program you can **compile** it and run it on your Calliope mini.

Les étapes de base sont les suivantes:

1. Connect your @boardname@ to your computer via USB
2. Click **Download** to download the `.hex` file
3. Click the **Save As** button in the bottom bar and save the `.hex` file into the MINI drive

## Exigences

You need the following things to transfer and run a script on your Calliope mini:

* A-Male to Micro USB cable to connect your computer to your Calliope mini. This is the same cable that is commonly used to connect a smart phone to a computer.
* A PC running Windows 7 or later, or a Mac running OS X 10.6 or later

## Step 1: Connect your Calliope mini to your computer

First, connect the Calliope mini:

1. Connect the small end of the USB cable to the micro USB port on your Calliope mini.

2. Connectez l’autre extrémité du câble USB à un port USB de votre ordinateur.

Your computer should recognise your Calliope mini as a new drive. On computers running Windows, `MINI` appears as a drive under Devices and drives. On a Mac it appears as a new drive under Devices.

![](https://cdn.makecode.com/blob/ea3c2d68ddefdb82b3fc77660c3b2f05948e07c4/static/mb/device/usb-windows-device.jpg)

## Étape 2: Téléchargez votre programme

1. Ouvrez votre projet sur @homeurl@
2. Click **Download**
3. When prompted, choose to **save** the compiled file onto your computer. L'invite sera différente selon le navigateur utilisé, ou selon que vous utilisez un ordinateur Windows ou un Mac

Un message apparaîtra en bas de la fenêtre du navigateur vous demandant ce que vous souhaitez faire avec le fichier.

4. Click **Save As**

![Enregistrer la boîte de dialogue de téléchargement du fichier](https://cdn.makecode.com/blob/d07144efe07fe202b89a0c0a70c2cd008d980b81/static/mb/device/usb/save-as-edge.gif)

5. Save the `.hex` file into the **MINI** drive

![Save hex file to MINI drive](https://cdn.makecode.com/blob/727efe769e951f9e5ce82c4339c344e77f00a5a4/static/mb/device/usb/save-as-windows.png)

## Step 3: Transfer the file to your Calliope mini

* The LED on the back of your Calliope mini flashes during the transfer (which should only take a few seconds).
* Une fois transféré, le code s'exécutera automatiquement sur votre @boardname@. To rerun your program, press the reset button on the back of your @boardname@. The reset button automatically runs the newest file on the Calliope mini.

By copying the script onto the `MINI` drive, you have programmed it into the flash memory on the Calliope mini, which means even after you unplug the Calliope mini, your program will still run if the Calliope mini is powered by battery.

## ~indice

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshoot).

## ~