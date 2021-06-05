<template>
  <button class="button"
    :disabled="disabled"
    @click="sendAction($event)"
  >
    Validate
  </button>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ValidationButton',

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    function sendAction(event: Event) {
      event.preventDefault()

      emit('do:actionToSearch')
    }

    return {
      sendAction
    }
  }
})
</script>