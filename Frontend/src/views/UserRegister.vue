<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <img src="@/assets/logo.png" alt="Logo RotaLocadora" class="register-logo" />
        <h2>Novo Cadastro</h2>
      </div>
      <form @submit.prevent="register">
        <!-- Nome de Usuário -->
        <div class="input-wrapper">
          <h3>Nome de usuário</h3>
          <input
            v-model="name"
            type="text"
            placeholder="Digite o nome de usuário"
            required
          />
        </div>

        <!-- Data de Aniversário -->
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

        <!-- E-mail -->
        <div class="input-wrapper">
          <h5>E-mail</h5>
          <input
            v-model="email"
            type="email"
            placeholder="Digite o e-mail"
            required
          />
        </div>

        <!-- Senha -->
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
      showDatePicker: false, // Controle para exibir o seletor de data
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleDateChange(event) {
      this.birthDate = event.target.value; // Atualiza o valor do input
      this.showDatePicker = false; // Fecha o seletor após escolher a data
    },
    async register() {
      try {
        await api.post("/auth/register", {
          name: this.name,
          birth_date: this.birthDate,
          email: this.email,
          password: this.password,
        });
        alert("Usuário registrado com sucesso!");
        this.$router.push("/");
      } catch (error) {
        alert("Erro ao registrar usuário. Tente novamente.");
      }
    },
  },
};
</script>

<style scoped>
/* Container principal */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("@/assets/login-background.png") no-repeat center center fixed;
  background-size: cover;
}

/* Caixa de registro */
.register-box {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Header */
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

/* Estilos de h3, h4, h5 e h6 */
.input-wrapper h3,
.input-wrapper h4,
.input-wrapper h5,
.input-wrapper h6 {
  position: absolute;
  top: -7px; /* Ajusta a posição acima do input */
  left: 10px; /* Ajusta o espaçamento da borda */
  font-weight: 400;
  line-height: 14.06px;
  text-align: left;
  font-size: 0.8rem;
  color: #555;
  background-color: white; /* Fundo branco para sobrepor o input */
  padding: 0 5px;
  z-index: 2; /* Garante que o texto esteja à frente */
}

/* Inputs */
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

/* Campo de Data de Aniversário */
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

/* Botão para a seta (ícone customizado) */
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

/* Campo de Senha com Ícone */
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

/* Botão de Cadastro */
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

/* Footer */
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
