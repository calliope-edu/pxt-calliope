#include "pxt.h"

//% color=#B4009E weight=99 icon="\uf192"
namespace input {

    /**
     * gets the level of loudness from 0 (silent) to 255 (loud)
     */
    //% help=input/sound-level
    //% blockId="soundLevel" weight=58
    //% block="soundLevel" blockGap=8
    //% group="Sensors"
    int soundLevel() {
        int min = 1023;
        int max = 0;

        for (int i = 0; i < 32; i++) {
            int level = uBit.io.P21.getAnalogValue();
            if (level > max) {
                max = level;
            }
            if (level < min) {
                min = level;
            }
            uBit.sleep(5); // Add a small delay to allow the analog input to settle
        }

        int range = max - min + 0.5;
        int level = floor(range / 4); // Divide by 4 to get a value between 0 and 255

        return level;
    }

  /**
     * Returns 'true' when the compass is calibrated. Otherwise returns 'false'.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_is_calibrated" block="is compass calibrated"
    //% weight=19
    //% group="System"
    bool isCalibratedCompass() {
        return (uBit.compass.isCalibrated() == 1);
    }

      /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_clear_calibration" block="clear calibration compass"
    //% weight=17
    //% group="Configuration"
    //% blockHidden=true
    void clearCalibrationCompass() {
        uBit.compass.clearCalibration();
    }

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_assume_calibration" block="assume calibration compass"
    //% weight=16
    //% group="Configuration"
    //% blockHidden=true
    void assumeCalibrationCompass() {
        uBit.compass.assumeCalibration();
    }


}
