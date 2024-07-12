<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getContainer } from '@/api/containers'
import { useRoute } from 'vue-router';

const route = useRoute()
const container_id = route.params.id
const info = ref(null)
const getInfo = function() { getContainer(container_id, (res) => { info.value = res.data }, (err) => { console.log(err) }) }
getInfo();

const timer = ref(null)
onMounted(() => { timer.value = setInterval(() => { getInfo() }, 10000) })
onUnmounted(() => { clearInterval(timer.value) })
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">
    <pre>{{ info }}</pre>
  </div>
</template>
