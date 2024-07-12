<script setup>
import { ref } from 'vue';
import { getImage } from '@/api/images'
import { useRoute } from 'vue-router';

const route = useRoute()
const image = ref(null)
const id = route.params.id
getImage(id, (res) => { image.value = res.data }, (err) => { console.log(err) })
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2 leading-loose">
    <pre>{{ image }}</pre>
  </div>
</template>
