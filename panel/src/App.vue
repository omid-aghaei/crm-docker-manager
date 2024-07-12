<script setup>
import { provide } from 'vue';
import mitt from 'mitt'

import mainHeader from './components/mainHeader.vue'
import mainFooter from './components/mainFooter.vue'
import mainLoading from './components/mainLoading.vue'

const emitter = mitt()
provide('emitter', emitter)
</script>

<template>
  <div class="flex flex-col h-screen max-h-screen gap-4">
    <mainLoading />
    <header>
      <mainHeader />
    </header>
    <main class="grow text-sm leading-none">
      <RouterView />
    </main>
    <footer>
      <mainFooter />
    </footer>
    <notifications position="top right" />
  </div>
</template>