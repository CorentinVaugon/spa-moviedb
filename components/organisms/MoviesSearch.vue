<template>
  <div>
    <search-form 
      @get:search-data="callApi"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import SearchForm from '~/components/molecules/SearchForm.vue'

export default defineComponent({
  name: 'MoviesSearch',

  components: {
    SearchForm
  },

  setup() {
    function callApi (payload: {search: string, year: number|null}) {
      console.log(payload)
    }

    return {
      callApi
    }
  }
})
</script>