<template>
  <v-app>
    <v-app-bar
      app
      class="cronologic-app-bar"
    >
      <div class="d-flex align-center">
        <v-img
          alt="cronologic Logo"
          class="shrink mt-1"
          contain
          src="@/assets/cronologic_logo_2020.png"
          width="100"
        />
      </div>

      <div class="d-flex align-center ml-8">
        <v-toolbar-title>WebUSB</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center" v-if="hasSerialSupport">
        <span class="theme--light v-label mr-4 hidden-sm-and-down">Device Connection</span>
        <v-switch
          append-icon="mdi-usb"
          :color="deviceState === STATE_OPENING ? 'warning' : 'success'"
          hide-details
          :loading="deviceState === STATE_OPENING"
          v-model="deviceToggle"
        />
      </div>
    </v-app-bar>

    <v-main class="mt-4">
      <v-alert
        v-if="!hasSerialSupport"
        type="error"
        class="ma-8"
      >
        The browser you are using does not support the <a href="https://web.dev/serial/" target="_blank">Web Serial API</a>.
        You are therefore unable to use this tool.
        Please use one of the <a href="https://caniuse.com/mdn-api_serial" target="_blank">supported browsers</a>, e.g. Chrome&nbsp;≥&nbsp;89 or Edge&nbsp;≥&nbsp;89.
      </v-alert>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6" offset-sm="3"
            md="4" offset-md="4"
          >
            <ClockConfig
              :disabled="!connected"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12" sm="6" md="4" lg="3"
            v-for="channel in channelConfig"
            :key="channel.id"
          >
            <ChannelConfig
              :id="channel.id"
              :color="channel.color"
              :disabled="!connected"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ChannelConfig from './components/ChannelConfig';
import ClockConfig from './components/ClockConfig';
import { SerialPort, STATE_CLOSED, STATE_OPENING, STATE_OPEN } from './lib/serial';

export default {
  name: 'App',

  components: {
    ChannelConfig,
    ClockConfig,
  },

  data: () => ({
    channelConfig: [
      {
        id: 1,
        color: 'red',
      }, {
        id: 2,
        color: 'orange',
      }, {
        id: 3,
        color: 'yellow',
      }, {
        id: 4,
        color: 'lime',
      }, {
        id: 5,
        color: 'green',
      }, {
        id: 6,
        color: 'teal',
      }, {
        id: 7,
        color: 'blue',
      }, {
        id: 8,
        color: 'purple',
      },
    ],
    device: null,
    deviceState: STATE_CLOSED,
  }),
  computed: {
    connected() {
      return this.deviceState === STATE_OPEN;
    },
    deviceToggle: {
      get: function () {
        return this.deviceState !== STATE_CLOSED;
      },
      set: async function (val) {
        if (val) {  // Request to enable.
          if (this.deviceState === STATE_CLOSED) {
            try {
              // Make sure to set this.device to the promise _before_ awaiting
              // it, so that this.deviceState may actually be STATE_OPENING.
              this.device = SerialPort.fromUserSelection();
              this.updateDeviceState();
              this.device = await this.device;

              // After a device has been selected, actually open the port and
              // start reading from it.
              await this.device.open();
              this.device.readLoop();
            } catch (err) {
              console.log(err);
              // Opening the device failed, unset this.device again.
              this.device = undefined;
            }
            console.log('device is', this.device);
          }
        } else {  // Request to disable.
          await this.device.close();
          this.device = null;
        }
        this.updateDeviceState();
      }
    },
    hasSerialSupport: () => 'serial' in navigator,
  },
  methods: {
    updateDeviceState() {
      // this.device can be one of three things: An unresolved promise (because
      // SerialPort.fromUserSelection() is still running), a SerialPort instance
      // (there's an active connection), or undefined (no connection).
      if (typeof this.device?.then === 'function') {  // is a promise
        this.deviceState = STATE_OPENING;
      } else {
        this.deviceState = this.device ? this.device.state : STATE_CLOSED;
      }
    },
  },
  created() {
    this.STATE_CLOSED = STATE_CLOSED;
    this.STATE_OPENING = STATE_OPENING;
    this.STATE_OPEN = STATE_OPEN;
  },
};
</script>

<style lang="scss">
.cronologic-app-bar {
  background-image: url('./assets/cronologic_background.gif');
  background-repeat: repeat;
}

.no-spinbox input[type="number"] {
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
}
</style>
