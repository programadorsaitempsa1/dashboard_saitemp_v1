<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/logo1.png" alt="" />
    </div>
    <h2>Iniciar sesión</h2>
    <div class="card">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Usuario</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="prueba" v-model="email" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <i class="fa fa-search"></i>
          <input :type="!contraseña ? 'password' : 'text'" class="form-control" id="exampleInputPassword1"
            v-model="password" />
          <svg xmlns="http://www.w3.org/2000/svg" class="input-icon password" viewBox="0 0 20 20" fill="currentColor"
            @click="contraseña = !contraseña">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <button class="btn btn-success" @click="login()">
          Ingresar
        </button>
      </form>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';

export default ({
  mixins:[Token, Alerts],
  data() {
    return {
      email: "",
      password: "",
      URL_API: process.env.VUE_APP_URL_API,
      contraseña: false
    }
  },
  created(){
    this.urlExterna()
  },
  methods: {
    login() {
      let self = this;
      let username = { email: this.email, password: this.password };
      axios
        .post(self.URL_API + "api/v1/login", username)
        .then(function (result) {
          if (result.data.access_token != undefined) {
            localStorage.setItem("access_token", result.data.access_token);
            self.$router.push("/navbar/estadistica");
          }
           else if (result.data.status == "error") {
            self.showAlert(result.data.message,result.data.status);
          }
        })
        .catch(function (error) {
          console.log(error)
          self.showAlert(error.status, error.message);
        });
    },
  }
})
</script>
<style scoped>
.card {
  width: 35%;
  height: 290px;
  margin: auto;
  padding: 20px;
  background-color: rgba(239, 237, 237, 0.642);
  min-width: 350px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
  float: left;
}

.form-control {
  background-color: white;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

button {
  width: 100%;
}

.logo {
  width: 150px;
  margin: auto;
  border-radius: 15px;
  margin-top: 50px;
}

.logo img {
  width: 100%;
  border-radius: 15px;
}

#emailHelp {
  color: red;
}

.input-icon {
  color: #191919;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.input-icon.password {
  left: unset;
  right: 40px;
  top: unset;
  bottom: 110px;
  cursor: pointer;
}
</style>
