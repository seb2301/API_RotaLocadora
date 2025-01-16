<template>
  <div class="bg-cover bg-center h-screen flex items-center justify-center" style="background-image: url('@/assets/bg.jpg')">
    <div class="bg-white p-8 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" class="block w-full mb-4 p-2 border" />
        <input type="password" v-model="password" placeholder="Senha" class="block w-full mb-4 p-2 border" />
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', res.data.token);
        this.$router.push('/vehicles');
      } catch (err) {
        alert('Erro ao fazer login');
      }
    },
  },
};
</script>

<style>
.bg-cover {
  backdrop-filter: blur(8px);
}
</style>
