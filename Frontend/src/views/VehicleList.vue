<template>
  <div>
    <Navbar />
    <h2>Lista de Veículos</h2>
    <table>
      <thead>
        <tr>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ano</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="vehicle in vehicles"
          :key="vehicle.id"
        >
          <td>{{ vehicle.plate }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
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
        vehicles: [],
      };
    },
    async mounted() {
      const response = await api.get('/vehicles');
      this.vehicles = response.data;
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 0.5rem;
    border: 1px solid #ddd;
  }
  th {
    background: #007bff;
    color: white;
  }
  </style>
  