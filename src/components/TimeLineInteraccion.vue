<template>
    <div class="container">
        <h3>Historial de cambios</h3>
        <Loading :loading="loading" />
        <button class="btn btn-success" type="button" style="left: 0px;" @click="getHistorial"><i class="bi bi-arrow-clockwise"></i></button>
        <ul class="cbp_tmtimeline" v-if="historial.length > 0">
            <li v-for="item, index in historial" :key="index">
                <time class="cbp_tmtime"><span>{{ formatearFecha(item.updated_at) }}</span>
                    <span>{{ formatearHora(item.updated_at) }}</span></time>
                <div class="cbp_tmicon"><i class="bi bi-pencil-square"></i></div>
                <div class="cbp_tmlabel" style="text-align: left;">
                    <h6>Empresa cliente: {{ item.razon_social }}</h6>
                    <h6>Número radicado cliente: {{ item.numero_radicado }}</h6>
                    <h6>Asesor de servicio: {{ item.usuario }}</h6>
                    <h6>Proceso: {{ item.proceso }}</h6>
                    <h6>Interacción: {{ item.interaccion }}</h6>
                    <p>Observación: {{ item.observacion }}</p>
                </div>
            </li>
        </ul>
        <h4 v-else>Este registro no tiene historial de cambios.</h4>
    </div>
</template>
<script>
import axios from 'axios';
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
import Loading from './Loading.vue';
export default {

    components: {
        Loading,
    },
    mixins: [Alerts, Token],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            historial: [],
            loading: false,
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.getHistorial()
    },
    methods: {
        getHistorial() {
            let self = this;
            this.loading = true
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/interaccioncliente/" + this.$route.params.id, config)
                .then(function (result) {
                    self.historial = result.data
                    self.loading = false
                });
        },
        formatearFecha: function (fechaOriginal) {
            const fecha = new Date(fechaOriginal);
            const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return fecha.toLocaleDateString('es-ES', opcionesFecha);
        },
        formatearHora: function (fechaOriginal) {
            const fecha = new Date(fechaOriginal);
            const opcionesHora = { hour: '2-digit', minute: '2-digit' };
            return fecha.toLocaleTimeString('en-US', opcionesHora);
        }
    }
};
</script>
<style scoped>
h3 {
    margin: 30px auto;
}

/* @font-face {
    font-family: 'ecoico';
    src: url('../fonts/timelineicons/ecoico.eot');
    src: url('../fonts/timelineicons/ecoico.eot?#iefix') format('embedded-opentype'),
        url('../fonts/timelineicons/ecoico.woff') format('woff'),
        url('../fonts/timelineicons/ecoico.ttf') format('truetype'),
        url('../fonts/timelineicons/ecoico.svg#ecoico') format('svg');
    font-weight: normal;
    font-style: normal;
} */

li i {
    color: white;
}

.cbp_tmtimeline>li .cbp_tmlabel:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 2s;
}

/* .cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:hover {
    cursor: pointer;
} */

.cbp_tmtimeline {
    margin: 30px 0 0 0;
    padding: 0;
    list-style: none;
    position: relative;
}

/* The line */
.cbp_tmtimeline:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    background: #059c5d;
    left: 20%;
    margin-left: -10px;
}

.cbp_tmtimeline>li {
    position: relative;
}

/* The date/time */
.cbp_tmtimeline>li .cbp_tmtime {
    display: block;
    width: 25%;
    padding-right: 100px;
    position: absolute;
}

.cbp_tmtimeline>li .cbp_tmtime span {
    display: block;
    text-align: right;
}

.cbp_tmtimeline>li .cbp_tmtime span:first-child {
    font-size: 1em;
    color: #006b3f;
}

.cbp_tmtimeline>li .cbp_tmtime span:last-child {
    font-size: 1.5em;
    color: #006b3f;
}

.cbp_tmtimeline>li:nth-child(odd) .cbp_tmtime span:last-child {
    color: #658f7d;
}

/* Right content */
.cbp_tmtimeline>li .cbp_tmlabel {
    margin: 0 0 15px 25%;
    background: #006b3f;
    color: #fff;
    padding: 2em;
    font-size: 1em;
    font-weight: 300;
    line-height: 1.4;
    position: relative;
    border-radius: 5px;
    transition-duration: 1s;
}

.cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel {
    background: #059c5d;
}

.cbp_tmtimeline>li .cbp_tmlabel h6 {
    margin-top: 0px;
    padding: 0 0 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}

/* The triangle */
.cbp_tmtimeline>li .cbp_tmlabel:after {
    right: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-right-color: #006b3f;
    border-width: 10px;
    top: 10px;
}

/********************************** */
.cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:after {
    border-right-color: #059c5d;
}

/* The icons */
.cbp_tmtimeline>li .cbp_tmicon {
    width: 40px;
    height: 40px;
    font-family: 'ecoico';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    font-size: 1.4em;
    line-height: 40px;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    color: #fff;
    background: #059c5d;
    border-radius: 50%;
    box-shadow: 0 0 0 8px #006b3f;
    text-align: center;
    left: 20%;
    top: 0;
    margin: 0 0 0 -25px;
}

.cbp_tmicon-phone:before {
    content: "e000";
}

.cbp_tmicon-screen:before {
    content: "e001";
}

.cbp_tmicon-mail:before {
    content: "e002";
}

.cbp_tmicon-earth:before {
    content: "e003";
}

/* Example Media Queries */
@media screen and (max-width: 65.375em) {

    .cbp_tmtimeline>li .cbp_tmtime span:last-child {
        font-size: 1.5em;
    }
}

@media screen and (max-width: 47.2em) {
    .cbp_tmtimeline:before {
        display: none;
    }

    .cbp_tmtimeline>li .cbp_tmtime {
        width: 100%;
        position: relative;
        padding: 0 0 20px 0;
    }

    .cbp_tmtimeline>li .cbp_tmtime span {
        text-align: left;
    }

    .cbp_tmtimeline>li .cbp_tmlabel {
        margin: 0 0 30px 0;
        padding: 1em;
        font-weight: 400;
        font-size: 95%;
    }

    .cbp_tmtimeline>li .cbp_tmlabel:after {
        right: auto;
        left: 20px;
        border-right-color: transparent;
        border-bottom-color: #3594cb;
        top: -20px;
    }

    .cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:after {
        border-right-color: transparent;
        border-bottom-color: #6cbfee;
    }

    .cbp_tmtimeline>li .cbp_tmicon {
        position: relative;
        float: right;
        left: auto;
        margin: -55px 5px 0 0px;
    }
}

.aviso {
    position: relative;
    width: 150px;
    padding: 10px;
    background-color: #059c5d;
    border-radius: 10px;
    margin-bottom: 20px;
}

.triangulo {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #059c5d;
}

.mensaje {
    text-align: center;
    color: #fff;
}
</style>