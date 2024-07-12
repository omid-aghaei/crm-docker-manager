<script setup>
import { ref } from 'vue';
import { getInfo, getVersion } from '@/api/index'

const info = ref(null)
const version = ref(null)
getInfo((res) => { info.value = res.data }, (err) => { console.log(err) })
getVersion((res) => { version.value = res.data }, (err) => { console.log(err) })
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">
    <div class="pt-2.5 pb-1.5 bg-gray-400 pl-2 rounded">Platform:</div>
    <div class="grid grid-cols-3 gap-x-5 gap-y-2" v-if="version">
      <div class="border rounded p-2">{{ version.Platform.Name }}</div>
      <div class="border rounded p-2">Version: {{ version.Version }}</div>
      <div class="border rounded p-2">API: {{ version.ApiVersion }}</div>
      <div class="border rounded p-2">OS: {{ version.Os }}</div>
      <div class="border rounded p-2">Arch: {{ version.Arch }}</div>
      <div class="border rounded p-2">Kernel: {{ version.KernelVersion }}</div>
    </div>

    <div class="pt-2.5 pb-1.5 bg-gray-400 pl-2 rounded">Containers:</div>
    <div class="grid grid-cols-3 gap-x-5 gap-y-2" v-if="info">
      <div class="border rounded p-2">All : {{ info.Containers }}</div>
      <div class="border rounded p-2">Running : {{ info.ContainersRunning }}</div>
      <div class="border rounded p-2">Paused : {{ info.ContainersPaused }}</div>
      <div class="border rounded p-2">Stopped : {{ info.ContainersStopped }}</div>
      <div class="border rounded p-2">Images : {{ info.Images }}</div>
    </div>

    <div class="pt-2.5 pb-1.5 bg-gray-400 pl-2 rounded">Settings:</div>
    <div class="grid grid-cols-3 gap-x-5 gap-y-2" v-if="info">
      <div class="border rounded p-2">MemoryLimit : {{ info.MemoryLimit }}</div>
      <div class="border rounded p-2">SwapLimit : {{ info.SwapLimit }}</div>
      <div class="border rounded p-2">CpuCfsPeriod : {{ info.CpuCfsPeriod }}</div>
      <div class="border rounded p-2">CpuCfsQuota : {{ info.CpuCfsQuota }}</div>
      <div class="border rounded p-2">CPUShares : {{ info.CPUShares }}</div>
      <div class="border rounded p-2">CPUSet : {{ info.CPUSet }}</div>
      <div class="border rounded p-2">PidsLimit : {{ info.PidsLimit }}</div>
      <div class="border rounded p-2">IPv4Forwarding : {{ info.IPv4Forwarding }}</div>
      <div class="border rounded p-2">BridgeNfIptables : {{ info.BridgeNfIptables }}</div>
      <div class="border rounded p-2">BridgeNfIp6tables : {{ info.BridgeNfIp6tables }}</div>
      <div class="border rounded p-2">OomKillDisable : {{ info.OomKillDisable }}</div>
      <div class="border rounded p-2">Debug : {{ info.Debug }}</div>
    </div>

    <div class="pt-2.5 pb-1.5 bg-gray-400 pl-2 rounded">Registeries:</div>
    <div class="flex flex-col gap-2" v-if="info">
      <div v-for="item in Object.keys(info.RegistryConfig.IndexConfigs)" :key="item" >
        <div class="grid grid-cols-3 gap-x-5 gap-y-2">
          <div class="border rounded p-2">{{info.RegistryConfig.IndexConfigs[item].Name}}</div>
          <div class="border rounded p-2">Secure: {{info.RegistryConfig.IndexConfigs[item].Secure}}</div>
          <div class="border rounded p-2">Official: {{info.RegistryConfig.IndexConfigs[item].Official}}</div>
        </div>
      </div>
    </div>

  </div>
</template>
