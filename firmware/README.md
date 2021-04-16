# cronologic WebUSB SCPI firmware

This will become the firmware for the [cronologic WebUSB project](https://github.com/cronologic-de/webusb).
It’s based on the Raspberry Pi Pico’s C/C++ SDK.

## Project setup

Follow the [Pico SDK’s “Getting Started” documentation](https://rptl.io/pico-get-started) to install the SDK on your machine.

## Building

This is a CMake-based project, so it’s the usual

```sh
mkdir build
cd build
cmake ..
make
```

Don’t forget to set the `PICO_SDK_PATH` variable!
