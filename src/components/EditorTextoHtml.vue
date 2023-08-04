<template>
    <div id="app">
        <vue-editor v-model="content"></vue-editor>
    </div>
</template>
  
<script>
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor
    },
    props: {
        enviar_correo: {}

    },

    data() {
        return {
            content: ""
        };
    },
    watch: {
        enviar_correo() {
            this.send()
        }
    },
    methods: {
        send() {
            this.$emit('valida_campos',this.content)
        },
    }

};
</script>
<style>
.prev {
    border: 1px solid rgb(207, 202, 202);
    padding: 20px;
}
</style>