<template>
  <div v-if="autoriced">
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #006b3f; heigth: 100px">
      <div class="container-fluid">
        <a class="navbar-brand" href="">
          <!-- <img
              v-bind:src="URL_API + logo.imagen"
              :alt="logo.titulo"
              :width="logo.ancho"
              class="d-inline-block align-text-top"
            /> -->
          <img src="@/assets/logo2.png" width="60px" class="d-inline-block align-text-top" alt="">
          <!-- Acá va el nombre-->
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="collapese">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="collapse
          ? 'collapse navbar-collapse show'
          : 'collapse navbar-collapse'
          " id="navbarNav">
          <ul class="navbar-nav">
            <!-- <li id="menucolapsed" class="nav-item" @click="collapese">
              <router-link class="nav-link active" to="/noticias">Noticias</router-link>
            </li> -->
            <!-- <li id="menucolapsed" class="nav-item" @click="collapese">
              <router-link class="nav-link active" to="/destacadas">Noticias destacadas</router-link>
            </li> -->
            <li class="nav-item" @click="collapese">
              <router-link class="nav-link active" to="">{{ saludo }}
                {{ userlogued.nombres }}</router-link>
            </li>
            <li class="nav-item contrasena" id="menu-lateral" @click="ocultarMenu(), collapese()">
              <!-- <router-link class="nav-link active" to="/"> -->
              <i :class="menu_lateral ? 'bi bi-text-indent-right' : 'bi bi-text-indent-left'"></i> {{ menu_lateral ?
                'Ocultar menú lateral' : 'Mostrar menú lateral' }}
              <!-- </router-link> -->
            </li>
            <li class="nav-item contrasena" id="contrasena" @click="actualizar()">
              <!-- <router-link class="nav-link active" to="/"> -->
              <i class="bi bi-person-circle"></i> Editar usuario
              <!-- </router-link> -->
            </li>
            <!-- @click="logout" -->
            <li class="nav-item logout" id="logout" @click="logout">
              <!-- <router-link class="nav-link active" to="/"> -->
              <i class="bi bi-box-arrow-left"></i> Cerrar sesión
              <!-- </router-link> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <div v-bind:class="!expand ? 'aside' : 'aside2'"> -->
    <div class="aside">
      <!-- <div id="item-menu" v-for="(item, index) in menu" :key="index">
        <router-link v-if="item.urlExterna == '0'" class="nav-link active"
          :to="item.url != '' ? '/' + item.url : '/navbar'">
          <i :class="item.icon"></i><span>{{ item.nombre == 'rol' ? 'Rol: ' + userlogued.rol : item.nombre }}</span>
        </router-link>
        <a v-else :href="item.url" target="_blank" rel="noopener noreferrer" style="color:white; text-decoration:none"><i
            :class="item.icon"></i> <span>{{ item.nombre }}</span></a>
        <hr>
      </div> -->
      <div class="accordion-item" v-for="(item, index) in menu" :key="index">
        <h2 class="accordion-header" :id="'flush-heading' + option[index]">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#flush-collapse' + option[index]" aria-expanded="false"
            :aria-controls="'flush-collapse' + option[index]">
            <i :class="item.icon"></i><span>{{ item.categoria }}</span>
          </button>
        </h2>
        <div :id="'flush-collapse' + option[index]" class="accordion-collapse collapse"
          :aria-labelledby="'flush-heading' + option[index]" data-bs-parent="#accordionFlushExample">
          <div v-for="(item, index) in menu[index].opciones" :key="index" class="accordion-body">
            <router-link v-if="item.urlExterna == '0'" class="nav-link active"
              :to="item.powerbi != '' ? '/' + item.url + '/' + item.nombre : item.url != '' ? '/' + item.url : '/navbar'"
              :style="{ 'pointer-events': item.disabled ? 'none' : 'auto' }">
              <i :class="item.icon"></i><span>{{ item.nombre == 'rol' ? 'Rol: ' + userlogued.rol : item.nombre }}</span>
            </router-link>
            <a v-else :href="item.url" target="_blank" rel="noopener noreferrer" style="color:white; text-decoration:none"
              :style="{ 'pointer-events': item.disabled ? 'none' : 'auto' }">
              <i :class="item.icon"></i> <span>{{ item.nombre }}</span>
            </a>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <router-view :userlogued="userlogued" :menu="menu" @getMenu="getMenu" />
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { Token } from '../Mixins/Token'
export default {
  components: {
    name: 'Navbar',
  },
  mixins: [Token],
  data() {
    return {
      username: "",
      collapse: false,
      expand: false,
      saludo: 'Bienvenido',
      ruta: '',
      menu: [],
      userlogued: { nombres: '', rol: '' },
      logo: [],
      user_id: '',
      URL_API: process.env.VUE_APP_URL_API,
      autoriced: false,
      option: ['One', 'Two', 'Tree', 'Four', 'Five', 'six', 'Seven'],
      categoria_menu: [],
      menu_lateral: true,
    };
  },
  watch: {
  },
  created() {
    this.urlExterna()
    this.userLogued()
    this.validaRuta()

  },
  destroyed() {
    localStorage.removeItem("access_token");
  },
  methods: {
    validaRuta() { // valida si el usuario tiene acceso a la ruta o menú consultado
      var self = this
      var rutaAnterior = ''
      var regex = /\/navbar\/(.*)/;
      this.$watch(
        () => this.$route.path,
        (newPath, oldPath) => {
          var bandera = false
          this.menu.forEach(function (item) {
            item.opciones.forEach(function (item2) {
              if (newPath.includes(item2.url.split("/")[1])) {
                bandera = true
              }
            })
          })
          if (!bandera) {
            self.$router.push(oldPath.match(regex)[1]);
          }
          bandera = false
        }
      );
    },
    collapese() {
      this.collapse = !this.collapse;
    },
    logout() {
      this.$router.push({ name: "login" });
      localStorage.removeItem("access_token");
      // let config = this.configHeader();
      // let self = this
      // axios
      //   .post(self.URL_API+"api/v1/logout", config)
      //   .then(function (result) {
      //     localStorage.removeItem("access_token");
      //     self.$router.push({ name: "login"});
      //       console.log('error',result);
      //   }).catch(function (error) {
      //     if (error.response.data == "Unauthorized"){
      //     self.$router.push("login");
      //     localStorage.removeItem("access_token");
      //     }
      //   });
    },
    ocultarMenu() {
      var menu = document.getElementsByClassName('aside')[0];

      if (this.menu_lateral) {
        menu.style.display = 'none'; // Ocultar el menú
      } else {
        menu.style.display = 'block'; // Mostrar el menú
      }
      this.menu_lateral = !this.menu_lateral
      localStorage.setItem("menu_lateral", this.menu_lateral)
    },
    actualizar() {
      this.$router.push({ name: "editarUsuario", params: { id: this.user_id } });
    },
    userLogued() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + 'api/v1/userlogued', config)
        .then(function (result) {
          if (result.data[0] != undefined) {
            self.userlogued = result.data[0];
            self.user_id = result.data[0].usuario_id;
            self.autoriced = true
            self.getMenu()
          } else {
            self.$router.push("/");
          }
        }).catch(function () {
          self.$router.push("/");
        });
    },
    getMenu() {
      let self = this
      let config = this.configHeader();
      axios
        .get(self.URL_API + 'api/v1/categoriaMenu', config)
        .then(function (result) {
          self.menu = result.data
        }).catch(function () {
        });
    },
    asideExpand() {
      this.expand = !this.expand;
    },
  },
};
</script>
<style scoped>
.navbar {
  box-shadow: 3px 3px 4px 2px rgba(26, 25, 25, 0.338);
}

