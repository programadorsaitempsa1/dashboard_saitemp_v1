<template>
    <!-- <div class="container"> -->
        <div id="crumbs">
            <h2>{{ titulo }}</h2>
            <ul>
                <li v-for="item, index in estados" :key="index">
                    <div :class="[item.activo == 1 ? 'b' : 'a']" @click="establecerEstado(item)"><i class="fa fa-home"
                            aria-hidden="true"></i>{{ item.nombre }}</div>
                </li>
            </ul>
        </div>
    <!-- </div> -->
</template>
<script>
export default {

    components: {

    },
    mixins: [],
    props: {
        estados: [],
        titulo: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            estado: '',

        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        establecerEstado(estado) {
            this.estados.forEach(function (item) {
                item.activo = '0'
                if (item.id == estado.id) {
                    item.activo = '1'
                }
                // if(item.activo == estado.activo){
                //     console.log('prueba',estado)
                //     item.activo = '0'
                // }
            })

            this.$emit('estado', estado)
        }
    }
};
</script>
<style scoped>
.container {
    margin-top: 30px
}

#crumbs {
    text-align: center;
}

#crumbs h2 {
    padding: 0 0 10px;
    /* text-transform: capitalize; */
    /* font-size: 0.9rem; */
    /* font-weight: 600; */
    /* letter-spacing: 0.01rem; */
    /* color: #8093a7; */
}

#crumbs ul {
    list-style: none;
    display: inline-table;
}

#crumbs ul li {
    display: inline;
    cursor: pointer;
}

#crumbs ul li .a {
    display: block;
    float: left;
    height: 90px;
    background: #f3f5fa;
    text-align: center;
    padding: 30px 10px 0 50px;
    position: relative;
    margin: 0 10px 0 0;
    font-size: 20px;
    text-decoration: none;
    color: #8093a7;
}

#crumbs ul li .a:after {
    content: "";
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid #f3f5fa;
    position: absolute;
    right: -40px;
    top: 0;
    z-index: 1;
}

#crumbs ul li .a:before {
    content: "";
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
}

#crumbs ul li:first-child .a {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

#crumbs ul li:first-child .a:before {
    display: none;
}

#crumbs ul li:last-child .a {
    padding-right: 40px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

#crumbs ul li:last-child .a:after {
    display: none;
}

#crumbs ul li .a:hover {
    background: #117A65;
    color: #fff;
}

#crumbs ul li .a:hover:after {
    border-left-color: #117A65;
    color: #fff;
}

/* ********************************** */
#crumbs ul li .b {
    display: block;
    float: left;
    height: 90px;
    background: #239B56;
    text-align: center;
    padding: 30px 10px 0 50px;
    position: relative;
    margin: 0 10px 0 0;
    font-size: 20px;
    text-decoration: none;
    color: #fff;
}

#crumbs ul li .b:after {
    content: "";
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid #239B56;
    position: absolute;
    right: -40px;
    top: 0;
    z-index: 1;
}

#crumbs ul li .b:before {
    content: "";
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
}

#crumbs ul li:first-child .b {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

#crumbs ul li:first-child .b:before {
    display: none;
}

#crumbs ul li:last-child .b {
    padding-right: 40px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

#crumbs ul li:last-child .b:after {
    display: none;
}

#crumbs ul li .b:hover {
    background: #117A65;
    color: #fff;
}

#crumbs ul li .b:hover:after {
    border-left-color: #117A65;
    color: #fff;
}
</style>