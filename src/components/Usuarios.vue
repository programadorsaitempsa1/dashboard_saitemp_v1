<template>
  <div>
    <div class="container">
      <h2>Administrar Usuarios</h2>
      <button type="button" id="newUser" class="col-xs-12 col-md-2 btn btn-success" @click="nuevoUsuario()">
        <i class="bi bi-file-earmark-plus"></i> Insertar usuario
      </button>
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
    <div class="table-responsive">
      <table class="table align-middle table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo electrónico</th>
            <th scope="col">estado</th>
            <th scope="col">Rol</th>
            <th colspan="2" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.nombres }} {{ item.apellidos }}</td>
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
export default {
  components: {
    PiePagina
  },
  data() {
    return {
      users: [],
      roles: [],
      result:[],
      URL_API: process.env.VUE_APP_URL_API,
      roluserlogued: "",
      actualiced: false,
      cantidad: 10,
    };
  },
  created() {
    this.getUsers();
    this.userLogued();
  },
  methods: {
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
          console.log(element.name);
          rolasignado = element.name;
        }
      });
      return rolasignado;
    },
    getUsers() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/users/"+self.cantidad, config)
        .then(function (result) {
          self.users = result.data.data;
          self.result = result;
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
    showAlert(mensaje, icono) {
      this.$swal({
        position: "top",
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    configHeader() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      return config;
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
</style>