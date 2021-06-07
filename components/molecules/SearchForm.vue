<template>
  <form>
    <input-text-search 
      @update:search="updateSearch"
    />

    <select-year
      @update:year="updateYear"
    />
    
    <validation-button 
      :disabled="disabledButton"
      @do:actionToSearch="fetchSearch"
    />
  </form>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, computed } from '@nuxtjs/composition-api'

import InputTextSearch from '~/components/atoms/InputTextSearch.vue'
import SelectYear from '~/components/atoms/SelectYear.vue'
import ValidationButton from '~/components/atoms/ValidationButton.vue'

export default defineComponent({
  name: 'SearchForm',

  components: {
    InputTextSearch,
    SelectYear,
    ValidationButton
  },

  setup(props, { emit }) {
    const search: Ref<string> = ref('')
    const year: Ref<number | null> = ref(null)

    const disabledButton: Ref<boolean> = computed(() => search.value === '')

    function updateSearch(payload: {search: string}){
      search.value = payload.search
    }

    function updateYear(payload: {year: number | null}) {
      year.value = payload.year
    }

    function fetchSearch() {
      // Emit event to send search value to parent component
      let payload = {
        search: search.value,
        year: year.value
      }

      emit('get:search-data', payload)
    }

    return {
      search,
      updateSearch,

      year,
      updateYear,

      disabledButton,

      fetchSearch
    }
  }
})
</script>