# cronologic WebUSB SCPI firmware

This will become the firmware for the [cronologic WebUSB project](https://github.com/cronologic-de/webusb).
It’s based on the Raspberry Pi Pico’s C/C++ SDK and [Jan Breuer’s `scpi-parser` library](https://github.com/j123b567/scpi-parser).

## Project setup

When cloning the repository, make sure to also initialize the SCPI parser library submodule at `lib/scpi-parser`, else the firmware won’t build.
If you use `git clone` on the command line, adding `--recurse-submodules` should suffice.

Follow the [Pico SDK’s “Getting Started” documentation](https://rptl.io/pico-get-started) to install the SDK on your machine, in a location outside of this repository.
You could for example put the SDK and the WebUSB repo alongside each other in a common parent folder.

## Building

This is a CMake-based project, so it’s the usual

```sh
mkdir build
cd build
cmake ..
cmake --build .
```

However, there are two caveats:

1. As explained in the Pico SDK’s documentation, you need to set the `PICO_SDK_PATH` environment variable to point to the SDK’s location. If you forget this, the `cmake ..` command will fail.
2. The SCPI parser library this firmware depends on is a `Makefile`-based project. You will need to have `make` available to build it. Natively building on Windows, e.g. using Visual Studio, has not been tested. Using WSL or Cygwin instead is recommended, if you’re on Windows.

## Development

* [`serial_scpi.c`](serial_scpi.c) is the main source file for the firmware.
* [`CMakeLists.txt`](CMakeLists.txt) contains build instructions for CMake, including how to build the SCPI library.
* [`pico_sdk_import.cmake`](pico_sdk_import.cmake) was (as usual) copied verbatim from the Pico SDK and allows CMake to interact with the SDK’s functionality.
