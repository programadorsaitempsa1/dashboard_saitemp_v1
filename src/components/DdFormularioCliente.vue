<template>
    <div class="container" id="contenedor-formulario">
        <div v-if="loading" class="loading">
            <div class="loader" id="loader">Loading...</div>
        </div>
        <div class="row">
            <div class="col-2">
                <img style="width: 80%;" src="@/assets/logo1.png" alt="">
            </div>
            <div class="col-8">
                <h5>SAGRILAFT</h5>
                <h5>Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos y Financiación del Terrorismo
                    FORMATO ÚNICO DE VINCULACIÓN DE CONTRAPARTES</h5>
            </div>
            <div class="col-2">
                <p>GCM130-1</p>
                <p>3-01-2023</p>
                <p>Versión 5</p>
            </div>
        </div>
        <form @submit.prevent="save()">
            <h6 class="tituloseccion">Información general</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col-4">
                        <SearchList nombreCampo="Tipo de cliente: *" @getTipoCliente="getTipoCliente"
                            eventoCampo="getTipoCliente" nombreItem="nombre" :consulta="consulta_tipo_cliente"
                            :registros="cliente_proveedor" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="tipo_cliente == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col" v-if="tipo_cliente == 2">
                        <SearchList nombreCampo="Tipo de proveedor: *" @getTipoProveedor="getTipoProveedor"
                            eventoCampo="getTipoProveedor" nombreItem="nombre" :consulta="consulta_tipo_proveedor"
                            :registros="tipo_proveedores" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="tipo_proveedor == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row" v-if="tipo_cliente == 1">
                    <div class="col">
                        <SearchList nombreCampo="Operación: *" @getOperacion="getOperacion" eventoCampo="getOperacion"
                            nombreItem="nombre" :consulta="consulta_operacion" :registros="operaciones"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="operacion == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Contratacion directa:</label>
                        <div class="col form-check" style="clear: both;">
                            <input class="form-check-input" type="checkbox" v-model="contratacion_directa"
                                id="flexCheckIndeterminate">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Atraccion y seleccion de talento:</label>
                        <div class="col form-check" style="clear: both;">
                            <input class="form-check-input" type="checkbox" v-model="atraccion_seleccion"
                                id="flexCheckIndeterminate">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de persona: *" @getTipoPersona="getTipoPersona"
                            eventoCampo="getTipoPersona" nombreItem="nombre" :registros="tiposPersona"
                            :consulta="consulta_tipo_persona" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="tipo_persona == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            eventoCampo="getTipoIdentificacion" :ordenCampo="1" nombreItem="des_tip"
                            @setTipoIdentificacion="setTipoIdentificacion" :registros="tiposIdentificacion"
                            :consulta="consulta_tipo_identificacion" placeholder="Seleccione una opción"
                            :disabled="!persona_natural" />
                        <span id="validate" v-if="tipo_persona == 1 && tipo_identificacion == '' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número de
                            identificación: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion"
                            @input="numero_identificacion = validarNumero(numero_identificacion), calcularDigitoVerificacion(numero_identificacion)"
                            @blur="getCliente(numero_identificacion, 1)" :disabled="!persona_natural" />
                        <span id="validate" v-if="numero_identificacion === '' && tipo_persona == 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Fecha de expedición: *</label>
                        <input type="date" class="form-control" autocomplete="off" id="fecha_expedicion"
                            aria-describedby="emailHelp" v-model="fecha_expedicion" :disabled="!persona_natural" />
                        <span id="validate" v-if="fecha_expedicion == '' && tipo_persona == 1 && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">NIT: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="nit" :disabled="!persona_juridica"
                            @input="nit = validarNumero(nit), calcularDigitoVerificacion(nit)" @blur="getCliente(nit, 2)" />
                        <span id="validate" v-if="nit == '' && tipo_persona == 2 && submitted" class="error">{{
                            mensaje_error }}</span>

                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Dígito de verificación: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="6"
                            aria-describedby="emailHelp" v-model="digito_verificacion" :disabled="true" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Nombre completo / Razón social: *</label>
                        <!-- <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="razon_social = formatInputUpperCase($event.target.value)" aria-describedby="emailHelp"
                            v-model="razon_social" /> -->
                        <textarea name="" id="razon_social" rows="1" v-model="razon_social"
                            @input="razon_social = formatInputUpperCase($event.target.value)"></textarea>
                        <span id="validate" v-if="razon_social == '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Fecha de constitución: *
                        </label>
                        <input type="date" class="form-control" autocomplete="off" aria-describedby="emailHelp"
                            id="fecha_constitucion" v-model="fecha_constitucion" />
                        <!-- :disabled="!persona_juridica" -->
                        <span id="validate" v-if="fecha_constitucion == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Cuantos empleados conforman la
                            empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="6"
                            aria-describedby="emailHelp" v-model="empleados_empresa" :disabled="proveedor"
                            @input="empleados_empresa = validarNumero(empleados_empresa)" />
                        <span id="validate" v-if="empleados_empresa == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <SearchList nombreCampo="Código ciiu: *" @getCodigosCiiu="getCodigosCiiu"
                            eventoCampo="getCodigosCiiu" nombreItem="codigo" :registros="codigos_ciiu"
                            :consulta="consulta_codigo_ciiu" @getActividadesCiiu="getActividadesCiiu"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="codigo_ciiu_id == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <SearchTable nombreCampo="Actividad ciiu: *" eventoCampo="setActividadesCiiu"
                            @setActividadesCiiu="setActividadesCiiu" endpoint="actividadciiu/filetr"
                            :consulta="consulta_actvidad_ciiu" :nombreItem="campos_actividad_ciiu" :datos="actividades_ciiu"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="actividad_ciiu == '' && submitted" class="error">{{
                            mensaje_error }}</span>

                    </div>
                    <div class="col mb-3">
                        <SearchList nombreCampo="Estrato socio económico (ubicación empresa): *" @getEstratos="getEstratos"
                            eventoCampo="getEstratos" :consulta="consulta_estrato" nombreItem="nombre" :registros="estratos"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="estrato == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Pais: *" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nombre"
                            :consulta="consulta_pais" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="estrato == '' && submitted" class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento: *" nombreItem="nombre" eventoCampo="getDepartamentos"
                            :consulta="consulta_departamento" :registros="departamentos" @getMunicipios="getMunicipios"
                            placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="estrato === undefined && submitted" class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad: *" nombreItem="nombre" :registros="municipios"
                            :consulta="consulta_municipio" @setMunicipios="setMunicipios" eventoCampo="setMunicipios"
                            :ordenCampo="1" placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="variables[0].municipio === undefined && submitted" class="error">{{
                            mensaje_error }}</span> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Dirección de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="direccion_empresa = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="direccion_empresa" />
                        <span id="validate" v-if="direccion_empresa == '' && submitted" class="error">{{ mensaje_error
                        }}</span>

                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Persona contacto empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="150"
                            @input="contacto_empresa = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="contacto_empresa" />
                        <span id="validate" v-if="contacto_empresa == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Correo electrónico: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="correo_electronico_empresa = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="correo_electronico_empresa" />
                        <span id="validate" v-if="correo_electronico_empresa == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Teléfono empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="telefono_empresa"
                            @input="telefono_empresa = validarNumero(telefono_empresa)" />
                        <span id="validate" v-if="telefono_empresa == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número celular: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="celular_empresa"
                            @input="celular_empresa = validarNumero(celular_empresa)" />
                        <span id="validate" v-if="celular_empresa == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Actividad Económica: Sociedad Comercial: *" nombreItem="nombre"
                            :consulta="consulta_sociedad_comercial" :registros="sociedades_comerciales"
                            eventoCampo="getSociedadesComerciales" @getSociedadesComerciales="getSociedadesComerciales"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="sociedad_comercial == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Otra ¿Cuál?:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="150"
                            @input="otra_cual = formatInputUpperCase($event.target.value)" aria-describedby="emailHelp"
                            v-model="otra_cual" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Periodicidad de pago: *" nombreItem="nombre"
                            :consulta="consulta_periodicidad_pago" :registros="periodicidades_liquidacion"
                            eventoCampo="getPeriodicidadPago" @getPeriodicidadPago="getPeriodicidadPago"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="periodicidad_liquidacion_id == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Plazo pago (días): *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="50"
                            aria-describedby="emailHelp" v-model="plazo_pago"
                            @input="plazo_pago = validarNumero(plazo_pago)" />
                        <span id="validate" v-if="periodicidad_liquidacion_id == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Pais prestación servicio: *" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nombre" :consulta="consulta_pais_prestacion_servicio" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="estrato == '' && submitted" class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento prestación servicio: *" nombreItem="nombre"
                            eventoCampo="getDepartamentos" :consulta="consulta_departamento_prestacion_servicio"
                            :registros="departamentos" @getMunicipios="getMunicipios" placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="estrato === undefined && submitted" class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad prestación servicio: *" nombreItem="nombre" :registros="municipios"
                            :consulta="consulta_municipio_prestacion_servicio" @setMunicipios="setMunicipios"
                            eventoCampo="setMunicipios" :ordenCampo="2" placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="variables[0].municipio === undefined && submitted" class="error">{{
                            mensaje_error }}</span> -->
                    </div>
                </div>
                <div class="row" v-if="tipo_cliente == 1">
                    <div class="col mb-3">
                        <label class="form-label">AIU negociado: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="50"
                            aria-describedby="emailHelp" v-model="aiu_negociado" />
                        <span id="validate" v-if="aiu_negociado == '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ejecutivo comercial: *" nombreItem="nom_ven"
                            :registros="ejecutivos_comerciales" :consulta="consulta_ejecutivo_comercial"
                            eventoCampo="getEjecutivos_comerciales" @getEjecutivos_comerciales="getEjecutivos_comerciales"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="ejecutivo_comercial == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Observaciones a acuerdos
                            comerciales:
                        </label>
                        <!-- <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="acuerdos_comerciales = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="acuerdos_comerciales" /> -->
                        <textarea name="" id="acuerdos_comerciales" rows="1" v-model="acuerdos_comerciales"
                            @input="acuerdos_comerciales = formatInputUpperCase($event.target.value)"></textarea>
                    </div>
                </div>
                <div class="row" v-if="tipo_cliente == 1">
                    <div class="col">
                        <SearchList nombreCampo="Jornada Laboral: *" nombreItem="nombre" :registros="jornadas_laborales"
                            :consulta="consulta_jornada_laboral" eventoCampo="getJornadasLaborales"
                            @getJornadasLaborales="getJornadasLaborales" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="jornada_laboral == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Rotación de personal *" nombreItem="nombre"
                            :consulta="consulta_rotacion_personal" :registros="rotaciones_personal"
                            eventoCampo="getRotacionesPersonal" @getRotacionesPersonal="getRotacionesPersonal"
                            ubicacion="ciudad nacimiento" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="rotacion_personal == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col">
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion" v-if="tipo_cliente == 1">Cargos empresa</h6>
            <div id="seccion" v-if="tipo_cliente == 1 && cargos[0].requisitos.length > 0">
                <div class="row">
                    <div class="row">
                        <div class="col-3">
                            <SearchList nombreCampo="Riesgo de la empresa: (ARL)" eventoCampo="getRiesgosLaborales"
                                nombreItem="nombre" :registros="riesgos_laborales" :consulta="consulta_riesgo_cliente"
                                @getRiesgosLaborales="getRiesgosLaborales" placeholder="Seleccionar" />
                            <span id="validate" v-if="riesgo_laboral == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Categoria cargo: *</label>

                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Requisitos:</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Exámenes:</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Riesgo del cargo* (ARL):</label>
                        </div>
                    </div>
                    <div class="row" id="contenedor-select" v-for="item, index in cargos" :key="item.id">
                        <div class="col-3">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.cargo = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.cargo" />
                            <span id="validate" v-if="item.cargo == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <ListaMultiple @setLista="setLista" :verLista="verLista" :index="index" tipolista="requisitos"
                            :elementoslist="requisitosList" :elementos="requisitos[index]" :hover="hover" />
                        <ListaMultiple :elementoslist="examenesList" :verLista="verLista" @setLista="setLista"
                            :index="index" tipolista="examenes" :elementos="examenes[index]" :hover="hover" />
                        <!-- <span id="validate" v-if="item.riesgo === '' && submitted" class="error">{{ mensaje_error
                            }}</span> -->
                        <div class="col-2">
                            <SearchList eventoCampo="getRiesgosLaborales2" :index="index" nombreItem="nombre"
                                :registros="riesgos_laborales" @getRiesgosLaborales2="getRiesgosLaborales2"
                                placeholder="Seleccionar" :consulta="consulta_riesgo_laboral[index]" />
                            <span id="validate" v-if="item.riesgo == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <div class="col-1 trash">
                            <i class="bi bi-trash-fill" v-if="index > 0" @click="deleteDynamic(cargos, index)"></i>
                        </div>
                    </div>
                </div>
                <span id="clasificador" @click="agregarCargo()" style="cursor: pointer"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar cargo
                </span>
            </div>
            <div id="seccion" v-if="tipo_cliente == 1 && cargos[0].requisitos.length <= 0">
                <div class="row cargos">
                    <div class="row">
                        <h5 style="text-align: left;">Número de cargos registrados: {{ cargos2.length }}</h5>
                        <div class="col-3">
                            <SearchList nombreCampo="Riesgo de la empresa: (ARL)" eventoCampo="getRiesgosLaborales"
                                nombreItem="nombre" :disabled="true" :registros="riesgos_laborales"
                                :consulta="consulta_riesgo_cliente" @getRiesgosLaborales="getRiesgosLaborales"
                                placeholder="Seleccionar" />
                            <span id="validate" v-if="riesgo_laboral == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                    </div>
                    <div class="row" id="contenedor-select" v-for="item, index in cargos2" :key="item.id">
                        <div class="row">
                            <div class="col">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Por favor seleccione si el tipo
                                    de
                                    cargo:</label>
                            </div>
                            <div style="display: flex;">
                                <div class="form-check m-2" v-for="item, index2 in tipo_cargos" :key="index2">
                                    <input class="form-check-input" type="radio"
                                        @click="getSubCategoriaCargo(item.id, index)" :value="item.id"
                                        v-model="tipo_cargo[index]" :name="'radio' + index" id="radio3">
                                    {{ item.nombre }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="exampleInputEmail1" class="form-label">Categoria cargo: *</label>

                            </div>
                            <div class="col">
                                <label for="exampleInputEmail1" class="form-label">Cargo:</label>
                            </div>
                            <!-- <div class="col">
                                <label for="exampleInputEmail1" class="form-label">Exámenes:</label>
                            </div> -->
                            <div class="col">
                                <label for="exampleInputEmail1" class="form-label">Riesgo del cargo* (ARL):</label>
                            </div>
                        </div>
                        <div class="col">
                            <!-- nombreCampo="Riesgo de la empresa: (ARL)" -->
                            <SearchList nombreItem="nombre" :registros="arry_subcategoria_cargos[index]"
                                :consulta="consulta_subcategoria_cargos[index]" eventoCampo="getListaCargos" :index="index"
                                @getListaCargos="getListaCargos" placeholder="Seleccionar" />
                            <span id="validate" v-if="riesgo_laboral == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <div class="col">
                            <!-- nombreCampo="Riesgo de la empresa: (ARL)" -->
                            <SearchList nombreItem="nombre" :registros="array_lista_cargos[index]"
                                :consulta="consulta_lista_cargos[index]" eventoCampo="getExamenesRecomendaciones"
                                @getExamenesRecomendaciones="getExamenesRecomendaciones" :index="index"
                                placeholder="Seleccionar" />
                            <span id="validate" v-if="riesgo_laboral == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <div class="col">
                            <SearchList eventoCampo="getRiesgosLaborales2" :index="index" nombreItem="nombre"
                                :registros="riesgos" @getRiesgosLaborales2="getRiesgosLaborales2" placeholder="Seleccionar"
                                :consulta="consulta_riesgo_laboral[index]" />
                            <span id="validate" v-if="item.riesgo == '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <div class="row">
                            <label for="exampleInputEmail1" class="form-label">Funciones del cargo:</label>
                            <div class="col">
                                <EditorTextoHtml :consulta="consulta_textohtml[index]" :index="index"
                                    @retornoTexto="retornoTexto" :showToolbar="true" />
                            </div>
                        </div>
                        <div class="row">
                            <label for="exampleInputEmail1" class="form-label">Exámenes:</label>
                            <div class="col">
                                <div class="col-12 lista-multiple">
                                    <button style="margin:5px" class="btn btn-success btn-sm"
                                        v-for="(item, index) in array_lista_examenes[index]" :key="index" type="button">{{
                                            item.nombre }}</button>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-for="item, index3 in array_lista_recomendaciones[index]" :key="index3">
                            <div class="col orientacion"><label style="width: 100%;">ORIENTACIONES ESPECIFICAS PARA LOS
                                    EXAMENES:</label>
                                <span>{{ item.recomendacion1 }}</span>
                            </div>
                            <div class="col orientacion"><label style="width: 100%;">PATOLOGIAS QUE RESTRINGEN LA
                                    LABOR:</label>
                                <span>{{ item.recomendacion2 }}</span>
                            </div>
                            <div class="col-1 trash">
                                <i class="bi bi-trash-fill" v-if="index > 0" @click="deleteDynamic(cargos2, index)"></i>
                            </div>
                        </div>
                        <hr v-if="cargos2.length > 1">
                    </div>
                </div>
                <span id="clasificador" @click="agregarCargo()" style="cursor: pointer"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar cargo
                </span>
            </div>
            <h6 class="tituloseccion">Carga de archivos</h6>
            <div id="seccion">
                <div class="row upload" v-for="item, index in fileInputsCount" :key="index">
                    <div class="col-2" v-if="$route.params.id != null">
                        <a :href="URL_API + item.ruta" target="_blank" rel="noopener noreferrer"><button type="button"
                                class="btn btn-sm ver"><i class="bi bi-eye"> ver</i></button></a>
                    </div>
                    <div class="col">
                        <!-- <SearchList @getTipoArhivo="getTipoArhivo" eventoCampo="getTipoArhivo" nombreItem="nombre"
                            :registros="fileInputsCount" :archivos="true" :index="index" @setTipoArchivo="setTipoArchivo"
                            placeholder="Seleccione una opción" :consulta="consulta_file[index]" /> -->
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" :disabled="true"
                                v-model="item.nombre"></textarea>
                        </div>
                        <span id="validate"
                            v-if="file[index] == undefined && index != 0 && index != 3 && tipo_cliente == 1 && submitted"
                            class="error">¡Por favor adjunte el archivo!</span>
                        <span id="validate" v-if="file[index] == undefined && tipo_cliente == 2 && submitted"
                            class="error">¡Por favor adjunte el archivo!</span>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" :id="'seleccionArchivos' + index"
                                :accept="fileInputsCount[index].tipo_archivo" @change="cargarArchivo($event, index)"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" @click="deleteFile(index)"
                                id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                        <!-- <span id="validate"
                        v-if="file[index] === undefined && submitted"
                        class="error">{{ mensaje_error }}</span> -->
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Información general</h6>
            <div id="seccion">
                <div class="row">
                    <h5>Información Social</h5>
                    <p style="text-align: justify;">Socios o Accionistas
                        Diligencie la información de los accionistas, socios o asociados con una participación igual o
                        superior al 5%. En el evento en que los accionistas, socios o asociados sean personas jurídicas,
                        anexar la composición patrimonial de dichas personas jurídicas. Anexar listado en caso de ser
                        necesario.</p>
                </div>
                <div class="accionista" v-for="item, index in accionistas" :key="index">
                    <div class="row">
                        <div class="col">
                            <SearchList nombreCampo="Tipo de Identificación: *"
                                @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                nombreItem="des_tip" :ordenCampo="2" :index="index" :registros="tiposIdentificacion"
                                @setTipoIdentificacion="setTipoIdentificacion" placeholder="Seleccione una opción"
                                :consulta="consulta_tipo_identificacion_ac[index]" />
                            <span id="validate" v-if="item.tipo_identificacion_id == '' && submitted" class="error">{{
                                mensaje_error }}</span>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Identificación: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.identificacion"
                                @input="item.identificacion = validarNumero(item.identificacion)" />
                            <span id="validate"
                                v-if="item.identificacion == '' && item.tipo_identificacion_id.trim() != '0' && item.tipo_identificacion_id.trim() != '' && submitted"
                                class="error">{{
                                    mensaje_error }}</span>
                        </div>
                        <!-- </div> -->
                        <!-- <div class="row" style="margin-bottom: 30px;"> -->
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Socio/Accionista: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.socio = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.socio" />
                            <span id="validate"
                                v-if="item.socio == '' && item.tipo_identificacion_id.trim() != '0' && item.tipo_identificacion_id.trim() != '' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Porcentaje Participación (%):</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" maxlength="10" v-model="item.participacion" />
                            <!-- @input="item.participacion = validarNumero(item.participacion)" -->
                            <span id="validate"
                                v-if="item.participacion == '' && item.tipo_identificacion_id.trim() != '0' && item.tipo_identificacion_id.trim() != '' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col-1 trash">
                            <i class="bi bi-trash-fill" v-if="index > 0" @click="deleteDynamic(accionistas, index)"></i>
                        </div>
                    </div>
                </div>
                <span id="clasificador" @click="agregarAccionista()" style="cursor: pointer;margin-bottom: 30px;"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar socio/accionista
                </span>
            </div>
            <h6 class="tituloseccion">1.3. Representante legal</h6>
            <div id="seccion">
                <div class="representante" v-for="item, index in representantes_legales" :key="index">
                    <div class="row">
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Representante(s) Legal(es): *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.nombre = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.nombre" />
                            <span id="validate"
                                v-if="item.nombre == '' && item.tipo_identificacion != '' && item.tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList nombreCampo="Tipo de Identificación: *"
                                @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                nombreItem="des_tip" :ordenCampo="3" :index="index" :registros="tiposIdentificacion"
                                @setTipoIdentificacion="setTipoIdentificacion" placeholder="Seleccione una opción"
                                :consulta="consulta_tipo_identificacion_rl[index]" />
                            <span id="validate" v-if="item.tipo_identificacion == '' && submitted" class="error">{{
                                mensaje_error }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.identificacion"
                                @input="item.identificacion = validarNumero(item.identificacion)" />
                            <span id="validate"
                                v-if="item.identificacion === '' && item.tipo_identificacion != '' && item.tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{
                                    mensaje_error }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Número celular:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="item.telefono"
                                @input="item.telefono = validarNumero(item.telefono)" />
                            <span id="validate"
                                v-if="item.telefono === '' && item.tipo_identificacion != '' && item.tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col-1 trash">
                            <i class="bi bi-trash-fill" v-if="index > 0"
                                @click="deleteDynamic(representantes_legales, index)"></i>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">correo electrónico</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.correo = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.correo" />
                            <span id="validate"
                                v-if="item.correo === '' && item.tipo_identificacion != '' && item.tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList nombreCampo="Pais de expedición: *" @getPaises="getPaises" eventoCampo="getPaises"
                                nombreItem="nombre" :registros="paises" @getDepartamentos="getDepartamentos"
                                placeholder="Seleccione una opción" :consulta="consulta_pais_rl[index]" />

                        </div>
                        <div class="col mb-3">
                            <SearchList nombreCampo="Departamento de expedición: *" nombreItem="nombre"
                                eventoCampo="getDepartamentos" :registros="departamentos" @getMunicipios="getMunicipios"
                                :ordenCampo="3" :index="index" placeholder="Seleccione una opción"
                                :consulta="consulta_departamento_rl[index]" />
                        </div>
                        <div class="col">
                            <SearchList nombreCampo="Ciudad de expedición: *" nombreItem="nombre" :registros="municipios"
                                @setMunicipios="setMunicipios" eventoCampo="setMunicipios" :ordenCampo="3" :index="index"
                                placeholder="Seleccione una opción" :consulta="consulta_municipio_rl[index]" />
                            <span id="validate"
                                v-if="item.municipio_id === '' && item.tipo_identificacion != '' && item.tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                    </div>
                </div>
                <span id="clasificador" @click="agregarRepresentanteLegal()" style="cursor: pointer"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar representante legal
                </span>
            </div>
            <h6 class="tituloseccion">1.4. Miembros Junta Directiva</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">La empresa cuenta con Junta
                            directiva:</label>
                    </div>
                    <div style="display: flex;">
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" :value="true" v-model="junta_directiva"
                                name="radio3" id="radio3">
                            Si
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" :value="false" v-model="junta_directiva"
                                name="radio3" id="radio3" checked>
                            No
                        </div>
                    </div>
                </div>
                <!-- <div class="row"> -->
                <div class="row" v-if="junta_directiva == true">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Nombres y apellidos: *</label>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Tipo de identificación: *</label>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Identificación: *</label>
                    </div>
                </div>
                <div v-if="junta_directiva == true">
                    <div class="row" v-for="item, index in miembros_Junta" :key="index">
                        <div class="col">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="150" @input="item.nombre = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.nombre" />
                            <span id="validate"
                                v-if="item.nombre == '' && item.tipo_identificacion_id != '' && item.tipo_identificacion_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                @setTipoIdentificacion="setTipoIdentificacion" nombreItem="des_tip"
                                :registros="tiposIdentificacion" :ordenCampo="4" :index="index"
                                :consulta="consulta_tipo_identificacion_miembros_junta[index]"
                                placeholder="Seleccione una opción" />
                            <span id="validate" v-if="item.tipo_identificacion_id === '' && submitted" class="error">{{
                                mensaje_error }}</span>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.identificacion"
                                @input="item.identificacion = validarNumero(item.identificacion)" />
                            <span id="validate"
                                v-if="item.identificacion == '' && item.tipo_identificacion_id != '' && item.tipo_identificacion_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col-1 trash">
                            <i class="bi bi-trash-fill" v-if="index > 0" @click="deleteDynamic(miembros_Junta, index)"></i>
                        </div>
                    </div>
                    <span id="clasificador" @click="agregarMiembrosJunta()" style="cursor: pointer"><i
                            class="bi bi-plus-circle-fill"></i>
                        Agregar miembro junta directiva
                    </span>
                    <!-- </div> -->
                </div>
            </div>
            <h6 class="tituloseccion">1.5. Calidad tributaria</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Responsable de Impuestos a las Ventas: *" nombreItem="nombre"
                            @getAfirmacionNegacion="getAfirmacionNegacion" eventoCampo="getAfirmacionNegacion"
                            :registros="afirmacionNegacion" @setAfirmacionNegacion="setAfirmacionNegacion" :ordenCampo="1"
                            :consulta="consulta_responsable_impuesto_ventas" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="responsable_impuesto_ventas == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Correo para factura electrónica: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="correo_factura_electronica = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="correo_factura_electronica" />
                        <span id="validate"
                            v-if="correo_factura_electronica === '' && responsable_impuesto_ventas == 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal para facturación: *" eventoCampo="getSucursales"
                            @getSucursales="getSucursales" nombreItem="nom_suc" :registros="sucursales"
                            placeholder="Seleccione una opción" :consulta="consulta_sucursal_facturacion" />
                        <span id="validate" v-if="sucursal === '' && responsable_impuesto_ventas == 1 && submitted"
                            class="error">{{
                                mensaje_error }}</span>
                    </div>
                </div>
                <div class="row" v-for="item, index in calidad_tributaria" :key="index">
                    <div class="col">
                        <SearchList :nombreCampo="item.nombre" @getAfirmacionNegacion="getAfirmacionNegacion"
                            eventoCampo="getAfirmacionNegacion" nombreItem="nombre"
                            @setAfirmacionNegacion="setAfirmacionNegacion" :orden-campo="2" :index="index"
                            :registros="afirmacionNegacion" placeholder="Seleccione una opción"
                            :consulta="consulta_calidad_tributaria[index]" />
                        <span id="validate" v-if="item.opcion == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de resolución:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="item.numero_resolucion" />
                        <span id="validate"
                            v-if="item.numero_resolucion == '' && calidad_tributaria[index].opcion == 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Fecha</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="item.fecha" />
                        <span id="validate" v-if="item.fecha == '' && calidad_tributaria[index].opcion == 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.6. Datos del contador</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre completo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="nombre_completo_contador = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="nombre_completo_contador" />
                        <span id="validate"
                            v-if="nombre_completo_contador == '' && tipo_identificacion_contador != '' && tipo_identificacion_contador.trim() != '0' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            @setTipoIdentificacion="setTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                            :consulta="consulta_contador" nombreItem="des_tip" :ordenCampo="5"
                            :registros="tiposIdentificacion" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="tipo_identificacion_contador == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <!-- </div>
                <div class="row"> -->
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="identificacion_contador"
                            @input="identificacion_contador = validarNumero(identificacion_contador)" />
                        <span id="validate"
                            v-if="identificacion_contador == '' && tipo_identificacion_contador != '' && tipo_identificacion_contador.trim() != '0' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="telefono_contador"
                            @input="telefono_contador = validarNumero(telefono_contador)" />
                        <span id="validate"
                            v-if="telefono_contador == '' && tipo_identificacion_contador != '' && tipo_identificacion_contador.trim() != '0' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.6.1 Datos de tesorería</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre completo:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="nombre_completo_tesorero = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="nombre_completo_tesorero" />
                        <!-- <span id="validate"
                            v-if="nombre_completo_tesorero == '' && submitted"
                            class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="telefono_tesorero"
                            @input="telefono_tesorero = validarNumero(telefono_tesorero)" />
                        <!-- <span id="validate"
                            v-if="telefono_tesorero == '' && submitted"
                            class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            @input="correo_tesorero = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="correo_tesorero" />
                        <!-- <span id="validate"
                            v-if="correo_tesorero === '' && submitted"
                            class="error">{{ mensaje_error }}</span> -->
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.7. Datos Financieros (Ultimo periodo contable)</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Ingreso Mensual: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="ingreso_mensual"
                            @input="ingreso_mensual = validarNumero(ingreso_mensual)" />
                        <span id="validate" v-if="ingreso_mensual === '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Costos y Gastos Mensual: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="costos_gastos"
                            @input="costos_gastos = validarNumero(costos_gastos)" />
                        <span id="validate" v-if="costos_gastos === '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Activos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="activos" @input="activos = validarNumero(activos)" />
                        <span id="validate" v-if="activos === '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Otros Ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="otros_ingresos"
                            @input="otros_ingresos = validarNumero(otros_ingresos)" />
                        <span id="validate" v-if="otros_ingresos === '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Detalle de otros ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="detalle_otros_ingresos" />
                        <span id="validate" v-if="detalle_otros_ingresos === '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pasivos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="pasivos" @input="pasivos = validarNumero(pasivos)" />
                        <span id="validate" v-if="pasivos === '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Total Ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="total_ingresos"
                            @input="total_ingresos = validarNumero(total_ingresos)" />
                        <span id="validate" v-if="total_ingresos === '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Reintegro de costos y gastos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="reintegro_costos"
                            @input="reintegro_costos = validarNumero(reintegro_costos)" />
                        <span id="validate" v-if="reintegro_costos === '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Patrimonio: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="patrimonio"
                            @input="patrimonio = validarNumero(patrimonio)" />
                        <span id="validate" v-if="patrimonio === '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.8. Operaciones Internacionales</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Realiza operaciones en moneda extranjera: *" nombreItem="nombre"
                            @getAfirmacionNegacion="getAfirmacionNegacion" eventoCampo="getAfirmacionNegacion"
                            :consulta="consulta_operacion_moneda_extranjera" :registros="afirmacionNegacion"
                            @setAfirmacionNegacion="setAfirmacionNegacion" :orden-campo="3" placeholder="Seleccionar" />
                        <span id="validate" v-if="operaciones_modena_extranjera == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Que operaciones?: *"
                            @getTiposOperacionesInternacionales="getTiposOperacionesInternacionales"
                            eventoCampo="getTiposOperacionesInternacionales" nombreItem="nombre"
                            :consulta="consulta_operacion_internacional" :registros="tipos_operaciones_internacionales"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="tipo_operacion_internacional == '' && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.9. Referencias Bancarias</h6>
            <div id="seccion">
                <div v-for="item, index in referencias_bancarias" :key="index">
                    <div class="row">
                        <div class="col">
                            <SearchList nombreCampo="Banco" @getBancos="getBancos" eventoCampo="getBancos"
                                @setBanco="setBanco" :ordenCampo="1" :index="index" nombreItem="nom_ban" :registros="bancos"
                                placeholder="Seleccione una opción" :consulta="consulta_banco_rb[index]" />
                            <span id="validate" v-if="referencias_bancarias[index].banco_id == '' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.numero_cuenta"
                                @input="item.numero_cuenta = validarNumero(item.numero_cuenta)" />
                            <span id="validate"
                                v-if="item.numero_cuenta == '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList nombreCampo="Tipo cuenta" @getTipoCuentaBancos="getTipoCuentaBancos"
                                @setTipoCuentaBancos="setTipoCuentaBancos" eventoCampo="getTipoCuentaBancos" :ordenCampo="1"
                                :index="index" nombreItem="nombre" :registros="tipos_cuenta_bancos"
                                placeholder="Seleccione una opción" :consulta="consulta_tipo_cuenta_banco_rb[index]" />
                            <span id="validate"
                                v-if="referencias_bancarias[index].tipo_cuenta == '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col-1 trash">
                            <i class="bi bi-trash-fill" v-if="index > 0"
                                @click="deleteDynamic(referencias_bancarias, index)"></i>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Sucursal:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.sucursal = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.sucursal" />
                            <span id="validate"
                                v-if="item.sucursal == '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.telefono"
                                @input="item.telefono = validarNumero(item.telefono)" />
                            <span id="validate"
                                v-if="item.telefono == '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.contacto = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.contacto" />
                            <span id="validate"
                                v-if="item.contacto == '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                    </div>
                </div>
                <span id="clasificador" @click="agregarReferenciasBancarias()" style="cursor: pointer"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar referencia bancaria
                </span>
            </div>
            <h6 class="tituloseccion">1.10. Referencias Comerciales</h6>
            <div id="seccion">
                <div v-for="item, index in referencias_comerciales" :key="item.id">
                    <div class="row">
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nombre o Razón Social:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="200" @input="item.nombre = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.nombre" />
                            <!-- <span id="validate" v-if="item.nombre == '' && submitted" class="error">{{ mensaje_error
                            }}</span> -->
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.contacto = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.contacto" />
                            <!-- <span id="validate" v-if="item.contacto == '' && submitted" class="error">{{ mensaje_error
                            }}</span> -->
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.telefono"
                                @input="item.telefono = validarNumero(item.telefono)" />
                            <!-- <span id="validate" v-if="item.telefono == '' && submitted" class="error">{{ mensaje_error
                            }}</span> -->
                        </div>
                        <div class="col-1 trash">
                            <i class="bi bi-trash-fill" v-if="index > 0"
                                @click="deleteDynamic(referencias_comerciales, index)"></i>
                        </div>
                    </div>
                </div>
                <span id="clasificador" @click="agregarReferenciasComerciales()" style="cursor: pointer"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar referencias comerciales
                </span>
            </div>
            <h6 class="tituloseccion">2. DECLARACIONES Y AUTORIZACIONES</h6>
            <div id="seccion">
                <div class="row">
                    <p>Cumplo con alguno de los siguientes atributos o tengo un vínculo familiar (cónyuge o
                        compañero
                        permanente, padres, abuelos, hijos, nietos, cuñados, adoptantes o adoptivos) con una persona
                        que:</p>
                    <ul>
                        <li>
                            <p>Este expuesta políticamente según la legislación nacional</p>
                        </li>
                        <li>
                            <p>Tenga la representación legal de un organismo internacional</p>
                        </li>
                        <li>
                            <p>Goce de reconocimiento público generalizado</p>
                        </li>
                        <li>
                            <p>En afirmativo indique que le aplica y diligencie la siguiente información</p>
                        </li>
                    </ul>
                    <div style="display: flex;">
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" :value="true"
                                v-model="declaraciones_autorizaciones" name="radio1" id="radio1">
                            Si acepto
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" :value="false"
                                v-model="declaraciones_autorizaciones" name="radio1" id="radio1" checked>
                            No acepto
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">2.1 Datos de personas expuestas
                politicamente</h6>
            <div id="seccion">
                <div class="row" v-for="item, index in personas_expuestas" :key="item.id">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Nombres y apelldos:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="item.nombre = formatInputUpperCase($event.target.value)" aria-describedby="emailHelp"
                            v-model="item.nombre" />
                        <span id="validate"
                            v-if="item.nombre == '' && personas_expuestas[index].tipo_identificacion_id != '' && personas_expuestas[index].tipo_identificacion_id.trim() != '0' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            @setTipoIdentificacion="setTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                            nombreItem="des_tip" :ordenCampo="6" :index="index" :registros="tiposIdentificacion"
                            placeholder="Seleccione una opción" :consulta="consultas_personas_expuestas[index]" />
                        <span id="validate" v-if="personas_expuestas[index].tipo_identificacion_id == '' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de identificacion:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="item.identificacion"
                            @input="item.identificacion = validarNumero(item.identificacion)" />
                        <span id="validate"
                            v-if="item.identificacion == '' && personas_expuestas[index].tipo_identificacion_id != '' && personas_expuestas[index].tipo_identificacion_id.trim() != '0' && submitted"
                            class="error">{{ mensaje_error
                            }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Parentesco:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="50"
                            @input="item.parentesco = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="item.parentesco" />
                        <span id="validate"
                            v-if="item.parentesco == '' && personas_expuestas[index].tipo_identificacion_id != '' && personas_expuestas[index].tipo_identificacion_id.trim() != '0' && submitted"
                            class="error">{{ mensaje_error
                            }}</span>
                    </div>
                    <div class="col-1 trash">
                        <i class="bi bi-trash-fill" v-if="index > 0" @click="deleteDynamic(personas_expuestas, index)"></i>
                    </div>
                </div>
                <span id="clasificador" @click="agregarPersonasExpuestas()" style="cursor: pointer"><i
                        class="bi bi-plus-circle-fill"></i>
                    Agregar persona expuesta politicamente
                </span>
            </div>
            <h6 class="tituloseccion">2.2. Declaración de Origen de Fondos</h6>
            <div id="seccion">
                <div class="row">
                    <p>Quien suscribe la presente solicitud obrando en nombre propio y/o en representación legal de la
                        persona jurídica que represento, de manera voluntaria y dando certeza de que todo lo aquí consignado
                        es cierto, veraz y verificable, realizo la siguiente declaración de fuente de bienes y/o fondos, con
                        el propósito de dar cumplimiento a lo señalado al respecto a las normas legales vigentes y
                        concordantes.</p>
                    <ul>
                        <li>
                            <p>A. Declaro que yo y/o la persona jurídica que represento es beneficiaria efectiva de los
                                recursos y son compatibles con mis actividades y situación patrimonial.</p>
                        </li>
                        <li>
                            <p>B. Que los recursos que se entreguen de mi parte en desarrollo de cualquiera de las
                                relaciones contractuales que tenga con los destinatarios de la presente declaración,
                                provienen de mi patrimonio y/o de la sociedad que represento y no de terceros, y se derivan
                                de las siguientes fuentes: (detalle de la actividad o negocio del que provienen los
                                recursos)</p>
                        </li>
                    </ul>
                    <div class="col">
                        <SearchList nombreCampo="Selecciones una opción" @getTipoOrigenFondos="getTipoOrigenFondos"
                            eventoCampo="getTipoOrigenFondos" nombreItem="nombre" :registros="tipos_origen_fondos"
                            placeholder="Origen de fondos" :consulta="consulta_origen_fondos" />
                        <span id="validate" v-if="tipo_origen_fondo == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Otra ¿Cuál?:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="otro_tipo_origen_fondos = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="otro_tipo_origen_fondos" />
                    </div>
                    <ul>
                        <li>
                            <p>C. Declaro que los recursos no provienen de ninguna actividad ilícita de las contempladas en
                                el Código Penal Colombiano o en cualquier norma que lo modifique o adicione.</p>
                        </li>
                        <li>
                            <p>D. No se admitirá que terceros efectúen depósitos a mis cuentas y/o de la Entidad que
                                represento con fondos provenientes de las actividades ilícitas contempladas en el Código
                                penal Colombiano o en cualquier norma que lo modifique, sustituya o adicione, ni se
                                efectuarán transacciones destinadas a tales actividades o a favor de personas relacionadas
                                con las mismas</p>
                        </li>
                        <li>
                            <p>E. Los recursos que recibo de mis contrapartes principalmente los capto por (seleccione
                                máximo 2)</p>
                        </li>
                    </ul>
                    <div class="col">
                        <SearchList @getTipoOrigenMedios="getTipoOrigenMedios" eventoCampo="getTipoOrigenMedios"
                            @setTipoOrigenMedios="setTipoOrigenMedios" nombreItem="nombre" :ordenCampo="1"
                            :registros="tipos_origenes_medios" placeholder="seleccione una opción"
                            :consulta="consulta_origen_medios1" />
                        <span id="validate" v-if="tipo_origen_medios == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <div class="col">
                        <SearchList @getTipoOrigenMedios="getTipoOrigenMedios" eventoCampo="getTipoOrigenMedios"
                            @setTipoOrigenMedios="setTipoOrigenMedios" nombreItem="nombre" :ordenCampo="2"
                            :registros="tipos_origenes_medios" placeholder="seleccione una opción"
                            :consulta="consulta_origen_medios2" />
                        <span id="validate" v-if="otro_tipo_origen_medios == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <ul>
                        <li>
                            <p>F. Las operaciones que realizo por mi actividad implican un alto manejo de efectivo</p>
                        </li>
                    </ul>
                    <div class="col">
                        <SearchList nombreItem="nombre" @getAfirmacionNegacion="getAfirmacionNegacion"
                            eventoCampo="getAfirmacionNegacion" :registros="afirmacionNegacion"
                            @setAfirmacionNegacion="setAfirmacionNegacion" :ordenCampo="4"
                            placeholder="Seleccione una opción" :consulta="consulta_origen_manejo_efectivo" />
                        <span id="validate" v-if="alto_manejo_efectivo == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                    <p>En nombre propio y/o de mi representado, declaro que no estoy impedido para realizar cualquier tipo
                        de operación y que conozco y acepto las normas que regulan el comercio colombiano y me obligo a
                        cumplirlas. Conozco y acepto los riesgos que puedan presentarse frente a las instrucciones y órdenes
                        que imparta, derivados de la utilización de los medios y canales de distribución de productos y
                        servicios, tales como Internet, correos electrónicos u otros mecanismos similares, mensajería
                        instantánea, teléfono, fax, medios digitales entre otros.
                        Autorizo a realizar los traslados de recursos y/o valores, previo cumplimiento de los procedimientos
                        establecidos por la entidad; así mismo, autorizo la realización de transferencias bancarias y
                        conozco los riesgos de su utilización.
                        Conozco y acepto las políticas establecidas para todos los productos ofrecidos, incluyendo los
                        servicios de Internet. Bajo la gravedad de juramento manifiesto que todos los datos acá consignados,
                        incluidos los números de identificación tributaria, son ciertos, que la información que adjunto es
                        veraz, fidedigna, completa y verificable y autorizo su verificación ante cualquier persona natural o
                        jurídica, pública o privada, sin limitación alguna, desde ahora y mientras subsista alguna relación
                        comercial y que toda declaración falsa o inexacta podrá ser sancionada, por las autoridades de
                        conformidad con la legislación aplicable.
                        Me comprometo a actualizar la información y documentación de acuerdo con la solicitud que se me
                        haga, a proporcionar toda la información adicional y de apoyo que sea necesaria y requerida, por lo
                        menos cada año y cada vez que se presenten modificaciones respecto de cualquiera de mis datos, esto
                        con el fin de dar cumplimiento a la normatividad vigente para el efecto, y por tanto, autorizo,
                        entre otras, a reportar la información fiscal, a verificar la autenticidad de mis firmas y de mis
                        ordenantes y/o a validar los poderes y facultades de mis representantes. A su vez declaro que
                        asumiré la responsabilidad civil, administrativa y/o penal derivada de cualquier información
                        errónea, falsa o inexacta que llegaré a suministrar o que dejare de suministrar oportunamente.
                        De igual forma, declaro que resarciré a La empresa por cualquier multa, perdida o daño que pudiera
                        llegar a sufrir como consecuencia de la inexactitud o falsedad de dicha información
                        Autorizo a La empresa a suministrar la información contenida ente documento, al igual que sus
                        anexos, a las autoridades administrativas y gubernamentales correspondientes, incluidas las
                        autoridades de mi país de residencia o de nacionalidad, de conformidad con la regulación vigente,
                        entre ellos, los Convenios Internacionales firmados por Colombia.
                        Manifiesto que yo y/o la empresa que represento y sus empleados conocen bien las normas referentes a
                        la prevención del Lavado de Activos y Financiación del Terrorismo, todos aportamos con el fin de no
                        ser cómplices de la violación de las normas de esta ley. Igualmente, que no he pertenecido ni
                        pertenezco a ningún tipo de grupos ilegales al margen de la Ley, no les he auxiliado o colaborado en
                        el desarrollo de sus actividades ilícitas, como tampoco he realizado actividades de lavados de
                        activos en Colombia o fuera de ella y que los bienes que conforman mi patrimonio han sido adquiridos
                        por vías legales en desarrollo de mi profesión o actividad.
                        De la misma manera, declaro que no tengo vínculos de parentesco con personas que estén o hayan
                        estado incluidas en listas públicas como sospechosos de Lavado de Activos/Financiación de terrorismo
                        o las empresas de las cuales sean accionistas, o que desarrollen o hayan desarrollado, apoyado o
                        financiado cualquiera de las actividades descritas en el párrafo precedente.
                        Todos los datos aquí consignados y los documentos anexos a él, son ciertos, la información que
                        adjunto es veraz y verificable, y autorizo su verificación ante cualquier persona natural o
                        jurídica, privada o pública, sin limitación alguna, desde ahora y mientras subsista alguna relación
                        comercial con cualquiera de las entidades que pertenezcan a SAITEMP S.A. o con quien represente sus
                        derechos, y me comprometo a actualizar la información y/o documentación al menos una vez cada 2 años
                        o cada vez que se me indique. Así mismo, autorizo a SAITEMP S.A., o a quien represente sus derechos,
                        en forma permanente e irrevocable, para que con fines estadísticos y de información financiera o
                        comercial, consulte, informe, reporte, procese o divulgue, a las entidades de consulta de bases de
                        datos o Centrales de Información y Riesgo, todo lo referente a mi comportamiento como cliente en
                        general.</p>
                </div>
            </div>
            <h6 class="tituloseccion">2.4. Autorización de Tratamiento de Datos Personales</h6>
            <div id="seccion">
                <div class="row">
                    <p>La Sociedad SAITEMP S.A., en cumplimiento de lo definido por la Ley 1581 de 2012, el decreto
                        reglamentario 1377 de 2013 y nuestra política de protección de datos personales, le informan que los
                        datos personales que usted suministre en cualquiera de nuestros establecimientos en desarrollo de
                        cualquier operación comercial, serán tratados mediante el uso y mantenimiento de medidas de
                        seguridad técnicas, físicas y administrativas a fin de impedir que terceros no autorizados accedan a
                        los mismos, lo anterior de conformidad con lo establecido en la ley.
                        El responsable del tratamiento de sus datos personales es SAITEMP S.A. sociedad legalmente existente
                        de acuerdo con la leyes Colombianas, domiciliado en la ciudad de MEDELLÍN, en la CALLE 51 # 49-11
                        PISO 10, quien recogerá dichos datos a través de sus diferentes canales y serán usados para a)
                        Ofrecer o informarle productos b) Para hacerle llegar información publicitaria sobre promociones c)
                        Atender o formalizar cualquier solicitud relacionada con nuestro objeto social e) Controles
                        estadísticos sobre proveedores, clientes f) Establecer rotación de los empleados.
                        Usted podrá ejercer los derechos que la ley prevé, siguiendo los procedimientos establecidos en
                        nuestras políticas y procedimientos de Protección de datos Personales publicados en la página web de
                        la empresa, http://www.saitempsa.com, o solicitando la información que requiera a través de nuestro
                        correo misdatos@saitempsa.com o llamando al teléfono: (4) 4485744
                        Tenga en cuenta que el ejercicio de sus derechos no es requisito previo ni impide el ejercicio de
                        otros derechos y que cualquier modificación al presente aviso le será avisado a través de nuestra
                        página Web.
                        Leído lo anterior, autorizo de manera previa, explicita e inequívoca a la sociedad SAITEMP S.A.,
                        para el tratamiento de los datos personales suministrados por mi persona para las finalidades aquí
                        establecidas. Declaro que soy el titular de la información reportada en este formato para autorizar
                        el tratamiento de datos personales y que la he suministrado de forma voluntaria y es completa,
                        veraz, exacta y verídica.</p>
                    <div style="display: flex;">
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" v-model="tratamiento_datos_personales"
                                :value="true" name="radio5" id="radio5">
                            Si acepto
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" v-model="tratamiento_datos_personales"
                                :value="false" name="radio5" id="radio5" checked>
                            No acepto
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-3">
                <SearchList nombreCampo="Registros guardados" nombreItem="nombre" :registros="razon_social_cliente"
                    consulta="" eventoCampo="setFormularioGuardado" @setFormularioGuardado="setFormularioGuardado"
                    placeholder="Seleccionar" />
            </div> -->
            <div class="row">
                <div class="col">
                    <button v-if="userlogued != '' && userlogued.id == 1 || userlogued.id == 5" class="btn btn-success"
                        type="button" style="margin:30px" @click="generarPDF">Generar pdf</button>
                </div>
                <div class="col">
                    <button v-if="userlogued == '' || userlogued.id == 1 || userlogued.id == 5" class="btn btn-success"
                        type="submit" style="margin:30px">Guardar</button>
                </div>
                <!-- <div class="col">
                    <button v-if="userlogued == '' || userlogued.id == 1 || userlogued.id == 5" class="btn btn-success"
                        type="button" style="margin:30px" @click="guardadoParcial">Guardado parcial</button>
                </div> -->
            </div>


        </form>
    </div>
