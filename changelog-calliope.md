### Makecode Calliope Update
https://github.com/calliope-edu/pxt-calliope/tree/calliope_universal_hex

- Universal Hex: eine Hex für mini v1/v2 und eine Hex für Calliope mini v3 werden zusammengefügt, die Hardware Auswahl entfällt
- führt OpenLink fürs Bluetooth Flashen für Calliope mini v3 ein (kein Koppeln mehr nötig)
- auf dem Calliope mini v2 ist wie bisher OpenLink eingesetzt
- auf dem Calliope mini v1 ist wie bisher A + B + Reset für Bluetooth Flashen notwendig.  
- WebUSB und Serial Monitor für Calliope mini v2
- kombinierter Simulator: Simulator zeigt standardmäßig den mini v3, kann aber auf mini v2 umgeschalten werden
- die Schalter bei Projekt Settings sind wie bei makecode micro:bit
- Bluetoothprj Ordner entfernt für schnellere Compile Zeit
- 

### DAL Update 
https://github.com/calliope-mini/microbit/tree/v2.2.0-rc6-calliope-branch
https://github.com/calliope-mini/microbit-dal/tree/v2.2.0-rc6-calliope-branch
https://github.com/calliope-mini/mbed-classic/tree/microbit_hfclk%2Bmb6-calliope-branch

- Dal auf Basis von v2.2.0-rc6
- minimal Änderungen an der micro:bit Code Basis:
  - Bosch BMX055 (eCompass) hinzugefügt
  - RGB LED hinzugefügt
  - Mikrofon wird direkt in makecode ausgewertet -> keine DAL Änderung nötig
  - Motortreiber wird direkt in makecode gesteuert -> keine DAL Änderung nötig
  - Buzzer wird direkt in makecode gesteuert -> keine DAL Änderung nötig
- Error Codes für Calliope mini v2 aktiviert
- die Hex Datei für Calliope mini v1/v2 benutzt stellt den größeren Ram des mini v2 während des Boot zur Verfügung
- neue Compile flag: simulate_mini1_on_mini2 um Calliope mini v1 auf v2 Hardware zu simulieren
- neue Compile flag: force_enabled_16kb um Calliope mini v1 über Bluetooth "immer an" einzuschalten, (erzeugt schnell Abstürze)

### Codal Changes
https://github.com/calliope-edu/codal-microbit-v2/tree/v0.3.5-calliope-branch
https://github.com/calliope-edu/codal-core/tree/pxt-calliope

- Codal Kommentare aufgeräumt


### Noch to do: 
- Serial Monitor mit Calliope mini v2 testen


### PXT CI
5 snippets not compiling in the docs:
-- in /projects/radio-bridge:
    main.ts(10,11): error TS2339: Property 'writeReceivedPacketToSerial' does not exist on type 'typeof radio'.

    main.ts(10,5): error TS9235: Unknown or undeclared identifier

-- in /projects/robot-unicorn:
    main.ts(1,7): error TS2339: Property 'onReceivedNumberDeprecated' does not exist on type 'typeof radio'.

    main.ts(1,44): error TS7006: Parameter 'receivedNumber' implicitly has an 'any' type.

    main.ts(1,1): error TS9235: Unknown or undeclared identifier

-- in /reference/radio/write-received-packet-to-serial:
    main.ts(1,7): error TS2339: Property 'writeReceivedPacketToSerial' does not exist on type 'typeof radio'.

    main.ts(1,1): error TS9235: Unknown or undeclared identifier

-- in /reference/radio/write-received-packet-to-serial:
    main.ts(8,11): error TS2339: Property 'writeReceivedPacketToSerial' does not exist on type 'typeof radio'.

    main.ts(11,11): error TS2339: Property 'writeReceivedPacketToSerial' does not exist on type 'typeof radio'.

    main.ts(14,11): error TS2339: Property 'writeReceivedPacketToSerial' does not exist on type 'typeof radio'.

    main.ts(8,5): error TS9235: Unknown or undeclared identifier

    main.ts(11,5): error TS9235: Unknown or undeclared identifier

    main.ts(14,5): error TS9235: Unknown or undeclared identifier

-- in /projects/micro-coin:
    pxt_modules/radio-blockchain/main.ts(257,11): error TS2339: Property 'onDataPacketReceived' does not exist on type 'typeof radio'.

    pxt_modules/radio-blockchain/main.ts(257,35): error TS7031: Binding element 'receivedBuffer' implicitly has an 'any' type.

    pxt_modules/radio-blockchain/main.ts(257,59): error TS7031: Binding element 'serialNumber' implicitly has an 'any' type.

    pxt_modules/radio-blockchain/main.ts(257,5): error TS9235: Unknown or undeclared identifier

error: 5 snippets not compiling in the docs