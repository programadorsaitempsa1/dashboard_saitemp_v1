<template>
  <div>
    <div class="container">
      <h2>Administrar Usuarios</h2>
      <div class="row" style="width:80%; margin-bottom: 30px;">
        <div class="col-xs-4 col-md-6">
          <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Buscar usuario</label>
          <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
            placeholder="Escriba nombre o usuario" aria-describedby="emailHelp" v-model="usuario" />
        </div>
        <div class="col-xs-4 col-md-3">
          <button v-if="usuario != ''" type="button" style="margin-top: 35px;" @click="getUser(usuario)"
            class="btn btn-success btn-sm">
            Buscar
          </button>
        </div>
        <div class="col-xs-4 col-md-3">
          <button v-if="usuario != ''" type="button" style="margin-top: 35px;" @click="getUsers(), usuario = ''"
            class="btn btn-success btn-sm">
            Borrar búsqueda
          </button>
        </div>
      </div>
      <div class="row">
        <button type="button" id="newUser" class="col-xs-12 col-md-2 btn btn-success" @click="nuevoUsuario()">
          <i class="bi bi-file-earmark-plus"></i> Insertar usuario
        </button>
      </div>
      <div v-if="users.length > 0" class="row" style="clear: both; margin-bottom: 20px">
        <div class="col-xs-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Cantidad de registros a listar</label>
          <select class="form-select form-select-sm" @change="getUsers()" v-model="cantidad"
            aria-label="Default select example">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
      </div>
      <div v-if="spinner">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h5>Cargando por favor espere un momento.</h5>
      </div>
      <div v-else class="table-responsive">
        <table class="table align-middle table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Usuario</th>
              <th scope="col">estado</th>
              <th scope="col">Rol</th>
              <th colspan="2" scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in users" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.nombres }} {{ item.apellidos }}</td>
              <td>{{ item.usuario }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.estado }}</td>
              <td>{{ item.rol }}</td>
              <td>
                <button type="button" v-if="item.rol != 'S. Administrador'" class="btn btn-warning btn-sm"
                  @click="actualizar(item.id_user)">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button v-if="item.rol == 'S. Administrador' && roluserlogued == 'S. Administrador'" type="button"
                  class="btn btn-warning btn-sm" @click="actualizar(item.id_user)">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button v-if="item.rol != 'S. Administrador'" type="button" class="btn btn-danger btn-sm"
                  @click="messageDelete(item.id_user)">
                  <i class="bi bi-trash"></i>
                </button>
                <button v-if="item.rol == 'S. Administrador' && roluserlogued == 'S. Administrador'" type="button"
                  class="btn btn-danger btn-sm" @click="messageDelete(item.id_user)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PiePagina @response="response" :actualiced="actualiced" :cantidad="cantidad" :result="result" />
    </div>
  </div>
</template>
<script>

import axios from "axios";
import PiePagina from "./PiePagina.vue";
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';

export default {
  props: {
    menu: []
  },
  components: {
    PiePagina,
  },
  mixins: [Token, Alerts],
  data() {
    return {
      users: [],
      roles: [],
      result: [],
      URL_API: process.env.VUE_APP_URL_API,
      roluserlogued: "",
      actualiced: false,
      cantidad: 10,
      usuario:'',
      ruta: '',
      spinner:true,
      percentaje1: 80, // Valor inicial del porcentaje
      percentaje2: 30, // Valor inicial del porcentaje
      percentaje3: 45, // Valor inicial del porcentaje
      loading:false
    };
  },
  mounted() {
    this.ruta = this.$route.path.substring(1)
  },
  // watch: {
  //   ruta() {
  //     this.autorizado(this.menu)
  //   }
  // },
  created() {
    this.getUsers();
    this.userLogued();
  },
  methods: {
    // autorizado(menu) {
    //   let autoriced = ''
    //   autoriced = menu.filter(menus => menus.url === this.ruta);
    //   if (autoriced.length == 0) {
    //     this.$router.go(-1);
    //   }
    // },
    response(response) {
      this.users = response.data.data;
      this.links = response.data;
      this.currentUrl = response.data.currentUrl;
      this.siguiente = response.data.links.length;
      this.checks = []
    },
    rol(item) {
      var rolasignado = "";
      this.roles.forEach(function (element) {
        if (item == element.id) {
          rolasignado = element.name;
        }
      });
      return rolasignado;
    },
    getUsers() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/users/" + self.cantidad, config)
        .then(function (result) {
          self.users = result.data.data;
          self.result = result;
          self.spinner = false
        });
    },
    getUser() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/users/"+ self.usuario +'/'+ self.cantidad, config)
        .then(function (result) {
          self.users = result.data.data;
          self.result = result;
          self.spinner = false
        });
    },
    nuevoUsuario() {
      this.$router.push("/navbar/ingresarusuario");
    },
    messageDelete(id) {
      let self = this;
      this.$swal
        .fire({
          title: "Estas seguro de elimiar el resgistro?",
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.eliminar(id);
          }
        });
    },
    eliminar(id) {
      let self = this;
      let config = this.configHeader();
      axios
        .delete(self.URL_API + "api/v1/user/" + id, config)
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
          self.getUsers();
        });
    },
    actualizar(id) {
      this.$router.push({ name: "editarUsuario", params: { id: id } });
    },
    userLogued() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userlogued", config)
        .then(function (result) {
          self.roluserlogued = result.data[0].rol;
        }).catch(function (error) {
          if (error.response.data == "Unauthorized.") {
            self.$router.push("/");
            localStorage.removeItem("access_token");
          }
        });
    },
  },
};
</script>
<style scoped>
#newUser {
  float: left;
  margin: 0px 0px 30px 0px;
}

.container {
  animation: fadeIn;
  animation-duration: 2s;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

label {
  float: left;
}

/*spiner*/
.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 50px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgb(10, 10, 10);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(199, 195, 195) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* fin spinner*/


</style>