</template>
<script>
import axios from 'axios';
import SearchList from './SearchList.vue';
import SearchTable from './SearchTable.vue';
import ListaMultiple from './ListaMultiple.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EditorTextoHtml from './EditorTextoHtml.vue';

export default {

    components: {
        SearchList,
        SearchTable,
        ListaMultiple,
        EditorTextoHtml
    },
    mixins: [],
    props: {
        userlogued: {
            default: '',
        },
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            proveedor: false,
            cliente: false,
            cliente_proveedor: [],
            consulta_cliente_proveedor: '',
            tipo_cliente: '',
            tipo_proveedor: '',
            consulta_tipo_cliente: '',
            consulta_tipo_proveedor: '',
            tipo_clientes: [],
            tipo_proveedores: [],
            operacion: '',
            operaciones: [],
            consulta_operacion: '',
            contratacion_directa: false,
            atraccion_seleccion: false,
            tiposPersona: [],
            tipo_persona: '',
            consulta_tipo_persona: '',
            persona_natural: false,
            persona_juridica: false,
            tiposIdentificacion: [],
            consulta_tipo_identificacion: '',
            tipo_identificacion: '',
            numero_identificacion: '',
            fecha_expedicion: '',
            nit: '',
            digito_verificacion: '',
            razon_social: '',
            fecha_constitucion: '',
            empleados_empresa: '',
            codigos_ciiu: [],
            consulta_codigo_ciiu: '',
            codigo_ciiu_id: '',
            actividades_ciiu: [],
            consulta_actvidad_ciiu: '',
            actividad_ciiu: '',
            campos_actividad_ciiu: ['codigo_actividad', 'descripcion'],
            estratos: [],
            estrato: '',
            consulta_estrato: '',
            paises: [],
            pais: '',
            consulta_pais: '',
            departamentos: [],
            departamento: '',
            consulta_departamento: '',
            municipios: [],
            municipio: '',
            consulta_municipio: '',
            municipio_prestacion_servicio: '',
            consulta_municipio_prestacion_servicio: '',
            departamento_prestacion_servicio: '',
            consulta_departamento_prestacion_servicio: '',
            pais_prestacion_servicio: '',
            consulta_pais_prestacion_servicio: '',
            direccion_empresa: '',
            contacto_empresa: '',
            correo_electronico_empresa: '',
            telefono_empresa: '',
            celular_empresa: '',
            sociedades_comerciales: [],
            consulta_sociedad_comercial: '',
            sociedad_comercial: '',
            otra_cual: '',
            periodicidades_liquidacion: [],
            periodicidad_liquidacion_id: '',
            consulta_periodicidad_pago: '',
            plazo_pago: '',
            aiu_negociado: '',
            ejecutivos_comerciales: [],
            consulta_ejecutivo_comercial: '',
            ejecutivo_comercial: '',
            acuerdos_comerciales: '',
            consulta_jornada_laboral: '',
            jornadas_laborales: [],
            jornada_laboral: '',
            consulta_rotacion_personal: '',
            rotaciones_personal: [],
            riesgos_laborales: [],
            consulta_riesgo_laboral: [],
            riesgo_laboral: '',
            consulta_riesgo_cliente: '',
            cargos: [{ cargo: '', requisitos: [], examenes: [], riesgo: '' }],
            cargos2: [{ cargo: '', examenes: [], recomendaciones: [], funcion_cargo: '', riesgo_laboral_id: '' }],
            fileInputsCount: [],
            consulta_tipo_identificacion_ac: [],
            accionistas: [{ tipo_identificacion_id: '', identificacion: '', socio: '', participacion: '' }],
            representantes_legales: [{ nombre: '', tipo_identificacion: '', identificacion: '', municipio: '', municipio_id: '', correo: '', telefono: '' }],
            consulta_tipo_identificacion_rl: [],
            consulta_pais_rl: [],
            consulta_departamento_rl: [],
            consulta_municipio_rl: [],
            junta_directiva: false,
            miembros_Junta: [{ nombre: '', tipo_identificacion_id: '', identificacion: '' }],
            consulta_tipo_identificacion_miembros_junta: [],
            consulta_responsable_impuesto_ventas: '',
            responsable_impuesto_ventas: '',
            correo_factura_electronica: '',
            consulta_sucursal_facturacion: '',
            sucursales: [],
            calidad_tributaria: [
                { nombre: '¿Es Gran Contribuyente?:', opcion: '', numero_resolucion: '', fecha: '' },
                { nombre: '¿Es Auto-Retenedor?', opcion: '', numero_resolucion: '', fecha: '' },
                { nombre: '¿Exento de Impuesto a la Renta?', opcion: '', numero_resolucion: '', fecha: '' },
            ],
            consulta_calidad_tributaria: [],
            nombre_completo_contador: '',
            consulta_contador: '',
            tipo_identificacion_contador: '',
            identificacion_contador: '',
            telefono_contador: '',
            nombre_completo_tesorero: '',
            telefono_tesorero: '',
            correo_tesorero: '',
            ingreso_mensual: '',
            costos_gastos: '',
            activos: '',
            otros_ingresos: '',
            detalle_otros_ingresos: '',
            pasivos: '',
            total_ingresos: '',
            reintegro_costos: '',
            patrimonio: '',
            consulta_operacion_moneda_extranjera: '',
            operaciones_modena_extranjera: '',
            tipo_operacion_internacional: '',
            consulta_operacion_internacional: '',
            tipos_operaciones_internacionales: [],
            bancos: [],
            referencias_bancarias: [{ banco_id: '', numero_cuenta: '', tipo_cuenta: '', sucursal: '', telefono: '', contacto: '' }],
            consulta_banco_rb: [],
            consulta_tipo_cuenta_banco_rb: [],
            tipos_cuenta_bancos: [],
            referencias_comerciales: [{ nombre: '', contacto: '', telefono: '' }],
            declaraciones_autorizaciones: false,
            personas_expuestas: [{ nombre: '', tipo_identificacion_id: '', identificacion: '', parentesco: '' }],
            consultas_personas_expuestas: [],
            tipos_origen_fondos: [],
            tipo_origen_fondo: '',
            consulta_origen_fondos: '',
            otro_tipo_origen_fondos: '',
            tipos_origenes_medios: [],
            tipo_origen_medios: '',
            otro_tipo_origen_medios: '',
            consulta_origen_medios1: '',
            consulta_origen_medios2: '',
            alto_manejo_efectivo: '',
            consulta_origen_manejo_efectivo: '',
            tratamiento_datos_personales: false,
            afirmacionNegacion: [],
            requisitos: [],
            tiposArchivo: [],
            requisitosList: [],
            examenFilter: [],
            otra: '',
            banco: '',
            tipo_cuenta_banco: '',
            rotacion_personal: '',
            sucursal: '',
            hover: false,
            examenesList: [],
            examenes: [],
            verLista: 1,
            fileInputsCountCopia: [],
            file: [],
            id_archivo: [],
            consulta_file: [],
            validate: [],
            guardar: false,
            cont: true,
            submitted: false,
            mensaje_error: '¡Este campo debe ser diligenciado!',
            tipo_archivo_: '',
            registroCliente: {},
            cliente_existe: false,
            loading: false,
            limite: 3 * 1024 * 1024,
            riesgos: [],
            tipo_cargo: [],
            subcategoria_cargos: [],
            arry_subcategoria_cargos: [],
            lista_cargos: [],
            array_lista_cargos: [],
            lista_examenes: [],
            array_lista_examenes: [],
            lista_recomendaciones: [],
            array_lista_recomendaciones: [],
            categoria_cargo_id: '',
            // consulta_cargos:[]
            consulta_subcategoria_cargos: [],
            consulta_lista_cargos: [],
            consulta_textohtml: [],
            enviar_correo: false,
            tipo_cargos: [],
            formularios_guardados: [],
            razon_social_cliente: []

        }
    },
    computed: {

    },
    watch: {
        $route() {
            this.limpiarformulario()
        },
        // tipo_cargo() {
        //     this.getSubCategoriaCargo(this.tipo_cargo)
        // }

    },
    mounted() {

    },

    created() {
        const urlCompleta = window.location.href;
        if (urlCompleta.includes('debidadiligencia.saitempsa.com')) {
            this.URL_API = 'http://debidadiligencia.saitempsa.com:8484/aplicaciones/api/public/'
        }
        this.estabilidad_laboral == false
        this.getExamenes()
        this.getRequsitos()
        this.fileInputsCountCopia = [...this.fileInputsCount]
        if (this.$route.params.id != undefined && this.$route.path != '/formularioregistro') {
            this.loading = true
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            document.body.style.overflow = 'hidden';
            this.consultaFormulario(this.$route.params.id)
        }
        this.getRiesgosLaborales()
        this.getCategoriaCargo()
        // var self = this
        // if (localStorage.getItem("cliente") != null && localStorage.getItem("cliente") != '') {
        //     self.formularios_guardados = JSON.parse(localStorage.getItem("cliente"))
        //     self.razon_social_cliente = []
        //     self.formularios_guardados.forEach(function (item,index) {
        //         self.razon_social_cliente.push({ codigo: index, nombre: item.razon_social })
        //     })
        // }
    },
    methods: {
        // setFormularioGuardado(item = null) {
        //     var self = this
        //     if (item != null) {
        //         this.formularios_guardados.forEach(function (item2) {
        //             if (item2.razon_social == item.nombre) {
        //                 self.llenarFormularioGuardado(item2)
        //             }
        //         });
        //     }

        // },
        // guardadoParcial() {
        //     var self = this
        //     this.crearCliente()
        //     if (localStorage.getItem("cliente") === null || localStorage.getItem("cliente") === '') {
        //         self.formularios_guardados.push(self.registroCliente)
        //         localStorage.setItem("cliente", JSON.stringify(self.formularios_guardados));
        //     } else {
        //         self.formularios_guardados = (JSON.parse(localStorage.getItem("cliente")))
        //         self.formularios_guardados.push(self.registroCliente)
        //         localStorage.setItem("cliente", JSON.stringify(self.formularios_guardados));
        //         // console.log(self.formularios_guardados)

        //         // self.formularios_guardados.forEach(function (item, index) {
        //         //     if (item.nit == self.registroCliente.nit || item.numero_identificacion == self.registroCliente.numero_identificacion) {
        //         //         self.formularios_guardados.splice(index, 1, JSON.stringify(self.registroCliente))
        //         //         localStorage.setItem("cliente", self.formularios_guardados);
        //         //     } else {
        //         //         self.formularios_guardados.push(JSON.stringify(self.registroCliente))
        //         //         localStorage.setItem("cliente", self.formularios_guardados);
        //         //     }
        //         // })

        //     }
        //     self.razon_social_cliente = []
        //     self.formularios_guardados.forEach(function (item, index) {
        //         self.razon_social_cliente.push({ codigo: index, nombre: item.razon_social })
        //     })

        // },
        retornoTexto(index, texto) {
            this.cargos2[index].funcion_cargo = texto
        },
        getCategoriaCargo() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/categoriacargo", config)
                .then(function (result) {
                    self.tipo_cargos = result.data

                });
        },
        getSubCategoriaCargo(id, index = null) {
            if (index != null) {
                if (this.cargos2[index].cargo != '') {
                    this.consulta_subcategoria_cargos[index] = ' '
                    this.consulta_lista_cargos[index] = ' '
                    this.cargos2[index].cargo = ''
                }


                this.array_lista_cargos[index] = []
                this.arry_subcategoria_cargos[index] = []
                this.array_lista_examenes[index] = []
                this.cargos2[index].examenes = []
            }

            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/subcategoriacargo/" + id, config)
                .then(function (result) {
                    self.arry_subcategoria_cargos.splice(index, 1, result.data)

                });
        },
        getListaCargos(item = null, index = null) {
            if (item != null) {
                this.categoria_cargo_id = item.id
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/listacargos/" + item.id, config)
                    .then(function (result) {
                        self.array_lista_cargos.splice(index, 1, result.data)

                    });
            }
        },
        getExamenesRecomendaciones(item = null, index = null) {
            if (index != null) {
                this.cargos2[index].cargo = item.id
            }
            this.getListaRecomendaciones(index)
            this.getListaExamenes(index)
        },
        getListaExamenes(index = null) {
            if (index != null) {
                // this.cargos2[index].cargo = item.id
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/listaexamenes/" + this.categoria_cargo_id, config)
                    .then(function (result) {
                        self.array_lista_examenes.splice(index, 1, result.data)
                        self.cargos2[index].examenes = result.data

                    });
            }
        },
        getListaRecomendaciones(index = null) {
            if (index != null) {
                //     console.log(item)
                // this.cargos2[index].cargo = item.id
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/listarecomendaciones/" + this.categoria_cargo_id, config)
                    .then(function (result) {
                        self.array_lista_recomendaciones.splice(index, 1, result.data)
                        self.cargos2[index].recomendaciones = result.data

                    });
            }
        },
        getCliente(id, tipo_id) {
            if (id.trim() != '') {
                let self = this;
                let config = this.configHeader();
                return axios
                    .get(self.URL_API + "api/v1/clienteexist/" + id + '/' + tipo_id, config)
                    .then(function (result) {
                        if (result.data.nit != undefined && self.$route.params.id == undefined) {
                            self.showAlert('El nit ingresado ya se encuentra registrado en nuestra base de datos', 'error')
                            self.cliente_existe = true
                            return

                        } else if (result.data.numero_identificacion != undefined && self.$route.params.id == undefined) {
                            self.showAlert('El número de identificación ingresado ya se encuentra registrado en nuestra base de datos', 'error')
                            self.cliente_existe = true
                            return
                        } else {
                            self.cliente_existe = false
                            return
                        }
                    });
            }

        },
        calcularDigitoVerificacion(myNit) {
            var vpri,
                x,
                y,
                z;

            // Procedimiento
            vpri = new Array(16);
            z = myNit.length;

            vpri[1] = 3;
            vpri[2] = 7;
            vpri[3] = 13;
            vpri[4] = 17;
            vpri[5] = 19;
            vpri[6] = 23;
            vpri[7] = 29;
            vpri[8] = 37;
            vpri[9] = 41;
            vpri[10] = 43;
            vpri[11] = 47;
            vpri[12] = 53;
            vpri[13] = 59;
            vpri[14] = 67;
            vpri[15] = 71;

            x = 0;
            y = 0;
            for (var i = 0; i < z; i++) {
                y = (myNit.substr(i, 1));

                x += (y * vpri[z - i]);
            }

            y = x % 11;

            this.digito_verificacion = (y > 1) ? 11 - y : y;
            console.log('')
        },
        generarPDF() {
            const elemento = document.getElementById('contenedor-formulario');

            html2canvas(elemento).then((canvas) => {
                const contenidoDataURL = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'A3');

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const margenHorizontal = 10;
                const imagenWidth = pdfWidth - 2 * margenHorizontal;
                const imagenHeight = (imagenWidth * canvas.height) / canvas.width;

                const contenidoHeight = elemento.offsetHeight;
                const margenSuperior = 10;
                const margenInferior = 10;
                const areaImpresionHeight = pdf.internal.pageSize.getHeight() - margenSuperior - margenInferior;

                let contenidoRestante = contenidoHeight;
                let paginaActual = 0;

                while (contenidoRestante > 0) {
                    const alturaPagina = Math.min(areaImpresionHeight, contenidoRestante);
                    const desplazamientoVertical = -(areaImpresionHeight * paginaActual) + margenSuperior;
                    pdf.addImage(
                        contenidoDataURL,
                        'PNG',
                        margenHorizontal,
                        desplazamientoVertical,
                        imagenWidth,
                        imagenHeight
                    );
                    contenidoRestante -= alturaPagina;

                    paginaActual++;

                    if (contenidoRestante > 0) {
                        pdf.addPage();
                    }
                }
                pdf.deletePage(paginaActual);
                pdf.deletePage(paginaActual - 1);


                // Eliminar páginas en blanco adicionales
                const paginasTotales = pdf.internal.getNumberOfPages();
                if (paginaActual < paginasTotales) {
                    for (let i = paginasTotales; i > paginaActual; i--) {
                        pdf.deletePage(i);
                    }
                }

                pdf.save('archivo.pdf');
            });
        },
        formatInput(value) {
            const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return formattedValue;

        },
        formatInputCamelCase(value) {
            return value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        formatInputLowerCase(value) {
            const formattedValue = value.toLowerCase();
            return formattedValue;
        },
        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        cargarArchivo(event, index) {
            const file = event.target.files[0];
            this.file[index] = file;
        },
        deleteFile(index) {
            this.file.splice(index, 1)
            document.getElementById("seleccionArchivos" + index).value = ''

        },
        guardarArchivos(id) {
            let self = this;
            let config = this.configHeader();
            const document = new FormData();
            var bandera = 0
            this.file.forEach(function (item, index) {
                if (item.size > self.limite) {
                    self.showAlert('El archivo' + item.name + 'es demasiado pesado, el limite es de 3MB', 'error')
                    bandera++
                }
                document.append('documento' + index, item)
                if (self.fileInputsCount[index].tipo_documento_id != undefined) {
                    document.append('id' + index, self.fileInputsCount[index].tipo_documento_id)
                } else {
                    document.append('id' + index, self.fileInputsCount[index].id)
                }
            })
            if (bandera <= 0) {
                axios
                    .post(self.URL_API + "api/v1/formulariocliente/doc/" + id, document, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status)
                    });
            } else {
                axios
                    .delete(self.URL_API + "api/v1/formulariocliente/" + id, config)
                    .then(function (result) {
                        console.log(result)
                        self.cliente_existe = false
                    });
            }
        },
        setLista(array, tipolista, index) {
            if (tipolista == 'examenes') {
                this.cargos[index].examenes = array
            } else if (tipolista == 'requisitos') {
                this.cargos[index].requisitos = array
            }
        },
        agregarCargo() {
            this.verLista = this.verLista + 1
            if (this.cargos.length <= 4) {
                this.cargos.push({ cargo: '', requisitos: [], examenes: [], riesgo: '' })
            }
            if (this.cargos2.length <= 9) {
                this.cargos2.push({ cargo: '', examenes: [], recomendaciones: [], funcion_cargo: '', riesgo_laboral_id: '' })
            }
        },
        agregarAccionista() {
            if (this.accionistas.length <= 4) {
                this.accionistas.push({ tipo_identificacion_id: '', identificacion: '', socio: '', participacion: '' })
            }
        },
        deleteDynamic(array, index) {
            array.splice(index, 1)
        },
        agregarRepresentanteLegal() {
            if (this.representantes_legales.length <= 4) {
                this.representantes_legales.push({ nombre: '', tipo_identificacion: '', identificacion: '', municipio: '', municipio_id: '', correo: '', telefono: '' })
            }
        },
        agregarMiembrosJunta() {
            if (this.miembros_Junta.length <= 4) {
                this.miembros_Junta.push({ nombre: '', tipo_identificacion_id: '', identificacion: '' })
            }
        },
        agregarReferenciasBancarias() {
            if (this.referencias_bancarias.length <= 1) {
                this.referencias_bancarias.push({ banco_id: '', numero_cuenta: '', tipo_cuenta: '', sucursal: '', telefono: '', contacto: '' })
            }
        },
        agregarReferenciasComerciales() {
            if (this.referencias_comerciales.length <= 1) {
                this.referencias_comerciales.push({ nombre: '', contacto: '', telefono: '' })
            }
        },
        agregarPersonasExpuestas() {
            if (this.personas_expuestas.length <= 9) {
                this.personas_expuestas.push({ nombre: '', tipo_identificacion_id: '', identificacion: '', parentesco: '' })
            }
        },
        swict() {
            setTimeout(() => {
                this.hover2 = false
            }, "0,1");
        },
        getAfirmacionNegacion() {
            this.afirmacionNegacion = [{ id: '1', nombre: 'Si' }, { id: '0', nombre: 'No' }]
        },
        setAfirmacionNegacion(item, campo, index) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.responsable_impuesto_ventas = item.id;
                        break
                    case 2:
                        this.calidad_tributaria[index].opcion = item.id;
                        break
                    case 3:
                        this.operaciones_modena_extranjera = item.id;
                        break
                    case 4:
                        this.alto_manejo_efectivo = item.id;
                        break
                }
            }
        },
        getTipoCliente(item = null) {
            if (item != null) {
                this.tipo_cliente = item.id
                if (this.tipo_cliente == 1) {
                    this.getTipoArchivo(item.id)
                } else {
                    this.operacion = ''
                    this.contratacion_directa = false
                    this.atraccion_seleccion = false
                    this.consulta_operacion = ''
                    this.aiu_negociado = ''
                    this.consulta_ejecutivo_comercial = ''
                    this.acuerdos_comerciales = ''
                    this.jornada_laboral = ''
                    this.consulta_jornada_laboral = ''
                    this.rotacion_personal = ''
                    this.consulta_rotacion_personal = ''
                }
            }
            if (this.cliente_proveedor.length <= 0) {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipocliente", config)
                    .then(function (result) {
                        self.cliente_proveedor = result.data
                    });
            }
        },
        getTipoProveedor(item = null) {
            if (item != null) {
                this.tipo_proveedor = item.id
                this.getTipoArchivo(item.id)
            }
            if (this.tipo_proveedores.length <= 0) {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipoproveedor", config)
                    .then(function (result) {
                        result.data.forEach(function (item) {
                            if (item.nombre != 'Cliente') {
                                self.tipo_proveedores.push(item)
                            }
                        })
                    });
            }

        },
        getTipoArchivo(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/tipoarchivo/" + id, config)
                .then(function (result) {
                    self.fileInputsCount = result.data
                });

        },
        getOperacion(item = null) {
            if (item != null) {
                this.operacion = item.id;
            }
            // if (this.operacion == '') {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/operacion", config)
                .then(function (result) {
                    self.operaciones = result.data
                });
            // }
        },
        getTipoPersona(item = null) {
            if (item != null) {
                this.tipo_persona = item.id;
                this.persona_natural = item.id == 1 ? false : true
                this.opcionesTipoPersona(!this.persona_natural)
            }
            if (this.tiposPersona == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipopersona", config)
                    .then(function (result) {
                        self.tiposPersona = result.data
                    });
            }
        },
        opcionesTipoPersona(item) {
            var self = this
            if (item) {
                this.persona_natural = true
                this.persona_juridica = false
                this.nit = ''
                this.fecha_constitucion = ''
                this.digito_verificacion = ''
            } else {
                this.persona_natural = false
                this.persona_juridica = true
                this.fecha_expedicion = ''
                this.numero_identificacion = ''
                this.consulta_tipo_identificacion = ''
                this.tipo_identificacion = ''
                this.digito_verificacion = ''
                setTimeout(() => {
                    self.consulta_tipo_identificacion = 'No aplica'
                }, "10");
            }
        },
        getTipoIdentificacion() {
            if (this.tiposIdentificacion == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipodocumentolista", config)
                    .then(function (result) {
                        self.tiposIdentificacion = result.data
                    });
            }
        },
        getTipoArhivo() {
            self.tiposArchivo = this.fileInputsCount
        },
        setTipoArchivo(item, index) {
            let self = this
            this.id_archivo.splice(index, 1, item.id)
            if (typeof item == 'string') {
                this.fileInputsCountCopia.forEach(function (element) {
                    if (item == element.nombre) {
                        self.fileInputsCount.splice(index, 1, element)
                    }
                });
            }
            this.fileInputsCount.forEach(function (element, index) {
                if (item.id == element.id) {
                    self.fileInputsCount.splice(index, 1, 0)
                }
            });
        },
        setTipoIdentificacion(item = null, campo = null, index = null) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.tipo_identificacion = item.cod_tip;
                        break
                    case 2:
                        this.accionistas[index].tipo_identificacion_id = item.cod_tip;
                        break
                    case 3:
                        this.representantes_legales[index].tipo_identificacion = item.cod_tip;
                        break
                    case 4:
                        this.miembros_Junta[index].tipo_identificacion_id = item.cod_tip;
                        break
                    case 5:
                        this.tipo_identificacion_contador = item.cod_tip;
                        break
                    case 6:
                        this.personas_expuestas[index].tipo_identificacion_id = item.cod_tip;
                        break

                }
            }
        },
        getEstratos(item = null) {
            if (item != null) {
                this.estrato = item.id;
            }
            if (this.estratos == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/estrato", config)
                    .then(function (result) {
                        self.estratos = result.data
                    });
            }
        },
        getCodigosCiiu() {
            if (this.codigos_ciiu == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/codigociiu", config)
                    .then(function (result) {
                        self.codigos_ciiu = result.data
                    });
            }
        },
        getPaises() {
            if (this.paises == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/paises", config)
                    .then(function (result) {
                        self.paises = result.data
                    });
            }
        },
        getDepartamentos(item) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/departamentos/" + item.id, config)
                .then(function (result) {
                    self.departamentos = result.data
                });
        },
        getSociedadesComerciales(item = null) {
            if (item != null) {
                this.sociedad_comercial = item.id;
            }
            if (this.sociedades_comerciales == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/sociedadcomercial", config)
                    .then(function (result) {
                        self.sociedades_comerciales = result.data
                    });
            }
        },
        getMunicipios(item = null) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/municipios/" + item.id, config)
                .then(function (result) {
                    self.municipios = result.data
                });
        },
        getEjecutivos_comerciales(item = null) {
            if (item != null) {
                this.ejecutivo_comercial = item.cod_ven;
            }
            if (this.ejecutivos_comerciales == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/ejecutivocomercial", config)
                    .then(function (result) {
                        self.ejecutivos_comerciales = result.data
                    });
            }
        },
        getActividadesCiiu(item = null) {
            var id = ''
            if (item != null && item.codigo != undefined) {
                this.codigo_ciiu_id = item.codigo
                id = item.id
            } else {
                id = item
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/actividadciiu/" + id, config)
                .then(function (result) {
                    self.actividades_ciiu = result.data
                });
        },
        getJornadasLaborales(item = null) {
            if (item != null) {
                this.jornada_laboral = item.id;
            }
            if (this.jornadas_laborales == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/jornadalaboral", config)
                    .then(function (result) {
                        self.jornadas_laborales = result.data
                    });
            }
        },
        getRotacionesPersonal(item = null) {
            if (item != null) {
                this.rotacion_personal = item.id;
            }
            if (this.rotaciones_personal == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/rotacionpersonal", config)
                    .then(function (result) {
                        self.rotaciones_personal = result.data
                    });
            }
        },
        getRiesgosLaborales(item = null, index = null) {
            if (item != null && index != null) {
                this.cargos[index].riesgo = item.id;
                this.cargos2[index].riesgo_laboral_id = item.id;
            }
            if (item != null && index == null) {
                this.riesgo_laboral = item.id;
            }
            if (this.riesgos_laborales == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/riesgolaboral", config)
                    .then(function (result) {
                        self.riesgos_laborales = result.data
                    });
            }
        },
        getRiesgosLaborales2(item = null, index = null) {
            if (item != null) {
                this.cargos2[index].riesgo_laboral_id = item.id
            }
            var self = this
            self.riesgos = []
            var riesgo = ''
            this.actividades_ciiu.data.forEach(function (item) {
                self.riesgos_laborales.forEach(function (item2) {
                    if (item.codigo_actividad.split("")[0] == item2.id) {
                        if (riesgo != item2.nombre) {
                            self.riesgos.push({ id: item2.id, nombre: item2.nombre })
                            riesgo = item2.nombre
                        }
                    }
                })
            })
        },
        getExamenes(item = null) {
            if (item != null) {
                this.examenes = item.id;
            }
            if (this.examenesList == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/examen", config)
                    .then(function (result) {
                        self.examenesList = result.data
                    });
            }
        },
        getRequsitos(item = null) {
            if (item != null) {
                this.requisito = item.id;
            }
            if (this.requisitosList == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/requisito", config)
                    .then(function (result) {
                        self.requisitosList = result.data
                    });
            }
        },
        getPeriodicidadPago(item = null) {
            if (item != null) {
                this.periodicidad_liquidacion_id = item.id;
            }
            if (this.periodicidades_liquidacion == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/periodicidadliquidacion", config)
                    .then(function (result) {
                        self.periodicidades_liquidacion = result.data
                    });
            }
        },
        getBancos() {
            if (this.bancos == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/banco", config)
                    .then(function (result) {
                        self.bancos = result.data
                    });
            }
        },
        setBanco(item = null, campo = null, index = null) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.referencias_bancarias[index].banco_id = item.cod_ban;
                        break
                }
            }
        },
        getTipoCuentaBancos() {
            if (this.tipos_cuenta_bancos == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipocuentabanco", config)
                    .then(function (result) {
                        self.tipos_cuenta_bancos = result.data
                    });
            }
        },
        setTipoCuentaBancos(item, campo, index) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.referencias_bancarias[index].tipo_cuenta = item.id;
                        break
                }
            }
        },
        getSucursales(item = null) {
            if (item != null) {
                this.sucursal = item.cod_suc;
            }
            if (this.sucursales == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/sucursal", config)
                    .then(function (result) {
                        self.sucursales = result.data
                    });
            }
        },
        getTiposOperacionesInternacionales(item = null) {
            if (item != null) {
                this.tipo_operacion_internacional = item.id;
            }
            if (this.tipos_operaciones_internacionales == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipooperacioninternacional", config)
                    .then(function (result) {
                        self.tipos_operaciones_internacionales = result.data
                    });
            }
        },
        getTipoOrigenFondos(item = null) {
            if (item != null) {
                this.tipo_origen_fondo = item.id;
            }
            if (this.tipos_origen_fondos == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipoorigenfondo", config)
                    .then(function (result) {
                        self.tipos_origen_fondos = result.data
                    });
            }
        },
        getTipoOrigenMedios() {
            if (this.tipos_origenes_medios == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/tipoorigenmedio", config)
                    .then(function (result) {
                        self.tipos_origenes_medios = result.data
                    });
            }
        },
        setTipoOrigenMedios(item, campo) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.tipo_origen_medios = item.id;
                        break
                    case 2:
                        this.otro_tipo_origen_medios = item.id;
                        break
                }
            }
        },
        setMunicipios(item, campo, index) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.municipio = item.id;
                        break
                    case 2:
                        this.municipio_prestacion_servicio = item.id;
                        break
                    case 3:
                        this.representantes_legales[index].municipio_id = item.id;
                        break
                }
            }
        },
        setActividadesCiiu(item) {
            var self = this
            if (item != null) {
                self.actividad_ciiu = item.split(" ")[0]
                self.riesgos_laborales.forEach(function (item) {
                    if (item.id == self.actividad_ciiu.split("")[0]) {
                        self.riesgo_laboral = self.actividad_ciiu.split("")[0]
                        self.consulta_riesgo_cliente = item.nombre
                    }
                })
            }
        },
        filterResults(value, array, nombrearray) {
            const search = array.filter(item => item.nombre.toLowerCase().match(value.toLowerCase()));
            if (nombrearray == 'departamentos') {
                this.requisitosFilter = search
            } else {
                this.examenFilter = search
            }
        },
        confirmationMessage(title, btnConfirm, btnDenied, messageConfirm) {
            this.$swal({
                icon: 'warning',
                title: title,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: btnConfirm,
                denyButtonText: btnDenied,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.save()
                    this.showAlert(messageConfirm, 'success')
                } else if (result.isDenied) {
                    this.showAlert('Accion cancelada', 'info')
                }
            })
        },
        limpiarformulario() {
            this.cargos = [{ cargo: '', requisitos: [], examenes: [], riesgo: '' }]
            this.cargos2 = [{ cargo: '', examenes: [], recomendaciones: [], funcion_cargo: '', riesgo_laboral_id: '' }]
            for (let i = 0; i < this.cargos2.length; i++) {
                this.tipo_cargo[i] = ''
                this.categoria_cargo_id = ''
                this.consulta_subcategoria_cargos[i] = ''
                this.consulta_lista_cargos[i] = ''
                this.cargos2[i].cargo = ''
                this.consulta_textohtml[i] = ''
                this.consulta_riesgo_laboral[i] = ''
                this.array_lista_examenes[i] = []
                this.array_lista_recomendaciones[i] = []
            }
            this.tipo_cliente = ''
            this.cliente = false
            this.consulta_tipo_cliente = ''
            this.proveedor = false
            this.tipo_proveedor = ''
            this.tipo_proveedores = []
            this.cliente_proveedor = []
            this.consulta_cliente_proveedor = ''
            this.consulta_tipo_proveedor = ''
            this.tipo_clientes = []
            this.operacion = ''
            this.operaciones = []
            this.consulta_operacion = ''
            this.contratacion_directa = false
            this.atraccion_seleccion = false
            this.tiposPersona = []
            this.tipo_persona = ''
            this.consulta_tipo_persona = ''
            this.persona_natural = false
            this.persona_juridica = false
            this.tiposIdentificacion = []
            this.consulta_tipo_identificacion = ''
            this.tipo_identificacion = ''
            this.numero_identificacion = ''
            this.fecha_expedicion = ''
            this.nit = ''
            this.digito_verificacion = ''
            this.razon_social = ''
            this.fecha_constitucion = ''
            this.empleados_empresa = ''
            this.codigos_ciiu = []
            this.consulta_codigo_ciiu = ''
            this.codigo_ciiu_id = ''
            this.actividades_ciiu = []
            this.consulta_actvidad_ciiu = ''
            this.actividad_ciiu = ''
            this.campos_actividad_ciiu = ['codigo_actividad', 'descripcion']
            this.estratos = []
            this.estrato = ''
            this.consulta_estrato = ''
            this.paises = []
            this.pais = ''
            this.consulta_pais = ''
            this.departamentos = []
            this.departamento = ''
            this.consulta_departamento = ''
            this.municipios = []
            this.municipio = ''
            this.consulta_municipio = ''
            this.municipio_prestacion_servicio = ''
            this.consulta_municipio_prestacion_servicio = ''
            this.departamento_prestacion_servicio = ''
            this.consulta_departamento_prestacion_servicio = ''
            this.pais_prestacion_servicio = ''
            this.consulta_pais_prestacion_servicio = ''
            this.direccion_empresa = ''
            this.contacto_empresa = ''
            this.correo_electronico_empresa = ''
            this.telefono_empresa = ''
            this.celular_empresa = ''
            this.sociedades_comerciales = []
            this.consulta_sociedad_comercial = ''
            this.sociedad_comercial = ''
            this.otra_cual = ''
            this.periodicidades_liquidacion = []
            this.periodicidad_liquidacion_id = ''
            this.consulta_periodicidad_pago = ''
            this.plazo_pago = ''
            this.aiu_negociado = ''
            this.ejecutivos_comerciales = []
            this.consulta_ejecutivo_comercial = ''
            this.ejecutivo_comercial = ''
            this.acuerdos_comerciales = ''
            this.consulta_jornada_laboral = ''
            this.jornadas_laborales = []
            this.jornada_laboral = ''
            this.consulta_rotacion_personal = ''
            this.rotaciones_personal = []
            this.riesgos_laborales = []
            this.consulta_riesgo_laboral = []
            this.riesgo_laboral = ''
            this.consulta_riesgo_cliente = ''
            this.fileInputsCount = []
            this.consulta_tipo_identificacion_ac = []
            this.accionistas = [{ tipo_identificacion_id: '', identificacion: '', socio: '', participacion: '' }]
            this.representantes_legales = [{ nombre: '', tipo_identificacion: '', identificacion: '', municipio: '', municipio_id: '', correo: '', telefono: '' }]
            this.consulta_tipo_identificacion_rl = []
            this.consulta_pais_rl = []
            this.consulta_departamento_rl = []
            this.consulta_municipio_rl = []
            this.junta_directiva = false
            this.miembros_Junta = [{ nombre: '', tipo_identificacion_id: '', identificacion: '' }]
            this.consulta_tipo_identificacion_miembros_junta = []
            this.consulta_responsable_impuesto_ventas = ''
            this.responsable_impuesto_ventas = ''
            this.correo_factura_electronica = ''
            this.consulta_sucursal_facturacion = ''
            this.sucursales = []
            this.calidad_tributaria = [
                { nombre: '¿Es Gran Contribuyente?:', opcion: '', numero_resolucion: '', fecha: '' },
                { nombre: '¿Es Auto-Retenedor?', opcion: '', numero_resolucion: '', fecha: '' },
                { nombre: '¿Exento de Impuesto a la Renta?', opcion: '', numero_resolucion: '', fecha: '' },]
            this.consulta_calidad_tributaria = []
            this.nombre_completo_contador = ''
            this.consulta_contador = ''
            this.tipo_identificacion_contador = ''
            this.identificacion_contador = ''
            this.telefono_contador = ''
            this.nombre_completo_tesorero = ''
            this.telefono_tesorero = ''
            this.correo_tesorero = ''
            this.ingreso_mensual = ''
            this.costos_gastos = ''
            this.activos = ''
            this.otros_ingresos = ''
            this.detalle_otros_ingresos = ''
            this.pasivos = ''
            this.total_ingresos = ''
            this.reintegro_costos = ''
            this.patrimonio = ''
            this.consulta_operacion_moneda_extranjera = ''
            this.operaciones_modena_extranjera = ''
            this.tipo_operacion_internacional = ''
            this.consulta_operacion_internacional = ''
            this.tipos_operaciones_internacionales = []
            this.bancos = []
            this.referencias_bancarias = [{ banco_id: '', numero_cuenta: '', tipo_cuenta: '', sucursal: '', telefono: '', contacto: '' }]
            this.consulta_banco_rb = []
            this.consulta_tipo_cuenta_banco_rb = []
            this.tipos_cuenta_bancos = []
            this.referencias_comerciales = [{ nombre: '', contacto: '', telefono: '' }]
            this.declaraciones_autorizaciones = false
            this.personas_expuestas = [{ nombre: '', tipo_identificacion_id: '', identificacion: '', parentesco: '' }]
            this.consultas_personas_expuestas = []
            this.tipos_origen_fondos = []
            this.tipo_origen_fondo = ''
            this.consulta_origen_fondos = ''
            this.otro_tipo_origen_fondos = ''
            this.tipos_origenes_medios = []
            this.tipo_origen_medios = ''
            this.otro_tipo_origen_medios = ''
            this.consulta_origen_medios1 = ''
            this.consulta_origen_medios2 = ''
            this.alto_manejo_efectivo = ''
            this.consulta_origen_manejo_efectivo = ''
            this.tratamiento_datos_personales = false
            this.afirmacionNegacion = []
            this.requisitos = []
            this.tiposArchivo = []
            this.examenFilter = []
            this.otra = ''
            this.banco = ''
            this.tipo_cuenta_banco = ''
            this.rotacion_personal = ''
            this.sucursal = ''
            this.hover = false
            this.examenes = []
            this.verLista = 1
            this.fileInputsCountCopia = []
            this.file = []
            this.id_archivo = []
            this.consulta_file = []
            this.validate = []
            this.guardar = false
            this.cont = true
            this.submitted = false
            this.tipo_archivo_ = ''
            this.registroCliente = {}
            this.cliente_existe = false

        },
        valida_campos() {
            var self = this

            if (this.tipo_cliente == '') {
                this.showAlert('Error, debe diligenciar el tipo de cliente.', 'error')
                return true
            }
            if (this.tipo_cliente == 2 && this.tipo_proveedor == '') {
                this.showAlert('Error, debe diligenciar el tipo de proveedor.', 'error')
                return true
            }
            if (this.tipo_cliente == 1 && this.operacion == '') {
                this.showAlert('Error, debe diligenciar el tipo de operación.', 'error')
                return true
            }

            if (this.tipo_persona == '' && this.tipo_cliente == 1) {
                this.showAlert('Error, debe diligenciar el tipo de persona.', 'error')
                return true
            }
            if (this.tipo_persona == '' && this.tipo_cliente == 2) {
                this.showAlert('Error, debe diligenciar el tipo de persona.', 'error')
                return true
            }
            if (this.tipo_identificacion == '' && this.tipo_persona == 1) {
                this.showAlert('Error, debe diligenciar el tipo de identificacion.', 'error')
                return true
            }

            if (this.numero_identificacion == '' && this.tipo_persona == 1) {
                this.showAlert('Error, debe diligenciar el numero de identificacion.', 'error')
                return true
            }
            if (this.fecha_expedicion == '' && this.tipo_persona == 1) {
                this.showAlert('Error, debe diligenciar la fecha de expedicion.', 'error')
                return true
            }
            if (this.tipo_persona != 1 && this.nit == '') {
                this.showAlert('Error, debe diligenciar el campo NIT.', 'error')
                return true
            }
            if (this.contratacion_directa == false && this.atraccion_seleccion == false && this.tipo_cliente == 1) {
                this.showAlert('Error, debe seleccionar al menos un tipo de servicio y los campos obligatorios.', 'error')
                return true
            }

            if (this.cliente_existe) {
                this.showAlert('El nit o numero de documento ingresado ya se encuentra registrado en nuestra base de datos', 'error')
                return true
            }
            if (this.razon_social == '') {
                this.showAlert('Error, debe diligenciar el Nombre completo / Razón social.', 'error')
                return true
            }
            if (this.fecha_constitucion == '') {
                this.showAlert('Error, debe diligenciar la fecha de constitución.', 'error')
                return true
            }
            if (this.empleados_empresa == '') {
                this.showAlert('Error, debe diligenciar Cuantos empleados conforman la empresa.', 'error')
                return true
            }
            if (this.actividad_ciiu == '') {
                this.showAlert('Error, debe diligenciar la actividad ciiu.', 'error')
                return true
            }
            if (this.estrato == '') {
                this.showAlert('Error, debe diligenciar el Estrato socio económico (ubicación empresa).', 'error')
                return true
            }
            if (this.municipio == '' || this.municipio == undefined) {
                this.showAlert('Error, debe diligenciar el campo ciudad en informacion general.', 'error')
                return true
            }
            if (this.direccion_empresa == '') {
                this.showAlert('Error, debe diligenciar la dirección de la empresa en información general.', 'error')
                return true
            }
            if (this.contacto_empresa == '') {
                this.showAlert('Error, debe diligenciar la persona contacto empresa en información general.', 'error')
                return true
            }
            if (this.correo_electronico_empresa == '') {
                this.showAlert('Error, debe diligenciar el correo electrónico en información general.', 'error')
                return true
            }
            if (this.telefono_empresa == '') {
                this.showAlert('Error, debe diligenciar el teléfono empresa en información general.', 'error')
                return true
            }
            if (this.celular_empresa == '') {
                this.showAlert('Error, debe diligenciar el número celular en información general.', 'error')
                return true
            }
            if (this.sociedad_comercial == '') {
                this.showAlert('Error, debe diligenciar la actividad económica: sociedad comercial.', 'error')
                return true
            }
            if (this.periodicidad_liquidacion_id == '') {
                this.showAlert('Error, debe diligenciar la periodicidad de pago.', 'error')
                return true
            }
            if (this.plazo_pago == '') {
                this.showAlert('Error, debe diligenciar el plazo pago (días).', 'error')
                return true
            }
            if (this.municipio_prestacion_servicio == '' || this.municipio_prestacion_servicio == undefined) {
                this.showAlert('Error, debe diligenciar el campo ciudad prestación servicio.', 'error')
                return true
            }

            if (this.aiu_negociado == '' && this.tipo_cliente == 1) {
                this.showAlert('Error, debe diligenciar el AIU negociado.', 'error')
                return true
            }
            if (this.ejecutivo_comercial == '' && this.tipo_cliente == 1 || this.ejecutivo_comercial == undefined) {
                this.showAlert('Error, debe diligenciar el campo ejecutivo comercial.', 'error')
                return true
            }
            if (this.jornada_laboral == '' && this.tipo_cliente == 1 || this.jornada_laboral == undefined) {
                this.showAlert('Error, debe diligenciar el campo jornada laboral.', 'error')
                return true
            }

            if (this.rotacion_personal == '' && this.tipo_cliente == 1 || this.rotacion_personal == undefined) {
                this.showAlert('Error, debe diligenciar el campo rotación de personal.', 'error')
                return true
            }

            if (this.tipo_cliente != 2) {
                if (this.cargos2[0].cargo == '' || this.cargos2[0].riesgo_laboral_id == '') {
                    this.showAlert('Error, debe diligenciar los campos para cargos e ingresar minimo un cargo.', 'error')
                    return true
                }

                var contador = 0
                this.cargos2.forEach(function (item) {
                    if (item.cargo == '' || item.riesgo_laboral_id == '') {
                        contador++
                    }

                })
                if (contador > 0) {
                    self.showAlert('Error, debe diligenciar los campos para cargos.', 'error')
                    return true
                }
            }

            var mensaje_error = ''
            this.fileInputsCount.forEach(function (item, index) {

                if (item.nombre.includes("*") && self.file[index] == undefined) {
                    mensaje_error += item.nombre + ", "
                }
            })
            if (mensaje_error != '') {
                this.showAlert('Error, los siguientes archivos no fueron adjuntados. ' + mensaje_error, 'error')
                return true
            }
            this.file.forEach(function (item) {
                if (item.size > self.limite) {
                    self.showAlert('El archivo' + item.name + 'es demasiado pesado, el limite es de 3MB', 'error')
                    return true
                }
            })

            var valida_campo = 0
            var valida_campo_dependiente = 0
            this.accionistas.forEach(function (item) {
                if (item.tipo_identificacion_id == '' || item.tipo_identificacion_id == undefined) {
                    valida_campo++
                }
                if (item.identificacion == '' && item.socio == '' && item.participacion == '' && item.tipo_identificacion_id != 0) {
                    valida_campo_dependiente++
                }
            })

            if (valida_campo > 0) {
                self.showAlert('Error, debe diligenciar el tipo de identificacion para los accionistas', 'error')
                return true
            }
            if (valida_campo_dependiente > 0) {
                self.showAlert('Error, debe diligenciar los campos correspondientes para accionistas', 'error')
                return true
            }
            valida_campo = 0
            valida_campo_dependiente = 0
            this.representantes_legales.forEach(function (item) {
                if (item.tipo_identificacion == '' || item.tipo_identificacion == undefined) {
                    valida_campo++
                }
                if (item.municipio_id == '' || item.municipio_id == undefined) {
                    valida_campo++
                }
                if (item.nombre == '' && item.correo == '' && item.identificacion == '' && item.telefono == '' && item.tipo_identificacion != 0) {
                    valida_campo_dependiente++
                }

            })
            if (valida_campo > 0) {
                self.showAlert('Error, debe diligenciar los campos obligatorios para los representantes legales', 'error')
                return true
            }
            if (valida_campo_dependiente > 0) {
                self.showAlert('Error, debe diligenciar los campos correspondientes para los representantes legales', 'error')
                return true
            }

            if (this.responsable_impuesto_ventas == '') {
                this.showAlert('Error, debe diligenciar el campo responsable de impuesto a las ventas.', 'error')
                return true
            }
            if (this.correo_factura_electronica == '') {
                this.showAlert('Error, debe diligenciar el Correo para factura electrónica.', 'error')
                return true
            }
            if (this.sucursal == '') {
                this.showAlert('Error, debe seleccionar la sucursal de facturación.', 'error')
                return true
            }

            if (this.calidad_tributaria[0].opcion == '' || this.calidad_tributaria[0].opcion == undefined) {
                this.showAlert('Error, debe seleccionar el campo ¿es gran contribuyente?.', 'error')
                return true
            }
            if (this.calidad_tributaria[0].opcion == 1 && this.calidad_tributaria[0].numero_resolucion == '' && this.calidad_tributaria[0].fecha == '') {
                this.showAlert('Error, debe diligenciar el numero de resulucion y la fecha en calidad tributaria.', 'error')
                return true
            }
            if (this.calidad_tributaria[1].opcion == '' || this.calidad_tributaria[1].opcion == undefined) {
                this.showAlert('Error, debe seleccionar el campo ¿Es Auto-Retenedor?.', 'error')
                return true
            }
            if (this.calidad_tributaria[1].opcion == 1 && this.calidad_tributaria[1].numero_resolucion == '' && this.calidad_tributaria[1].fecha == '') {
                this.showAlert('Error, debe diligenciar el numero de resulucion y la fecha en calidad tributaria.', 'error')
                return true
            }
            if (this.calidad_tributaria[2].opcion == '' || this.calidad_tributaria[2].opcion == undefined) {
                this.showAlert('Error, debe seleccionar el campo ¿Exento de Impuesto a la Renta?.', 'error')
                return true
            }
            if (this.calidad_tributaria[2].opcion == 1 && this.calidad_tributaria[2].numero_resolucion == '' && this.calidad_tributaria[2].fecha == '') {
                this.showAlert('Error, debe diligenciar el numero de resulucion y la fecha en calidad tributaria.', 'error')
                return true
            }
            if (this.tipo_identificacion_contador == '' || this.tipo_identificacion_contador == undefined) {
                this.showAlert('Error, debe diligenciar el tipo de identificación en datos del contador.', 'error')
                return true
            }
            if (this.tipo_identificacion_contador != 0 && this.nombre_completo_contador == '' && this.identificacion_contador == '' && this.telefono_contador == '') {
                this.showAlert('Error, debe diligenciar todos los campos en datos del contador.', 'error')
                return true
            }
            if (this.ingreso_mensual == '') {
                this.showAlert('Error, debe diligenciar el ingreso mensual.', 'error')
                return true
            }
            if (this.costos_gastos == '') {
                this.showAlert('Error, debe diligenciar los costos y gastos mensual.', 'error')
                return true
            }
            if (this.activos == '') {
                this.showAlert('Error, debe diligenciar los activos.', 'error')
                return true
            }
            if (this.otros_ingresos == '') {
                this.showAlert('Error, debe diligenciar los otros Ingresos.', 'error')
                return true
            }
            if (this.detalle_otros_ingresos == '') {
                this.showAlert('Error, debe diligenciar el detalle de otros ingresos.', 'error')
                return true
            }
            if (this.pasivos == '') {
                this.showAlert('Error, debe diligenciar los ingresos pasivos.', 'error')
                return true
            }
            if (this.total_ingresos == '') {
                this.showAlert('Error, debe diligenciar el Total ingresos.', 'error')
                return true
            }
            if (this.reintegro_costos == '') {
                this.showAlert('Error, debe diligenciar el reintegro de costos y gastos.', 'error')
                return true
            }
            if (this.patrimonio == '') {
                this.showAlert('Error, debe diligenciar el Patrimonio.', 'error')
                return true
            }
            if (this.operaciones_modena_extranjera == '') {
                this.showAlert('Error, debe diligenciar si realiza operaciones en moneda extranjera.', 'error')
                return true
            }
            if (this.tipo_operacion_internacional == '') {
                this.showAlert('Error, debe diligenciar el tipo de operacion internacional.', 'error')
                return true
            }

            valida_campo = 0
            var valida_campos_bancarias = 0
            this.referencias_bancarias.forEach(function (item) {
                if (item.banco_id == '' || item.banco_id == undefined) {
                    valida_campo++
                }
                if (item.tipo_cuenta == '' || item.tipo_cuenta == undefined) {
                    valida_campo++
                }
                if (item.contacto == '' && item.numero_cuenta == '' && item.sucursal == '' && item.telefono == '' && item.banco_id != 0) {
                    valida_campos_bancarias++
                }
            })
            if (valida_campo > 0) {
                self.showAlert('Error, debe diligenciar los campos obligatorios para las referencias bancarias', 'error')
                return true
            }
            if (valida_campos_bancarias > 0) {
                self.showAlert('Error, debe diligenciar los campos correspondientes para referencias bancarias', 'error')
                return true
            }
            if (this.declaraciones_autorizaciones == false) {
                this.showAlert('Error, debe aceptar las declaraciones y autorizaciones.', 'error')
                return true
            }

            valida_campo = 0
            var valida_campos_expuestas = 0
            this.personas_expuestas.forEach(function (item) {
                if (item.tipo_identificacion_id == '' || item.tipo_identificacion_id == undefined) {
                    valida_campo++
                }
                if (item.nombre == '' && item.identificacion == '' && item.parentesco == '' && item.tipo_identificacion_id != 0) {
                    valida_campos_expuestas++
                }
            })
            if (valida_campo > 0) {
                self.showAlert('Error, debe diligenciar los campos obligatorios para personas expuestas', 'error')
                return true
            }
            if (valida_campos_expuestas > 0) {
                self.showAlert('Error, debe diligenciar los campos correspondientes para personas expuestas', 'error')
                return true
            }
            if (this.tipo_origen_fondo == '') {
                this.showAlert('Error, debe diligenciar el tipo de origen de los fondos.', 'error')
                return true
            }
            if (this.tipo_origen_medios == '') {
                this.showAlert('Error, debe diligenciar el tipo de origen de los medios .', 'error')
                return true
            }
            if (this.otro_tipo_origen_medios == '') {
                this.showAlert('Error, debe diligenciar el otro tipo de origen de los medios .', 'error')
                return true
            }
            if (this.alto_manejo_efectivo == '') {
                this.showAlert('Error, debe diligenciar si las operaciones que realiza por su actividad implican un alto manejo de efectivo .', 'error')
                return true
            }
            if (this.tratamiento_datos_personales == false) {
                this.showAlert('Error, debe aceptar el tratamiento de datos personales.', 'error')
                return true
            }
            this.calidad_tributaria.forEach(function (item) {
                if (item.opcion == '') {
                    return true
                }

            })
            return false

        },
        save() {
            this.submitted = true;

            if (this.valida_campos()) {
                return
            }

            try {
                let self = this;
                this.crearCliente()
                let config = this.configHeader();

                var id = this.$route.params.id
                if (id == undefined) {
                    axios
                        .post(self.URL_API + "api/v1/formulariocliente", this.registroCliente, config)
                        .then(function (result) {
                            if (result.data.message == 'ok') {
                                self.guardarArchivos(result.data.client)
                                self.cliente_existe = true
                            } else {
                                self.showAlert(result.data.message, result.data.status)
                            }
                        });
                } else {
                    axios
                        .post(self.URL_API + "api/v1/formulariocliente/" + id, this.registroCliente, config)
                        .then(function (result) {
                            if (result.data.message == 'ok') {
                                self.guardarArchivos(result.data.client)
                            }
                        });
                }
            } catch (error) {
                console.log(error)
            }

        },
        crearCliente() {
            this.registroCliente = {
                operacion: this.operacion,
                tipo_persona: this.tipo_persona,
                digito_verificacion: this.digito_verificacion,
                razon_social: this.razon_social,
                periodicidad_liquidacion_id: this.periodicidad_liquidacion_id,
                tipo_identificacion: this.tipo_identificacion,
                numero_identificacion: this.numero_identificacion,
                fecha_expedicion: this.fecha_expedicion,
                contratacion_directa: this.contratacion_directa,
                atraccion_seleccion: this.atraccion_seleccion,
                nit: this.nit,
                fecha_constitucion: this.fecha_constitucion,
                actividad_ciiu: this.actividad_ciiu,
                estrato: this.estrato,
                municipio: this.municipio,
                direccion_empresa: this.direccion_empresa,
                contacto_empresa: this.contacto_empresa,
                correo_electronico: this.correo_electronico_empresa,
                telefono_empresa: this.telefono_empresa,
                numero_celular: this.celular_empresa,
                sociedad_comercial: this.sociedad_comercial,
                otra_cual: this.otra_cual,
                acuerdo_comercial: this.acuerdo_comercial,
                aiu_negociado: this.aiu_negociado,
                plazo_pago: this.plazo_pago,
                vendedor: this.ejecutivo_comercial,
                empleados_empresa: this.empleados_empresa,
                jornada_laboral: this.jornada_laboral,
                rotacion_personal: this.rotacion_personal,
                riesgo_cliente: this.riesgo_laboral,
                junta_directiva: this.junta_directiva,
                responsable_inpuesto_ventas: this.responsable_impuesto_ventas,
                correo_factura_electronica: this.correo_factura_electronica,
                sucursal_facturacion: this.sucursal,
                declaraciones_autorizaciones: this.declaraciones_autorizaciones,
                tratamiento_datos_personales: this.tratamiento_datos_personales,
                tipo_operacion_internacional: this.tipo_operacion_internacional,
                operaciones_internacionales: this.operaciones_modena_extranjera,
                tipo_origen_fondo: this.tipo_origen_fondo,
                tipo_origen_medios: this.tipo_origen_medios,
                otro_tipo_origen_fondos: this.otro_tipo_origen_fondos,
                otro_tipo_origen_medios: this.otro_tipo_origen_medios,
                alto_manejo_efectivo: this.alto_manejo_efectivo,
                nombre_completo_contador: this.nombre_completo_contador,
                tipo_identificacion_contador: this.tipo_identificacion_contador,
                identificacion_contador: this.identificacion_contador,
                telefono_contador: this.telefono_contador,
                nombre_completo_tesorero: this.nombre_completo_tesorero,
                telefono_tesorero: this.telefono_tesorero,
                correo_tesorero: this.correo_tesorero,
                ingreso_mensual: this.ingreso_mensual,
                otros_ingresos: this.otros_ingresos,
                total_ingresos: this.total_ingresos,
                costos_gastos: this.costos_gastos,
                detalle_otros_ingresos: this.detalle_otros_ingresos,
                reintegro_costos: this.reintegro_costos,
                activos: this.activos,
                pasivos: this.pasivos,
                patrimonio: this.patrimonio,
                tipo_cliente_id: this.tipo_cliente,
                tipo_proveedor_id: this.tipo_proveedor,
                municipio_prestacion_servicio: this.municipio_prestacion_servicio
            }
            this.registroCliente.cargos = this.cargos
            this.registroCliente.cargos2 = this.cargos2
            this.registroCliente.accionistas = this.accionistas
            this.registroCliente.representantes_legales = this.representantes_legales
            this.registroCliente.miembros_Junta = this.miembros_Junta
            this.registroCliente.calidad_tributaria = this.calidad_tributaria
            this.registroCliente.referencias_bancarias = this.referencias_bancarias
            this.registroCliente.referencias_comerciales = this.referencias_comerciales
            this.registroCliente.personas_expuestas = this.personas_expuestas
        },
        consultaFormulario(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formulariocliente/" + id, config)
                .then(function (result) {
                    self.llenarFormulario(result.data)
                    self.loading = false
                    document.body.style.overflow = 'auto';
                });
        },

        convertFile(url) {
            var nombre_archivo = url.split('/')[2]
            url = this.URL_API + url
            return fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    // Crear un objeto File a partir del blob descargado
                    const archivo = new File([blob], nombre_archivo, { type: 'application/pdf' });
                    return archivo;
                });
        },
        // llenarFormularioGuardado(item = null){
        //     console.log('llenar formulario', item)
        // },
        llenarFormulario(item = null) {
            let self = this
            this.getActividadesCiiu(item.codigo_ciiu_id)
            this.operacion = item.operacion_id
            this.consulta_operacion = item.tipo_operacion
            this.tipo_persona = item.tipo_persona_id
            this.consulta_tipo_persona = item.tipo_persona
            this.digito_verificacion = item.digito_verificacion
            this.razon_social = item.razon_social
            this.periodicidad_liquidacion_id = item.periodicidad_liquidacion_id
            this.tipo_identificacion = item.tipo_identificacion_id
            this.consulta_tipo_identificacion = item.tipo_identificacion
            this.numero_identificacion = item.numero_identificacion
            this.fecha_expedicion = item.fecha_exp_documento
            this.contratacion_directa = item.contratacion_directa == 0 ? false : true
            this.atraccion_seleccion = item.atraccion_seleccion == 0 ? false : true
            this.nit = item.nit
            this.fecha_constitucion = item.fecha_constitucion
            this.codigo_ciiu_id = item.codigo_ciiu_id
            this.consulta_codigo_ciiu = item.codigo_ciiu
            this.consulta_actvidad_ciiu = item.codigo_actividad_ciiu + ' ' + item.actividad_ciiu_descripcion
            this.actividad_ciiu = item.codigo_actividad_ciiu
            this.estrato = item.estrato_id
            this.consulta_estrato = item.estrato
            this.municipio = item.municipio_id
            this.consulta_municipio = item.municipio
            this.direccion_empresa = item.direccion_empresa
            this.contacto_empresa = item.contacto_empresa
            this.correo_electronico_empresa = item.correo_empresa
            this.telefono_empresa = item.telefono_empresa
            this.celular_empresa = item.celular_empresa
            this.sociedad_comercial = item.sociedad_comercial_id
            this.consulta_sociedad_comercial = item.sociedad_comercial
            this.otra_cual = item.otra
            this.acuerdo_comercial = item.acuerdo_comercial
            this.aiu_negociado = item.aiu_negociado
            this.plazo_pago = item.plazo_pago
            this.ejecutivo_comercial = item.vendedor_id
            this.consulta_ejecutivo_comercial = item.vendedor
            this.empleados_empresa = item.numero_empleados
            this.jornada_laboral = item.jornada_laboral_id
            this.consulta_jornada_laboral = item.jornada_laboral
            this.rotacion_personal = item.rotacion_personal_id
            this.consulta_rotacion_personal = item.rotacion_personal
            this.riesgo_laboral = item.riesgo_cliente_id
            this.consulta_riesgo_cliente = item.riesgo_cliente
            this.junta_directiva = item.junta_directiva.length > 0 ? true : false
            this.consulta_responsable_impuesto_ventas = item.responsable_inpuesto_ventas == '1' ? 'Si' : 'No'
            this.responsable_impuesto_ventas = item.responsable_inpuesto_ventas
            this.correo_factura_electronica = item.correo_facturacion_electronica
            this.consulta_sucursal_facturacion = item.sucursal_facturacion
            this.sucursal = item.sucursal_facturacion_id
            this.declaraciones_autorizaciones = item.declaraciones_autirizaciones == '1' ? true : false
            this.tratamiento_datos_personales = item.tratamiento_datos_personales == '1' ? true : false
            this.tipo_operacion_internacional = item.tipo_operacion_internacional_id
            this.consulta_operacion_internacional = item.tipo_operacion_internacional
            this.operaciones_modena_extranjera = item.operaciones_internacionales
            this.consulta_operacion_moneda_extranjera = item.operaciones_internacionales == 1 ? 'Si' : 'No'
            this.tipo_origen_fondo = item.origen_fondos.tipo_origen_fondos_id
            this.otro_tipo_origen_fondos = item.origen_fondos.otro_origen
            this.tipo_origen_medios = item.origen_fondos.tipo_origen_medios_id
            this.otro_tipo_origen_medios = item.origen_fondos.tipo_origen_medios2_id
            this.alto_manejo_efectivo = item.origen_fondos.alto_manejo_efectivo
            this.consulta_origen_manejo_efectivo = item.origen_fondos.alto_manejo_efectivo == 1 ? 'Si' : 'No'
            this.nombre_completo_contador = item.nombre_contador
            this.identificacion_contador = item.identificacion_contador
            this.telefono_contador = item.telefono_contador
            this.tipo_identificacion_contador = item.tipo_identificacion_id_contador
            this.consulta_contador = item.tipo_identificacion_contador
            this.nombre_completo_tesorero = item.nombre_tesorero
            this.telefono_tesorero = item.telefono_tesorero
            this.correo_tesorero = item.correo_tesorero
            this.ingreso_mensual = item.ingreso_mensual
            this.otros_ingresos = item.otros_ingresos
            this.total_ingresos = item.total_ingresos
            this.costos_gastos = item.costos_gastos_mensual
            this.detalle_otros_ingresos = item.detalle_otros_ingresos
            this.reintegro_costos = item.reintegro_costos_gastos
            this.activos = item.activos
            this.pasivos = item.pasivos
            this.patrimonio = item.patrimonio
            this.pais = item.pais_id
            this.consulta_pais = item.pais
            this.departamento = item.departamento_id
            this.consulta_departamento = item.departamento
            this.municipio = item.municipio_id
            this.consulta_municipio = item.municipio
            this.periodicidad_liquidacion_id = item.periodicidad_liquidacion_id
            this.consulta_periodicidad_pago = item.periodicidad_liquidacion
            this.tipo_cliente = item.tipo_cliente_id
            this.tipo_proveedor = item.tipo_proveedor_id
            this.consulta_tipo_cliente = item.tipo_cliente
            this.consulta_tipo_proveedor = item.tipo_proveedor
            this.municipio_prestacion_servicio = item.municipio_prestacion_servicio_id
            this.departamento_prestacion_servicio = item.departamento_prestacion_servicio_id
            this.pais_prestacion_servicio = item.pais_prestacion_servicio
            this.consulta_municipio_prestacion_servicio = item.municipio_prestacion_servicio
            this.consulta_departamento_prestacion_servicio = item.departamento_prestacion_servicio
            this.consulta_pais_prestacion_servicio = item.pais_prestacion_servicio
            this.referencias_comerciales = item.referencia_comercial
            this.personas_expuestas = item.personas_expuestas

            if (item.tipo_persona_id == 1) {
                this.persona_natural = true
            } else {
                this.persona_juridica = true
            }

            if (item.documentos_adjuntos.length > 0) {
                this.fileInputsCount = item.documentos_adjuntos
            }

            item.documentos_adjuntos.forEach(function (item) {
                self.convertFile(item.ruta)
                    .then(archivo => {
                        self.file.push(archivo);
                    })
                    .catch(error => {
                        // Ocurrió un error durante la conversión
                        console.error('Error al convertir el archivo:', error);
                    });
            })

            if (item.cargos.length > 0) {
                console.log('cargos')
                this.cargos = item.cargos
                for (let i = 0; i < item.cargos.length; i++) {
                    this.requisitos[i] = item.cargos[i].requisitos
                    this.examenes[i] = item.cargos[i].examenes
                    this.consulta_riesgo_laboral[i] = item.cargos[i].riesgo_laboral
                    this.cargos[i].riesgo = item.cargos[i].riesgo_laboral_id
                }
            } else {
                this.cargos = [{ cargo: '', requisitos: [], examenes: [], riesgo_laboral_id: '' }]
            }

            if (item.cargos2.length > 0) {

                this.cargos2 = item.cargos2

                for (let i = 0; i < item.cargos2.length; i++) {
                    this.tipo_cargo[i] = item.cargos2[i].tipo_cargo_id
                    this.categoria_cargo_id = item.cargos2[i].categoria_cargo_id
                    this.consulta_subcategoria_cargos[i] = item.cargos2[i].categoria
                    this.consulta_lista_cargos[i] = item.cargos2[i].cargo
                    this.cargos2[i].cargo = item.cargos2[i].id_cargo
                    this.consulta_textohtml[i] = item.cargos2[i].funcion_cargo
                    this.consulta_riesgo_laboral[i] = item.cargos2[i].riesgo_laboral
                    this.array_lista_examenes[i] = item.cargos2[i].examenes
                    this.array_lista_recomendaciones[i] = item.cargos2[i].recomendaciones
                }
            } else {
                this.cargos2 = [{ cargo: '', examenes: [], recomendaciones: [], funcion_cargo: '', riesgo_laboral_id: '' }]
            }
            item.documentos_adjuntos.forEach(function (item) {
                self.id_archivo.push(item.tipo_documento_id)
            })

            this.miembros_Junta = item.junta_directiva
            item.junta_directiva.forEach(function (item) {
                self.consulta_tipo_identificacion_miembros_junta.push(item.des_tip)
            })

            this.representantes_legales = item.representantes_legales
            item.representantes_legales.forEach(function (item) {
                self.consulta_tipo_identificacion_rl.push(item.des_tip)
                self.consulta_pais_rl.push(item.pais)
                self.consulta_departamento_rl.push(item.departamento)
                self.consulta_municipio_rl.push(item.ciudad_expedicion)
            })

            this.accionistas = item.accionistas;
            item.accionistas.forEach(function (item) {
                self.consulta_tipo_identificacion_ac.push(item.des_tip)
            })

            this.referencias_bancarias = item.referencia_bancaria
            item.referencia_bancaria.forEach(function (item, index) {
                self.consulta_banco_rb.push(item.banco)
                self.consulta_tipo_cuenta_banco_rb.push(item.tipo_cuenta)
                self.referencias_bancarias[index].tipo_cuenta = item.tipo_cuenta_banco
            })

            item.personas_expuestas.forEach(function (item) {
                self.consultas_personas_expuestas.push(item.des_tip)
            })

            this.consulta_calidad_tributaria[0] = item.calidad_tributaria[0].gran_contribuyente == '1' ? 'Si' : 'No'
            this.calidad_tributaria[0].opcion = item.calidad_tributaria[0].gran_contribuyente
            this.calidad_tributaria[0].numero_resolucion = item.calidad_tributaria[0].resolucion_gran_contribuyente
            this.calidad_tributaria[0].fecha = item.calidad_tributaria[0].fecha_gran_contribuyente

            this.consulta_calidad_tributaria[1] = item.calidad_tributaria[0].auto_retenedor == '1' ? 'Si' : 'No'
            this.calidad_tributaria[1].opcion = item.calidad_tributaria[0].auto_retenedor
            this.calidad_tributaria[1].numero_resolucion = item.calidad_tributaria[0].resolucion_auto_retenedor
            this.calidad_tributaria[1].fecha = item.calidad_tributaria[0].fecha_auto_retenedor

            this.consulta_calidad_tributaria[2] = item.calidad_tributaria[0].exento_impuesto_rent == '1' ? 'Si' : 'No'
            this.calidad_tributaria[2].opcion = item.calidad_tributaria[0].exento_impuesto_rent
            this.calidad_tributaria[2].numero_resolucion = item.calidad_tributaria[0].resolucion_exento_impuesto_rent
            this.calidad_tributaria[2].fecha = item.calidad_tributaria[0].fecha_exento_impuesto_rent

            this.alto_manejo_efectivo = item.origen_fondos.alto_manejo_efectivo
            this.consulta_origen_manejo_efectivo = item.origen_fondos.alto_manejo_efectivo == 1 ? 'Si' : 'No'

            this.consulta_origen_medios1 = item.origen_fondos.origen_medios
            this.consulta_origen_medios2 = item.origen_fondos.origen_medios2
            this.consulta_origen_fondos = item.origen_fondos.origen_fondos
            this.tipo_origen_medios = item.origen_fondos.tipo_origen_medios_id
            this.otro_tipo_origen_medios = item.origen_fondos.tipo_origen_medios2_id
            this.tipo_origen_fondo = item.origen_fondos.tipo_origen_fondos_id
            this.otro_tipo_origen_fondos = item.origen_fondos.otro_origen

        },
        showAlert(mensaje, icono) {
            this.$swal({
                position: 'top',
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: icono == 'error' ? 3000 : 1500,
            })
        },
        configHeader() {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            return config;
        },
    }
};
</script>
<style scoped>
.filled {
    border-color: green;
}

