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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-title
                v-bind="attrs"
                v-on="on"
              >
                Multiplier
                <v-icon>mdi-information</v-icon>
              </v-list-item-title>
            </template>
            <span>
              Set the number of pulses per clock cycle as a fraction, i.e. <sup>numerator</sup>/<sub>denominator</sub>
            </span>
          </v-tooltip>
          <v-row>
            <v-col>
              <v-text-field
                label="Numerator"
                type="number"
                class="no-spinbox"
                v-model="num"
                :rules="num_rules"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Denominator"
                type="number"
                class="no-spinbox"
                v-model="denom"
                :rules="denom_rules"
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
                v-model="phase_ns"
                :rules="phase_rules"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Pulse width"
                type="number"
                suffix="ns"
                class="no-spinbox"
                v-model="width_ns"
                :rules="width_rules"
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  // Returns a validation rule for a given maximum string length.
  function maxLength(max) {
    return (v => String(v).length <= max || `${max} digit${max===1?'':'s'} max`);
  }

  // Returns a validation rule for a given number of maximum fractional digits.
  function maxFrac(max) {
    return v => {
      v = String(v).split('.', 2);
      if (v.length === 2 && v[1].length > max) {
        return `${max} fractional digits max`;
      }
      return true;
    }
  }

  // Validation rule: Has to be a positive integer not equal to zero.
  function posIntNot0(v) {
    if (!(String(v).match(/^[0-9]+$/))) {
      return 'only positive integers';
    }
    if (String(v) === '0') {
      return 'cannot be zero';
    }
    return true;
  }

  // Validation rule: Has to be a positive floating point number (including 0).
  function posFloat(v) {
    return !!(String(v).match(/^[0-9.]+$/)) || 'only positive numbers';
  }

  export default {
    name: 'ChannelConfig',

    data() {
      return {
        // Channel configuration values.
        num: this.numerator,
        denom: this.denominator,
        phase_ns: this.phase,
        width_ns: this.width,

        // Validation rules.
        num_rules: [ posIntNot0, maxLength(2) ],
        denom_rules: [ posIntNot0, maxLength(1) ],
        phase_rules: [
          posFloat,
          maxFrac(5),
          v => {
            v = parseFloat(v);
            if ((v * 1_000_000) % 250 !== 0) {
              return 'only multiples of 250 fs';
            }
            if (v > 1_000_000) {
              return 'max 1 ms';
            }
            return true;
          },
        ],
        width_rules: [
          posFloat,
          maxFrac(3),
        ],
      };
    },

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
      },
      numerator: {
        type: Number,
        default: 1,
      },
      denominator: {
        type: Number,
        default: 1,
      },
      phase: {
        type: Number,
        default: 123.45625,
      },
      width: {
        type: Number,
        default: 123.456,
      },
    },
  }
</script>
