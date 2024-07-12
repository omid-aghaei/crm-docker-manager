<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
import { getManifest, putManifest } from '@/api/manifests';
import { getImages } from '@/api/images';

const { notify }  = useNotification()
const router = useRouter()
const route = useRoute()
const id = route.params.id

const images = ref(null)
getImages((res) => { images.value = res.data }, (err) => { console.log(err) })

const name = ref('')
const image = ref('')
const tag = ref('')
const restart = ref('')
const retry = ref(0)
const timeout = ref(0)
const network = ref('')
const set_network = function(name) { network.value = name }

const envs = ref([])
const env_add = function() { envs.value.push({ name: '', value: '' }) }
const env_remove = function(id) { envs.value.splice(id, 1) }

const labels = ref([])
const label_add = function() { labels.value.push({ name: '', value: '' }) }
const label_remove = function(id) { labels.value.splice(id, 1) }

const ports = ref([])
const port_add = function() { ports.value.push({ name: '', value: '', type: 'tcp' }) }
const port_remove = function(id) { ports.value.splice(id, 1) }

const binds = ref([])
const bind_add = function() { binds.value.push({ name: '', value: '' }) }
const bind_remove = function(id) { binds.value.splice(id, 1) }

getManifest(id, (res) => {
  const title = res.data.title
  const structure = JSON.parse(res.data.structure)
  name.value = title
  image.value = structure.image
  tag.value = structure.tag
  restart.value = structure.restart
  retry.value = structure.retry
  timeout.value = structure.timeout
  network.value = structure.network
  envs.value = structure.envs
  labels.value = structure.labels
  ports.value = structure.ports
  binds.value = structure.binds
}, (err) => { notify({type: 'error', text: err.response.data.message }) })

const save = function() {
  const title = name.value
  const structure = {
    image: image.value,
    tag: tag.value,
    restart: restart.value,
    retry: retry.value,
    timeout: timeout.value,
    network: network.value,
    envs: envs.value,
    labels: labels.value,
    ports: ports.value,
    ports: ports.value,
    binds: binds.value,
  }
  const data = {
    title: title,
    structure: JSON.stringify(structure)
  }
  putManifest(id, data, (res) => { notify({text: 'manifest edited'}); router.push({ name: 'manifests' }) }, (err) => { notify({type: 'error', text: err.response.data.message }) })
}
</script>

<template>
  <div class="container border rounded p-4 mx-auto h-full overflow-y-auto flex flex-col gap-4">

    <div class="grid grid-cols-2 gap-8">
      <div class="flex flex-col gap-8">

        <div class="flex gap-4 items-center">
          <div class="w-32">Id</div>
          <div><input v-model="id" type="text" class="border rounded w-96 bg-gray-100 p-1 cursor-not-allowed" disabled readonly></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Name</div>
          <div><input v-model="name" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Base Image</div>
          <div>
            <select v-model="image" class="p-1 border rounded w-96 bg-gray-100">
              <option v-for="img in images" :key="img.Name" :value="img.Name">{{img.Name}}</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Default tag</div>
          <div><input v-model="tag" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Restart Policy</div>
          <div>
            <select v-model="restart" class="p-1 border rounded w-96 bg-gray-100">
              <option value=""></option>
              <option value="no">no</option>
              <option value="always">always</option>
              <option value="unless-stopped">unless-stopped</option>
              <option value="on-failure">on-failure</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Network</div>
          <div><input v-model="network" type="text" class="border rounded w-48 bg-gray-100 p-1"></div>
          <div class="flex gap-3">
            <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="set_network('bridge')">bridge</div>
            <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="set_network('host')">host</div>
            <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="set_network('none')">none</div>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">MaximumRetryCount</div>
          <div><input v-model="retry" type="number" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">StopTimeout</div>
          <div><input v-model="timeout" type="number" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4">
          <div class="w-32 pt-2 h-8">Labels</div>
          <div class="flex flex-col gap-4 w-96">
            <div class="flex gap-4 w-96" v-for="(label, labelI) in labels" :key="labelI">
              <div><input type="text" v-model="label.name" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div><input type="text" v-model="label.value" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div class="border rounded flex items-center px-2 bg-gray-100 cursor-pointer" @click="label_remove(labelI)"><i class="fal fa-trash"></i></div>
            </div>
          </div>
          <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="label_add"><i class="fal fa-circle-plus"></i></div>
        </div>

      </div>
      <div class="flex flex-col gap-8">

        <div class="flex gap-4 min-h-32">
          <div class="w-32 pt-2 h-8">Envs</div>
          <div class="flex flex-col gap-4 w-96">
            <div class="flex gap-4 w-96" v-for="(env, envI) in envs" :key="envI">
              <div><input type="text" v-model="env.name" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div><input type="text" v-model="env.value" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div class="border rounded flex items-center px-2 bg-gray-100 cursor-pointer" @click="env_remove(envI)"><i class="fal fa-trash"></i></div>
            </div>
          </div>
          <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="env_add"><i class="fal fa-circle-plus"></i></div>
        </div>

        <div class="flex gap-4 min-h-32">
          <div class="w-32 pt-2 h-8">Port mapping</div>
          <div class="flex flex-col gap-4 w-96">
            <div class="flex gap-4 w-96" v-for="(port, portI) in ports" :key="portI">
              <div><input type="number" v-model="port.name" class="border rounded w-24 bg-gray-100 p-1"></div>
              <div>
                <select v-model="port.type" class="p-1 border rounded w-20 bg-gray-100">
                  <option value="tcp">tcp</option>
                  <option value="udp">udp</option>
                </select>
              </div>
              <div class="pt-2 w-4 text-center">:</div>
              <div><input type="number" v-model="port.value" class="border rounded w-24 bg-gray-100 p-1"></div>
              <div class="border rounded flex items-center px-2 bg-gray-100 cursor-pointer" @click="port_remove(portI)"><i class="fal fa-trash"></i></div>
            </div>
          </div>
          <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="port_add"><i class="fal fa-circle-plus"></i></div>
        </div>

        <div class="flex gap-4">
          <div class="w-32 pt-2 h-8">Volume binds</div>
          <div class="flex flex-col gap-4 w-96">
            <div class="flex gap-4 w-96" v-for="(bind, bindI) in binds" :key="bindI">
              <div><input type="text" v-model="bind.name" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div><input type="text" v-model="bind.value" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div class="border rounded flex items-center px-2 bg-gray-100 cursor-pointer" @click="bind_remove(bindI)"><i class="fal fa-trash"></i></div>
            </div>
          </div>
          <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="bind_add"><i class="fal fa-circle-plus"></i></div>
        </div>

      </div>
    </div>

    <div class="flex justify-end mt-auto">
      <div class="rounded bg-green-500 transition hover:bg-green-600 text-white w-32 py-2 flex items-center justify-center gap-2 cursor-pointer" @click="save">
        <i class="fal fa-circle-plus"></i>
        <div class="pt-1">Save</div>
      </div>
    </div>

  </div>
</template>
