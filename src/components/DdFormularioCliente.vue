<template>
    <div class="container" id="contenedor-formulario">
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
                <p>FEGC-01-02</p>
                <p>3-01-2023</p>
                <p>Version 4</p>
            </div>
        </div>

        <form @submit.prevent="save()">
            <h6 class="tituloseccion">Información general</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Operación: *" @getOperacion="getOperacion" eventoCampo="getOperacion"
                            nombreItem="nombre" :consulta="consulta_operacion" :registros="operaciones"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].operacion === undefined && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Contratacion directa:</label>
                        <div class="col form-check" style="clear: both;">
                            <input class="form-check-input" type="checkbox" v-model="variables[0].contratacion_directa"
                                id="flexCheckIndeterminate">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Atraccion y seleccion de talento:</label>
                        <div class="col form-check" style="clear: both;">
                            <input class="form-check-input" type="checkbox" v-model="variables[0].atraccion_seleccion"
                                id="flexCheckIndeterminate">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de persona: *" @getTipoPersona="getTipoPersona"
                            eventoCampo="getTipoPersona" nombreItem="nombre" :registros="tiposPersona"
                            :consulta="consulta_tipo_persona" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].tipo_persona === undefined && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            eventoCampo="getTipoIdentificacion" :ordenCampo="1" nombreItem="des_tip"
                            @setTipoIdentificacion="setTipoIdentificacion" :registros="tiposIdentificacion"
                            :consulta="consulta_tipo_identificacion" placeholder="Seleccione una opción"
                            :disabled="persona_natural" />
                        <span id="validate" v-if="variables[0].tipo_persona === 1 && variables[0].tipo_identificacion === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número de
                            identificación: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_identificacion"
                            @input="variables[0].numero_identificacion = validarNumero(variables[0].numero_identificacion), calcularDigitoVerificacion(variables[0].numero_identificacion)"
                            :disabled="persona_natural" />
                        <span id="validate"
                            v-if="variables[0].numero_identificacion === '' || variables[0].numero_identificacion === undefined && variables[0].tipo_persona === 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Fecha de expedición: *</label>
                        <input type="date" class="form-control" autocomplete="off" id="fecha_expedicion"
                            aria-describedby="emailHelp" v-model="variables[0].fecha_expedicion"
                            :disabled="persona_natural" />
                        <span id="validate"
                            v-if="variables[0].fecha_expedicion === '' || variables[0].fecha_expedicion === undefined && variables[0].tipo_persona === 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">NIT: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="variables[0].nit" :disabled="!persona_natural"
                            @input="variables[0].nit = validarNumero(variables[0].nit), calcularDigitoVerificacion(variables[0].nit)" />
                        <span id="validate" v-if="variables[0].nit === '' || variables[0].nit === undefined && variables[0].tipo_persona != 1 && submitted"
                            class="error">{{ mensaje_error }}</span>

                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Dígito de verificación: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="6"
                            aria-describedby="emailHelp" v-model="variables[0].digito_verificacion" :disabled="true" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Nombre completo / Razón social: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="variables[0].razon_social = formatInput($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].razon_social" />
                        <span id="validate"
                            v-if="variables[0].razon_social === '' || variables[0].razon_social === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Fecha de constitución: *
                        </label>
                        <input type="date" class="form-control" autocomplete="off" aria-describedby="emailHelp"
                            id="fecha_constitucion" v-model="variables[0].fecha_constitucion"
                            :disabled="!persona_natural" />
                        <span id="validate"
                            v-if="variables[0].fecha_constitucion === '' || variables[0].fecha_constitucion === undefined && variables[0].tipo_persona != 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Cuantos empleados conforman la
                            empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="6"
                            aria-describedby="emailHelp" v-model="variables[0].empleados_empresa"
                            @input="variables[0].empleados_empresa = validarNumero(variables[0].empleados_empresa)" />
                        <span id="validate"
                            v-if="variables[0].empleados_empresa === '' || variables[0].empleados_empresa === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <SearchList nombreCampo="Código ciiu: *" @getCodigosCiiu="getCodigosCiiu"
                            eventoCampo="getCodigosCiiu" nombreItem="codigo" :registros="codigos_ciiu"
                            :consulta="consulta_codigo_ciiu" @getActividadesCiiu="getActividadesCiiu"
                            placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="variables[0].empleados_empresa === '' || variables[0].empleados_empresa === undefined && submitted" class="error">{{ mensaje_error }}</span> -->
                        <span id="validate" v-if="codigo_ciiu_ === '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <SearchTable nombreCampo="Actividad ciiu: *" eventoCampo="setActividadesCiiu"
                            @setActividadesCiiu="setActividadesCiiu" endpoint="actividadciiu/filetr"
                            :consulta="consulta_actvidad_ciiu" nombreItem="campos_actividad_ciiu" :datos="actividades_ciiu"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].actividad_ciiu === undefined && submitted" class="error">{{
                            mensaje_error }}</span>

                    </div>
                    <div class="col mb-3">
                        <SearchList nombreCampo="Estrato: *" @getEstratos="getEstratos" eventoCampo="getEstratos"
                            :consulta="consulta_estrato" nombreItem="nombre" :registros="estratos"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].estrato === undefined && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Pais: *" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nombre"
                            :consulta="consulta_pais" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="variables[0].estrato === undefined && submitted" class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento: *" nombreItem="nombre" eventoCampo="getDepartamentos"
                            :consulta="consulta_departamento" :registros="departamentos" @getMunicipios="getMunicipios"
                            placeholder="Seleccione una opción" />
                        <!-- <span id="validate" v-if="variables[0].estrato === undefined && submitted" class="error">{{ mensaje_error }}</span> -->
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad: *" nombreItem="nombre" :registros="municipios"
                            :consulta="consulta_municipio" @setMunicipios="setMunicipios" eventoCampo="setMunicipios"
                            :ordenCampo="1" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].municipio === undefined && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Dirección de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="variables[0].direccion_empresa = formatInputUpperCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].direccion_empresa" />
                        <span id="validate"
                            v-if="variables[0].direccion_empresa === '' || variables[0].direccion_empresa === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>

                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Contacto de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="150"
                            @input="variables[0].contacto_empresa = formatInputCamelCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].contacto_empresa" />
                        <span id="validate"
                            v-if="variables[0].contacto_empresa === '' || variables[0].contacto_empresa === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Correo electrónico: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="variables[0].correo_electronico = formatInputLowerCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].correo_electronico" />
                        <span id="validate"
                            v-if="variables[0].correo_electronico === '' || variables[0].correo_electronico === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Teléfono empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="variables[0].telefono_empresa"
                            @input="variables[0].telefono_empresa = validarNumero(variables[0].telefono_empresa)" />
                        <span id="validate"
                            v-if="variables[0].telefono_empresa === '' || variables[0].telefono_empresa === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número celular: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="variables[0].numero_celular"
                            @input="variables[0].numero_celular = validarNumero(variables[0].numero_celular)" />
                        <span id="validate"
                            v-if="variables[0].numero_celular === '' || variables[0].numero_celular === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Actividad Económica: Sociedad Comercial: *" nombreItem="nombre"
                            :consulta="consulta_sociedad_comercial" :registros="sociedades_comerciales"
                            eventoCampo="getSociedadesComerciales" @getSociedadesComerciales="getSociedadesComerciales"
                            placeholder="Ciudad" />
                        <span id="validate" v-if="variables[0].sociedad_comercial === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Otra ¿Cuál?:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="150"
                            @input="variables[0].otra_cual = formatInput($event.target.value)" aria-describedby="emailHelp"
                            v-model="variables[0].otra_cual" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Periodicidad de pago: *" nombreItem="nombre"
                            :consulta="consulta_periodicidad_pago" :registros="periodicidades_liquidacion"
                            eventoCampo="getPeriodicidadPago" @getPeriodicidadPago="getPeriodicidadPago"
                            placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].periodicidad_liquidacion_id === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Plazo pago (días): *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="50"
                            aria-describedby="emailHelp" v-model="variables[0].plazo_pago"
                            @input="variables[0].plazo_pago = validarNumero(variables[0].plazo_pago)" />
                        <span id="validate"
                            v-if="variables[0].periodicidad_liquidacion_id === '' || variables[0].periodicidad_liquidacion_id === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">AIU negociado: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="50"
                            aria-describedby="emailHelp" v-model="variables[0].aiu_negocio" />
                        <span id="validate"
                            v-if="variables[0].aiu_negocio === '' || variables[0].aiu_negocio === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ejecutivo comercial: *" nombreItem="nom_ven" :registros="vendedores"
                            :consulta="consulta_ejecutivo_comercial" eventoCampo="getVendedores"
                            @getVendedores="getVendedores" placeholder="Ciudad" />
                        <span id="validate"
                            v-if="variables[0].vendedor === '' || variables[0].vendedor === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Observaciones a acuerdos
                            comerciales:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="variables[0].observaciones = formatInput($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].observaciones" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Jornada Laboral: *" nombreItem="nombre" :registros="jornadas_laborales"
                            :consulta="consulta_jornada_laboral" eventoCampo="getJornadasLaborales"
                            @getJornadasLaborales="getJornadasLaborales" placeholder="Ciudad" />
                        <span id="validate" v-if="variables[0].jornada_laboral === undefined && submitted" class="error">{{
                            mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Rotación de personal *" nombreItem="nombre"
                            :consulta="consulta_rotacion_personal" :registros="rotaciones_personal"
                            eventoCampo="getRotacionesPersonal" @getRotacionesPersonal="getRotacionesPersonal"
                            ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                        <span id="validate" v-if="variables[0].rotacion_personal === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Cargos empresa</h6>
            <div id="seccion">
                <div class="row">
                    <div class="row">
                        <div class="col-3">
                            <SearchList nombreCampo="Riesgo de la empresa: (ARL)" eventoCampo="getRiesgosLaborales"
                                nombreItem="nombre" :registros="riesgos_laborales" :consulta="consulta_riesgo_cliente"
                                @getRiesgosLaborales="getRiesgosLaborales" placeholder="Seleccionar" />

                            <span id="validate" v-if="variables[0].riesgo_laboral === undefined && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Nombre del cargo: *</label>

                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Requisito:</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Examen:</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Riesgo del cargo* (ARL):</label>
                        </div>
                    </div>
                    <div class="row" id="contenedor-select" v-for="item, index in cargos" :key="item.id">
                        <div class="col-3">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.cargo = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.cargo" />
                            <span id="validate" v-if="item.cargo === '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <ListaMultiple @setLista="setLista" :verLista="verLista" :index="index" tipolista="requisitos"
                            :elementoslist="requisitosList" :elementos="requisitos[index]" :hover="hover" />
                        <ListaMultiple :elementoslist="examenesList" :verLista="verLista" @setLista="setLista"
                            :index="index" tipolista="examenes" :elementos="examenes[index]" :hover="hover" />
                            <!-- <span id="validate" v-if="item.riesgo === '' && submitted" class="error">{{ mensaje_error
                            }}</span> -->
                        <div class="col-2">
                            <SearchList eventoCampo="getRiesgosLaborales" :index="index" nombreItem="nombre"
                                :registros="riesgos_laborales" @getRiesgosLaborales="getRiesgosLaborales"
                                placeholder="Seleccionar" :consulta="consulta_riesgo_laboral[index]" />

                            <span id="validate" v-if="item.riesgo === '' && submitted" class="error">{{ mensaje_error
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
            <h6 class="tituloseccion">Carga de archivos</h6>
            <div id="seccion">
                <div class="row upload" v-for="item, index in fileInputsCount" :key="index">
                    <div class="col-2" v-if="$route.params.id != null">
                        <a :href="URL_API + item.ruta" target="_blank" rel="noopener noreferrer"><button type="button"
                                class="btn btn-sm ver"><i class="bi bi-eye"> ver</i></button></a>
                    </div>
                    <div class="col">
                        <SearchList @getTipoArhivo="getTipoArhivo" eventoCampo="getTipoArhivo" nombreItem="nombre"
                            :registros="fileInputsCount" :archivos="true" :index="index" @setTipoArchivo="setTipoArchivo"
                            placeholder="Seleccione una opción" :consulta="consulta_file[index]" />
                        <span id="validate" v-if="id_archivo[index] === undefined && submitted" class="error">¡Por favor
                            seleccione el tipo de documento y adjunte el archivo!</span>
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
                            <span id="validate" v-if="accionistas[index].tipo_identificacion_id === '' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Identificación: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.identificacion"
                                @input="item.identificacion = validarNumero(item.identificacion)" />
                            <span id="validate"
                                v-if="item.identificacion === '' && accionistas[index].tipo_identificacion_id.trim() != '0' && accionistas[index].tipo_identificacion_id.trim() != '' && submitted"
                                class="error">{{
                                    mensaje_error }}</span>
                        </div>
                        <!-- </div> -->
                        <!-- <div class="row" style="margin-bottom: 30px;"> -->
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Socio/Accionista: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.socio = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.socio" />
                            <span id="validate"
                                v-if="item.socio === '' && accionistas[index].tipo_identificacion_id.trim() != '0' && accionistas[index].tipo_identificacion_id.trim() != '' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Porcentaje Participación (%):</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" maxlength="3" v-model="item.participacion"
                                @input="item.participacion = validarNumero(item.participacion)" />
                            <span id="validate"
                                v-if="item.participacion === '' && accionistas[index].tipo_identificacion_id.trim() != '0' && accionistas[index].tipo_identificacion_id.trim() != '' && submitted"
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
                                maxlength="100" @input="item.nombre = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.nombre" />

                            <span id="validate"
                                v-if="item.nombre === '' && representantes_legales[index].tipo_identificacion != '' && representantes_legales[index].tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList nombreCampo="Tipo de Identificación: *"
                                @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                nombreItem="des_tip" :ordenCampo="3" :index="index" :registros="tiposIdentificacion"
                                @setTipoIdentificacion="setTipoIdentificacion" placeholder="Seleccione una opción"
                                :consulta="consulta_tipo_identificacion_rl[index]" />
                            <span id="validate" v-if="representantes_legales[index].tipo_identificacion === '' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.identificacion"
                                @input="item.identificacion = validarNumero(item.identificacion)" />
                            <span id="validate"
                                v-if="item.identificacion === '' && representantes_legales[index].tipo_identificacion != '' && representantes_legales[index].tipo_identificacion.trim() != '0' && submitted"
                                class="error">{{
                                    mensaje_error }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="item.telefono"
                                @input="item.telefono = validarNumero(item.telefono)" />
                            <span id="validate"
                                v-if="item.telefono === '' && representantes_legales[index].tipo_identificacion != '' && representantes_legales[index].tipo_identificacion.trim() != '0' && submitted"
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
                                maxlength="100" @input="item.correo = formatInputLowerCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.correo" />
                            <span id="validate"
                                v-if="item.correo === '' && representantes_legales[index].tipo_identificacion != '' && representantes_legales[index].tipo_identificacion.trim() != '0' && submitted"
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
                                v-if="representantes_legales[index].municipio_id === '' && representantes_legales[index].tipo_identificacion != '' && representantes_legales[index].tipo_identificacion.trim() != '0' && submitted"
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
                            <input class="form-check-input" type="radio" :value="true"
                                v-model="variables[0].junta_directiva" name="radio3" id="radio3">
                            Si
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" :value="false"
                                v-model="variables[0].junta_directiva" name="radio3" id="radio3" checked>
                            No
                        </div>
                    </div>
                </div>
                <!-- <div class="row"> -->
                <div class="row" v-if="variables[0].junta_directiva == true">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Nombres y apellidos: *</label>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Tipo de indentificación: *</label>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Identificación: *</label>
                    </div>
                </div>
                <div v-if="variables[0].junta_directiva == true">
                    <div class="row" v-for="item, index in miembros_Junta" :key="index">
                        <div class="col">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="150" @input="item.nombre = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.nombre" />
                            <span id="validate"
                                v-if="miembros_Junta[index].nombre === '' && miembros_Junta[index].tipo_identificacion_id != undefined && miembros_Junta[index].tipo_identificacion_id != '' && miembros_Junta[index].tipo_identificacion_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                @setTipoIdentificacion="setTipoIdentificacion" nombreItem="des_tip"
                                :registros="tiposIdentificacion" :ordenCampo="4" :index="index"
                                :consulta="consulta_tipo_identificacion_miembros_junta[index]"
                                placeholder="Seleccione una opción" />

                            <span id="validate" v-if="miembros_Junta[index].tipo_identificacion_id === '' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.identificacion"
                                @input="item.identificacion = validarNumero(item.identificacion)" />
                            <span id="validate"
                                v-if="item.identificacion === '' && miembros_Junta[index].tipo_identificacion_id != undefined && miembros_Junta[index].tipo_identificacion_id != '' && miembros_Junta[index].tipo_identificacion_id.trim() != '0' && submitted"
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
                        <span id="validate" v-if="variables[0].responsable_impuesto_ventas === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Correo para factura electrónica: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="variables[0].correo_factura_electronica = formatInputLowerCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].correo_factura_electronica" />
                        <span id="validate"
                            v-if="variables[0].correo_factura_electronica === '' || variables[0].correo_factura_electronica === undefined && variables[0].responsable_impuesto_ventas == 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal para facturación: *" eventoCampo="getSucursales"
                            @getSucursales="getSucursales" nombreItem="nom_suc" :registros="sucursales"
                            placeholder="Seleccione una opción" :consulta="consulta_sucursal_facturacion" />
                        <span id="validate"
                            v-if="variables[0].sucursal === undefined && variables[0].responsable_impuesto_ventas == 1 && submitted"
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
                        <span id="validate"
                            v-if="calidad_tributaria[index].opcion === undefined || calidad_tributaria[index].opcion === '' && submitted"
                            class="error">{{
                                mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de resolución:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="item.numero_resolucion" />
                        <span id="validate"
                            v-if="item.numero_resolucion === '' && calidad_tributaria[index].opcion == 1 && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Fecha</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="item.fecha" />
                        <span id="validate" v-if="item.fecha === '' && calidad_tributaria[index].opcion == 1 && submitted"
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
                            @input="variables[0].nombre_completo_contador = formatInputCamelCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].nombre_completo_contador" />
                        <span id="validate"
                            v-if="variables[0].nombre_completo_contador === '' || variables[0].nombre_completo_contador === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            @setTipoIdentificacion="setTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                            :consulta="consulta_contador" nombreItem="des_tip" :ordenCampo="5"
                            :registros="tiposIdentificacion" placeholder="Seleccione una opción" />
                        <span id="validate" v-if="variables[0].tipo_identificacion_contador === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <!-- </div>
                <div class="row"> -->
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="variables[0].identificacion_contador"
                            @input="variables[0].identificacion_contador = validarNumero(variables[0].identificacion_contador)" />
                        <span id="validate"
                            v-if="variables[0].identificacion_contador === '' || variables[0].identificacion_contador === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono_contador"
                            @input="variables[0].telefono_contador = validarNumero(variables[0].telefono_contador)" />
                        <span id="validate"
                            v-if="variables[0].telefono_contador === '' || variables[0].telefono_contador === undefined && submitted"
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
                            @input="variables[0].nombre_completo_tesorero = formatInputCamelCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].nombre_completo_tesorero" />
                        <span id="validate"
                            v-if="variables[0].nombre_completo_tesorero === '' || variables[0].nombre_completo_tesorero === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono_tesorero"
                            @input="variables[0].telefono_tesorero = validarNumero(variables[0].telefono_tesorero)" />
                        <span id="validate"
                            v-if="variables[0].telefono_tesorero === '' || variables[0].telefono_tesorero === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].correo_tesorero" />
                        <span id="validate"
                            v-if="variables[0].correo_tesorero === '' || variables[0].correo_tesorero === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.7. Datos Financieros (Ultimo periodo contable)</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Ingreso Mensual: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].ingreso_mensual"
                            @input="variables[0].ingreso_mensual = validarNumero(variables[0].ingreso_mensual)" />
                        <span id="validate"
                            v-if="variables[0].ingreso_mensual === '' || variables[0].ingreso_mensual === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Costos y Gastos Mensual: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].costos_gastos"
                            @input="variables[0].costos_gastos = validarNumero(variables[0].costos_gastos)" />
                        <span id="validate"
                            v-if="variables[0].costos_gastos === '' || variables[0].costos_gastos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Activos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].activos"
                            @input="variables[0].activos = validarNumero(variables[0].activos)" />
                        <span id="validate"
                            v-if="variables[0].activos === '' || variables[0].activos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Otros Ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].otros_ingresos"
                            @input="variables[0].otros_ingresos = validarNumero(variables[0].otros_ingresos)" />
                        <span id="validate"
                            v-if="variables[0].otros_ingresos === '' || variables[0].otros_ingresos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Detalle de otros ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].detalle_otros_ingresos" />
                        <span id="validate"
                            v-if="variables[0].detalle_otros_ingresos === '' || variables[0].detalle_otros_ingresos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pasivos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].pasivos"
                            @input="variables[0].pasivos = validarNumero(variables[0].pasivos)" />
                        <span id="validate"
                            v-if="variables[0].pasivos === '' || variables[0].pasivos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Total Ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].total_ingresos"
                            @input="variables[0].total_ingresos = validarNumero(variables[0].total_ingresos)" />
                        <span id="validate"
                            v-if="variables[0].total_ingresos === '' || variables[0].total_ingresos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Reintegro de costos y gastos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].reintegro_costos"
                            @input="variables[0].reintegro_costos = validarNumero(variables[0].reintegro_costos)" />
                        <span id="validate"
                            v-if="variables[0].reintegro_costos === '' || variables[0].reintegro_costos === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Patrimonio: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].patrimonio"
                            @input="variables[0].patrimonio = validarNumero(variables[0].patrimonio)" />
                        <span id="validate"
                            v-if="variables[0].patrimonio === '' || variables[0].patrimonio === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
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
                        <span id="validate"
                            v-if="variables[0].operaciones_modena_extranjera === '' || variables[0].operaciones_modena_extranjera === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Que operaciones?: *"
                            @getTiposOperacionesInternacionales="getTiposOperacionesInternacionales"
                            eventoCampo="getTiposOperacionesInternacionales" nombreItem="nombre"
                            :consulta="consulta_operacion_internacional" :registros="tipos_operaciones_internacionales"
                            placeholder="Seleccione una opción" />
                        <span id="validate"
                            v-if="variables[0].tipo_operacion_internacional === '' || variables[0].tipo_operacion_internacional === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
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
                            <span id="validate" v-if="referencias_bancarias[index].banco_id === '' && submitted"
                                class="error">{{ mensaje_error }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.numero_cuenta"
                                @input="item.numero_cuenta = validarNumero(item.numero_cuenta)" />
                            <span id="validate"
                                v-if="item.numero_cuenta === '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col">
                            <SearchList nombreCampo="Tipo cuenta" @getTipoCuentaBancos="getTipoCuentaBancos"
                                @setTipoCuentaBancos="setTipoCuentaBancos" eventoCampo="getTipoCuentaBancos" :ordenCampo="1"
                                :index="index" nombreItem="nombre" :registros="tipos_cuenta_bancos"
                                placeholder="Seleccione una opción" :consulta="consulta_tipo_cuenta_banco_rb[index]" />
                            <span id="validate"
                                v-if="referencias_bancarias[index].tipo_cuenta === '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
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
                                maxlength="100" @input="item.sucursal = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.sucursal" />
                            <span id="validate"
                                v-if="item.sucursal === '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.telefono"
                                @input="item.telefono = validarNumero(item.telefono)" />
                            <span id="validate"
                                v-if="item.telefono === '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
                                class="error">{{ mensaje_error
                                }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.contacto = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.contacto" />
                            <span id="validate"
                                v-if="item.contacto === '' && referencias_bancarias[index].banco_id != '' && referencias_bancarias[index].banco_id.trim() != '0' && submitted"
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
                                maxlength="200" @input="item.nombre = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.nombre" />
                            <span id="validate" v-if="item.nombre === '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="100" @input="item.contacto = formatInputCamelCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="item.contacto" />
                            <span id="validate" v-if="item.contacto === '' && submitted" class="error">{{ mensaje_error
                            }}</span>
                        </div>
                        <div class="col mb-3">
                            <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="item.telefono"
                                @input="item.telefono = validarNumero(item.telefono)" />
                            <span id="validate" v-if="item.telefono === '' && submitted" class="error">{{ mensaje_error
                            }}</span>
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
                                v-model="variables[0].declaraciones_autorizaciones" name="radio1" id="radio1">
                            Si acepto
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" :value="false"
                                v-model="variables[0].declaraciones_autorizaciones" name="radio1" id="radio1" checked>
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
                            @input="item.nombre = formatInputCamelCase($event.target.value)" aria-describedby="emailHelp"
                            v-model="item.nombre" />
                        <span id="validate"
                            v-if="item.nombre === '' && personas_expuestas[index].tipo_identificacion_id != '' && personas_expuestas[index].tipo_identificacion_id.trim() != '0' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            @setTipoIdentificacion="setTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                            nombreItem="des_tip" :ordenCampo="6" :index="index" :registros="tiposIdentificacion"
                            placeholder="Seleccione una opción" :consulta="consultas_personas_expuestas[index]" />
                        <span id="validate" v-if="personas_expuestas[index].tipo_identificacion_id === '' && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de identificacion:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="item.identificacion"
                            @input="item.identificacion = validarNumero(item.identificacion)" />
                        <span id="validate"
                            v-if="item.identificacion === '' && personas_expuestas[index].tipo_identificacion_id != '' && personas_expuestas[index].tipo_identificacion_id.trim() != '0' && submitted"
                            class="error">{{ mensaje_error
                            }}</span>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Parentesco:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="50"
                            @input="item.parentesco = formatInputCamelCase($event.target.value)"
                            aria-describedby="emailHelp" v-model="item.parentesco" />
                        <span id="validate"
                            v-if="item.parentesco === '' && personas_expuestas[index].tipo_identificacion_id != '' && personas_expuestas[index].tipo_identificacion_id.trim() != '0' && submitted"
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
                        <span id="validate" v-if="variables[0].tipo_origen_fondo === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Otra ¿Cuál?:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="100"
                            @input="variables[0].otro_tipo_origen_fondos = formatInput($event.target.value)"
                            aria-describedby="emailHelp" v-model="variables[0].otro_tipo_origen_fondos" />
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
                        <span id="validate" v-if="variables[0].tipo_origen_medios === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col">
                        <SearchList @getTipoOrigenMedios="getTipoOrigenMedios" eventoCampo="getTipoOrigenMedios"
                            @setTipoOrigenMedios="setTipoOrigenMedios" nombreItem="nombre" :ordenCampo="2"
                            :registros="tipos_origenes_medios" placeholder="seleccione una opción"
                            :consulta="consulta_origen_medios2" />
                        <span id="validate" v-if="variables[0].otro_tipo_origen_medios === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
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
                        <span id="validate" v-if="variables[0].alto_manejo_efectivo === undefined && submitted"
                            class="error">{{ mensaje_error }}</span>
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
                            <input class="form-check-input" type="radio" v-model="variables[0].tratamiento_datos"
                                :value="true" name="radio5" id="radio5">
                            Si acepto
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" v-model="variables[0].tratamiento_datos"
                                :value="false" name="radio5" id="radio5" checked>
                            No acepto
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-success" type="button" style="margin:30px" @click="generarPDF">Generar pdf</button>
            <button class="btn btn-success" type="submit" style="margin:30px">Guardar</button>
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

export default {

    components: {
        SearchList,
        SearchTable,
        ListaMultiple,
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            variables: [{}],
            hover1: false,
            hover2: false,
            hover3: false,
            hover4: false,
            hover5: false,
            hover6: false,
            requisitos: [],
            tiposPersona: [],
            tipoPersona: '',
            tiposIdentificacion: [],
            tiposArchivo: [],
            tipoArchivo: '',
            municipios: [],
            requisitosList: [],
            examenFilter: [],
            cargos: [{ cargo: '', requisitos: [], examenes: [], riesgo: '' }],
            operaciones: [],
            operacion: '',
            contratacion_directa: false,
            atraccion_seleccion: false,
            tipos_persona: [],
            tipo_persona: '',
            tipos_identificacion: [],
            tipo_identificacion: '',
            numero_identificacion: '',
            fecha_expedicion: '',
            nit: '',
            digito_verificacion: '',
            razon_social: '',
            actividad_economica_personal: '',
            fecha_constitucion: '',
            estratos: [],
            estrato: '',
            codigos_ciiu: [],
            codigo_ciiu: '',
            direccion_empresa: '',
            paises: [],
            pais: '',
            departamentos: [],
            departamento: '',
            ciudades: [],
            ciudad: '',
            actividades_ciiu: [],
            actividad_ciiu: '',
            vendedores: [],
            sociedades_comerciales: [],
            sociedad_comercial: '',
            rotaciones_personal: [],
            campos_actividad_ciiu: ['codigo_actividad', 'descripcion'],
            contacto_empresa: '',
            correo_electronico_empresa: '',
            telefono_empresa: '',
            numero_celular: '',
            ciudad_matricula: '',
            sin_animo_lucro: '',
            otra: '',
            aiu_negociado: '',
            plazo_pago: '',
            vendedor: '',
            bancos: [],
            banco: '',
            tipos_cuenta_bancos: [],
            tipo_cuenta_banco: '',
            periodicidades_liquidacion: [],
            actividad_economica: '',
            observaciones_acuerdos_comerciales: '',
            empleados_forman_empresa: '',
            jornada_laboral: '',
            jornadas_laborales: [],
            rotacion_personal: '',
            riesgos_laborales: [],
            riesgo_laboral: '',
            sucursales: [],
            sucursal: '',
            tipos_origen_fondos: [],
            tipo_origen_fondo: '',
            tipos_origenes_medios: [],
            tipo_origen_medios: '',
            otro_tipo_origen_medios: '',
            tipos_operaciones_internacionales: [],
            tipo_operacion_internacional: '',
            hover: false,
            examenesList: [],
            examenes: [],
            calidad_tributaria: [
                { nombre: '¿Es Gran Contribuyente?:', opcion: '', numero_resolucion: '', fecha: '' },
                { nombre: '¿Es Auto-Retenedor?', opcion: '', numero_resolucion: '', fecha: '' },
                { nombre: '¿Exento de Impuesto a la Renta?', opcion: '', numero_resolucion: '', fecha: '' },
            ],
            verLista: 1,
            accionistas: [{ tipo_identificacion_id: '', identificacion: '', socio: '', participacion: '' }],
            representantes_legales: [{ nombre: '', tipo_identificacion: '', identificacion: '', municipio: '', municipio_id: '', correo: '', telefono: '' }],
            junta_directiva: Boolean,
            miembros_Junta: [{ nombre: '', tipo_identificacion_id: '', identificacion: '' }],
            referencias_bancarias: [{ banco_id: '', numero_cuenta: '', tipo_cuenta: '', sucursal: '', telefono: '', contacto: '' }],
            referencias_comerciales: [{ nombre: '', contacto: '', telefono: '' }],
            personas_expuestas: [{ nombre: '', tipo_identificacion_id: '', identificacion: '', parentesco: '' }],
            afirmacionNegacion: [],
            fileInputsCount: [
                { id: '1', nombre: 'Cámara de comercio (Archivo PDF, expedición menor 30 días): *', abreviacion: '', tipo_archivo: '.pdf' },
                { id: '2', nombre: 'RUT (Archivo PDF, Actualizado): *', abreviacion: '', tipo_archivo: '.pdf' },
                { id: '3', nombre: 'Cedula (Archivo PDF, Actualizado): *', abreviacion: '', tipo_archivo: '.pdf' },
                { id: '4', nombre: 'ARL (Archivo PDF, Actualizado): *', abreviacion: '', tipo_archivo: '.pdf' },
                { id: '5', nombre: 'Certificado bancario (Archivo PDF, Actualizado): *', abreviacion: '', tipo_archivo: '.pdf' },
                { id: '6', nombre: 'Certificado comercial (Archivo PDF, Actualizado): *', abreviacion: '', tipo_archivo: '.pdf' },
            ],
            fileInputsCountCopia: [],
            file: [],
            id_archivo: [],
            consulta_operacion: '',
            consulta_tipo_persona: '',
            consulta_tipo_identificacion: '',
            consulta_codigo_ciiu: '',
            consulta_actvidad_ciiu: '',
            consulta_estrato: '',
            consulta_pais: '',
            consulta_departamento: '',
            consulta_municipio: '',
            consulta_periodicidad_pago: '',
            consulta_sociedad_comercial: '',
            consulta_ejecutivo_comercial: '',
            consulta_jornada_laboral: '',
            consulta_rotacion_personal: '',
            consulta_riesgo_cliente: '',
            consulta_contador: '',
            consulta_operacion_internacional: '',
            consulta_operacion_moneda_extranjera: '',
            consulta_gran_contrbuyente: '',
            consulta_auto_retenedor: '',
            consulta_exento_impuesto: '',
            consulta_tipo_identificacion_rl: [],
            consulta_pais_rl: [],
            consulta_departamento_rl: [],
            consulta_municipio_rl: [],
            consulta_tipo_identificacion_ac: [],
            consulta_banco_rb: [],
            consulta_tipo_cuenta_banco_rb: [],
            consultas_personas_expuestas: [],
            consulta_responsable_impuesto_ventas: '',
            consulta_sucursal_facturacion: '',
            consulta_calidad_tributaria: [],
            consulta_tipo_identificacion_miembros_junta: [],
            consulta_origen_fondos: '',
            consulta_origen_medios1: '',
            consulta_origen_medios2: '',
            consulta_origen_manejo_efectivo: '',
            consulta_file: [],
            consulta_riesgo_laboral: [],
            persona_natural: false,
            validate: [],
            guardar: false,
            cont: true,
            submitted: false,
            mensaje_error: '¡Este campo debe ser diligenciado!',
            codigo_ciiu_: '',
            tipo_archivo_: '',


        }
    },
    computed: {

    },
    watch: {

    },

    created() {
        this.estabilidad_laboral == false
        this.getExamenes()
        this.getRequsitos()
        this.fileInputsCountCopia = [...this.fileInputsCount]
        if (this.$route.params.id != undefined) {
            this.consultaFormulario(this.$route.params.id)
        } else {
            this.variables = [{}]
        }
    },
    methods: {
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

            this.variables[0].digito_verificacion = (y > 1) ? 11 - y : y;
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
                pdf.deletePage(paginaActual - 2);

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
            var limite = 3 * 1024 * 1024;
            var bandera = 0
            this.file.forEach(function (item, index) {
                if (item.size > limite) {
                    self.showAlert('El archivo' + item.name + 'es demasiado pesado, el limite es de 3MB', 'error')
                    bandera++
                }
                document.append('documento' + index, item)
                document.append('id' + index, self.id_archivo[index])
            })
            if (bandera <= 0) {
                axios
                    .post(self.URL_API + "api/v1/formulariocliente/doc/" + id, document, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status)
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
                        this.variables[0].responsable_impuesto_ventas = item.id;
                        break
                    case 2:
                        this.calidad_tributaria[index].opcion = item.id;
                        break
                    case 3:
                        this.variables[0].operaciones_modena_extranjera = item.id;
                        break
                    case 4:
                        this.variables[0].alto_manejo_efectivo = item.id;
                        break
                }
            }
        },
        getOperacion(item = null) {
            if (item != null) {
                this.variables[0].operacion = item.id;
            }
            if (this.operacion == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/operacion", config)
                    .then(function (result) {
                        self.operaciones = result.data
                    });
            }
        },
        getTipoPersona(item = null) {
            if (item != null) {
                this.variables[0].tipo_persona = item.id;
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
        opcionesTipoPersona(persona_natural) {
            let self = this
            if (persona_natural) {
                this.variables[0].nit = undefined
                this.variables[0].fecha_constitucion = undefined
                this.variables[0].digito_verificacion = ''
                this.consulta_tipo_identificacion = undefined
                setTimeout(() => {
                    self.consulta_tipo_identificacion = ''
                }, "10");
                document.getElementById("fecha_constitucion").value = "";
            } else if (!persona_natural) {
                this.consulta_tipo_identificacion = ''
                this.variables[0].tipo_identificacion = undefined
                this.variables[0].digito_verificacion = ''
                this.variables[0].fecha_expedicion = undefined
                this.variables[0].numero_identificacion = undefined
                document.getElementById("fecha_expedicion").value = "";
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
            // if(item != null){
            //    this.tipo_archivo_ = item.id
            // }
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
                        this.variables[0].tipo_identificacion = item.cod_tip;
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
                        this.variables[0].tipo_identificacion_contador = item.cod_tip;
                        break
                    case 6:
                        this.personas_expuestas[index].tipo_identificacion_id = item.cod_tip;
                        break

                }
            }
        },
        getEstratos(item = null) {
            if (item != null) {
                this.variables[0].estrato = item.id;
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
                this.variables[0].sociedad_comercial = item.id;
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
        getVendedores(item = null) {
            if (item != null) {
                this.variables[0].vendedor = item.cod_ven;
            }
            if (this.vendedores == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/ejecutivocomercial", config)
                    .then(function (result) {
                        self.vendedores = result.data
                    });
            }
        },
        getActividadesCiiu(item = null) {
            if (item != null) {
                this.codigo_ciiu_ = item.codigo
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/actividadciiu/" + item.id, config)
                .then(function (result) {
                    self.actividades_ciiu = result.data
                });
        },
        getJornadasLaborales(item = null) {
            if (item != null) {
                this.variables[0].jornada_laboral = item.id;
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
                this.variables[0].rotacion_personal = item.id;
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
            }
            if (item != null && index == null) {
                this.variables[0].riesgo_laboral = item.id;
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
        getExamenes(item = null) {
            if (item != null) {
                this.variables[0].examenes = item.id;
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
                this.variables[0].requisito = item.id;
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
                this.variables[0].periodicidad_liquidacion_id = item.id;
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
                this.variables[0].sucursal = item.cod_suc;
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
                this.variables[0].tipo_operacion_internacional = item.id;
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
                this.variables[0].tipo_origen_fondo = item.id;
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
                        this.variables[0].tipo_origen_medios = item.id;
                        break
                    case 2:
                        this.variables[0].otro_tipo_origen_medios = item.id;
                        break
                }
            }
        },
        setMunicipios(item, campo, index) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.variables[0].municipio = item.id;
                        break
                    case 2:
                        // this.variables[0].municipio_matricula_id = item.id;
                        break
                    case 3:
                        this.representantes_legales[index].municipio_id = item.id;
                        break
                }
            }
        },
        setActividadesCiiu(item) {
            if (item != null) {
                this.variables[0].actividad_ciiu = item.split(" ")[0]
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
        save() {
            this.submitted = true;

            if (this.variables[0].contratacion_directa == undefined && this.variables[0].atraccion_seleccion == undefined) {
                this.showAlert('Error, debe seleccionar al menos un tipo de servicio y los campos obligatorios.', 'error')
                return
            }
            if (this.variables[0].declaraciones_autorizaciones == undefined || this.variables[0].declaraciones_autorizaciones == false) {
                this.showAlert('Error, debe aceptar las declaraciones y autorizaciones.', 'error')
                return
            }
            if (this.variables[0].tratamiento_datos == undefined || this.variables[0].tratamiento_datos == false) {
                this.showAlert('Error, debe aceptar el tratamiento de datos personales.', 'error')
                return
            }
            if (this.file.length < 6) {
                this.showAlert('Error, Debe adjuntar los archivos pdf.', 'error')
                return
            }
            try {
                let self = this;
                let config = this.configHeader();
                this.variables[0].cargos = this.cargos
                this.variables[0].accionistas = this.accionistas
                this.variables[0].representantes_legales = this.representantes_legales
                this.variables[0].miembros_Junta = this.miembros_Junta
                this.variables[0].calidad_tributaria = this.calidad_tributaria
                this.variables[0].referencias_bancarias = this.referencias_bancarias
                this.variables[0].referencias_comerciales = this.referencias_comerciales
                this.variables[0].personas_expuestas = this.personas_expuestas

                var id = this.$route.params.id
                if (id == undefined) {
                    axios
                        .post(self.URL_API + "api/v1/formulariocliente", this.variables, config)
                        .then(function (result) {
                            if (result.data.message == 'ok') {
                                self.guardarArchivos(result.data.client)
                            } else {
                                self.showAlert(result.data.message, result.data.status)
                            }
                        });
                } else {
                    axios
                        .post(self.URL_API + "api/v1/formulariocliente/" + id, this.variables, config)
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
        consultaFormulario(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formulariocliente/" + id, config)
                .then(function (result) {
                    self.llenarFormulario(result.data)
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

        llenarFormulario(item) {

            let self = this
            this.accionistas = item.accionistas;
            this.referencias_bancarias = item.referencia_bancaria
            this.referencias_comerciales = item.referencia_comercial
            this.representantes_legales = item.representantes_legales
            this.personas_expuestas = item.personas_expuestas
            this.miembros_Junta = item.junta_directiva
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


            this.cargos = item.cargos
            for (var i = 0; i < item.cargos.length; i++) {
                this.requisitos[i] = item.cargos[i].requisitos
                this.examenes[i] = item.cargos[i].examenes
                this.consulta_riesgo_laboral[i] = item.cargos[i].riesgo_laboral
                this.cargos[i].riesgo = item.cargos[i].riesgo_laboral_id
            }

            item.documentos_adjuntos.forEach(function (item) {
                self.id_archivo.push(item.tipo_documento_id)
            })

            item.documentos_adjuntos.forEach(function (item) {
                self.consulta_file.push(item.nombre)
            })

            item.junta_directiva.forEach(function (item) {
                self.consulta_tipo_identificacion_miembros_junta.push(item.des_tip)
            })

            item.representantes_legales.forEach(function (item) {
                self.consulta_tipo_identificacion_rl.push(item.des_tip)
                self.consulta_pais_rl.push(item.pais)
                self.consulta_departamento_rl.push(item.departamento)
                self.consulta_municipio_rl.push(item.municipio)
            })

            item.accionistas.forEach(function (item) {
                self.consulta_tipo_identificacion_ac.push(item.des_tip)
            })

            item.referencia_bancaria.forEach(function (item, index) {
                self.consulta_banco_rb.push(item.banco)
                self.consulta_tipo_cuenta_banco_rb.push(item.tipo_cuenta)
                self.referencias_bancarias[index].tipo_cuenta = item.tipo_cuenta_banco
            })

            item.personas_expuestas.forEach(function (item) {
                self.consultas_personas_expuestas.push(item.des_tip)
            })


            this.consulta_responsable_impuesto_ventas = item.responsable_inpuesto_ventas == '1' ? 'Si' : 'No'
            this.variables[0].responsable_impuesto_ventas = item.responsable_inpuesto_ventas
            this.variables[0].correo_factura_electronica = item.correo_facturacion_electronica
            this.consulta_sucursal_facturacion = item.sucursal_facturacion
            this.variables[0].sucursal = item.sucursal_facturacion_id

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

            this.variables[0].alto_manejo_efectivo = item.origen_fondos.alto_manejo_efectivo

            this.consulta_origen_medios1 = item.origen_fondos.origen_medios
            this.consulta_origen_medios2 = item.origen_fondos.origen_medios2
            this.consulta_origen_manejo_efectivo = item.origen_fondos.alto_manejo_efectivo == 1 ? 'Si' : 'No'
            this.consulta_origen_fondos = item.origen_fondos.origen_fondos
            this.variables[0].tipo_origen_medios = item.origen_fondos.tipo_origen_medios_id
            this.variables[0].otro_tipo_origen_medios = item.origen_fondos.tipo_origen_medios2_id
            this.variables[0].tipo_origen_fondo = item.origen_fondos.tipo_origen_fondos_id
            this.variables[0].otro_tipo_origen_fondos = item.origen_fondos.otro_origen
            this.variables[0].contratacion_directa = item.contratacion_directa
            this.variables[0].atraccion_seleccion = item.atraccion_seleccion
            this.variables[0].numero_identificacion = item.numero_identificacion
            this.variables[0].nit = item.nit
            this.variables[0].digito_verificacion = item.digito_verificacion
            this.variables[0].razon_social = item.razon_social
            this.variables[0].direccion_empresa = item.direccion_empresa
            this.variables[0].contacto_empresa = item.contacto_empresa
            this.variables[0].correo_electronico = item.correo_empresa
            this.variables[0].telefono_empresa = item.telefono_empresa
            this.variables[0].numero_celular = item.celular_empresa
            this.variables[0].otra_cual = item.otra
            this.variables[0].aiu_negocio = item.aiu_negociado
            this.variables[0].plazo_pago = item.plazo_pago
            this.variables[0].observaciones = item.acuerdo_comercial
            this.variables[0].empleados_empresa = item.numero_empleados
            this.variables[0].nombre_completo_contador = item.nombre_contador
            this.variables[0].identificacion_contador = item.identificacion_contador
            this.variables[0].telefono_contador = item.telefono_contador
            this.variables[0].nombre_completo_tesorero = item.nombre_tesorero
            this.variables[0].telefono_tesorero = item.telefono_tesorero
            this.variables[0].correo_tesorero = item.correo_tesorero
            this.variables[0].ingreso_mensual = item.ingreso_mensual
            this.variables[0].otros_ingresos = item.otros_ingresos
            this.variables[0].total_ingresos = item.total_ingresos
            this.variables[0].costos_gastos = item.costos_gastos_mensual
            this.variables[0].detalle_otros_ingresos = item.detalle_otros_ingresos
            this.variables[0].reintegro_costos = item.reintegro_costos_gastos
            this.variables[0].activos = item.activos
            this.variables[0].pasivos = item.pasivos
            this.variables[0].patrimonio = item.patrimonio
            this.variables[0].fecha_expedicion = item.fecha_exp_documento
            this.variables[0].fecha_constitucion = item.fecha_constitucion

            this.variables[0].declaraciones_autorizaciones = item.declaraciones_autirizaciones == '1' ? true : false

            this.variables[0].tratamiento_datos = item.tratamiento_datos_personales == '1' ? true : false

            this.variables[0].junta_directiva = item.junta_directiva.length > 0 ? true : false

            this.variables[0].tipo_operacion_internacional = item.tipo_operacion_internacional_id
            this.consulta_operacion_internacional = item.tipo_operacion_internacional

            this.variables[0].operaciones_modena_extranjera = item.operaciones_internacionales
            this.consulta_operacion_moneda_extranjera = item.operaciones_internacionales == 1 ? 'Si' : 'No'

            this.variables[0].tipo_identificacion_contador = item.tipo_identificacion_id_contador
            this.consulta_contador = item.identificacion_contador

            this.variables[0].operacion = item.operacion_id
            this.consulta_operacion = item.tipo_operacion

            this.variables[0].tipo_persona = item.tipo_persona_id
            this.consulta_tipo_persona = item.tipo_persona

            this.variables[0].tipo_identificacion = item.tipo_identificacion_id
            this.consulta_tipo_identificacion = item.tipo_identificacion

            this.variables[0].codigo_ciiu_id = item.codigo_ciiu_id
            this.consulta_codigo_ciiu = item.codigo_ciiu

            this.variables[0].actividad_ciiu = item.codigo_actividad_ciiu
            this.consulta_actvidad_ciiu = item.codigo_actividad_ciiu + ' ' + item.actividad_ciiu_descripcion

            this.variables[0].estrato = item.estrato_id
            this.consulta_estrato = item.estrato

            this.variables[0].pais = item.pais_id
            this.consulta_pais = item.pais

            this.variables[0].departamento = item.departamento_id
            this.consulta_departamento = item.departamento

            this.variables[0].municipio = item.municipio_id
            this.consulta_municipio = item.municipio

            this.variables[0].periodicidad_liquidacion_id = item.periodicidad_liquidacion_id
            this.consulta_periodicidad_pago = item.periodicidad_liquidacion

            this.variables[0].sociedad_comercial = item.sociedad_comercial_id
            this.consulta_sociedad_comercial = item.sociedad_comercial

            this.variables[0].vendedor = item.vendedor_id
            this.consulta_ejecutivo_comercial = item.vendedor

            this.variables[0].jornada_laboral = item.jornada_laboral_id
            this.consulta_jornada_laboral = item.jornada_laboral

            this.variables[0].rotacion_personal = item.rotacion_personal_id
            this.consulta_rotacion_personal = item.rotacion_personal

            this.variables[0].riesgo_laboral = item.riesgo_cliente_id
            this.consulta_riesgo_cliente = item.riesgo_cliente
        },
        showAlert(mensaje, icono) {
            this.$swal({
                position: 'top',
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: icono == 'error' ? 2500 : 1500,
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

#seccion {
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
</style>