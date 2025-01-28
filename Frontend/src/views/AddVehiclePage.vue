<template>
  <div class="add-vehicle-page">
    <h2>Cadastrar Veículo</h2>
    <form @submit.prevent="submitVehicle">
      <div class="form-group">
        <label for="plate">Placa</label>
        <input
          id="plate"
          v-model="vehicle.plate"
          type="text"
          placeholder="Digite a placa do veículo"
          required
        >
      </div>
      <div class="form-group">
        <label for="brand">Marca</label>
        <input
          id="brand"
          v-model="vehicle.brand"
          type="text"
          placeholder="Digite a marca do veículo"
          required
        >
      </div>
      <div class="form-group">
        <label for="model">Modelo</label>
        <input
          id="model"
          v-model="vehicle.model"
          type="text"
          placeholder="Digite o modelo do veículo"
          required
        >
      </div>
      <div class="form-group">
        <label for="year">Ano</label>
        <input
          id="year"
          v-model="vehicle.year"
          type="number"
          placeholder="Digite o ano do veículo"
          required
        >
      </div>
      <div class="form-group">
        <label for="color">Cor</label>
        <input
          id="color"
          v-model="vehicle.color"
          type="text"
          placeholder="Digite a cor do veículo"
          required
        >
      </div>
      <div class="form-group">
        <label for="usage">Propriedade de Uso</label>
        <select
          id="usage"
          v-model="vehicle.usage"
          required
        >
          <option value="">
            Selecione
          </option>
          <option value="pessoal">
            Uso pessoal
          </option>
          <option value="locação">
            Veículo para locação
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="isNew">Zero-Quilômetro?</label>
        <input
          id="isNew"
          v-model="vehicle.isNew"
          type="checkbox"
        > Sim
      </div>
      <div class="form-group">
        <label for="comfortLevel">Nível de Conforto</label>
        <input
          id="comfortLevel"
          v-model="vehicle.comfortLevel"
          type="number"
          min="1"
          max="5"
          placeholder="Nível de conforto (1-5)"
          required
        >
      </div>
      <div class="form-group">
        <label for="location">Local de Reposição (lat, long)</label>
        <input
          id="location"
          v-model="vehicle.location"
          type="text"
          placeholder="Ex: -23.561684, -46.625378"
          required
        >
      </div>
      <button
        type="submit"
        class="submit-btn"
        @click="submitVehicle"
      >
        Cadastrar Veículo
      </button>
    </form>
  </div>
</template>
  
  <script>
  import api from "../services/api"; // Importa a instância do Axios configurada para o backend
  
  export default {
    data() {
      return {
        vehicle: {
          plate: "",
          brand: "",
          model: "",
          year: "",
          color: "",
          usage: "",
          isNew: false,
          comfortLevel: "",
          location: "",
        },
      };
    },
    methods: {
  async submitVehicle() {
    try {
      const response = await api.post("/vehicles", this.vehicle); 
      console.log("Veículo cadastrado com sucesso:", response.data);

      alert("Veículo cadastrado com sucesso!");

      this.$router.push("/vehicles");
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error.response || error.message);
      alert("Erro ao cadastrar o veículo. Verifique os dados e tente novamente.");
    }
  },
    }
  };

  </script>
  
  <style scoped>
  .add-vehicle-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: #007bff;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    width: 100%;
    font-weight: bold;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  </style>
  