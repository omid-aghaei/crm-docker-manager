<script setup>
import timer from './timer.vue';
</script>

<template>
  <div class="container border rounded pb-2 pt-3 px-4 mx-auto flex gap-5 text-sm">
    <router-link :to="{ name: 'home' }" active-class="underline underline-offset-4">Home</router-link>
    <div class="text-gray-300 select-none">/</div>
    <div class="flex gap-2">
      <router-link :to="{ name: 'manifests' }" active-class="underline underline-offset-4">Manifests</router-link>
      <router-link :to="{ name: 'manifestAdd' }" exact-active-class="" class="text-sm text-gray-400">(add)</router-link>
    </div>
    <div class="text-gray-300 select-none">/</div>
    <div class="flex gap-2">
      <router-link :to="{ name: 'images' }" active-class="underline underline-offset-4">Images</router-link>
      <router-link :to="{ name: 'imageAdd' }" exact-active-class="" class="text-sm text-gray-400">(add)</router-link>
    </div>
    <div class="text-gray-300 select-none">/</div>
    <div class="flex gap-2">
      <router-link :to="{ name: 'containers' }" active-class="underline underline-offset-4">Containers</router-link>
      <router-link :to="{ name: 'containerAdd' }" exact-active-class="" class="text-sm text-gray-400">(add)</router-link>
    </div>
    <div class="text-gray-300 select-none">/</div>
    <div class="flex gap-2">
      <router-link :to="{ name: 'networks' }" active-class="underline underline-offset-4">Networks</router-link>
      <router-link :to="{ name: 'networkAdd' }" exact-active-class="" class="text-sm text-gray-400">(add)</router-link>
    </div>
    <div class="ml-auto -mt-0.5">
      <timer />
    </div>
  </div>
</template>