#include <stdio.h>
#include "pico/stdlib.h"
#include "pico/binary_info.h"
#include "scpi/scpi.h"



// "IDN?" fields. Their meanings are "suggestions" in the standard.
#define SCPI_IDN1 "cronologic"         /* Manufacturer */
#define SCPI_IDN2 "WebUSB Experiment"  /* Model */
#define SCPI_IDN3 NULL                 /* no suggestion */
#define SCPI_IDN4 "0.1"                /* Firmware level */

// This will hold the SCPI "instance".
scpi_t scpi_context;

// Input buffer for reading SCPI commands.
#define SCPI_INPUT_BUFFER_SIZE 256
static char scpi_input_buffer[SCPI_INPUT_BUFFER_SIZE];

// Error queue required by the library. Size taken from the docs.
#define SCPI_ERROR_QUEUE_SIZE 17
scpi_error_t scpi_error_queue[SCPI_ERROR_QUEUE_SIZE];

// The function called by the SCPI library when it wants to send data.
size_t write_scpi(scpi_t *context, const char *data, size_t len) {
	return fwrite(data, 1, len, stdout);
}

// The SCPI commands we support and the callbacks they use.
scpi_command_t scpi_commands[] = {
	{ .pattern = "*IDN?", .callback = SCPI_CoreIdnQ, },
	{ .pattern = "*RST",  .callback = SCPI_CoreRst, },
	SCPI_CMD_LIST_END
};

// Additional callbacks to be used by the library.
scpi_interface_t scpi_interface = {
	.write = write_scpi,
	.error = NULL,
	.reset = NULL,
};



int main() {
	bi_decl(bi_program_description("This is a test binary, including the SCPI library."));
	bi_decl(bi_1pin_with_name(LED_PIN, "On-board LED"));

	stdio_init_all();

	// Initialize the SCPI library.
	SCPI_Init(
		&scpi_context, scpi_commands, &scpi_interface, scpi_units_def,
		SCPI_IDN1, SCPI_IDN2, SCPI_IDN3, SCPI_IDN4,
		scpi_input_buffer, SCPI_INPUT_BUFFER_SIZE,
		scpi_error_queue, SCPI_ERROR_QUEUE_SIZE
	);

	while (1) {
		// Feed single characters into the SCPI library.
		// This is somewhat discouraged, since (according to the docs) it will
		// apparently cause the whole buffer to be re-parsed after each character.
		char c = fgetc(stdin);  // TODO: Error handling.
		SCPI_Input(&scpi_context, &c, 1);
	}
}
