<template>
  <div class="loader"></div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Loader',
  setup() {
    return {

    }
  }
})
</script>
<style lang="sass" scoped>
/* ONE */
@keyframes spin 
	from
    transform: rotate(0deg)
	to
    transform: rotate(360deg)

.loader
  height: 48px
  width: 48px
  margin: 0 auto
  border: calc(48px / 8) solid hsl(204, 86%, 53%)
  border-left-color: transparent
  border-radius: 100%
  box-sizing: border-box
  animation: spin .7s linear infinite
</style>