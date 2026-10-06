# Bluetooth HF2

Der Bluetooth HF2-Dienst implementiert die serielle Nachrichtenprotokollierung von [HF2-](https://github.com/Microsoft/uf2/blob/master/hf2.md).

## Dienst

### HF2-Dienst

 * UUID:  `b112f5e6-2679-30da-a26e-0273b6043849`

### TX-Merkmale

* optional
* UUDI: `b112f5e6-2679-30da-a26e-0273b604384a`
* Nur BENACHRICHTIGEN

Dieses Merkmal sendet vor allem serielle HF2 Nachrichten. Das erste Byte enthält den Typ der Nachricht und der Länge in den unteren 6 Bit. Die Nachricht enthält bis zu 19 Bytes.

Dieser Dienst wird vom MakeCode-Editor unterstützt, um Nachrichten zu empfangen.