<script setup>
import { ref } from 'vue';
import { getImages } from '@/api/images'

const images = ref(null)
getImages((res) => { images.value = res.data }, (err) => { console.log(err) })
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">

    <div class="flex items-center leading-none gap-5 p-2 border rounded bg-gray-400">
      <div class="pt-1">#</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">Name</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">Versions</div>
    </div>

    <div v-for="(image, index) in images" :key="image.Id" class="flex items-center leading-none gap-5 p-2 border rounded bg-gray-50">
      <div class="pt-1">{{index + 1 }}</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">{{image.Name}}</div>
      <RouterLink :to="{ name: 'imageView', params: { id: v.Id } }" v-for="v in image.Versions" :key="v.Id" class="bg-gray-200 px-2 py-1 rounded text-xs">{{v.Version}}</RouterLink>
      <div class="pt-1 ml-auto">{{new Intl.DateTimeFormat('en-US', { timeStyle: "short", dateStyle: "long"}).format(image.Created)}}</div>
    </div>
  </div>
</template>
