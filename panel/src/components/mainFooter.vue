<script setup>
import { ref } from 'vue';
import { getInfo } from '@/api/index'

const info = ref(null)
getInfo((res) => { info.value = res }, (err) => { console.log(err) })
</script>

<template>
  <div class="container border rounded px-4 pb-2 pt-3 mx-auto flex gap-8 text-xs" v-if="info">
    <div>OS : {{info.data.OSType}}</div>
    <div class="text-gray-300">/</div>
    <div>OS Name : {{info.data.OperatingSystem}}</div>
    <div class="text-gray-300">/</div>
    <div>OS Version : {{info.data.OSVersion}}</div>
    <div class="text-gray-300">/</div>
    <div>CPU : {{info.data.NCPU}}</div>
    <div class="text-gray-300">/</div>
    <div>RAM : {{ convert.mbToProperUnit(info.data.MemTotal)}}</div>
    <div class="text-gray-300">/</div>
    <div>DOCKER : {{info.data.ServerVersion}}</div>
    <div class="ml-auto">
      V : 0.0.9
    </div>
  </div>
</template>