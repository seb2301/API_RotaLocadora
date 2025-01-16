<template>
    <div class="register-container">
      <h2>Registrar</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Nome" />
        <input v-model="email" type="email" placeholder="E-mail" />
        <input v-model="password" type="password" placeholder="Senha" />
        <input v-model="birthDate" type="date" />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        birthDate: '',
      };
    },
    methods: {
      async register() {
        try {
          await api.post('/auth/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            birthDate: this.birthDate,
          });
          alert('Usuário registrado!');
          this.$router.push('/');
        } catch {
          alert('Erro ao registrar');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  