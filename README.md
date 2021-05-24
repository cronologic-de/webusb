# WebUSB

Configure a Raspberry Pi Pico using SCPI over WebUSB.

This is used by [cronologic GmbH & Co. KG](www.cronologic.de) in the development of time-to-digital converters, Gsps digitizers and pulse generators.

## Project structure and building

This repository consists of two parts:
The [MCU firmware](firmware) and the [web frontend](frontend) to control it.
Check the readme files for each of these parts for instructions on how to build it.

The frontend is automatically deployed at <https://cronologic-de.github.io/webusb/>, feel free to check it out!

When cloning the repository, make sure to also initialize the SCPI parser library submodule at `firmware/lib/scpi-parser`, else the firmware won’t build.
If you use `git clone` on the command line, adding `--recurse-submodules` should suffice.

## Status

Work on this project had begun, but is currently paused due to a shift in priorities.

The completed parts are:

* Created a [frontend web application](frontend) that demonstrates the user experience. It is [automatically deployed](.github/workflows/gh-pages.yml) to [GitHub Pages](https://cronologic-de.github.io/webusb/).
* As a proof of concept, the frontend can [connect to a device using Web Serial](https://github.com/cronologic-de/webusb/issues/8) (not WebUSB, [see below](#webusb-or-web-serial)) and display chunks of UTF-8 text in the JavaScript console as they’re received from the device. These chunks are not line-buffered yet.
* Created a [Raspberry Pi Pico application](firmware) that uses [Jan Breuer’s `scpi-parser` library](https://github.com/j123b567/scpi-parser) to respond to an `*IDN?` command via the serial port.
* The SCPI library has been [embedded into the usual Pi Pico CMake build process](https://github.com/cronologic-de/webusb/blob/96c33098a2f761af40cc82b2608f361e78cf098e/firmware/CMakeLists.txt#L10-L33), even though it’s not a CMake-based project.
* The firmware will be [built automatically](.github/workflows/firmware-build.yml) on Git pushes.

The main missing parts are:

* Make the firmware understand the actual value-setting SCPI commands ([#4](https://github.com/cronologic-de/webusb/issues/4)). Since the library is already integrated, this is probably not a lot of work.
* Make the frontend send SCPI commands on user interaction ([#7](https://github.com/cronologic-de/webusb/issues/7)) and read the current values on connect.
* Instead of using Web Serial, create a real USBTMC device and connect to it using WebUSB.
  * This will require setting up different USB descriptors on the firmware side, as well as (obviously) replacing Web Serial with WebUSB in the frontend. The [`webusb-js-wip` branch](https://github.com/cronologic-de/webusb/tree/webusb-js-wip) contains [work-in-progress WebUSB code](https://github.com/cronologic-de/webusb/commit/312dd01f8713783fc36f62482df2eebe9230e433) that was put on hold when we decided to use Web Serial instead.
* Try out a [WebUSB Platform Capability Descriptor](https://wicg.github.io/webusb/#webusb-platform-capability-descriptor) for a plug-and-play experience on operating systems supporting it.

## WebUSB or Web Serial?

* [WebUSB](https://web.dev/usb/) is a browser API to access **arbitrary USB** devices connected to the local machine using JavaScript. Currently (May 2021), it is [only supported in Edge, Desktop & Mobile Chrome, Opera and a few others](https://caniuse.com/webusb). [Firefox](https://mozilla.github.io/standards-positions/#webusb) and [Safari](https://webkit.org/status/#feature-webusb) have announced that they will not be implementing it.
* [Web Serial](https://web.dev/serial/) is a browser API to access **serial** devices connected to the local machine using JavaScript. Currently, it is [only supported in Edge and Desktop Chrome](https://caniuse.com/mdn-api_serial). Firefox has announced that they [will not be implementing it](https://mozilla.github.io/standards-positions/#webserial).

Web Serial abstracts away low-level USB enumeration and protocol.
In fact, it’s not limited to USB at all.
If your machine has built-in serial ports, these can be accessed, too.
You are limited to sending and receiving bytes (convertable into text, of course, if your protocol isn’t binary) and cannot perform any low-level interaction with the device.

However, WebUSB on the other hand only works if the operating system has not already claimed the device.
This is why, unintuitively, you cannot use WebUSB to access a USB Serial device (also known as USB CDC) like the Pi Pico:
The OS already claims exclusive access on the device by providing a serial port for it.

This is why we’ve stopped working on WebUSB and continued with Web Serial, at least for the prototype.
Once we migrate from a CDC-presenting microcontroller to a USBTMC configuration, WebUSB might become the way to go again.
Determining whether there are operating systems that automatically claim TMC devices, and if so, how to prevent that, is left as a future investigation.

## License

The code in this repository is licensed under the [Mozilla Public License 2.0](LICENSE). This more or less means that you can do with this code whatever you want, but if you improve the code you shall make your changes available ot others upon request. Please read the license for additional details.

We encourage you to contribute to this repository. By uploading to this repository you agree to make your changes available under the beforementioned license.
