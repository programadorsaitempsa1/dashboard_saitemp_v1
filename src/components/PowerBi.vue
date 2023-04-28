<template>
    <div class="container">
        <h2>Dashboard Power BI</h2>
        <iframe title="Report Section" width="100%" :height="screenHeight - 100" :src="url" frameborder="0"
            allowFullScreen="true"></iframe>
    </div>
</template>
<script>
export default {
    components: {

    },
    mixins: [],
    props: {
        menu: []
    },
    data() {
        return {
            screenHeight: window.innerHeight,
            url: '',
            ruta: ''

        }
    },
    computed: {

    },
    key: function () {
        return this.$route.fullPath;
    },
    watch: {
        ruta() {
            this.dashboard()
        },
        menu() {
            this.dashboard()
        },
        '$route.fullPath': function (newPath, oldPath) {
            if (newPath !== oldPath) {
                this.ruta = newPath.substring(1)
                this.dashboard()
            }
        }
    },
    mounted() {
        this.ruta = this.$route.fullPath.substring(1)
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
    created() {
        this.ruta = this.$route.fullPath.substring(1)
    },
    methods: {
        dashboard() {
            let self = this
            this.menu.forEach(function (item) {
                item.opciones.forEach(function (item2) {
                    if (item2.nombre == self.ruta.split('/')[2].replace('%20',' ')) {
                        self.url = item2.powerbi
                    }

                })
            })
        },
        handleResize() {
            const screenHeight = window.innerHeight
            this.screenHeight = screenHeight
            console.log(this.screenHeight)
        }
    }
};
</script>
<style scoped>
h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}

.container {
    min-width: 90%;
}
</style>