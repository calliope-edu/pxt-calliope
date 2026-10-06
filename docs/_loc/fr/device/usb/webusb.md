# WebUSB

[WebUSB](https://wicg.github.io/webusb/) is an emerging web standard that allows to access @boardname@ from web pages. It allows for a **one-click download** without installing any additional app or software! It also allows to receive data from the @boardname@.

## Support

* Chrome 79+ browser for Android, Chrome OS, Linux, macOS and Windows 10.
* Microsoft Edge 79+ browser for Android, Chrome OS, Linux, macOS and Windows 10.

## Prepare your @boardname@

Make sure that your @boardname@ is running version **0249** or above of the firmware. Upgrading is as easy as dragging a file and it takes a few seconds to get it done.

* [Check out the instructions to check and upgrade your @boardname@.](/device/usb/webusb/troubleshoot)

## Pair your @boardname@

Here are the steps on the supported browsers:

* connect your @boardname@ to your computer with the microUSB cable
* open a project
* click the triple dot icon on the **Download** button and click **Pair device**
* click on the **Pair device** button and select **Calliope mini** or **DAPLink CMSIS-DAP** from the list.

If you don't see any devices in the list and @boardname@ has the right firmware (**0249** or above), you can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Calliope mini Foundation of the problem. Skip the rest of these steps.

![Device list for WebUSB pairing](https://cdn.makecode.com/blob/effb8fdd4e6f171ed7a560053e3693765c5329af/static/mb/device/usb/no-pair.jpg)

* When your @boardname@ is connected, you'll see the **Connected to Calliope mini** message window. Click on **Done** and you're ready to go!

![Connected message window](https://cdn.makecode.com/blob/f4b8e55753798da0e71d50f71ccded63491d471a/static/mb/device/usb/connected.jpg)

* If the connection to your @boardname@ was unsuccessful, you'll see the **Connect failed** message. You can press **Try Again** to attempt the connection again or cancel the window and [troubleshoot](/device/usb/webusb/troubleshoot) your connection.

![Connect failed message window](https://cdn.makecode.com/blob/de585f60160a4506856da7cde99dce6fb8aa75c4/static/mb/device/usb/connect-fail.jpg)

## Unpair your @boardname@ #unpair

You will need to unpair your device from the editor to disable WebUSB.

* Click on the **lock** icon in the address bar
* Uncheck each **Calliope mini** or **DAPLink CMSIS-DAP** device
* Reload the page

![](https://cdn.makecode.com/blob/569ff83d8c1889c45f5efa9d649cd10590566041/static/webusb/unpair.gif)

## One-click Download

Once your @boardname@ is paired, MakeCode will use WebUSB to transfer the code without having to drag and drop. Happy coding!

## Sortie console

MakeCode will be able to "listen" to your @boardname@ and display the console output.