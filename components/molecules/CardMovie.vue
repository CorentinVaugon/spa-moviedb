<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h3>{{title}}</h3>
            
            <p class="text">{{releaseDate}}</p>
            
            <vote-average 
              :vote-average="voteAverage"
            />

            <div class="tags">
              <tag-genre 
                v-for="(genre, index) in genres"
                :key="index"
                :genre-id="genre"
              />
            </div> 
          </div>

          <div class="column">
            <figure class="image is-4by3">
              <img :src="fetchImage(posterPath)" :alt="title">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TagGenre from '~/components/atoms/TagGenre.vue'
import VoteAverage from '~/components/atoms/VoteAverage.vue'

export default defineComponent({
  name: 'CardMovie',

  components: {
    VoteAverage,
    TagGenre
  },

  props: {
    title: {
      type: String,
      required: true
    },

    releaseDate: {
      type: String,
      required: true
    },

    voteAverage: {
      type: Number,
      required: true
    },

    posterPath: {
      type: String
    },

    genres: {
      type: Array,
      required: true
    }
  },

  setup() {
    function fetchImage(path: string | null): string {
      return path ? `https://image.tmdb.org/t/p/w200/${path}` : 'https://via.placeholder.com/200x300'
    }

    return {
      fetchImage
    }
  }
})
</script>
<style lang="sass">
.card
  height: 100%
</style>
