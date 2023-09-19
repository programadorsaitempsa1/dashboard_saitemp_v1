// Mixin para retornar el token de usuario
export const Token = {
  data () {
    return {
     
    };
  },
  methods: {
    configHeader () {
      let config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem ('access_token'),
        },
      };
      return config;
    },
  },
  computed: {
   
  },
  created () {
 
  },
}; // MiMixin.js
