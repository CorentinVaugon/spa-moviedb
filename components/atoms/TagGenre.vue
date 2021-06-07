<template>
  <span class="tag is-info">
    {{genre}}
  </span>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TagGenre',

  props: {
    genreId: {
      type: Number
    }
  },

  setup(props: {genreId: number}) {
    const store = useStore()
    const genre: Ref<string> = computed(() => store.getters['movies/getGenre'](props.genreId))

    return {
      genre
    }
  },
})
</script>
