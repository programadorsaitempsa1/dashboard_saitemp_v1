<template>
    <div>
        <FormularioUsuario :titulo="titulo"/>
    </div>
</template>
<script>
import FormularioUsuario from '@/components/FormularioUsuario.vue';

export default {
    components: {
        FormularioUsuario
    },
    data() {
        return {
            titulo:'Registrar nuevo usuario'
        };
    },

    methods: {

    },
};
</script>
<style scoped>

</style>