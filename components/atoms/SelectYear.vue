<template>
  <div>
    <label
      for="selectYear"
      class="is-block"
    >
      Select Year
    </label>

    <div class="select is-normal">
      <select
        id="selectYear"
        v-model="year"
      >
        <option
          :value="null"
        >
          Any
        </option>
        <option v-for="year in availableYear" 
          :key="year" 
          :value="year">
          {{year}}
        </option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SelectYear',

  setup(props, { emit }) {
    const year: Ref<number | null> = ref(null)
    const availableYear: Ref<Array<number>> = ref(range(1900, 2020))

    function range(start: number, end: number): Array<number> {
      let list = []
      for(let i = start; i <= end; i++) {
        list.push(i)
      }
      return list
    }

    watch(year, (newValue) => {
      emit('update:year', { year: newValue })
    })

    return {
      year,
      availableYear
    }
  }
})
</script>