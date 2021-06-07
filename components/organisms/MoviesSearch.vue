<template>
  <div>
    <search-form 
      @get:search-data="callApi"
    />

    <result />
  </div>
</template>
<script lang="ts">
import { defineComponent, useFetch, useStore } from '@nuxtjs/composition-api'

import SearchForm from '~/components/molecules/SearchForm.vue'
import Result from '~/components/molecules/Result.vue'

export default defineComponent({
  name: 'MoviesSearch',

  components: {
    SearchForm,
    Result
  },

  setup() {
    const store = useStore()

    useFetch(async () => {
      await store.dispatch('movies/init')
    })

    async function callApi (payload: {search: string, year: number|null}) {
      //Reinit all datas
      store.dispatch('movies/reinitStates')

      // Store year and search
      store.dispatch('movies/setSearchDatas', payload)

      // Store current page
      store.dispatch('movies/setCurrentPage', 1)

      // Get movies by search
      await store.dispatch('movies/searchMovies')

      // Set selected Page
      store.dispatch('movies/setSelectedMovies')
    }

    return {
      callApi
    }
  }
})
</script>