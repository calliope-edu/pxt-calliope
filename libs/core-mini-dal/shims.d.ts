// Auto-generated. Do not edit.


    /**
     * Provides access to basic calliope mini functionality.
     */

declare namespace basic {

    /**
     * Sets the color on the build-in LED. Set to 0 to turn off.
     */
    //% help=basic/set-led-color
    //% blockId=device_set_led_color
    //% block="set led to %color=colorNumberPicker"
    //%
    //% weight=10
    //% group="RGB LED" color.defl=0xff0000 shim=basic::setLedColor
    function setLedColor(color?: int32): void;

    /**
     * Sets the color on the build-in LED. Set to 0 to turn off.
     */
    //% blockId=device_turn_rgb_led_off block="turn build-in LED off"
    //% help=basic/turn-rgb-led-off
    //% weight=10
    //% group="RGB LED"
    //% advanced=true shim=basic::turnRgbLedOff
    function turnRgbLedOff(): void;
}



    //% color=#B4009E weight=99 icon="\uf192"
declare namespace input {

    /**
     * Returns 'true' when the compass is calibrated. Otherwise returns 'false'.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_is_calibrated" block="is compass calibrated"
    //% weight=19
    //% group="System" shim=input::isCalibratedCompass
    function isCalibratedCompass(): boolean;

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_clear_calibration" block="clear calibration compass"
    //% weight=17
    //% group="Configuration"
    //% blockHidden=true shim=input::clearCalibrationCompass
    function clearCalibrationCompass(): void;

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_assume_calibration" block="assume calibration compass"
    //% weight=16
    //% group="Configuration"
    //% blockHidden=true shim=input::assumeCalibrationCompass
    function assumeCalibrationCompass(): void;
}

// Auto-generated. Do not edit. Really.
