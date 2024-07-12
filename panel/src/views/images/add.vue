<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
import { postImage } from '@/api/images';

const { notify }  = useNotification()
const router = useRouter()

const registry = ref('')
const username = ref('docker')
const password = ref('docker')
const email = ref('docker@test.com')
const image = ref('')
const tag = ref('')

const output = ref('')

const save = function() {
  const structure = {
    registry: registry.value,
    username: username.value,
    password: password.value,
    email: email.value,
    image: image.value,
    tag: tag.value,
  }
  postImage(structure, (res) => { output.value = res.data; notify({text: 'image created'}) }, (err) => { output.value = err.response.data.message; notify({type: 'error', text: err.response.data.message }) })
}
</script>

<template>
  <div class="container border rounded p-4 mx-auto h-full overflow-y-auto flex flex-col gap-8">

    <div class="grid grid-cols-2 gap-8">
      <div class="flex flex-col gap-8">
        <div class="flex gap-4 items-center">
          <div class="w-32">registry</div>
          <div><input v-model="registry" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">username</div>
          <div><input v-model="username" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">password</div>
          <div><input v-model="password" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">email</div>
          <div><input v-model="email" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">image</div>
          <div><input v-model="image" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>

        <div class="flex gap-4 items-center">
          <div class="w-32">tag</div>
          <div><input v-model="tag" type="text" class="border rounded w-96 bg-gray-100 p-1"></div>
        </div>
      </div>
      <div>
        <div class="w-full h-full border rounded max-h-96 overflow-y-auto p-4">
          <pre><span v-html="output"></span></pre>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-auto">
      <div class="rounded bg-green-500 transition hover:bg-green-600 text-white w-32 py-2 pt-2.5 flex items-center justify-center gap-2 cursor-pointer" @click="save">
        <i class="fal fa-circle-plus"></i>
        <div class="">Pull</div>
      </div>
    </div>

  </div>
</template>
