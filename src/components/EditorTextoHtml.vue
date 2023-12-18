<template>
    <div>
        <vue-editor v-model="content" :editor-toolbar="showToolbar ? toolbarOptions : []"></vue-editor>
    </div>
</template>
  
<script>
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor
    },
    props: {
        enviar_correo: {},
        index: {
            type: Number,
            default: null,
        },
        showToolbar: {
            type: Boolean,
            default: false
        },
        consulta: {
            type: String,
            default: ''
        },

    },

    data() {
        return {
            content: "",
            toolbarOptions: [[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],],
        };
    },
    watch: {
        enviar_correo() {
            this.send()
        },
        content() {
            this.retornoTexto()
        },
        consulta() {
            this.content = this.consulta
        },
    },
    created() {
        this.content = this.consulta
    },
    methods: {
        send() {
            this.$emit('valida_campos', this.content)
        },
        retornoTexto() {
            if (this.index != null) {
                this.$emit('retornoTexto', this.index, this.content)
            }
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