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


    /**
     * Blocks to control the onboard motors
     */
    //% color=#008272 weight=30 icon="\uf1b9"
declare namespace motors {

    /**
     * Turns on the motor at a certain percent of power. Switches to single motor mode!
     * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
     */
    //% blockId=motor_on block="motor on at %percent \\%"
    //% parts=dcmotor weight=90 blockGap=8
    //% percent.shadow="speedPicker"
    //% power.defl=100 shim=motors::motorPower
    function motorPower(power?: int32): void;

    /**
     * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
     */
    //% blockId=motor_command block="motor %command"
    //% parts=dcmotor weight=85 shim=motors::motorCommand
    function motorCommand(command: MotorCommand): void;

    /**
     * Controls two motors attached to the board. Switches to dual-motor mode!
     */
    //% blockId=block_dual_motor block="motor %motor|at %percent \\%"
    //% percent.shadow="speedPicker"
    //% weight=80
    //% duty_percent.defl=100 shim=motors::dualMotorPower
    function dualMotorPower(motor: Motor, duty_percent?: int32): void;
}



    //% color=#B4009E weight=99 icon="\uf192"
declare namespace input {

    /**
     * gets the level of loudness from 0 (silent) to 255 (loud)
     */
    //% help=input/sound-level
    //% blockId="soundLevel" weight=58
    //% block="soundLevel" blockGap=8
    //% group="Sensors" shim=input::soundLevel
    function soundLevel(): int32;
}

// Auto-generated. Do not edit. Really.
