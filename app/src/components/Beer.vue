<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
    height="500"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-container>
      <v-img
        contain
        height="250"
        :src="img"
      ></v-img>
    </v-container>

    <v-card-title>{{name}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
        style="display: flex; justify-content: space-between"
      >
        <div style="display: flex; flex: 1;">
          <v-rating
            :value="stars"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">
            {{stars}} ({{rating.length}})
          </div>
        </div>
        
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="review">
          Review
        </v-btn>
      </v-row>

      <div class="my-4 subtitle-1" style="overflow-y: auto; max-height:89px;">
        Pairings • {{pairing.join(', ')}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'Beer',
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        default: ''
      },
      img: {
        type:  String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      date: {
        type: String,
        default: ''
      },
      pairing: {
        type: Array,
        default: () => ([])
      },
      rating: {
        type: Array,
        default: () => ([])
      }
    },
    computed: {
      stars() {
        const ratings = this.rating
        const count = ratings.length

        const total = count ? ratings.reduce((prev, current) => ({rating: prev.rating + current.rating})) : 0

        console.log(this.rating, total, count, (total.rating/count || 0))
        return Math.floor(total.rating / count || 0)
      }
    },
    data: () => ({}),
    methods: {
      review() {
        this.$emit('select', this.id)
      }
    }
  }
</script>
