<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div class="modal-content">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </header>
      <main class="modal-body">
        <!-- Qualquer conteúdo que o pai inserir vai aqui -->
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
    title: String
  },
  methods: {
    closeModal() {
      // Emite para o pai que fechou:
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
  
  
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
    max-width: 800px;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  