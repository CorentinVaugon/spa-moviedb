<template>
  <p class="has-text-weight-medium" :class="fetchColor()">{{ voteAverage }}</p>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VoteAverage',

  props: {
    voteAverage: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    function fetchColor(): string {
      let classColor = 'has-text-danger'

      if(props.voteAverage > 7.5) {
        classColor = 'has-text-success'
      } else if (props.voteAverage > 5) {
        classColor = 'has-text-info'
      }

      return classColor
    }

    return {
      fetchColor
    }
  },
})
</script>
