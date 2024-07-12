<script setup>
import { ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { getManifests, deleteManifest } from '@/api/manifests'

const { notify }  = useNotification()

const manifests = ref(null)
const getData = function() {
  getManifests((res) => { manifests.value = res.data }, (err) => { console.log(err) })
}
getData()

const doRemove = function(id) {
  deleteManifest(id, (res) => { notify({text: 'manifest removed'}); getData() }, (err) => { notify({type: 'error', text: err.response.data.message}) })
}

const doExport = function(manifest) {
  const filename = manifest.title;
  const jsonStr = JSON.stringify(manifest);
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">

    <div class="flex items-center leading-none gap-5 p-2 border rounded bg-gray-400">
      <div class="pt-1 w-4">#</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">Name</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">Image</div>
    </div>

    <div v-for="(manifest, index) in manifests" :key="manifest.Id" class="flex items-center leading-none gap-5 p-2 border rounded bg-gray-50">
      <div class="pt-1 w-4">{{index + 1 }}</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">{{manifest.title}}</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">{{ JSON.parse(manifest.structure).image }}</div>
      <div class="pt-1 ml-auto flex gap-5">
        <router-link :to="{ name: 'manifestEdit', params: { id: manifest.id } }"><i class="fal fa-pencil"></i></router-link>
        <div class="cursor-pointer" @click="doExport(manifest)" ><i class="fal fa-download"></i></div>
        <div class="cursor-pointer" @click="doRemove(manifest.id)" ><i class="fal fa-trash-can"></i></div>
      </div>
    </div>
  </div>
</template>
