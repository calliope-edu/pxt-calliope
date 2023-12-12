/// <reference path="../libs/core/dal.d.ts" />
/// <reference path="../libs/core/enums.d.ts" />
/// <reference types="dom-mediacapture-record" />
declare namespace pxsim {
    interface CommonBoard extends CoreBoard, EventBusBoard {
        bus: EventBus;
        edgeConnectorState: EdgeConnectorState;
    }
}
declare namespace pxsim {
    class DalBoard extends CoreBoard implements CommonBoard, RadioBoard, LightBoard, MicrophoneBoard, ControlMessageBoard {
        ledMatrixState: LedMatrixState;
        edgeConnectorState: EdgeConnectorState;
        serialState: SerialState;
        accelerometerState: AccelerometerState;
        compassState: CompassState;
        thermometerState: ThermometerState;
        lightSensorState: LightSensorState;
        buttonPairState: ButtonPairState;
        radioState: RadioState;
        microphoneState: MicrophoneState;
        recordingState: RecordingState;
        lightState: pxt.Map<CommonNeoPixelState>;
        rgbLedState: number;
        rgbLedLeftState: number;
        rgbLedRightState: number;
        speakerState: SpeakerState;
        fileSystem: FileSystemState;
        logoTouch: Button;
        speakerEnabled: boolean;
        controlMessageState: ControlMessageState;
        viewHost: visuals.BoardHost;
        view: SVGElement;
        hardwareVersion: number;
        constructor();
        ensureHardwareVersion(version: number): void;
        initAsync(msg: SimulatorRunMessage): Promise<void>;
        tryGetNeopixelState(pinId: number): CommonNeoPixelState;
        neopixelState(pinId: number): CommonNeoPixelState;
        screenshotAsync(width?: number): Promise<ImageData>;
    }
    function initRuntimeWithDalBoard(): void;
    function board(): DalBoard;
    function parsePinString(gpioPin: string): Pin;
}
declare namespace pxsim.input {
    function onGesture(gesture: number, handler: RefAction): void;
    function isGesture(gesture: number): boolean;
    function acceleration(dimension: number): number;
    function rotation(kind: number): number;
    function setAccelerometerRange(range: number): void;
}
declare namespace pxsim {
    /**
      * Co-ordinate systems that can be used.
      * RAW: Unaltered data. Data will be returned directly from the accelerometer.
      *
      * SIMPLE_CARTESIAN: Data will be returned based on an easy to understand alignment, consistent with the cartesian system taught in schools.
      * When held upright, facing the user:
      *
      *                            /
      *    +--------------------+ z
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * y  +--------------------+  x-->
      *
      *
      * NORTH_EAST_DOWN: Data will be returned based on the industry convention of the North East Down (NED) system.
      * When held upright, facing the user:
      *
      *                            z
      *    +--------------------+ /
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * x  +--------------------+  y-->
      *
      */
    enum MicroBitCoordinateSystem {
        RAW = 0,
        SIMPLE_CARTESIAN = 1,
        NORTH_EAST_DOWN = 2
    }
    enum AccelerometerFlag {
        X = 1,
        Y = 2,
        Z = 4,
        Strength = 8,
        Pitch = 16,
        Roll = 32
    }
    class Accelerometer {
        runtime: Runtime;
        private sigma;
        private lastGesture;
        private currentGesture;
        private sample;
        private shake;
        private pitch;
        private roll;
        private id;
        isActive: boolean;
        sampleRange: number;
        flags: AccelerometerFlag;
        constructor(runtime: Runtime);
        setSampleRange(range: number): void;
        activate(flags?: AccelerometerFlag): void;
        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        update(x: number, y: number, z: number): void;
        getStrength(): number;
        updateEnvironmentGlobals(): void;
        private instantaneousAccelerationSquared;
        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        private instantaneousPosture;
        updateGesture(): void;
        forceGesture(gesture: number): void;
        private enqueueCurrentGesture;
        /**
          * Reads the X axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the X axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getX();
          * uBit.accelerometer.getX(RAW);
          * @endcode
          */
        getX(system?: MicroBitCoordinateSystem): number;
        /**
          * Reads the Y axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Y axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getY();
          * uBit.accelerometer.getY(RAW);
          * @endcode
          */
        getY(system?: MicroBitCoordinateSystem): number;
        /**
          * Reads the Z axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Z axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getZ();
          * uBit.accelerometer.getZ(RAW);
          * @endcode
          */
        getZ(system?: MicroBitCoordinateSystem): number;
        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        getPitch(): number;
        getPitchRadians(): number;
        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        getRoll(): number;
        getRollRadians(): number;
        getGesture(): number;
        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        recalculatePitchRoll(): void;
    }
    class AccelerometerState {
        accelerometer: Accelerometer;
        useShake: boolean;
        constructor(runtime: Runtime);
        shake(): void;
    }
}
declare namespace pxsim.input {
    function onButtonEvent(button: number, buttonEvent: number, handler: RefAction): void;
    function onButtonPressed(button: number, handler: RefAction): void;
    function buttonIsPressed(button: number): boolean;
}
declare namespace pxsim.visuals {
    function mkBtnSvg(xy: Coord): SVGAndSize<SVGGElement>;
    const BUTTON_PAIR_STYLE: string;
    class ButtonPairView implements IBoardPart<ButtonPairState> {
        element: SVGElement;
        defs: SVGElement[];
        style: string;
        private state;
        private bus;
        private aBtn;
        private bBtn;
        private abBtn;
        init(bus: EventBus, state: ButtonPairState): void;
        moveToCoord(xy: Coord): void;
        updateState(): void;
        updateTheme(): void;
        private mkBtns;
        private attachEvents;
    }
}
declare namespace pxsim.input {
    function compassHeading(): number;
    function assumeCalibrationCompass(): void;
    function clearCalibrationCompass(): void;
    function isCalibratedCompass(): boolean;
    function magneticForce(): number;
}
declare namespace pxsim.input {
    function onPinTouchEvent(pinId: number, pinEvent: number, handler: RefAction): void;
    function pinIsPressed(pinId: number): boolean;
}
declare namespace pxsim {
    function getPin(id: number): Pin;
}
declare namespace pxsim.pins {
    let edgeConnectorSoundDisabled: boolean;
    function digitalReadPin(pinId: number): number;
    function digitalWritePin(pinId: number, value: number): void;
    function setPull(pinId: number, pull: number): void;
    function analogReadPin(pinId: number): number;
    function analogWritePin(pinId: number, value: number): void;
    function analogSetPeriod(pinId: number, micros: number): void;
    function servoWritePin(pinId: number, value: number): void;
    function servoSetContinuous(pinId: number, value: boolean): void;
    function servoSetPulse(pinId: number, micros: number): void;
    function analogSetPitchPin(pinId: number): void;
    function setSoundOutputPinEnabled(enabled: boolean): void;
    function analogSetPitchVolume(volume: number): void;
    function analogPitchVolume(): number;
    function analogPitch(frequency: number, ms: number): void;
    function pushButton(pinId: number): void;
}
declare namespace pxsim.music {
    function setVolume(volume: number): void;
    function volume(): number;
}
declare namespace pxsim.pins {
    function setAudioPin(pinId: number): void;
    function setAudioPinEnabled(enabled: boolean): void;
}
declare namespace pxsim {
    enum PinFlags {
        Unused = 0,
        Digital = 1,
        Analog = 2,
        Input = 4,
        Output = 8,
        Touch = 16
    }
    class Pin {
        id: number;
        constructor(id: number);
        touched: boolean;
        value: number;
        period: number;
        servoAngle: number;
        mode: PinFlags;
        pitch: boolean;
        pull: number;
        servoContinuous: boolean;
        digitalReadPin(): number;
        digitalWritePin(value: number): void;
        setPull(pull: number): void;
        analogReadPin(): number;
        analogWritePin(value: number): void;
        analogSetPeriod(micros: number): void;
        servoWritePin(value: number): void;
        servoSetContinuous(value: boolean): void;
        servoSetPulse(pinId: number, micros: number): void;
        isTouched(): boolean;
    }
    interface EdgeConnectorProps {
        pins: number[];
        servos?: {
            [name: string]: number;
        };
    }
    class EdgeConnectorState {
        props: EdgeConnectorProps;
        pins: Pin[];
        pitchVolume: number;
        pitchEnabled: boolean;
        constructor(props: EdgeConnectorProps);
        getPin(id: number): Pin;
    }
}
declare namespace pxsim.files {
    function appendLine(filename: string, text: string): void;
    function appendString(filename: string, text: string): void;
    function appendNumber(filename: string, value: number): void;
    function remove(filename: string): void;
    function readToSerial(filename: string): void;
}
declare namespace pxsim.flashlog {
    enum FlashLogTimeStampFormat {
        None = 0,
        Milliseconds = 1,
        Seconds = 10,
        Minutes = 600,
        Hours = 36000,
        Days = 864000
    }
    export function beginRow(): number;
    export function logData(key: string, value: string, prepend?: boolean): DAL.DEVICE_OK | DAL.DEVICE_INVALID_STATE;
    export function endRow(): number;
    export function logString(s: string): void;
    export function clear(fullErase: boolean): void;
    export function setTimeStamp(format: FlashLogTimeStampFormat): void;
    export function setSerialMirroring(enabled: boolean): void;
    export {};
}
declare namespace pxsim {
    enum DisplayMode {
        bw = 0,
        greyscale = 1
    }
    class LedMatrixState {
        image: Image;
        brigthness: number;
        displayMode: DisplayMode;
        font: Image;
        disabled: boolean;
        animationQ: AnimationQueue;
        constructor(runtime: Runtime);
    }
    class Image extends RefObject {
        height: number;
        width: number;
        data: number[];
        constructor(width: number, data: number[]);
        print(): void;
        get(x: number, y: number): number;
        set(x: number, y: number, v: number): void;
        copyTo(xSrcIndex: number, length: number, target: Image, xTargetIndex: number): void;
        shiftLeft(cols: number): void;
        shiftRight(cols: number): void;
        clear(): void;
    }
    function createInternalImage(width: number): Image;
    function createImage(width: number): Image;
    function createImageFromBuffer(data: number[]): Image;
    function createImageFromString(text: string): Image;
    const FONT_DATA: number[];
    function createFont(): Image;
}
declare namespace pxsim.fonts {
    function charCodeBuffer(charCode: number): RefBuffer;
}
declare namespace pxsim.images {
    function createImage(img: Image): Image;
    function createBigImage(img: Image): Image;
}
declare namespace pxsim.ImageMethods {
    function showImage(leds: Image, offset: number, interval: number): void;
    function plotImage(leds: Image, offset: number): void;
    function height(leds: Image): number;
    function width(leds: Image): number;
    function plotFrame(leds: Image, frame: number): void;
    function showFrame(leds: Image, frame: number, interval: number): void;
    function pixel(leds: Image, x: number, y: number): number;
    function setPixel(leds: Image, x: number, y: number, v: number): void;
    function clear(leds: Image): void;
    function setPixelBrightness(i: Image, x: number, y: number, b: number): void;
    function pixelBrightness(i: Image, x: number, y: number): number;
    function scrollImage(leds: Image, stride: number, interval: number): void;
}
declare namespace pxsim.basic {
    function showNumber(x: number, interval: number): void;
    function showString(s: string, interval: number): void;
    function showLeds(leds: Image, interval: number): void;
    function clearScreen(): void;
    function showAnimation(leds: Image, interval: number): void;
    function plotLeds(leds: Image): void;
}
declare namespace pxsim.led {
    function plot(x: number, y: number): void;
    function plotBrightness(x: number, y: number, brightness: number): void;
    function unplot(x: number, y: number): void;
    function pointBrightness(x: number, y: number): number;
    function brightness(): number;
    function setBrightness(value: number): void;
    function stopAnimation(): void;
    function setDisplayMode(mode: DisplayMode): void;
    function displayMode(): DisplayMode;
    function screenshot(): Image;
    function enable(on: boolean): void;
}
declare namespace pxsim.input {
    function lightLevel(): number;
}
declare namespace pxsim.input {
    function onLogoEvent(action: number, handler: RefAction): void;
    function logoIsPressed(): boolean;
}
declare namespace pxsim.pins {
    function touchSetMode(name: number, mode: number): void;
}
declare namespace pxsim.input {
    function soundLevel(): number;
    function onSound(sound: number, body: RefAction): void;
    function setSoundThreshold(sound: number, threshold: number): void;
}
declare namespace pxsim.visuals {
    function mkMicroServoPart(xy?: Coord): SVGElAndSize;
    class MicroServoView implements IBoardPart<EdgeConnectorState> {
        style: string;
        overElement: SVGElement;
        element: SVGElement;
        defs: SVGElement[];
        state: EdgeConnectorState;
        bus: EventBus;
        private currentAngle;
        private targetAngle;
        private lastAngleTime;
        private pin;
        private crankEl;
        private crankTransform;
        init(bus: EventBus, state: EdgeConnectorState, svgEl: SVGSVGElement, otherParams: Map<string>): void;
        initDom(): void;
        moveToCoord(xy: visuals.Coord): void;
        updateState(): void;
        private renderAngle;
        updateTheme(): void;
    }
}
declare namespace pxsim.control {
    function __midiSend(data: RefBuffer): void;
}
declare namespace pxsim {
    /**
     * Error codes used in the micro:bit runtime.
    */
    enum PanicCode {
        MICROBIT_OOM = 20,
        MICROBIT_HEAP_ERROR = 30,
        MICROBIT_NULL_DEREFERENCE = 40
    }
    function panic(code: number): void;
    interface RuntimeOptions {
        theme: string;
    }
}
declare namespace pxsim.basic {
    var pause: typeof thread.pause;
    var forever: typeof thread.forever;
}
declare namespace pxsim.control {
    var inBackground: typeof thread.runInBackground;
    function onEvent(id: number, evid: number, handler: RefAction): void;
    function eventTimestamp(): number;
    function eventValue(): string | number;
}
declare namespace pxsim.input {
    function calibrateCompass(): void;
}
declare namespace pxsim.pins {
    function onPulsed(name: number, pulse: number, body: RefAction): void;
    function pulseDuration(): number;
    function createBuffer(sz: number): RefBuffer;
    function pulseIn(name: number, value: number, maxDuration: number): number;
    function spiWrite(value: number): number;
    function spiTransfer(cmd: RefBuffer, resp: RefBuffer): void;
    function spiFrequency(f: number): void;
    function spiFormat(bits: number, mode: number): void;
    function spiPins(mosi: number, miso: number, sck: number): void;
    function i2cReadBuffer(address: number, size: number, repeat?: boolean): RefBuffer;
    function i2cWriteBuffer(address: number, buf: RefBuffer, repeat?: boolean): void;
    function getPinAddress(name: number): Pin;
    function setEvents(name: number, event: number): void;
    function setMatrixWidth(pin: number, width: number): void;
}
declare namespace pxsim.devices {
    function tellCameraTo(action: number): void;
    function tellRemoteControlTo(action: number): void;
    function raiseAlertTo(action: number): void;
    function onSignalStrengthChanged(action: number): void;
    function signalStrength(): number;
    function onGamepadButton(button: number, body: RefAction): void;
}
declare namespace pxsim.bluetooth {
    function startIOPinService(): void;
    function startLEDService(): void;
    function startTemperatureService(): void;
    function startMagnetometerService(): void;
    function startAccelerometerService(): void;
    function startButtonService(): void;
    function startUartService(): void;
    function uartWriteString(s: string): void;
    function uartWriteBuffer(b: RefBuffer): void;
    function uartReadBuffer(): RefBuffer;
    function uartReadUntil(del: string): string;
    function onUartDataReceived(delimiters: string, handler: RefAction): void;
    function onBluetoothConnected(a: RefAction): void;
    function onBluetoothDisconnected(a: RefAction): void;
    function advertiseUrl(url: string, power: number, connectable: boolean): void;
    function advertiseUidBuffer(nsAndInstance: RefBuffer, power: number, connectable: boolean): void;
    function stopAdvertising(): void;
    function setTransmitPower(power: number): void;
}
declare namespace pxsim.light {
    function sendWS2812Buffer(buffer: RefBuffer, pin: number): void;
    function sendWS2812BufferWithBrightness(buffer: RefBuffer, pin: number, brightness: number): void;
    function setMode(pin: number, mode: number): void;
}
declare namespace pxsim {
    class SpeakerState {
        frequency: number;
        ms: number;
    }
}
declare namespace pxsim.music {
    function setBuiltInSpeakerEnabled(enabled: boolean): void;
    function speakerPlayTone(frequency: number, ms: number): void;
    function setSilenceLevel(level: number): void;
    function isSoundPlaying(): boolean;
}
declare namespace pxsim.music {
    interface Progression {
        interval: number[];
        length: number;
    }
}
declare namespace pxsim.music.MusicalIntervals {
    const chromaticInterval: number[];
    const majorScaleInterval: number[];
    const minorScaleInterval: number[];
    const pentatonicScaleInterval: number[];
    const majorTriadInterval: number[];
    const minorTriadInterval: number[];
    const diminishedInterval: number[];
    const wholeToneInterval: number[];
}
declare namespace pxsim.music.MusicalProgressions {
    const chromatic: Progression;
    const majorScale: Progression;
    const minorScale: Progression;
    const pentatonicScale: Progression;
    const majorTriad: Progression;
    const minorTriad: Progression;
    const diminished: Progression;
    const wholeTone: Progression;
    /**
     * Determine the frequency of a given note in a given progressions
     *
     * @param root The root frequency of the progression
     * @param progression The Progression to use
     * @param offset The offset (interval) of the note to generate
     * @return The frequency of the note requested in Hz.
     */
    function calculateFrequencyFromProgression(root: number, progression: Progression, offset: number): number;
}
declare namespace pxsim {
    class RecordingState {
        currentlyRecording: boolean;
        stream: MediaStream;
        recorder: MediaRecorder;
        chunks: Blob[];
        audioURL: string;
        recording: HTMLAudioElement;
        audioPlaying: boolean;
        recordTimeoutID: any;
        currentlyErasing: boolean;
        handleAudioPlaying: () => void;
        handleAudioStopped: () => void;
        initListeners: () => void;
    }
}
declare namespace pxsim.record {
    function record(): Promise<void>;
    function play(): void;
    function stop(): void;
    function erase(): void;
    function setMicrophoneGain(gain: number): void;
    function audioDuration(sampleRate: number): number;
    function audioIsPlaying(): boolean;
    function audioIsRecording(): boolean;
    function audioIsStopped(): boolean;
    function setInputSampleRate(sampleRate: number): void;
    function setOutputSampleRate(sampleRate: number): void;
    function setBothSamples(sampleRate: number): void;
}
declare namespace pxsim.basic {
    function setLedColor(c: number): void;
    function setLedColors(c1: number, c2: number, c3: number): void;
    function setLedColorDal(c: number): void;
    function setLedColorsCodal(c1: number, c2: number, c3: number): void;
    function turnRgbLedOff(): void;
}
declare namespace pxsim {
    class SerialState {
        private readonly runtime;
        private readonly board;
        serialIn: string[];
        constructor(runtime: Runtime, board: BaseBoard);
        private handleMessage;
        receiveData(data: string): void;
        readSerial(): string;
        serialOutBuffer: string;
        writeSerial(s: string): void;
        writeCsv(s: string, type: "headers" | "row" | "clear"): void;
    }
}
declare namespace pxsim.serial {
    function writeString(s: string): void;
    function writeBuffer(buf: RefBuffer): void;
    function readUntil(del: string): string;
    function readString(): string;
    function onDataReceived(delimiters: string, handler: RefAction): void;
    function redirect(tx: number, rx: number, rate: number): void;
    function redirectToUSB(): void;
    function setRxBufferSize(size: number): void;
    function setTxBufferSize(size: number): void;
    function readBuffer(length: number): RefBuffer;
    function setBaudRate(rate: number): void;
    function writeDmesg(): void;
}
declare namespace pxsim.music {
    function __playSoundExpression(notes: string, waitTillDone: boolean): void;
    function __stopSoundExpressions(): void;
}
declare namespace pxsim.motors {
    function motorPower(power: number): void;
    function motorCommand(command: string): void;
    function dualMotorPower(motor: string, percent: number): void;
    function motorPowerDal(power: number): void;
    function motorCommandDal(command: string): void;
    function dualMotorPowerDal(motor: string, percent: number): void;
}
declare namespace pxsim.storage {
    function putValueInt(key: string, value: number): void;
    function getValueInt(key: string): number;
    function remove(key: string): void;
}
declare namespace pxsim {
    class ThermometerState {
        usesTemperature: boolean;
        temperature: number;
    }
}
declare namespace pxsim.input {
    function temperature(): number;
}
declare namespace pxsim.visuals {
}
declare namespace pxsim.visuals {
    function mkLedMatrixSvg(xy: Coord, rows: number, cols: number): {
        el: SVGGElement;
        y: number;
        x: number;
        w: number;
        h: number;
        leds: SVGElement[];
        ledsOuter: SVGElement[];
        background: SVGElement;
    };
    interface ILedMatrixTheme {
        background?: string;
        ledOn?: string;
        ledOff?: string;
    }
    var defaultLedMatrixTheme: ILedMatrixTheme;
    const LED_MATRIX_STYLE = "\n            .sim-led-back:hover {\n                stroke:#a0a0a0;\n                stroke-width:3px;\n            }\n            .sim-led:hover {\n                stroke:#ff7f7f;\n                stroke-width:3px;\n            }\n            ";
    class LedMatrixView implements IBoardPart<LedMatrixState> {
        private background;
        private ledsOuter;
        private leds;
        private state;
        private bus;
        element: SVGElement;
        defs: SVGElement[];
        private theme;
        private DRAW_SIZE;
        private ACTIVE_SIZE;
        style: string;
        init(bus: EventBus, state: LedMatrixState): void;
        moveToCoord(xy: Coord): void;
        updateTheme(): void;
        updateState(): void;
        buildDom(): SVGGElement;
    }
}
declare namespace pxsim.visuals {
    export interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUps: string[];
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
        soundLevelOn?: string;
        soundLevelOff?: string;
    }
    export var themes: IBoardTheme[];
    export function randomTheme(): IBoardTheme;
    class MiniBoard extends pxsim.BaseBoard {
        hardwareVersion?: number;
    }
    class MiniRuntime extends pxsim.Runtime {
        board: MiniBoard;
    }
    export interface IBoardProps {
        runtime?: MiniRuntime;
        theme?: IBoardTheme;
        wireframe?: boolean;
        disableTilt?: boolean;
    }
    export class MicrobitBoardSvg implements BoardView {
        props: IBoardProps;
        element: SVGSVGElement;
        private style;
        private defs;
        private g;
        private pkg;
        private logos;
        private headg;
        private head;
        private headParts;
        private headInitialized;
        private heads;
        private headText;
        private display;
        private buttons;
        private buttonsOuter;
        private pins;
        private pinGradients;
        private pinTexts;
        private ledsOuter;
        private leds;
        private microphoneLed;
        private systemLed;
        private antenna;
        private rssi;
        private lightLevelButton;
        private lightLevelGradient;
        private lightLevelText;
        private thermometerGradient;
        private thermometer;
        private thermometerText;
        private soundLevelGradient;
        private soundLevel;
        private soundLevelText;
        private soundLevelIcon;
        private shakeButton;
        board: pxsim.DalBoard;
        private domHardwareVersion;
        private rgbLed;
        private rgbLedLeft;
        private rgbLedRight;
        private pinNmToCoord;
        constructor(props: IBoardProps);
        getView(): SVGAndSize<SVGSVGElement>;
        getCoord(pinNm: string): Coord;
        highlightPin(pinNm: string): void;
        getPinDist(): number;
        private recordPinCoords;
        private updateTheme;
        updateState(): void;
        private updateButtonPairs;
        private updateLEDMatrix;
        private updateRgbLed;
        private updateSpeaker;
        private updateGestures;
        private updateMicrophone;
        private updateRecordingActive;
        private updateButtonAB;
        private updateRSSI;
        private updatePin;
        private updateTemperature;
        private updateSoundLevel;
        private updateHeading;
        private lastFlashTime;
        flashSystemLed(): void;
        private lastAntennaFlash;
        flashAntenna(): void;
        private updatePins;
        private updateLightLevel;
        private applyLightLevel;
        private updateTilt;
        private buildDom;
        private mkBtn;
        private attachEvents;
        private attachIFrameEvents;
        private attachAccelerometerEvents;
        private attachPinsIOEvents;
        private attachPinsTouchEvents;
        private attachABEvents;
        private attachAPlusBEvents;
    }
    export {};
}
declare namespace pxsim {
    function createMuteButton(): HTMLDivElement;
    function shouldShowMute(): boolean;
    function hasNavigator(): boolean;
    function isEdge(): boolean;
    function isIE(): boolean;
    function isChrome(): boolean;
    function isSafari(): boolean;
}
declare namespace pxsim.pxtcore {
    function registerWithDal(id: number, evid: number, handler: RefAction, mode?: number): void;
    function deepSleep(): void;
}
declare namespace pxsim.BufferMethods {
    function hash(buf: RefBuffer, bits: number): number;
}
declare namespace pxsim.control {
    let runInParallel: typeof thread.runInBackground;
    let delay: typeof thread.pause;
    function reset(): void;
    function waitMicros(micros: number): void;
    function deviceName(): string;
    function _ramSize(): number;
    function deviceSerialNumber(): number;
    function deviceLongSerialNumber(): RefBuffer;
    function deviceDalVersion(): string;
    function internalOnEvent(id: number, evid: number, handler: RefAction): void;
    function waitForEvent(id: number, evid: number): void;
    function allocateNotifyEvent(): number;
    function raiseEvent(id: number, evid: number, mode: number): void;
    function millis(): number;
    function micros(): number;
    function delayMicroseconds(us: number): void;
    function createBuffer(size: number): RefBuffer;
    function dmesg(msg: string): void;
    function setDebugFlags(flags: number): void;
    function heapSnapshot(): void;
    function dmesgPtr(msg: string, ptr: any): void;
    function dmesgValue(ptr: any): void;
    function gc(): void;
    function profilingEnabled(): boolean;
    function __log(priority: number, str: string): void;
    function heapDump(): void;
    function isUSBInitialized(): boolean;
}
declare namespace pxsim {
    const enum PXT_PANIC {
        PANIC_CODAL_OOM = 20,
        PANIC_GC_OOM = 21,
        PANIC_GC_TOO_BIG_ALLOCATION = 22,
        PANIC_CODAL_HEAP_ERROR = 30,
        PANIC_CODAL_NULL_DEREFERENCE = 40,
        PANIC_CODAL_USB_ERROR = 50,
        PANIC_CODAL_HARDWARE_CONFIGURATION_ERROR = 90,
        PANIC_INVALID_BINARY_HEADER = 901,
        PANIC_OUT_OF_BOUNDS = 902,
        PANIC_REF_DELETED = 903,
        PANIC_SIZE = 904,
        PANIC_INVALID_VTABLE = 905,
        PANIC_INTERNAL_ERROR = 906,
        PANIC_NO_SUCH_CONFIG = 907,
        PANIC_NO_SUCH_PIN = 908,
        PANIC_INVALID_ARGUMENT = 909,
        PANIC_MEMORY_LIMIT_EXCEEDED = 910,
        PANIC_SCREEN_ERROR = 911,
        PANIC_MISSING_PROPERTY = 912,
        PANIC_INVALID_IMAGE = 913,
        PANIC_CALLED_FROM_ISR = 914,
        PANIC_HEAP_DUMPED = 915,
        PANIC_CAST_FIRST = 980,
        PANIC_CAST_FROM_UNDEFINED = 980,
        PANIC_CAST_FROM_BOOLEAN = 981,
        PANIC_CAST_FROM_NUMBER = 982,
        PANIC_CAST_FROM_STRING = 983,
        PANIC_CAST_FROM_OBJECT = 984,
        PANIC_CAST_FROM_FUNCTION = 985,
        PANIC_CAST_FROM_NULL = 989
    }
}
declare namespace pxsim.pxtcore {
    function sendMessage(channel: string, message: RefBuffer, parentOnly?: boolean): void;
    function peekMessageChannel(): string;
    function readMessageData(): RefBuffer;
}
declare namespace pxsim {
    const CONTROL_MESSAGE_EVT_ID = 2999;
    const CONTROL_MESSAGE_RECEIVED = 1;
    class ControlMessageState {
        private board;
        messages: SimulatorControlMessage[];
        enabled: boolean;
        constructor(board: CommonBoard);
        private messageHandler;
        enqueue(message: SimulatorControlMessage): void;
        peek(): SimulatorControlMessage;
        read(): SimulatorControlMessage;
    }
    interface ControlMessageBoard extends CommonBoard {
        controlMessageState: ControlMessageState;
    }
    function getControlMessageState(): ControlMessageState;
}
declare namespace pxsim {
    class AnalogSensorState {
        id: number;
        min: number;
        max: number;
        lowThreshold: number;
        highThreshold: number;
        sensorUsed: boolean;
        private level;
        private state;
        constructor(id: number, min?: number, max?: number, lowThreshold?: number, highThreshold?: number);
        setUsed(): void;
        setLevel(level: number): void;
        getLevel(): number;
        setLowThreshold(value: number): void;
        setHighThreshold(value: number): void;
        private clampValue;
        private setState;
    }
}
declare namespace pxsim {
    interface MicrophoneBoard {
        microphoneState: MicrophoneState;
    }
    class MicrophoneState extends AnalogSensorState {
        onSoundRegistered: boolean;
        soundLevelRequested: boolean;
        private pingUsed;
        pingSoundLevel: () => void;
    }
    function microphoneState(): MicrophoneState;
}
declare namespace pxsim {
    enum NeoPixelMode {
        RGB = 1,
        RGBW = 2,
        RGB_RGB = 3,
        DotStar = 4
    }
    class CommonNeoPixelState {
        buffer: Uint8Array;
        mode: number;
        width: number;
        get length(): number;
        get stride(): 3 | 4;
        pixelColor(pixel: number): number[];
    }
    interface CommonNeoPixelStateConstructor {
        (pin: Pin): CommonNeoPixelState;
    }
    interface LightBoard {
        tryGetNeopixelState(pinId: number): CommonNeoPixelState;
        neopixelState(pinId: number): CommonNeoPixelState;
    }
    function neopixelState(pinId: number): CommonNeoPixelState;
    function sendBufferAsm(buffer: RefBuffer, pin: number): void;
}
declare namespace pxsim.light {
    function sendBuffer(pin: {
        id: number;
    }, clk: {
        id: number;
    }, mode: number, b: RefBuffer): void;
}
declare namespace pxsim.visuals {
    function mkNeoPixelPart(xy?: Coord): SVGElAndSize;
    class NeoPixel {
        el: SVGElement;
        cy: number;
        constructor(xy?: Coord, width?: number);
        setRgb(rgb: [number, number, number]): void;
    }
    class NeoPixelCanvas {
        cols: number;
        canvas: SVGSVGElement;
        private pixels;
        private viewBox;
        private background;
        constructor(pin: number, cols?: number);
        private updateViewBox;
        update(colors: number[][]): void;
        setLoc(xy: Coord): void;
    }
    class NeoPixelView implements IBoardPart<CommonNeoPixelStateConstructor> {
        parsePinString: (name: string) => Pin;
        style: string;
        element: SVGElement;
        overElement: SVGElement;
        defs: SVGElement[];
        private state;
        private canvas;
        private part;
        private stripGroup;
        private lastLocation;
        private pin;
        constructor(parsePinString: (name: string) => Pin);
        init(bus: EventBus, state: CommonNeoPixelStateConstructor, svgEl: SVGSVGElement, otherParams: Map<string>): void;
        private makeCanvas;
        moveToCoord(xy: Coord): void;
        private updateStripLoc;
        updateState(): void;
        updateTheme(): void;
    }
}
declare namespace pxsim.radio {
    function raiseEvent(id: number, eventid: number): void;
    function setGroup(id: number): void;
    function setTransmitPower(power: number): void;
    function setFrequencyBand(band: number): void;
    function sendRawPacket(buf: RefBuffer): void;
    function readRawPacket(): RefBuffer;
    function onDataReceived(handler: RefAction): void;
    function off(): void;
    function on(): void;
}
declare namespace pxsim {
    interface RadioBoard extends EventBusBoard {
        radioState: RadioState;
    }
    function getRadioState(): RadioState;
    interface PacketBuffer {
        payload: SimulatorRadioPacketPayload;
        rssi: number;
        serial: number;
        time: number;
    }
    interface SimulatorRadioPacketPayload {
        bufferData?: Uint8Array;
    }
    interface RadioDAL {
        ID_RADIO: number;
        RADIO_EVT_DATAGRAM: number;
    }
    class RadioDatagram {
        private runtime;
        dal: RadioDAL;
        datagram: PacketBuffer[];
        lastReceived: PacketBuffer;
        private _rssi;
        constructor(runtime: Runtime, dal: RadioDAL);
        get rssi(): number;
        set rssi(value: number);
        queue(packet: PacketBuffer): void;
        send(payload: SimulatorRadioPacketPayload): void;
        recv(): PacketBuffer;
        onReceived(handler: RefAction): void;
        private static defaultPacket;
    }
    class RadioState {
        private readonly runtime;
        private readonly board;
        power: number;
        transmitSerialNumber: boolean;
        datagram: RadioDatagram;
        groupId: number;
        band: number;
        enable: boolean;
        constructor(runtime: Runtime, board: BaseBoard, dal: RadioDAL);
        private handleMessage;
        setGroup(id: number): void;
        setTransmitPower(power: number): void;
        setTransmitSerialNumber(sn: boolean): void;
        setFrequencyBand(band: number): void;
        off(): void;
        on(): void;
        raiseEvent(id: number, eventid: number): void;
        receivePacket(packet: SimulatorRadioPacketMessage): void;
    }
}
declare namespace pxsim.settings {
    function _set(key: string, buf: RefBuffer): 0 | -1;
    function _remove(key: string): 0 | -1;
    function _exists(key: string): boolean;
    function _get(key: string): RefBuffer;
    function _userClean(): void;
    function _list(prefix: string): RefCollection;
}
