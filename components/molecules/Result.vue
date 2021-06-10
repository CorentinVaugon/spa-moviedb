<template>
  <div>
    <div v-if="loading">
      <loader />
    </div>
    <div v-else>
      <div v-if="movies.length > 0" class="columns is-multiline">
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

      <notification 
        v-if="movies.length === 0 && noResult"
        message="No movies found through your search" 
        color="danger" 
      />

      <pagination v-if="totalPages > 1"
        class="pagination"
        :total-pages="totalPages"
        :current-page="currentPage"
        @update:page="updatePage"  
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, ref, useStore } from '@nuxtjs/composition-api'

import { MoviesCollection } from '~/types/movies'

import Notification from '~/components/atoms/Notification.vue'
import Loader from '~/components/atoms/Loader.vue'

import CardMovie from '~/components/molecules/CardMovie.vue'
import Pagination from '~/components/molecules/Pagination.vue'

export default defineComponent({
  name: 'Result',

  components: {
    CardMovie,
    Pagination,
    Notification,
    Loader
  },

  setup() {
    const store = useStore()
    const page: Ref<number> = ref(1)

    const loading: Ref<boolean> = computed(() => store.getters['movies/loading'])
    const totalPages: Ref<number> = computed(() => store.getters['movies/totalPages'])
    const currentPage: Ref<number> = computed(() => store.getters['movies/currentPage'])

    const movies: Ref<Array<MoviesCollection> | null> = computed(() => store.getters['movies/selectedMovies'])

    const noResult: Ref<boolean> = computed(() => store.getters['movies/noResult'])

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
      noResult,

      totalPages,
      currentPage,
      updatePage
    }
  }
})
</script>
<style lang="sass" scoped>
.pagination
  margin-top: 1rem
</style>