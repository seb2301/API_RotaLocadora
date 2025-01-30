<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img
          src="@/assets/logo.png"
          alt="Logo RotaLocadora"
          class="login-logo"
        >
        <h2>Login</h2>
      </div>
      <form @submit.prevent="loginUser">
        <div class="input-wrapper">
          <h6>E-mail</h6>
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
          class="login-button"
        >
          Entrar
        </button>
      </form>
      <div class="login-footer">
        <router-link
          to="/register"
          class="register-link"
        >
          Criar conta
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api, { setAuthToken } from "@/services/api";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async loginUser() {
      try {
        console.log("Tentando fazer login...");
        const response = await api.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        console.log("Resposta do login:", response.data);

        const { token } = response.data;
        if (!token) {
          throw new Error("Token não recebido do servidor.");
        }

        setAuthToken(token);
        localStorage.setItem("token", token);

        console.log("Login bem-sucedido. Token armazenado.");
        this.$router.push("/vehicles");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Verifique seu e-mail e senha.");
      }
    },
  },
};
</script>

<style scoped>
/* Fundo e centralização */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("@/assets/login-background.png") no-repeat center center fixed;
  background-size: cover;
}

/* Caixa do login */
.login-box {
  width: 480px;
  /* Remova a altura fixa se quiser permitir "auto" */
  /* height: 460px; */

  background-color: #fff;
  border-radius: 30px; /* ou 30px 0 0 0, se for só no canto sup. esquerdo */
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  text-align: center;
  position: relative; /* caso precise posicionar elementos absolutos dentro */
}

/* Logo e título */
.login-header {
  margin-bottom: 1rem;
}

.login-logo {
  width: 80px; /* Ajuste para seu layout */
  height: 70px;
  display: block;
  margin: 0 auto;
}

.login-header h2 {
  margin-top: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
}

/* Formulário */
form {
  display: flex;
  flex-direction: column;
  align-items: center; /* inputs e botão centralizados */
  gap: 1.2rem;         /* espaçamento vertical */
  margin-top: 1rem;
}

/* Container do input */
.input-wrapper {
  width: 75%;   /* define largura dos inputs */
  position: relative;
  margin-right: 7px;
  margin-left: -7px;
  
}

/* Label flutuante */
.input-wrapper h6 {
  position: absolute;
  top: -38px;    /* ajustado para “cortar” a borda de cima do input */
  left: 16px;   /* afasta da esquerda */
  background-color: #fff;

  padding: 0 6px;
  font-size: 0.85rem;
  color: #333;
  z-index: 2;   /* acima do input */
}

/* Input em si */
.input-wrapper input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  padding: 0.8rem;
  color: #000;
}

.input-wrapper input::placeholder {
  color: #ccc;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #007bff;
}

/* Campo senha + ícone olho */
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
  color: #999;
}

.toggle-password:hover i {
  color: #007bff;
}

/* Botão Entrar */
.login-button {
  width: 80%;  /* mesma largura dos inputs */
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

/* “Criar conta” */
.login-footer {
  margin-top: 1rem;
}

.register-link {
  color: #555; /* ou #A9A7A9, caso queira mais claro */
  text-decoration: none;
  font-size: 0.9rem;
}

.register-link:hover {
  text-decoration: underline;
  color: #007bff;
}
</style>
