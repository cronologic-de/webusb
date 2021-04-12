<template>
  <v-card
    outlined
    :disabled="disabled"
  >
    <v-card-title
      :class="color + ' lighten-4'"
    >
      Channel {{ id }}
    </v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Multiplier</v-list-item-title>
          <p class="text-caption text--secondary">
            Set the number of pulses per clock cycle as a fraction, i.e. <sup>numerator</sup>/<sub>denominator</sub>
          </p>
          <v-row>
            <v-col>
              <v-text-field
                label="Numerator"
                type="number"
                class="no-spinbox"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Denominator"
                type="number"
                class="no-spinbox"
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col>
              <v-text-field
                label="Phase"
                type="number"
                suffix="ns"
                class="no-spinbox"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Pulse width"
                type="number"
                suffix="ns"
                class="no-spinbox"
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
    name: 'ChannelConfig',

    data: () => ({
    }),

    props: {
      color: {
        type: String,
        default: 'grey',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      id: {
        type: Number,
        required: true,
      }
    },
  }
</script>
