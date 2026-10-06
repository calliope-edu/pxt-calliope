# Téléchargement depuis Firefox sur Windows

How to compile, transfer, and run a program on your Calliope mini on **Firefox for Windows**.

While you're writing and testing your programs, you'll mostly be [running them in the simulator](/device/simulator), but once you've finished your program you can **compile** it and run it on your Calliope mini.

Les étapes de base sont les suivantes:

1. Connect your Calliope mini to your computer via USB
2. Click **Download** and download the `.hex` file
3. Click the **Save As** button and save the `.hex` file into the MINI drive

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

1. Ouvrez votre projet sur @homeurl@.
2. Click **Download**.
3. When prompted, choose to **save** the compiled file onto your computer. L'invite sera différente selon le navigateur que vous utilisez, ou selon que vous utilisez un ordinateur Windows ou un Mac.

![Enregistrer la boîte de dialogue de téléchargement du fichier](https://cdn.makecode.com/blob/0af5484845e7a27cb97256c278bb9a90c66cff82/static/mb/device/usb/save-file-firefox.gif)

A window may appear asking whether you want to save or open the `.hex` file. If it doesn't, go click on the downloads icon at the top of the browser.

![Invite d'enregistrement du fichier](https://cdn.makecode.com/blob/47003572cf109e200259f08b50683181f7255439/static/mb/device/usb/open-file-firefox.png)

Click the folder icon and copy the file from the list of downloads to the **MINI** drive.

![Move hex file to MINI drive](https://cdn.makecode.com/blob/58a4a8883bcae0cfce2371ea53a65cb9ffe623aa/static/mb/device/usb/move-hex-file-firefox.png)

## Step 3: Transfer the file to your Calliope mini

* The LED on the back of your Calliope mini flashes during the transfer (which should only take a few seconds).
* Une fois transféré, le code s'exécutera automatiquement sur votre @boardname@. To rerun your program, press the reset button on the back of your @boardname@. The reset button automatically runs the newest file on the Calliope mini.

By copying the script onto the `MINI` drive, you have programmed it into the flash memory on the Calliope mini, which means even after you unplug the Calliope mini, your program will still run if the Calliope mini is powered by battery.

## ~indice

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshoot).

## ~