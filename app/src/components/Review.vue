<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px">
    <v-form ref="form" v-model="form">
      <v-card>
        <v-container>
          <v-img
            contain
            height="250"
            :src="img">
          </v-img>
        </v-container>

        <v-card-title>{{name}}</v-card-title>

        <v-card-text>
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            hover
            large>
          </v-rating>

          <v-textarea
            counter="160"
            :rules="[rules.length(160)]"
            filled
            auto-grow
            label="Comments (Optional)"
            rows="4"
            row-height="30"
            v-model="comment"
            shaped>
          </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
            :disabled="!form"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  import apiRating from '../services/api.rating'

  export default {
    name: 'Review',
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
      }
    },
    computed: {},
    data: () => ({
      dialog: true,
      rating: 3,
      form: false,
      rules: {
        length: len => value => (value || '').length <= len || `Invalid character length, must be less than ${len}`
      },
      comment: ''
    }),
    methods: {
      submit() {
        const {id: beerId, rating, comment} = this
        apiRating.rate({beerId, rating, comment})
          .then(res => {
            this.$emit('ended', res)
          })
      },
      cancel() {
        this.$emit('ended')
      }
    }
  }
</script>