.navbar-brand {
  margin-left: 50px;
}

.aside {
  width: 50px;
  height: 100vh;
  background-color: #006b3f;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  color: white;
  transition: width 1s;
  overflow-x: hidden;
  font-size: 1rem;
  padding: 10px;
  text-align: left;
  border-bottom-right-radius: 5px;
  box-shadow: 3px 3px 4px 2px rgba(26, 25, 25, 0.338);
  pointer-events: auto;
}

.aside i {
  font-size: 1.2rem;
}

.aside:hover::-webkit-scrollbar-thumb {
  visibility: visible;
  transition: width 1s;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(37, 113, 163);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(37, 113, 163);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(37, 113, 163);
}

::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.aside i {
  position: absolute;
  left: 7px;
}


.aside .accordion-collapse i {
  position: absolute;
  left: 15px;
}

.aside .accordion-collapse {
  margin-top: 10px;
}

.aside .accordion-collapse .nav-link {
  padding: 10px;
}

.aside .accordion-body:hover {
  color: #000000;
  background-color: rgba(255, 255, 255, 0.808);
  border-radius: 5px;
  padding: 5px;
  transition: background-color 1s ease;
}

.accordion-item button.accordion-button {
  pointer-events: none;
}

.accordion-item:hover button.accordion-button {
  pointer-events: auto;
}


.aside span {
  position: relative;
  margin-left: 40px;
  white-space: nowrap
}

.aside:hover {
  width: 280px;
}

/* .aside2 {
    width: 300px;
    height: 1000px;
    background-color: rgb(190, 32, 24);
    position: absolute;
    z-index: 100;
    color: white;
    transition: width 1s;
  } */
/* .aside p:not(:hover) {
    font-size: 0px;
  }  */
.aside h1 i {
  cursor: pointer;
}


.aside #icon {
  margin-left: 10px;
}

#logout {
  position: absolute;
  right: 15px;
  color: white;
  padding: 5px;
  cursor: pointer;
}

#contrasena {
  position: absolute;
  right: 160px;
  color: white;
  padding: 5px;
  cursor: pointer;
}

#menu-lateral {
  position: absolute;
  right: 300px;
  color: white;
  padding: 5px;
  cursor: pointer;
  visibility: hidden;
}

@media screen and (max-width: 991px) {
  #logout {
    position: relative;
    right: 0px;
  }

  #contrasena {
    position: relative;
    right: 0px;
  }

  #menu-lateral {
    position: relative;
    right: 0px;
    visibility: visible;
  }

  /* #menucolapsed{
      display:block;
    } */
}

@media screen and (min-width: 991px) {
  .navbar #menucolapsed {
    display: none;
  }
}

/* #item-menu:hover{
  background-color: rgb(0, 0, 0);
  border-radius: 15px;
  color: #7be4b8;
  padding: 0;
} */

.accordion {
  background-color: #006b3f;
  outline: none;
}

.accordion-button {
  background-color: #006b3f;
  color: rgb(255, 255, 255);
  outline: none;
}

.accordion-item {
  background-color: #006b3f;
  color: rgb(255, 255, 255);
  outline: none;
}

/* .accordion-button:not(.collapsed) {
    background-color: transparent !important;
} */

.accordion-button:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>