.row:first-child {
    margin-top: 30px;
}

.row .col h5 {
    margin-top: 30px;
}

h2 {
    margin: 20px;
}

h6 {
    font-weight: bold
}

#seccion:last-child {
    margin-bottom: 50px;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

#seccion,
.orientacion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

.tituloseccion {
    position: relative;
    display: inline-block;
    background-color: white;
    padding: 5px;
    top: 22px;
}

span {
    height: 38px;
}

/* Fin select con filtro personalizado */

#clasificador {
    width: 100%;
    text-align: left;
    float: left;
}

.upload {
    margin-bottom: 20px;
}

p {
    text-align: justify;
}

#contenedor-select .col {
    padding: 10px;
    margin: 10px;
}

ul li {
    list-style: decimal;
}

section span {
    padding-bottom: 30px;
    background-color: red;
}

.ver {
    background-color: #006b3f;
    color: white;
}

.ver:hover {
    background-color: #05a562;
}

.trash {
    position: relative;
    width: 30px;
}

.bi-trash-fill {
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
}

ul li {
    list-style: none;
}

#validate {
    color: red;
    font-size: 0.7rem;
    float: left;
}

.error {
    color: red;
}

#acuerdos_comerciales,
#razon_social {
    width: 100%;
    height: 37px;
    border-radius: 5px;
    border-color: rgb(191, 199, 199);
    outline: none;
    padding: 5px;
}

/* Loading */
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

/* Fin loading */

.lista-multiple {
    border: 0.7px rgba(207, 205, 205, 0.815) solid;
    border-radius: 7px;
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
}

/* .orientacion{
    text-align: justify;
} */
</style>