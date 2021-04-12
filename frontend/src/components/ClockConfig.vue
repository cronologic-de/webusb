<template>
  <v-card
    outlined
    :disabled="disabled"
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
                v-model="nanoVal"
                :rules="nanoRules"
              />
            </v-col>
            <v-col cols="4">
              <v-select
                :items="clockUnits"
                label="Unit"
                v-model="unitVal"
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  const CLOCK_UNITS = [
    'kHz',
    'MHz',
    'ns',
    'µs',
  ];

  export default {
    name: 'ClockConfig',

    data() {
      return {
        clockUnits: CLOCK_UNITS,
        nanoVal: this.nanos,
        unitVal: this.unit,
        nanoRules: [
          (v => !(String(v).match(/-/)) ||
            'no negative numbers'),
          (v => !!(String(v).match(/^[0-9.]+$/)) ||
            'only digits and decimal point allowed'),
        ],
      };
    },

    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      nanos: {
        type: Number,
        default: 123456789,
      },
      unit: {
        type: String,
        default: 'ns',
        validator(val) {
          return CLOCK_UNITS.indexOf(val) !== -1;
        },
      },
    },
  }
</script>
