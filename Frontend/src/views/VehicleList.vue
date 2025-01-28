<template>
  <div class="vehicle-page">
    <nav class="navbar">
      <div class="logo" @click="goToLogin">
        <img src="@/assets/logo-nav.png" alt="RotaLocadora" class="logo-nav" />
      </div>

      <ul class="nav-links">
        <button class="button-vehicles" @click="goToVehicles">Veículos</button>
        <button class="button-history" @click="goToHistory">Histórico de Atividades</button>
      </ul>

      <div class="user-info" @click.stop="toggleUserMenu">
        <span>Olá</span>
        <span>{{ userName }}</span>
        <img src="@/assets/user-avatar.png" alt="Avatar" />
        <div v-if="showUserMenu" class="user-menu">
          <button class="logout-btn" @click="logout">Sair</button>
        </div>
      </div>
    </nav>

    <div class="filters">
      <button
        class="add-vehicle-btn"
        @click="openCreateModal"
      >
        Cadastrar Veículo
      </button>

      <div class="filter-options">
        <div class="filter-item brand-filter" style="position: relative;">
  <label class="filter-label">Marca</label>
  <div
    class="multi-select"
    @click.stop="toggleBrandDropdown = !toggleBrandDropdown"
  >
    <span v-if="selectedBrands.length === 0">Selecione a marca do veículo</span>
    <span v-else>{{ brandLabel }}</span>
    <i class="fa fa-chevron-down" />
  </div>
  <div v-if="toggleBrandDropdown" class="multi-select-dropdown">
    <div
      v-for="brand in brandOptions"
      :key="brand"
      class="multi-select-option"
    >
      <input
        :id="`brand-${brand}`"
        v-model="selectedBrands"
        type="checkbox"
        :value="brand"
      />
      <label :for="`brand-${brand}`">{{ brand }}</label>
    </div>
  </div>
