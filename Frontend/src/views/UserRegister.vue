<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <img
          src="@/assets/logo.png"
          alt="Logo RotaLocadora"
          class="register-logo"
        >
        <h2>Novo Cadastro</h2>
      </div>
      <form @submit.prevent="registerUser">
        <div class="input-wrapper">
          <h3>Nome de usuário</h3>
          <input
            v-model="name"
            type="text"
            placeholder="Digite o nome de usuário"
            required
          >
        </div>

        <div class="input-wrapper date-container">
          <h4>Data de aniversário</h4>
          <input
            v-model="birth_date"
            type="text"
            placeholder="Selecione a data de aniversário"
            readonly
            @click="toggleDatePicker"
          >
          <button
            type="button"
            class="date-toggle"
            @click="toggleDatePicker"
          >
            <i class="fa fa-chevron-down" />
          </button>

          <div
            v-if="showDatePicker"
            class="custom-calendar"
          >
            <v-date-picker
              :mode="'single'"
              :model-value="birth_date ? new Date(birth_date) : null"
              :min-date="new Date(1900, 0, 1)"
              :max-date="new Date(2100, 11, 31)"
              @update:model-value="onDateSelected"
            />
          </div>
        </div>

        <div class="input-wrapper">
          <h5>E-mail</h5>
          <input
            v-model="email"
            type="email"
            placeholder="Digite o e-mail"
            required
          >
        </div>

        <div class="input-wrapper password-container">
          <h6>Senha</h6>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Digite a senha"
            required
          >
          <button
            type="button"
            class="toggle-password"
            @click="togglePassword"
          >
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" />
          </button>
        </div>

        <button
          type="submit"
          class="register-button"
        >
          Cadastrar
        </button>
      </form>
      <div class="register-footer">
        <router-link
          to="/"
          class="login-link"
        >
          Fazer login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { DatePicker } from "v-calendar";

export default {
  name: "UserRegister",
  components: {
    'v-date-picker': DatePicker,
  },
  data() {
    return {
      name: "",
      birth_date: "",
      email: "",
      password: "",
      showPassword: false,
      showDatePicker: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    onDateSelected(date) {
      if (date) {
        this.birth_date = date.toISOString().split('T')[0]; // Salva no formato 'YYYY-MM-DD'
      }
      this.showDatePicker = false;
    },
    async registerUser() {
      try {
        console.log("Tentando registrar usuário...");
        const response = await api.post("/auth/register", {
          name: this.name,
          birth_date: this.birth_date,
          email: this.email,
          password: this.password,
        });

        alert(`Usuário cadastrado com sucesso! ID do usuário: ${response.data.userId}`);
        console.log("Redirecionando para a página de login...");

        this.$router.push("/login");
      } catch (error) {
        console.error("Erro ao registrar usuário:", error.response?.data || error);
        alert(error.response?.data?.message || "Erro ao registrar usuário.");
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("@/assets/login-background.png") no-repeat center center fixed;
  background-size: cover;
}

.register-box {
  background-color: #fff;
  border-radius: 30px;
  padding: 2rem;
  width: 480px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.register-header {
  margin-bottom: 1.5rem;
}

.register-logo {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.register-header h2 {
  top: -60px;
  font-size: 0.8rem;
  margin: 0;
  font-weight: 600;
  color: #333;
  padding: 0 5px;
  z-index: 2;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.3rem;
  width: 100%;
}

.input-wrapper h3,
.input-wrapper h4,
.input-wrapper h5,
.input-wrapper h6 {
  position: absolute;
  top: -24px;
  left: 14px;
  font-weight: 400;
  font-size: 0.8rem;
  color: #555;
  background-color: #fff;
  padding: 0 5px;
  z-index: 2;
}

.input-wrapper input {
  width: 90%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #a9a7a9;
}

.input-wrapper input::placeholder {
  color: #aaa;
  font-size: 0.85rem;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #007bff;
}

.date-container {
  position: relative;
}

.date-toggle {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  color: #a9a7a9;
  cursor: pointer;
}

.date-toggle:hover {
  color: #007bff;
}

.custom-calendar {
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

:deep(.vc-pane) {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 250px;
  font-family: 'Roboto', sans-serif;
}

:deep(.vc-nav-container) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

:deep(.vc-nav-title) {
  color: #007bff;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1rem;
}

:deep(.vc-arrows) {
  display: flex;
  gap: 0.5rem;
}

:deep(.vc-arrows button) {
  background: none;
  border: none;
  color: #007bff;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

:deep(.vc-arrows button:hover) {
  background-color: #f0f0f0;
}

:deep(.vc-weeks) {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

:deep(.vc-weekday-header) {
  text-align: center;
  font-size: 0.8rem;
  color: #555;
  font-weight: 600;
}

:deep(.vc-day) {
  text-align: center;
  padding: 0.6rem 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
}

:deep(.vc-day:hover) {
  background-color: #eaeaea;
}

:deep(.vc-day.vc-day--disabled),
:deep(.vc-day.vc-day--outside) {
  opacity: 0.5;
  cursor: default;
}

:deep(.vc-day.vc-day--selected) {
  background-color: #007bff;
  color: #fff;
}

:deep(.vc-day.vc-day--today) {
  border: 1px solid #007bff;
  color: #007bff;
  font-weight: 600;
}

@media (max-width: 400px) {
  :deep(.vc-pane) {
    min-width: 200px;
    padding: 0.5rem;
  }
}

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.toggle-password i {
  font-size: 1.2rem;
  color: #888;
}

.toggle-password:hover i {
  color: #007bff;
}

.register-button {
  background-color: #007bff;
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  font-weight: 600;
}

.register-button:hover {
  background-color: #0056b3;
}

.register-footer {
  margin-top: 1rem;
}

.login-link {
  color: #a9a7a9;
  text-decoration: none;
  font-size: 0.9rem;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
