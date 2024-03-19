import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSignature from "vue-signature-pad";
import VueClipboard from 'vue-clipboard2'
import VueSweetalert2 from 'vue-sweetalert2';
import axios from 'axios'
import VueAxios from 'vue-axios'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
//encriptación
import VueCryptojs from 'vue-cryptojs'

Vue.use(VueCryptojs)

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);
Vue.use(VueClipboard)
Vue.use(VueSignature);
Vue.config.productionTip = false

import Echo from "laravel-echo"
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost:process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    // authEndpoint :'http://127.0.0.1:8000/api/broadcasting/auth',
    // auth:{
    //     headers: {
    //         Authorization: 'Bearer '+ localStorage.getItem ('access_token'), 
    //     }
    // },
 
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
