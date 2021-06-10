<template>
  <div 
    class="notification is-light has-text-centered" 
    :class="`is-${color}`"
  >
    {{message}}
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: "Notification",

  props: {
    color: {
      type: String,
      default: 'primary'
    },

    message: {
      type: String,
      required: true
    }
  },

  setup() {
    return {

    }
  },
})
</script>
