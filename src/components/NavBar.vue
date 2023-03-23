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
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          @click="collapese">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="
          collapse
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
      <div v-for="(item,index) in menu" :key="index">
        <!-- <div v-if="item.urlExterna == '1'">Hola</div> -->
        <router-link v-if="item.urlExterna == '0'" class="nav-link active" :to="item.url != '' ? '/'+item.url:'/navbar'">
          <i :class="item.icon"></i><span>{{ item.nombre == 'rol' ? 'Rol: ' + userlogued.rol : item.nombre }}</span>
        </router-link>
        <a v-else :href="item.url" target="_blank" rel="noopener noreferrer"
          style="color:white; text-decoration:none"><i :class="item.icon"></i> <span>{{ item.nombre }}</span></a>
        <hr>
      </div>
    </div>
    <!-- <FormularioSig/> -->
    <router-view :userlogued="userlogued" :menu="menu"/>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
// import FormularioSig from '../components/FormularioSig.vue'
export default {
  components: {
    name: 'Navbar',
    // FormularioSig
  },
  data() {
    return {
      username: "",
      collapse: false,
      expand: false,
      saludo: 'Bienvenido',
      ruta: '',
      menu: [],
      userlogued: {nombres:'',rol:''},
      logo: [],
      user_id: '',
      URL_API: process.env.VUE_APP_URL_API,
      autoriced:false
    };
  },
  created() {
    //   this.ruta = this.$route.name
    //   this.userId()
    //   this.getLogoPagina()
    this.userLogued()
  },
  methods: {
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
    actualizar() {
      this.$router.push({ name: "editarUsuario", params: { id: this.user_id } });
    },
    //   userId() {
    //     let tokenuser = localStorage.getItem("access_token");
    //     let fragmentToken = atob(tokenuser.split(".")[1]);
    //     var data = JSON.parse(fragmentToken);
    //     this.userid = data.sub
    //     this.userLogued(data.sub);
    //   },
    //   userLogued(id) {
    //     let self = this;
    //      let config = this.configHeader();
    //     axios
    //       .get(self.URL_API+'api/userlogued/'+ id,config)
    //       .then(function (result) {
    //         self.userlogued = result.data[0];
    //          localStorage.setItem('nombres',result.data[0].nombres)
    //          localStorage.setItem('apellidos',result.data[0].apellidos)
    //          localStorage.setItem('rol',result.data[0].rol)
    //          self.getMenu(self.userlogued.id)
    //       }).catch(function (error) {
    //         if (error.response.data == "Unauthorized."){
    //           self.$router.push("/");
    //           localStorage.removeItem("access_token");
    //         }
    //       });
    //   },
    userLogued() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + 'api/v1/userlogued', config)
        .then(function (result) {
          if(result.data[0] != undefined){
            self.userlogued = result.data[0];
            self.user_id = result.data[0].usuario_id;
            self.autoriced=true
            self. getMenu(self.userlogued.id)
          }else{
            self.$router.push("/");
          }
        }).catch(function () {
          self.$router.push("/");          
        });
    },
      getMenu(rol) {
        let self = this
         let config = this.configHeader();
        //  console.log(rol)
          axios
            .get(self.URL_API+'api/v1/menus/'+rol,config)
            .then(function (result) {
              self.menu = result.data  
              // console.log(result.data )          
            // }).catch(function (error) {
            // if(error.name == 'AxiosError')
            // self.getMenu(id)
          }).catch(function () {
            // if (error.response.data == "Unauthorized."){
            //   self.$router.push("/");
            //   self.localStorage.removeItem("access_token");
            // }
          });
      },
    //   getLogoPagina() {
    //     var self = this;
    //     axios
    //       .get(self.URL_API+"api/logopaginaactivo")
    //       .then(function (result) {
    //         self.logo = result.data[0];
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         self.getLogoPagina()
    //       });
    //   },
    configHeader() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      return config;
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
  bottom: 0;
  left: 0;
  z-index: 300;
  color: white;
  transition: width 1s;
  overflow-x: hidden;
  font-size: 1.2rem;
  padding: 10px;
  text-align: left;
  border-bottom-right-radius: 5px;
  box-shadow: 3px 3px 4px 2px rgba(26, 25, 25, 0.338);
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
  left: 15px;
}

.aside span {
  position: relative;
  margin-left: 40px;
  white-space: nowrap
}

.aside:hover {
  width: 240px;
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

@media screen and (max-width: 991px) {
  #logout {
    position: relative;
    right: 0px;
  }

  #contrasena {
    position: relative;
    right: 0px;

    /* right: 0px; */
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
</style>