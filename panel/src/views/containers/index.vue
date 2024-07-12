<script setup>
import { inject, onMounted, ref, onBeforeUnmount, computed } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { getContainers, startContainer, stopContainer, restartContainer, pauseContainer, resumeContainer, killContainer, deleteContainer } from '@/api/containers'

const { notify }  = useNotification()

const containers = ref(null)
const getData = function() {
  getContainers((res) => { containers.value = res.data }, (err) => { notify({type: 'error', text: err.response.data.message}) })
}
getData()

// const emitter = inject('emitter')
// onMounted(() => {
//   emitter.emit('show_timer');
//   emitter.emit('set_timer', 10);
//   emitter.emit('start_timer');
// })
// emitter.on('timer_signal', () => { getData(); emitter.emit('start_timer') })
// onBeforeUnmount(() => { emitter.emit('hide_timer'); emitter.off('timer_signal'); })

const doStart = function(id) { startContainer(id, () => {     getData(); notify({text: 'container started'}) },    (err) => { notify({type: 'error', text: err.response.data.message}) }) }
const doStop = function(id) { stopContainer(id, () => {       getData(); notify({text: 'container stoped'}) },     (err) => { notify({type: 'error', text: err.response.data.message}) }) }
const doRestart = function(id) { restartContainer(id, () => { getData(); notify({text: 'container restarted'}) },  (err) => { notify({type: 'error', text: err.response.data.message}) }) }
const doPause = function(id) { pauseContainer(id, () => {     getData(); notify({text: 'container paused'}) },     (err) => { notify({type: 'error', text: err.response.data.message}) }) }
const doResume = function(id) { resumeContainer(id, () => {   getData(); notify({text: 'container resumed'}) },    (err) => { notify({type: 'error', text: err.response.data.message}) }) }
const doKill = function(id) { killContainer(id, () => {       getData(); notify({text: 'container killed'}) },     (err) => { notify({type: 'error', text: err.response.data.message}) }) }
const doDelete = function(id) { deleteContainer(id, () => {   getData(); notify({text: 'container deleted'}) },    (err) => { notify({type: 'error', text: err.response.data.message}) }) }

const isActive = function(verb, state) {
  if (verb === 'restart' && state === 'created') return false
  if (verb === 'restart' && state === 'restarting') return false
  if (verb === 'restart' && state === 'running') return true
  if (verb === 'restart' && state === 'exited') return false
  if (verb === 'restart' && state === 'paused') return false
  if (verb === 'restart' && state === 'dead') return false

  if (verb === 'start' && state === 'created') return true
  if (verb === 'start' && state === 'restarting') return false
  if (verb === 'start' && state === 'running') return false
  if (verb === 'start' && state === 'exited') return true
  if (verb === 'start' && state === 'paused') return false
  if (verb === 'start' && state === 'dead') return false

  if (verb === 'stop' && state === 'created') return false
  if (verb === 'stop' && state === 'restarting') return true
  if (verb === 'stop' && state === 'running') return true
  if (verb === 'stop' && state === 'exited') return false
  if (verb === 'stop' && state === 'paused') return true
  if (verb === 'stop' && state === 'dead') return false

  if (verb === 'pause' && state === 'created') return false
  if (verb === 'pause' && state === 'restarting') return true
  if (verb === 'pause' && state === 'running') return true
  if (verb === 'pause' && state === 'exited') return false
  if (verb === 'pause' && state === 'paused') return false
  if (verb === 'pause' && state === 'dead') return false

  if (verb === 'resume' && state === 'created') return false
  if (verb === 'resume' && state === 'restarting') return false
  if (verb === 'resume' && state === 'running') return false
  if (verb === 'resume' && state === 'exited') return false
  if (verb === 'resume' && state === 'paused') return true
  if (verb === 'resume' && state === 'dead') return false

  if (verb === 'kill' && state === 'created') return false
  if (verb === 'kill' && state === 'restarting') return true
  if (verb === 'kill' && state === 'running') return true
  if (verb === 'kill' && state === 'exited') return false
  if (verb === 'kill' && state === 'paused') return true
  if (verb === 'kill' && state === 'dead') return false

  if (verb === 'delete' && state === 'created') return true
  if (verb === 'delete' && state === 'restarting') return true
  if (verb === 'delete' && state === 'running') return false
  if (verb === 'delete' && state === 'exited') return true
  if (verb === 'delete' && state === 'paused') return false
  if (verb === 'delete' && state === 'dead') return true
  return false
}

const prepare_labels = function(id) {
  const labels = containers.value[id].Labels
  if (Object.keys(labels).length === 0) { return 'No Tags' }
  let output = ''
  for (const [key, value] of Object.entries(labels)) {
    if (key.includes('crm_')) { output = output + key + ':' + value + '<br>' }
  }
  if (output === '') { return 'No CRM Tags' }
  return output
}

const prepare_network = function(id) {
  const NetworkMode = Object.keys(containers.value[id].NetworkSettings.Networks)[0];
  const ip = containers.value[id].NetworkSettings.Networks[NetworkMode].IPAddress;
  const gw = containers.value[id].NetworkSettings.Networks[NetworkMode].Gateway;
  return `Network: ${NetworkMode}<br>IP: ${ip}<br>GW: ${gw}`
}

const selected_containers = computed(() => {
  if (!containers.value || containers.value.length === 0) { return [] }
  return containers.value.filter(x => { return x.selected && x.selected === true })
})

const bulkStart = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doStart(element.Id) }) } }
const bulkStop = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doStop(element.Id) }) } }
const bulkRestart = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doRestart(element.Id) }) } }
const bulkPause = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doPause(element.Id) }) } }
const bulkResume = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doResume(element.Id) }) } }
const bulkKill = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doKill(element.Id) }) } }
const bulkDelete = function() { if(window.confirm('Are you sure !?')) { selected_containers.value.forEach(element => { doDelete(element.Id) }) } }

