<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <img src="@/assets/logo.png" alt="Logo RotaLocadora" class="register-logo" />
        <h2>Novo Cadastro</h2>
      </div>
      <form @submit.prevent="register">
        <div class="input-wrapper">
          <h3>Nome de usuário</h3>
          <input
            v-model="name"
            type="text"
            placeholder="Digite o nome de usuário"
            required
          />
        </div>

        <div class="input-wrapper date-container">
          <h4>Data de aniversário</h4>
          <input
            v-model="birthDate"
            type="text"
            placeholder="Selecione a data de aniversário"
            readonly
            @focus="showDatePicker = true"
          />
          <button
            type="button"
            class="date-toggle"
            @click="showDatePicker = !showDatePicker"
          >
            <i class="fa fa-chevron-down"></i>
          </button>
          <input
            ref="datePicker"
            v-if="showDatePicker"
            type="date"
            @change="handleDateChange"
          />
        </div>

        <div class="input-wrapper">
          <h5>E-mail</h5>
          <input
            v-model="email"
            type="email"
            placeholder="Digite o e-mail"
            required
          />
        </div>

        <div class="input-wrapper password-container">
          <h6>Senha</h6>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Digite a senha"
            required
          />
          <button type="button" class="toggle-password" @click="togglePassword">
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
          </button>
        </div>

        <button type="submit" class="register-button">Cadastrar</button>
      </form>
      <div class="register-footer">
        <router-link to="/" class="login-link">Fazer login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "UserRegister",
  data() {
    return {
      name: "",
      birthDate: "",
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
    handleDateChange(event) {
      this.birthDate = event.target.value; 
      this.showDatePicker = false; 
    },
    async register() {
    try {
      const response = await api.post("/auth/register", {
        name: this.name,
        birthDate: this.birthDate,
        email: this.email,
        password: this.password,
      });

      alert(`Usuário cadastrado com sucesso! ID do usuário: ${response.data.userId}`);
      this.$router.push("/");
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao registrar usuário.");
    }
  }
},
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("@/assets/login-background.png") no-repeat center center fixed;
  background-size: cover;
}

.register-box {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-header {
  margin-bottom: 1.5rem;
}

.register-logo {
  width: 50px;
  height: 50px;
}

h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
  font-weight: 600;
}

.input-wrapper h3,
.input-wrapper h4,
.input-wrapper h5,
.input-wrapper h6 {
  position: absolute;
  top: -7px; 
  left: 10px; 
  font-weight: 400;
  line-height: 14.06px;
  text-align: left;
  font-size: 0.8rem;
  color: #555;
  background-color: white; 
  padding: 0 5px;
  z-index: 2; 
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
}

.input-wrapper input {
  width: 95%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #a9a7a9;
}

.input-wrapper input::placeholder {
  color: #aaa;
  font-size: 0.85rem;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #007bff;
  background-color: white;
}

.date-container input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.date-container input::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 1rem;
  color: #aaa;
  cursor: pointer;
}

.date-toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
}

.date-toggle:hover {
  color: #007bff;
}

.password-container {
  position: relative;
}

.password-container input {
  padding-right: 2.5rem;
  width: 95%;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
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
}

.login-link:hover {
  text-decoration: underline;
}
</style>
