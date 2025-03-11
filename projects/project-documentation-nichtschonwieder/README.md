# Scan & Save

## Mitglieder
- Rafael Bieringer  
- Aaron Bandion  
- Vanessa Berzel  

---

## Inhaltsverzeichnis
- [Projektbeschreibung](#projektbeschreibung)
- [Idee und Inspiration](#idee-und-inspiration)
- [Technische Umsetzung](#technische-umsetzung)
- [Derzeitiger Stand](#derzeitiger-stand)
- [Ressourcen](#ressourcen)

---

## Projektbeschreibung
Scan & Save ist ein Barcode-Scanner-System, das es ermöglicht, nachhaltige Produkte im Supermarkt zu identifizieren und Rabatte auf diese Produkte zu erhalten. Durch das Scannen eines Barcodes wird überprüft, ob ein Rabatt für das jeweilige Produkt verfügbar ist, und die Ersparnis wird auf einem Display angezeigt. Ziel ist es, nachhaltiges Einkaufen zu fördern und Kund*innen zu belohnen.

---

## Idee und Inspiration
Das Projekt entstand aus der Idee, umweltfreundliche Kaufentscheidungen zu unterstützen. Kund*innen sollen direkt im Supermarkt erkennen können, welche nachhaltigen Produkte vergünstigt sind. Dadurch wird nicht nur der Geldbeutel geschont, sondern auch ein Anreiz geschaffen, bewusster einzukaufen. 

---

## Technische Umsetzung
- **Gehäuse:** Der Scanner wird in einem 3D-gedruckten Gehäuse verbaut, das komplett ohne Schrauben oder Kleber auskommt. Alle Komponenten werden durch Steckverbindungen fixiert.
- **Barcode-Scanner:** Ein mit Arduino UNO kompatibler Barcode-Scanner liest die Codes der Produkte ein.
- **Mikrocontroller & Display:** Der Mikrocontroller verarbeitet die gescannten Daten und gibt sie auf einem Display aus, das dem Nutzer Informationen zu Produkt und Rabatt anzeigt.
- **Datenverwaltung:** Die Barcodes werden mit einem eigenen Programm generiert und auf dem internen Speicher des Mikrocontrollers gespeichert. Die Rabattinformationen werden abgefragt und auf dem Display ausgegeben.

---

## Derzeitiger Stand (27.01.2025)
- Der Prototyp ist funktionsfähig, jedoch nur für einen Durchgang. Nach einem Scan ist ein Hardreset erforderlich, um die Funktionalität wiederherzustellen.
- Ein 3D-gedrucktes Gehäuse wurde noch nicht realisiert. Die Hardware ist aktuell provisorisch zusammengesteckt.
- Die Code-Entwicklung hat mehr Zeit als erwartet in Anspruch genommen, insbesondere aufgrund von Problemen mit dem Barcode-Scanner und der Kommunikation zwischen den Komponenten.

---

## Ressourcen
- [Arduino UNO](https://www.arduino.cc/)
- [Adafruit ILI9341 Display](https://learn.adafruit.com/adafruit-2-8-tft-touch-shield-v2)
- [USB Host Shield Library](https://github.com/felis/USB_Host_Shield_2.0)
- 3D-Druck-Designs für das Gehäuse (in Planung)
