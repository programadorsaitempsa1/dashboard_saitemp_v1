<template>
  <div id="container2">
    <div class="container">
      <h2>Administrar Usuarios</h2>
      <!-- <div class="row" id="container" style="float: left; clear: both; color: #d06519">
            <div class="col-xs-12 col-md-12">
                <h5 v-if="!sin_registros">
                    Mostrando {{ users.length }} de {{ result.data.total }} registros -
                    página {{ result.data.current_page }}
                </h5>
            </div>
        </div> -->
      <div v-if="users.length > 0" class="row" style="clear: both; margin-bottom: 20px">
        <div class="col-xs-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Cantidad de registros a listar</label>
          <select class="form-select form-select-sm" @change="getUsers()" v-model="cantidad"
            aria-label="Default select example">
            <option>20</option>
            <option v-if="result.data.total > 50">50</option>
            <option v-if="result.data.total > 100">100</option>
            <option v-if="result.data.total > 500">300</option>
            <option v-if="result.data.total > 1000">500</option>
          </select>
        </div>
      </div>
      <div class="row" style="clear: both; margin-bottom: 20px">
        <div class="col-xs-4 col-md-4">
          <button type="button" style="margin-top: 31px" @click="selectAll((select_all = !select_all))"
            class="btn btn-success btn-sm">
            Seleccionar todo
          </button>
        </div>
        <div v-if="check.length > 1" class="col-xs-4 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Asignar rol:</label>
          <select class="form-select form-select-sm" @change="rolId(rol_select)" v-model="rol_select"
            aria-label="Default select example">
            <option v-for="item, index in roles" :key="index">{{ item.nombre }}</option>
          </select>
        </div>
        <div v-if="check.length > 1 && rol_select != ''" class="col-xs-4 col-md-4">
          <button type="button" style="margin-top: 31px" @click="save()"
            class="btn btn-success btn-sm">
            Guardar usuarios
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table align-middle table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Seleccionar</th>
              <th scope="col">Nombre</th>
              <th scope="col">Usuario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in users" :key="index">
              <th scope="row">{{ index }}</th>
              <td>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" v-model="check" type="checkbox"
                    :value="item" />
                </div>
              </td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.usuario }}</td>
              <td>
                <button v-if="item.rol != 'S. Administrador'" type="button" class="btn btn-success btn-sm"
                  @click="messageDelete(item.id_user)">
                  <i class="bi bi-person-plus"></i> Guardar usuario
                </button>
                <button v-if="item.rol == 'S. Administrador' && roluserlogued == 'S. Administrador'" type="button"
                  class="btn btn-success btn-sm" @click="messageDelete(item.id_user)">
                  <i class="bi bi-person-plus"></i> Guardar usuario
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
import axios from 'axios';
import PiePagina from "./PiePagina.vue";
export default {
  components: {
    PiePagina
  },
  props: {

  },
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      users: [],
      actualiced: false,
      cantidad: 10,
      result: [],
      check: [],
      select_all: false,
      roles: [],
      rol_select: '',
      rolId_:'',
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
  },
  created() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    getUsers() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ldapusers/" + self.cantidad, config)
        .then(function (result) {
          self.users = result.data.data;
          self.result = result;
        });
    },
    getRoles() {
      let self = this;
      let config = this.configHeader();
      axios.get(self.URL_API + "api/v1/roleslista", config).then(function (result) {

        self.roles = result.data;

      });
    },
    response(response) {
      this.users = response.data.data;
      this.links = response.data;
      this.currentUrl = response.data.currentUrl;
      this.siguiente = response.data.links.length;
      this.checks = []
    },
    save(){
      let self = this;
      let config = this.configHeader();
      axios.post(self.URL_API + "api/v1/ldapusers",this.check, config).then(function (result) {

        // self.roles = result.data;
        console.log(result)

      });
    },
    selectAll() {
      let self = this;
      if (this.select_all) {
        document
          .querySelectorAll(".form-check input[type=checkbox]")
          .forEach(function (checkElement) {
            checkElement.checked = true;
          });
        self.users.forEach(function (item) {
          self.check.push(item);
        });
      }
      else {
        document
          .querySelectorAll(".form-check input[type=checkbox]")
          .forEach(function (checkElement) {
            checkElement.checked = false;
          });
        self.users.forEach(function (item) {
          self.check.pop(item);
        });
        this.check = []
      }
    },
    rolId(rol) {
            let self = this;
            var cont = 0;
            this.roles.forEach(function (element) {
                if (rol == element.nombre) {
                    self.rolId_ = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.rolId_ = "";
            }
        },
    configHeader() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      return config;
    },
  }
};
</script>
<style  scoped>
.container {
  animation: fadeIn;
  animation-duration: 2s;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

.table-responsive {
  clear: both;
}

label {
  float: left;
}

button {
  float: left;
  margin-bottom: 20px;
}

#scroll {
  color: white;
  background: #e67e22;
  font-size: 1.3rem;
}
</style>