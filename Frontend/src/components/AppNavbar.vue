<template>
  <nav class="navbar">
    <div class="navbar-container">
      <h1 class="navbar-logo">
        RotaLocadora
      </h1>
      <ul class="navbar-links">
        <li>
          <router-link to="/vehicles">
            Veículos
          </router-link>
        </li>
        <li>
          <router-link to="/history">
            Histórico
          </router-link>
        </li>
        <li @click="logout">
          Sair
        </li>
      </ul>
    </div>
  </nav>
</template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #007bff;
    color: white;
    padding: 1rem;
  }
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navbar-links {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  .navbar-links a {
    color: white;
    text-decoration: none;
  }
  .navbar-links li:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  </style>
  