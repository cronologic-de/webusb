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

      <v-btn
        href="https://github.com/cronologic-de/webusb"
        target="_blank"
        text
      >
        <span class="mr-2">Project Page</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6" offset-sm="3"
            md="4" offset-md="4"
          >
            <ClockConfig />
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
    ]
  }),
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
