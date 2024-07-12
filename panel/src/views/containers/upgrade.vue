<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
import { upgradeContainer, getContainer } from '@/api/containers';
import { getImages } from '@/api/images';

const { notify }  = useNotification()
const router = useRouter()
const route = useRoute()

const id = route.params.id;

const manifest = ref('')
const image = ref('')
const images = ref(null)
getImages((res) => { images.value = res.data; }, (err) => { console.log(err) })

getContainer(id, (res) => { manifest.value = res.data.Config.Labels.crm_manifest;  image.value = res.data.Config.Labels.crm_image; }, (err) => { console.log(err); })

const versions = computed(() => {
  if (image.value === '' || !images.value) { return [] }
  const img = image.value;
  return images.value.filter(x => x.Name === img).map(x => { return x.Versions })[0]
})

const tag = ref('')
const set_tag = function(id) { tag.value = id }

const save = function() {
  if (name.value === '' || tag.value === '' || manifest.value === '') { notify({type: 'error', text: 'must provide name and tag' }); return false }
  const data = {
    name: name.value,
    tag: tag.value,
    manifest: manifest.value,
  }
  upgradeContainer(id, data, (res) => { notify({text: 'container upgraded'}); router.push({ name: 'containers' }) }, (err) => { notify({type: 'error', text: err.response.data.message }) })
}
</script>

<template>
  <div class="container border rounded p-4 mx-auto h-full overflow-y-auto flex flex-col gap-4">

    <div class="flex gap-4 items-center">
      <div class="w-32">Manifest</div>
      <div>{{ manifest }}</div>
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
        <div class="">Upgrade container</div>
      </div>
    </div>
  </div>
</template>
