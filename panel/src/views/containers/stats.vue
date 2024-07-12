<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getContainerStats } from '@/api/containers'
import { useRoute } from 'vue-router';

const route = useRoute()
const container_id = route.params.id
const info = ref(null)
const getInfo = function() { getContainerStats(container_id, (res) => { info.value = res.data }, (err) => { console.log(err) }) }
getInfo();

const timer = ref(null)
onMounted(() => { timer.value = setInterval(() => { getInfo() }, 5000) })
onUnmounted(() => { clearInterval(timer.value) })
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">

    <div v-if="info?.cpu_stats" class="mt-2">CPU :</div>
    <div v-if="info?.cpu_stats" class="grid grid-cols-4 gap-5 border rounded p-2">
      <div>count : {{ info.cpu_stats.cpu_usage?.percpu_usage?.length ? info.cpu_stats.cpu_usage?.percpu_usage?.length : info.cpu_stats.online_cpus }}</div>
      <div>usage : {{info.cpu_stats.cpu_usage.total_usage - info.precpu_stats.cpu_usage.total_usage}}</div>
      <div>system_cpu_delta : {{info.cpu_stats.system_cpu_usage - info.precpu_stats.system_cpu_usage}}</div>
    </div>

    <div v-if="info?.memory_stats" class="mt-2">Memory :</div>
    <div v-if="info?.memory_stats" class="grid grid-cols-4 gap-5 border rounded p-2">
      <div>Used : {{ convert.mbToProperUnit(info.memory_stats.stats.cache ? info.memory_stats.usage - info.memory_stats.stats.cache : info.memory_stats.usage) }}</div>
      <div>Available : {{ convert.mbToProperUnit(info.memory_stats.limit) }}</div>
      <div>Usage : {{ (((info.memory_stats.stats.cache ? info.memory_stats.usage - info.memory_stats.stats.cache : info.memory_stats.usage) / (info.memory_stats.limit)) * 100).toFixed(2) }} %</div>
    </div>

    <div v-if="info?.networks" class="mt-2">Networks :</div>
    <div v-if="info?.networks" class="flex flex-col gap-2 border rounded p-2">
      <div v-for="(network, name) in info.networks" :key="name" class="flex flex-col gap-2">
        <div class="">{{name}}</div>
        <div class="grid grid-cols-4 gap-5">
          <div v-for="(value, item) in network" :key="item">{{item}} : {{value}}</div>
        </div>
      </div>
    </div>

  </div>
</template>
