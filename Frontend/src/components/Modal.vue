<template>
  <div
    v-if="isVisible"
    class="app-modal"
  >
    <div class="app-modal-content">
      <header class="app-modal-header">
        <h2>{{ title }}</h2>
        <button
          class="close-btn"
          @click="closeModal"
        >
          ×
        </button>
      </header>
      <main class="app-modal-body">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal', // Update the component name here
  props: {
    isVisible: Boolean,
    title: String,
  },
  methods: {
    // ...
  }
}
</script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  