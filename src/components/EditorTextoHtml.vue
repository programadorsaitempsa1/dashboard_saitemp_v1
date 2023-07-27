<template>
    <div id="app">
        <vue-editor v-model="content"></vue-editor>
        <h3>Previsualización del contenido</h3>
        <div v-html="content"></div>
    </div>
</template>
  
<script>
import { VueEditor } from "vue2-editor";


export default {
    components: {
        VueEditor
    },

    data() {
        return {
            content: ""
        };
    }
};
</script>
<style>

.prev{
    border: 1px solid rgb(207, 202, 202);
    padding: 20px;
}
</style>