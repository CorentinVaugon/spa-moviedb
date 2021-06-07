<template>
  <div>
    <div v-if="loading">
      loading
    </div>
    <div v-else>
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

        <pagination />
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
    CardMovie
  },

  setup() {
    const store = useStore()
    const page: Ref<number> = ref(1)

    const loading: Ref<boolean> = computed(() => store.getters['movies/loading'])

    const movies: Ref<Array<MoviesCollection> | null> = computed(() => {
      return store.getters['movies/selectedMovies'].length > 0 ? store.getters['movies/selectedMovies'] : null
    })

    return {
      loading,
      movies
    }
  }
})
</script>
