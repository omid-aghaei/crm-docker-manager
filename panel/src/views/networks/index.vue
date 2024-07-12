<script setup>
import { ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { getNetworks, deleteNetwork } from '@/api/networks'

const { notify }  = useNotification()

const networks = ref(null)
const getData = function() {
  getNetworks((res) => { networks.value = res.data }, (err) => { console.log(err) })
}
getData()

const doRemove = function(id) {
  deleteNetwork(id, (res) => { notify({text: 'network removed'}); getData() }, (err) => { notify({type: 'error', text: err.response.data.message}) })
}
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">

    <div class="grid grid-cols-10 leading-none gap-5 p-2 border rounded bg-gray-400 pr-12">
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Name</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Scope</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Driver</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Internal</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Attachable</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Ingress</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">IPv6</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">IPAM Driver</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Subnet</div>
      <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">Gateway</div>
    </div>

    <div class="flex gap-4 border rounded bg-gray-50 " v-for="network in networks" :key="network.Id">
      <div class="grid grid-cols-10 leading-none gap-5 p-2 grow">
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.Name}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.Scope}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.Driver}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.Internal}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.Attachable}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.Ingress}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.EnableIPv6}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.IPAM.Driver}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.IPAM.Config && network.IPAM.Config.length > 0 ? network.IPAM.Config[0].Subnet : '-'}}</div>
        <div class="pt-1 text-ellipsis overflow-hidden whitespace-nowrap">{{network.IPAM.Config && network.IPAM.Config.length > 0 ? network.IPAM.Config[0].Gateway : '-'}}</div>
      </div>
      <div class="w-6 pt-2.5 pr-2 cursor-pointer" @click="doRemove(network.Id)"><i class="fal fa-trash-can"></i></div>
    </div>
  </div>
</template>
