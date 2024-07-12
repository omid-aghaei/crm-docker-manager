<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
import { postNetwork } from '@/api/networks';

const { notify }  = useNotification()
const router = useRouter()

const name = ref('sample_network')
const internaly = ref(false)
const attachable = ref(false)
const ingress = ref(false)
const ip = ref('172.20.10.0/24')
const subnet = ref('172.20.0.0/16')
const gateway = ref('172.20.10.11')
const drivers = ref(['bridge', 'host', 'ipvlan', 'none'])
const driver = ref('bridge')

const auxIps = ref([{ name: 'router', value: '172.20.10.0' }])
const auxIp_add = function() { auxIps.value.push({ name: '', value: '' }) }
const auxIp_remove = function(id) { auxIps.value.splice(id, 1) }

const save = function() {
  const aux = {}
  auxIps.value.forEach(x => { aux[x.name] = x.value })
  const structure = {
    Name: name.value,
    Internal: internaly.value,
    Attachable: attachable.value,
    Ingress: ingress.value,
    Driver: driver.value,
    IPAM: {
      Driver: 'default',
      Config: [
        {
          IPRange: ip.value,
          Subnet: subnet.value,
          Gateway: gateway.value,
          AuxiliaryAddresses: aux
        }
      ]
    }
  }
  postNetwork(structure, (res) => { notify({text: 'network created'}); router.push({ name: 'networks' }) }, (err) => { notify({type: 'error', text: err.response.data.message }) })
}
</script>

<template>
  <div class="container border rounded p-4 mx-auto h-full overflow-y-auto flex flex-col gap-8">

    <div class="grid grid-cols-2 gap-8">
      <div class="flex flex-col gap-8">

        <div class="flex gap-4 items-center">
          <div class="w-32">Name</div>
          <div><input v-model="name" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Driver</div>
          <div>
            <select v-model="driver" class="p-1 border rounded w-96 bg-gray-100">
              <option v-for="d in drivers" :key=d :value="d">{{d}}</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Internaly</div>
          <div>
            <select v-model="internaly" class="p-1 border rounded w-96 bg-gray-100">
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Attachable</div>
          <div>
            <select v-model="attachable" class="p-1 border rounded w-96 bg-gray-100">
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Ingress</div>
          <div>
            <select v-model="ingress" class="p-1 border rounded w-96 bg-gray-100">
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">IP Range</div>
          <div><input v-model="ip" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Subnet</div>
          <div><input v-model="subnet" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">Gateway</div>
          <div><input v-model="gateway" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>


      </div>
      <div class="flex flex-col gap-8">
        <div class="flex gap-4">
          <div class="w-32 pt-2 h-8">Exclude IPs</div>
          <div class="flex flex-col gap-4 w-96">
            <div class="flex gap-4 w-96" v-for="(auxIp, auxIpI) in auxIps" :key="auxIpI">
              <div><input type="text" v-model="auxIp.name" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div><input type="text" v-model="auxIp.value" class="border rounded w-40 bg-gray-100 p-1"></div>
              <div class="border rounded flex items-center px-2 bg-gray-100 cursor-pointer" @click="auxIp_remove(auxIpI)"><i class="fal fa-trash"></i></div>
            </div>
          </div>
          <div class="border rounded flex items-center px-2 h-7 bg-gray-100 cursor-pointer" @click="auxIp_add"><i class="fal fa-circle-plus"></i></div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-auto">
      <div class="rounded bg-green-500 transition hover:bg-green-600 text-white w-32 py-2 pt-2.5 flex items-center justify-center gap-2 cursor-pointer" @click="save">
        <i class="fal fa-circle-plus"></i>
        <div class="">Add</div>
      </div>
    </div>

  </div>
</template>
