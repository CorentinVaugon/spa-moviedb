<template>
  <input v-model="search" 
    class="input" 
    type="text" 
    placeholder="Enter your search"
  />
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InputTextSearch',

  setup(props, { emit }) {
    const search: Ref<string> = ref('')

    watch(search, (newValue) => {
      emit('update:search', { search: newValue })
    })

    return {
      search
    }
  }
})
</script>