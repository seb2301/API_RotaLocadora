<template>
    <div v-if="isVisible" class="modal-backdrop">
      <div class="modal-content">
        <header>
          <h2>{{ title }}</h2>
          <button class="close-btn" @click="$emit('close')">×</button>
        </header>
        <main>
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppModal',
    props: {
      isVisible: Boolean,
      title: String,
    }
  }
  </script>
  