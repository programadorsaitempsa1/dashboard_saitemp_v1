<template>
    <div>
        <Loading :loading="loading" />
        <button type="submit" style="margin: 15px" @click="goScroll(900, 0, 'up')" id="scroll" class="btn">
            <i class="bi bi-chevron-double-up"></i>
        </button>
        <div class="content">
            <nav class="pagin" aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a :style="item.active == true
                            ? 'background-color:#d06519'
                            : 'background-color:#21618C'
                            " class="page-link" v-for="(item, index) in links" :key="index"
                            @click="pagination(item.url), currentUrl = item.url, goScroll(900, 0)">{{
                                index == 0
                                ? "Anterior"
                                : index == siguiente - 1
                                    ? "siguiente"
                                    : item.label
                            }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Loading from './Loading.vue';
import {Token} from '../Mixins/Token'
export default {
    mixins:[Token],
    props: {
        result: [],
        cantidad: {},
        actualiced: {}
    },
    components:{
        Loading
    },
    data() {
        return {
            siguiente: 0,
            currentUrl: "",
            ordenes_trabajo: [],
            links: [],
            loading:false
        };
    },
    watch: {
        result: function () {
            this.asignaValores()
        },
        actualiced: function () {
            this.pagination(this.currentUrl)
        },
    },

    methods: {
        asignaValores() {
            let self = this
            self.links = this.result.data.links;
            self.currentUrl = this.result.data.links[1].url;
            self.siguiente = this.result.data.links.length;
        },
        pagination(pag) {
            this.loading = true
            if (pag != null) {
                let self = this;
                let config = this.configHeader();
                axios.get(pag, config).then(function (result) {
                    self.links = result.data.links
                    self.ordenes_trabajo = result.data.data
                    self.responseOrdenTrabajo(result)
                    self.loading = false
                });
            }
        },
        goScroll(top, left, direction) {
            if (direction == 'down') {
                let container = document.getElementById("container");
                top = container.clientHeight
            }
            window.scroll({
                top: top,
                left: left,
                behavior: "smooth",
            });
        },
        responseOrdenTrabajo(result) {
            result.data.currentUrl = this.currentUrl
            this.$emit('response', result)
        },
    },
};
</script>
<style scoped>
.content {
    width: 90%;
}

.pagin {
    margin: auto;
}

.pagination .page-item {
    display: flex;
    cursor: pointer;
}

.content ul li a {
    color: white;
}

#scroll {
    color: white;
    background: #e67e22;
    font-size: 1.3rem;
}

</style>