</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">

    <div class="flex items-center leading-none gap-5 p-2 border rounded bg-gray-400">
      <div class="pt-1">#</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">Name</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">Image</div>
      <div class="pt-1 w-48 text-ellipsis overflow-hidden whitespace-nowrap">State</div>
      <div class="pt-1 w-4 text-ellipsis overflow-hidden whitespace-nowrap">L</div>
      <div class="pt-1 w-4 text-ellipsis overflow-hidden whitespace-nowrap">N</div>
    </div>

    <div class="flex gap-8 rounded bg-black text-white px-2 py-4 font-bold" v-if="selected_containers.length > 1">
      <div class="grow">Bulk action on {{ selected_containers.length }} selected containers : </div>
      <div class="cursor-pointer" @click="bulkRestart"  v-tooltip="'Restart'" ><i class="fal fa-lg fa-circle-r"></i></div>
      <div class="cursor-pointer" @click="bulkStart"    v-tooltip="'Start'"   ><i class="fal fa-lg fa-circle-play"></i></div>
      <div class="cursor-pointer" @click="bulkStop"     v-tooltip="'Stop'"    ><i class="fal fa-lg fa-circle-stop"></i></div>
      <div class="cursor-pointer" @click="bulkPause"    v-tooltip="'Pause'"   ><i class="fal fa-lg fa-circle-pause"></i></div>
      <div class="cursor-pointer" @click="bulkResume"   v-tooltip="'Resume'"  ><i class="fal fa-lg fa-circle-play"></i></div>
      <div class="cursor-pointer" @click="bulkKill"     v-tooltip="'Kill'"    ><i class="fal fa-lg fa-circle-xmark"></i></div>
      <div class="cursor-pointer" @click="bulkDelete"   v-tooltip="'Delete'"  ><i class="fal fa-lg fa-circle-d"></i></div>
    </div>

    <div v-for="(container, index) in containers" :key="container.Id" class="flex items-center leading-none gap-5 p-2 border rounded bg-gray-50">
      <div class="pt-1"><input type="checkbox" name="selected" id="" v-model="container.selected"></div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">{{container.Names.join(', ')}}</div>
      <div class="pt-1 w-96 text-ellipsis overflow-hidden whitespace-nowrap">{{container.Image}}</div>
      <div class="pt-1 w-48 text-ellipsis overflow-hidden whitespace-nowrap">
        <i class="fa fa-circle fa-2xs text-sky-500" v-if="container.State === 'created'"></i>
        <i class="fa fa-circle fa-2xs text-red-500" v-if="container.State === 'restarting'"></i>
        <i class="fa fa-circle fa-2xs text-green-500" v-if="container.State === 'running'"></i>
        <i class="fa fa-circle fa-2xs text-gray-500" v-if="container.State === 'exited'"></i>
        <i class="fa fa-circle fa-2xs text-yellow-500" v-if="container.State === 'paused'"></i>
        <i class="fa fa-circle fa-2xs text-red-500" v-if="container.State === 'dead'"></i>
        {{container.State}} - {{container.Status}}
      </div>
      <div class="pt-1 w-4"><div v-tooltip="prepare_labels(index)"><i class="fal fa-tags"></i></div></div>
      <div class="pt-1 w-4"><div v-tooltip="prepare_network(index)"><i class="fal fa-network-wired"></i></div></div>
      <div class="pt-1 ml-auto flex gap-5">
        <router-link v-tooltip="'Upgrade'" :to="{ name: 'containerUpgrade', params: { id: container.Id } }" v-if="container?.Labels?.crm_manifest"><i class="fal fa-circle-up"></i></router-link>
        <div class="cursor-pointer" @click="doRestart(container.Id)"  v-tooltip="'Restart'"  v-if="isActive('restart', container.State)"  ><i class="fal fa-circle-r"></i></div>
        <div class="cursor-pointer" @click="doStart(container.Id)"    v-tooltip="'Start'"    v-if="isActive('start', container.State)"    ><i class="fal fa-circle-play"></i></div>
        <div class="cursor-pointer" @click="doStop(container.Id)"     v-tooltip="'Stop'"     v-if="isActive('stop', container.State)"     ><i class="fal fa-circle-stop"></i></div>
        <div class="cursor-pointer" @click="doPause(container.Id)"    v-tooltip="'Pause'"    v-if="isActive('pause', container.State)"    ><i class="fal fa-circle-pause"></i></div>
        <div class="cursor-pointer" @click="doResume(container.Id)"   v-tooltip="'Resume'"   v-if="isActive('resume', container.State)"   ><i class="fal fa-circle-play"></i></div>
        <div class="cursor-pointer" @click="doKill(container.Id)"     v-tooltip="'Kill'"     v-if="isActive('kill', container.State)"     ><i class="fal fa-circle-xmark"></i></div>
        <div class="cursor-pointer" @click="doDelete(container.Id)"   v-tooltip="'Delete'"   v-if="isActive('delete', container.State)"   ><i class="fal fa-circle-d"></i></div>
        <router-link v-tooltip="'Details'" :to="{ name: 'containerView', params: { id: container.Id } }"><i class="fal fa-circle-info"></i></router-link>
        <router-link v-tooltip="'Logs'" :to="{ name: 'containerLogs', params: { id: container.Id } }"><i class="fal fa-eye"></i></router-link>
        <router-link v-tooltip="'Stats'" :to="{ name: 'containerStats', params: { id: container.Id } }"><i class="fal fa-chart-line"></i></router-link>
      </div>
    </div>
  </div>
</template>
