<template>
  <nav class="pagination is-centered is-danger is-small" role="navigation" aria-label="pagination">
    <button 
      :disabled="currentPage === 1" 
      class="pagination-previous"
      @click="updatePage(currentPage-1)"
    >
      Previous
    </button>

    <button 
      :disabled="currentPage === totalPages"
      class="pagination-next"
      @click="updatePage(currentPage+1)"
    >
      Next page
    </button>
    
    <ul class="pagination-list">
      <li>
        <button class="pagination-link" 
          :class="{'is-current' : currentPage === 1}" 
          aria-label="Goto page 1"
          @click="updatePage(1)"  
        >
            1
          </button>
      </li>

      <li v-if="currentPage + 1 !== 2 && currentPage !== 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li v-for="page in pages" :key="page">
        <button 
          class="pagination-link" 
          :class="{'is-current' : currentPage === page}" 
          :aria-label="`Page ${page}`" 
          aria-current="page"
          @click="updatePage(page)"
        >
            {{page}}
          </button>
      </li>

      <li v-if="currentPage - 1 !== totalPages - 1 && currentPage !== totalPages - 1">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li>
        <button 
          class="pagination-link" 
          :class="{'is-current' : currentPage === totalPages}" 
          :aria-label="`Goto page ${totalPages}`"
          @click="updatePage(totalPages)"
        >
          {{totalPages}}
        </button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, computed, Ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Pagination',

  props: {
    totalPages: {
      type: Number,
      required: true
    },

    currentPage: {
      type: Number,
      required: true
    }
  },

  setup(props, {emit}) {
    const pages: Ref<Array<number>> = computed(() => {
      let pages = []
      for (let i = (props.currentPage - 1); i <= (props.currentPage + 1); i++) {
        if(i > 1 && i < props.totalPages) {
          pages.push(i)
        } 
      }

      return pages
    })

    function updatePage(newPage: number) {
      emit('update:page', newPage)
    }

    return {
      pages,
      updatePage
    }
  },
})
</script>
