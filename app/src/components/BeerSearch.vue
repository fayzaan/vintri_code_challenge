<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to BeeRate
        </h1>

        <p class="subheading font-weight-regular">
          Rate your most favorite and most hated beers
        </p>

        <v-text-field
            solo
            label="Enter the name of a beer"
            append-icon="fas fa-search"
            v-model="beer_name"
            @keypress="onSearch"
          ></v-text-field>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row dense>
          <v-col v-for="beer in beers" :key="beer.id" cols="4">
            <Beer
              :id="beer.id"
              :name="beer.name"
              :rating="beer.rating"
              :img="beer.image_url"
              :description="beer.description"
              :date="beer.first_brewed"
              :pairing="beer.food_pairing"
              @select="review"
            />
          </v-col>
        </v-row>
      </v-col>

    </v-row>

    <review
      v-if="selected"
      :id="selected.id"
      :name="selected.name"
      :rating="selected.rating"
      :img="selected.image_url"
      :description="selected.description"
      :date="selected.first_brewed"
      :pairing="selected.food_pairing"
      @ended="onReviewDone"
     />
  </v-container>
</template>

<script>
  import Beer from './Beer'
  import Review from './Review'

  export default {
    name: 'HelloWorld',
    components: {
      Beer,
      Review
    },
    data: () => ({
      timeout: null,
      beer_name: '',
      selected: null
    }),
    computed: {
      beers() {
        return this.$store.getters.beers
      }
    },
    mounted() {
      this.$store.dispatch('getBeers')
    },
    methods: {
      onSearch() {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }

        this.timeout = setTimeout(() => {
          this.$store.dispatch('getBeers', {beer_name: this.beer_name})
        }, 500)
      },
      review(id) {
        const beer = this.beers.filter(b => b.id === id)[0]
        
        this.$set(this, 'selected', beer)
      },
      onReviewDone(res) {
        this.$set(this, 'selected', null)

        if (res) {
          this.onSearch()
        }
      }
    }
  }
</script>
