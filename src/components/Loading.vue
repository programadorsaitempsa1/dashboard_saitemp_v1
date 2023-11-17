<template>
    <div v-if="loading" class="loading">
        <div class="loader" id="loader">Loading...</div>
    </div>
</template>
<script>
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {
        loading:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {

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
.loading {
    background-color: rgba(252, 252, 252, 0.63);
    position: fixed;
    width: 100%;
    height: 1000px;
    /* top: 0%; */
    left: 0%;
    z-index: 200;
}

.loader {
    font-size: 15px;
    margin: 20% auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
    z-index: 500;
}


@-webkit-keyframes load4 {

    0%,
    100% {
        box-shadow: 0em -3em 0em 0.2em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 0em #006b3f;
    }

    12.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 0.2em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    25% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 0.2em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    37.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 0.2em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    50% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 0.2em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    62.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 0.2em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    75% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0.2em #006b3f, -2em -2em 0 0em #006b3f;
    }

    87.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 0.2em #006b3f;
    }
}

@keyframes load4 {

    0%,
    100% {
        box-shadow: 0em -3em 0em 0.2em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 0em #006b3f;
    }

    12.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 0.2em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    25% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 0.2em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    37.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 0.2em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    50% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 0.2em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    62.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 0.2em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    75% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0.2em #006b3f, -2em -2em 0 0em #006b3f;
    }

    87.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 0.2em #006b3f;
    }

}

</style>