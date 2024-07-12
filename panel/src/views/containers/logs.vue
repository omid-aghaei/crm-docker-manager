<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import { getContainerLogs } from '@/api/containers'
import { useRoute } from 'vue-router';

const route = useRoute()
const container_id = route.params.id
const info = ref(null)
const getData = function() { getContainerLogs(container_id, (res) => { info.value = res.data }, (err) => { console.log(err) }) }
getData();

const emitter = inject('emitter')
onMounted(() => {
  emitter.emit('show_timer');
  emitter.emit('set_timer', 5);
  emitter.emit('start_timer');
})
emitter.on('timer_signal', () => { getData(); emitter.emit('start_timer') })
onBeforeUnmount(() => { emitter.emit('hide_timer'); emitter.off('timer_signal'); })
</script>

<template>
  <div class="container border rounded p-2 mx-auto h-full overflow-y-auto flex flex-col gap-2">

    <pre class="leading-relaxed"><span v-html="info"></span></pre>

  </div>
</template>
