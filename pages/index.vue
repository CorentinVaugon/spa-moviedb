<template>
  <div class="container">
    <movies-search />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import MoviesSearch from '~/components/organisms/MoviesSearch.vue'

export default defineComponent({
  name: 'Index',
  components: {
    MoviesSearch
  },

  setup() {
    return {
    }
  }
})
</script>
