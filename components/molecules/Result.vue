<template>
  <div>
    <div v-if="loading">
      loading
    </div>
    <div v-else>
      <pagination v-if="totalPages > 1"
        :total-pages="totalPages"
        :current-page="currentPage"
        @update:page="updatePage"  
      />

      <div v-if="movies !== null" class="columns is-multiline">
        <div class="column is-4"
          v-for="(movie, index) in movies"
          :key="index"
        >
          <card-movie
            :title='movie.title'
            :release-date='movie.releaseDate'
            :vote-average='movie.voteAverage'
            :poster-path='movie.posterPath'
            :genres='movie.genres'
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, ref, useStore } from '@nuxtjs/composition-api'

import { MoviesCollection } from '~/types/movies'

import CardMovie from '~/components/molecules/CardMovie.vue'
import Pagination from '~/components/molecules/Pagination.vue'

export default defineComponent({
  name: 'Result',

  components: {
    CardMovie,
    Pagination
  },

  setup() {
    const store = useStore()
    const page: Ref<number> = ref(1)

    const loading: Ref<boolean> = computed(() => store.getters['movies/loading'])
    const totalPages: Ref<number> = computed(() => store.getters['movies/totalPages'])
    const currentPage: Ref<number> = computed(() => store.getters['movies/currentPage'])

    const movies: Ref<Array<MoviesCollection> | null> = computed(() => {
      return store.getters['movies/selectedMovies'].length > 0 ? store.getters['movies/selectedMovies'] : null
    })

    async function updatePage(page: number) {
      // Store current page
      store.dispatch('movies/setCurrentPage', page)

      // use api call only if our page is not already loaded
      if(!store.getters['movies/moviesAreAlreadyLoaded'](page)) {
        // Get movies by search
      await store.dispatch('movies/searchMovies')
      }

      // Set selected Page
      store.dispatch('movies/setSelectedMovies')
    }

    return {
      loading,
      movies,

      totalPages,
      currentPage,
      updatePage
    }
  }
})
</script>
