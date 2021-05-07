cmake_minimum_required(VERSION 3.13)

include(pico_sdk_import.cmake)

project(webusb C CXX ASM)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
pico_sdk_init()

# Build the SCPI parsing library (a Git submodule) as an external project.
# We'll build it in its source directory using its own Makefile, then place the
# .a file and the library's headers in scpi-parser for including/linking it.
include(ExternalProject)
set(scpi_parser_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/lib/scpi-parser/libscpi")
set(scpi_parser_PREFIX "${CMAKE_CURRENT_BINARY_DIR}/scpi-parser")
ExternalProject_Add(scpi_parser_build
	SOURCE_DIR "${scpi_parser_SOURCE_DIR}"
	BUILD_IN_SOURCE ON
	CONFIGURE_COMMAND make clean
	# Only generate the static version of the library, not the shared one (doesn't make sense here).
	BUILD_COMMAND env "CC=${CMAKE_C_COMPILER}" "CFLAGS=${CMAKE_C_FLAGS}" "PREFIX=${scpi_parser_PREFIX}" make static
	INSTALL_DIR "${scpi_parser_PREFIX}"
	INSTALL_COMMAND cp -r "${scpi_parser_SOURCE_DIR}/dist/libscpi.a" "${scpi_parser_SOURCE_DIR}/inc" "${scpi_parser_PREFIX}"
)

# After the SCPI library has been built (using the "scpi_parser_build"
# project), we define an "IMPORTED" library to be able to link to it and
# include it.
add_library(scpi_parser STATIC IMPORTED)
set_property(TARGET scpi_parser PROPERTY IMPORTED_LOCATION "${scpi_parser_PREFIX}/libscpi.a")
add_dependencies(scpi_parser scpi_parser_build)
target_link_libraries(scpi_parser INTERFACE "${scpi_parser_PREFIX}/libscpi.a")
target_include_directories(scpi_parser INTERFACE "${scpi_parser_SOURCE_DIR}/inc")

add_executable(serial_scpi
	serial_scpi.c
)

pico_enable_stdio_usb(serial_scpi 1)
pico_enable_stdio_uart(serial_scpi 1)

pico_add_extra_outputs(serial_scpi)

target_link_libraries(serial_scpi
	pico_stdlib
	scpi_parser
)
