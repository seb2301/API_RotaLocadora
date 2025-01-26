<template>
  <div class="history-container">
    <h1>Histórico de Atividades</h1>
    <table>
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Ação</th>
          <th>Detalhes</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in history" :key="item.id">
          <td>{{ item.user.name }}</td>
          <td>{{ item.action }}</td>
          <td>{{ item.details }}</td>
          <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
        </tr>
        <tr v-if="history.length === 0">
          <td colspan="4">Nenhum histórico encontrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "UserHistory",
  data() {
    return {
      history: [],
    };
  },
  methods: {
    async fetchHistory() {
      try {
        // Se baseURL = http://localhost:3000/api, use "/history"
        const response = await api.get("/history");
        this.history = response.data;
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        alert("Erro ao carregar o histórico. Tente novamente.");
      }
    },
  },
  mounted() {
    this.fetchHistory();
  },
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #007bff;
  color: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
