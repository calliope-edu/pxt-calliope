# Problembehandlung bei Downloads aus der Windows 10-App

### ~ avatar

Is the [Windows App](https://www.microsoft.com/store/apps/9pjc7sv48lcx) not downloading your program properly? Lass uns versuchen herauszufinden, warum!

### ~

## Schritt 1: Überprüfe das Kabel

Stelle sicher, dass dein @boardname@ mit einem Mikro-USB-Kabel mit deinem Computer verbunden ist. You should see a **MINI** drive appear in Windows Explorer when it's connected.

![MINI-Laufwerk](https://makecode.com/not-found/HEAD/static/mb/device/windows-microbit-drive.png)

**Wenn du das MINI-Laufwerk sehen kannst, gehe zu Schritt 2**.

If you can't see the drive:
* Make sure that the USB cable is working.
> Funktioniert das Kabel an einem anderen Computer? If not, find a different cable to use. Some cables may only provide a power connection and don't actually transfer data.
* Try another USB port on your computer.

Ist das Kabel gut, aber du kannst das **MINI** Laufwerk trotzdem nicht sehen? Hmm, you might have a problem with your @boardname@. Try the additional steps described in the [fault finding](https://support.microbit.org/support/solutions/articles/19000024000-fault-finding-with-a-micro-bit) page at microbit.org. If this doesn't help, you can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Calliope mini Foundation of the problem. **Skip the rest of these steps**.

## Schritt 2: Überprüfe die Firmware-Version

Es ist möglich, dass die Firmware-Version auf deinem @boardname@ ein Update benötigt. Let's check:

1. Go to the **MINI** drive.
2. Open the **DETAILS.TXT** file.<br/> ![](https://makecode.com/not-found/HEAD/static/mb/device/mb-drive-contents.jpg)<br/>
3. Suche nach einer Zeile in der Datei, welche die Versionsnummer angibt. It should say **Version: \.\.\.** ![](https://cdn.makecode.com/blob/4a759afef8f8218a3607b4a29b3a9d4ce02cbfd4/static/mb/device/details-txt.jpg)<br/>

If the version is **0234**, you **NEED** to update the [firmware](/device/firmware) on your @boardname@. Gehe zu **Schritt 3** und folgen den Upgrade-Anweisungen.

If the version is **0241**, **0243** or higher, **you have the right firmware**. You can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Calliope mini Foundation of the problem. **Skip the rest of these steps**.

## Schritt 3: Aktualisieren der Firmware

1. Put your @boardname@ into **MAINTENANCE Mode**. To do this, unplug the USB cable from the @boardname@ and then re-connect the USB cable while you hold down the reset button. Once you insert the cable, you can release the reset button. You should now see a **MAINTENANCE** drive instead of the **MINI** drive like before. Also, a yellow LED light will stay on next to the reset button. ![Wartungs-Geste](https://cdn.makecode.com/blob/1d6dcc8f366b20c97d6afb0798ab1f56d994a58a/static/mb/device/maintenance.gif)
2. **[Download the firmware .hex file](https://microbit.org/guide/firmware/#update-firmware)**
3. Ziehe die Datei auf das `MAINTENANCE` Laufwerk.
4. The yellow LED will flash while the `HEX` file is copying. When the copy finishes, the LED will go off and the @boardname@ resets. The **MAINTENANCE** drive now changes back to **MINI**.
5. The upgrade is complete! Du kannst die **DETAILS.TXT Datei öffnen,** um zu überprüfen und zu sehen, dass die Firmware-Version auf die Version der `HEX` Datei geändert wurde, die du kopiert hast.

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