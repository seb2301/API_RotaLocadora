<template>
  <div class="vehicle-page">
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/logo-nav.png" alt="RotaLocadora" class="logo-nav" />
      </div>
      <ul class="nav-links">
        <button class="button-vehicles"><router-link to="/vehicles">Veículos</router-link></button>
        <button class="button-history"><router-link to="/history">Histórico de Atividades</router-link></button>
      </ul>
      <div class="user-info">
        <span>Olá</span>
        <span>Maria Clara da Silva</span>
        <img src="@/assets/user-avatar.png" alt="Avatar" />
      </div>
    </nav>

    <div class="filters">
      <button class="add-vehicle-btn" @click="openModal">Cadastrar Veículo</button>      
      <div class="filter-options">
        <select v-model="filters.brand" class="dropdown">
          <option value="">Selecione uma marca de veículo</option>
          <option v-for="brand in brands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
        <select v-model="filters.usage" class="dropdown">
          <option value="">Propriedade de uso</option>
          <option value="pessoal">Uso pessoal</option>
          <option value="locação">Veículo para locação</option>
        </select>
        <input
          v-model="filters.plate"
          type="text"
          class="input"
          placeholder="Digite a placa do veículo"
        />
        <button class="filter-btn">
          <i class="fa fa-filter"></i>
        </button>
      </div>
    </div>

    <table class="vehicle-table">
      <thead>
        <tr>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ano</th>
          <th>Cor</th>
          <th>Propriedade de Uso</th>
          <th>Zero-Quilômetro?</th>
          <th>Nível de Conforto</th>
          <th>Local de Reposição (lat, long)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehicle, index) in vehicles" :key="index">
          <td>{{ vehicle.plate }}</td>
          <td>{{ vehicle.brand }}</td>  
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td>{{ vehicle.color }}</td>
          <td>{{ vehicle.usage }}</td>
          <td>{{ vehicle.isNew ? 'Sim' : 'Não' }}</td>
          <td>
            <span v-for="star in vehicle.comfortLevel" :key="star" class="star">
              ★
            </span>
          </td>
          <td>{{ vehicle.location }}</td>
        </tr>
        <tr v-if="vehicles.length === 0">
          <td colspan="4">Nenhum veículo encontrado.</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="goToPage(page)" v-for="page in totalPages" :key="page">
        {{ page }}
      </button>
    </div>

    <div v-if="showModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2>Cadastro de Veículo</h2>
      <button class="close-btn" @click="closeModal">×</button> <!-- Botão de fechar modal -->
    </div>
    <div class="modal-body">
      <form @submit.prevent="submitVehicle"> 
      
        <div class="form-group">
          <label>Placa</label>
          <input v-model="newVehicle.plate" type="text" placeholder="Placa" required />
        </div>
        <div class="form-group">
          <label>Marca</label>
          <select v-model="newVehicle.brand" required>
            <option value="">Selecione</option>
            <option v-for="brand in brands" :key="brand" :value="brand">
              {{ brand }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Modelo</label>
          <input v-model="newVehicle.model" type="text" placeholder="Modelo" required />
        </div>
        <div class="form-group">
          <label>Ano</label>
          <input v-model="newVehicle.year" type="number" placeholder="Ano" required />
        </div>
        <div class="form-group">
          <label>Cor</label>
          <input v-model="newVehicle.color" type="text" placeholder="Cor" required />
        </div>
        <div class="form-group">
          <label>Propriedade de Uso</label>
          <select v-model="newVehicle.usage" required>
            <option value="">Selecione</option>
            <option value="Uso pessoal">Uso pessoal</option>
            <option value="Veículo para locação">Veículo para locação</option>
          </select>
        </div>
        <div class="form-group">
          <label>Local de Reposição</label>
          <input v-model="newVehicle.location" type="text" placeholder="Local de Reposição" required />
        </div>
        <div class="form-group">
          <label>Nível de Conforto</label>
          <input v-model="newVehicle.comfortLevel" type="number" placeholder="Nível de Conforto" min="1" max="5" required />
        </div>
        <div class="form-group">
          <label>
            <input v-model="newVehicle.isNew" type="checkbox" />
            Veículo zero-quilômetro
          </label>
        </div>
        <button type="submit" class="save-button">Salvar</button> <!-- Botão de envio -->
        <button type="button" @click="closeModal">Fechar</button> <!-- Botão para fechar o modal -->
      </form>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "VehicleList",
  data() {
  return {
    vehicles: [],
    // Para o modal de cadastro:
    newVehicle: {
      plate: "",
      brand: "",
      model: "",
      year: 2000,
      color: "",
      usage: "",
      isNew: false,
      comfortLevel: 1,
      location: "",
    },
    // Lista de marcas (se quiser exibir no <option>):
    brands: ["Chevrolet", "Ford", "Fiat", "VW", "Honda"], 
    // Filtros (opcional; se não for usar, remova do template):
    filters: {
      brand: "",
      usage: "",
      plate: "",
    },
    showModal: false,
  };
},



  mounted() {
    this.fetchVehicles();
  },
  methods: {
    async fetchVehicles() {
      try {
        // Se baseURL = http://localhost:3000/api, então:
        const response = await api.get("/vehicles");
        console.log("Retorno da API /vehicles:", response.data);

        this.vehicles = response.data;
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
        alert("Erro ao carregar veículos.");
      }
    },
    openModal() {
      console.log("Abrindo modal...");
      this.showModal = true;
    },
    closeModal() {
      console.log("Modal sendo fechado...");
      this.showModal = false;
    },
    async submitVehicle() {
  try {
    console.log("Tentando cadastrar veículo...", this.newVehicle);

        await api.post("/vehicles", {
      plate: this.newVehicle.plate,
      brand: this.newVehicle.brand,
      model: this.newVehicle.model,
      year: this.newVehicle.year,
      color: this.newVehicle.color,
      usage: this.newVehicle.usage,
      isNew: this.newVehicle.isNew,
      comfortLevel: this.newVehicle.comfortLevel,
      location: this.newVehicle.location,
    });

     alert("Veículo cadastrado com sucesso!");
    this.closeModal();
    // Recarrega lista
    this.fetchVehicles();
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar o veículo. Verifique os dados e tente novamente.");
  }
},
  },
  
};
</script>




<style scoped>
.navbar {
  background-color: #f0f0f0;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-nav {
  width: 120px;
  height: auto;
  object-fit: contain;
  margin-right: 15px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.navbar button {
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navbar button:hover {
  background-color: #003c99;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nav-links li a {
  text-decoration: none;
}

.button-vehicle {
  background-color: #f6fbff1a;
  color: #007df0;
  width: Hug (87px)px;
  height: Hug (38px)px;
  padding: 12px 0px 0px 0px;
  gap: 10px;
  border-radius: 5px 0px 0px 0px;
  opacity: 0px;
}

.button-history {
  color: #1f1f1f;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f9f9f9;
}

.add-vehicle-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.filter-options {
  display: flex;
  gap: 1rem;
}

.dropdown,
.input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.vehicle-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.vehicle-table th,
.vehicle-table td {
  padding: 1rem;
  text-align: left;
  border: 1px solid #ddd;
}

.vehicle-table th {
  background-color: #007bff;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.save-btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}



</style>
