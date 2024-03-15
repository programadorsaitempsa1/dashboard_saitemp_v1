<template>
    <div id="container2">
        <Loading :loading="loading" />
        <div class="row" id="container" style="float: left; clear: both; color: #d06519">
            <div class="col-xs-12 col-md-12">
                <h5 v-if="!sin_registros">
                    Mostrando {{ this.items_tabla2.length }} de {{ links.total }} registros -
                    página {{ links.current_page }}
                </h5>
            </div>
        </div>
        <div v-if="items_tabla2.length > 1 && filtroComponente()" class="row" style="text-align:left;clear:both">
            <span @click="filtros = !filtros" style="cursor:pointer">Filtro avanzado de búsqueda <i v-if="filtros"
                    class="bi bi-chevron-down"></i><i v-if="!filtros" class="bi bi-chevron-compact-up"></i></span>
        </div>
        <div class="row" v-if="filtros && ruta == '/navbar/gestion-ingresosl'" style="clear: both;padding:30px;border: solid #D5DBDB 0.5px;border-radius:10px">
            <div v-for="item, index1 in 3" :key="item" class="row">
                <div class="col-xs-3 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label" style="float:left">Campo</label>
                    <select class="form-select form-select-sm" @change="tipoCampo2(indice_campos[index1], index1)"
                        v-model="indice_campos[index1]" aria-label="Default select example">
                        <option v-for="item, index in tabla2" :key="index">{{ index == 0 ? 'Por favor seleccione un' +
            ' campo' : item.nombre }}</option>
                    </select>
                </div>
                <div class="col-xs-3 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label" style="float:left">Comparación</label>
                    <select class="form-select form-select-sm" v-model="operadores[index1]"
                        aria-label="Default select example">
                        <option v-if="tipos_de_campo[index1] == 'numero'">Menor que</option>
                        <option v-if="tipos_de_campo[index1] == 'numero'">Mayor que</option>
                        <option v-if="tipos_de_campo[index1] == 'numero'">Menor o igual que</option>
                        <option v-if="tipos_de_campo[index1] == 'numero'">Mayor o igual que</option>
                        <option v-if="tipos_de_campo[index1] == 'numero'">Igual a número</option>
                        <option v-if="tipos_de_campo[index1] == 'numero' || tipos_de_campo[index1] == 'fecha'">Entre
                        </option>
                        <option v-if="tipos_de_campo[index1] == 'texto'">Igual a</option>
                        <option v-if="tipos_de_campo[index1] == 'fecha'">Igual a fecha</option>
                        <option v-if="tipos_de_campo[index1] == 'texto' && calculados[index1] == 'false'">Contiene
                        </option>
                    </select>
                </div>
                <div v-if="tipos_de_campo[index1] == 'fecha'" class="col-xs-3 col-md-3">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" style="float:left" class="form-label">{{ operadores[index1] !=
            'Entre' ?
            'Fecha' : 'Fecha inicial' }}</label>
                        <input type="date" class="form-control form-control-sm" id="exampleInputEmail2"
                            aria-describedby="emailHelp" v-model="valores_comparar[index1]" />
                    </div>
                </div>
                <div v-else class="col-xs-3 col-md-3">
                    <div v-if="calculados[index1] == 'true'">
                        <label for="exampleFormControlInput1" class="form-label" style="float:left">Valor</label>
                        <select class="form-select form-select-sm" @change="idCampo2(valores_comparar2[index1], index1)"
                            v-model="valores_comparar2[index1]" aria-label="Default select example">
                            <option v-for="item, index in listaItem" :key="index">{{ item.nombre }}</option>
                        </select>
                    </div>
                    <div v-if="calculados[index1] == 'false'" class="mb-3">
                        <label for="exampleInputEmail1" style="float:left" class="form-label">{{ operadores[index1] !=
            'Entre' ?
            'Valor' : 'Valor inicial' }}</label>
                        <input type="text" class="form-control form-control-sm" autocomplete="off"
                            id="exampleInputEmail2" aria-describedby="emailHelp" v-model="valores_comparar[index1]" />
                    </div>
                </div>
                <div v-if="tipos_de_campo[index1] == 'fecha' && operadores[index1] == 'Entre'"
                    class="col-xs-3 col-md-3">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" style="float:left" class="form-label">Fecha final</label>
                        <input type="date" class="form-control form-control-sm" id="exampleInputEmail2"
                            aria-describedby="emailHelp" v-model="valores_comparar2[index1]" />
                    </div>
                </div>
                <div v-if="tipos_de_campo[index1] == 'numero' && operadores[index1] == 'Entre'"
                    class="col-xs-3 col-md-3">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" style="float:left" class="form-label">Valor final</label>
                        <input type="text" class="form-control form-control-sm" id="exampleInputEmail2"
                            aria-describedby="emailHelp" v-model="valores_comparar2[index1]" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3 col-md-3">
                    <button @click="filtrar2()" type="button" style="margin-top: 30px" class="btn btn-success btn-sm">
                        Realizar búsqueda
                    </button>
                </div>
                <!-- <div v-if="ruta == '/navbar/debida-diligencia/clientes' && this.campo_ != '' && this.operadores && this.valores_comparar || this.valores_comparar2"
                    class="col-xs-3 col-md-3">
                    <button id="exportar" @click="exportar()" type="button" class="btn btn-success btn-sm">
                        <a :href="URL_API + 'api/v1/' + endpointexport + '/' + base64consulta"
                            rel="noopener noreferrer">Exportar excel</a>
                    </button>
                </div> -->
                <div class="col-xs-3 col-md-3">
                    <button @click="getRegistros()" type="button" style="margin-top: 30px"
                        class="btn btn-success btn-sm">
                        Borrar búsqueda
                    </button>
                </div>
            </div>
        </div>
        <div v-if="filtros && ruta != '/navbar/gestion-ingresosl'" class="row"
            style="clear: both;padding:30px;border: solid #D5DBDB 0.5px;border-radius:10px">
            <div class="col-xs-3 col-md-3">
                <label for="exampleFormControlInput1" class="form-label" style="float:left">Campo</label>
                <select class="form-select form-select-sm" @change="tipoCampo(indice_campo)" v-model="indice_campo"
                    aria-label="Default select example">
                    <option v-for="item, index in tabla2" :key="index">{{ index == 0 ? 'Por favor seleccione un' +
            ' campo' : item.nombre }}</option>
                </select>
            </div>
            <div class="col-xs-3 col-md-3">
                <label for="exampleFormControlInput1" class="form-label" style="float:left">Comparación</label>
                <select class="form-select form-select-sm" v-model="operador" aria-label="Default select example">
                    <option v-if="tipo_de_campo == 'numero'">Menor que</option>
                    <option v-if="tipo_de_campo == 'numero'">Mayor que</option>
                    <option v-if="tipo_de_campo == 'numero'">Menor o igual que</option>
                    <option v-if="tipo_de_campo == 'numero'">Mayor o igual que</option>
                    <option v-if="tipo_de_campo == 'numero'">Igual a número</option>
                    <option v-if="tipo_de_campo == 'numero' || tipo_de_campo == 'fecha'">Entre</option>
                    <option v-if="tipo_de_campo == 'texto'">Igual a</option>
                    <option v-if="tipo_de_campo == 'fecha'">Igual a fecha</option>
                    <option v-if="tipo_de_campo == 'texto' && calculado == 'false'">Contiene</option>
                </select>
            </div>
            <div v-if="tipo_de_campo == 'fecha'" class="col-xs-3 col-md-3">
                <div class="mb-3">
                    <label for="exampleInputEmail1" style="float:left" class="form-label">{{ operador != 'Entre' ?
            'Fecha' : 'Fecha inicial' }}</label>
                    <input type="date" class="form-control form-control-sm" id="exampleInputEmail2"
                        aria-describedby="emailHelp" v-model="valor_comparar" />
                </div>
            </div>
            <div v-else class="col-xs-3 col-md-3">
                <div v-if="calculado == 'true'">
                    <label for="exampleFormControlInput1" class="form-label" style="float:left">Valor</label>
                    <select class="form-select form-select-sm" @change="idCampo(valor_comparar2)"
                        v-model="valor_comparar2" aria-label="Default select example">
                        <option v-for="item, index in listaItem" :key="index">{{ item.nombre }}</option>
                    </select>
                </div>
                <div v-if="calculado == 'false'" class="mb-3">
                    <label for="exampleInputEmail1" style="float:left" class="form-label">{{ operador != 'Entre' ?
            'Valor' : 'Valor inicial' }}</label>
                    <input type="text" class="form-control form-control-sm" autocomplete="off" id="exampleInputEmail2"
                        aria-describedby="emailHelp" v-model="valor_comparar" />
                </div>
            </div>
            <div v-if="tipo_de_campo == 'fecha' && operador == 'Entre'" class="col-xs-3 col-md-3">
                <div class="mb-3">
                    <label for="exampleInputEmail1" style="float:left" class="form-label">Fecha final</label>
                    <input type="date" class="form-control form-control-sm" id="exampleInputEmail2"
                        aria-describedby="emailHelp" v-model="valor_comparar2" />
                </div>
            </div>
            <div v-if="tipo_de_campo == 'numero' && operador == 'Entre'" class="col-xs-3 col-md-3">
                <div class="mb-3">
                    <label for="exampleInputEmail1" style="float:left" class="form-label">Valor final</label>
                    <input type="text" class="form-control form-control-sm" id="exampleInputEmail2"
                        aria-describedby="emailHelp" v-model="valor_comparar2" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3 col-md-3">
                    <button @click="filtrar()" type="button" style="margin-top: 30px" class="btn btn-success btn-sm">
                        Realizar búsqueda
                    </button>
                </div>
                <div v-if="ruta == '/navbar/debida-diligencia/clientes' && this.campo != '' && this.operador && this.valor_comparar || this.valor_comparar2"
                    class="col-xs-3 col-md-3">
                    <button id="exportar" @click="exportar()" type="button" class="btn btn-success btn-sm">
                        <a :href="URL_API + 'api/v1/' + endpointexport + '/' + base64consulta"
                            rel="noopener noreferrer">Exportar excel</a>
                    </button>
                </div>
                <div class="col-xs-3 col-md-3">
                    <button @click="getRegistros()" type="button" style="margin-top: 30px"
                        class="btn btn-success btn-sm">
                        Borrar búsqueda
                    </button>
                </div>
            </div>
        </div>
        <div v-if="!sin_registros && items_tabla2.length > 1" class="row" style="clear: both;">
            <div v-if="ruta != '/navbar/procesosespeciales'" class="col-xs-3 col-md-3">
                <label for="exampleFormControlInput1" class="form-label" style="float:left">Cantidad de registros a
                    listar</label>
                <select class="form-select form-select-sm" @change="getRegistros()" v-model="cantidad"
                    aria-label="Default select example">
                    <option>10</option>
                    <option v-if="links.total > 10">20</option>
                    <option v-if="links.total > 50">50</option>
                    <option v-if="links.total > 100">100</option>
                    <option v-if="links.total > 300">200</option>
                    <option v-if="links.total > 500">300</option>
                    <option v-if="links.total > 1000">500</option>
                </select>
            </div>
            <div v-if="ruta != '/navbar/reporteitems' && !empleados() && ruta != '/navbar/reportes' && ruta != '/navbar/procesosespeciales' && ruta != '/navbar/debida-diligencia/clientes' && ruta != '/navbar/correo-novedades-nomina' && ruta != '/navbar/cliente-supervision' && ruta != '/navbar/solicitudes-os' && ruta != '/navbar/gestion-ingresosl'"
                class="col-xs-3 col-md-3">
                <button type="button" style="margin-top: 35px" @click="selectAll((select_all = !select_all))"
                    class="btn btn-success btn-sm">
                    Seleccionar todo
                </button>
            </div>
            <div v-if="check.length > 1" class="col-xs-3 col-md-3">
                <button type="button" style="margin-top: 35px; background-color:#E74C3C;color:white"
                    @click="masiveDeleteMessage()" class="btn btn-sm">
                    Eliminar seleccionados
                </button>
            </div>
            <div v-if="cantidad >= 20" class="col-xs-3 col-md-3">
                <button type="submit" style="margin: 15px" @click="goScroll('down')" id="scroll" class="btn">
                    <i class="bi bi-chevron-double-down"></i>
                </button>
            </div>
        </div>
        <div v-if="!sin_registros" class="table-responsive">
            <table class="table align-middle table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th v-if="ruta != '/navbar/reporteitems' && !empleados() && ruta != '/navbar/reportes' && ruta != '/navbar/trump' && ruta != '/navbar/procesosespeciales' && ruta != '/navbar/debida-diligencia/clientes' && ruta != '/navbar/correo-novedades-nomina' && ruta != '/navbar/cliente-supervision' && ruta != '/navbar/solicitudes-os' && ruta != '/navbar/gestion-ingresosl'"
                            scope="col">Seleccionar</th>
                        <th @click="sort(item, index + 1, (sorted = !sorted))" scope="col"
                            v-for="(item, index) in tabla2" :key="index"
                            :class="{ 'd-none': item.nombre === 'Estado contrato' }">
                            {{ item.nombre }}
                        </th>
                        <!-- <th v-if="editar || eliminar" -->
                        <th v-if="ruta != '/navbar/reporteitems' && ruta != '/navbar/trump' && ruta != '/navbar/procesosespeciales' && ruta != '/navbar/correo-novedades-nomina'"
                            colspan="4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items_tabla2" :key="item.id">
                        <td
                            v-if="ruta != '/navbar/reporteitems' && !empleados() && ruta != '/navbar/reportes' && ruta != '/navbar/trump' && ruta != '/navbar/procesosespeciales' && ruta != '/navbar/debida-diligencia/clientes' && ruta != '/navbar/correo-novedades-nomina' && ruta != '/navbar/cliente-supervision' && ruta != '/navbar/solicitudes-os' && ruta != '/navbar/gestion-ingresosl'">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" @change="(item.checked = !item.checked), clear()"
                                    v-model="check" type="checkbox" :value="item.id" />
                            </div>
                        </td>
                        <td v-for="(item2) in campos2" :key="item2.id"
                            :style="{ display: shouldDisplayColumn(item2) ? 'table-cell' : 'none' }"
                            style="text-align:justify">{{ item2 == 'id' ? index +
            1 : item[item2] ==
                null ? 'Sin datos' : item2.includes('sal_bas') ?
            formatCurrency(item[item2]) : item[item2].includes('000000Z') ? fecha(item[item2]) :
                item[item2] }}
                        </td>
                        <!-- <td @click="getAnalista(item['analista'].split('-')[1])" style="color:rgb(9, 107, 22);text-decoration: underline; cursor: pointer;">{{ item['analista'].split('-')[0] }}</td> -->
                        <td v-if="empleados() && !isNaN(search)">
                            <Modal :datos="analista"
                                :texto="item['analista'] != undefined ? item['analista'].split('-')[0] : ''"
                                titulo="Analista" eventoCampo="getAnalista"
                                @getAnalista="getAnalista(item['analista'].split('-')[1])"
                                style="text-decoration: underline; cursor: pointer;" />
                        </td>

                        <!-- v-if="ruta != '/navbar/reporteitems' && !empleados() && ruta != '/navbar/reportes' && ruta != '/navbar/trump' && ruta != '/navbar/procesosespeciales' && ruta != '/navbar/debida-diligencia/clientes' && ruta != '/navbar/correo-novedades-nomina' && ruta != '/navbar/cliente-supervision' && ruta != '/navbar/solicitudes-os' && ruta != '/navbar/permiso-usuario' && ruta != '/navbar/menuroles' && ruta != '/navbar/permisoroles' && ruta != '/navbar/menu-usuarios'"> -->
                        <td v-if="editar">
                            <button type="button" class="btn btn-warning btn-sm" @click="update(item), goScroll('edit')"
                                v-if="item.nombre != 'S. Administrador'">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </td>
                        <!-- v-if="ruta != '/navbar/reporteitems' && !empleados() && ruta != '/navbar/reportes' && ruta != '/navbar/trump' && ruta != '/navbar/procesosespeciales' && ruta != '/navbar/debida-diligencia/clientes' && ruta != '/navbar/correo-novedades-nomina' && ruta != '/navbar/cliente-supervision' && ruta != '/navbar/solicitudes-os' && ruta != '/navbar/menus'"> -->
                        <td v-if="eliminar">
                            <button type="button" class="btn btn-danger btn-sm " @click="messageDelete(item.id)"
                                v-if="item.nombre != 'S. Administrador'">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                        <td v-if="empleados()">
                            <button type="button" class="btn btn-success btn-sm " @click="VerRegistro(item)"
                                v-if="item.nombre != 'S. Administrador'">
                                Ver registro
                            </button>
                        </td>
                        <td v-if="ruta == '/navbar/debida-diligencia/clientes'">
                            <button type="button" class="btn btn-success btn-sm " @click="verContrato(item)"
                                v-if="item.nombre != 'S. Administrador'">
                                Ver registro
                            </button>
                        </td>
                        <td v-if="ruta == '/navbar/cliente-supervision'">
                            <button type="button" class="btn btn-success btn-sm " @click="verFormularioSuper(item)"
                                v-if="item.nombre != 'S. Administrador'">
                                Ver registro
                            </button>
                        </td>
                        <td v-if="ruta == '/navbar/solicitudes-os'">
                            <button type="button" class="btn btn-success btn-sm " @click="verOrdenServicio(item)"
                                v-if="item.nombre != 'S. Administrador'">
                                Ver registro
                            </button>
                        </td>
                        <td v-if="ruta == '/navbar/gestion-ingresosl'">
                            <button type="button" class="btn btn-success btn-sm " @click="verOrdenIngreso(item)"
                                v-if="item.nombre != 'S. Administrador'">
                                Ver registro
                            </button>
                        </td>
                        <td v-if="ruta == '/navbar/debida-diligencia/clientes' && permisos[0].autorizado">
                            <!-- <button type="button" class="btn btn-success btn-sm " @click="$refs.consultaContrato.consulta()"> -->
                            <ConsultaContrato :item="item" />
                            <!-- </button> -->

                        </td>
                        <td v-if="ruta == '/navbar/debida-diligencia/clientes'">
                            <div class="btn-group">
                                <button type="button" class="btn"
                                    :style="'color:black;background-color:' + item.color_estado_firma">{{
            item.nombre_estado_firma }}</button>
                                <button type="button" class="btn dropdown-toggle dropdown-toggle-split"
                                    v-if="permisos[20].autorizado" data-bs-toggle="dropdown" aria-expanded="false"
                                    :style="'color:black;background-color:' + item.color_estado_firma">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li style="cursor:pointer;" v-for="item2, index in estados_firma" :key="index"> <a
                                            class="dropdown-item" @click="actualizaEstado(item.id, item2.id)">{{
            item2.nombre }}</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item"><router-link class="nav-link active"
                                                :to="'/navbar/timeLine/' + item.id">Historial
                                                actualizaciones</router-link></a></li>
                                </ul>
                            </div>
                        </td>
                        <td v-if="ruta == '/navbar/gestion-ingresosl'">
                            <!-- <div style="position: absolute;">{{item.estado_ingreso}}</div> -->
                            <div class="btn-group">
                                <button type="button" class="btn"
                                    :style="'color:black;background-color:' + item.color">{{
            truncateText(item.estado_ingreso, maxCaracteres) }}</button>
                                <button type="button" class="btn dropdown-toggle dropdown-toggle-split"
                                    v-if="permisos[20].autorizado" data-bs-toggle="dropdown" aria-expanded="false"
                                    :style="'color:black;background-color:' + item.color">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li style="cursor:pointer;" v-for="item2, index in estados_ingreso" :key="index"> <a
                                            class="dropdown-item" @click="actualizaEstado(item.id, item2.id)">{{
            item2.nombre }}</a></li>
                                    <!-- <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item"><router-link class="nav-link active"
                                                :to="'/navbar/timeLine/' + item.id">Historial
                                                actualizaciones</router-link></a></li> -->
                                </ul>
                            </div>
                        </td>
                        <td v-if="ruta == '/navbar/gestion-ingresosl'">
                            <div class="btn-group">
                                <button type="button" class="btn"
                                    :style="'color:black;background-color:' + item.color">{{
            item.responsable_ingreso }}</button>
                                <button type="button" class="btn dropdown-toggle dropdown-toggle-split"
                                    v-if="permisos[20].autorizado" data-bs-toggle="dropdown" aria-expanded="false"
                                    :style="'color:black;background-color:' + item.color" @click="getEncargados(item)">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li style="cursor:pointer;" v-for="item2, index in lista_encargados" :key="index">
                                        <a class="dropdown-item" @click="actualizaResponsable(item.id, index)">{{
            item2.nombre }}</a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                        <td v-if="ruta == '/navbar/reportes'">
                            <button type="button" class="btn btn-success btn-sm "
                                v-if="item.nombre != 'S. Administrador'">
                                <a :href="'http://srv-saitemp03:81/ReportServer/Pages/ReportViewer.aspx?%2fSaitemp_V3/ReportesWeb/' + item.cod_rep.substring(0, 3) + '/' + item.cod_rep + '&rs:Command=Render'"
                                    target="_blank">Ver reporte</a>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" style="margin: 15px" @click="goScroll('up')" id="scroll" class="btn">
                <i class="bi bi-chevron-double-up"></i>
            </button>
            <div class="content">
                <nav class="pagin" aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a :style="item.active == true
            ? 'background-color:#d06519'
            : 'background-color:#21618C'
            " class="page-link" v-for="(item, index) in links.links" :key="index"
                                @click="pagination(item.url), currentUrl = item.url, goScroll('up')">{{
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
        <div v-else>
            <div v-if="spinner">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h5>Cargando por favor espere un momento.</h5>
            </div>
            <h3 v-else>{{ sinregistros }}</h3>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import Modal from './Modal.vue'
import ConsultaContrato from './ConsultaContrato.vue'
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
import { Permisos } from '../Mixins/Permisos.js';
import Loading from './Loading.vue'
import { Scroll } from '@/Mixins/Scroll';
export default {
    components: {
        Modal,
        ConsultaContrato,
        Loading
    },
    mixins: [Token, Alerts, Permisos, Scroll],
    props: {
        tabla: [],
        datos: [],
        endpoint: {},
        endpointexport: {},
        heigth_container: {},
        massiveUpdate: {},
        campos: {},
        listas: [],
        userlogued: {
            default: '',

        },
        search: {
            default: '',
            type: String
        },
        search2: {
            default: '',
            type: String
        },
        editar: {
            default: false,
            type: Boolean
        },
        eliminar: {
            default: false,
            type: Boolean
        },
        estados_firma: [],
        estados_ingreso: []
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            sorted: false,
            tabla2: [],
            items_tabla2: [],
            campos2: [],
            sin_registros: true,
            siguiente: 0,
            currentUrl: "",
            links: [],
            cantidad: 10,
            check: [],
            select_all: false,
            spinner: true,
            campo: '',
            campo_: [],
            operador: '',
            operadores: [],
            valor_comparar: '',
            valor_comparar2: '',
            valores_comparar: [],
            valores_comparar2: [],
            tipo_de_campo: '',
            tipos_de_campo: [],
            indice_campo: '',
            indice_campos: [],
            filtros: false,
            calculado: '',
            calculados: [],
            listaItem: [],
            ruta: this.$route.path,
            base64consulta: '',
            sinregistros: 'No hay resgistros guardados',
            url: '',
            analista: [],
            loading: false,
            columnaOculta: ['color_estado_firma', 'nombre_estado_firma', 'responsable_ingreso', 'estado_ingreso_id'], // este array contiene los nombres de las columnas queno queremos que se muestren en la tabla
            maxCaracteres: 20,
            lista_estados_id: {},
            lista_encargados: [],

        };
    },

    watch: {
        datos: function () {
            this.spinner = false
            if (this.datos.data.data.length > 0) {
                this.llenarTabla(this.datos)
                this.sin_registros = false
            } else {
                this.sin_registros = true
                // if(this.ruta == '/navbar/empleados' || this.ruta == '/navbar/trump'){
                this.sinregistros = 'No se encontraron registros'
                // }
            }
        },
        massiveUpdate: function () {
            this.massiveUpdateMessage()
        },
    },
    created() {
        this.empleados()
        if (this.empleados() || this.ruta == '/navbar/trump') {
            this.spinner = false
            this.sinregistros = 'Realiza una búsqueda para ver los registros'
        }
    },
    methods: {
        getEncargados(item) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/responsableingresos/" + item.estado_ingreso_id, config)
                .then(function (result) {
                    self.lista_encargados = result.data
                });
        },
        truncateText(text, maxLength, id) {
            if (!(id in this.lista_estados_id)) {
                if (text.length > maxLength) {
                    // this.$set(this.lista_estados_id, id, text.substring(0, maxLength) + '...');
                    return 'Estado'
                } else {
                    this.$set(this.lista_estados_id, id, text);
                }
            }
            return 'Estado'
            // return this.lista_estados_id[id];
        },
        actualizaResponsable(item_id, index) {
            this.$emit('actualizaResponsable', item_id, this.lista_encargados[index].nombres, this.currentUrl)
            setTimeout(() => {
                this.lista_encargados = [];
            }, 1000);
        },
        shouldDisplayColumn(column) {
            if (!this.columnaOculta.includes(column)) {
                return column;
            }
        },
        actualizaEstado(item_id, estado) {
            this.$emit('actualizaEstado', item_id, estado, this.currentUrl)
        },
        empleados() {
            if (this.ruta.split("/")[2] == 'empleados') {
                return true;
            }
        },

        getAnalista(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/analista/" + id, config)
                .then(function (result) {
                    self.analista = result.data
                });
        },
        validaColumnasTabla() {

        },
        filtroComponente() {

            if (this.ruta.includes('costos')) {
                return true
            }
            else if (this.ruta.includes('reporteitems')) {
                return true
            }
            else if (this.ruta.includes('correo-novedades-nomina')) {
                return true
            }
            else if (this.ruta.includes('cliente-supervision')) {
                return true
            }
            // else if (this.ruta.includes('zonas')) {
            //     return true
            // }
            else if (this.ruta.includes('debida-diligencia')) {
                return true
            }
            else if (this.ruta.includes('gestion-ingresosl')) {
                return true
            }
        },
        exportar() {
            let self = this;
            let cadena = this.campo + '/' + this.operador + '/' + this.valor_comparar + '/' + self.valor_comparar2
            this.base64consulta = (btoa(cadena))
        },
        filtrar() {
            let self = this;
            this.scrollTop()
            this.loading = true
            let config = self.configHeader();
            let cadena = this.campo + '/' + this.operador + '/' + this.valor_comparar + '/' + self.valor_comparar2
            // const encryptedText = this.CryptoJS.AES.encrypt(cadena, localStorage.getItem("access_token").substring(0,32)).toString()
            // let base64 = (btoa(encryptedText))
            let base64 = (btoa(cadena))

            // console.log(encryptedText,'cifrado')
            // const decryptedText = this.CryptoJS.AES.decrypt(encryptedText, localStorage.getItem("access_token").substring(0,32)).toString(this.CryptoJS.enc.Utf8)
            // console.log(decryptedText,'texto plano')
            // console.log(base64,'base64')
            // console.log(localStorage.getItem("access_token").substring(0,32),'contyraseña')

            axios
                .get(self.URL_API + "api/v1/" + self.endpoint + "filtro/" + base64, config)
                .then(function (result) {
                    self.loading = false
                    self.currentUrl = result.data.first_page_url
                    self.llenarTabla(result)
                });
        },
        filtrar2() {
            let self = this;
            this.scrollTop()
            this.loading = true
            let config = self.configHeader();

            const longitud = this.campo_.length;

            for (let i = longitud - 1; i >= 0; i--) {
                if (
                    this.campo_[i] === undefined ||
                    this.operadores[i] === undefined ||
                    this.valores_comparar[i] === undefined ||
                    this.campo_[i] === '' ||
                    this.operadores[i] === '' ||
                    this.valores_comparar[i] === ''
                ) {
                    Vue.set(this.campo_, i, undefined);
                    Vue.set(this.operadores, i, undefined);
                    Vue.set(this.valores_comparar, i, undefined);
                    Vue.set(this.valores_comparar2, i, undefined);
                    Vue.set(this.indice_campos, i, undefined);
                }
            }

            let indice_campos = JSON.stringify(this.campo_);
            let operadores = JSON.stringify(this.operadores);
            let valores_comparar = JSON.stringify(this.valores_comparar);
            let valores_comparar2 = JSON.stringify(this.valores_comparar2);
            let cadena = indice_campos + '/' + operadores + '/' + valores_comparar + '/' + valores_comparar2
            let base64 = (btoa(cadena))
            axios
                .get(self.URL_API + "api/v1/" + self.endpoint + "filtro/" + base64, config)
                .then(function (result) {
                    self.loading = false
                    self.currentUrl = result.data.first_page_url
                    self.llenarTabla(result)
                });
        },
        tipoCampo(campo) {
            this.tabla2.forEach((item, index) => {
                if (item.nombre == campo) {
                    this.tipo_de_campo = item.tipo
                    this.campo = this.campos2[index]
                    this.calculado = item.calculado
                    if (item.calculado == 'true') {
                        this.listaItem = this.listas[index]
                    }
                }
            })
        },
        tipoCampo2(campo, index1) {
            this.tabla2.forEach((item, index) => {
                if (item.nombre == campo) {
                    this.tipos_de_campo[index1] = item.tipo
                    this.campo_[index1] = this.campos2[index]
                    this.calculados[index1] = item.calculado
                    if (item.calculado == 'true') {
                        this.listaItem = this.listas[index1]
                    }
                }
            })
        },
        idCampo(campo) {
            this.listaItem.forEach(item => {
                if (campo.trim() == item.nombre.trim()) {
                    this.valor_comparar = item.id
                }
            })
        },
        idCampo2(campo, index1) {
            this.listaItem.forEach(item => {
                if (campo.trim() == item.nombre.trim()) {
                    this.valores_comparar[index1] = item.id
                }
            })
        },
        llenarTabla(datos) {
            let self = this
            if (datos.data.data.length > 0) {
                this.sin_registros = false
                let claves = Object.keys(datos.data.data[0]); // Crea un array con los campos de los registros para ordenarlos posteriormente
                self.campos2 = []
                claves.forEach((element) => {
                    self.campos2.push(element)
                });
                if (this.empleados() && !isNaN(this.search)) {
                    self.campos2.pop()
                }
            } else {
                this.sin_registros = true
            }
            this.tabla2 = this.tabla; // Encabezados de la tabla
            this.items_tabla2 = Object.values(datos.data.data); // lista de registros
            self.links = datos.data;
            self.siguiente = datos.data.links.length;
            this.items_tabla2.forEach(function (item) {
                item.checked = false;
            });
        },
        sort(item, numero) {
            this.tabla2.forEach(function (item, index) {
                document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (index + 2) + "):after", "content: \" \";");
            });
            if (item.orden == "DESC") {
                document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (numero + 1) + "):after", "content: \" ↓\";");
                this.sortDesc(numero);
                this.tabla2[numero - 1].orden = "ASC";
            }
            else {
                document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (numero + 1) + "):after", "content: \" ↑\";");
                this.sortAcs(numero);
                this.tabla2[numero - 1].orden = "DESC";
            }
        },
        sortAcs(numero) {
            this.items_tabla2.sort(function (a, b) {
                if (Object.values(a)[numero - 1] < Object.values(b)[numero - 1]) {
                    return -1;
                }
                if (Object.values(a)[numero - 1] > Object.values(b)[numero - 1]) {
                    return 1;
                }
                return 0;
            });
        },
        sortDesc(numero) {

            this.items_tabla2.reverse(function (a, b) {
                if (Object.values(a)[numero - 1] < Object.values(b)[numero - 1]) {
                    return -1;
                }
                if (Object.values(a)[numero - 1] > Object.values(b)[numero - 1]) {
                    return 1;
                }
                return 0;
            });
        },
        update(item) {
            this.check = []
            item.currentUrl = this.currentUrl
            this.$emit('response', item)
        },
        messageDelete(id) {
            let self = this;
            var title = "Estas seguro de elimiar el resgistro?"
            if (self.$route.fullPath.includes('menus')) {
                title = "Estas seguro de elimiar el resgistro? si elimina esta categoria de menú eliminará también las subcategorias de menú asociadas."
            }
            this.$swal
                .fire({
                    title: title,
                    text: "Esta operación no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        self.delete(id);
                    }
                });
        },
        delete(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .delete(self.URL_API + "api/v1/" + self.endpoint + "/" + id, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status);
                    if (self.$route.fullPath.includes('menus')) {
                        self.$emit('getItems');
                    } else {
                        self.getRegistros();
                    }
                });
        },
        formatCurrency(valor) {
            const formatterPeso = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            })
            return formatterPeso.format(parseInt(valor))

        },
        fecha(valor) {
            valor = new Date(valor);
            const opciones = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return valor.toLocaleDateString('es-ES', opciones);
        },
        masiveDeleteMessage() {
            let self = this
            this.$swal
                .fire({
                    title: "Estas seguro de elimiar los resgistros selccionados?",
                    text: "Esta operación no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        self.masiveDelete()
                    }
                });
        },
        masiveDelete() {
            let self = this;
            let config = self.configHeader();
            let registros = {}
            registros.id = self.check
            axios
                .post(self.URL_API + "api/v1/" + self.endpoint + "borradomasivo", registros, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status);
                    self.getRegistros();
                    if (result.data.status == "success") {
                        self.check = [];
                        self.select_all = false;
                        self.clear();
                    }
                });
        },
        massiveUpdateMessage() {
            let self = this;
            this.$swal
                .fire({
                    title: "Estas seguro de realizar una actualización a varios resgistros?",
                    text: "Esta operación no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, actualizar!",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        self.masiveUpdate()
                    }
                });
        },
        masiveUpdate() {
            let self = this
            let config = self.configHeader();
            let registros = {}
            registros.id = self.check
            registros.campos = self.campos
            axios
                .post(self.URL_API + "api/v1/" + self.endpoint + "actualizacionmasiva", registros, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status);
                    self.getRegistros();
                    if (result.data.status == "success") {
                        self.check = [];
                        self.select_all = false;
                        self.clear();
                    }
                });
        },
        getRegistros() {
            let self = this;
            this.scrollTop()
            this.loading = true
            let config = this.configHeader();
            let url = ''
            if (this.search != '' && this.search2 == '') {
                url = self.URL_API + "api/v1/" + self.endpoint + "/" + self.search + '/' + self.cantidad
            } else if (this.search2 != '') {
                url = self.URL_API + "api/v1/" + self.endpoint + "/" + self.search + "/" + self.search2 + "/" + self.cantidad
            } else {
                url = self.URL_API + "api/v1/" + self.endpoint + "/" + self.cantidad
            }
            axios
                .get(url, config)
                .then(function (result) {
                    self.loading = false
                    self.currentUrl = result.data.first_page_url;
                    if (self.$route.fullPath.includes('menuroles')) {
                        self.$emit('getMenuNavbar');
                    }
                    self.llenarTabla(result)
                });
        },
        goScroll(direction) {
            var top = 0
            let container = document.getElementById("container");
            let container2 = document.getElementById("container2");
            let coords = container.getBoundingClientRect();
            let coords2 = container2.getBoundingClientRect();
            if (direction == 'up') {
                top = coords.top + scrollY
            } else if (direction == 'down') {
                top = coords2.bottom + scrollY
            } else {
                top = 70
            }
            window.scroll({
                top: (top),
                left: 0,
                behavior: "smooth",
            });
        },
        pagination(pag) {
            this.loading = true
            if (pag != null) {
                let self = this;
                let config = this.configHeader();
                axios.get(pag, config).then(function (result) {
                    self.links = result.data
                    // self.llenarTabla(result)
                    self.items_tabla2 = Object.values(result.data.data); // se está llenando la tabla con los datos cuando se pagina
                    // desde acá porque en la función llenartabla() está dando error al llenar la tabla
                    self.loading = false
                });
            }
        },
        clear() {
            this.$emit('clear')
            this.$emit('check', this.check)
        },
        selectAll() {
            let self = this;
            if (this.select_all) {
                document
                    .querySelectorAll(".form-check input[type=checkbox]")
                    .forEach(function (checkElement) {
                        checkElement.checked = true;
                    });
                self.items_tabla2.forEach(function (item) {
                    self.check.push(item.id);
                });
                this.$emit('check', this.check)
                this.$emit('clear')
            }
            else {
                document
                    .querySelectorAll(".form-check input[type=checkbox]")
                    .forEach(function (checkElement) {
                        checkElement.checked = false;
                    });
                self.items_tabla2.forEach(function (item) {
                    item.checked = false;
                    self.check.pop(item.id);
                });
                this.check = []
                this.$emit('check', this.check)
            }
        },
        VerRegistro(item) {
            // this.$router.push({ name: 'empleado' })
            if (!isNaN(this.search)) {
                this.$router.push({ name: 'empleado', params: { id: this.search.trim() } })
            } else {
                this.$emit('getUser', item.ter_nit.trim())
            }
        },
        verContrato(item) {
            this.$router.push({ name: 'debida-diligencia/formulario-clientes', params: { id: item.id } })
        },
        verFormularioSuper(item) {
            this.$router.push({ name: 'formulario-supervision', params: { id: item.id } })
        },
        verOrdenServicio(item) {
            this.$router.push({ name: 'orden-servicios', params: { id: item.id } })
        },
        verOrdenIngreso(item) {
            this.$router.push({ name: 'gestion-ingresos', params: { id: item.id } })
        },
        exportFormularioDD() {
            // console.log(item)
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formularioddexport", config)
                .then(function (result) {
                    console.log(result.data)
                });
        }
    },
};
</script>

<style scoped>
th {
    white-space: nowrap;
    cursor: pointer;
    background-color: #D5DBDB;
    color: black;
    padding: 10px;
}

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

.table-responsive {
    clear: both;
}

.row {
    margin-bottom: 20px;
}

.btn-group a {
    color: black;
}

.btn-group {
    height: 80px;
    width: 135px;
}

/*spiner*/
.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 50px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgb(10, 10, 10);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(199, 195, 195) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* fin spinner*/

#exportar {
    margin-top: 30px;
}

#exportar a {
    color: white;
    text-decoration: none;
}

a {
    color: white;
    text-decoration: none;
}

.d-none {
    display: none;
}
</style>