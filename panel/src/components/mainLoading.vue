<template>
  <div class="h-1" >
    <div class="main_loading_grad w-full h-1" v-if="(crmLoaderStatus > 0)"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import crmLoader from '@/utilities/crmLoader'
export default defineComponent({
  name: 'pending',
  setup() {
    const crmLoaderStatus = crmLoader.crmLoaderStatus
    return { crmLoaderStatus }
  }
})
</script>
