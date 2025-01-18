<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/logo.png" alt="Logo RotaLocadora" class="login-logo" />
        <h2>Login</h2>
      </div>
      <form @submit.prevent="login">
      
        <div class="input-wrapper">
          <h6>E-mail</h6>
          <input v-model="email" type="email" placeholder="Digite seu e-mail" required />
        </div>

        <div class="input-wrapper password-container">
          <h6>Senha</h6>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Digite sua senha"
            required
          />
          <button type="button" class="toggle-password" @click="togglePassword">
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
          </button>
        </div>

        <button type="submit" class="login-button">Entrar</button>
      </form>
      <div class="login-footer">
        <router-link to="/register" class="register-link">Criar conta</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

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
    async login() {
      try {
        const response = await api.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/vehicles");
      } catch (error) {
        alert("Erro no login. Verifique suas credenciais.");
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
  height: 100vh;
  background: url("@/assets/login-background.png") no-repeat center center fixed;
  background-size: cover;
}

.login-box {
  background-color: white;
  border-radius: 30px;
  padding: 2rem;
  width: 400px;
  height: 380px;
  top: 344px;
  left: 720px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  }

.login-header {
  margin-bottom: 0.1rem;
  }

.login-logo {
  width: 50px;
  height: 50px;
}

h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 90%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
}

input:focus {
  outline: none;
  border-color: #007bff;
}

h6 {
width: 50px;
height: 10px;
margin: 0% 0% -1% 0%;
top: 0px;
left: 8px;
padding: 0px 3px 0px 3px;
gap: 1px;
opacity: 0px;
background-color: white;
}
.input-wrapper {
  position: relative; 
  width: 100%;
  margin: 0; 
}

.input-wrapper h6 {
  position: absolute;
  top: -7px; 
  left: 10px; 
  font-weight: 400;
  line-height: 14.06px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  font-size: 0.8rem;
  color: #555; 
  background-color: white; 
  padding: 0 5px; 
  z-index: 2; 
}

.input-wrapper input {
  display: flex; 
  justify-content: center; 
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #A9A7A9;

  
  
}

.input-wrapper input:focus {
  outline: none;
  border-color: #007bff;
}
.password-container {
  position: relative;
}

.password-container input {
  width: 100%;
}

.toggle-password {
  position: absolute;
  left: 95%;
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
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-footer {
  margin-top: 1rem;
}

.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
