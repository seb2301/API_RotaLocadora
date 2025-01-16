<template>
  <div>
    <Navbar />
    <h2>Histórico de Atividades</h2>
    <table>
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Ação</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in history"
          :key="entry.id"
        >
          <td>{{ entry.user_id }}</td>
          <td>{{ entry.action }}</td>
          <td>{{ entry.details }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
  import Navbar from '../components/AppNavbar.vue';
  import api from '../services/api';
  
  export default {
    components: { Navbar },
    data() {
      return {
        history: [],
      };
    },
    async mounted() {
      const response = await api.get('/history');
      this.history = response.data;
    },
  };
  </script>
  