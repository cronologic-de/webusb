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
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.cronologic-app-bar {
  background-image: url('./assets/cronologic_background.gif');
  background-repeat: repeat;
}
</style>
