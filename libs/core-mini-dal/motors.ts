/**
* Blocks to control the onboard motors
*/
//% color=#008272 weight=30 icon="\uf1b9"
namespace motors {

    /**
    * Turns on the motor at a certain percent of power. Switches to single motor mode!
    * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
    */
    //% blockId=motor_on block="motor on at %percent \\%"
    //% parts=dcmotor weight=90 blockGap=8
    //% percent.shadow="speedPicker"
    //% power.defl=100
    export function motorPower(power: number) {
        motors.motorPowerDal(power)
    }

    /**
    * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
    */
    //% blockId=motor_command block="motor %command"
    //% parts=dcmotor weight=85
    export function motorCommand(command: number) {
        motors.motorCommandDal(command)
    }

    /**
    * Controls two motors attached to the board. Switches to dual-motor mode!
    */
    //% blockId=block_dual_motor block="motor %motor|at %percent \\%"
    //% percent.shadow="speedPicker"
    //% weight=80
    //% duty_percent.defl=100
    export function dualMotorPower(motor: number, duty_percent: number) {

        const power = Math.clamp(Math.map(duty_percent, -100, 100, -1023, 1023), -1023, 1023);

        motors.dualMotorPowerDal(motor, power)

    }
}