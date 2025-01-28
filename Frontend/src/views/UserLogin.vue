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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  background: url("@/assets/login-background.png") no-repeat center center fixed;
  background-size: cover;
}

.login-box {
  width: 380px;
  background-color: #fff;
  border-radius: 30px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-header {
  margin-bottom: 1rem;
}

.login-logo {
  width: 83px;
height: 70px;
top: 40px;
left: 199px;
gap: 0px;
opacity: 0px;

}

.login-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-wrapper {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.input-wrapper h6 {
  position: absolute;
  top: -9px;
  left: 14px;
  font-size: 0.8rem;
  font-weight: 400;
  color: #333333;
  background-color: white;
  padding: 0 5px;
  z-index: 2;
}

.input-wrapper input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  padding: 0.8rem;
  color: #A9A7A9;
}

.input-wrapper input::placeholder {
  color: #ccc;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #007bff;
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
  color: #A9A7A9;
}

.toggle-password:hover i {
  color: #007bff;
}

.login-button {
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-footer {
  margin-top: 1.2rem;
}

.register-link {
  color: #A9A7A9;
  text-decoration: none;
  font-size: 0.9rem;
}

.register-link:hover {
  text-decoration: underline;
  color: #007bff;
}
</style>
