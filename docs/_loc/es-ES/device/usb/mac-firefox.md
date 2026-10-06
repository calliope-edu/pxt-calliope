# Uploading from Firefox for Mac

While you're writing and testing your programs, you'll mostly be [running them in the simulator](/device/simulator), but once you've finished your program you can **compile** it and run it on your Calliope mini.

The basic steps are:

1. Connect your Calliope mini to your computer via USB
2. Click **Download** and download the `.hex` file
3. Copy the `.hex` file from your computer onto the Calliope mini drive

## Requirements

You need the following things to transfer and run a script on your Calliope mini:

* A-Male to Micro USB cable to connect your computer to your Calliope mini. This is the same cable that is commonly used to connect a smart phone to a computer.
* A PC running Windows 7 or later, or a Mac running OS X 10.6 or later

## Step 1: Connect your Calliope mini to your computer

First, connect the Calliope mini:

1. Connect the small end of the USB cable to the micro USB port on your Calliope mini.

2. Connect the other end of the USB cable to a USB port on your computer.

Your computer should recognise your Calliope mini as a new drive. On computers running Windows, `MINI` appears as a drive under Devices and drives. On a Mac it appears as a new drive under Devices.

![](https://cdn.makecode.com/blob/16ee59aa14d97d3603fbbf565ff0a0d416c98946/static/mb/device/usb-osx-device.png)

## Step 2: Download your program

1. Open your project on @homeurl@
2. Click **Download**
3. When prompted, choose to **save** the compiled file onto your computer. The prompt will be different depending on which browser you are using, or whether you are using a Windows computer or a Mac

A dialogue box will appear, asking whether you would like to open or save your hex file. Select **Save file** and click **OK** and the file will then appear in your downloads in the top right of your browser. Right click on the file and click on **Show in Finder** and the file will appear in your downloads folder. Select the file and drag and drop it onto your `MINI` drive.

![](https://cdn.makecode.com/blob/eea0fad371b7cfbf3e7d2346c2dc6cfb301045f7/static/mb/device/usb-osx-firefox-1.jpg)

![](https://cdn.makecode.com/blob/97c38a688291e2f5b3f155da909a384b71ed10eb/static/mb/device/usb-osx-firefox-2.png)

## Step 3: Transfer the file to your Calliope mini

* Once you've found the folder containing your `.hex` file, drag and drop it onto your `MINI` drive
* The LED on the back of your Calliope mini flashes during the transfer (which should only take a few seconds).
* Once transferred, the code will run automatically on your Calliope mini. To rerun your program, press the reset button on the back of your Calliope mini. The reset button automatically runs the newest file on the Calliope mini.

By copying the script onto the `MINI` drive, you have programmed it into the flash memory on the Calliope mini, which means even after you unplug the Calliope mini, your program will still run if the Calliope mini is powered by battery.

## ~nota

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshoot).

## ~