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

      <div class="d-flex align-center">
        <span class="theme--light v-label mr-4 hidden-sm-and-down">Device Connection</span>
        <v-switch
          append-icon="mdi-usb"
          :color="deviceState === DEVICE_CONNECTING ? 'warning' : 'success'"
          hide-details
          :loading="deviceState === DEVICE_CONNECTING"
          v-model="deviceToggle"
        />
      </div>
    </v-app-bar>

    <v-main class="mt-4">
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

      <v-snackbar
        v-model="connectionFakeNotification"
        :timeout="5000"
      >
        <v-icon color="light-blue">mdi-information</v-icon>
        The “connect” toggle is currently just a mockup.
        No USB connection is made.
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import ChannelConfig from './components/ChannelConfig';
import ClockConfig from './components/ClockConfig';

const DEVICE_DISABLED = 0;
const DEVICE_CONNECTING = 1;
const DEVICE_CONNECTED = 2;

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
    connectionFakeNotification: false,
    deviceState: DEVICE_DISABLED,
  }),
  computed: {
    connected() {
      return this.deviceState === this.DEVICE_CONNECTED;
    },
    deviceToggle: {
      get: function () {
        return this.deviceState !== this.DEVICE_DISABLED;
      },
      set: function (val) {
        if (val) {  // Request to enable.
          if (this.deviceState == this.DEVICE_DISABLED) {
            this.deviceState = this.DEVICE_CONNECTING;
            this.connectionFakeNotification = true;
            setTimeout(() => {
              if (this.deviceState === this.DEVICE_CONNECTING) {
                this.deviceState = this.DEVICE_CONNECTED;
              }
            }, 1000);
          }
        } else {  // Request to disable.
          this.deviceState = this.DEVICE_DISABLED;
        }
      }
    },
  },
  created() {
    this.DEVICE_DISABLED = DEVICE_DISABLED;
    this.DEVICE_CONNECTING = DEVICE_CONNECTING;
    this.DEVICE_CONNECTED = DEVICE_CONNECTED;
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