</div>



        <div class="filter-item usage-filter">
          <label class="filter-label">Propriedade de uso</label>
          <select
            v-model="filters.usage"
            class="dropdown"
          >
            <option value="">
              Selecione o propósito de uso
            </option>
            <option value="Uso pessoal">
              Uso pessoal
            </option>
            <option value="Veículo para locação">
              Veículo para locação
            </option>
            <option value="Uso da empresa">
              Uso da empresa
            </option>
          </select>
        </div>

        <div class="filter-item plate-filter">
          <label class="filter-label">Placa</label>
          <input
            v-model="filters.plate"
            type="text"
            class="input"
            placeholder="Digite a placa do veículo"
          >
        </div>

        <!-- Botões de ação -->
        <div class="filter-actions">
          <button
            class="icon-button"
            @click="searchVehicles"
          >
            <i class="fa fa-search" />
          </button>
          <button
            class="icon-button"
            @click="clearFilters"
          >
            <i class="fa fa-eraser" />
          </button>
          <button
            class="icon-button"
            @click="toggleSideFilter"
          >
            <i class="fa fa-bars" />
          </button>
        </div>
      </div>
    </div>

    <table class="vehicle-table">
      <thead>
        <tr>
          <th>Placa</th>
          <th>Marca/Modelo</th>
          <th>Ano</th>
          <th>Cor</th>
          <th>Propriedade de uso</th>
          <th>Zero-quilômetro?</th>
          <th>Nível de conforto</th>
          <th>Local de reposição (lat, long)</th>
          <th /> 
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(vehicle, index) in filteredVehicles"
          :key="vehicle.id"
        >
          <td>{{ vehicle.plate }}</td>
          <td>{{ vehicle.brand }} {{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td>{{ vehicle.color }}</td>
          <td>{{ vehicle.usage }}</td>
          <td>{{ vehicle.isNew ? 'Sim' : 'Não' }}</td>
          <td>
            <span
              v-for="n in vehicle.comfortLevel"
              :key="n"
              class="star"
            >★</span>
          </td>
          <td>
  <span v-if="vehicle.latitude && vehicle.longitude">
    {{ vehicle.latitude }}, {{ vehicle.longitude }}
  </span>
  <span v-else>
    Não informado
  </span>
</td>
          <td class="actions-cell">
            <button
              class="three-dots-btn"
              @click.stop="toggleRowMenu(index)"
            >
              <i class="fa fa-ellipsis-v" />
            </button>
            <div
              v-if="rowMenuOpen === index"
              class="three-dots-menu"
            >
            <button @click="goToDetailsPage(vehicle.id)">Detalhes</button>


              <button @click="openEditModal(vehicle)">
                Editar
              </button>
              <button
                class="delete-btn"
                @click="deleteVehicle(vehicle)"
              >
                Deletar
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="filteredVehicles.length === 0">
          <td colspan="9">
            Nenhum veículo encontrado.
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        v-for="p in totalPages"
        :key="p"
        @click="goToPage(p)"
      >
        {{ p }}
      </button>
    </div>

    <div
      v-if="showCreateModal"
      class="modal-overlay"
    >
      <div class="modal">
        <div class="modal-header">
          <h2>Cadastro de Veículo</h2>
          <button
            class="close-btn"
            @click="showCreateModal = false"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
  <form @submit.prevent="createVehicle">
    <div class="form-group">
      <label>Placa</label>
      <input v-model="newVehicle.plate" type="text" placeholder="Digite a placa..." required />
    </div>
    <div class="form-group">
      <label>Marca</label>
      
      <select v-model="newVehicle.brand" required>
        <option value="">Selecione a marca</option>
        <option v-for="b in brandOptions" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>Modelo</label>
      <input v-model="newVehicle.model" type="text" placeholder="Digite o modelo..." required />
    </div>
    <div class="form-group">
      <label>Ano</label>
      <select v-model="newVehicle.year" required>
        <option v-for="year in yearList" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>Cor</label>
      <input v-model="newVehicle.color" type="text" placeholder="Ex: Preto, Vermelho..." required />
    </div>
    <div class="form-group">
      <label>Propriedade de uso</label>
      <select v-model="newVehicle.usage" required>
        <option value="">Selecione</option>
        <option value="Uso pessoal">Uso pessoal</option>
        <option value="Veículo para locação">Veículo para locação</option>
        <option value="Uso da empresa">Uso da empresa</option>
      </select>
    </div>

    <div class="form-group">
      <label>Latitude</label>
      <input v-model="newVehicle.latitude" type="text" placeholder="Ex: -23.5" required />
    </div>
    <div class="form-group">
      <label>Longitude</label>
      <input v-model="newVehicle.longitude" type="text" placeholder="Ex: -46.6" required />
    </div>

    <div class="stars-container">
      <label>Nível de conforto do veículo</label>
      <div>
        <span
          v-for="n in 5"
          :key="n"
          :class="getStarClassCreate(n)"
          @mouseover="hoverCreateStar(n)"
          @mouseleave="hoverCreateStar(0)"
          @click="selectCreateStar(n)"
        >
          ★
        </span>
      </div>
    </div>

    <div class="form-group" style="grid-column: span 2;">
      <label>
        <input v-model="newVehicle.isNew" type="checkbox" />
        Veículo zero-quilômetro
      </label>
    </div>

    <button type="submit" class="save-button">Salvar</button>
  </form>
</div>

      </div>
    </div>

    <div
      v-if="showEditModal"
      class="modal-overlay"
    >
      <div class="modal">
        <div class="modal-header">
          <h2>Edição de Veículo</h2>
          <button
            class="close-btn"
            @click="showEditModal = false"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateVehicle">
            <div class="form-group">
              <label>Placa</label>
              <input
                v-model="editVehicle.plate"
                type="text"
                disabled
              >
            </div>
            <div class="form-group">
              <label>Marca</label>
              <select
                v-model="editVehicle.brand"
                required
              >
                <option value="">
                  Selecione a marca
                </option>
                <option
                  v-for="b in brandOptions"
                  :key="b"
                  :value="b"
                >
                  {{ b }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Modelo</label>
              <input
                v-model="editVehicle.model"
                type="text"
                required
              >
            </div>
            <div class="form-group">
              <label>Ano</label>
              <select
                v-model="editVehicle.year"
                required
              >
                <option
                  v-for="year in yearList"
                  :key="year"
                  :value="year"
                >
                  {{ year }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Cor</label>
              <input
                v-model="editVehicle.color"
                type="text"
                required
              >
            </div>
            <div class="form-group">
              <label>Propriedade de uso</label>
              <select
                v-model="editVehicle.usage"
                required
              >
                <option value="">
                  Selecione
                </option>
                <option value="Uso pessoal">
                  Uso pessoal
                </option>
                <option value="Veículo para locação">
                  Veículo para locação
                </option>
                <option value="Uso da empresa">
                  Uso da empresa
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Latitude</label>
              <input
                v-model="editVehicle.latitude"
                type="text"
                required
              >
            </div>
            <div class="form-group">
              <label>Longitude</label>
              <input
                v-model="editVehicle.longitude"
                type="text"
                required
              >
            </div>

            <div class="form-group">
              <label>Nível de conforto do veículo</label>
              <div class="stars-container">
                <span
                  v-for="n in 5"
                  :key="n"
                  :class="getStarClassEdit(n)"
                  @mouseover="hoverEditStar(n)"
                  @mouseleave="hoverEditStar(0)"
                  @click="selectEditStar(n)"
                >
                  ★
                </span>
              </div>
            </div>

            <div class="form-group">
              <label>
                <input
                  v-model="editVehicle.isNew"
                  type="checkbox"
                >
                Veículo zero-quilômetro
              </label>
            </div>
            <button
              type="submit"
              class="save-button"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>

    <DetailsModal
  v-if="showDetailsModal"
  :details-vehicle="detailsVehicle"
  @close="showDetailsModal = false"
/>


  </div>
</template>

<script>
import api from "@/services/api";
import L from "leaflet";




export default {
    name: "VehicleList",
    data() {
    return {
      userName: "",
      showUserMenu: false,

      vehicles: [],
      selectedBrands: [],
      toggleBrandDropdown: false,

      filters: {
        usage: "",
        plate: ""
      },

      rowMenuOpen: -1,

      showCreateModal: false,
      showEditModal: false,
      showDetailsModal: false,

      hoverCreateStarValue: 0,
      hoverEditStarValue: 0,

      newVehicle: {
        plate: "",
        brand: "",
        model: "",
        year: 2024,
        color: "",
        usage: "",
        latitude: "",
        longitude: "",
        isNew: false,
        comfortLevel: 1,
      },
      editVehicle: {
        id: null,
        plate: "",
        brand: "",
        model: "",
        year: 2024,
        color: "",
        usage: "",
        latitude: "",
        longitude: "",
        isNew: false,
        comfortLevel: 1,
      },
      detailsVehicle: {},

      page: 1,
      totalPages: [1,2,3], // Exemplo
    };
  },
  computed: {
    brandOptions() { return [
        "Ford",
        "Chevrolet",
        "Toyota",
        "Honda",
        "Nissan",
        "Jeep",
        "Hyundai",
        "BMW",
        "Mercedes-Benz",
        "Volkswagen",
        "Audi",
        "Fiat",
        "Renault",
        "Volvo",
        "Scania",
        "Iveco",
      ]
      
    },
    brandLabel() {
      if (this.selectedBrands.length === 0) return "";
      const [first, ...rest] = this.selectedBrands;
      if (rest.length === 0) return first;
      return `${first} (+${rest.length})`;

    },
    filteredVehicles() {
      let list = [...this.vehicles];
      if (this.selectedBrands.length > 0) {
        list = list.filter(v => this.selectedBrands.includes(v.brand));
      }
      if (this.filters.usage) {
        list = list.filter(v => v.usage === this.filters.usage);
      }
      if (this.filters.plate) {
        const s = this.filters.plate.toLowerCase();
        list = list.filter(v => v.plate.toLowerCase().includes(s));
      }
      return list;
    },
    yearList() {
      const arr = [];
      for (let y = 2025; y >= 1900; y--) {
        arr.push(y);
      }
      return arr;
    },
  },
  mounted() {
    // Obter o nome do usuário do localStorage
    this.userName = localStorage.getItem("userName") || "Usuário Anônimo";
    this.fetchVehicles();
  },
  methods: {

    
    goToLogin() {
      this.$router.push("/login");
    },
    goToVehicles() {
      this.$router.push("/vehicles");
    },
    goToHistory() {
      this.$router.push("/history");
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      this.$router.push("/login");
    },
    
    goToDetailsPage(id) {
    this.$router.push({ name: 'VehicleDetails', params: { id } });
  },
  




async fetchVehicles() {
  try {
    const response = await api.get("/vehicles");
    console.log("Dados recebidos da API:", response.data); // Adicione esta linha
    this.vehicles = response.data;
  } catch (error) {
    console.error("Erro ao carregar veículos", error);
  }
},

    searchVehicles() {
      this.page = 1;
    },
    clearFilters() {
      this.selectedBrands = [];
      this.filters.usage = "";
      this.filters.plate = "";
      this.page = 1;
    },
    toggleSideFilter() {},

    goToPage(p) {
      this.page = p;
    },

    toggleRowMenu(idx) {
      this.rowMenuOpen = (this.rowMenuOpen === idx) ? -1 : idx;
    },

    openCreateModal() {
      this.newVehicle = {
        plate: "",
        brand: "",
        model: "",
        year: 2024,
        color: "",
        usage: "",
        latitude: "",
        longitude: "",
        isNew: false,
        comfortLevel: 1,
      };
      this.hoverCreateStarValue = 0;
      this.showCreateModal = true;
    },
    hoverCreateStar(n) {
      this.hoverCreateStarValue = n;
    },
    getStarClassCreate(n) {
      if (this.hoverCreateStarValue >= n) return "star star-hover";
      if (this.newVehicle.comfortLevel >= n) return "star star-filled";
      return "star star-empty";
    },
    selectCreateStar(n) {
      this.newVehicle.comfortLevel = n;
    },

    async createVehicle() {
      try {
        await api.post("/vehicles", this.newVehicle);
        alert("Veículo cadastrado com sucesso!");
        this.showCreateModal = false;
        this.fetchVehicles();
      } catch (error) {
        alert("Erro ao cadastrar veículo.");
        console.error(error);
      }
    },

   async openEditModal(vehicle) {
      this.editVehicle = { ...vehicle };
      this.hoverEditStarValue = 0;
      this.showEditModal = true;
    },
    hoverEditStar(n) {
      this.hoverEditStarValue = n;
    },
    getStarClassEdit(n) {
      if (this.hoverEditStarValue >= n) return "star star-hover";
      if (this.editVehicle.comfortLevel >= n) return "star star-filled";
      return "star star-empty";
    },
    selectEditStar(n) {
      this.editVehicle.comfortLevel = n;
    },

    async updateVehicle() {
      try {
        
        const vehicleId = this.editVehicle.id;
        await api.put(`/vehicles/${vehicleId}`, {          plate: this.editVehicle.plate,
          brand: this.editVehicle.brand,
          model: this.editVehicle.model,
          year: this.editVehicle.year,
          color: this.editVehicle.color,
          usage: this.editVehicle.usage,
          latitude: this.editVehicle.latitude,
          longitude: this.editVehicle.longitude,
          isNew: this.editVehicle.isNew,
          comfortLevel: this.editVehicle.comfortLevel,
        });
        alert("Veículo editado com sucesso!");
        this.showEditModal = false;
        this.fetchVehicles();
      } catch (error) {
        alert("Erro ao editar veículo.");
        console.error(error);
      }
    },

    // MODAL DETALHES
    mounted() {
    if (this.detailsVehicle.latitude && this.detailsVehicle.longitude) {
      const map = L.map("detailsMap").setView([
        parseFloat(this.detailsVehicle.latitude),
        parseFloat(this.detailsVehicle.longitude),
      ], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      L.marker([
        parseFloat(this.detailsVehicle.latitude),
        parseFloat(this.detailsVehicle.longitude),
      ]).addTo(map);
    }
  },
  

  async deleteVehicle(vehicle) {
      if (!confirm(`Deseja deletar o veículo ${vehicle.plate}?`)) return;
      try {
        await api.delete(`/vehicles/${vehicle.id}`);
        this.fetchVehicles();
        alert("Veículo deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar veículo", error);
      }
    }

  }
};


</script>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-nav {
  width: 200px;
  cursor: pointer;


}
.nav-links {
  display: flex;
  gap: 0.8rem;
  list-style: none;
}
.navbar button {
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}
.navbar button:hover {
  
  background-color: #dfdfdf;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
}
.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-menu {
  position: absolute;
  top: 45px; right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.logout-btn {
  background: none;
  border: none;
  color: #f00;
  cursor: pointer;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.add-vehicle-btn {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.add-vehicle-btn:hover {
  background-color: #0056b3;
}
.filter-options {
  position: relative;
  display: flex;
  gap: 1rem;
}

.filter-item label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 4px;
}
.filter-item input,
.filter-item select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  background-color: #fff;
}
.multi-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}
.multi-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem; 
  background: #fff;
  min-width: 200px;
  font-size: 0.9rem; 
}

.multi-select-dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: 200px; 
}
.multi-select-dropdown label {
  font-size: 14px;
  color: #333;
}
.multi-select-option {
  display: flex;
  align-items: center;
  gap: 8px; /* espaço entre checkbox e texto */
}

.multi-select-option:hover {
  background: #f0f0f0;
  cursor: pointer;
}
.filter-actions {
  display: flex; gap: 0.5rem;
}
.multi-select-option label {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  
}
.multi-select-dropdown input[type="checkbox"] {
  cursor: pointer;
}
.icon-button {
  border: 1px solid #ddd; background: #fff;
  border-radius: 4px; padding: 0.4rem 0.6rem;
  cursor: pointer;
}
.icon-button:hover {
  background-color: #eaeaea;
}

.vehicle-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 14px;
}
.vehicle-table th {
  background-color: #ffffff;
  color: #007bff;
  text-align: left;
  padding: 10px;
}

.vehicle-table td {
  padding: 10px;
  border: 1px solid #ffffff;
}
.vehicle-table tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.00);
}

