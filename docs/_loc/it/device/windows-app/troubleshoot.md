# Troubleshooting downloads from the Windows 10 App

### ~ avatar

[Windows App](https://www.microsoft.com/store/apps/9pjc7sv48lcx) non sta scaricando propriamente il tuo programma? Proviamo a scoprire perché!

### ~

## Step 1: Check your cable

Assicurati che la tua @boardname@ sia connessa al tuo computer con un cavo USB micro. You should see a **MINI** drive appear in Windows Explorer when it's connected.

![MINI drive](https://makecode.com/not-found/HEAD/static/mb/device/windows-microbit-drive.png)

**If you can see the MINI drive go to step 2**.

If you can't see the drive:
* Make sure that the USB cable is working.
> Does the cable work on another computer? If not, find a different cable to use. Some cables may only provide a power connection and don't actually transfer data.
* Try another USB port on your computer.

Is the cable good but you still can't see the **MINI** drive? Hmm, you might have a problem with your @boardname@. Try the additional steps described in the [fault finding](https://support.microbit.org/support/solutions/articles/19000024000-fault-finding-with-a-micro-bit) page at microbit.org. If this doesn't help, you can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Calliope mini Foundation of the problem. **Skip the rest of these steps**.

## Step 2: Check your firmware version

È possibile che la versione del firmware sulla @boardname@ necessiti un aggiornamento. Let's check:

1. Go to the **MINI** drive.
2. Open the **DETAILS.TXT** file.<br/> ![](https://makecode.com/not-found/HEAD/static/mb/device/mb-drive-contents.jpg)<br/>
3. Look for a line in the file that says the version number. It should say **Version: \.\.\.** ![](https://cdn.makecode.com/blob/4a759afef8f8218a3607b4a29b3a9d4ce02cbfd4/static/mb/device/details-txt.jpg)<br/>

If the version is **0234**, you **NEED** to update the [firmware](/device/firmware) on your @boardname@. Go to **Step 3** and follow the upgrade instructions.

If the version is **0241**, **0243** or higher, **you have the right firmware**. You can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Calliope mini Foundation of the problem. **Skip the rest of these steps**.

## Step 3: Upgrade the firmware

1. Put your @boardname@ into **MAINTENANCE Mode**. To do this, unplug the USB cable from the @boardname@ and then re-connect the USB cable while you hold down the reset button. Once you insert the cable, you can release the reset button. You should now see a **MAINTENANCE** drive instead of the **MINI** drive like before. Also, a yellow LED light will stay on next to the reset button. ![MAINTENANCE gesture](https://cdn.makecode.com/blob/1d6dcc8f366b20c97d6afb0798ab1f56d994a58a/static/mb/device/maintenance.gif)
2. **[Download the firmware .hex file](https://microbit.org/guide/firmware/#update-firmware)**
3. Drag and drop that file onto the **MAINTENANCE** drive.
4. The yellow LED will flash while the `HEX` file is copying. When the copy finishes, the LED will go off and the @boardname@ resets. The **MAINTENANCE** drive now changes back to **MINI**.
5. The upgrade is complete! You can open the **DETAILS.TXT** file to check and see that the firmware version changed to the match the version of the `HEX` file you copied.

### ~hint

If you want to know more about connecting the board, MAINTENANCE Mode, and upgrading the firmware, read about it in the [Calliope mini firmware guide](https://microbit.org/guide/firmware).

### ~

## Step 4: Wait for the driver updates

Once you've updated the firmware, Windows will detect the updated device and install the drivers necessary to enable communication with the @boardname@. This step happens in the background and may take a minute or two.

## Step 5: Drag and drop a fresh .hex file

If different editors were used with this board, it may need a reset to bring it back to a known-good state. Do this by dragging a `.hex` file containing a simple program onto the drive. You can use the one here. Click on the **Download** icon below the blocks, then drag and drop the file onto the @drivename@ drive.

```blocks
basic.forever(function() {
    basic.showString("OK")
})
```