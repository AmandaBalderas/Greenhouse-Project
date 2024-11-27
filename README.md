# Greenhouse Automation System

## Project Overview

This project is an automated greenhouse system designed to monitor and control various environmental factors such as temperature, humidity, and water levels. The system utilizes an **Arduino UNO** for reading sensor data (temperature, humidity) and controlling devices (fan and water pump), while a **Raspberry Pi** serves as the central hub for communication and web-based control.

### Features
- Temperature and humidity monitoring using the DHT11 and LM35 sensors.
- Control of a water pump and fan for maintaining optimal growing conditions.
- I2C communication between the Arduino and Raspberry Pi for seamless data exchange.
- Web-based user interface to remotely control and monitor the greenhouse environment.

### Components Used
- **Arduino UNO**
- **Raspberry Pi** (for web interface and communication)
- **DHT11** Temperature and Humidity Sensor
- **Water Pump** (for irrigation control)
- **Fan** (for ventilation)
- **I2C communication** between Arduino and Raspberry Pi

### Software Used
- **Arduino IDE** (for programming the Arduino UNO)
- **Raspberry Pi OS** (for managing the Raspberry Pi and running the web interface)
- **Python** (for communication between Raspberry Pi and Arduino)
- **HTML/CSS/JavaScript** (for the web-based user interface)

## Installation

### Arduino Setup:
1. Install the **Arduino IDE** if you haven't already.
2. Connect the **DHT11** sensor to pin 4 of the Arduino UNO.
3. Connect the **water pump** to pin 7 and the **fan** to pin 9.
4. Install the required libraries:
   - **DHT.h**
   - **Wire.h** (for I2C communication)
5. Upload the Arduino code to the board.

### Raspberry Pi Setup:
1. Install **Raspberry Pi OS** on your Raspberry Pi.
2. Set up the Raspberry Pi as a server that hosts the web page for controlling the greenhouse.
3. Install the necessary Python packages for I2C communication and web server functionality:
   - **RPi.GPIO**
   - **Flask** (for the web interface)
   - **smbus** (for I2C communication)
4. Clone the project repository to the Raspberry Pi and run the Python scripts for communication and web control.

## How to Use

1. After setting up both the Arduino and Raspberry Pi, access the web interface hosted by the Raspberry Pi using a browser.
2. The interface allows you to monitor the current temperature and humidity levels.
3. You can control the fan and water pump directly from the web interface by toggling the appropriate buttons.

## Authors

- **Amanda Balderas Arias**
- **Fernando Yañez García**
- **Erick Abraham Galicia De La Rosa**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
