<script setup lang="ts">
import { ref } from 'vue'
// import { ipcRenderer } from 'electron';

// defineProps<{ msg: string }>()

const message = ref('')

async function getFolderStructure() {
  try {
    const dirStructure = await window.electronAPI.getDirectoryStructure('');

    message.value = dirStructure
    // ここで取得したデータをUIに表示など
  } catch (error) {
    console.error('フォルダ構造の取得に失敗しました', error);
  }
}
</script>

<template>
  <button @click="getFolderStructure">フォルダ構造を取得</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
