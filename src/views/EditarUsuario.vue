<template>
    <div>
        <FormularioUsuario :titulo="titulo" />
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
            titulo: 'Editar datos de usuario',
        };
    },

    methods: {

    },
};
</script>
<style scoped>

</style>