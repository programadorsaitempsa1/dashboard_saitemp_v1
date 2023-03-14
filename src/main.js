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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
