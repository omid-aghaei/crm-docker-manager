<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
import { postContainer } from '@/api/containers';
import { getManifests } from '@/api/manifests';
import { getImages } from '@/api/images';

const { notify }  = useNotification()
const router = useRouter()
const route = useRoute()

const manifest = ref('')
const manifests = ref(null)
getManifests((res) => { manifests.value = res.data }, (err) => { console.log(err) })

const images = ref(null)
getImages((res) => { images.value = res.data }, (err) => { console.log(err) })

const versions = computed(() => {
  if (manifest.value === '' || !images.value) { return [] }
  const temp = manifests.value.filter(x => x.title === manifest.value)
  if (temp.length !== 1) { return [] }
  const img = JSON.parse(temp[0].structure).image;
  return images.value.filter(x => x.Name === img).map(x => { return x.Versions })[0]
})

const name = ref('sample_container')
const tag = ref('')
const start = ref(true)
const set_tag = function(id) { tag.value = id }

const save = function() {
  if (name.value === '' || tag.value === '' || manifest.value === '') { notify({type: 'error', text: 'must provide name and tag' }); return false }
  const data = {
    name: name.value,
    tag: tag.value,
    manifest: manifest.value,
    start: start.value
  }
  postContainer(data, (res) => { notify({text: 'container created'}); router.push({ name: 'containers' }) }, (err) => { notify({type: 'error', text: err.response.data.message }) })
}
</script>

<template>
  <div class="container border rounded p-4 mx-auto h-full overflow-y-auto flex flex-col gap-4">

    <div class="flex gap-4 items-center">
      <div class="w-32">Manifest</div>
      <div><select v-model="manifest" class="p-1 border rounded w-96 bg-gray-100">
        <option v-for="m in manifests" :key="m.id" :value="m.title">{{m.title}}</option>
      </select></div>
    </div>

    <div class="flex gap-4 items-center">
      <div class="w-32">Container Name</div>
      <div><input v-model="name" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
    </div>

    <div class="flex gap-4 items-center">
      <div class="w-32">Start container</div>
      <div><input type="checkbox" v-model="start"></div>
    </div>

    <div class="flex gap-4 items-center">
      <div class="w-32">Tag</div>
      <div><input v-model="tag" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
    </div>

    <div class="grid grid-cols-8 gap-4 items-center">
      <div class="col-span-8">Available tag:</div>
      <div class="rounded border p-2 bg-green-50 cursor-pointer" v-for="v in versions" :key="v.Id" @click="set_tag(v.RepoTags.version)">{{v.RepoTags.version}}</div>
    </div>

    <div class="flex justify-end mt-auto">
      <div class="rounded bg-green-500 transition hover:bg-green-600 text-white w-48 py-2 pt-2.5 flex items-center justify-center gap-2 cursor-pointer" @click="save">
        <i class="fal fa-cog"></i>
        <div class="">Create container</div>
      </div>
    </div>
  </div>
</template>
