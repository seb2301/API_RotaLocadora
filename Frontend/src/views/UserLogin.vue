<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        placeholder="E-mail"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
      >
      <button type="submit">
        Entrar
      </button>
    </form>
  </div>
</template>
  
  <script>
  import api from '../services/api';
  
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
          const response = await api.post('/auth/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/vehicles');
        } catch {
          alert('Erro no login');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  