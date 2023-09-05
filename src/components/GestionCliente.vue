<template>
   <div>
     <Estados :estados="estados" :titulo="titulo" @estado="estado"/>
   </div>
</template>
<script>
import Estados from './EstadosVue.vue'
export default {

   components: {
     Estados
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
        titulo:'Estados de cliente',
        estados: [
                { id: '1', nombre: 'Potencial', activo: '0' },
                { id: '2', nombre: 'Interesado', activo: '0' },
                { id: '3', nombre: 'Recibe oferta', activo: '0' },
                { id: '4', nombre: 'En gestión', activo: '0' },
                { id: '5', nombre: 'Perdido', activo: '0' },
                { id: '6', nombre: 'Cliente', activo: '0' },
                { id: '7', nombre: 'Fidelización', activo: '0' }
            ]
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     
   },
   methods: {
    estado(estado){
        console.log(estado)
    }
   }
};
</script>
<style lang='' scoped>
</style>