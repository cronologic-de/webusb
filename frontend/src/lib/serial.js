const STATE_CLOSED = 0;
const STATE_OPENING = 1;
const STATE_OPEN = 2;
const STATE_CLOSING = 3;

let DEBUG = true;

function log() {
    if (DEBUG) {
        console.log(...arguments);
    }
}

class SerialPort extends EventTarget {
    // Extends EventTarget so that we can provide events on new lines coming in
    // (not implemented yet).

    // Create a SerialPort instance by interactive selection using the browser UI.
    static async fromUserSelection() {
        log("SerialPort.fromUserSelection()");
        const port = await navigator.serial.requestPort();
        log("Creating new SerialPort from", port);
        return new SerialPort(port);
    }

    // Create a new SerialPort instance based on a browser API instance of a port.
    // You still need to call .open() and probably .readLoop() afterwards.
    constructor(webSerialPort) {
        super();
        this._reset();
        this.readLoop = this.readLoop.bind(this);  // because it calls itself using setTimeout
        this.port = webSerialPort;
        navigator.serial.addEventListener("disconnect", ev => this.disconnectHandler(ev));
        log("Created new SerialPort:", this);
    }

    // Reset the instance to its initial state.
    _reset() {
        this.port = null;
        this.state = STATE_CLOSED;
        this.reader = null;
        this.readableStreamClosed = null;
    }

    // Open the port.
    async open() {
        log("open() called on", this);
        this.state = STATE_OPENING;

        // Open the port.
        await this.port.open({
            baudRate: 115200,
        });

        // Set up input decoding (binary to text).
        const textDecoder = new window.TextDecoderStream();
        this.readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
        this.reader = textDecoder.readable.getReader();

        this.state = STATE_OPEN;
        log("Port is now open.");
    }

    // Close the port.
    async close() {
        log("close() called on", this);
        this.state = STATE_CLOSING;

        this.reader.cancel();
        await this.readableStreamClosed.catch(() => { /* Ignore, this is expected because of the cancel(). */ });
        await this.port.close();

        this._reset();
        log("Port is now closed.");
    }

    // Called when the browser signals that the device has gone away.
    disconnectHandler(ev) {
        if (ev.target !== this.port) {
            return;
        }
        log("disconnectHandler() called on", this, "with", ev);

        this._reset();
    }

    // Read chunks from the serial device indefinitely. Right now, they are
    // displayed via console.log(); in the future, triggering an event should be
    // the way to go.
    async readLoop() {
        // Wait in the background for a chunk to come in.
        const { value, done } = await this.reader.read();

        if (done) {
            // There's nothing left to read, stop trying.
            this.reader.releaseLock();
            return;
        }

        // Output the chunk and call the function again after leaving it.
        console.log('read:', value, this.state);
        setTimeout(this.readLoop, 1);
    }
}

export {
    SerialPort,
    DEBUG,
    STATE_CLOSED,
    STATE_OPENING,
    STATE_OPEN,
    STATE_CLOSING,
};
