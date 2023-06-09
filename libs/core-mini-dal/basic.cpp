#include "pxt.h"

/**
 * Provides access to basic calliope mini functionality.
 */
namespace basic {

   /**
    * Sets the color on the build-in LED. Set to 0 to turn off.
    */
   //% help=basic/set-led-color
    //% blockId=device_set_led_color
    //% block="set led to %color=colorNumberPicker"
    //% color.defl=0xff0000
    //% weight=10
    //% group="RGB LED"
    void setLedColor(int color) {
      if (!color) {
        uBit.rgb.off();
        return;
      }

      int w = (color >> 24) & 0xFF;
      int r = (color >> 16) & 0xFF;
      int g = (color >> 8) & 0xFF;
      int b = (color) & 0xFF;
      
      uBit.rgb.setColour(r,g,b,w);
    }

    /**
    * Sets the color on the build-in LED. Set to 0 to turn off.
    */
    //% blockId=device_turn_rgb_led_off block="turn build-in LED off"
    //% help=basic/turn-rgb-led-off
    //% weight=10
    //% group="RGB LED"
    //% advanced=true
    void turnRgbLedOff() {
        uBit.rgb.off();
    }

}