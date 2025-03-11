[⬅ Back to Main Page](/project/7?page=readme)

# Construction: Smart Trichter

## Description
The construction phase involved acquiring components, prototyping the system on a breadboard, and assembling the final product with a custom PCB and housing.

Additionally, in the early development phase, we created multiple **Arduino sketches (.ino files)** to test and program each functionality separately.  
Once everything was working individually, we combined them into **one large file** and wrote several **C++ files** that were called from the main program.  

After that, we spent a lot of time **optimizing the code**, because we realized that we were using too much memory. Some functions had to be removed to fit within the available flash memory.  

Finally, we **calibrated the Trichter** by repeatedly pouring small amounts of water through it and adjusting the values accordingly.


#### **Code Development**
<img src="/images/Code.jpeg" alt="Code Snippet" style="max-width: 100%; height: auto; max-height: 500px;" />

## Content
### Components:
#### Non-Electronic:
- Funnel
- 1.2m Hose
- Valve with connectors
- Mounting clamps

#### Electronic:
- Flow turbine sensor
- PCB
- Arduino UNO
- USB-Host Shield
- OLED-Display
- NFC Reader
- ON/OFF Switch
- 6x AA Batteries

#### Reused:
- Joystick from game controller

### Process:
1. Procure all necessary components.
2. Assemble and test on a breadboard.
3. Design and fabricate the custom PCB.
4. **3D modeling and printing:**  
   - The housing was designed in **Fusion 360** and iteratively improved based on test prints.
   - A first version was printed, and after refinements, the **final version was produced**.
5. Finalize the product by integrating the PCB and housing.
  <img src="/images/3D_Druck.gif" alt="3D Printing Process" style="max-width: 100%; height: auto; max-height: 500px;" />

---

[⬅ Back to Main Page](/project/7?page=readme)
