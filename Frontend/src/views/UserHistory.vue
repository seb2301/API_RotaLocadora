<template>
  <div class="history-page">
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
      <div class="filter-options">
        <div class="filter-item plate-filter">
          <label class="filter-label">Placa</label>
          <input v-model="filterPlate" type="text" class="input" placeholder="Digite a placa..." />
        </div>
        <div class="filter-actions">
          <button class="icon-button" @click="searchHistory">
            <i class="fa fa-search"></i>
          </button>
          <button class="icon-button" @click="clearFilter">
            <i class="fa fa-eraser"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="history-list">
      <div
        v-for="item in paginatedHistory"
        :key="item.id"
        class="history-item"
      >
        <i :class="getIconClass(item.action)" :style="getIconStyle(item.action)"></i>
        <div class="history-details">
          <p>{{ item.details }}</p>
          <span>{{ formatDate(item.createdAt) }}</span>
        </div>
      </div>
      <p v-if="paginatedHistory.length === 0" class="no-history">Nenhum histórico encontrado.</p>
    </div>

    <div class="pagination">
      <button :disabled="page <= 1" @click="goToPage(page - 1)">&lt;</button>
      <button
        v-for="p in totalPages"
        :key="p"
        :class="{ activePage: p === page }"
        @click="goToPage(p)"
      >
        {{ p }}
      </button>
      <button :disabled="page >= totalPages" @click="goToPage(page + 1)">&gt;</button>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "UserHistory",
  data() {
    return {
      userName: "",
      showUserMenu: false,
      historyItems: [],
      filterPlate: "",
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    filteredHistory() {
      if (!this.filterPlate) {
        return this.historyItems;
      }
      const search = this.filterPlate.toLowerCase();
      return this.historyItems.filter((item) =>
        item.details.toLowerCase().includes(search)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredHistory.length / this.pageSize);
    },
    paginatedHistory() {
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredHistory.slice(start, end);
    },
  },
  mounted() {
    this.userName = localStorage.getItem("userName") || "Nome do Usuário";
    this.fetchHistory();
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToVehicles() {
      this.$router.push("/vehicles");
    },
    goToHistory() {},
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      this.$router.push("/login");
    },
    async fetchHistory() {
      try {
        const resp = await api.get("/history");
        this.historyItems = resp.data;
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    searchHistory() {
      this.page = 1;
    },
    clearFilter() {
      this.filterPlate = "";
      this.page = 1;
    },
    getIconClass(action) {
      if (/criou/i.test(action)) return "fa fa-plus-circle";
      if (/editou/i.test(action)) return "fa fa-pencil-square";
      if (/excluiu/i.test(action)) return "fa fa-trash";
      return "fa fa-info-circle";
    },
    getIconStyle(action) {
      if (/criou/i.test(action)) return { color: "green" };
      if (/editou/i.test(action)) return { color: "blue" };
      if (/excluiu/i.test(action)) return { color: "red" };
      return { color: "#333" };
    },
    goToPage(p) {
      if (p < 1 || p > this.totalPages) return;
      this.page = p;
    },
  },
};
</script>

<style scoped>
.history-page {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #f0f0f0;
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
  gap: 1.5rem;
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

.filters {
  padding: 1rem 2rem;
  background-color: #f9f9f9;
}

.filter-options {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.icon-button {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
}

.history-list {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.history-details {
  flex: 1;
}

.history-details p {
  margin: 0;
  font-weight: bold;
}

.history-details span {
  font-size: 0.85rem;
  color: #555;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}

.pagination .activePage {
  background-color: #007bff;
  color: #fff;
}
</style>
