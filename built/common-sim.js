var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onGesture(gesture, handler) {
            let b = pxsim.accelerometer();
            b.accelerometer.activate();
            if (gesture == 11 /* DAL.ACCELEROMETER_EVT_SHAKE */ && !b.useShake) {
                b.useShake = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            pxsim.pxtcore.registerWithDal(13 /* DAL.DEVICE_ID_GESTURE */, gesture, handler);
        }
        input.onGesture = onGesture;
        function rotation(kind) {
            let b = pxsim.accelerometer();
            let acc = b.accelerometer;
            acc.activate();
            let x = acc.getX(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let y = acc.getY(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let z = acc.getZ(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let roll = Math.atan2(y, z);
            let pitch = Math.atan(-x / (y * Math.sin(roll) + z * Math.cos(roll)));
            let r = 0;
            switch (kind) {
                case 0:
                    r = pitch;
                    break;
                case 1:
                    r = roll;
                    break;
            }
            return Math.floor(r / Math.PI * 180);
        }
        input.rotation = rotation;
        function setAccelerometerRange(range) {
            let b = pxsim.accelerometer();
            b.accelerometer.setSampleRange(range);
        }
        input.setAccelerometerRange = setAccelerometerRange;
        function acceleration(dimension) {
            let b = pxsim.accelerometer();
            let acc = b.accelerometer;
            acc.activate();
            switch (dimension) {
                case 0: return acc.getX();
                case 1: return acc.getY();
                case 2: return acc.getZ();
                default: return Math.floor(Math.sqrt(acc.instantaneousAccelerationSquared()));
            }
        }
        input.acceleration = acceleration;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
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
    let MicroBitCoordinateSystem;
    (function (MicroBitCoordinateSystem) {
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["RAW"] = 0] = "RAW";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["SIMPLE_CARTESIAN"] = 1] = "SIMPLE_CARTESIAN";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["NORTH_EAST_DOWN"] = 2] = "NORTH_EAST_DOWN";
    })(MicroBitCoordinateSystem = pxsim.MicroBitCoordinateSystem || (pxsim.MicroBitCoordinateSystem = {}));
    class Accelerometer {
        constructor(runtime) {
            this.runtime = runtime;
            this.sigma = 0; // the number of ticks that the instantaneous gesture has been stable.
            this.lastGesture = 0; // the last, stable gesture recorded.
            this.currentGesture = 0; // the instantaneous, unfiltered gesture detected.
            this.sample = { x: 0, y: 0, z: -1023 };
            this.shake = { x: false, y: false, z: false, count: 0, shaken: 0, timer: 0 }; // State information needed to detect shake events.
            this.isActive = false;
            this.sampleRange = 2;
            this.id = 5 /* DAL.DEVICE_ID_ACCELEROMETER */;
        }
        setSampleRange(range) {
            this.activate();
            this.sampleRange = Math.max(1, Math.min(8, range));
        }
        activate() {
            if (!this.isActive) {
                this.isActive = true;
                this.runtime.queueDisplayUpdate();
            }
        }
        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        update(x, y, z) {
            // read MSB values...
            this.sample.x = Math.floor(x);
            this.sample.y = Math.floor(y);
            this.sample.z = Math.floor(z);
            // Update gesture tracking
            this.updateGesture();
            // Indicate that a new sample is available
            pxsim.board().bus.queue(this.id, 1 /* DAL.ACCELEROMETER_EVT_DATA_UPDATE */);
        }
        instantaneousAccelerationSquared() {
            // Use pythagoras theorem to determine the combined force acting on the device.
            return this.sample.x * this.sample.x + this.sample.y * this.sample.y + this.sample.z * this.sample.z;
        }
        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        instantaneousPosture() {
            let force = this.instantaneousAccelerationSquared();
            let shakeDetected = false;
            // Test for shake events.
            // We detect a shake by measuring zero crossings in each axis. In other words, if we see a strong acceleration to the left followed by
            // a string acceleration to the right, then we can infer a shake. Similarly, we can do this for each acxis (left/right, up/down, in/out).
            //
            // If we see enough zero crossings in succession (MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD), then we decide that the device
            // has been shaken.
            if ((this.getX() < -400 /* DAL.ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.x) || (this.getX() > 400 /* DAL.ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.x)) {
                shakeDetected = true;
                this.shake.x = !this.shake.x;
            }
            if ((this.getY() < -400 /* DAL.ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.y) || (this.getY() > 400 /* DAL.ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.y)) {
                shakeDetected = true;
                this.shake.y = !this.shake.y;
            }
            if ((this.getZ() < -400 /* DAL.ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.z) || (this.getZ() > 400 /* DAL.ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.z)) {
                shakeDetected = true;
                this.shake.z = !this.shake.z;
            }
            if (shakeDetected && this.shake.count < 4 /* DAL.ACCELEROMETER_SHAKE_COUNT_THRESHOLD */ && ++this.shake.count == 4 /* DAL.ACCELEROMETER_SHAKE_COUNT_THRESHOLD */)
                this.shake.shaken = 1;
            if (++this.shake.timer >= 10 /* DAL.ACCELEROMETER_SHAKE_DAMPING */) {
                this.shake.timer = 0;
                if (this.shake.count > 0) {
                    if (--this.shake.count == 0)
                        this.shake.shaken = 0;
                }
            }
            if (this.shake.shaken)
                return 11 /* DAL.ACCELEROMETER_EVT_SHAKE */;
            let sq = (n) => n * n;
            if (force < sq(400 /* DAL.ACCELEROMETER_FREEFALL_TOLERANCE */))
                return 7 /* DAL.ACCELEROMETER_EVT_FREEFALL */;
            if (force > sq(3072 /* DAL.ACCELEROMETER_3G_TOLERANCE */))
                return 8 /* DAL.ACCELEROMETER_EVT_3G */;
            if (force > sq(6144 /* DAL.ACCELEROMETER_6G_TOLERANCE */))
                return 9 /* DAL.ACCELEROMETER_EVT_6G */;
            if (force > sq(8192 /* DAL.ACCELEROMETER_8G_TOLERANCE */))
                return 10 /* DAL.ACCELEROMETER_EVT_8G */;
            // Determine our posture.
            if (this.getX() < (-1000 + 200 /* DAL.ACCELEROMETER_TILT_TOLERANCE */))
                return 3 /* DAL.ACCELEROMETER_EVT_TILT_LEFT */;
            if (this.getX() > (1000 - 200 /* DAL.ACCELEROMETER_TILT_TOLERANCE */))
                return 4 /* DAL.ACCELEROMETER_EVT_TILT_RIGHT */;
            if (this.getY() < (-1000 + 200 /* DAL.ACCELEROMETER_TILT_TOLERANCE */))
                return 1 /* DAL.ACCELEROMETER_EVT_TILT_UP */;
            if (this.getY() > (1000 - 200 /* DAL.ACCELEROMETER_TILT_TOLERANCE */))
                return 2 /* DAL.ACCELEROMETER_EVT_TILT_DOWN */;
            if (this.getZ() < (-1000 + 200 /* DAL.ACCELEROMETER_TILT_TOLERANCE */))
                return 5 /* DAL.ACCELEROMETER_EVT_FACE_UP */;
            if (this.getZ() > (1000 - 200 /* DAL.ACCELEROMETER_TILT_TOLERANCE */))
                return 6 /* DAL.ACCELEROMETER_EVT_FACE_DOWN */;
            return 0;
        }
        updateGesture() {
            // Determine what it looks like we're doing based on the latest sample...
            let g = this.instantaneousPosture();
            // Perform some low pass filtering to reduce jitter from any detected effects
            if (g == this.currentGesture) {
                if (this.sigma < 5 /* DAL.ACCELEROMETER_GESTURE_DAMPING */)
                    this.sigma++;
            }
            else {
                this.currentGesture = g;
                this.sigma = 0;
            }
            // If we've reached threshold, update our record and raise the relevant event...
            if (this.currentGesture != this.lastGesture && this.sigma >= 5 /* DAL.ACCELEROMETER_GESTURE_DAMPING */) {
                this.lastGesture = this.currentGesture;
                pxsim.board().bus.queue(13 /* DAL.DEVICE_ID_GESTURE */, this.lastGesture);
            }
        }
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
        getX(system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN) {
            this.activate();
            let val;
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    val = -this.sample.x;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = this.sample.y;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN.RAW:
                default:
                    val = this.sample.x;
            }
            return pxsim.board().invertAccelerometerXAxis ? val * -1 : val;
        }
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
        getY(system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN) {
            this.activate();
            let val;
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    val = -this.sample.y;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = -this.sample.x;
                //case RAW:
                default:
                    val = this.sample.y;
            }
            return pxsim.board().invertAccelerometerYAxis ? val * -1 : val;
        }
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
        getZ(system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN) {
            this.activate();
            let val;
            switch (system) {
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = -this.sample.z;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                //case MicroBitCoordinateSystem.RAW:
                default:
                    val = this.sample.z;
            }
            return pxsim.board().invertAccelerometerZAxis ? val * -1 : val;
        }
        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        getPitch() {
            this.activate();
            return Math.floor((360 * this.getPitchRadians()) / (2 * Math.PI));
        }
        getPitchRadians() {
            this.recalculatePitchRoll();
            return this.pitch;
        }
        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        getRoll() {
            this.activate();
            return Math.floor((360 * this.getRollRadians()) / (2 * Math.PI));
        }
        getRollRadians() {
            this.recalculatePitchRoll();
            return this.roll;
        }
        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        recalculatePitchRoll() {
            let x = this.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let y = this.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let z = this.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            this.roll = Math.atan2(y, z);
            this.pitch = Math.atan(-x / (y * Math.sin(this.roll) + z * Math.cos(this.roll)));
        }
    }
    pxsim.Accelerometer = Accelerometer;
    class AccelerometerState {
        constructor(runtime) {
            this.useShake = false;
            this.tiltDecayer = 0;
            this.accelerometer = new Accelerometer(runtime);
        }
        attachEvents(element) {
            this.element = element;
            this.tiltDecayer = 0;
            this.element.addEventListener(pxsim.pointerEvents.move, (ev) => {
                if (!this.accelerometer.isActive)
                    return;
                if (this.tiltDecayer) {
                    clearInterval(this.tiltDecayer);
                    this.tiltDecayer = 0;
                }
                let bbox = element.getBoundingClientRect();
                let ax = (ev.clientX - bbox.width / 2) / (bbox.width / 3);
                let ay = (ev.clientY - bbox.height / 2) / (bbox.height / 3);
                let x = -Math.max(-1023, Math.min(1023, Math.floor(ax * 1023)));
                let y = Math.max(-1023, Math.min(1023, Math.floor(ay * 1023)));
                let z2 = 1023 * 1023 - x * x - y * y;
                let z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));
                this.accelerometer.update(-x, y, z);
                this.updateTilt();
            }, false);
            this.element.addEventListener(pxsim.pointerEvents.leave, (ev) => {
                if (!this.accelerometer.isActive)
                    return;
                if (!this.tiltDecayer) {
                    this.tiltDecayer = setInterval(() => {
                        let accx = this.accelerometer.getX();
                        accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                        let accy = this.accelerometer.getY();
                        accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                        let accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                        if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                            clearInterval(this.tiltDecayer);
                            this.tiltDecayer = 0;
                            accx = 0;
                            accy = 0;
                            accz = -1023;
                        }
                        this.accelerometer.update(accx, accy, accz);
                        this.updateTilt();
                    }, 50);
                }
            }, false);
        }
        updateTilt() {
            if (!this.accelerometer.isActive || !this.element)
                return;
            const x = this.accelerometer.getX();
            const y = this.accelerometer.getY();
            const af = 8 / 1023;
            const s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);
            this.element.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`;
            this.element.style.perspectiveOrigin = "50% 50% 50%";
            this.element.style.perspective = "30em";
        }
    }
    pxsim.AccelerometerState = AccelerometerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function accelerometer() {
        return pxsim.board().accelerometerState;
    }
    pxsim.accelerometer = accelerometer;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function getPin(id) {
            const b = pxsim.board();
            if (b && b.edgeConnectorState)
                return b.edgeConnectorState.getPin(id);
            return undefined;
        }
        pxtcore.getPin = getPin;
        function lookupPinCfg(key) {
            return getPinCfg(key);
        }
        pxtcore.lookupPinCfg = lookupPinCfg;
        function getPinCfg(key) {
            return getPin(pxtcore.getConfig(key, -1));
        }
        pxtcore.getPinCfg = getPinCfg;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        // TODO: add in support for mode, as in CODAL
        function registerWithDal(id, evid, handler, mode = 0) {
            pxsim.board().bus.listen(id, evid, handler);
        }
        pxtcore.registerWithDal = registerWithDal;
        function deepSleep() {
            // TODO?
            console.log("deep sleep requested");
        }
        pxtcore.deepSleep = deepSleep;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var BufferMethods;
    (function (BufferMethods) {
        function fnv1(data) {
            let h = 0x811c9dc5;
            for (let i = 0; i < data.length; ++i) {
                h = Math.imul(h, 0x1000193) ^ data[i];
            }
            return h;
        }
        function hash(buf, bits) {
            bits |= 0;
            if (bits < 1)
                return 0;
            const h = fnv1(buf.data);
            if (bits >= 32)
                return h >>> 0;
            else
                return ((h ^ (h >>> bits)) & ((1 << bits) - 1)) >>> 0;
        }
        BufferMethods.hash = hash;
    })(BufferMethods = pxsim.BufferMethods || (pxsim.BufferMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var control;
    (function (control) {
        control.runInParallel = pxsim.thread.runInBackground;
        control.delay = pxsim.thread.pause;
        function reset() {
            pxsim.Runtime.postMessage({
                type: "simulator",
                command: "restart",
                controlReset: true
            });
            const cb = pxsim.getResume();
        }
        control.reset = reset;
        function waitMicros(micros) {
            pxsim.thread.pause(micros / 1000); // it prempts not much we can do here.
        }
        control.waitMicros = waitMicros;
        function deviceName() {
            let b = pxsim.board();
            return b && b.id
                ? b.id.slice(0, 4)
                : "abcd";
        }
        control.deviceName = deviceName;
        function _ramSize() {
            return 32 * 1024 * 1024;
        }
        control._ramSize = _ramSize;
        function deviceSerialNumber() {
            let b = pxsim.board();
            if (!b)
                return 42;
            let n = 0;
            if (b.id) {
                n = parseInt(b.id.slice(1));
                if (isNaN(n)) {
                    n = 0;
                    for (let i = 0; i < b.id.length; ++i) {
                        n = ((n << 5) - n) + b.id.charCodeAt(i);
                        n |= 0;
                    }
                    n = Math.abs(n);
                }
            }
            if (!n)
                n = 42;
            return n;
        }
        control.deviceSerialNumber = deviceSerialNumber;
        function deviceLongSerialNumber() {
            let b = control.createBuffer(8);
            pxsim.BufferMethods.setNumber(b, pxsim.BufferMethods.NumberFormat.UInt32LE, 0, deviceSerialNumber());
            return b;
        }
        control.deviceLongSerialNumber = deviceLongSerialNumber;
        function deviceDalVersion() {
            return "sim";
        }
        control.deviceDalVersion = deviceDalVersion;
        function internalOnEvent(id, evid, handler) {
            pxsim.pxtcore.registerWithDal(id, evid, handler);
        }
        control.internalOnEvent = internalOnEvent;
        function waitForEvent(id, evid) {
            const cb = pxsim.getResume();
            pxsim.board().bus.wait(id, evid, cb);
        }
        control.waitForEvent = waitForEvent;
        function allocateNotifyEvent() {
            let b = pxsim.board();
            return b.bus.nextNotifyEvent++;
        }
        control.allocateNotifyEvent = allocateNotifyEvent;
        function raiseEvent(id, evid, mode) {
            // TODO mode?
            pxsim.board().bus.queue(id, evid);
        }
        control.raiseEvent = raiseEvent;
        function millis() {
            return pxsim.runtime.runningTime();
        }
        control.millis = millis;
        function micros() {
            return pxsim.runtime.runningTimeUs() & 0x3fffffff;
        }
        control.micros = micros;
        function delayMicroseconds(us) {
            control.delay(us / 0.001);
        }
        control.delayMicroseconds = delayMicroseconds;
        function createBuffer(size) {
            return pxsim.BufferMethods.createBuffer(size);
        }
        control.createBuffer = createBuffer;
        function dmesg(msg) {
            console.log(`DMESG: ${msg}`);
        }
        control.dmesg = dmesg;
        function setDebugFlags(flags) {
            console.log(`debug flags: ${flags}`);
        }
        control.setDebugFlags = setDebugFlags;
        function heapSnapshot() {
            console.log(pxsim.runtime.traceObjects());
        }
        control.heapSnapshot = heapSnapshot;
        function toStr(v) {
            if (v instanceof pxsim.RefRecord) {
                return `${v.vtable.name}@${v.id}`;
            }
            if (v instanceof pxsim.RefCollection) {
                let r = "[";
                for (let e of v.toArray()) {
                    if (r.length > 200) {
                        r += "...";
                        break;
                    }
                    r += toStr(e) + ", ";
                }
                r += "]";
                return r;
            }
            if (typeof v == "function") {
                return (v + "").slice(0, 60) + "...";
            }
            return v + "";
        }
        function dmesgPtr(msg, ptr) {
            console.log(`DMESG: ${msg} ${toStr(ptr)}`);
        }
        control.dmesgPtr = dmesgPtr;
        function dmesgValue(ptr) {
            console.log(`DMESG: ${toStr(ptr)}`);
        }
        control.dmesgValue = dmesgValue;
        function gc() { }
        control.gc = gc;
        function profilingEnabled() {
            return !!pxsim.runtime.perfCounters;
        }
        control.profilingEnabled = profilingEnabled;
        function __log(priority, str) {
            switch (priority) {
                case 0:
                    console.debug("d>" + str);
                    break;
                case 1:
                    console.log("l>" + str);
                    break;
                case 2:
                    console.warn("w>" + str);
                    break;
                case 3:
                    console.error("e>" + str);
                    break;
            }
            pxsim.runtime.board.writeSerial(str);
        }
        control.__log = __log;
        function heapDump() {
            // TODO something better
        }
        control.heapDump = heapDump;
        function isUSBInitialized() {
            return false;
        }
        control.isUSBInitialized = isUSBInitialized;
    })(control = pxsim.control || (pxsim.control = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        // general purpose message sending mechanism
        function sendMessage(channel, message, parentOnly) {
            if (!channel)
                return;
            pxsim.Runtime.postMessage({
                type: "messagepacket",
                broadcast: !parentOnly,
                channel: channel,
                data: message && message.data
            });
        }
        pxtcore.sendMessage = sendMessage;
        function peekMessageChannel() {
            const state = pxsim.getControlMessageState();
            const msg = state && state.peek();
            return msg && msg.channel;
        }
        pxtcore.peekMessageChannel = peekMessageChannel;
        function readMessageData() {
            const state = pxsim.getControlMessageState();
            const msg = state && state.read();
            return msg && new pxsim.RefBuffer(msg.data);
        }
        pxtcore.readMessageData = readMessageData;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    // keep in sync with ts
    pxsim.CONTROL_MESSAGE_EVT_ID = 2999;
    pxsim.CONTROL_MESSAGE_RECEIVED = 1;
    class ControlMessageState {
        constructor(board) {
            this.board = board;
            this.messages = [];
            this.enabled = false;
            this.board.addMessageListener(msg => this.messageHandler(msg));
        }
        messageHandler(msg) {
            if (msg.type == "messagepacket") {
                let packet = msg;
                this.enqueue(packet);
            }
        }
        enqueue(message) {
            this.messages.push(message);
            this.board.bus.queue(pxsim.CONTROL_MESSAGE_EVT_ID, pxsim.CONTROL_MESSAGE_RECEIVED);
        }
        peek() {
            return this.messages[0];
        }
        read() {
            return this.messages.shift();
        }
    }
    pxsim.ControlMessageState = ControlMessageState;
    function getControlMessageState() {
        return pxsim.board().controlMessageState;
    }
    pxsim.getControlMessageState = getControlMessageState;
})(pxsim || (pxsim = {}));
/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts" />
var pxsim;
(function (pxsim) {
    function board() {
        return pxsim.runtime && pxsim.runtime.board;
    }
    pxsim.board = board;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var loops;
    (function (loops) {
        loops.pause = pxsim.thread.pause;
        loops.forever = pxsim.thread.forever;
    })(loops = pxsim.loops || (pxsim.loops = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../core/dal.d.ts"/>
var pxsim;
(function (pxsim) {
    const DOUBLE_CLICK_TIME = 500;
    class CommonButton extends pxsim.Button {
        constructor() {
            super(...arguments);
            this._pressedTime = -1;
            this._clickedTime = -1;
        }
        setPressed(p) {
            if (this.pressed === p) {
                return;
            }
            this.pressed = p;
            if (p) {
                this._wasPressed = true;
                pxsim.board().bus.queue(this.id, 1 /* DAL.DEVICE_BUTTON_EVT_DOWN */);
                this._pressedTime = pxsim.runtime.runningTime();
            }
            else if (this._pressedTime !== -1) {
                pxsim.board().bus.queue(this.id, 2 /* DAL.DEVICE_BUTTON_EVT_UP */);
                const current = pxsim.runtime.runningTime();
                if (current - this._pressedTime >= 1000 /* DAL.DEVICE_BUTTON_LONG_CLICK_TIME */) {
                    pxsim.board().bus.queue(this.id, 4 /* DAL.DEVICE_BUTTON_EVT_LONG_CLICK */);
                }
                else {
                    pxsim.board().bus.queue(this.id, 3 /* DAL.DEVICE_BUTTON_EVT_CLICK */);
                }
                if (this._clickedTime !== -1) {
                    if (current - this._clickedTime <= DOUBLE_CLICK_TIME) {
                        pxsim.board().bus.queue(this.id, 6 /* DAL.DEVICE_BUTTON_EVT_DOUBLE_CLICK */);
                    }
                }
                this._clickedTime = current;
            }
        }
        wasPressed() {
            const temp = this._wasPressed;
            this._wasPressed = false;
            return temp;
        }
        pressureLevel() {
            // digital for now
            return this.isPressed() ? 512 : 0;
        }
        isPressed() {
            return this.pressed;
        }
    }
    pxsim.CommonButton = CommonButton;
    class CommonButtonState {
        constructor(buttons) {
            this.usesButtonAB = false;
            this.buttonsByPin = {};
            this.buttons = buttons || [
                new CommonButton(1 /* DAL.DEVICE_ID_BUTTON_A */),
                new CommonButton(2 /* DAL.DEVICE_ID_BUTTON_B */),
                new CommonButton(3 /* DAL.DEVICE_ID_BUTTON_AB */)
            ];
            this.buttons.forEach(btn => this.buttonsByPin[btn.id] = btn);
        }
    }
    pxsim.CommonButtonState = CommonButtonState;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function getButtonByPin(pinId) {
            let m = pxsim.board().buttonState.buttonsByPin;
            let b = m[pinId + ""];
            if (!b) {
                b = m[pinId + ""] = new pxsim.CommonButton(pinId);
            }
            return b;
        }
        pxtcore.getButtonByPin = getButtonByPin;
        function getButtonByPinCfg(key) {
            return getButtonByPin(pxtcore.getConfig(key, -1));
        }
        pxtcore.getButtonByPinCfg = getButtonByPinCfg;
        function getButton(buttonId) {
            const buttons = pxsim.board().buttonState.buttons;
            if (buttonId === 2) {
                pxsim.board().buttonState.usesButtonAB = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            if (buttonId < buttons.length && buttonId >= 0) {
                return buttons[buttonId];
            }
            // panic
            return undefined;
        }
        pxtcore.getButton = getButton;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var ButtonMethods;
    (function (ButtonMethods) {
        function onEvent(button, ev, body) {
            pxsim.pxtcore.registerWithDal(button.id, ev, body);
        }
        ButtonMethods.onEvent = onEvent;
        function isPressed(button) {
            return button.pressed;
        }
        ButtonMethods.isPressed = isPressed;
        function pressureLevel(button) {
            return button.pressureLevel();
        }
        ButtonMethods.pressureLevel = pressureLevel;
        function wasPressed(button) {
            return button.wasPressed();
        }
        ButtonMethods.wasPressed = wasPressed;
        function id(button) {
            return button.id;
        }
        ButtonMethods.id = id;
    })(ButtonMethods = pxsim.ButtonMethods || (pxsim.ButtonMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var DigitalInOutPinMethods;
    (function (DigitalInOutPinMethods) {
        function pushButton(pin) {
            return pxsim.pxtcore.getButtonByPin(pin.id);
        }
        DigitalInOutPinMethods.pushButton = pushButton;
    })(DigitalInOutPinMethods = pxsim.DigitalInOutPinMethods || (pxsim.DigitalInOutPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var network;
    (function (network) {
        function cableSendPacket(buf) {
            const state = pxsim.getCableState();
            state.send(buf);
        }
        network.cableSendPacket = cableSendPacket;
        function cablePacket() {
            const state = pxsim.getCableState();
            return (state.packet);
        }
        network.cablePacket = cablePacket;
        function onCablePacket(body) {
            const state = pxsim.getCableState();
            state.listen(body);
        }
        network.onCablePacket = onCablePacket;
        function onCableError(body) {
            const state = pxsim.getCableState();
            state.listenError(body);
        }
        network.onCableError = onCableError;
    })(network = pxsim.network || (pxsim.network = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class CableState {
        constructor() {
            // notify view that a packet was received
            this.packetReceived = false;
            // PULSE_IR_COMPONENT_ID = 0x2042;
            this.PULSE_CABLE_COMPONENT_ID = 0x2043;
            this.PULSE_PACKET_EVENT = 0x2;
            this.PULSE_PACKET_ERROR_EVENT = 0x3;
        }
        send(buf) {
            pxsim.Runtime.postMessage({
                type: "irpacket",
                packet: buf.data
            });
        }
        listen(body) {
            pxsim.pxtcore.registerWithDal(this.PULSE_CABLE_COMPONENT_ID, this.PULSE_PACKET_EVENT, body);
        }
        listenError(body) {
            pxsim.pxtcore.registerWithDal(this.PULSE_CABLE_COMPONENT_ID, this.PULSE_PACKET_ERROR_EVENT, body);
        }
        receive(buf) {
            this.packet = buf;
            this.packetReceived = true;
            pxsim.board().bus.queue(this.PULSE_CABLE_COMPONENT_ID, this.PULSE_PACKET_EVENT);
        }
    }
    pxsim.CableState = CableState;
    function getCableState() {
        return pxsim.board().cableState;
    }
    pxsim.getCableState = getCableState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    let ThresholdState;
    (function (ThresholdState) {
        ThresholdState[ThresholdState["High"] = 0] = "High";
        ThresholdState[ThresholdState["Low"] = 1] = "Low";
        ThresholdState[ThresholdState["Normal"] = 2] = "Normal";
    })(ThresholdState || (ThresholdState = {}));
    class AnalogSensorState {
        constructor(id, min = 0, max = 255, lowThreshold = 64, highThreshold = 192) {
            this.id = id;
            this.min = min;
            this.max = max;
            this.lowThreshold = lowThreshold;
            this.highThreshold = highThreshold;
            this.sensorUsed = false;
            this.state = ThresholdState.Normal;
            this.level = Math.ceil((max - min) / 2);
        }
        setUsed() {
            if (!this.sensorUsed) {
                this.sensorUsed = true;
                pxsim.runtime.queueDisplayUpdate();
            }
        }
        setLevel(level) {
            this.level = this.clampValue(level);
            if (this.level >= this.highThreshold) {
                this.setState(ThresholdState.High);
            }
            else if (this.level <= this.lowThreshold) {
                this.setState(ThresholdState.Low);
            }
            else {
                this.setState(ThresholdState.Normal);
            }
        }
        getLevel() {
            return this.level;
        }
        setLowThreshold(value) {
            this.lowThreshold = this.clampValue(value);
            this.highThreshold = Math.max(this.lowThreshold + 1, this.highThreshold);
        }
        setHighThreshold(value) {
            this.highThreshold = this.clampValue(value);
            this.lowThreshold = Math.min(this.highThreshold - 1, this.lowThreshold);
        }
        clampValue(value) {
            if (value < this.min) {
                return this.min;
            }
            else if (value > this.max) {
                return this.max;
            }
            return value;
        }
        setState(state) {
            if (this.state === state) {
                return;
            }
            this.state = state;
            switch (state) {
                case ThresholdState.High:
                    pxsim.board().bus.queue(this.id, 2 /* DAL.SENSOR_THRESHOLD_HIGH */);
                    break;
                case ThresholdState.Low:
                    pxsim.board().bus.queue(this.id, 1 /* DAL.SENSOR_THRESHOLD_LOW */);
                    break;
                case ThresholdState.Normal:
                    break;
            }
        }
    }
    pxsim.AnalogSensorState = AnalogSensorState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        function mkBtnSvg(xy) {
            let [innerCls, outerCls] = ["sim-button", "sim-button-outer"];
            const tabSize = visuals.PIN_DIST / 2.5;
            const pegR = visuals.PIN_DIST / 5;
            const btnR = visuals.PIN_DIST * .8;
            const pegMargin = visuals.PIN_DIST / 8;
            const plateR = visuals.PIN_DIST / 12;
            const pegOffset = pegMargin + pegR;
            let [x, y] = xy;
            const left = x - tabSize / 2;
            const top = y - tabSize / 2;
            const plateH = 3 * visuals.PIN_DIST - tabSize;
            const plateW = 2 * visuals.PIN_DIST + tabSize;
            const plateL = left;
            const plateT = top + tabSize;
            const btnCX = plateL + plateW / 2;
            const btnCY = plateT + plateH / 2;
            let btng = pxsim.svg.elt("g");
            //tabs
            const mkTab = (x, y) => {
                pxsim.svg.child(btng, "rect", { class: "sim-button-tab", x: x, y: y, width: tabSize, height: tabSize });
            };
            mkTab(left, top);
            mkTab(left + 2 * visuals.PIN_DIST, top);
            mkTab(left, top + 3 * visuals.PIN_DIST);
            mkTab(left + 2 * visuals.PIN_DIST, top + 3 * visuals.PIN_DIST);
            //plate
            pxsim.svg.child(btng, "rect", { class: outerCls, x: plateL, y: plateT, rx: plateR, ry: plateR, width: plateW, height: plateH });
            //pegs
            const mkPeg = (x, y) => {
                pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: x, cy: y, r: pegR });
            };
            mkPeg(plateL + pegOffset, plateT + pegOffset);
            mkPeg(plateL + plateW - pegOffset, plateT + pegOffset);
            mkPeg(plateL + pegOffset, plateT + plateH - pegOffset);
            mkPeg(plateL + plateW - pegOffset, plateT + plateH - pegOffset);
            //inner btn
            let innerBtn = pxsim.svg.child(btng, "circle", { class: innerCls, cx: btnCX, cy: btnCY, r: btnR });
            //return
            return { el: btng, y: top, x: left, w: plateW, h: plateH + 2 * tabSize };
        }
        visuals.mkBtnSvg = mkBtnSvg;
        visuals.BUTTON_PAIR_STYLE = `
            .sim-button {
                pointer-events: none;
                fill: #000;
            }
            .sim-button-outer:active ~ .sim-button,
            .sim-button-virtual:active {
                fill: #FFA500;
            }
            .sim-button-outer {
                cursor: pointer;
                fill: #979797;
            }
            .sim-button-outer:hover {
                stroke:gray;
                stroke-width: ${visuals.PIN_DIST / 5}px;
            }
            .sim-button-nut {
                fill:#000;
                pointer-events:none;
            }
            .sim-button-nut:hover {
                stroke:${visuals.PIN_DIST / 15}px solid #704A4A;
            }
            .sim-button-tab {
                fill:#FFF;
                pointer-events:none;
            }
            .sim-button-virtual {
                cursor: pointer;
                fill: rgba(255, 255, 255, 0.6);
                stroke: rgba(255, 255, 255, 1);
                stroke-width: ${visuals.PIN_DIST / 5}px;
            }
            .sim-button-virtual:hover {
                stroke: rgba(128, 128, 128, 1);
            }
            .sim-text-virtual {
                fill: #000;
                pointer-events:none;
            }
            `;
        class ButtonPairView {
            constructor() {
                this.style = visuals.BUTTON_PAIR_STYLE;
            }
            init(bus, state) {
                this.state = state;
                this.bus = bus;
                this.defs = [];
                this.element = this.mkBtns();
                this.updateState();
                this.attachEvents();
            }
            moveToCoord(xy) {
                let btnWidth = visuals.PIN_DIST * 3;
                let [x, y] = xy;
                visuals.translateEl(this.aBtn, [x, y]);
                visuals.translateEl(this.bBtn, [x + btnWidth, y]);
                visuals.translateEl(this.abBtn, [x + visuals.PIN_DIST * 1.5, y + visuals.PIN_DIST * 4]);
            }
            updateState() {
                let stateBtns = [this.state.aBtn, this.state.bBtn, this.state.abBtn];
                let svgBtns = [this.aBtn, this.bBtn, this.abBtn];
                if (this.state.usesButtonAB && this.abBtn.style.visibility != "visible") {
                    this.abBtn.style.visibility = "visible";
                }
            }
            updateTheme() { }
            mkBtns() {
                this.aBtn = mkBtnSvg([0, 0]).el;
                this.bBtn = mkBtnSvg([0, 0]).el;
                const mkVirtualBtn = () => {
                    const numPins = 2;
                    const w = visuals.PIN_DIST * 2.8;
                    const offset = (w - (numPins * visuals.PIN_DIST)) / 2;
                    const corner = visuals.PIN_DIST / 2;
                    const cx = 0 - offset + w / 2;
                    const cy = cx;
                    const txtSize = visuals.PIN_DIST * 1.3;
                    const x = -offset;
                    const y = -offset;
                    const txtXOff = visuals.PIN_DIST / 7;
                    const txtYOff = visuals.PIN_DIST / 10;
                    let btng = pxsim.svg.elt("g");
                    let btn = pxsim.svg.child(btng, "rect", { class: "sim-button-virtual", x: x, y: y, rx: corner, ry: corner, width: w, height: w });
                    let btnTxt = visuals.mkTxt(cx + txtXOff, cy + txtYOff, txtSize, 0, "A+B");
                    pxsim.U.addClass(btnTxt, "sim-text");
                    pxsim.U.addClass(btnTxt, "sim-text-virtual");
                    btng.appendChild(btnTxt);
                    return btng;
                };
                this.abBtn = mkVirtualBtn();
                this.abBtn.style.visibility = "hidden";
                let el = pxsim.svg.elt("g");
                pxsim.U.addClass(el, "sim-buttonpair");
                el.appendChild(this.aBtn);
                el.appendChild(this.bBtn);
                el.appendChild(this.abBtn);
                return el;
            }
            attachEvents() {
                let btnStates = [this.state.aBtn, this.state.bBtn];
                let btnSvgs = [this.aBtn, this.bBtn];
                btnSvgs.forEach((btn, index) => {
                    pxsim.pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                        btnStates[index].pressed = true;
                    }));
                    btn.addEventListener(pxsim.pointerEvents.leave, ev => {
                        btnStates[index].pressed = false;
                    });
                    btn.addEventListener(pxsim.pointerEvents.up, ev => {
                        btnStates[index].pressed = false;
                        this.bus.queue(btnStates[index].id, this.state.props.BUTTON_EVT_UP);
                        this.bus.queue(btnStates[index].id, this.state.props.BUTTON_EVT_CLICK);
                    });
                });
                let updateBtns = (s) => {
                    btnStates.forEach(b => b.pressed = s);
                };
                pxsim.pointerEvents.down.forEach(evid => this.abBtn.addEventListener(evid, ev => {
                    updateBtns(true);
                }));
                this.abBtn.addEventListener(pxsim.pointerEvents.leave, ev => {
                    updateBtns(false);
                });
                this.abBtn.addEventListener(pxsim.pointerEvents.up, ev => {
                    updateBtns(false);
                    this.bus.queue(this.state.abBtn.id, this.state.props.BUTTON_EVT_UP);
                    this.bus.queue(this.state.abBtn.id, this.state.props.BUTTON_EVT_CLICK);
                });
            }
        }
        visuals.ButtonPairView = ButtonPairView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    let PinFlags;
    (function (PinFlags) {
        PinFlags[PinFlags["Unused"] = 0] = "Unused";
        PinFlags[PinFlags["Digital"] = 1] = "Digital";
        PinFlags[PinFlags["Analog"] = 2] = "Analog";
        PinFlags[PinFlags["Input"] = 4] = "Input";
        PinFlags[PinFlags["Output"] = 8] = "Output";
        PinFlags[PinFlags["Touch"] = 16] = "Touch";
    })(PinFlags = pxsim.PinFlags || (pxsim.PinFlags = {}));
    class Pin {
        constructor(id) {
            this.id = id;
            this.touched = false;
            this.value = 0;
            this.period = 0;
            this.servoAngle = 0;
            this.mode = PinFlags.Unused;
            this.pitch = false;
            this.pull = 0; // PullDown
            this.eventMode = 0;
            this.used = false;
        }
        setValue(value) {
            // value set from the simulator
            const old = this.value;
            this.value = value;
            const b = pxsim.board();
            if (b && this.eventMode == 2 /* DAL.DEVICE_PIN_EVENT_ON_EDGE */ && old != this.value)
                b.bus.queue(this.id, this.value > 0 ? 2 /* DAL.DEVICE_PIN_EVT_RISE */ : 3 /* DAL.DEVICE_PIN_EVT_FALL */);
        }
        digitalReadPin() {
            this.mode = PinFlags.Digital | PinFlags.Input;
            return this.value > 100 ? 1 : 0;
        }
        digitalWritePin(value) {
            const b = pxsim.board();
            this.mode = PinFlags.Digital | PinFlags.Output;
            const v = this.value;
            this.value = value > 0 ? 1023 : 0;
            pxsim.runtime.queueDisplayUpdate();
        }
        setPull(pull) {
            this.pull = pull;
            switch (pull) {
                case 2 /*PinPullMode.PullDown*/:
                    this.value = 0;
                    break;
                case 1 /*PinPullMode.PullUp*/:
                    this.value = 1023;
                    break;
                default:
                    this.value = pxsim.Math_.randomRange(0, 1023);
                    break;
            }
        }
        analogReadPin() {
            this.mode = PinFlags.Analog | PinFlags.Input;
            return this.value || 0;
        }
        analogWritePin(value) {
            const b = pxsim.board();
            this.mode = PinFlags.Analog | PinFlags.Output;
            const v = this.value;
            this.value = Math.max(0, Math.min(1023, value));
            pxsim.runtime.queueDisplayUpdate();
        }
        analogSetPeriod(micros) {
            this.mode = PinFlags.Analog | PinFlags.Output;
            this.period = micros;
            pxsim.runtime.queueDisplayUpdate();
        }
        servoWritePin(value) {
            this.analogSetPeriod(20000);
            this.servoAngle = Math.max(0, Math.min(180, value));
            pxsim.runtime.queueDisplayUpdate();
        }
        servoSetContinuous(continuous) {
            this.servoContinuous = continuous;
        }
        servoSetPulse(pinId, micros) {
            // TODO
        }
        isTouched() {
            this.mode = PinFlags.Touch | PinFlags.Analog | PinFlags.Input;
            return this.touched;
        }
        onEvent(ev, handler) {
            const b = pxsim.board();
            switch (ev) {
                case 4 /* DAL.DEVICE_PIN_EVT_PULSE_HI */:
                case 5 /* DAL.DEVICE_PIN_EVT_PULSE_LO */:
                    this.eventMode = 3 /* DAL.DEVICE_PIN_EVENT_ON_PULSE */;
                    break;
                case 2 /* DAL.DEVICE_PIN_EVT_RISE */:
                case 3 /* DAL.DEVICE_PIN_EVT_FALL */:
                    this.eventMode = 2 /* DAL.DEVICE_PIN_EVENT_ON_EDGE */;
                    break;
                default:
                    return;
            }
            b.bus.listen(this.id, ev, handler);
        }
    }
    pxsim.Pin = Pin;
    class SerialDevice {
        constructor(tx, rx, id) {
            this.tx = tx;
            this.rx = rx;
            this.id = id;
            this.baudRate = 115200;
            this.setRxBufferSize(64);
            this.setTxBufferSize(64);
        }
        setTxBufferSize(size) {
            this.txBuffer = pxsim.control.createBuffer(size);
        }
        setRxBufferSize(size) {
            this.rxBuffer = pxsim.control.createBuffer(size);
        }
        read() {
            return -1;
        }
        readBuffer() {
            const buf = pxsim.control.createBuffer(0);
            return buf;
        }
        writeBuffer(buffer) {
        }
        setBaudRate(rate) {
            this.baudRate = rate;
        }
        redirect(tx, rx, rate) {
            this.tx = tx;
            this.rx = rx;
            this.baudRate = rate;
        }
        onEvent(event, handler) {
            pxsim.control.internalOnEvent(this.id, event, handler);
        }
        onDelimiterReceived(delimiter, handler) {
            // TODO
        }
    }
    pxsim.SerialDevice = SerialDevice;
    class SPI {
        constructor(mosi, miso, sck) {
            this.mosi = mosi;
            this.miso = miso;
            this.sck = sck;
            this.frequency = 250000;
            this.mode = 0;
        }
        write(value) {
            return 0;
        }
        transfer(command, response) {
        }
        setFrequency(frequency) {
            this.frequency = frequency;
        }
        setMode(mode) {
            this.mode = mode;
        }
    }
    pxsim.SPI = SPI;
    class I2C {
        constructor(sda, scl) {
            this.sda = sda;
            this.scl = scl;
        }
        readBuffer(address, size, repeat) {
            return pxsim.control.createBuffer(0);
        }
        writeBuffer(address, buf, repeat) {
            return 0;
        }
    }
    pxsim.I2C = I2C;
    class EdgeConnectorState {
        constructor(props) {
            this.props = props;
            this._i2cs = [];
            this._spis = [];
            this._serials = [];
            this.pins = props.pins.map(id => id != undefined ? new Pin(id) : null);
        }
        getPin(id) {
            return this.pins.filter(p => p && p.id == id)[0] || null;
        }
        createI2C(sda, scl) {
            let ser = this._i2cs.filter(s => s.sda == sda && s.scl == scl)[0];
            if (!ser)
                this._i2cs.push(ser = new I2C(sda, scl));
            return ser;
        }
        createSPI(mosi, miso, sck) {
            let ser = this._spis.filter(s => s.mosi == mosi && s.miso == miso && s.sck == sck)[0];
            if (!ser)
                this._spis.push(ser = new SPI(mosi, miso, sck));
            return ser;
        }
        createSerialDevice(tx, rx, id) {
            let ser = this._serials.filter(s => s.tx == tx && s.rx == rx)[0];
            if (!ser)
                this._serials.push(ser = new SerialDevice(tx, rx, id));
            return ser;
        }
    }
    pxsim.EdgeConnectorState = EdgeConnectorState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var configStorage;
    (function (configStorage) {
        function setBuffer(key, value) {
            // TODO
        }
        configStorage.setBuffer = setBuffer;
        function getBuffer(key) {
            // TODO
            return undefined;
        }
        configStorage.getBuffer = getBuffer;
        function removeItem(key) {
            // TODO
        }
        configStorage.removeItem = removeItem;
        function clear() {
            // TODO
        }
        configStorage.clear = clear;
    })(configStorage = pxsim.configStorage || (pxsim.configStorage = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        const LED_PART_XOFF = -8;
        const LED_PART_YOFF = -7;
        const LED_PART_WIDTH = 68;
        const LED_PART_HEIGHT = 180;
        const LED_PART = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 33.6 90" width="33.599998" height="90">
    <path class="st0" d="M1.3 65.000002v5.9C1.3 74.800002 4.5 78 8.4 78c3.9 0 7.1-3.199998 7.1-7.099998v-13.7c-1.9-1.9-4.4-2.9-7.1-2.8-4.6 0-8.4 2.6-8.4 5.9v1.5c0 1.2.5 2.3 1.3 3.2z" id="path5" opacity=".65" fill="#ececec"/>
    <g id="g7" transform="translate(0 10.900002)">
      <path class="st1" d="M12.7 49.6l1.2 1.4h-1l-2.4-1.4V15c0-.3.5-.5 1.1-.5.6 0 1.1.2 1.1.5z" id="path9" fill="#8c8c8c"/>
      <path class="st1" d="M2.6 42.9c0 .7 1.1 1.3 2.1 1.8.4.2 1.2.6 1.2.9V49l-2.5 2h.9L8 49v-3.5c0-.7-.9-1.2-1.9-1.7-.4-.2-1.3-.8-1.3-1.1v-52.9c0-.4-.5-.7-1.1-.7-.6 0-1.1.3-1.1.7z" id="path11" fill="#8c8c8c"/>
      <path class="sim-led-main" d="M1.3 54.1V60c0 3.9 3.2 7.1 7.1 7.1 3.9 0 7.1-3.2 7.1-7.1V46.3c-1.9-1.9-4.4-2.9-7.1-2.8-4.6 0-8.4 2.6-8.4 5.9v1.5c0 1.2.5 2.3 1.3 3.2z" id="LED" opacity=".3" fill="#ccc"/>
      <path class="st3" d="M1.3 54.1V51c0-2.7 3.2-5 7.1-5 3.9 0 7.1 2.2 7.1 5v-4.6c-1.9-1.9-4.4-2.9-7.1-2.8-4.6 0-8.4 2.6-8.4 5.9V51c0 1.1.5 2.2 1.3 3.1z" id="path15" opacity=".9" fill="#d1d1d1"/>
      <path class="st4" d="M1.3 54.1V51c0-2.7 3.2-5 7.1-5 3.9 0 7.1 2.2 7.1 5v-4.6c-1.9-1.9-4.4-2.9-7.1-2.8-4.6 0-8.4 2.6-8.4 5.9V51c0 1.1.5 2.2 1.3 3.1z" id="path17" opacity=".7" fill="#e6e6e6"/>
      <path class="st5" d="M1.3 54.1V51c0-2.7 3.2-5 7.1-5 3.9 0 7.1 2.2 7.1 5v-3.1c-1.9-1.9-4.4-2.9-7.1-2.8C3.8 45.1 0 47.7 0 51c0 1.1.5 2.2 1.3 3.1z" id="path19" opacity=".25" fill="#e6e6e6"/>
      <ellipse class="st5" cx="8.3" cy="51" rx="7.1" ry="5" id="ellipse21" opacity=".25" fill="#e6e6e6"/>
      <ellipse class="st5" cx="8.3" cy="51" rx="7.1" ry="5" id="ellipse23" opacity=".25" fill="#e6e6e6"/>
      <g class="st8" id="g29" transform="translate(0 -12)" opacity=".61">
        <path class="st9" d="M8.3 57.1c4.3 0 6.1 2 6.1 2l-.7.7s-1.6-1.7-5.4-1.7C5.9 58 3.6 59 2 60.8l-.8-.6c1.9-2.1 4.4-3.2 7.1-3.1z" id="path31" fill="#fff"/>
      </g>
      <g class="st8" id="g33" transform="translate(0 -12)" opacity=".61">
        <path class="st9" d="M12.9 75.9c1.1-1.1 1.7-2.6 1.7-4.2V61.4l-1.9-1.5v10.4c.9 2.8.3 4.2-.7 5.2.3.1.6.2.9.4z" id="path35" fill="#fff"/>
        <path class="st9" d="M5.6 77.5l.3-.9c-1.5-.7-2.6-2.1-2.8-3.7h-1c.3 2 1.6 3.7 3.5 4.6z" id="path37" fill="#fff"/>
      </g>
      <text style="line-height:1.25;-inkscape-font-specification:consolas" x="14.103056" y=".224915" id="text4514" font-weight="400" font-size="7.744442" font-family="consolas" letter-spacing="0" word-spacing="0" fill="#666" stroke-width=".968055">
        <tspan id="tspan4512" x="14.103056" y=".224915">330Ω</tspan>
      </text>
      <text style="line-height:1.25;-inkscape-font-specification:consolas" x="1.868053" y="77.579796" id="text4524" font-weight="400" font-size="32.793365" font-family="consolas" letter-spacing="0" word-spacing="0" stroke-width=".819834">
        <tspan id="tspan4522" x="1.868053" y="77.579796" font-size="10.931121"></tspan>
      </text>
    </g>
    <g id="g39" transform="translate(0 -1.099998)">
      <path class="st1" id="rect41" fill="#8c8c8c" d="M11.6 16.9h21.700001v1.9H11.6z"/>
      <g id="g43">
        <path class="st10" id="rect45" fill="none" d="M12 16.9h3.2v1.9H12z"/>
        <path class="st11" d="M19 15c-.3-.2-.6-.3-.9-.3h-1.4c-.3 0-.5.3-.5.7v4.9c0 .4.2.7.5.7h1.4c.3 0 .6-.1.9-.3.3-.2.6-.3.9-.3h5c.3 0 .6.1.9.3h.1c.3.2.6.3.9.3h1.4c.3 0 .5-.3.5-.7v-4.9c0-.4-.2-.7-.5-.7h-1.4c-.3 0-.6.1-.9.3h-.1c-.3.2-.6.3-.9.3h-5c-.2 0-.5-.1-.9-.3z" id="path47" fill="#d6bf90"/>
        <path class="st12" d="M28.4 18.5c-.1.1-.1.2-.2.3-.3.5-.7.8-1.2.8s-.9-.1-1.4-.3c-.6-.1-1.1-.1-1.7-.1-2 0-3.9 0-5.9.2-.4.1-.8 0-1.1-.1-.2-.1-.4-.2-.5-.5v1.5c0 .2.1.3.2.3H18c.3 0 .6-.1.9-.3.3-.2.7-.3 1.1-.3h5c.4 0 .8.1 1.1.3.3.1.6.2.8.2h1.4c.1 0 .2-.1.2-.3v-1.9c0 .1-.1.2-.1.2z" id="path49" fill="#aa936b"/>
        <g id="g51">
          <path class="st13" id="rect53" fill="#ad9f4e" d="M27.200001 14.7h.7v6.2h-.7z"/>
          <path class="st14" id="rect55" opacity=".4" d="M27.200001 17.799999h.7v2.5h-.7z"/>
          <path class="st15" id="rect57" opacity=".5" fill="#ff3" d="M27.200001 15h.7v1.3h-.7z"/>
          <path class="st16" id="rect59" opacity=".5" fill="#fff" d="M27.200001 15.3h.7v.7h-.7z"/>
        </g>
        <path class="st17" id="rect61" fill="#aa4518" d="M23.1 15.3h1.3v5.1h-1.3z"/>
        <path class="st18" id="rect63" fill="#ff9700" d="M20.6 15.3h1.3v5.1h-1.3z"/>
        <path class="st18" d="M19.3 15.1c-.1 0-.1-.1-.2-.1-.3-.2-.6-.3-.9-.3H18V21h.1c.3 0 .6-.1.9-.3.1 0 .1-.1.2-.1v-5.5z" id="path65" fill="#ff9700"/>
        <path class="st19" d="M18.7 15.7c.4.1.8.2 1.2.2H21c1.2-.1 2.4-.1 3.6 0 .4 0 .9 0 1.3-.1.3-.1.6-.2.8-.3.6-.2 1.2-.3 1.8-.2 0-.1-.1-.3-.2-.3h-1.4c-.3 0-.6.1-.9.3-.3.2-.7.3-1.1.3h-5c-.4 0-.8-.1-1.1-.3-.3-.1-.6-.2-.8-.2h-1.4c-.1 0-.2.1-.2.3v.2c.8-.1 1.5 0 2.3.1z" id="path67" opacity=".74" fill="#fffdfa"/>
      </g>
    </g>
  </svg>
      `;
        // For the intructions
        function mkLedPart(xy = [0, 0]) {
            let [x, y] = xy;
            let l = x + LED_PART_XOFF;
            let t = y + LED_PART_YOFF;
            let w = LED_PART_WIDTH;
            let h = LED_PART_HEIGHT;
            let img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-led", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(LED_PART)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkLedPart = mkLedPart;
        class LedView {
            constructor(parsePinString) {
                this.color = "rgb(0,255,0)"; // green color by default
                this.parsePinString = parsePinString;
            }
            init(bus, state, svgEl, otherParams) {
                this.pin = this.parsePinString(otherParams["name"] || otherParams["pin"]);
                this.bus = bus;
                this.initDom();
                this.updateState();
            }
            initDom() {
                this.element = pxsim.svg.elt("g");
                const image = new DOMParser().parseFromString(LED_PART, "image/svg+xml").querySelector("svg");
                pxsim.svg.hydrate(image, {
                    class: "sim-led", width: LED_PART_WIDTH, height: LED_PART_HEIGHT,
                });
                this.led = image.getElementById('LED');
                this.text = image.getElementById('tspan4522');
                this.element.appendChild(image);
            }
            moveToCoord(xy) {
                visuals.translateEl(this.element, [xy[0] + LED_PART_XOFF, xy[1] + LED_PART_YOFF]);
            }
            updateTheme() {
            }
            updateState() {
                if (this.currentValue === this.pin.value && this.currentMode == this.pin.mode)
                    return;
                this.currentValue = this.pin.value;
                this.currentMode = this.pin.mode;
                const style = this.led.style;
                if (this.currentMode & pxsim.PinFlags.Digital) {
                    style.fill = this.currentValue ? "#00ff00" : "#ffffff";
                    style.opacity = "0.9";
                    this.text.textContent = this.currentValue ? "1" : "0";
                }
                else {
                    style.fill = "#00ff00";
                    style.opacity = (0.1 + Math.max(0, Math.min(1023, this.currentValue)) / 1023 * 0.8).toString();
                    this.text.textContent = `~${this.currentValue}`;
                }
            }
        }
        visuals.LedView = LedView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        function createMicroServoElement() {
            return pxsim.svg.parseString(`
        <svg xmlns="http://www.w3.org/2000/svg" id="svg2" width="112.188" height="299.674">
          <g id="layer1" stroke-linecap="round" stroke-linejoin="round" transform="scale(0.8)">
            <path id="path8212" fill="#0061ff" stroke-width="6.6" d="M.378 44.61v255.064h112.188V44.61H.378z"/>
            <path id="crankbase" fill="#00f" stroke-width="6.6" d="M56.57 88.047C25.328 88.047 0 113.373 0 144.615c.02 22.352 11.807 42.596 32.238 51.66.03 3.318.095 5.24.088 7.938 0 13.947 11.307 25.254 25.254 25.254 13.947 0 25.254-11.307 25.254-25.254-.006-2.986-.415-5.442-.32-8.746 19.487-9.45 30.606-29.195 30.625-50.852 0-31.24-25.33-56.568-56.57-56.568z"/>
            <path id="lowertip" fill="#00a2ff" stroke-width="2" d="M.476 260.78v38.894h53.82v-10.486a6.82 6.566 0 0 1-4.545-6.182 6.82 6.566 0 0 1 6.82-6.566 6.82 6.566 0 0 1 6.82 6.566 6.82 6.566 0 0 1-4.545 6.182v10.486h53.82V260.78H.475z"/>
            <path id="uppertip" fill="#00a2ff" stroke-width="2" d="M112.566 83.503V44.61h-53.82v10.487a6.82 6.566 0 0 1 4.544 6.18 6.82 6.566 0 0 1-6.818 6.568 6.82 6.566 0 0 1-6.82-6.567 6.82 6.566 0 0 1 4.546-6.18V44.61H.378v38.893h112.188z"/>
            <path id="VCC" fill="red" stroke-width="2" d="M53.72 21.93h5.504v22.627H53.72z"/>
            <path id="LOGIC" fill="#fc0" stroke-width="2" d="M47.3 21.93h5.503v22.627H47.3z"/>
            <path id="GND" fill="#a02c2c" stroke-width="2" d="M60.14 21.93h5.505v22.627H60.14z"/>
            <path id="connector" stroke-width="2" d="M45.064 0a1.488 1.488 0 0 0-1.488 1.488v24.5a1.488 1.488 0 0 0 1.488 1.487h22.71a1.488 1.488 0 0 0 1.49-1.488v-24.5A1.488 1.488 0 0 0 67.774 0h-22.71z"/>
            <g id="crank" transform="translate(0 -752.688)">
              <path id="arm" fill="#ececec" stroke="#000" stroke-width="1.372" d="M47.767 880.88c-4.447 1.162-8.412 8.278-8.412 18.492s3.77 18.312 8.412 18.494c8.024.314 78.496 5.06 78.51-16.952.012-22.013-74.377-21.117-78.51-20.035z"/>
              <circle id="path8216" cx="56.661" cy="899.475" r="8.972" fill="gray" stroke-width="2"/>
            </g>
          </g>
        </svg>
                    `).firstElementChild;
        }
        function mkMicroServoPart(xy = [0, 0]) {
            return { el: createMicroServoElement(), x: xy[0], y: xy[1], w: 112.188, h: 299.674 };
        }
        visuals.mkMicroServoPart = mkMicroServoPart;
        const SPEED = 300; // 0.1s/60 degree
        class MicroServoView {
            constructor() {
                this.style = "";
                this.overElement = undefined;
                this.defs = [];
                this.currentAngle = 0;
                this.targetAngle = 0;
                this.lastAngleTime = 0;
            }
            init(bus, state, svgEl, otherParams) {
                this.state = state;
                this.pin = this.state.props.servos[pxsim.readPin(otherParams["name"] || otherParams["pin"])];
                this.bus = bus;
                this.defs = [];
                this.initDom();
                this.updateState();
            }
            initDom() {
                this.element = createMicroServoElement();
                this.crankEl = this.element.querySelector("#crank");
                this.crankTransform = this.crankEl.getAttribute("transform");
            }
            moveToCoord(xy) {
                let [x, y] = xy;
                visuals.translateEl(this.element, [x, y]);
            }
            updateState() {
                const p = this.state.getPin(this.pin);
                const continuous = !!p.servoContinuous;
                const servoAngle = p.servoAngle;
                if (continuous) {
                    // for a continuous servo, the angle is interpreted as a rotation speed
                    // 0 -> -100%, 90 - 0%, 180 - 100%
                    const now = pxsim.U.now();
                    const dt = Math.min(now - this.lastAngleTime, 50) / 1000;
                    this.currentAngle = this.targetAngle;
                    this.targetAngle += ((servoAngle - 90) / 90) * SPEED * dt;
                }
                else {
                    this.targetAngle = 180.0 - servoAngle;
                }
                if (this.targetAngle != this.currentAngle)
                    this.renderAngle();
            }
            renderAngle() {
                const now = pxsim.U.now();
                const cx = 56.661;
                const cy = 899.475;
                const dt = Math.min(now - this.lastAngleTime, 50) / 1000;
                const delta = this.targetAngle - this.currentAngle;
                this.currentAngle += Math.min(Math.abs(delta), SPEED * dt) * (delta > 0 ? 1 : -1);
                this.crankEl.setAttribute("transform", this.crankTransform
                    + ` rotate(${this.currentAngle}, ${cx}, ${cy})`);
                this.lastAngleTime = now;
                setTimeout(() => pxsim.runtime.updateDisplay(), 20);
            }
            updateTheme() {
            }
        }
        visuals.MicroServoView = MicroServoView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    let NeoPixelMode;
    (function (NeoPixelMode) {
        NeoPixelMode[NeoPixelMode["RGB"] = 1] = "RGB";
        NeoPixelMode[NeoPixelMode["RGBW"] = 2] = "RGBW";
        NeoPixelMode[NeoPixelMode["RGB_RGB"] = 3] = "RGB_RGB";
        NeoPixelMode[NeoPixelMode["DotStar"] = 4] = "DotStar";
    })(NeoPixelMode = pxsim.NeoPixelMode || (pxsim.NeoPixelMode = {}));
    class CommonNeoPixelState {
        constructor() {
            this.mode = NeoPixelMode.RGB; // GRB
            this.width = 1;
        }
        get length() {
            return this.buffer ? (this.buffer.length / this.stride) | 0 : 0;
        }
        get stride() {
            return this.mode == NeoPixelMode.RGBW || this.mode == NeoPixelMode.DotStar ? 4 : 3;
        }
        pixelColor(pixel) {
            const offset = pixel * this.stride;
            // RBG
            switch (this.mode) {
                case NeoPixelMode.RGBW:
                    return [this.buffer[offset + 1], this.buffer[offset], this.buffer[offset + 2], this.buffer[offset + 3]];
                case NeoPixelMode.RGB_RGB:
                    return [this.buffer[offset], this.buffer[offset + 1], this.buffer[offset + 2]];
                case NeoPixelMode.DotStar:
                    return [this.buffer[offset + 3], this.buffer[offset + 2], this.buffer[offset + 1]];
                default:
                    return [this.buffer[offset + 1], this.buffer[offset + 0], this.buffer[offset + 2]];
            }
        }
    }
    pxsim.CommonNeoPixelState = CommonNeoPixelState;
    function neopixelState(pinId) {
        return pxsim.board().neopixelState(pinId);
    }
    pxsim.neopixelState = neopixelState;
    function sendBufferAsm(buffer, pin) {
        const b = pxsim.board();
        if (!b)
            return;
        const p = b.edgeConnectorState.getPin(pin);
        if (!p)
            return;
        const lp = neopixelState(p.id);
        if (!lp)
            return;
        const mode = lp.mode;
        pxsim.light.sendBuffer(p, undefined, mode, buffer);
    }
    pxsim.sendBufferAsm = sendBufferAsm;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var light;
    (function (light) {
        // Currently only modifies the builtin pixels
        function sendBuffer(pin, clk, mode, b) {
            const state = pxsim.neopixelState(pin.id);
            if (!state)
                return;
            state.mode = mode & 0xff;
            state.buffer = b.data;
            pxsim.runtime.queueDisplayUpdate();
        }
        light.sendBuffer = sendBuffer;
    })(light = pxsim.light || (pxsim.light = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var visuals;
    (function (visuals) {
        const PIXEL_SPACING = visuals.PIN_DIST * 2.5; // 3
        const PIXEL_RADIUS = visuals.PIN_DIST;
        const CANVAS_WIDTH = 1.2 * visuals.PIN_DIST;
        const CANVAS_HEIGHT = 12 * visuals.PIN_DIST;
        const CANVAS_VIEW_PADDING = visuals.PIN_DIST * 4;
        const CANVAS_LEFT = 1.4 * visuals.PIN_DIST;
        const CANVAS_TOP = visuals.PIN_DIST;
        // For the instructions parts list
        function mkNeoPixelPart(xy = [0, 0]) {
            const NP_PART_XOFF = -13.5;
            const NP_PART_YOFF = -11;
            const NP_PART_WIDTH = 87.5;
            const NP_PART_HEIGHT = 190;
            const NEOPIXEL_PART_IMG = `<svg viewBox="-5 -1 53 112" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
  <rect x="2.5" width="38" height="100" style="fill: rgb(68, 68, 68);"/>
  <rect x="11.748" y="3.2" width="1.391" height="2.553" style="fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);"/>
  <rect x="20.75" y="3.2" width="1.391" height="2.553" style="fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);"/>
  <rect x="29.75" y="3.2" width="1.391" height="2.553" style="fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);"/>
  <g>
    <rect x="9" y="16.562" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="9" y="22.562" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="9" y="28.563" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="11.607" y="14.833" width="19.787" height="18.697" style="fill: rgb(0, 0, 0);"/>
    <ellipse style="fill: rgb(216, 216, 216);" cx="21.5" cy="24.181" rx="7" ry="7"/>
  </g>
  <path d="M -7.25 -103.2 L -2.5 -100.003 L -12 -100.003 L -7.25 -103.2 Z" style="fill: rgb(68, 68, 68);" transform="matrix(-1, 0, 0, -1, 0, 0)" bx:shape="triangle -12 -103.2 9.5 3.197 0.5 0 1@ad6f5cac"/>
  <path d="M -16.75 -103.197 L -12 -100 L -21.5 -100 L -16.75 -103.197 Z" style="fill: rgb(68, 68, 68);" transform="matrix(-1, 0, 0, -1, 0, 0)" bx:shape="triangle -21.5 -103.197 9.5 3.197 0.5 0 1@07d73149"/>
  <path d="M -26.25 -103.2 L -21.5 -100.003 L -31 -100.003 L -26.25 -103.2 Z" style="fill: rgb(68, 68, 68);" transform="matrix(-1, 0, 0, -1, 0, 0)" bx:shape="triangle -31 -103.2 9.5 3.197 0.5 0 1@54403e2d"/>
  <path d="M -35.75 -103.197 L -31 -100 L -40.5 -100 L -35.75 -103.197 Z" style="fill: rgb(68, 68, 68);" transform="matrix(-1, 0, 0, -1, 0, 0)" bx:shape="triangle -40.5 -103.197 9.5 3.197 0.5 0 1@21c9b772"/>
  <g transform="matrix(1, 0, 0, 1, 0.000002, 29.999994)">
    <rect x="9" y="16.562" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="9" y="22.562" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="9" y="28.563" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="11.607" y="14.833" width="19.787" height="18.697" style="fill: rgb(0, 0, 0);"/>
    <ellipse style="fill: rgb(216, 216, 216);" cx="21.5" cy="24.181" rx="7" ry="7"/>
  </g>
  <g transform="matrix(1, 0, 0, 1, 0.000005, 59.999992)">
    <rect x="9" y="16.562" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="9" y="22.562" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="9" y="28.563" width="25" height="3.238" style="fill: rgb(216, 216, 216);"/>
    <rect x="11.607" y="14.833" width="19.787" height="18.697" style="fill: rgb(0, 0, 0);"/>
    <ellipse style="fill: rgb(216, 216, 216);" cx="21.5" cy="24.181" rx="7" ry="7"/>
  </g>
</svg>`;
            let [x, y] = xy;
            let l = x + NP_PART_XOFF;
            let t = y + NP_PART_YOFF;
            let w = NP_PART_WIDTH;
            let h = NP_PART_HEIGHT;
            let img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-neopixel-strip", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(NEOPIXEL_PART_IMG)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkNeoPixelPart = mkNeoPixelPart;
        class NeoPixel {
            constructor(xy = [0, 0], width = 1) {
                let el = pxsim.svg.elt("rect");
                let r = PIXEL_RADIUS;
                let [cx, cy] = xy;
                let y = cy - r;
                if (width <= 1)
                    pxsim.svg.hydrate(el, { x: "-50%", y: y, width: "100%", height: r * 2, class: "sim-neopixel" });
                else {
                    let x = cx - r;
                    pxsim.svg.hydrate(el, { x: x, y: y, width: r * 2, height: r * 2, class: "sim-neopixel" });
                }
                this.el = el;
                this.cy = cy;
            }
            setRgb(rgb) {
                let hsl = visuals.rgbToHsl(rgb);
                let [h, s, l] = hsl;
                // at least 70% luminosity
                l = Math.max(l, 60);
                let fill = `hsl(${h}, ${s}%, ${l}%)`;
                this.el.setAttribute("fill", fill);
            }
        }
        visuals.NeoPixel = NeoPixel;
        class NeoPixelCanvas {
            constructor(pin, cols = 1) {
                this.cols = cols;
                this.pixels = [];
                let el = pxsim.svg.elt("svg");
                pxsim.svg.hydrate(el, {
                    "class": `sim-neopixel-canvas`,
                    "x": "0px",
                    "y": "0px",
                    "width": `${CANVAS_WIDTH}px`,
                    "height": `${CANVAS_HEIGHT}px`,
                });
                this.canvas = el;
                this.background = pxsim.svg.child(el, "rect", { class: "sim-neopixel-background hidden" });
                this.updateViewBox(-CANVAS_WIDTH / 2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
            updateViewBox(x, y, w, h) {
                this.viewBox = [x, y, w, h];
                pxsim.svg.hydrate(this.canvas, { "viewBox": `${x} ${y} ${w} ${h}` });
                pxsim.svg.hydrate(this.background, { "x": x, "y": y, "width": w, "height": h });
            }
            update(colors) {
                if (!colors || colors.length <= 0)
                    return;
                if (this.pixels.length == 0 && this.cols > 1) {
                    // first time, so redo width of canvas
                    let rows = Math.ceil(colors.length / this.cols);
                    let rt = CANVAS_HEIGHT / rows;
                    let width = this.cols * rt;
                    this.canvas.setAttributeNS(null, "width", `${width}px`);
                    this.updateViewBox(0, 0, width, CANVAS_HEIGHT);
                }
                for (let i = 0; i < colors.length; i++) {
                    let pixel = this.pixels[i];
                    if (!pixel) {
                        let cxy = [0, CANVAS_VIEW_PADDING + i * PIXEL_SPACING];
                        if (this.cols > 1) {
                            const row = Math.floor(i / this.cols);
                            const col = i - row * this.cols;
                            cxy = [(col + 1) * PIXEL_SPACING, (row + 1) * PIXEL_SPACING];
                        }
                        pixel = this.pixels[i] = new NeoPixel(cxy, this.cols);
                        pxsim.svg.hydrate(pixel.el, { title: `offset: ${i}` });
                        this.canvas.appendChild(pixel.el);
                    }
                    pixel.setRgb(colors[i]);
                }
                //show the canvas if it's hidden
                pxsim.U.removeClass(this.background, "hidden");
                // resize
                let [first, last] = [this.pixels[0], this.pixels[this.pixels.length - 1]];
                let yDiff = last.cy - first.cy;
                let newH = yDiff + CANVAS_VIEW_PADDING * 2;
                let [oldX, oldY, oldW, oldH] = this.viewBox;
                if (newH > oldH) {
                    let scalar = newH / oldH;
                    let newW = oldW * scalar;
                    if (this.cols > 1) {
                        // different computation for matrix
                        let rows = Math.ceil(colors.length / this.cols);
                        newH = PIXEL_SPACING * (rows + 1);
                        newW = PIXEL_SPACING * (this.cols + 1);
                        this.updateViewBox(0, oldY, newW, newH);
                    }
                    else
                        this.updateViewBox(-newW / 2, oldY, newW, newH);
                }
            }
            setLoc(xy) {
                let [x, y] = xy;
                pxsim.svg.hydrate(this.canvas, { x: x, y: y });
            }
        }
        visuals.NeoPixelCanvas = NeoPixelCanvas;
        ;
        class NeoPixelView {
            constructor(parsePinString) {
                this.parsePinString = parsePinString;
                this.style = `
            .sim-neopixel-canvas {
            }
            .sim-neopixel-canvas-parent:hover {
                transform-origin: center;
                transform: scale(4) translateY(-220px);
                -moz-transform: scale(4) translateY(-220px);
            }
            .sim-neopixel-canvas .hidden {
                visibility:hidden;
            }
            .sim-neopixel-background {
                fill: rgba(255,255,255,0.9);
            }
            .sim-neopixel-strip {
            }
        `;
            }
            init(bus, state, svgEl, otherParams) {
                this.stripGroup = pxsim.svg.elt("g");
                this.element = this.stripGroup;
                this.pin = this.parsePinString(otherParams["dataPin"] || otherParams["pin"])
                    || this.parsePinString("pins.NEOPIXEL")
                    || this.parsePinString("pins.MOSI");
                this.lastLocation = [0, 0];
                this.state = state(this.pin);
                let part = mkNeoPixelPart();
                this.part = part;
                this.stripGroup.appendChild(part.el);
                this.overElement = null;
                this.makeCanvas();
            }
            makeCanvas() {
                let canvas = new NeoPixelCanvas(this.pin.id, this.state.width);
                if (this.overElement) {
                    this.overElement.removeChild(this.canvas.canvas);
                    this.overElement.appendChild(canvas.canvas);
                }
                else {
                    let canvasG = pxsim.svg.elt("g", { class: "sim-neopixel-canvas-parent" });
                    canvasG.appendChild(canvas.canvas);
                    this.overElement = canvasG;
                }
                this.canvas = canvas;
                this.updateStripLoc();
            }
            moveToCoord(xy) {
                let [x, y] = xy;
                let loc = [x, y];
                this.lastLocation = loc;
                this.updateStripLoc();
            }
            updateStripLoc() {
                let [x, y] = this.lastLocation;
                pxsim.U.assert(typeof x === "number" && typeof y === "number", "invalid x,y for NeoPixel strip");
                this.canvas.setLoc([x + CANVAS_LEFT, y + CANVAS_TOP]);
                pxsim.svg.hydrate(this.part.el, { transform: `translate(${x} ${y})` }); //TODO: update part's l,h, etc.
            }
            updateState() {
                if (this.state.width != this.canvas.cols) {
                    this.makeCanvas();
                }
                let colors = [];
                for (let i = 0; i < this.state.length; i++) {
                    colors.push(this.state.pixelColor(i));
                }
                this.canvas.update(colors);
            }
            updateTheme() { }
        }
        visuals.NeoPixelView = NeoPixelView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        const PHOTOCELL_PART_XOFF = -8;
        const PHOTOCELL_PART_YOFF = -7;
        const PHOTOCELL_PART_WIDTH = 68;
        const PHOTOCELL_PART_HEIGHT = 180;
        const PHOTOCELL_PART = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 33.6 90" width="33.599998" height="90">
    <path id="path9" d="M12.7 60.500002l1.2 1.4h-1l-2.4-1.4v-34.6c0-.3.5-.5 1.1-.5.6 0 1.1.2 1.1.5z" class="st1" fill="#8c8c8c"/>
    <path id="path11" d="M3.4 61.900002h1.905509L4.8.700002c-.003304-.399986-.5-.7-1.1-.7-.6 0-1.1.3-1.1.7z" class="st1" fill="#8c8c8c"/>
    <text id="text4514" y="11.124916" x="14.103056" style="line-height:1.25;-inkscape-font-specification:consolas" font-weight="400" font-size="7.744442" font-family="consolas" letter-spacing="0" word-spacing="0" fill="#666" stroke-width=".968055">
      <tspan y="11.124916" x="14.103056" id="tspan4512">10kΩ</tspan>
    </text>
    <text style="line-height:1.25;-inkscape-font-specification:consolas" x="1.868053" y="77.579796" id="text4524" font-weight="400" font-size="32.793365" font-family="consolas" letter-spacing="0" word-spacing="0" stroke-width=".819834">
    <tspan id="tspan4522" x="1.868053" y="77.579796" font-size="10.931121"></tspan>
    </text>
    <path id="rect41" class="st1" fill="#8c8c8c" d="M11.6 15.800001h21.700001v1.9H11.6z"/>
    <path class="st10" id="rect45" fill="none" d="M12 15.800001h3.2v1.9H12z"/>
    <path class="st11" d="M19 13.900002c-.3-.2-.6-.3-.9-.3h-1.4c-.3 0-.5.3-.5.7v4.9c0 .4.2.7.5.7h1.4c.3 0 .6-.1.9-.3.3-.2.6-.3.9-.3h5c.3 0 .6.1.9.3h.1c.3.2.6.3.9.3h1.4c.3 0 .5-.3.5-.7v-4.9c0-.4-.2-.7-.5-.7h-1.4c-.3 0-.6.1-.9.3h-.1c-.3.2-.6.3-.9.3h-5c-.2 0-.5-.1-.9-.3z" id="path47" fill="#d6bf90"/>
    <path class="st12" d="M28.4 17.400002c-.1.1-.1.2-.2.3-.3.5-.7.8-1.2.8s-.9-.1-1.4-.3c-.6-.1-1.1-.1-1.7-.1-2 0-3.9 0-5.9.2-.4.1-.8 0-1.1-.1-.2-.1-.4-.2-.5-.5v1.5c0 .2.1.3.2.3H18c.3 0 .6-.1.9-.3.3-.2.7-.3 1.1-.3h5c.4 0 .8.1 1.1.3.3.1.6.2.8.2h1.4c.1 0 .2-.1.2-.3v-1.9c0 .1-.1.2-.1.2z" id="path49" fill="#aa936b"/>
    <g id="g51" transform="translate(0 -1.099998)">
      <path class="st13" id="rect53" fill="#ad9f4e" d="M27.200001 14.7h.7v6.2h-.7z"/>
      <path class="st14" id="rect55" opacity=".4" d="M27.200001 17.799999h.7v2.5h-.7z"/>
      <path class="st15" id="rect57" opacity=".5" fill="#ff3" d="M27.200001 15h.7v1.3h-.7z"/>
      <path class="st16" id="rect59" opacity=".5" fill="#fff" d="M27.200001 15.3h.7v.7h-.7z"/>
    </g>
    <path class="st17" id="rect61" fill="#ff9700" d="M23.1 14.200002h1.3v5.1h-1.3z"/>
    <path class="st18" id="rect63" d="M20.6 14.200002h1.3v5.1h-1.3z"/>
    <path class="st18" d="M19.3 14.000002c-.1 0-.1-.1-.2-.1-.3-.2-.6-.3-.9-.3H18v6.3h.1c.3 0 .6-.1.9-.3.1 0 .1-.1.2-.1v-5.5z" id="path65" fill="#aa4518"/>
    <path class="st19" d="M18.7 14.600002c.4.1.8.2 1.2.2H21c1.2-.1 2.4-.1 3.6 0 .4 0 .9 0 1.3-.1.3-.1.6-.2.8-.3.6-.2 1.2-.3 1.8-.2 0-.1-.1-.3-.2-.3h-1.4c-.3 0-.6.1-.9.3-.3.2-.7.3-1.1.3h-5c-.4 0-.8-.1-1.1-.3-.3-.1-.6-.2-.8-.2h-1.4c-.1 0-.2.1-.2.3v.2c.8-.1 1.5 0 2.3.1z" id="path67" opacity=".74" fill="#fffdfa"/>
    <ellipse id="path4569" ry="5.949258" rx="6.745286" cy="64.610916" cx="8.085964" fill="#aa4518" stroke-width="3.558676" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse id="path4569-5" ry="5.488401" rx="6.222764" cy="64.652809" cx="8.024301" fill="#e7e1df" stroke-width="3.283004" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse id="path4607" cx="3.393591" cy="65" rx=".628443" ry="1.016842" fill="#4d4d4d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse id="path4607-3" cx="12.568855" cy="65" rx=".628443" ry="1.016842" fill="#4d4d4d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.865466 60.253708c2.521642.258451 5.042396.51681 4.411086.820414-.63131.303603-4.416986.652835-4.224443.970671.192542.317835 4.36002.604044 4.24887.991436-.111149.387393-4.504242.87629-4.482809 1.204577.021434.328287 4.454339.49583 4.535187.914613.08085.418783-4.193489 1.089267-4.318738 1.529318-.125249.44005 3.895722.649476 4.19647 1.008916.300747.359441-3.121579.869298-3.749962 1.183637-.628384.314339 1.535952.433028 3.699646.551682" id="path4630" fill="none" stroke="#9e4c34" stroke-width=".245669" stroke-linecap="round"/>
  </svg>
            `;
        // For the intructions
        function mkPhotoCellPart(xy = [0, 0]) {
            let [x, y] = xy;
            let l = x + PHOTOCELL_PART_XOFF;
            let t = y + PHOTOCELL_PART_YOFF;
            let w = PHOTOCELL_PART_WIDTH;
            let h = PHOTOCELL_PART_HEIGHT;
            let img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-led", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(PHOTOCELL_PART)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkPhotoCellPart = mkPhotoCellPart;
        class PhotoCellView {
            constructor(parsePinString) {
                this.color = "rgb(0,255,0)"; // green color by default
                this.parsePinString = parsePinString;
            }
            init(bus, state, svgEl, otherParams) {
                this.pin = this.parsePinString(otherParams["name"] || otherParams["pin"]);
                this.bus = bus;
                this.initDom();
                this.updateState();
            }
            initDom() {
                this.element = pxsim.svg.elt("g");
                const image = new DOMParser().parseFromString(PHOTOCELL_PART, "image/svg+xml").querySelector("svg");
                pxsim.svg.hydrate(image, {
                    class: "sim-led", width: PHOTOCELL_PART_WIDTH, height: PHOTOCELL_PART_HEIGHT,
                });
                //this.led = image.getElementById('LED') as SVGPathElement;
                this.text = image.getElementById('tspan4522');
                this.element.appendChild(image);
                // TODO: slider
                this.element.onclick = () => {
                    this.pin.value += 256;
                    this.pin.value = this.pin.value % 1024;
                    pxsim.runtime.queueDisplayUpdate();
                };
            }
            moveToCoord(xy) {
                visuals.translateEl(this.element, [xy[0] + PHOTOCELL_PART_XOFF, xy[1] + PHOTOCELL_PART_YOFF]);
            }
            updateTheme() {
            }
            updateState() {
                if (this.currentValue === this.pin.value && this.currentMode == this.pin.mode)
                    return;
                this.currentValue = this.pin.value;
                this.currentMode = this.pin.mode;
                this.text.textContent = `~${this.currentValue}`;
            }
        }
        visuals.PhotoCellView = PhotoCellView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins) {
        class CommonPin extends pxsim.Pin {
        }
        pins.CommonPin = CommonPin;
        class DigitalInOutPin extends CommonPin {
        }
        pins.DigitalInOutPin = DigitalInOutPin;
        class AnalogInOutPin extends CommonPin {
        }
        pins.AnalogInOutPin = AnalogInOutPin;
        class PwmOnlyPin extends CommonPin {
        }
        pins.PwmOnlyPin = PwmOnlyPin;
        class PwmPin extends CommonPin {
        }
        pins.PwmPin = PwmPin;
        function markUsed(pin) {
            if (pin && !pin.used) {
                pin.used = true;
                pxsim.runtime.queueDisplayUpdate();
            }
        }
        pins.markUsed = markUsed;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var DigitalInOutPinMethods;
    (function (DigitalInOutPinMethods) {
        function digitalRead(name) {
            pxsim.pins.markUsed(name);
            return name.digitalReadPin();
        }
        DigitalInOutPinMethods.digitalRead = digitalRead;
        /**
        * Set a pin or connector value to either 0 or 1.
        * @param value value to set on the pin, 1 eg,0
        */
        function digitalWrite(name, value) {
            pxsim.pins.markUsed(name);
            name.digitalWritePin(value);
        }
        DigitalInOutPinMethods.digitalWrite = digitalWrite;
        /**
        * Configures this pin to a digital input, and generates events where the timestamp is the duration
        * that this pin was either ``high`` or ``low``.
        */
        function onPulsed(name, high, body) {
            pxsim.pins.markUsed(name);
            onEvent(name, high ? 4 /* DAL.DEVICE_PIN_EVT_PULSE_HI */ : 5 /* DAL.DEVICE_PIN_EVT_PULSE_LO */, body);
        }
        DigitalInOutPinMethods.onPulsed = onPulsed;
        function onEvent(name, ev, body) {
            pxsim.pins.markUsed(name);
            name.onEvent(ev, body);
        }
        DigitalInOutPinMethods.onEvent = onEvent;
        /**
        * Returns the duration of a pulse in microseconds
        * @param value the value of the pulse (default high)
        * @param maximum duration in micro-seconds
        */
        function pulseIn(name, high, maxDuration = 2000000) {
            pxsim.pins.markUsed(name);
            const pulse = high ? 4 /* DAL.DEVICE_PIN_EVT_PULSE_HI */ : 5 /* DAL.DEVICE_PIN_EVT_PULSE_LO */;
            // Always return default value, can't simulate
            return 500;
        }
        DigitalInOutPinMethods.pulseIn = pulseIn;
        /**
        * Configures the pull of this pin.
        * @param pull one of the mbed pull configurations: PullUp, PullDown, PullNone
        */
        function setPull(name, pull) {
            pxsim.pins.markUsed(name);
            name.setPull(pull);
        }
        DigitalInOutPinMethods.setPull = setPull;
        /**
         * Get the pin state (pressed or not). Requires to hold the ground to close the circuit.
         * @param name pin used to detect the touch
         */
        function isPressed(name) {
            pxsim.pins.markUsed(name);
            return name.isTouched();
        }
        DigitalInOutPinMethods.isPressed = isPressed;
    })(DigitalInOutPinMethods = pxsim.DigitalInOutPinMethods || (pxsim.DigitalInOutPinMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var AnalogInPinMethods;
    (function (AnalogInPinMethods) {
        /**
         * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
         */
        function analogRead(name) {
            pxsim.pins.markUsed(name);
            return name.analogReadPin();
        }
        AnalogInPinMethods.analogRead = analogRead;
    })(AnalogInPinMethods = pxsim.AnalogInPinMethods || (pxsim.AnalogInPinMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var AnalogOutPinMethods;
    (function (AnalogOutPinMethods) {
        /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
        function analogWrite(name, value) {
            pxsim.pins.markUsed(name);
            name.analogWritePin(value);
        }
        AnalogOutPinMethods.analogWrite = analogWrite;
    })(AnalogOutPinMethods = pxsim.AnalogOutPinMethods || (pxsim.AnalogOutPinMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var PwmOnlyPinMethods;
    (function (PwmOnlyPinMethods) {
        function analogSetPeriod(name, micros) {
            pxsim.pins.markUsed(name);
            name.analogSetPeriod(micros);
        }
        PwmOnlyPinMethods.analogSetPeriod = analogSetPeriod;
        function servoWrite(name, value) {
            pxsim.pins.markUsed(name);
            name.servoWritePin(value);
        }
        PwmOnlyPinMethods.servoWrite = servoWrite;
        function servoSetContinuous(name, continuous) {
            pxsim.pins.markUsed(name);
            name.servoSetContinuous(continuous);
        }
        PwmOnlyPinMethods.servoSetContinuous = servoSetContinuous;
        function servoSetPulse(name, micros) {
            pxsim.pins.markUsed(name);
            name.servoSetPulse(name.id, micros);
        }
        PwmOnlyPinMethods.servoSetPulse = servoSetPulse;
    })(PwmOnlyPinMethods = pxsim.PwmOnlyPinMethods || (pxsim.PwmOnlyPinMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var pins;
    (function (pins) {
        function pinByCfg(key) {
            const pin = pxsim.pxtcore.getPinCfg(key);
            pins.markUsed(pin);
            return pin;
        }
        pins.pinByCfg = pinByCfg;
        function pulseDuration() {
            // bus last event timestamp
            return 500;
        }
        pins.pulseDuration = pulseDuration;
        function createBuffer(sz) {
            return pxsim.BufferMethods.createBuffer(sz);
        }
        pins.createBuffer = createBuffer;
        function createI2C(sda, scl) {
            const b = pxsim.board();
            pins.markUsed(sda);
            pins.markUsed(scl);
            return b && b.edgeConnectorState && b.edgeConnectorState.createI2C(sda, scl);
        }
        pins.createI2C = createI2C;
        function createSPI(mosi, miso, sck) {
            const b = pxsim.board();
            pins.markUsed(mosi);
            pins.markUsed(miso);
            pins.markUsed(sck);
            return b && b.edgeConnectorState && b.edgeConnectorState.createSPI(mosi, miso, sck);
        }
        pins.createSPI = createSPI;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var I2CMethods;
    (function (I2CMethods) {
        function readBuffer(i2c, address, size, repeat) {
            return pxsim.control.createBuffer(0);
        }
        I2CMethods.readBuffer = readBuffer;
        function writeBuffer(i2c, address, buf, repeat) {
            return 0;
        }
        I2CMethods.writeBuffer = writeBuffer;
    })(I2CMethods = pxsim.I2CMethods || (pxsim.I2CMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var SPIMethods;
    (function (SPIMethods) {
        function write(device, value) {
            return device.write(value);
        }
        SPIMethods.write = write;
        function transfer(device, command, response) {
            device.transfer(command, response);
        }
        SPIMethods.transfer = transfer;
        function setFrequency(device, frequency) {
            device.setFrequency(frequency);
        }
        SPIMethods.setFrequency = setFrequency;
        function setMode(device, mode) {
            device.setMode(mode);
        }
        SPIMethods.setMode = setMode;
    })(SPIMethods = pxsim.SPIMethods || (pxsim.SPIMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var SerialDeviceMethods;
    (function (SerialDeviceMethods) {
        function setTxBufferSize(device, size) {
            device.setTxBufferSize(size);
        }
        SerialDeviceMethods.setTxBufferSize = setTxBufferSize;
        function setRxBufferSize(device, size) {
            device.setRxBufferSize(size);
        }
        SerialDeviceMethods.setRxBufferSize = setRxBufferSize;
        function read(device) {
            return device.read();
        }
        SerialDeviceMethods.read = read;
        function readBuffer(device) {
            return device.readBuffer();
        }
        SerialDeviceMethods.readBuffer = readBuffer;
        function writeBuffer(device, buffer) {
            device.writeBuffer(buffer);
        }
        SerialDeviceMethods.writeBuffer = writeBuffer;
        function setBaudRate(device, rate) {
            device.setBaudRate(rate);
        }
        SerialDeviceMethods.setBaudRate = setBaudRate;
        function redirect(device, tx, rx, rate) {
            device.redirect(tx, rx, rate);
        }
        SerialDeviceMethods.redirect = redirect;
        function onEvent(device, event, handler) {
            device.onEvent(event, handler);
        }
        SerialDeviceMethods.onEvent = onEvent;
        function onDelimiterReceived(device, delimiter, handler) {
            device.onDelimiterReceived(delimiter, handler);
        }
        SerialDeviceMethods.onDelimiterReceived = onDelimiterReceived;
    })(SerialDeviceMethods = pxsim.SerialDeviceMethods || (pxsim.SerialDeviceMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var serial;
    (function (serial) {
        function internalCreateSerialDevice(tx, rx, id) {
            const b = pxsim.board();
            return b && b.edgeConnectorState ? b.edgeConnectorState.createSerialDevice(tx, rx, id) : new pxsim.SerialDevice(tx, rx, id);
        }
        serial.internalCreateSerialDevice = internalCreateSerialDevice;
    })(serial = pxsim.serial || (pxsim.serial = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        const SWITCH_PART_XOFF = -1;
        const SWITCH_PART_YOFF = -30;
        const SWITCH_PART_WIDTH = 100;
        const SWITCH_PART_HEIGHT = 100;
        const SWITCH_PART_PIN_DIST = 15;
        const SWITCH_PART_SVG_OFF = `<svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="100mm" viewBox="0 0 100 100" id="svg8">
    <g id="layer1" transform="translate(0 -197)">
      <rect id="rect4508-3" width="6.054" height="32.94" x="43.381" y="210.817" rx="2.811" fill="#666" stroke="#000" stroke-width=".309"/>
      <rect id="rect4508-3-3" width="6.054" height="32.94" x="58.321" y="210.817" rx="2.811" fill="#666" stroke="#000" stroke-width=".309"/>
      <rect id="rect4508" width="6.054" height="32.94" x="28.44" y="210.817" rx="2.811" fill="#666" stroke="#000" stroke-width=".309"/>
      <rect id="rect4485" width="100.542" height="40.611" y="237.763" rx="3.432" stroke="#000" stroke-width=".309"/>
      <rect id="rect4487" width="60.587" height="18.323" x="7.977" y="248.907" rx="2.46" fill="#b3b3b3" stroke="#000" stroke-width=".262"/>
      <rect id="rect4487-7" width="53.273" height="10.029" x="11.2" y="253.384" rx="2.163" fill="#999" stroke="#000" stroke-width=".182"/>
      <rect id="handle" width="19.243" height="30.007" x="11.924" y="256.572" rx="3.432" fill="#4d4d4d" stroke="#000" stroke-width=".309"/>
      <text style="line-height:1.25" x="71.848" y="259.158" id="text" transform="scale(.97895 1.0215)" font-weight="400" font-size="17.409" font-family="sans-serif" letter-spacing="0" word-spacing="0" fill="#fff" stroke-width=".435">
        <tspan id="tspan4558" x="71.848" y="259.158" style="-inkscape-font-specification:Consolas" font-family="Consolas">OFF</tspan>
      </text>
    </g>
  </svg>
  `;
        const SWITCH_PART_SVG_ON = `<svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="100mm" viewBox="0 0 100 100" id="svg8">
  <g id="layer1" transform="translate(0 -197)">
    <g id="g4509" transform="matrix(1.14409 0 0 1.19383 -7.582 -50.118)">
      <rect rx="2.457" y="218.57" x="44.544" height="27.592" width="5.292" id="rect4508-3" fill="#666" stroke="#000" stroke-width=".265"/>
      <rect rx="2.457" y="218.57" x="57.604" height="27.592" width="5.292" id="rect4508-3-3" fill="#666" stroke="#000" stroke-width=".265"/>
      <rect rx="2.457" y="218.57" x="31.485" height="27.592" width="5.292" id="rect4508" fill="#666" stroke="#000" stroke-width=".265"/>
      <rect rx="3" y="241.141" x="6.627" height="34.018" width="87.879" id="rect4485" fill="#450" stroke="#000" stroke-width=".265"/>
      <rect rx="2.15" y="250.476" x="13.6" height="15.348" width="52.957" id="rect4487" fill="#b3b3b3" stroke="#000" stroke-width=".224"/>
      <rect rx="1.89" y="254.226" x="16.417" height="8.4" width="46.564" id="rect4487-7" fill="#999" stroke="#000" stroke-width=".156"/>
      <rect rx="3" y="256.897" x="46.189" height="25.135" width="16.82" id="handle" fill="#4d4d4d" stroke="#000" stroke-width=".265"/>
      <text id="text" y="263.731" x="68.105" style="line-height:1.25" font-weight="400" font-size="14.896" font-family="sans-serif" letter-spacing="0" word-spacing="0" fill="#fff" stroke-width=".372">
        <tspan style="-inkscape-font-specification:Consolas" y="263.731" x="68.105" id="tspan4558" font-family="Consolas">ON</tspan>
      </text>
    </g>
  </g>
</svg>
`;
        // For the intructions
        function mkSideSwitchPart(xy = [0, 0]) {
            const [x, y] = xy;
            const l = x + SWITCH_PART_XOFF;
            const t = y + SWITCH_PART_YOFF;
            const w = SWITCH_PART_WIDTH;
            const h = SWITCH_PART_HEIGHT;
            const img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-led", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(SWITCH_PART_SVG_OFF)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkSideSwitchPart = mkSideSwitchPart;
        class ToggleComponentVisual {
            constructor(parsePinString) {
                this.currentlyOn = false;
                this.element = pxsim.svg.elt("g");
                this.element.onclick = () => {
                    if (this.state) {
                        this.state.toggle();
                        pxsim.runtime.queueDisplayUpdate();
                    }
                };
                this.onElement = this.initImage(SWITCH_PART_SVG_ON);
                this.offElement = this.initImage(SWITCH_PART_SVG_OFF);
                this.element.appendChild(this.offElement);
                this.parsePinString = parsePinString;
            }
            moveToCoord(xy) {
                const to = [xy[0] + SWITCH_PART_XOFF, xy[1] + SWITCH_PART_YOFF];
                visuals.translateEl(this.element, to);
            }
            init(bus, state, svgEl, otherParams) {
                this.state = state(this.parsePinString(otherParams["pin"]));
                this.updateState();
            }
            updateState() {
                if (this.state.on() === this.currentlyOn) {
                    return;
                }
                this.currentlyOn = this.state.on();
                if (this.state.on()) {
                    this.element.removeChild(this.offElement);
                    this.element.appendChild(this.onElement);
                }
                else {
                    this.element.removeChild(this.onElement);
                    this.element.appendChild(this.offElement);
                }
            }
            updateTheme() { }
            initImage(svgData) {
                const image = "data:image/svg+xml," + encodeURIComponent(svgData);
                let imgAndSize = visuals.mkImageSVG({
                    image,
                    width: SWITCH_PART_WIDTH,
                    height: SWITCH_PART_HEIGHT,
                    imageUnitDist: SWITCH_PART_PIN_DIST,
                    targetUnitDist: visuals.PIN_DIST
                });
                return imgAndSize.el;
            }
        }
        visuals.ToggleComponentVisual = ToggleComponentVisual;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class ToggleState {
        constructor(pin) {
            this.pin = pin;
        }
        toggle() {
            const on = !!this.pin.value;
            this.pin.setValue(on ? 0 : 1023);
        }
        on() {
            return this.pin.value > 0;
        }
    }
    pxsim.ToggleState = ToggleState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var keymap;
    (function (keymap) {
        // Keep in sync with pxt-arcade-sim/api.ts
        let Key;
        (function (Key) {
            Key[Key["None"] = 0] = "None";
            // Player 1
            Key[Key["Left"] = 1] = "Left";
            Key[Key["Up"] = 2] = "Up";
            Key[Key["Right"] = 3] = "Right";
            Key[Key["Down"] = 4] = "Down";
            Key[Key["A"] = 5] = "A";
            Key[Key["B"] = 6] = "B";
            Key[Key["Menu"] = 7] = "Menu";
            // Player 2 = Player 1 + 7
            // Player 3 = Player 2 + 7
            // Player 4 = Player 3 + 7
            // system keys
            Key[Key["Screenshot"] = -1] = "Screenshot";
            Key[Key["Gif"] = -2] = "Gif";
            Key[Key["Reset"] = -3] = "Reset";
            Key[Key["TogglePause"] = -4] = "TogglePause";
        })(Key = keymap.Key || (keymap.Key = {}));
        function _setPlayerKeys(player, // player number is 1-based
        up, down, left, right, A, B) {
            pxsim.getKeymapState().setPlayerKeys(player, up, down, left, right, A, B);
        }
        keymap._setPlayerKeys = _setPlayerKeys;
        function _setSystemKeys(screenshot, gif, menu, reset) {
            pxsim.getKeymapState().setSystemKeys(screenshot, gif, menu, reset);
        }
        keymap._setSystemKeys = _setSystemKeys;
    })(keymap = pxsim.keymap || (pxsim.keymap = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var Key = pxsim.keymap.Key;
    function getKeymapState() {
        return pxsim.board().keymapState;
    }
    pxsim.getKeymapState = getKeymapState;
    const reservedKeyCodes = [
        27,
        9 // Tab
    ];
    class KeymapState {
        constructor() {
            this.keymap = {};
            this.altmap = {};
            this.mappings = {};
            // Player 1 keymap
            this.setPlayerKeys(1, // Player 1
            87, // W - Up
            83, // S - Down
            65, // A - Left
            68, // D - Right
            32, // Space - A
            13 // Enter - B
            );
            // Player 2 keymap
            this.setPlayerKeys(2, // Player 2
            73, // I - Up
            75, // K - Down
            74, // J - Left
            76, // L - Right
            85, // U - A
            79 // O - B
            );
            // Note: Player 3 and 4 have no default keyboard mapping
            // System keymap
            this.setSystemKeys(80, // P - Screenshot
            82, // R - Gif
            192, // Menu - '`' (backtick) button
            8 // Reset - Backspace button
            );
            // Player 1 alternate mapping. This is cleared when the game sets any player keys explicitly
            this.altmap[38] = Key.Up; // UpArrow
            this.altmap[37] = Key.Left; // LeftArrow
            this.altmap[40] = Key.Down; // DownArrow
            this.altmap[39] = Key.Right; // RightArrow
            this.altmap[81] = Key.A; // Q
            this.altmap[90] = Key.A; // Z
            this.altmap[88] = Key.B; // X
            this.altmap[69] = Key.B; // E
        }
        setPlayerKeys(player, // player number is 1-based
        up, down, left, right, A, B) {
            // We only support four players
            if (player < 1 || player > 4)
                return;
            const keyCodes = [up, down, left, right, A, B];
            // Check for reserved key codes
            // TODO: How to surface this runtime error to the user?
            // TODO: Send message to UI: "Keyboard mapping contains a reserved key code"
            const filtered = keyCodes.filter(keyCode => reservedKeyCodes.includes(keyCode));
            if (filtered.length)
                return;
            // Clear existing mapped keys for player
            const mapName = `player-${player}`;
            this.clearMap(mapName);
            // Clear altmap When explicitly setting the player keys
            this.altmap = {};
            // Map the new keys
            const offset = (player - 1) * 7; // +7 for player 2's keys
            this.keymap[up] = Key.Up + offset;
            this.keymap[down] = Key.Down + offset;
            this.keymap[left] = Key.Left + offset;
            this.keymap[right] = Key.Right + offset;
            this.keymap[A] = Key.A + offset;
            this.keymap[B] = Key.B + offset;
            // Remember this mapping
            this.saveMap(mapName, keyCodes);
        }
        setSystemKeys(screenshot, gif, menu, reset) {
            const mapName = "system";
            // Clear existing mapped keys for system
            this.clearMap(mapName);
            this.keymap[screenshot] = Key.Screenshot;
            this.keymap[gif] = Key.Gif;
            this.keymap[menu] = Key.Menu;
            this.keymap[reset] = Key.Reset;
            // Remember this mapping
            this.saveMap(mapName, [screenshot, gif, menu, reset]);
        }
        getKey(keyCode) {
            return keyCode ? this.keymap[keyCode] || this.altmap[keyCode] || Key.None : Key.None;
        }
        saveMap(name, keyCodes) {
            this.mappings[name] = keyCodes;
        }
        clearMap(name) {
            const keyCodes = this.mappings[name];
            keyCodes && keyCodes.forEach(keyCode => delete this.keymap[keyCode]);
            delete this.mappings[name];
        }
    }
    pxsim.KeymapState = KeymapState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var multiplayer;
    (function (multiplayer) {
        const throttledImgPost = pxsim.U.throttle((msg) => {
            pxsim.getMultiplayerState().send(msg);
        }, 50, true);
        function postImage(im) {
            if (pxsim.getMultiplayerState().origin !== "server")
                return;
            const asBuf = pxsim.image.toBuffer(im);
            const sb = pxsim.board();
            const screenState = sb && sb.screenState;
            throttledImgPost({
                content: "Image",
                image: asBuf,
                palette: screenState && screenState.paletteToUint8Array(),
            });
        }
        multiplayer.postImage = postImage;
        function postIcon(iconType, slot, im) {
            if (im && (im._width * im._height > 64 * 64)) {
                // setting 64x64 as max size for icon for now
                return;
            }
            // treat empty icon as undefined
            const asBuf = (im && im.data.some(pixel => pixel != 0))
                ? pxsim.image.toBuffer(im) : undefined;
            const sb = pxsim.board();
            const screenState = sb && sb.screenState;
            pxsim.getMultiplayerState().send({
                content: "Icon",
                slot: slot,
                icon: asBuf,
                iconType: iconType,
                palette: screenState.paletteToUint8Array(),
            });
        }
        multiplayer.postIcon = postIcon;
        function getCurrentImage() {
            return pxsim.getMultiplayerState().backgroundImage;
        }
        multiplayer.getCurrentImage = getCurrentImage;
        function setOrigin(origin) {
            pxsim.getMultiplayerState().origin = origin;
        }
        multiplayer.setOrigin = setOrigin;
        function getOrigin() {
            return pxsim.getMultiplayerState().origin;
        }
        multiplayer.getOrigin = getOrigin;
    })(multiplayer = pxsim.multiplayer || (pxsim.multiplayer = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    function getMultiplayerState() {
        return pxsim.board().multiplayerState;
    }
    pxsim.getMultiplayerState = getMultiplayerState;
    let IconType;
    (function (IconType) {
        IconType[IconType["Player"] = 0] = "Player";
        IconType[IconType["Reaction"] = 1] = "Reaction";
    })(IconType = pxsim.IconType || (pxsim.IconType = {}));
    const MULTIPLAYER_PLAYER_JOINED_ID = 3241;
    const MULTIPLAYER_PLAYER_LEFT_ID = 3242;
    class MultiplayerState {
        constructor() {
            this.lastMessageId = 0;
        }
        send(msg) {
            pxsim.Runtime.postMessage(Object.assign(Object.assign({}, msg), { broadcast: true, toParentIFrameOnly: true, type: "multiplayer", origin: this.origin, id: this.lastMessageId++ }));
        }
        init(origin) {
            this.origin = origin;
            pxsim.runtime.board.addMessageListener(msg => this.messageHandler(msg));
            if (this.origin === "server") {
                pxsim.AudioContextManager.soundEventCallback = (ev, data) => {
                    this.send({
                        content: "Audio",
                        instruction: ev,
                        soundbuf: data,
                    });
                };
            }
            else {
                pxsim.AudioContextManager.soundEventCallback = undefined;
            }
        }
        setButton(key, isPressed) {
            if (this.origin === "client") {
                this.send({
                    content: "Button",
                    button: key,
                    state: isPressed ? "Pressed" : "Released"
                });
            }
        }
        registerConnectionState(player, connected) {
            const evId = connected ? MULTIPLAYER_PLAYER_JOINED_ID : MULTIPLAYER_PLAYER_LEFT_ID;
            const b = pxsim.board();
            b.bus.queue(evId, player);
        }
        messageHandler(msg) {
            if (!isMultiplayerMessage(msg)) {
                return;
            }
            if (isImageMessage(msg)) {
                if (this.origin === "client") {
                    // HACK: peer js can convert Uint8Array into ArrayBuffer when transmitting; fix this.
                    if (!ArrayBuffer.isView(msg.image.data)) {
                        msg.image.data = new Uint8Array(msg.image.data);
                    }
                    this.backgroundImage = pxsim.image.ofBuffer(msg.image);
                    if (msg.palette && msg.palette.length === 48) {
                        const palBuffer = new pxsim.RefBuffer(msg.palette);
                        pxsim.pxtcore.setPalette(palBuffer);
                    }
                }
            }
            else if (isButtonMessage(msg)) {
                if (this.origin === "server") {
                    pxsim.board().handleKeyEvent(msg.button + (7 * (msg.clientNumber || 1)), // + 7 to make it player 2 controls,
                    msg.state === "Pressed" || msg.state === "Held");
                }
            }
            else if (isAudioMessage(msg)) {
                if (this.origin === "client") {
                    if (msg.instruction === "playinstructions") {
                        pxsim.AudioContextManager.playInstructionsAsync(msg.soundbuf);
                    }
                    else if (msg.instruction === "muteallchannels") {
                        pxsim.AudioContextManager.muteAllChannels();
                    }
                }
            }
            else if (isConnectionMessage(msg)) {
                this.registerConnectionState(msg.slot, msg.connected);
            }
        }
    }
    pxsim.MultiplayerState = MultiplayerState;
    function isMultiplayerMessage(msg) {
        return msg && msg.type === "multiplayer";
    }
    function isImageMessage(msg) {
        return msg && msg.content === "Image";
    }
    function isButtonMessage(msg) {
        return msg && msg.content === "Button";
    }
    function isAudioMessage(msg) {
        return msg && msg.content === "Audio";
    }
    function isConnectionMessage(msg) {
        return msg && msg.content === "Connection";
    }
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var gamepad;
    (function (gamepad) {
        function setButton(index, up) {
            // TODO
        }
        gamepad.setButton = setButton;
        function move(index, x, y) {
            // TODO
        }
        gamepad.move = move;
        function setThrottle(index, value) {
            // TODO
        }
        gamepad.setThrottle = setThrottle;
    })(gamepad = pxsim.gamepad || (pxsim.gamepad = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var network;
    (function (network) {
        function infraredSendPacket(buf) {
            const state = pxsim.getInfraredState();
            state.send(buf);
        }
        network.infraredSendPacket = infraredSendPacket;
        function infraredPacket() {
            const state = pxsim.getInfraredState();
            return state.packet;
        }
        network.infraredPacket = infraredPacket;
        function onInfraredPacket(body) {
            const state = pxsim.getInfraredState();
            state.listen(body);
        }
        network.onInfraredPacket = onInfraredPacket;
        function onInfraredError(body) {
            const state = pxsim.getInfraredState();
            state.listenError(body);
        }
        network.onInfraredError = onInfraredError;
    })(network = pxsim.network || (pxsim.network = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class InfraredState {
        constructor(board) {
            this.board = board;
            // notify view that a packet was received
            this.packetReceived = false;
            this.IR_COMPONENT_ID = 0x2042;
            this.IR_PACKET_EVENT = 0x2;
            this.IR_PACKET_ERROR_EVENT = 0x3;
            this.board.addMessageListener(this.handleMessage.bind(this));
        }
        handleMessage(msg) {
            if (msg.type === "irpacket") {
                const irpacket = msg;
                this.receive(irpacket.packet);
            }
        }
        send(buf) {
            pxsim.Runtime.postMessage({
                type: "irpacket",
                packet: buf.data,
                broadcast: true
            });
        }
        listen(body) {
            pxsim.pxtcore.registerWithDal(this.IR_COMPONENT_ID, this.IR_PACKET_EVENT, body);
        }
        listenError(body) {
            pxsim.pxtcore.registerWithDal(this.IR_COMPONENT_ID, this.IR_PACKET_ERROR_EVENT, body);
        }
        receive(buf) {
            this.packet = new pxsim.RefBuffer(buf);
            this.packetReceived = true;
            pxsim.board().bus.queue(this.IR_COMPONENT_ID, this.IR_PACKET_EVENT);
        }
    }
    pxsim.InfraredState = InfraredState;
    function getInfraredState() {
        return pxsim.board().irState;
    }
    pxsim.getInfraredState = getInfraredState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var keyboard;
    (function (keyboard) {
        const events = [
            "press",
            "up",
            "down"
        ];
        function __flush() {
            console.log(`kb: flush`);
        }
        keyboard.__flush = __flush;
        function __type(s) {
            console.log(`kb: type ${s}`);
        }
        keyboard.__type = __type;
        function __key(c, event) {
            console.log(`kb: key ${c} ${events[event]}`);
        }
        keyboard.__key = __key;
        function __mediaKey(key, event) {
            console.log(`kb: media ${key} ${events[event]}`);
        }
        keyboard.__mediaKey = __mediaKey;
        function __functionKey(key, event) {
            console.log(`kb: function ${key} ${events[event]}`);
        }
        keyboard.__functionKey = __functionKey;
        function __modifierKey(key, event) {
            console.log(`kb: modifier ${key} ${events[event]}`);
        }
        keyboard.__modifierKey = __modifierKey;
    })(keyboard = pxsim.keyboard || (pxsim.keyboard = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class LCDState {
        constructor(lines = 2, columns = 16) {
            this.lines = 0;
            this.columns = 0;
            this.backLightColor = "#6e7d6e";
            this.cursor = false;
            this.display = false;
            this.blink = false;
            this.sensorUsed = false;
            this.lines = lines;
            this.columns = columns;
            this.clear();
        }
        clear() {
            let s = "";
            for (let i = 0; i < this.columns; ++i)
                s += " ";
            this.text = [];
            for (let i = 0; i < this.lines; ++i)
                this.text.push(s);
            this.cursorPos = [0, 0];
        }
        setUsed() {
            if (!this.sensorUsed) {
                this.sensorUsed = true;
                pxsim.runtime.queueDisplayUpdate();
            }
        }
    }
    pxsim.LCDState = LCDState;
    function lcdState() {
        return pxsim.board().lcdState;
    }
    pxsim.lcdState = lcdState;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var lcd;
    (function (lcd) {
        const _LCD_CLEARDISPLAY = 0x01;
        const _LCD_RETURNHOME = 0x02;
        const _LCD_ENTRYMODESET = 0x04;
        const _LCD_DISPLAYCONTROL = 0x08;
        const _LCD_CURSORSHIFT = 0x10;
        const _LCD_FUNCTIONSET = 0x20;
        const _LCD_SETCGRAMADDR = 0x40;
        const _LCD_SETDDRAMADDR = 0x80;
        // Entry flags
        const _LCD_ENTRYLEFT = 0x02;
        const _LCD_ENTRYSHIFTDECREMENT = 0x00;
        // Control flags
        const _LCD_DISPLAYON = 0x04;
        const _LCD_CURSORON = 0x02;
        const _LCD_CURSOROFF = 0x00;
        const _LCD_BLINKON = 0x01;
        const _LCD_BLINKOFF = 0x00;
        const _LCD_ROW_OFFSETS = [0x00, 0x40, 0x14, 0x54];
        function __write8(value, char_mode) {
            let b = pxsim.lcdState();
            if (!b)
                return;
            b.setUsed();
            if (char_mode) {
                const c = b.cursorPos[0];
                const r = b.cursorPos[1];
                const s = b.text[r];
                if (s !== undefined && c >= 0 && c < s.length) {
                    b.text[r] = s.substring(0, c) + pxsim.String_.fromCharCode(value) + s.substring(c + 1);
                    b.cursorPos[0]++;
                }
            }
            else {
                if (value & _LCD_SETDDRAMADDR) {
                    value = ~(~value | _LCD_SETDDRAMADDR);
                    // setCursorPosition
                    // this._write8(_LCD_SETDDRAMADDR | column + _LCD_ROW_OFFSETS[row])
                    for (let i = _LCD_ROW_OFFSETS.length - 1; i >= 0; i--) {
                        if (((value & _LCD_ROW_OFFSETS[i]) == _LCD_ROW_OFFSETS[i]) || i == 0) {
                            b.cursorPos[0] = value - _LCD_ROW_OFFSETS[i];
                            b.cursorPos[1] = i;
                            break;
                        }
                    }
                }
                else if (value == _LCD_CLEARDISPLAY) {
                    b.clear();
                }
                else if ((value & _LCD_DISPLAYCONTROL) == _LCD_DISPLAYCONTROL) {
                    b.display = (value & _LCD_DISPLAYON) == _LCD_DISPLAYON;
                    b.cursor = (value & _LCD_CURSORON) == _LCD_CURSORON;
                    b.blink = (value & _LCD_BLINKON) == _LCD_BLINKON;
                }
                else if (value == _LCD_RETURNHOME) {
                    b.cursorPos = [0, 0];
                }
            }
            pxsim.runtime.queueDisplayUpdate();
        }
        lcd.__write8 = __write8;
    })(lcd = pxsim.lcd || (pxsim.lcd = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        // For the intructions
        function mkLCDPart(xy = [0, 0]) {
            let [x, y] = xy;
            let l = x;
            let t = y;
            let w = LCD_PART_WIDTH;
            let h = LCD_PART_HEIGHT;
            let img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-lcd", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(LCD_PART)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkLCDPart = mkLCDPart;
        class LCDView {
            constructor() {
            }
            init(bus, state, svgEl, otherParams) {
                this.state = state;
                this.bus = bus;
                this.initDom();
                this.updateState();
            }
            initDom() {
                this.element = pxsim.svg.elt("g");
                this.image = new DOMParser().parseFromString(LCD_PART, "image/svg+xml").querySelector("svg");
                pxsim.svg.hydrate(this.image, {
                    class: "sim-lcd", width: LCD_PART_WIDTH, height: LCD_PART_HEIGHT,
                });
                this.screen = this.image.getElementById('ecran');
                this.backlight = this.image.getElementById('backlight');
                this.backlight.style.fill = "#6e7d6e";
                this.element.appendChild(this.image);
            }
            setChar(column, line, value) {
                let _case = this.image.getElementById("case" + line + "" + column + "_text");
                _case.innerHTML = value.charAt(0);
            }
            moveToCoord(xy) {
                visuals.translateEl(this.element, [xy[0], xy[1]]);
            }
            updateTheme() {
            }
            updateState() {
                for (let line = 0; line < this.state.lines; line++) {
                    for (let column = 0; column < this.state.columns; column++) {
                        if (!!this.state.text && !!this.state.text[line] && !!this.state.text[line][column])
                            this.setChar(column, line, this.state.text[line][column]);
                    }
                }
                this.backlight.style.fill = this.state.backLightColor;
            }
        }
        visuals.LCDView = LCDView;
        const LCD_PART_WIDTH = 322.79001;
        const LCD_PART_HEIGHT = 129.27348;
        const LCD_PART = `
    <svg xmlns="http://www.w3.org/2000/svg" id="LCD" width="322.8" height="129.3" viewBox="0 0 322.8 129.3">
    <defs id="defs2284">
      <style id="style2282">
        .cls-textCase{fill:#000;fill-opacity:.8;font-family:monospace;font-weight:100;font-size:24px}.cls-case{fill:#fff;fill-opacity:.1}
      </style>
    </defs>
    <path id="rect4820" fill="#6767ff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".7" d="M.3.3h322.1v128.6H.3z"/>
    <path id="path132" fill="#303030" stroke-width=".9" d="M308.6 93c-1 0-1.9-.8-1.9-1.8V57.7c0-1 .9-1.8 1.9-1.8V29h-.9l-2.9-2.6v-1H18v1L15.1 29h-1V56h.1c1 0 1.9.8 1.9 1.8v33.5c0 1-.8 1.8-1.9 1.8v26.9h1l2.8 2.6v1h286.8v-1l2.9-2.6h1V93z"/>
    <g id="g140" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="backlight" d="M319.6 118.3a6 6 0 0 1-6 6h-269a6 6 0 0 1-6-6v-60a6 6 0 0 1 6-6h269a6 6 0 0 1 6 6z" class="cls-backlight"/>
      <g id="g138" opacity=".2">
        <path id="path136" fill="#22420d" d="M319.6 58.3v60-60zm-275-6a6 6 0 0 0-6 6v60a6 6 0 0 0 6 6H48a6 6 0 0 1-6-6v-58a6 6 0 0 1 6-6h270c-1-1.1-2.6-2-4.4-2h-269z"/>
      </g>
    </g>
    <g id="g146" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path142" fill="#1a1a1a" d="M322 40.5c0-1-.8-2-1.9-2h-282c-1.1 0-2 1-2 2v1.1c0 1.1.9 2 2 2h282c1 0 2-.9 2-2v-1z"/>
      <path id="path144" fill="#424242" d="M321 42.3c0-.7-.6-1.3-1.3-1.3h-281c-.9 0-1.5.6-1.5 1.3 0 .7.6 1.3 1.4 1.3h281c.8 0 1.5-.6 1.5-1.3z"/>
    </g>
    <g id="g152" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path148" fill="#1a1a1a" d="M322 134c0-1-.8-1.9-1.9-1.9h-282c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h282c1 0 2-.9 2-2v-1z"/>
      <path id="path150" fill="#424242" d="M321 135.8c0-.7-.6-1.3-1.3-1.3h-281c-.9 0-1.5.6-1.5 1.3 0 .8.6 1.3 1.4 1.3h281c.8 0 1.5-.5 1.5-1.3z"/>
    </g>
    <g id="g158" fill-opacity="0" stroke="#f2f2f2" stroke-linecap="round" stroke-opacity=".2" stroke-width=".2" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path154" d="M27 37.4l3.2-3"/>
      <path id="path156" d="M30.2 143.3l-3.1-3.1"/>
    </g>
    <g id="g164" fill-opacity="0" stroke="#f2f2f2" stroke-linecap="round" stroke-opacity=".2" stroke-width=".2" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path160" d="M332.1 37.4l-3.1-3"/>
      <path id="path162" d="M329 143.3l3-3.1"/>
    </g>
    <path id="path166" fill-opacity="0" stroke="#1a1a1a" stroke-opacity=".4" stroke-width="1.3" d="M296.5 101.4c0 2.8-2.6 5.2-5.7 5.2H33c-3 0-5.6-2.4-5.6-5.2v-53c0-2.8 2.5-5.2 5.6-5.2h258c3 0 5.6 2.4 5.6 5.2z"/>
    <g id="ecran" transform="matrix(1.02697 0 0 1.04868 -20.3 -17.7)">
      <path id="case10" fill="#fff" fill-opacity=".1" d="M52.9 88.8h14.8v24.4H52.9z" class="cls-case"/>
      <path id="case11" fill="#fff" fill-opacity=".1" d="M68.7 88.8h14.8v24.4H68.7z" class="cls-case"/>
      <path id="case12" fill="#fff" fill-opacity=".1" d="M84.6 88.8h14.8v24.4H84.5z" class="cls-case"/>
      <path id="case13" fill="#fff" fill-opacity=".1" d="M100.4 88.8h14.8v24.4h-14.8z" class="cls-case"/>
      <path id="case14" fill="#fff" fill-opacity=".1" d="M116.3 88.8H131v24.4h-14.7z" class="cls-case"/>
      <path id="case15" fill="#fff" fill-opacity=".1" d="M132 88.8H147v24.4H132z" class="cls-case"/>
      <path id="case16" fill="#fff" fill-opacity=".1" d="M148 88.8h14.7v24.4H148z" class="cls-case"/>
      <path id="case17" fill="#fff" fill-opacity=".1" d="M163.8 88.8h14.8v24.4h-14.8z" class="cls-case"/>
      <path id="case18" fill="#fff" fill-opacity=".1" d="M179.6 88.8h14.8v24.4h-14.8z" class="cls-case"/>
      <path id="case19" fill="#fff" fill-opacity=".1" d="M195.5 88.8h14.7v24.4h-14.7z" class="cls-case"/>
      <path id="case110" fill="#fff" fill-opacity=".1" d="M211.3 88.8h14.8v24.4h-14.8z" class="cls-case"/>
      <path id="case111" fill="#fff" fill-opacity=".1" d="M227.1 88.8H242v24.4h-14.8z" class="cls-case"/>
      <path id="case112" fill="#fff" fill-opacity=".1" d="M243 88.8h14.8v24.4H243z" class="cls-case"/>
      <path id="case113" fill="#fff" fill-opacity=".1" d="M258.8 88.8h14.8v24.4h-14.8z" class="cls-case"/>
      <path id="case114" fill="#fff" fill-opacity=".1" d="M274.7 88.8h14.7v24.4h-14.7z" class="cls-case"/>
      <path id="case115" fill="#fff" fill-opacity=".1" d="M290.5 88.8h14.8v24.4h-14.8z" class="cls-case"/>
      <text id="case10_text" x="52.9" y="112.9" class="cls-textCase"/>
      <text id="case11_text" x="68.7" y="112.9" class="cls-textCase"/>
      <text id="case12_text" x="84.6" y="112.9" class="cls-textCase"/>
      <text id="case13_text" x="100.4" y="112.9" class="cls-textCase"/>
      <text id="case14_text" x="116.3" y="112.9" class="cls-textCase"/>
      <text id="case15_text" x="132.1" y="112.9" class="cls-textCase"/>
      <text id="case16_text" x="147.9" y="112.9" class="cls-textCase"/>
      <text id="case17_text" x="163.8" y="112.9" class="cls-textCase"/>
      <text id="case18_text" x="179.6" y="112.9" class="cls-textCase"/>
      <text id="case19_text" x="195.5" y="112.9" class="cls-textCase"/>
      <text id="case110_text" x="211.3" y="112.9" class="cls-textCase"/>
      <text id="case111_text" x="227.1" y="112.9" class="cls-textCase"/>
      <text id="case112_text" x="243" y="112.9" class="cls-textCase"/>
      <text id="case113_text" x="258.8" y="112.9" class="cls-textCase"/>
      <text id="case114_text" x="274.7" y="112.9" class="cls-textCase"/>
      <text id="case115_text" x="290.5" y="112.9" class="cls-textCase"/>
      <path id="case00" fill="#fff" fill-opacity=".1" d="M52.9 63.5h14.8v24.3H52.9z" class="cls-case"/>
      <path id="case01" fill="#fff" fill-opacity=".1" d="M68.7 63.5h14.8v24.3H68.7z" class="cls-case"/>
      <path id="case02" fill="#fff" fill-opacity=".1" d="M84.6 63.5h14.8v24.3H84.5z" class="cls-case"/>
      <path id="case03" fill="#fff" fill-opacity=".1" d="M100.4 63.5h14.8v24.3h-14.8z" class="cls-case"/>
      <path id="case04" fill="#fff" fill-opacity=".1" d="M116.3 63.5H131v24.3h-14.7z" class="cls-case"/>
      <path id="case05" fill="#fff" fill-opacity=".1" d="M132 63.5H147v24.3H132z" class="cls-case"/>
      <path id="case06" fill="#fff" fill-opacity=".1" d="M148 63.5h14.7v24.3H148z" class="cls-case"/>
      <path id="case07" fill="#fff" fill-opacity=".1" d="M163.8 63.5h14.8v24.3h-14.8z" class="cls-case"/>
      <path id="case08" fill="#fff" fill-opacity=".1" d="M179.6 63.5h14.8v24.3h-14.8z" class="cls-case"/>
      <path id="case09" fill="#fff" fill-opacity=".1" d="M195.5 63.5h14.7v24.3h-14.7z" class="cls-case"/>
      <path id="case010" fill="#fff" fill-opacity=".1" d="M211.3 63.5h14.8v24.3h-14.8z" class="cls-case"/>
      <path id="case011" fill="#fff" fill-opacity=".1" d="M227.1 63.5H242v24.3h-14.8z" class="cls-case"/>
      <path id="case012" fill="#fff" fill-opacity=".1" d="M243 63.5h14.8v24.3H243z" class="cls-case"/>
      <path id="case013" fill="#fff" fill-opacity=".1" d="M258.8 63.5h14.8v24.3h-14.8z" class="cls-case"/>
      <path id="case014" fill="#fff" fill-opacity=".1" d="M274.7 63.5h14.7v24.3h-14.7z" class="cls-case"/>
      <path id="case015" fill="#fff" fill-opacity=".1" d="M290.5 63.5h14.8v24.3h-14.8z" class="cls-case"/>
      <text id="case00_text" x="52.9" y="87.5" class="cls-textCase"/>
      <text id="case01_text" x="68.7" y="87.5" class="cls-textCase"/>
      <text id="case02_text" x="84.6" y="87.5" class="cls-textCase"/>
      <text id="case03_text" x="100.4" y="87.5" class="cls-textCase"/>
      <text id="case04_text" x="116.3" y="87.5" class="cls-textCase"/>
      <text id="case05_text" x="132.1" y="87.5" class="cls-textCase"/>
      <text id="case06_text" x="147.9" y="87.5" class="cls-textCase"/>
      <text id="case07_text" x="163.8" y="87.5" class="cls-textCase"/>
      <text id="case08_text" x="179.6" y="87.5" class="cls-textCase"/>
      <text id="case09_text" x="195.5" y="87.5" class="cls-textCase"/>
      <text id="case010_text" x="211.3" y="87.5" class="cls-textCase"/>
      <text id="case011_text" x="227.1" y="87.5" class="cls-textCase"/>
      <text id="case012_text" x="243" y="87.5" class="cls-textCase"/>
      <text id="case013_text" x="258.8" y="87.5" class="cls-textCase"/>
      <text id="case014_text" x="274.7" y="87.5" class="cls-textCase"/>
      <text id="case015_text" x="290.5" y="87.5" class="cls-textCase"/>
    </g>
    <g id="g238" fill="#606060" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path234" d="M25.8 109.3v30.6h.4v-30.7h-.4z"/>
      <path id="path236" d="M26.2 67.5V36.7h-.4v30.7h.4z"/>
    </g>
    <g id="g248" fill="#212121" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path244" d="M25.5 67.3h.4V36.8h-.5v30.6z"/>
      <path id="path246" d="M25.5 109.3h-.1V140h.5v-30.6h-.4z"/>
    </g>
    <path id="path250" fill="#212121" stroke-width=".9" d="M18 123.1h286.8v.5H18z"/>
    <path id="path252" fill="#606060" stroke-width=".9" d="M18 122.8h286.8v.3H18z"/>
    <g id="g258" fill="#212121" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path254" d="M332.7 109.3h-.4v30.6h.5v-30.6z"/>
      <path id="path256" d="M332.7 67.3V36.7h-.4v30.7h.4z"/>
    </g>
    <g id="g264" fill="#606060" transform="matrix(.95829 0 0 .88143 -10.2 -3.4)">
      <path id="path260" d="M332 109.2v30.7h.3v-30.6l-.4-.1z"/>
      <path id="path262" d="M332.3 67.4V36.7h-.4v30.8l.4-.1z"/>
    </g>
    <path id="GND2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M12 8h9.7v9.7H12z"/>
    <path id="LCD_DATALINE5" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M175 8h9.7v9.7H175z"/>
    <path id="rect4824-7" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M145.3 8h9.7v9.7h-9.7z"/>
    <path id="rect4824-1" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M130.5 8h9.7v9.7h-9.7z"/>
    <path id="rect4824-2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M115.7 8h9.7v9.7h-9.7z"/>
    <path id="rect4824-24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M100.9 8h9.7v9.7h-9.7z"/>
    <path id="LCD_ENABLE" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M86.1 8h9.7v9.7h-9.7z"/>
    <path id="rw" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M71.2 8h9.7v9.7h-9.7z"/>
    <path id="LCD_RESET" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M56.4 8h9.7v9.7h-9.7z"/>
    <path id="GND4" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M41.6 8h9.7v9.7h-9.7z"/>
    <path id="VCC2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M26.8 8h9.7v9.7h-9.7z"/>
    <path id="LCD_DATALINE6" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M189.8 8h9.7v9.7h-9.7z"/>
    <path id="LCD_DATALINE4" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M160.1 8h9.7v9.7h-9.7z"/>
    <path id="VCC" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M219.4 8h9.7v9.7h-9.7z"/>
    <path id="LCD_DATALINE7" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M204.6 8h9.7v9.7h-9.7z"/>
    <path id="GND" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" d="M234.2 8h9.7v9.7h-9.7z"/>
  </svg>
        `;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function lightLevel() {
            let b = pxsim.lightSensorState();
            b.setUsed();
            return b.getLevel();
        }
        input.lightLevel = lightLevel;
        function onLightConditionChanged(condition, body) {
            let b = pxsim.lightSensorState();
            b.setUsed();
            pxsim.pxtcore.registerWithDal(b.id, condition, body);
        }
        input.onLightConditionChanged = onLightConditionChanged;
        function setLightThreshold(condition, value) {
            let b = pxsim.lightSensorState();
            b.setUsed();
            switch (condition) {
                case 1 /* DAL.SENSOR_THRESHOLD_LOW */:
                    b.setLowThreshold(value);
                    break;
                case 2 /* DAL.SENSOR_THRESHOLD_HIGH */:
                    b.setHighThreshold(value);
                    break;
            }
        }
        input.setLightThreshold = setLightThreshold;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function lightSensorState() {
        return pxsim.board().lightSensorState;
    }
    pxsim.lightSensorState = lightSensorState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function soundLevel() {
            let b = pxsim.microphoneState();
            if (!b)
                return 0;
            b.setUsed();
            return b.getLevel();
        }
        input.soundLevel = soundLevel;
        function onLoudSound(body) {
            let b = pxsim.microphoneState();
            if (!b)
                return;
            b.setUsed();
            pxsim.pxtcore.registerWithDal(b.id, 2 /* DAL.LEVEL_THRESHOLD_HIGH */, body);
        }
        input.onLoudSound = onLoudSound;
        function setLoudSoundThreshold(value) {
            let b = pxsim.microphoneState();
            if (!b)
                return;
            b.setUsed();
            b.setHighThreshold(value);
        }
        input.setLoudSoundThreshold = setLoudSoundThreshold;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class MicrophoneState extends pxsim.AnalogSensorState {
        constructor() {
            super(...arguments);
            this.onSoundRegistered = false;
            this.soundLevelRequested = false;
            this.pingSoundLevel = () => {
                if (this.onSoundRegistered) {
                    return;
                }
                this.soundLevelRequested = true;
                pxsim.runtime.queueDisplayUpdate();
                clearTimeout(this.pingUsed);
                this.pingUsed = setTimeout(() => {
                    this.soundLevelRequested = false;
                    pxsim.runtime.queueDisplayUpdate();
                    this.pingUsed = undefined;
                }, 100);
            };
        }
    }
    pxsim.MicrophoneState = MicrophoneState;
    function microphoneState() {
        return pxsim.board().microphoneState;
    }
    pxsim.microphoneState = microphoneState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var music;
    (function (music) {
        function playInstructions(b) {
            return pxsim.AudioContextManager.playInstructionsAsync(b.data);
        }
        music.playInstructions = playInstructions;
        function queuePlayInstructions(when, b) {
            pxsim.AudioContextManager.queuePlayInstructions(when, b);
        }
        music.queuePlayInstructions = queuePlayInstructions;
        function stopPlaying() {
            pxsim.AudioContextManager.muteAllChannels();
            if (sequencers) {
                for (const seq of sequencers) {
                    seq.sequencer.stop();
                    seq.sequencer.dispose();
                }
            }
        }
        music.stopPlaying = stopPlaying;
        function forceOutput(mode) { }
        music.forceOutput = forceOutput;
        music.SEQUENCER_STOP_MESSAGE = 3243;
        music.SEQUENCER_TICK_MESSAGE = 3244;
        music.SEQUENCER_STATE_CHANGE_MESSAGE = 3245;
        music.SEQUENCER_LOOPED_MESSAGE = 3246;
        let sequencers;
        let nextSequencerId = 0;
        async function _createSequencer() {
            if (!sequencers) {
                pxsim.AudioContextManager.onStopAll(() => {
                    for (const seq of sequencers) {
                        seq.sequencer.stop();
                        seq.sequencer.dispose();
                    }
                    sequencers = [];
                });
                sequencers = [];
            }
            const res = {
                id: nextSequencerId++,
                sequencer: new music.Sequencer()
            };
            sequencers.push(res);
            await res.sequencer.initAsync();
            res.sequencer.addEventListener("stop", () => {
                pxsim.board().bus.queue(music.SEQUENCER_STOP_MESSAGE, this.id);
            });
            res.sequencer.addEventListener("state-change", () => {
                pxsim.board().bus.queue(music.SEQUENCER_STATE_CHANGE_MESSAGE, this.id);
            });
            res.sequencer.addEventListener("looped", () => {
                pxsim.board().bus.queue(music.SEQUENCER_LOOPED_MESSAGE, this.id);
            });
            res.sequencer.addEventListener("tick", () => {
                pxsim.board().bus.queue(music.SEQUENCER_TICK_MESSAGE, this.id);
            });
            return res.id;
        }
        music._createSequencer = _createSequencer;
        function _sequencerState(id) {
            var _a;
            return (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.state();
        }
        music._sequencerState = _sequencerState;
        function _sequencerCurrentTick(id) {
            var _a;
            return (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.currentTick();
        }
        music._sequencerCurrentTick = _sequencerCurrentTick;
        function _sequencerPlaySong(id, song, loop) {
            var _a;
            const decoded = music.decodeSong(song.data);
            (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.start(decoded, loop);
        }
        music._sequencerPlaySong = _sequencerPlaySong;
        function _sequencerStop(id) {
            var _a;
            (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.stop();
        }
        music._sequencerStop = _sequencerStop;
        function _sequencerSetVolume(id, volume) {
            var _a;
            (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.setVolume(volume);
        }
        music._sequencerSetVolume = _sequencerSetVolume;
        function _sequencerSetVolumeForAll(volume) {
            for (const seq of sequencers) {
                seq.sequencer.setVolume(volume);
            }
        }
        music._sequencerSetVolumeForAll = _sequencerSetVolumeForAll;
        function _sequencerSetTrackVolume(id, trackIndex, volume) {
            var _a;
            (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.setTrackVolume(trackIndex, volume);
        }
        music._sequencerSetTrackVolume = _sequencerSetTrackVolume;
        function _sequencerSetDrumTrackVolume(id, trackIndex, drumIndex, volume) {
            var _a;
            (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.setDrumTrackVolume(trackIndex, drumIndex, volume);
        }
        music._sequencerSetDrumTrackVolume = _sequencerSetDrumTrackVolume;
        function _sequencerDispose(id) {
            var _a;
            (_a = lookupSequencer(id)) === null || _a === void 0 ? void 0 : _a.dispose();
            sequencers = sequencers.filter(s => s.id !== id);
        }
        music._sequencerDispose = _sequencerDispose;
        function lookupSequencer(id) {
            for (const seq of sequencers)
                if (seq.id === id)
                    return seq.sequencer;
            return undefined;
        }
    })(music = pxsim.music || (pxsim.music = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var mouse;
    (function (mouse) {
        function setButton(button, down) {
        }
        mouse.setButton = setButton;
        function move(x, y) {
        }
        mouse.move = move;
        function turnWheel(w) {
        }
        mouse.turnWheel = turnWheel;
    })(mouse = pxsim.mouse || (pxsim.mouse = {}));
})(pxsim || (pxsim = {}));
/*
namespace pxsim {
    export class NetSocket {
        constructor(public ws: WebSocket) { }
        send(data: string): void {
            this.ws.send(data);
        }
        close(): void {
            this.ws.close();
        }
        onOpen(handler: RefAction): void {
            this.ws.onopen = () => {
                const r = pxsim.runtime;
                if (r) r.runFiberAsync(handler).done();
            }
        }
        onClose(handler: pxsim.RefAction): void {
            this.ws.onclose = () => {
                const r = pxsim.runtime;
                if (r) r.runFiberAsync(handler).done();
            }
        }
        onError(handler: RefAction): void {
            this.ws.onerror = () => {
                const r = pxsim.runtime;
                if (r) r.runFiberAsync(handler).done();
            }
        }
        onMessage(handler: RefAction): void {
            this.ws.onmessage = (ev: MessageEvent) => {
                const r = pxsim.runtime;
                if (r) r.runFiberAsync(handler, ev.data).done();
            }
        }
    }

    export class Net {
        connect(host: string, port: number): NetSocket {
            // ignore port
            const r = pxsim.runtime;
            if (!r) return undefined;
            const ws = r.createWebSocket(`${host}::443/$iothub/websocket`);
            return new NetSocket(ws);
        }
    }
}

namespace pxsim.azureiot {
    export function createAzureNet(): Net {
        return new Net();
    }
}

namespace pxsim.NetMethods {
    export function connect(net: Net, host: string, port: number): NetSocket {
        return net.connect(host, port);
    }
}

namespace pxsim.SocketMethods {
    export function send(ws: pxsim.NetSocket, data: string): void {
        ws.send(data);
    }
    export function close(ws: pxsim.NetSocket): void {
        ws.close();
    }
    export function onOpen(ws: pxsim.NetSocket, handler: RefAction): void {
        ws.onOpen(handler);
    }
    export function onClose(ws: pxsim.NetSocket, handler: RefAction): void {
        ws.onClose(handler);
    }
    export function onError(ws: pxsim.NetSocket, handler: RefAction): void {
        ws.onError(handler);
    }
    export function onMessage(ws: pxsim.NetSocket, handler: RefAction): void {
        ws.onMessage(handler);
    }
}*/ 
var pxsim;
(function (pxsim) {
    class AudioState {
        constructor() {
            this.outputDestination_ = 0;
            this.volume = 100;
            this.playing = false;
        }
        startPlaying() {
            this.playing = true;
        }
        stopPlaying() {
            this.playing = false;
        }
        isPlaying() {
            return this.playing;
        }
    }
    pxsim.AudioState = AudioState;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var music;
    (function (music) {
        function noteFrequency(note) {
            return note;
        }
        music.noteFrequency = noteFrequency;
        function setOutput(mode) {
            const audioState = pxsim.getAudioState();
            audioState.outputDestination_ = mode;
        }
        music.setOutput = setOutput;
        function setVolume(volume) {
            const audioState = pxsim.getAudioState();
            audioState.volume = Math.max(0, 1024, volume * 4);
        }
        music.setVolume = setVolume;
        function setPitchPin(pin) {
            const audioState = pxsim.getAudioState();
            audioState.pitchPin_ = pin;
        }
        music.setPitchPin = setPitchPin;
        function setTone(buffer) {
            // TODO: implement set tone in the audio context
        }
        music.setTone = setTone;
        function enableAmp(enabled) {
            // TODO
        }
        music.enableAmp = enableAmp;
        function playTone(frequency, ms) {
            const b = pxsim.board();
            if (!b)
                return;
            const audioState = pxsim.getAudioState();
            const currentOutput = audioState.outputDestination_;
            audioState.startPlaying();
            pxsim.runtime.queueDisplayUpdate();
            pxsim.AudioContextManager.tone(frequency, 1);
            let cb = pxsim.getResume();
            if (ms <= 0)
                cb();
            else {
                pxsim.runtime.schedule(() => {
                    pxsim.AudioContextManager.stop();
                    audioState.stopPlaying();
                    pxsim.runtime.queueDisplayUpdate();
                    cb();
                }, ms);
            }
        }
        music.playTone = playTone;
        function getPitchPin() {
            const audioState = pxsim.getAudioState();
            if (!audioState.pitchPin_) {
                audioState.pitchPin_ = pxsim.board().getDefaultPitchPin();
            }
            return audioState.pitchPin_;
        }
    })(music = pxsim.music || (pxsim.music = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function getAudioState() {
        return pxsim.board().audioState;
    }
    pxsim.getAudioState = getAudioState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var radio;
    (function (radio) {
        function raiseEvent(id, eventid) {
            const state = pxsim.getRadioState();
            state.raiseEvent(id, eventid);
        }
        radio.raiseEvent = raiseEvent;
        function setGroup(id) {
            const state = pxsim.getRadioState();
            state.setGroup(id);
        }
        radio.setGroup = setGroup;
        function setTransmitPower(power) {
            const state = pxsim.getRadioState();
            state.setTransmitPower(power);
        }
        radio.setTransmitPower = setTransmitPower;
        function setFrequencyBand(band) {
            const state = pxsim.getRadioState();
            state.setFrequencyBand(band);
        }
        radio.setFrequencyBand = setFrequencyBand;
        function sendRawPacket(buf) {
            let cb = pxsim.getResume();
            const state = pxsim.getRadioState();
            if (state.enable) {
                state.datagram.send({
                    type: 0,
                    groupId: state.groupId,
                    bufferData: buf.data
                });
            }
            setTimeout(cb, 1);
        }
        radio.sendRawPacket = sendRawPacket;
        function readRawPacket() {
            const state = pxsim.getRadioState();
            const packet = state.datagram.recv();
            const buf = packet.payload.bufferData;
            const n = buf.length;
            if (!n)
                return undefined;
            const rbuf = pxsim.BufferMethods.createBuffer(n + 4);
            for (let i = 0; i < buf.length; ++i)
                rbuf.data[i] = buf[i];
            // append RSSI
            pxsim.BufferMethods.setNumber(rbuf, pxsim.BufferMethods.NumberFormat.Int32LE, n, packet.rssi);
            return rbuf;
        }
        radio.readRawPacket = readRawPacket;
        function onDataReceived(handler) {
            const state = pxsim.getRadioState();
            state.datagram.onReceived(handler);
        }
        radio.onDataReceived = onDataReceived;
        function off() {
            const state = pxsim.getRadioState();
            state.off();
        }
        radio.off = off;
        function on() {
            const state = pxsim.getRadioState();
            state.on();
        }
        radio.on = on;
    })(radio = pxsim.radio || (pxsim.radio = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function getRadioState() {
        return pxsim.board().radioState;
    }
    pxsim.getRadioState = getRadioState;
    class RadioDatagram {
        constructor(runtime, dal) {
            this.runtime = runtime;
            this.dal = dal;
            this.datagram = [];
            this.lastReceived = RadioDatagram.defaultPacket();
            this._rssi = undefined; // not set yet
        }
        get rssi() {
            return this._rssi;
        }
        set rssi(value) {
            this._rssi = value | 0;
        }
        queue(packet) {
            if (this.datagram.length < 4)
                this.datagram.push(packet);
            pxsim.runtime.board.bus.queue(this.dal.ID_RADIO, this.dal.RADIO_EVT_DATAGRAM);
        }
        send(payload) {
            const state = getRadioState();
            pxsim.Runtime.postMessage({
                type: "radiopacket",
                broadcast: true,
                rssi: this._rssi || -75,
                serial: state.transmitSerialNumber ? pxsim.control.deviceSerialNumber() : 0,
                time: new Date().getTime(),
                payload
            });
        }
        recv() {
            let r = this.datagram.shift();
            if (!r)
                r = RadioDatagram.defaultPacket();
            return this.lastReceived = r;
        }
        onReceived(handler) {
            pxsim.pxtcore.registerWithDal(this.dal.ID_RADIO, this.dal.RADIO_EVT_DATAGRAM, handler);
            this.recv();
        }
        static defaultPacket() {
            return {
                rssi: -1,
                serial: 0,
                time: 0,
                payload: { type: -1, groupId: 0, bufferData: new Uint8Array(0) }
            };
        }
    }
    pxsim.RadioDatagram = RadioDatagram;
    class RadioState {
        constructor(runtime, board, dal) {
            this.runtime = runtime;
            this.board = board;
            this.power = 0;
            this.transmitSerialNumber = false;
            this.datagram = new RadioDatagram(runtime, dal);
            this.power = 6; // default value
            this.groupId = 0;
            this.band = 7; // https://github.com/lancaster-university/microbit-dal/blob/master/inc/core/MicroBitConfig.h#L320
            this.enable = true;
            this.board.addMessageListener(this.handleMessage.bind(this));
        }
        handleMessage(msg) {
            if (msg.type == "radiopacket") {
                let packet = msg;
                this.receivePacket(packet);
            }
        }
        setGroup(id) {
            if (this.enable) {
                this.groupId = id & 0xff; // byte only
            }
        }
        setTransmitPower(power) {
            if (this.enable) {
                power = power | 0;
                this.power = Math.max(0, Math.min(7, power));
            }
        }
        setTransmitSerialNumber(sn) {
            this.transmitSerialNumber = !!sn;
        }
        setFrequencyBand(band) {
            if (this.enable) {
                band = band | 0;
                if (band < 0 || band > 83)
                    return;
                this.band = band;
            }
        }
        off() {
            this.enable = false;
        }
        on() {
            this.enable = true;
        }
        raiseEvent(id, eventid) {
            if (this.enable) {
                pxsim.Runtime.postMessage({
                    type: "eventbus",
                    broadcast: true,
                    id,
                    eventid,
                    power: this.power,
                    group: this.groupId
                });
            }
        }
        receivePacket(packet) {
            if (this.enable) {
                if (this.groupId == packet.payload.groupId) {
                    this.datagram.queue(packet);
                }
            }
        }
    }
    pxsim.RadioState = RadioState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var encoders;
    (function (encoders) {
        const ROT_EV_CHANGED = 0x2233;
        function createRotaryEncoder(pinA, pinB) {
            return new RotaryEncoder(pinA, pinB, 0);
        }
        encoders.createRotaryEncoder = createRotaryEncoder;
        class RotaryEncoder {
            constructor(pinA, pinB, position) {
                this.pinA = pinA;
                this.pinB = pinB;
                this.position = position;
            }
            get id() {
                return this.pinA.id;
            }
            onChanged(handler) {
                pxsim.control.internalOnEvent(this.id, ROT_EV_CHANGED, handler);
            }
        }
        encoders.RotaryEncoder = RotaryEncoder;
    })(encoders = pxsim.encoders || (pxsim.encoders = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var RotaryEncoderMethods;
    (function (RotaryEncoderMethods) {
        function onChanged(encoder, handler) {
            encoder.onChanged(handler);
        }
        RotaryEncoderMethods.onChanged = onChanged;
        function position(encoder) {
            return encoder.position;
        }
        RotaryEncoderMethods.position = position;
    })(RotaryEncoderMethods = pxsim.RotaryEncoderMethods || (pxsim.RotaryEncoderMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class RefImage extends pxsim.RefObject {
        constructor(w, h, bpp) {
            super();
            this.isStatic = true;
            this.revision = 0;
            this.data = new Uint8Array(w * h);
            this._width = w;
            this._height = h;
            this._bpp = bpp;
        }
        scan(mark) { }
        gcKey() { return "Image"; }
        gcSize() { return 4 + (this.data.length + 3 >> 3); }
        gcIsStatic() { return this.isStatic; }
        pix(x, y) {
            return (x | 0) + (y | 0) * this._width;
        }
        inRange(x, y) {
            return 0 <= (x | 0) && (x | 0) < this._width &&
                0 <= (y | 0) && (y | 0) < this._height;
        }
        color(c) {
            return c & 0xff;
        }
        clamp(x, y) {
            x |= 0;
            y |= 0;
            if (x < 0)
                x = 0;
            else if (x >= this._width)
                x = this._width - 1;
            if (y < 0)
                y = 0;
            else if (y >= this._height)
                y = this._height - 1;
            return [x, y];
        }
        makeWritable() {
            this.revision++;
            this.isStatic = false;
        }
        toDebugString() {
            return this._width + "x" + this._height;
        }
    }
    pxsim.RefImage = RefImage;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var ImageMethods;
    (function (ImageMethods) {
        function XX(x) { return (x << 16) >> 16; }
        function YY(x) { return x >> 16; }
        function width(img) { return img._width; }
        ImageMethods.width = width;
        function height(img) { return img._height; }
        ImageMethods.height = height;
        function isMono(img) { return img._bpp == 1; }
        ImageMethods.isMono = isMono;
        function isStatic(img) { return img.gcIsStatic(); }
        ImageMethods.isStatic = isStatic;
        function revision(img) { return img.revision; }
        ImageMethods.revision = revision;
        function setPixel(img, x, y, c) {
            img.makeWritable();
            if (img.inRange(x, y))
                img.data[img.pix(x, y)] = img.color(c);
        }
        ImageMethods.setPixel = setPixel;
        function getPixel(img, x, y) {
            if (img.inRange(x, y))
                return img.data[img.pix(x, y)];
            return 0;
        }
        ImageMethods.getPixel = getPixel;
        function fill(img, c) {
            img.makeWritable();
            img.data.fill(img.color(c));
        }
        ImageMethods.fill = fill;
        function fillRect(img, x, y, w, h, c) {
            if (w == 0 || h == 0 || x >= img._width || y >= img._height || x + w - 1 < 0 || y + h - 1 < 0)
                return;
            img.makeWritable();
            let [x2, y2] = img.clamp(x + w - 1, y + h - 1);
            [x, y] = img.clamp(x, y);
            let p = img.pix(x, y);
            w = x2 - x + 1;
            h = y2 - y + 1;
            let d = img._width - w;
            c = img.color(c);
            while (h-- > 0) {
                for (let i = 0; i < w; ++i)
                    img.data[p++] = c;
                p += d;
            }
        }
        ImageMethods.fillRect = fillRect;
        function _fillRect(img, xy, wh, c) {
            fillRect(img, XX(xy), YY(xy), XX(wh), YY(wh), c);
        }
        ImageMethods._fillRect = _fillRect;
        function mapRect(img, x, y, w, h, c) {
            if (c.data.length < 16)
                return;
            img.makeWritable();
            let [x2, y2] = img.clamp(x + w - 1, y + h - 1);
            [x, y] = img.clamp(x, y);
            let p = img.pix(x, y);
            w = x2 - x + 1;
            h = y2 - y + 1;
            let d = img._width - w;
            while (h-- > 0) {
                for (let i = 0; i < w; ++i) {
                    img.data[p] = c.data[img.data[p]];
                    p++;
                }
                p += d;
            }
        }
        ImageMethods.mapRect = mapRect;
        function _mapRect(img, xy, wh, c) {
            mapRect(img, XX(xy), YY(xy), XX(wh), YY(wh), c);
        }
        ImageMethods._mapRect = _mapRect;
        function equals(img, other) {
            if (!other || img._bpp != other._bpp || img._width != other._width || img._height != other._height) {
                return false;
            }
            let imgData = img.data;
            let otherData = other.data;
            let len = imgData.length;
            for (let i = 0; i < len; i++) {
                if (imgData[i] != otherData[i]) {
                    return false;
                }
            }
            return true;
        }
        ImageMethods.equals = equals;
        function getRows(img, x, dst) {
            x |= 0;
            if (!img.inRange(x, 0))
                return;
            let dp = 0;
            let len = Math.min(dst.data.length, (img._width - x) * img._height);
            let sp = x;
            let hh = 0;
            while (len--) {
                if (hh++ >= img._height) {
                    hh = 1;
                    sp = ++x;
                }
                dst.data[dp++] = img.data[sp];
                sp += img._width;
            }
        }
        ImageMethods.getRows = getRows;
        function setRows(img, x, src) {
            x |= 0;
            if (!img.inRange(x, 0))
                return;
            let sp = 0;
            let len = Math.min(src.data.length, (img._width - x) * img._height);
            let dp = x;
            let hh = 0;
            while (len--) {
                if (hh++ >= img._height) {
                    hh = 1;
                    dp = ++x;
                }
                img.data[dp] = src.data[sp++];
                dp += img._width;
            }
        }
        ImageMethods.setRows = setRows;
        function clone(img) {
            let r = new pxsim.RefImage(img._width, img._height, img._bpp);
            r.data.set(img.data);
            return r;
        }
        ImageMethods.clone = clone;
        function flipX(img) {
            img.makeWritable();
            const w = img._width;
            const h = img._height;
            for (let i = 0; i < h; ++i) {
                img.data.subarray(i * w, (i + 1) * w).reverse();
            }
        }
        ImageMethods.flipX = flipX;
        function flipY(img) {
            img.makeWritable();
            const w = img._width;
            const h = img._height;
            const d = img.data;
            for (let i = 0; i < w; ++i) {
                let top = i;
                let bot = i + (h - 1) * w;
                while (top < bot) {
                    let c = d[top];
                    d[top] = d[bot];
                    d[bot] = c;
                    top += w;
                    bot -= w;
                }
            }
        }
        ImageMethods.flipY = flipY;
        function transposed(img) {
            const w = img._width;
            const h = img._height;
            const d = img.data;
            const r = new pxsim.RefImage(h, w, img._bpp);
            const n = r.data;
            let src = 0;
            for (let i = 0; i < h; ++i) {
                let dst = i;
                for (let j = 0; j < w; ++j) {
                    n[dst] = d[src++];
                    dst += w;
                }
            }
            return r;
        }
        ImageMethods.transposed = transposed;
        function copyFrom(img, from) {
            if (img._width != from._width || img._height != from._height ||
                img._bpp != from._bpp)
                return;
            img.data.set(from.data);
        }
        ImageMethods.copyFrom = copyFrom;
        function scroll(img, dx, dy) {
            img.makeWritable();
            dx |= 0;
            dy |= 0;
            if (dx != 0) {
                const img2 = clone(img);
                img.data.fill(0);
                drawTransparentImage(img, img2, dx, dy);
            }
            else if (dy < 0) {
                dy = -dy;
                if (dy < img._height)
                    img.data.copyWithin(0, dy * img._width);
                else
                    dy = img._height;
                img.data.fill(0, (img._height - dy) * img._width);
            }
            else if (dy > 0) {
                if (dy < img._height)
                    img.data.copyWithin(dy * img._width, 0);
                else
                    dy = img._height;
                img.data.fill(0, 0, dy * img._width);
            }
            // TODO implement dx
        }
        ImageMethods.scroll = scroll;
        function replace(img, from, to) {
            to &= 0xf;
            const d = img.data;
            for (let i = 0; i < d.length; ++i)
                if (d[i] == from)
                    d[i] = to;
        }
        ImageMethods.replace = replace;
        function doubledX(img) {
            const w = img._width;
            const h = img._height;
            const d = img.data;
            const r = new pxsim.RefImage(w * 2, h, img._bpp);
            const n = r.data;
            let dst = 0;
            for (let src = 0; src < d.length; ++src) {
                let c = d[src];
                n[dst++] = c;
                n[dst++] = c;
            }
            return r;
        }
        ImageMethods.doubledX = doubledX;
        function doubledY(img) {
            const w = img._width;
            const h = img._height;
            const d = img.data;
            const r = new pxsim.RefImage(w, h * 2, img._bpp);
            const n = r.data;
            let src = 0;
            let dst0 = 0;
            let dst1 = w;
            for (let i = 0; i < h; ++i) {
                for (let j = 0; j < w; ++j) {
                    let c = d[src++];
                    n[dst0++] = c;
                    n[dst1++] = c;
                }
                dst0 += w;
                dst1 += w;
            }
            return r;
        }
        ImageMethods.doubledY = doubledY;
        function doubled(img) {
            return doubledX(doubledY(img));
        }
        ImageMethods.doubled = doubled;
        function drawImageCore(img, from, x, y, clear, check) {
            x |= 0;
            y |= 0;
            const w = from._width;
            let h = from._height;
            const sh = img._height;
            const sw = img._width;
            if (x + w <= 0)
                return false;
            if (x >= sw)
                return false;
            if (y + h <= 0)
                return false;
            if (y >= sh)
                return false;
            if (clear)
                fillRect(img, x, y, from._width, from._height, 0);
            else if (!check)
                img.makeWritable();
            const len = x < 0 ? Math.min(sw, w + x) : Math.min(sw - x, w);
            const fdata = from.data;
            const tdata = img.data;
            for (let p = 0; h--; y++, p += w) {
                if (0 <= y && y < sh) {
                    let dst = y * sw;
                    let src = p;
                    if (x < 0)
                        src += -x;
                    else
                        dst += x;
                    for (let i = 0; i < len; ++i) {
                        const v = fdata[src++];
                        if (v) {
                            if (check) {
                                if (tdata[dst])
                                    return true;
                            }
                            else {
                                tdata[dst] = v;
                            }
                        }
                        dst++;
                    }
                }
            }
            return false;
        }
        function drawImage(img, from, x, y) {
            drawImageCore(img, from, x, y, true, false);
        }
        ImageMethods.drawImage = drawImage;
        function drawTransparentImage(img, from, x, y) {
            drawImageCore(img, from, x, y, false, false);
        }
        ImageMethods.drawTransparentImage = drawTransparentImage;
        function overlapsWith(img, other, x, y) {
            return drawImageCore(img, other, x, y, false, true);
        }
        ImageMethods.overlapsWith = overlapsWith;
        function drawLineLow(img, x0, y0, x1, y1, c) {
            let dx = x1 - x0;
            let dy = y1 - y0;
            let yi = img._width;
            if (dy < 0) {
                yi = -yi;
                dy = -dy;
            }
            let D = 2 * dy - dx;
            dx <<= 1;
            dy <<= 1;
            c = img.color(c);
            let ptr = img.pix(x0, y0);
            for (let x = x0; x <= x1; ++x) {
                img.data[ptr] = c;
                if (D > 0) {
                    ptr += yi;
                    D -= dx;
                }
                D += dy;
                ptr++;
            }
        }
        function drawLineHigh(img, x0, y0, x1, y1, c) {
            let dx = x1 - x0;
            let dy = y1 - y0;
            let xi = 1;
            if (dx < 0) {
                xi = -1;
                dx = -dx;
            }
            let D = 2 * dx - dy;
            dx <<= 1;
            dy <<= 1;
            c = img.color(c);
            let ptr = img.pix(x0, y0);
            for (let y = y0; y <= y1; ++y) {
                img.data[ptr] = c;
                if (D > 0) {
                    ptr += xi;
                    D -= dy;
                }
                D += dx;
                ptr += img._width;
            }
        }
        function _drawLine(img, xy, wh, c) {
            drawLine(img, XX(xy), YY(xy), XX(wh), YY(wh), c);
        }
        ImageMethods._drawLine = _drawLine;
        function drawLine(img, x0, y0, x1, y1, c) {
            x0 |= 0;
            y0 |= 0;
            x1 |= 0;
            y1 |= 0;
            if (x1 < x0) {
                drawLine(img, x1, y1, x0, y0, c);
                return;
            }
            let w = x1 - x0;
            let h = y1 - y0;
            if (h == 0) {
                if (w == 0)
                    setPixel(img, x0, y0, c);
                else
                    fillRect(img, x0, y0, w + 1, 1, c);
                return;
            }
            if (w == 0) {
                if (h > 0)
                    fillRect(img, x0, y0, 1, h + 1, c);
                else
                    fillRect(img, x0, y1, 1, -h + 1, c);
                return;
            }
            if (x1 < 0 || x0 >= img._width)
                return;
            if (x0 < 0) {
                y0 -= (h * x0 / w) | 0;
                x0 = 0;
            }
            if (x1 >= img._width) {
                let d = (img._width - 1) - x1;
                y1 += (h * d / w) | 0;
                x1 = img._width - 1;
            }
            if (y0 < y1) {
                if (y0 >= img._height || y1 < 0)
                    return;
                if (y0 < 0) {
                    x0 -= (w * y0 / h) | 0;
                    y0 = 0;
                }
                if (y1 >= img._height) {
                    let d = (img._height - 1) - y1;
                    x1 += (w * d / h) | 0;
                    y1 = img._height;
                }
            }
            else {
                if (y1 >= img._height || y0 < 0)
                    return;
                if (y1 < 0) {
                    x1 -= (w * y1 / h) | 0;
                    y1 = 0;
                }
                if (y0 >= img._height) {
                    let d = (img._height - 1) - y0;
                    x0 += (w * d / h) | 0;
                    y0 = img._height;
                }
            }
            img.makeWritable();
            if (h < 0) {
                h = -h;
                if (h < w)
                    drawLineLow(img, x0, y0, x1, y1, c);
                else
                    drawLineHigh(img, x1, y1, x0, y0, c);
            }
            else {
                if (h < w)
                    drawLineLow(img, x0, y0, x1, y1, c);
                else
                    drawLineHigh(img, x0, y0, x1, y1, c);
            }
        }
        ImageMethods.drawLine = drawLine;
        function drawIcon(img, icon, x, y, color) {
            const img2 = icon.data;
            if (!pxsim.image.isValidImage(icon))
                return;
            if (img2[1] != 1)
                return; // only mono
            let w = pxsim.image.bufW(img2);
            let h = pxsim.image.bufH(img2);
            let byteH = pxsim.image.byteHeight(h, 1);
            x |= 0;
            y |= 0;
            const sh = img._height;
            const sw = img._width;
            if (x + w <= 0)
                return;
            if (x >= sw)
                return;
            if (y + h <= 0)
                return;
            if (y >= sh)
                return;
            img.makeWritable();
            let p = 8;
            color = img.color(color);
            const screen = img.data;
            for (let i = 0; i < w; ++i) {
                let xxx = x + i;
                if (0 <= xxx && xxx < sw) {
                    let dst = xxx + y * sw;
                    let src = p;
                    let yy = y;
                    let end = Math.min(sh, h + y);
                    if (y < 0) {
                        src += ((-y) >> 3);
                        yy += ((-y) >> 3) * 8;
                    }
                    let mask = 0x01;
                    let v = img2[src++];
                    while (yy < end) {
                        if (yy >= 0 && (v & mask)) {
                            screen[dst] = color;
                        }
                        mask <<= 1;
                        if (mask == 0x100) {
                            mask = 0x01;
                            v = img2[src++];
                        }
                        dst += sw;
                        yy++;
                    }
                }
                p += byteH;
            }
        }
        ImageMethods.drawIcon = drawIcon;
        function _drawIcon(img, icon, xy, color) {
            drawIcon(img, icon, XX(xy), YY(xy), color);
        }
        ImageMethods._drawIcon = _drawIcon;
        function fillCircle(img, cx, cy, r, c) {
            let x = r - 1;
            let y = 0;
            let dx = 1;
            let dy = 1;
            let err = dx - (r << 1);
            while (x >= y) {
                fillRect(img, cx + x, cy - y, 1, 1 + (y << 1), c);
                fillRect(img, cx + y, cy - x, 1, 1 + (x << 1), c);
                fillRect(img, cx - x, cy - y, 1, 1 + (y << 1), c);
                fillRect(img, cx - y, cy - x, 1, 1 + (x << 1), c);
                if (err <= 0) {
                    y++;
                    err += dy;
                    dy += 2;
                }
                if (err > 0) {
                    x--;
                    dx += 2;
                    err += dx - (r << 1);
                }
            }
        }
        ImageMethods.fillCircle = fillCircle;
        function _fillCircle(img, cxy, r, c) {
            fillCircle(img, XX(cxy), YY(cxy), r, c);
        }
        ImageMethods._fillCircle = _fillCircle;
        function nextYRange_Low(x, line, yRange) {
            while (line.x === x && line.x <= line.x1 && line.x < line.W) {
                if (0 <= line.x) {
                    if (line.y < yRange.min)
                        yRange.min = line.y;
                    if (line.y > yRange.max)
                        yRange.max = line.y;
                }
                if (line.D > 0) {
                    line.y += line.yi;
                    line.D -= line.dx;
                }
                line.D += line.dy;
                ++line.x;
            }
        }
        function nextYRange_HighUp(x, line, yRange) {
            while (line.x == x && line.y >= line.y1 && line.x < line.W) {
                if (0 <= line.x) {
                    if (line.y < yRange.min)
                        yRange.min = line.y;
                    if (line.y > yRange.max)
                        yRange.max = line.y;
                }
                if (line.D > 0) {
                    line.x += line.xi;
                    line.D += line.dy;
                }
                line.D += line.dx;
                --line.y;
            }
        }
        function nextYRange_HighDown(x, line, yRange) {
            while (line.x == x && line.y <= line.y1 && line.x < line.W) {
                if (0 <= line.x) {
                    if (line.y < yRange.min)
                        yRange.min = line.y;
                    if (line.y > yRange.max)
                        yRange.max = line.y;
                }
                if (line.D > 0) {
                    line.x += line.xi;
                    line.D -= line.dy;
                }
                line.D += line.dx;
                ++line.y;
            }
        }
        function initYRangeGenerator(X0, Y0, X1, Y1) {
            const line = {
                x: X0,
                y: Y0,
                x0: X0,
                y0: Y0,
                x1: X1,
                y1: Y1,
                W: 0,
                H: 0,
                dx: X1 - X0,
                dy: Y1 - Y0,
                yi: 0,
                xi: 0,
                D: 0,
                nextFuncIndex: 0,
            };
            if ((line.dy < 0 ? -line.dy : line.dy) < line.dx) {
                line.yi = 1;
                if (line.dy < 0) {
                    line.yi = -1;
                    line.dy = -line.dy;
                }
                line.D = 2 * line.dy - line.dx;
                line.dx = line.dx << 1;
                line.dy = line.dy << 1;
                line.nextFuncIndex = 0;
                return line;
            }
            else {
                line.xi = 1;
                if (line.dy < 0) {
                    line.D = 2 * line.dx + line.dy;
                    line.dx = line.dx << 1;
                    line.dy = line.dy << 1;
                    line.nextFuncIndex = 1;
                    return line;
                }
                else {
                    line.D = 2 * line.dx - line.dy;
                    line.dx = line.dx << 1;
                    line.dy = line.dy << 1;
                    line.nextFuncIndex = 2;
                    return line;
                }
            }
        }
        function fillTriangle(img, x0, y0, x1, y1, x2, y2, c) {
            if (x1 < x0) {
                [x1, x0] = [x0, x1];
                [y1, y0] = [y0, y1];
            }
            if (x2 < x1) {
                [x2, x1] = [x1, x2];
                [y2, y1] = [y1, y2];
            }
            if (x1 < x0) {
                [x1, x0] = [x0, x1];
                [y1, y0] = [y0, y1];
            }
            const lines = [
                initYRangeGenerator(x0, y0, x2, y2),
                initYRangeGenerator(x0, y0, x1, y1),
                initYRangeGenerator(x1, y1, x2, y2)
            ];
            lines[0].W = lines[1].W = lines[2].W = width(img);
            lines[0].H = lines[1].H = lines[2].H = height(img);
            const nextFuncList = [
                nextYRange_Low,
                nextYRange_HighUp,
                nextYRange_HighDown
            ];
            const fpNext0 = nextFuncList[lines[0].nextFuncIndex];
            const fpNext1 = nextFuncList[lines[1].nextFuncIndex];
            const fpNext2 = nextFuncList[lines[2].nextFuncIndex];
            const yRange = {
                min: lines[0].H,
                max: -1
            };
            for (let x = lines[1].x0; x <= lines[1].x1; x++) {
                yRange.min = lines[0].H;
                yRange.max = -1;
                fpNext0(x, lines[0], yRange);
                fpNext1(x, lines[1], yRange);
                fillRect(img, x, yRange.min, 1, yRange.max - yRange.min + 1, c);
            }
            fpNext2(lines[2].x0, lines[2], yRange);
            for (let x = lines[2].x0 + 1; x <= lines[2].x1; x++) {
                yRange.min = lines[0].H;
                yRange.max = -1;
                fpNext0(x, lines[0], yRange);
                fpNext2(x, lines[2], yRange);
                fillRect(img, x, yRange.min, 1, yRange.max - yRange.min + 1, c);
            }
        }
        ImageMethods.fillTriangle = fillTriangle;
        function _fillTriangle(img, args) {
            fillTriangle(img, args.getAt(0) | 0, args.getAt(1) | 0, args.getAt(2) | 0, args.getAt(3) | 0, args.getAt(4) | 0, args.getAt(5) | 0, args.getAt(6) | 0);
        }
        ImageMethods._fillTriangle = _fillTriangle;
        function fillPolygon4(img, x0, y0, x1, y1, x2, y2, x3, y3, c) {
            const lines = [
                (x0 < x1) ? initYRangeGenerator(x0, y0, x1, y1) : initYRangeGenerator(x1, y1, x0, y0),
                (x1 < x2) ? initYRangeGenerator(x1, y1, x2, y2) : initYRangeGenerator(x2, y2, x1, y1),
                (x2 < x3) ? initYRangeGenerator(x2, y2, x3, y3) : initYRangeGenerator(x3, y3, x2, y2),
                (x0 < x3) ? initYRangeGenerator(x0, y0, x3, y3) : initYRangeGenerator(x3, y3, x0, y0)
            ];
            lines[0].W = lines[1].W = lines[2].W = lines[3].W = width(img);
            lines[0].H = lines[1].H = lines[2].H = lines[3].H = height(img);
            let minX = Math.min(Math.min(x0, x1), Math.min(x2, x3));
            let maxX = Math.min(Math.max(Math.max(x0, x1), Math.max(x2, x3)), lines[0].W - 1);
            const nextFuncList = [
                nextYRange_Low,
                nextYRange_HighUp,
                nextYRange_HighDown
            ];
            const fpNext0 = nextFuncList[lines[0].nextFuncIndex];
            const fpNext1 = nextFuncList[lines[1].nextFuncIndex];
            const fpNext2 = nextFuncList[lines[2].nextFuncIndex];
            const fpNext3 = nextFuncList[lines[3].nextFuncIndex];
            const yRange = {
                min: lines[0].H,
                max: -1
            };
            for (let x = minX; x <= maxX; x++) {
                yRange.min = lines[0].H;
                yRange.max = -1;
                fpNext0(x, lines[0], yRange);
                fpNext1(x, lines[1], yRange);
                fpNext2(x, lines[2], yRange);
                fpNext3(x, lines[3], yRange);
                fillRect(img, x, yRange.min, 1, yRange.max - yRange.min + 1, c);
            }
        }
        ImageMethods.fillPolygon4 = fillPolygon4;
        function _fillPolygon4(img, args) {
            fillPolygon4(img, args.getAt(0) | 0, args.getAt(1) | 0, args.getAt(2) | 0, args.getAt(3) | 0, args.getAt(4) | 0, args.getAt(5) | 0, args.getAt(6) | 0, args.getAt(7) | 0, args.getAt(8) | 0);
        }
        ImageMethods._fillPolygon4 = _fillPolygon4;
        function _blitRow(img, xy, from, xh) {
            blitRow(img, XX(xy), YY(xy), from, XX(xh), YY(xh));
        }
        ImageMethods._blitRow = _blitRow;
        function blitRow(img, x, y, from, fromX, fromH) {
            x |= 0;
            y |= 0;
            fromX |= 0;
            fromH |= 0;
            if (!img.inRange(x, 0) || !img.inRange(fromX, 0) || fromH <= 0)
                return;
            let fy = 0;
            let stepFY = ((from._width << 16) / fromH) | 0;
            let endY = y + fromH;
            if (endY > img._height)
                endY = img._height;
            if (y < 0) {
                fy += -y * stepFY;
                y = 0;
            }
            while (y < endY) {
                img.data[img.pix(x, y)] = from.data[from.pix(fromX, fy >> 16)];
                y++;
                fy += stepFY;
            }
        }
        ImageMethods.blitRow = blitRow;
        function _blit(img, src, args) {
            return blit(img, src, args);
        }
        ImageMethods._blit = _blit;
        function blit(dst, src, args) {
            const xDst = args.getAt(0);
            const yDst = args.getAt(1);
            const wDst = args.getAt(2);
            const hDst = args.getAt(3);
            const xSrc = args.getAt(4);
            const ySrc = args.getAt(5);
            const wSrc = args.getAt(6);
            const hSrc = args.getAt(7);
            const transparent = args.getAt(8);
            const check = args.getAt(9);
            const xSrcStep = ((wSrc << 16) / wDst) | 0;
            const ySrcStep = ((hSrc << 16) / hDst) | 0;
            const xDstClip = Math.abs(Math.min(0, xDst));
            const yDstClip = Math.abs(Math.min(0, yDst));
            const xDstStart = xDst + xDstClip;
            const yDstStart = yDst + yDstClip;
            const xDstEnd = Math.min(dst._width, xDst + wDst);
            const yDstEnd = Math.min(dst._height, yDst + hDst);
            const xSrcStart = Math.max(0, (xSrc << 16) + xDstClip * xSrcStep);
            const ySrcStart = Math.max(0, (ySrc << 16) + yDstClip * ySrcStep);
            const xSrcEnd = Math.min(src._width, xSrc + wSrc) << 16;
            const ySrcEnd = Math.min(src._height, ySrc + hSrc) << 16;
            if (!check)
                dst.makeWritable();
            for (let yDstCur = yDstStart, ySrcCur = ySrcStart; yDstCur < yDstEnd && ySrcCur < ySrcEnd; ++yDstCur, ySrcCur += ySrcStep) {
                const ySrcCurI = ySrcCur >> 16;
                for (let xDstCur = xDstStart, xSrcCur = xSrcStart; xDstCur < xDstEnd && xSrcCur < xSrcEnd; ++xDstCur, xSrcCur += xSrcStep) {
                    const xSrcCurI = xSrcCur >> 16;
                    const cSrc = getPixel(src, xSrcCurI, ySrcCurI);
                    if (check && cSrc) {
                        const cDst = getPixel(dst, xDstCur, yDstCur);
                        if (cDst) {
                            return true;
                        }
                        continue;
                    }
                    if (!transparent || cSrc) {
                        setPixel(dst, xDstCur, yDstCur, cSrc);
                    }
                }
            }
            return false;
        }
        ImageMethods.blit = blit;
    })(ImageMethods = pxsim.ImageMethods || (pxsim.ImageMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var image;
    (function (image) {
        function byteHeight(h, bpp) {
            if (bpp == 1)
                return h * bpp + 7 >> 3;
            else
                return ((h * bpp + 31) >> 5) << 2;
        }
        image.byteHeight = byteHeight;
        function isLegacyImage(buf) {
            if (!buf || buf.data.length < 5)
                return false;
            if (buf.data[0] != 0xe1 && buf.data[0] != 0xe4)
                return false;
            const bpp = buf.data[0] & 0xf;
            const sz = buf.data[1] * byteHeight(buf.data[2], bpp);
            if (4 + sz != buf.data.length)
                return false;
            return true;
        }
        function bufW(data) {
            return data[2] | (data[3] << 8);
        }
        image.bufW = bufW;
        function bufH(data) {
            return data[4] | (data[5] << 8);
        }
        image.bufH = bufH;
        function isValidImage(buf) {
            if (!buf || buf.data.length < 5)
                return false;
            if (buf.data[0] != 0x87)
                return false;
            if (buf.data[1] != 1 && buf.data[1] != 4)
                return false;
            const bpp = buf.data[1];
            const sz = bufW(buf.data) * byteHeight(bufH(buf.data), bpp);
            if (8 + sz != buf.data.length)
                return false;
            return true;
        }
        image.isValidImage = isValidImage;
        function create(w, h) {
            // truncate decimal sizes
            w |= 0;
            h |= 0;
            return new pxsim.RefImage(w, h, pxsim.getScreenState().bpp());
        }
        image.create = create;
        function ofBuffer(buf) {
            const src = buf.data;
            let srcP = 4;
            let w = 0, h = 0, bpp = 0;
            if (isLegacyImage(buf)) {
                w = src[1];
                h = src[2];
                bpp = src[0] & 0xf;
                // console.log("using legacy image")
            }
            else if (isValidImage(buf)) {
                srcP = 8;
                w = bufW(src);
                h = bufH(src);
                bpp = src[1];
            }
            if (w == 0 || h == 0)
                return null;
            const r = new pxsim.RefImage(w, h, bpp);
            const dst = r.data;
            r.isStatic = buf.isStatic;
            if (bpp == 1) {
                for (let i = 0; i < w; ++i) {
                    let dstP = i;
                    let mask = 0x01;
                    let v = src[srcP++];
                    for (let j = 0; j < h; ++j) {
                        if (mask == 0x100) {
                            mask = 0x01;
                            v = src[srcP++];
                        }
                        if (v & mask)
                            dst[dstP] = 1;
                        dstP += w;
                        mask <<= 1;
                    }
                }
            }
            else if (bpp == 4) {
                for (let i = 0; i < w; ++i) {
                    let dstP = i;
                    for (let j = 0; j < h >> 1; ++j) {
                        const v = src[srcP++];
                        dst[dstP] = v & 0xf;
                        dstP += w;
                        dst[dstP] = v >> 4;
                        dstP += w;
                    }
                    if (h & 1)
                        dst[dstP] = src[srcP++] & 0xf;
                    srcP = (srcP + 3) & ~3;
                }
            }
            return r;
        }
        image.ofBuffer = ofBuffer;
        function toBuffer(img) {
            let col = byteHeight(img._height, img._bpp);
            let sz = 8 + img._width * col;
            let r = new Uint8Array(sz);
            r[0] = 0x87;
            r[1] = img._bpp;
            r[2] = img._width & 0xff;
            r[3] = img._width >> 8;
            r[4] = img._height & 0xff;
            r[5] = img._height >> 8;
            let dstP = 8;
            const w = img._width;
            const h = img._height;
            const data = img.data;
            for (let i = 0; i < w; ++i) {
                if (img._bpp == 4) {
                    let p = i;
                    for (let j = 0; j < h; j += 2) {
                        r[dstP++] = ((data[p + w] & 0xf) << 4) | ((data[p] || 0) & 0xf);
                        p += 2 * w;
                    }
                    dstP = (dstP + 3) & ~3;
                }
                else if (img._bpp == 1) {
                    let mask = 0x01;
                    let p = i;
                    for (let j = 0; j < h; j++) {
                        if (data[p])
                            r[dstP] |= mask;
                        mask <<= 1;
                        p += w;
                        if (mask == 0x100) {
                            mask = 0x01;
                            dstP++;
                        }
                    }
                    if (mask != 0x01)
                        dstP++;
                }
            }
            return new pxsim.RefBuffer(r);
        }
        image.toBuffer = toBuffer;
        function doubledIcon(buf) {
            let img = ofBuffer(buf);
            if (!img)
                return null;
            img = pxsim.ImageMethods.doubled(img);
            return toBuffer(img);
        }
        image.doubledIcon = doubledIcon;
    })(image = pxsim.image || (pxsim.image = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function updateScreen(img) {
            const state = pxsim.getScreenState();
            if (state)
                state.showImage(img);
        }
        pxtcore.updateScreen = updateScreen;
        function updateStats(s) {
            const state = pxsim.getScreenState();
            if (state)
                state.updateStats(s);
        }
        pxtcore.updateStats = updateStats;
        function setPalette(b) {
            const state = pxsim.getScreenState();
            if (state)
                state.setPalette(b);
        }
        pxtcore.setPalette = setPalette;
        function setupScreenStatusBar(barHeight) {
            const state = pxsim.getScreenState();
            if (state)
                state.setupScreenStatusBar(barHeight);
        }
        pxtcore.setupScreenStatusBar = setupScreenStatusBar;
        function updateScreenStatusBar(img) {
            const state = pxsim.getScreenState();
            if (state)
                state.updateScreenStatusBar(img);
        }
        pxtcore.updateScreenStatusBar = updateScreenStatusBar;
        function setScreenBrightness(b) {
            // I guess we could at least turn the screen off, when b==0,
            // otherwise, it probably doesn't make much sense to do anything.
            const state = pxsim.getScreenState();
            if (state)
                state.setScreenBrightness(b);
        }
        pxtcore.setScreenBrightness = setScreenBrightness;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function htmlColorToUint32(hexColor) {
        const ca = new Uint8ClampedArray(4);
        const v = parseInt(hexColor.replace(/#/, ""), 16);
        ca[0] = (v >> 16) & 0xff;
        ca[1] = (v >> 8) & 0xff;
        ca[2] = (v >> 0) & 0xff;
        ca[3] = 0xff; // alpha
        // convert to uint32 using target endian
        return new Uint32Array(ca.buffer)[0];
    }
    function UInt32ToRGB(col) {
        const ui = new Uint32Array(1);
        ui[0] = col;
        const ca = new Uint8ClampedArray(ui.buffer);
        return [ca[0], ca[1], ca[2]];
    }
    class ScreenState {
        constructor(paletteSrc, w = 0, h = 0) {
            this.width = 0;
            this.height = 0;
            this.lastImageFlushTime = 0;
            this.changed = true;
            this.brightness = 255;
            this.onChange = () => { };
            if (!paletteSrc)
                paletteSrc = ["#000000", "#ffffff"];
            this.palette = new Uint32Array(paletteSrc.length);
            this.setPaletteFromHtmlColors(paletteSrc);
            if (w) {
                this.width = w;
                this.height = h;
                this.screen = new Uint32Array(this.width * this.height);
                this.screen.fill(this.palette[0]);
            }
        }
        setScreenBrightness(b) {
            this.brightness = b | 0;
        }
        paletteToUint8Array() {
            const out = new Uint8Array(this.palette.length * 3);
            for (let i = 0; i < this.palette.length; ++i) {
                const [r, g, b] = UInt32ToRGB(this.palette[i]);
                const s = 3 * i;
                out[s] = r;
                out[s + 1] = g;
                out[s + 2] = b;
            }
            return out;
        }
        setPaletteFromHtmlColors(src) {
            for (let i = 0; i < this.palette.length; ++i) {
                this.palette[i] = htmlColorToUint32(src[i]);
            }
        }
        setPalette(buf) {
            const ca = new Uint8ClampedArray(4);
            const rd = new Uint32Array(ca.buffer);
            const src = buf.data;
            if (48 != src.length)
                pxsim.pxtrt.panic(911 /* pxsim.PXT_PANIC.PANIC_SCREEN_ERROR */);
            this.palette = new Uint32Array((src.length / 3) | 0);
            for (let i = 0; i < this.palette.length; ++i) {
                const p = i * 3;
                ca[0] = src[p + 0];
                ca[1] = src[p + 1];
                ca[2] = src[p + 2];
                ca[3] = 0xff; // alpha
                // convert to uint32 using target endian
                this.palette[i] = rd[0];
            }
        }
        bpp() {
            return this.palette.length > 2 ? 4 : 1;
        }
        didChange() {
            let res = this.changed;
            this.changed = false;
            return res;
        }
        maybeForceUpdate() {
            if (Date.now() - this.lastImageFlushTime > 200) {
                this.showImage(null);
            }
        }
        showImage(img) {
            pxsim.runtime.startPerfCounter(0);
            if (!img)
                img = this.lastImage;
            if (!img)
                return;
            if (this.width == 0) {
                this.width = img._width;
                this.height = img._height;
                this.screen = new Uint32Array(this.width * this.height);
            }
            this.lastImageFlushTime = Date.now();
            this.lastImage = img;
            this.changed = true;
            const src = img.data;
            const dst = this.screen;
            if (this.width != img._width || this.height != img._height || src.length != dst.length)
                pxsim.U.userError("wrong size");
            const p = this.palette;
            const mask = p.length - 1;
            for (let i = 0; i < src.length; ++i) {
                dst[i] = p[src[i] & mask];
            }
            this.onChange();
            pxsim.runtime.stopPerfCounter(0);
        }
        updateStats(stats) {
            this.stats = stats;
            const b = pxsim.board();
            if (b && b.updateStats) {
                b.updateStats();
            }
        }
        bindToSvgImage(lcd) {
            const screenCanvas = document.createElement("canvas");
            screenCanvas.width = this.width;
            screenCanvas.height = this.height;
            const ctx = screenCanvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            const imgdata = ctx.getImageData(0, 0, this.width, this.height);
            const arr = new Uint32Array(imgdata.data.buffer);
            const flush = function () {
                requested = false;
                ctx.putImageData(imgdata, 0, 0);
                lcd.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", screenCanvas.toDataURL());
            };
            let requested = false;
            this.onChange = () => {
                arr.set(this.screen);
                // paint rect
                pxsim.runtime.queueDisplayUpdate();
                if (!requested) {
                    requested = true;
                    window.requestAnimationFrame(flush);
                }
            };
        }
        setupScreenStatusBar(barHeight) {
            // TODO
        }
        updateScreenStatusBar(img) {
            // TODO
        }
    }
    pxsim.ScreenState = ScreenState;
    function getScreenState() {
        return pxsim.board().screenState;
    }
    pxsim.getScreenState = getScreenState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        const SCREEN_PART_WIDTH = 158.439;
        const SCREEN_PART_HEIGHT = 146.803;
        const SCREEN_PART = `
  <svg xmlns="http://www.w3.org/2000/svg" id="svg8" width="158.439" height="146.803" viewBox="0 0 158.439 146.803">
  <g id="layer1" transform="translate(-18.95 -27.866)">
    <path id="rect4487" fill="#00f" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.306" d="M19.603 28.519h157.133v145.497H19.603z"/>
    <image id="thescreen" width="136.673" height="109.33" x="26.118" y="61.528" fill="#c8beb7" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".427"/>
    <path id="GND" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M23.177 31.031h11.864v11.864H23.177z"/>
    <path id="VCC" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M37.119 31.031h11.864v11.864H37.119z"/>
    <path id="DISPLAY_DC" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M65.004 31.031h11.864v11.864H65.004z"/>
    <path id="DISPLAY_CS" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M78.947 31.031h11.864v11.864H78.947z"/>
    <path id="DISPLAY_MOSI" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M92.889 31.031h11.864v11.864H92.889z"/>
    <path id="DISPLAY_SCK" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M106.831 31.031h11.864v11.864h-11.864z"/>
    <path id="DISPLAY_MISO" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M120.774 31.031h11.864v11.864h-11.864z"/>
    <text id="text4619" x="45.309" y="-27.057" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617" x="45.309" y="-27.057">Gnd</tspan>
    </text>
    <text id="text4619-4" x="45.51" y="-41.166" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3" x="45.51" y="-41.166">VCC</tspan>
    </text>
    <text id="text4619-4-9" x="45.17" y="-69.274" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-1" x="45.17" y="-69.274">D/C</tspan>
    </text>
    <text id="text4619-4-9-2" x="45.225" y="-83.064" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-1-5" x="45.225" y="-83.064">CS</tspan>
    </text>
    <text id="text4619-4-9-8" x="45.364" y="-97.03" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-1-9" x="45.364" y="-97.03">MOSI</tspan>
    </text>
    <text id="text4619-4-9-3" x="45.163" y="-110.996" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-1-7" x="45.163" y="-110.996">SCK</tspan>
    </text>
    <text id="text4619-4-9-0" x="46.078" y="-138.962" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-1-72" x="46.078" y="-138.962">BL</tspan>
    </text>
    <path id="DISPLAY_RST" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M51.062 31.031h11.864v11.864H51.062z"/>
    <text id="text4619-4-94" x="44.972" y="-55.132" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-6" x="44.972" y="-55.132">RST</tspan>
    </text>
    <path id="DISPLAY_BL" fill="#d4d4d4" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.139" d="M134.638 31.031h11.864v11.864h-11.864z"/>
    <text id="text4619-4-9-0-6" x="45.403" y="-124.163" fill="#fff" stroke-width=".226" font-family="consolas" font-size="6.63" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:consolas" transform="rotate(90)" word-spacing="0">
      <tspan id="tspan4617-3-1-72-8" x="45.403" y="-124.163">MISO</tspan>
    </text>
  </g>
</svg>
  `;
        function mkScreenPart(xy = [0, 0]) {
            let [x, y] = xy;
            let l = x;
            let t = y;
            let w = SCREEN_PART_WIDTH;
            let h = SCREEN_PART_HEIGHT;
            let img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-screen", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(SCREEN_PART)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkScreenPart = mkScreenPart;
        class ScreenView {
            constructor() {
            }
            init(bus, state, svgEl, otherParams) {
                this.bus = bus;
                this.state = state;
                this.overElement = undefined;
                this.defs = [];
                this.lastLocation = [0, 0];
                const partSvg = pxsim.svg.parseString(SCREEN_PART);
                this.canvas = partSvg.getElementById('thescreen');
                this.element = pxsim.svg.elt("g");
                this.element.appendChild(partSvg.firstElementChild);
                this.state.bindToSvgImage(this.canvas);
            }
            moveToCoord(xy) {
                let [x, y] = xy;
                const loc = [x, y];
                this.lastLocation = loc;
                this.updateLoc();
            }
            updateLoc() {
                let [x, y] = this.lastLocation;
                visuals.translateEl(this.element, [x, y]);
            }
            updateState() { }
            updateTheme() { }
        }
        visuals.ScreenView = ScreenView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var settings;
    (function (settings) {
        let currSize = 0;
        const MAX_SIZE = 16 * 1024;
        function encodeKey(key) {
            return "S/" + key;
        }
        function allKeys() {
            const pref = encodeKey("");
            const st = pxsim.board().storedState;
            return Object.keys(st).filter(k => k.slice(0, pref.length) == pref);
        }
        function userKeys() {
            return allKeys().filter(s => s[2] != "#");
        }
        function computeSize() {
            let sz = 0;
            const storage = pxsim.board().storedState;
            for (let k of allKeys()) {
                sz += k.length + storage[k].length;
            }
            currSize = sz;
        }
        function _set(key, buf) {
            key = encodeKey(key);
            const storage = pxsim.board().storedState;
            const prev = storage[key];
            const val = btoa(pxsim.U.uint8ArrayToString(buf.data));
            const newSize = prev == null
                ? currSize + key.length + val.length
                : currSize + val.length - prev.length;
            if (newSize > MAX_SIZE)
                return -1;
            pxsim.board().setStoredState(key, val);
            currSize = newSize;
            return 0;
        }
        settings._set = _set;
        function _remove(key) {
            key = encodeKey(key);
            const storage = pxsim.board().storedState;
            if (storage[key] == null)
                return -1;
            currSize -= key.length + storage[key].length;
            pxsim.board().setStoredState(key, null);
            return 0;
        }
        settings._remove = _remove;
        function _exists(key) {
            return _get(key) != undefined;
        }
        settings._exists = _exists;
        function _get(key) {
            key = encodeKey(key);
            const storage = pxsim.board().storedState;
            const val = storage[key];
            if (val == null)
                return undefined;
            return new pxsim.RefBuffer(pxsim.U.stringToUint8Array(atob(val)));
        }
        settings._get = _get;
        function _userClean() {
            for (let k of userKeys())
                pxsim.board().setStoredState(k, null);
            computeSize();
            // if system keys take more than 25% of space, delete everything
            if (currSize > MAX_SIZE / 4) {
                for (let k of allKeys())
                    pxsim.board().setStoredState(k, null);
                computeSize();
            }
        }
        settings._userClean = _userClean;
        function _list(prefix) {
            const r = new pxsim.RefCollection();
            const emptyPref = encodeKey("");
            for (let k of prefix[0] == "#" ? allKeys() : userKeys()) {
                const n = k.slice(emptyPref.length);
                if (n.slice(0, prefix.length) != prefix)
                    continue;
                r.push(n);
            }
            return r;
        }
        settings._list = _list;
    })(settings = pxsim.settings || (pxsim.settings = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class StorageState {
        constructor() {
            this.files = {};
        }
    }
    pxsim.StorageState = StorageState;
    function storageState() {
        return pxsim.board().storageState;
    }
    pxsim.storageState = storageState;
})(pxsim || (pxsim = {}));
// Auto-generated. Do not edit.
var pxsim;
(function (pxsim) {
    var storage;
    (function (storage) {
        function init() {
            // do nothing
        }
        storage.init = init;
        function appendBuffer(filename, data) {
            const state = pxsim.storageState();
            let buf = state.files[filename];
            if (!buf)
                buf = state.files[filename] = [];
            for (let i = 0; i < data.data.length; ++i)
                buf.push(data.data[i]);
        }
        storage.appendBuffer = appendBuffer;
        function overwriteWithBuffer(filename, data) {
            const state = pxsim.storageState();
            const buf = [];
            for (let i = 0; i < data.data.length; ++i)
                buf.push(data.data[i]);
            state.files[filename] = buf;
        }
        storage.overwriteWithBuffer = overwriteWithBuffer;
        function exists(filename) {
            const state = pxsim.storageState();
            return !!state.files[filename];
        }
        storage.exists = exists;
        function remove(filename) {
            const state = pxsim.storageState();
            delete state.files[filename];
        }
        storage.remove = remove;
        function size(filename) {
            const state = pxsim.storageState();
            const buf = state.files[filename];
            return buf ? buf.length : 0;
        }
        storage.size = size;
        function readAsBuffer(filename) {
            const state = pxsim.storageState();
            const buf = state.files[filename];
            return buf ? new pxsim.RefBuffer(Uint8Array.from(buf)) : undefined;
        }
        storage.readAsBuffer = readAsBuffer;
    })(storage = pxsim.storage || (pxsim.storage = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class SlideSwitchState {
        constructor() {
            this.left = false;
        }
        setState(left) {
            if (this.left === left) {
                return;
            }
            else if (left) {
                pxsim.board().bus.queue(SlideSwitchState.id, 2 /* DAL.DEVICE_BUTTON_EVT_UP */);
            }
            else {
                pxsim.board().bus.queue(SlideSwitchState.id, 1 /* DAL.DEVICE_BUTTON_EVT_DOWN */);
            }
            this.left = left;
        }
        isLeft() {
            return this.left;
        }
    }
    SlideSwitchState.id = 3000 /*DEVICE_ID_BUTTON_SLIDE*/;
    pxsim.SlideSwitchState = SlideSwitchState;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var input;
    (function (input) {
        function onSwitchMoved(direction, body) {
            pxsim.pxtcore.registerWithDal(pxsim.SlideSwitchState.id, direction, body);
        }
        input.onSwitchMoved = onSwitchMoved;
        function switchRight() {
            const b = pxsim.board();
            const sw = b.slideSwitchState;
            return !sw.isLeft();
        }
        input.switchRight = switchRight;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var tts;
    (function (tts) {
        function _getLanguageCode() {
            return window.navigator.language;
        }
        tts._getLanguageCode = _getLanguageCode;
        function _speakAsync(text, pitch, rate, volume, language, onStart, onBoundary) {
            return new Promise((resolve, reject) => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = getVoiceForLanguage(language || _getLanguageCode());
                if (pitch != undefined)
                    utterance.pitch = pitch;
                if (rate != undefined)
                    utterance.rate = rate;
                if (volume != undefined)
                    utterance.volume = volume;
                utterance.onend = () => resolve();
                utterance.onerror = reject;
                if (onStart) {
                    utterance.onstart = () => pxsim.runtime.runFiberAsync(onStart);
                }
                if (onBoundary) {
                    utterance.onboundary = event => {
                        const offset = event.charIndex;
                        const nextWord = text.substring(offset).split(/\s/).shift();
                        pxsim.runtime.runFiberAsync(onBoundary, offset, nextWord, text);
                    };
                }
                speechSynthesis.speak(utterance);
            });
        }
        tts._speakAsync = _speakAsync;
        function _pause() {
            speechSynthesis.pause();
        }
        tts._pause = _pause;
        function _isPaused() {
            return speechSynthesis.paused;
        }
        tts._isPaused = _isPaused;
        function _resume() {
            speechSynthesis.resume();
        }
        tts._resume = _resume;
        function _cancel() {
            speechSynthesis.cancel();
        }
        tts._cancel = _cancel;
        function getVoiceForLanguage(language) {
            language = language.toLowerCase();
            const generalCode = language.substring(0, 2);
            let bestMatch;
            let bestNonlocalMatch;
            for (const voice of speechSynthesis.getVoices()) {
                const current = voice.lang.toLowerCase();
                if (current === language) {
                    if (voice.localService)
                        return voice;
                    else
                        bestNonlocalMatch = voice;
                }
                else if (current.substring(0, 2) === generalCode) {
                    if (!bestMatch && voice.localService)
                        bestMatch = voice;
                    if (!bestNonlocalMatch && !voice.localService)
                        bestNonlocalMatch = voice;
                }
            }
            return bestMatch || bestNonlocalMatch || (language !== "en-us" ? getVoiceForLanguage("en-US") : undefined);
        }
    })(tts = pxsim.tts || (pxsim.tts = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function thermometerState() {
        return pxsim.board().thermometerState;
    }
    pxsim.thermometerState = thermometerState;
    function setThermometerUnit(unit) {
        pxsim.board().thermometerUnitState = unit;
    }
    pxsim.setThermometerUnit = setThermometerUnit;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    let TemperatureUnit;
    (function (TemperatureUnit) {
        TemperatureUnit[TemperatureUnit["Celsius"] = 0] = "Celsius";
        TemperatureUnit[TemperatureUnit["Fahrenheit"] = 1] = "Fahrenheit";
    })(TemperatureUnit = pxsim.TemperatureUnit || (pxsim.TemperatureUnit = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var input;
    (function (input) {
        function temperature(unit) {
            let b = pxsim.thermometerState();
            b.setUsed();
            pxsim.setThermometerUnit(unit);
            const deg = b.getLevel();
            return unit == pxsim.TemperatureUnit.Celsius ? deg
                : ((deg * 18) / 10 + 32) >> 0;
        }
        input.temperature = temperature;
        function onTemperatureConditionChanged(condition, temperature, unit, body) {
            let b = pxsim.thermometerState();
            b.setUsed();
            pxsim.setThermometerUnit(unit);
            const t = unit == pxsim.TemperatureUnit.Celsius
                ? temperature
                : (((temperature - 32) * 10) / 18 >> 0);
            if (condition === 2 /* DAL.LEVEL_THRESHOLD_HIGH */) {
                b.setHighThreshold(t);
            }
            else {
                b.setLowThreshold(t);
            }
            pxsim.pxtcore.registerWithDal(b.id, condition, body);
        }
        input.onTemperatureConditionChanged = onTemperatureConditionChanged;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class CapacitiveSensorState {
        constructor(mapping) {
            this.capacity = [];
            this.reading = [];
            this.mapping = mapping;
        }
        getCap(pinId) {
            return this.mapping[pinId];
        }
        readCap(pinId, samples) {
            let capId = this.getCap(pinId);
            return this.capacitiveSensor(capId, samples);
        }
        isReadingPin(pinId, pin) {
            let capId = this.getCap(pinId);
            return this.reading[capId];
        }
        isReading(capId) {
            return this.reading[capId];
        }
        startReading(pinId, pin) {
            let capId = this.getCap(pinId);
            this.reading[capId] = true;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Input;
            pin.mode |= pxsim.PinFlags.Analog;
        }
        capacitiveSensor(capId, samples) {
            return this.capacity[capId] || 0;
        }
        reset(capId) {
            this.capacity[capId] = 0;
            this.reading[capId] = false;
        }
    }
    pxsim.CapacitiveSensorState = CapacitiveSensorState;
    class TouchButton extends pxsim.CommonButton {
        constructor(pin) {
            super(pin);
            this._threshold = 200;
        }
        setThreshold(value) {
            this._threshold = value;
        }
        threshold() {
            return this._threshold;
        }
        value() {
            return 0;
        }
        calibrate() {
        }
    }
    pxsim.TouchButton = TouchButton;
    class TouchButtonState {
        constructor(pins) {
            this.buttons = pins.map(pin => new TouchButton(pin));
        }
    }
    pxsim.TouchButtonState = TouchButtonState;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function getTouchButton(id) {
            const state = pxsim.board().touchButtonState;
            const btn = state.buttons.filter(b => b.id == id)[0];
            // simulator done somewhere else
            const io = pxsim.board().edgeConnectorState;
            if (io) {
                const pin = io.pins.filter(p => p.id == id)[0];
                pxsim.pins.markUsed(pin);
            }
            return btn;
        }
        pxtcore.getTouchButton = getTouchButton;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var TouchButtonMethods;
    (function (TouchButtonMethods) {
        function setThreshold(button, value) {
            button.setThreshold(value);
        }
        TouchButtonMethods.setThreshold = setThreshold;
        function threshold(button) {
            return button.threshold();
        }
        TouchButtonMethods.threshold = threshold;
        function value(button) {
            return button.value();
        }
        TouchButtonMethods.value = value;
        function calibrate(button) {
            button.calibrate();
        }
        TouchButtonMethods.calibrate = calibrate;
    })(TouchButtonMethods = pxsim.TouchButtonMethods || (pxsim.TouchButtonMethods = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var AnalogInOutPinMethods;
    (function (AnalogInOutPinMethods) {
        function touchButton(name) {
            return pxsim.pxtcore.getTouchButton(name.id);
        }
        AnalogInOutPinMethods.touchButton = touchButton;
    })(AnalogInOutPinMethods = pxsim.AnalogInOutPinMethods || (pxsim.AnalogInOutPinMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    class WifiSocket {
        constructor(fd) {
            this.fd = fd;
            this.buffers = [];
            this.readers = [];
            this.bytesAvail = 0;
            this.reqInit = {
                headers: {},
                credentials: "omit",
                mode: "cors",
                cache: "no-cache",
                redirect: "manual",
                referrer: "",
            };
            this.reqSent = false;
        }
        async openReq(host, port) {
            if (!/^[\w\-\.]+$/.test(host))
                throw new Error("bad host");
            this.reqUrl = "https://" + host + ":" + port + "/";
            return 0;
        }
        _queue(data) {
            let buf;
            if (data instanceof ArrayBuffer)
                buf = new Uint8Array(data);
            else if (data instanceof Uint8Array)
                buf = data;
            else
                buf = pxsim.U.stringToUint8Array(pxsim.U.toUTF8(data));
            this.buffers.push(buf);
            if (buf.length && this.bytesAvail == 0)
                pxsim._wifi._raiseEvent(1000 + this.fd);
            this.bytesAvail += buf.length;
            const rr = this.readers;
            this.readers = [];
            for (const r of rr)
                r();
        }
        openWS(url, proto) {
            this.ws = new WebSocket(url, proto);
            this.ws.binaryType = "arraybuffer";
            return new Promise((resolve) => {
                this.ws.onopen = () => {
                    this.ws.onerror = err => {
                        console.log("ws error", err);
                        this._err = -2;
                    };
                    resolve(0);
                };
                this.ws.onclose = () => {
                    console.log("ws close");
                    this._err = -20;
                };
                this.ws.onmessage = ev => {
                    this._queue(ev.data);
                };
                this.ws.onerror = () => resolve(-1);
            });
        }
        waitRead() {
            return new Promise(resolve => {
                this.readers.push(resolve);
            });
        }
        read(maxlen) {
            if (this._err)
                return this._err;
            let b = this.buffers[0];
            if (b) {
                if (b.length <= maxlen) {
                    this.buffers.shift();
                }
                else {
                    this.buffers[0] = b.slice(maxlen);
                    b = b.slice(0, maxlen);
                }
                this.bytesAvail -= b.length;
                return new pxsim.RefBuffer(b);
            }
            return null;
        }
        async handleFetch() {
            // we ignore post for now
            this.reqSent = true;
            const resp = await fetch(this.reqUrl, this.reqInit);
            this._queue(`HTTP/1.1 ${resp.status} ${resp.statusText}\r\n`);
            resp.headers.forEach((v, k) => {
                if (k.toLowerCase() == "content-length")
                    return;
                this._queue(`${k}: ${v}\r\n`);
            });
            const data = await resp.arrayBuffer();
            this._queue(`Content-Length: ${data.byteLength}\r\n`);
            this._queue(`\r\n`);
            this._queue(data);
            return 0;
        }
        async write(buf) {
            if (this._err)
                return this._err;
            if (this.ws)
                this.ws.send(buf.data);
            else {
                if (this.reqSent)
                    return -2;
                let str = pxsim.U.fromUTF8(pxsim.U.uint8ArrayToString(buf.data));
                if (str == "\r\n") {
                    const dummy = this.handleFetch();
                    return 0;
                }
                str = str.replace(/\r?\n$/, "");
                if (!this.reqInit.method) {
                    const m = /^\s*(\S+)\s+\/(\S+)/.exec(str);
                    if (m) {
                        this.reqInit.method = m[1];
                        this.reqUrl += m[2];
                    }
                }
                else {
                    const m = /^([^:]+):\s*(.*)/.exec(str);
                    if (m) {
                        this.reqInit.headers[m[1]] = m[2];
                    }
                }
            }
            return 0;
        }
        close() {
            if (this.ws)
                this.ws.close();
        }
    }
    pxsim.WifiSocket = WifiSocket;
    class WifiSocketState {
        constructor() {
            this.sockets = [null];
        }
    }
    pxsim.WifiSocketState = WifiSocketState;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var _wifi;
    (function (_wifi) {
        const MAX_SOCKET = 16;
        const WIFI_ID = 1234;
        function _allowed() {
            var _a, _b, _c;
            const bid = (_c = (_b = (_a = pxsim.board()) === null || _a === void 0 ? void 0 : _a.runOptions) === null || _b === void 0 ? void 0 : _b.boardDefinition) === null || _c === void 0 ? void 0 : _c.id;
            return /esp32|-s2/.test(bid);
        }
        _wifi._allowed = _allowed;
        function getState() {
            const b = pxsim.board();
            if (!b.wifiSocketState) {
                if (!_allowed())
                    throw new Error("_wifi not enabled");
                b.wifiSocketState = new pxsim.WifiSocketState();
            }
            return b.wifiSocketState;
        }
        function getSock(fd) {
            if (fd < 0 || fd >= MAX_SOCKET)
                return null;
            return getState().sockets[fd];
        }
        function socketAlloc() {
            const state = getState();
            for (let i = 1; i < state.sockets.length; ++i) {
                if (!state.sockets[i]) {
                    state.sockets[i] = new pxsim.WifiSocket(i);
                    return i;
                }
            }
            const idx = state.sockets.length;
            if (idx > MAX_SOCKET)
                return -1;
            state.sockets.push(new pxsim.WifiSocket(idx));
            return idx;
        }
        _wifi.socketAlloc = socketAlloc;
        function socketConnectTLS(fd, host, port) {
            const sock = getSock(fd);
            if (!sock)
                return Promise.resolve(-11);
            // TODO loosen this up in future
            if (port == 8883 && /\.azure-devices.net$/.test(host)) {
                return sock.openWS("wss://" + host + "/$iothub/websocket?iothub-no-client-cert=true", ["mqtt"]);
            }
            else if (port == 443 && host == "microsoft.github.io") {
                return sock.openReq(host, port);
            }
            else {
                console.log("invalid host: " + host);
                return Promise.resolve(-1);
            }
        }
        _wifi.socketConnectTLS = socketConnectTLS;
        async function socketWrite(fd, data) {
            const sock = getSock(fd);
            if (!sock)
                return -11;
            return sock.write(data);
        }
        _wifi.socketWrite = socketWrite;
        async function socketRead(fd, size) {
            const sock = getSock(fd);
            if (!sock)
                return -11;
            for (;;) {
                const buf = sock.read(size);
                if (buf)
                    return buf;
                await sock.waitRead();
            }
        }
        _wifi.socketRead = socketRead;
        function socketBytesAvailable(fd) {
            const sock = getSock(fd);
            if (!sock)
                return -11;
            return sock.bytesAvail;
        }
        _wifi.socketBytesAvailable = socketBytesAvailable;
        function socketClose(fd) {
            const sock = getSock(fd);
            if (!sock)
                return -11;
            sock.close();
            return 0;
        }
        _wifi.socketClose = socketClose;
        function eventID() {
            return WIFI_ID;
        }
        _wifi.eventID = eventID;
        function scanStart() {
            _raiseEvent(1 /* WifiEvent.ScanDone */);
        }
        _wifi.scanStart = scanStart;
        function startLoginServer() {
        }
        _wifi.startLoginServer = startLoginServer;
        function scanResults() {
            const b = new Uint8Array(7);
            b[0] = -20; // rssi
            b[1] = 0; // authmode
            b.set(pxsim.U.stringToUint8Array("WiFi"), 2);
            return new pxsim.RefBuffer(b);
        }
        _wifi.scanResults = scanResults;
        function connect(ssid, pass) {
            _raiseEvent(2 /* WifiEvent.GotIP */);
            return 0;
        }
        _wifi.connect = connect;
        function disconnect() {
            return 0;
        }
        _wifi.disconnect = disconnect;
        function isConnected() { return true; }
        _wifi.isConnected = isConnected;
        function ipInfo() { return new pxsim.RefBuffer(new Uint8Array(4 * 3)); }
        _wifi.ipInfo = ipInfo;
        function rssi() { return -24; }
        _wifi.rssi = rssi;
        function _raiseEvent(id) {
            pxsim.control.raiseEvent(_wifi.eventID(), id, undefined);
        }
        _wifi._raiseEvent = _raiseEvent;
    })(_wifi = pxsim._wifi || (pxsim._wifi = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var crypto;
    (function (crypto) {
        function _sha256(bufs) {
            var _a, _b;
            let len = 0;
            const buffers = bufs.toArray().filter(e => e instanceof pxsim.RefBuffer).map((b) => {
                len += b.data.length;
                return b.data;
            });
            const concat = new Uint8Array(len);
            len = 0;
            for (const b of buffers) {
                concat.set(b, len);
                len += b.length;
            }
            const r = (_b = (_a = window === null || window === void 0 ? void 0 : window.crypto) === null || _a === void 0 ? void 0 : _a.subtle) === null || _b === void 0 ? void 0 : _b.digest("SHA-256", concat);
            if (r)
                return r.then(buf => new pxsim.RefBuffer(new Uint8Array(buf)));
            else
                return Promise.resolve(undefined);
        }
        crypto._sha256 = _sha256;
    })(crypto = pxsim.crypto || (pxsim.crypto = {}));
})(pxsim || (pxsim = {}));
