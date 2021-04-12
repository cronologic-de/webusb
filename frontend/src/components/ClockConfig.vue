<template>
  <v-card
    outlined
  >
    <v-card-title
      class="grey lighten-3"
    >
      Base clock
    </v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="8">
              <v-text-field
                label="Value"
                type="number"
                class="no-spinbox"
              />
            </v-col>
            <v-col cols="4">
              <v-select
                :items="clockUnits"
                label="Unit"
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'ClockConfig',

    data: () => ({
      clockUnits: [
        'kHz',
        'MHz',
        'ns',
        'µs',
      ],
    }),
  }
</script>