.vehicle-table tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.star {
  color: #007bff;
}
.actions-cell {
  text-align: center;
}
.three-dots-btn {
  border: none; background: none;
  cursor: pointer; font-size: 16px;
}
.three-dots-menu {
  position: absolute;
  right: 0;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px 0;
  min-width: 120px;
}
.three-dots-menu button {
  padding: 8px 15px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.three-dots-menu button:hover {
  background-color: #f8f9fa;
}
.delete-btn {
  color: #f00;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1rem;
}
.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  color: #007bff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.pagination button:hover {
  background-color: #e9ecef;
}
.pagination button.activePage {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background-color: #007bff;
  color: #fff;
  padding: 15px;
  border-radius: 8px 8px 0 0;
}

.modal-body form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #555;
}

.form-group input,
.form-group select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.form-group input::placeholder,
.form-group select::placeholder {
  color: #aaa;
}

.stars-container {
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.save-button {
  grid-column: 1 / 3;
  justify-self: center;
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #0056b3;
}

.stars-container {
  display: inline-flex;
  gap: 4px;
}
.star-hover {
  color: #66b2ff !important; /* cor no hover */
}
.star-filled {
  color: #007bff !important;
}
.star-empty {
  color: #ccc !important;
}

.modal.details-modal {
  width: 700px;
}
.details-info {
  margin-bottom: 1rem;
}
.leaflet-map {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.details-modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.details-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.details-modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.details-modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vehicle-info {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 6px;
}

.details-map {
  height: 400px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.star {
  color: #ffc107;
  margin-right: 2px;
  font-size: 1.2rem;
}
  details-modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.details-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.details-modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.details-modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vehicle-info {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 6px;
}

.details-map {
  height: 400px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.star {
  color: #ffc107;
  margin-right: 2px;
  font-size: 1.2rem;
}
</style>