<template>
   <div>
     <h2>Debida diligencia clientes</h2>
     <Tabla v-if="show_table" :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" />
   </div>
</template>
<script>
import Tabla from './Tabla.vue'
export default {
  
   components: {
     Tabla
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
       show_table:false,
       datos:[],
       tabla:[],
       endpoint:''
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     
   },
   methods: {
     
   }
};
</script>
<style scoped>
</style>