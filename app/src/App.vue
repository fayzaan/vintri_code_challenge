<template>
  <v-app>
    <v-main>
      <BeerSearch/>
    </v-main>
  </v-app>
</template>

<script>
import BeerSearch from './components/BeerSearch';

export default {
  name: 'App',
  components: {
    BeerSearch,
  }
}
</script>
