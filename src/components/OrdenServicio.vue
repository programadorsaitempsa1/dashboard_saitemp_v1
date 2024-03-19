<template>
    <div class="container">
        <h2>Orden de servicio</h2>
        <div class="card col-xs-12 col-md-6">
            <form class="was-validated" ref="cliente" @submit.prevent="guardarSeccion()">
                <div id="seccion">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <SearchList nombreCampo="Tipo de persona: *" @getTipoPersona="getTipoPersona"
                                eventoCampo="getTipoPersona" nombreItem="nombre" :registros="tiposPersona"
                                :consulta="consulta_tipo_persona" placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <SearchList nombreCampo="Tipo de Identificación: *"
                                @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                :ordenCampo="0" nombreItem="des_tip" @setTipoIdentificacion="setTipoIdentificacion"
                                :registros="tiposIdentificacion" :consulta="consulta_tipo_identificacion_solicitante"
                                placeholder="Seleccione una opción" :disabled="!persona_natural" />
                        </div>
                    </div>
                    <div class="row">
                        <div v-if="persona_natural" class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Número de
                                identificación: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="numero_identificacion"
                                @input="numero_identificacion = validarNumero(numero_identificacion)"
                                @blur="getCliente(numero_identificacion, 1)" :disabled="!persona_natural" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div v-if="persona_juridica" class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">NIT: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                maxlength="20" aria-describedby="emailHelp" v-model="nit" :disabled="!persona_juridica"
                                @input="nit = validarNumero(nit)" @blur="getCliente(nit, 2)" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Número de vacantes disponibles: *" nombreItem="nombre"
                                eventoCampo="getVacantes" :consulta="consulta_vacantes" :registros="numero_vacantes"
                                :ordenCampo="1" @getVacantes="getVacantes" placeholder="Seleccione una opción" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nombre completo / Razón social: *</label>
                            <textarea class="form-control" required name="" id="razon_social" rows="1"
                                v-model="razon_social"
                                @input="razon_social = formatInputUpperCase($event.target.value)"></textarea>
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nombre del solicitante:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="nombre_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Cargo:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="cargo_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Número de celular:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                @input="celular_solicitante = validarNumero(celular_solicitante)"
                                aria-describedby="emailHelp" v-model="celular_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Correo electrónico:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="correo_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Servicio solicitado: *" nombreItem="nombre" eventoCampo="getServicios"
                                :consulta="consulta_servicio_solicitado" :registros="servicios" :ordenCampo="1"
                                @getServicios="getServicios" placeholder="Seleccione una opción" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Departamento prestación servicio: *" nombreItem="nombre"
                                eventoCampo="getDepartamentos" :consulta="consulta_departamento_p_s"
                                :registros="departamentos" :ordenCampo="0" @getMunicipios="getMunicipios"
                                placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Ciudad prestación servicio: *" nombreItem="nombre"
                                :registros="municipios" :consulta="consulta_municipio_p_s" @setMunicipios="setMunicipios"
                                eventoCampo="setMunicipios" :ordenCampo="0" placeholder="Seleccione una opción" />
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-sm-4 col-md-4 mb-3">
                        <button type="submit" class="btn btn-success">
                            Guardar sección
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="card col-xs-12 col-md-6" style="overflow: hidden;">
            <form class="was-validated " ref="candidato" id="card" @submit.prevent="save()">
                <div id="seccion">
                    <h5 class="tituloseccion" v-if="this.servicio_solicitado_id == 1">Información personal candidato</h5>
                    <hr v-if="this.servicio_solicitado_id == 1">
                    <div class="row"
                        v-if="this.servicio_solicitado_id != 2 && this.servicio_solicitado_id != 3 && this.servicio_solicitado_id != 4">
                        <h5 style="text-align: left;">Número de candidatos registrados: {{ candidatos.length }}</h5>
                    </div>
                    <div v-if="servicio_solicitado_id != 2 && servicio_solicitado_id != 3 && servicio_solicitado_id != 4"
                        class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nombres:</label>
                            <input type="text"
                                :class="{ 'is-invalid': !nombres, 'is-valid': nombres, 'form-control': true }"
                                autocomplete="off" id="exampleInput2" aria-describedby="emailHelp"
                                v-model="nombres_candidato" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Apellidos:</label>
                            <input type="text"
                                :class="{ 'is-invalid': !apellidos, 'is-valid': apellidos, 'form-control': true }"
                                autocomplete="off" id="exampleInput2" aria-describedby="emailHelp"
                                v-model="apellidos_candidato" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div v-if="this.servicio_solicitado_id != 2 && this.servicio_solicitado_id != 3 && this.servicio_solicitado_id != 4"
                        class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Número celular candidato:</label>
                            <input type="text"
                                :class="{ 'is-invalid': !celular, 'is-valid': celular, 'form-control': true }"
                                autocomplete="off" id="exampleInput2"
                                @input="celular_candidato = validarNumero(celular_candidato)" aria-describedby="emailHelp"
                                v-model="celular_candidato" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Correo electrónico candidato:</label>
                            <input type="text" :class="{ 'is-invalid': !correo, 'is-valid': correo, 'form-control': true }"
                                autocomplete="off" id="exampleInput2" aria-describedby="emailHelp"
                                v-model="correo_candidato" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div v-if="this.servicio_solicitado_id != 2 && this.servicio_solicitado_id != 3 && this.servicio_solicitado_id != 4"
                        class="row">
                        <div class="col-sm-12 col-md-4 mb-3">
                            <SearchList nombreCampo="Pais de nacimiento: *" @getPaises="getPaises" eventoCampo="getPaises"
                                nombreItem="nombre" :consulta="consulta_pais_n" :registros="paises" :ordenCampo="1"
                                @getDepartamentos="getDepartamentos" placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-4 mb-3">
                            <SearchList nombreCampo="Departamento: *" nombreItem="nombre" eventoCampo="getDepartamentos"
                                :consulta="consulta_departamento_n" :registros="departamentos" :ordenCampo="1"
                                @getMunicipios="getMunicipios" placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-4 mb-3">
                            <SearchList nombreCampo="Ciudad: *" nombreItem="nombre" :registros="municipios"
                                :consulta="consulta_municipio_n" @setMunicipios="setMunicipios" eventoCampo="setMunicipios"
                                :ordenCampo="1" placeholder="Seleccione una opción" />
                        </div>
                    </div>
                    <div v-if="this.servicio_solicitado_id != 2 && this.servicio_solicitado_id != 3 && this.servicio_solicitado_id != 4"
                        class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <SearchList nombreCampo="Tipo de Identificación: *"
                                @getTipoIdentificacion="getTipoIdentificacion" eventoCampo="getTipoIdentificacion"
                                :ordenCampo="1" nombreItem="des_tip" @setTipoIdentificacion="setTipoIdentificacion"
                                :registros="tiposIdentificacion" :consulta="consulta_tipo_identificacion_candidato"
                                placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Número documento identidad:</label>
                            <input type="text"
                                :class="{ 'is-invalid': !documento_candidato, 'is-valid': documento_candidato, 'form-control': true }"
                                autocomplete="off" id="exampleInput2"
                                @input="documento_identidad_candidato = validarNumero(documento_identidad_candidato)"
                                aria-describedby="emailHelp" v-model="documento_identidad_candidato" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div id="seccion">
                        <hr>
                        <h5 class="tituloseccion">Información cargo</h5>
                        <hr>
                        <div class="row">
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Salario:</label>
                                <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                    aria-describedby="emailHelp" v-model="salario" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Auxilio de transporte:</label>
                                <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                    aria-describedby="emailHelp" v-model="auxilio_transporte" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Por favor seleccione
                                    las bonificaciones:</label>
                            </div>
                            <div v-for="item, index2 in bonificaciones" :key="index2">
                                <div class="form-check check">
                                    <input class="form-check-input" type="checkbox" value="" v-model="item.isChecked"
                                        id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        {{ item.nombre }}
                                    </label>
                                    <input type="text" v-model="item.valor" placeholder="Valor de la bonificación"
                                        class="valor-bonificacion">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Fecha inicio labores:</label>
                                <input type="date" class="form-control" autocomplete="off" id="exampleInput2"
                                    aria-describedby="emailHelp" v-model="fecha_inicio_labores" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                        <div v-if="this.servicio_solicitado_id != 2 && this.servicio_solicitado_id != 3 && this.servicio_solicitado_id != 4"
                            class="row">
                            <label class="form-label">Especificaciones a tener en cuenta para vinculación:</label>
                            <div class="col">
                                <EditorTextoHtml :consulta="consulta_textohtml_especificacion_v" :index="1"
                                    @retornoTexto="retornoTexto" :showToolbar="true" />
                            </div>
                        </div>
                        <div v-if="this.servicio_solicitado_id != '' && this.servicio_solicitado_id != 1" class="row">
                            <label class="form-label">Especificaciones a tener en cuenta para selección del
                                personal:</label>
                            <div class="col">
                                <EditorTextoHtml :consulta="consulta_textohtml_especificacion_s" :index="2"
                                    @retornoTexto="retornoTexto" :showToolbar="true" />
                            </div>
                        </div>
                        <div class="row cargos">
                            <div class="row" id="contenedor-select" v-for="item, index in cargos2" :key="item.id">
                                <div class="row">
                                    <div class="col">
                                        <label class="form-check-label" for="flexSwitchCheckChecked">Por favor seleccione si
                                            el tipo
                                            de
                                            cargo:</label>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="form-check m-2" v-for="item, index2 in tipo_cargos" :key="index2">
                                            <input class="form-check-input" type="radio" required
                                                @click="getSubCategoriaCargo(item.id, index)" :value="item.id"
                                                v-model="tipo_cargo[index]" :name="'radio' + index" id="radio3">
                                            {{ item.nombre }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Categoria cargo: *</label>
                                    <SearchList nombreItem="nombre" :registros="arry_subcategoria_cargos[index]"
                                        :consulta="consulta_subcategoria_cargos[index]" eventoCampo="getListaCargos"
                                        :index="index" @getListaCargos="getListaCargos" placeholder="Seleccionar" />
                                </div>
                                <div class="col-sm-12 col-md-4 mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Cargo:</label>
                                    <SearchList nombreItem="nombre" :registros="array_lista_cargos[index]"
                                        :consulta="consulta_lista_cargos[index]" eventoCampo="getExamenesRecomendaciones"
                                        @getExamenesRecomendaciones="getExamenesRecomendaciones" :index="index"
                                        placeholder="Seleccionar" />
                                </div>
                                <div class="col-sm-12 col-md-4 mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Riesgo del cargo* (ARL):</label>
                                    <SearchList eventoCampo="getRiesgosLaborales" :index="index" nombreItem="nombre"
                                        :registros="riesgos_laborales" @getRiesgosLaborales="getRiesgosLaborales"
                                        placeholder="Seleccionar" :consulta="consulta_riesgo_laboral[index]" />
                                </div>
                                <div class="row">
                                    <label for="exampleInputEmail1" class="form-label">Funciones del cargo:</label>
                                    <div class="col">
                                        <EditorTextoHtml :consulta="consulta_textohtml_funciones" :index="0"
                                            @retornoTexto="retornoTexto" :showToolbar="true" />
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="exampleInputEmail1" class="form-label">Exámenes:</label>
                                    <div class="col">
                                        <div class="col-12 lista-multiple">
                                            <button style="margin:5px" class="btn btn-success btn-sm"
                                                v-for="(item, index) in array_lista_examenes[index]" :key="index"
                                                type="button">{{
                                                    item.nombre }}</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-for="item, index3 in array_lista_recomendaciones[index]" :key="index3">
                                    <div class="col orientacion"><label style="width: 100%;">ORIENTACIONES ESPECIFICAS PARA
                                            LOS
                                            EXAMENES:</label>
                                        <span>{{ item.recomendacion1 }}</span>
                                    </div>
                                    <div class="col orientacion"><label style="width: 100%;">PATOLOGIAS QUE RESTRINGEN LA
                                            LABOR:</label>
                                        <span>{{ item.recomendacion2 }}</span>
                                    </div>
                                </div>
                                <hr v-if="cargos2.length > 1">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <SearchList nombreCampo="Estado de la solicitud: " eventoCampo="getEstados" nombreItem="nombre"
                                :registros="estados_solicitud" :consulta="consulta_estado_solicitud"
                                @getEstados="getEstados" placeholder="Seleccionar" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Motivo cancelación:</label>
                            <textarea id="" style="width:100%" v-model="motivo_cancelacion" required></textarea>
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <SearchList nombreCampo="Nombre laboratorio: *" eventoCampo="getLaboratorios"
                                nombreItem="nombre" :registros="laboratorios" :consulta="consulta_laboratorio"
                                @getLaboratorios="getLaboratorios" placeholder="Seleccionar" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Dirección:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="direccion_laboratorio" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Departamento ubicación laboratorio: *" nombreItem="nombre"
                                eventoCampo="getDepartamentos" :consulta="consulta_departamento_u_l"
                                :registros="departamentos" :ordenCampo="2" @getMunicipios="getMunicipios"
                                placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Ciudad ubicación laboratorio: *" nombreItem="nombre"
                                :registros="municipios" :consulta="consulta_municipio_u_l" @setMunicipios="setMunicipios"
                                eventoCampo="setMunicipios" :ordenCampo="2" placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Fecha y hora examen médico:</label>
                            <input type="datetime-local" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="fecha_examen" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Recomendaciones examen médico:</label>
                            <textarea id="" style="width:100%" v-model="recomendacion_examen_medico" required></textarea>
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Orientación ubicación laboratorio:</label>
                            <textarea id="" style="width:100%" v-model="orientacion_laboratorio" required></textarea>
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 col-md-12  mt-2 mb-3" v-if="candidatos.length > 0 && servicio_solicitado_id == 1">
                    <nav aria-label="Page navigation example" style="padding:0px;margin:0px;">
                        <ul class="pagination">
                            <li class="page-item" v-for="item, index in candidatos" :key="index"><a
                                    :style="item.actual == true ? 'background-color:#198754;color:white' : 'background-color:white'"
                                    class="page-link" @click="llenarCampoCandidato(index), pagina = index">{{ index + 1
                                    }}</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-sm-4 col-md-12  mt-2 mb-3" v-else-if="cargos.length > 0 && servicio_solicitado_id != 1">
                    <nav aria-label="Page navigation example" style="padding:0px;margin:0px;">
                        <ul class="pagination">
                            <li class="page-item" v-for="item, index in cargos" :key="index"><a
                                    :style="item.actual == true ? 'background-color:#198754;color:white' : 'background-color:white'"
                                    class="page-link" @click="llenarCampoCargo(index), pagina = index">{{ index + 1
                                    }}</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="row" v-if="$route.params.id == undefined && this.servicio_solicitado_id == 1">
                    <div class="col-sm-4 col-md-4  mt-2 mb-3" id="siguiente">
                        <button class="btn btn-success" @click.prevent="siguiente()">
                            Agregar candidato
                        </button>
                    </div>
                    <div class="col-sm-4 col-md-4  mt-2 mb-3" id="siguiente">
                        <button class="btn btn-success" @click.prevent="siguiente(pagina)">
                            Actualizar candidato actual
                        </button>
                    </div>
                    <div class="col-sm-4 col-md-4  mt-2 mb-3">
                        <button class="btn btn-success" @click.prevent="eliminarCandidato()">
                            Eliminar candidato actual
                        </button>
                    </div>
                </div>
                <div class="row" v-if="$route.params.id == undefined && this.servicio_solicitado_id != 1">
                    <div class="col-sm-4 col-md-4  mt-2 mb-3" id="siguiente">
                        <button class="btn btn-success" @click.prevent="agregarCargo()">
                            Agregar cargo
                        </button>
                    </div>
                    <div class="col-sm-4 col-md-4  mt-2 mb-3" id="siguiente">
                        <button class="btn btn-success" @click.prevent="agregarCargo(pagina)">
                            Actualizar cargo actual
                        </button>
                    </div>
                    <div class="col-sm-4 col-md-4  mt-2 mb-3">
                        <button class="btn btn-success" @click.prevent="eliminarCargo()">
                            Eliminar cargo actual
                        </button>
                    </div>
                </div>
            </form>
            <form class="was-validated " ref="formulario" id="card" @submit.prevent="save()"
                v-if="this.servicio_solicitado_id != 2 && this.servicio_solicitado_id != 3 && this.servicio_solicitado_id != 4">
                <div id="seccion">
                    <h5 class="tituloseccion">Adjuntar hoja de vida</h5>
                    <hr>
                    <div class="row" v-for="item, index in candidatos" :key="index">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Documento identidad candidato:</label>
                            <input type="text" class="form-control" disabled autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="candidatos[index].documento_identidad_candidato" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label for="formFileMultiple" class="form-label">Adjuntar hoja de vida</label>
                            <div class="input-group mb-3">
                                <input class="form-control" ref="inputFile" type="file" @change="cargarArchivo($event)"
                                    id="formFileMultiple" required>
                                <span style="cursor: pointer" class="input-group-text" @click="quitarAdjuntos()"
                                    id="basic-addon1">Quitar archivo</span>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="$route.params.id == undefined">
                    <div class="col-sm-4 col-md-4  mt-2 mb-3">
                        <button type="submit" class="btn btn-success">
                            Guardar formulario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import SearchList from './SearchList.vue'
import EditorTextoHtml from './EditorTextoHtml.vue';
import { Token } from '../Mixins/Token.js';
import { Alerts } from '../Mixins/Alerts.js';
export default {
    components: {
        SearchList,
        EditorTextoHtml
    },
    mixins: [Token, Alerts],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            fecha: '',
            nit: '',
            razon_social: '',
            consulta_textohtml_funciones: '',
            consulta_textohtml_especificacion_v: '',
            consulta_textohtml_especificacion_s: '',
            nombre_solicitante: '',
            cargo_solicitante: '',
            celular_solicitante: '',
            correo_solicitante: '',
            consulta_tipo_persona: '',
            tipo_persona: '',
            persona_natural: false,
            persona_juridica: false,
            tiposIdentificacion: [],
            consulta_tipo_identificacion: '',
            tiposPersona: [],
            riesgos_laborales: [],
            numero_identificacion: '',
            mensaje_error: '¡Este campo debe ser diligenciado!',
            servicio_id: '',
            consulta_servicio: '',
            servicios: [],
            consulta_departamento_p_s: '',
            consulta_departamento_p_s_id: '',
            consulta_municipio_p_s: '',
            consulta_departamento_u_l: '',
            departamento_u_l_id: '',
            consulta_municipio_u_l: '',
            municipio_u_l_id: '',
            consulta_pais_n: '',
            consulta_pais_n_id: '',
            consulta_municipio_n: '',
            municipio_nacimiento_id: '',
            consulta_departamento_n: '',
            consulta_departamento_n_id: '',
            departamentos: [],
            municipios: [],
            nombres_candidato: '',
            apellidos_candidato: '',
            celular_candidato: '',
            correo_candidato: '',
            consulta_pais: '',
            paises: [],
            cargos2: [{ cargo_id: '', examenes: [], recomendaciones: [], funcion_cargo: '', riesgo_laboral_id: '' }],
            consulta_riesgo_cliente: '',
            tipo_cargos: [],
            tipo_cargo: [],
            arry_subcategoria_cargos: [],
            consulta_subcategoria_cargos: [],
            array_lista_cargos: [],
            consulta_lista_cargos: [],
            riesgos: [],
            consulta_riesgo_laboral: [],
            array_lista_examenes: [],
            array_lista_recomendaciones: [],
            salario: '',
            auxilio_transporte: '',
            fecha_examen: '',
            fecha_inicio_labores: '',
            direccion_laboratorio: '',
            estados_solicitud: [],
            consulta_estado_solicitud: '',
            estado_solicitud_id: ''
            , laboratorios: [],
            consulta_laboratorio: '',
            bonificaciones: [],
            file: [],
            candidatos: [],
            cargos: [],
            formulario: [],
            tipo_identificacion_solicitante: '',
            consulta_tipo_identificacion_solicitante: '',
            tipo_identificacion_candidato: '',
            consulta_tipo_identificacion_candidato: '',
            ciudad_prestacion_servicio_id: '',
            servicio_solicitado_id: '',
            consulta_servicio_solicitado: '',
            isChecked: [],
            valor_bonificacion: [],
            nombre_laboratorio: '',
            laboratorio_id: '',
            recomendacion_examen_medico: '',
            orientacion_laboratorio: '',
            cliente: {},
            hoja_vida: null,
            pagina: 0,
            // documento_identidad_candidato:[],
            documento_identidad_candidato: '',
            motivo_cancelacion: '',
            actual: false,
            numero_vacantes: [],
            consulta_vacantes: '',
            vacante_id: '',
            mensaje_cliente: 'Estimado cliente, Saitemp S.A se encuentra comprometido con la mejora en la calidad de los servicios ofrecidos; te invitamos a participar de la actualización del registro cliente de su negociación con el  propósito de cumplir con  las disposiciones legales exigidas por nuestros entes de control  ingresando  ( link debida diligencia) o comuníquese a la línea 3133024926 para recibir orientación en su proceso de actualización. '
        }
    },
    computed: {
        nombres: function () {
            return this.nombres_candidato != '';
        },
        apellidos: function () {
            return this.apellidos_candidato != '';
        },
        celular: function () {
            return this.celular_candidato != '';
        },
        correo: function () {
            var regexCorreoElectronico = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return this.correo_candidato != '' && regexCorreoElectronico.test(this.correo_candidato);
        },
        documento_candidato: function () {
            return this.documento_identidad_candidato != '';
        },
    },
    watch: {

    },
    mounted() {

    },
    created() {
        // this.getBonificaciones()
        this.getDepartamentos(43)
        this.getRiesgosLaborales()
        this.getCategoriaCargo()
        this.getExamenes()
        this.getRequsitos()
        this.llenarCampoCliente()
        this.llenarCampoCandidato()
        this.llenarCampoCargo()
    },
    methods: {
        save() {
            console.log('funcion save()')
            // this.guardarSeccion()
            // let self = this;
            // let formulario = JSON.parse(localStorage.getItem("cliente"))
            // formulario['servicios'] = JSON.parse(localStorage.getItem("candidatos"))
            // let config = this.configHeader();
            // axios
            //     .post(self.URL_API + "api/v1/ordenserviciocliente", formulario, config)
            //     .then(function (result) {
            //         // self.servicios = result.data
            //         console.log(result.data)
            //     });

        },
        eliminarCandidato() {
            if (localStorage.getItem('candidatos') != null) {
                this.candidatos = JSON.parse(localStorage.getItem('candidatos'))
                this.candidatos.splice(this.pagina, 1)
                localStorage.setItem('candidatos', JSON.stringify(this.candidatos))
            }
        },
        eliminarCargo() {
            if (localStorage.getItem('cargos') != null) {
                this.cargos = JSON.parse(localStorage.getItem('cargos'))
                this.cargos.splice(this.pagina, 1)
                localStorage.setItem('cargos', JSON.stringify(this.cargos))
            }
        },
        llenarCampoCliente() {
            if (localStorage.getItem('clienteos') != undefined) {
                var cliente = JSON.parse(localStorage.getItem('clienteos'))
                this.consulta_tipo_persona = cliente.tipo_persona
                this.tipo_persona_id = cliente.tipo_persona_id
                this.tipo_persona = cliente.tipo_persona_id
                this.razon_social = cliente.razon_social
                this.nombre_solicitante = cliente.nombre_solicitante
                this.cargo_solicitante = cliente.cargo_solicitante
                this.celular_solicitante = cliente.celular_solicitante
                this.correo_solicitante = cliente.correo_solicitante
                this.consulta_servicio_solicitado = cliente.servicio_solicitado
                this.servicio_solicitado_id = cliente.servicio_solicitado_id
                this.consulta_departamento_p_s = cliente.departamento_prestacion_servicio
                this.consulta_departamento_p_s_id = cliente.departamento_prestacion_servicio_id
                this.consulta_municipio_p_s = cliente.ciudad_prestacion_servicio
                this.ciudad_prestacion_servicio_id = cliente.ciudad_prestacion_servicio_id
                this.consulta_tipo_identificacion_solicitante = cliente.consulta_tipo_identificacion_solicitante
                this.numero_identificacion = cliente.numero_identificacion
                this.nit = cliente.nit
                this.persona_natural = this.tipo_persona_id == 1 ? false : true
                this.vacante_id = cliente.numero_vacantes_id
                this.consulta_vacantes = cliente.numero_vacantes
                this.opcionesTipoPersona(!this.persona_natural)
            }
        },
        llenarCampoCandidato(index = 0) {
            var objeto = JSON.parse(localStorage.getItem('candidatos'))
            if (objeto != undefined && objeto.length > 0) {
                this.candidatos = JSON.parse(localStorage.getItem('candidatos'))
                this.candidatos.forEach(function (item) {
                    item.actual = false
                })
                this.nombres_candidato = this.candidatos[index].nombres
                this.apellidos_candidato = this.candidatos[index].apellidos
                this.celular_candidato = this.candidatos[index].celular
                this.correo_candidato = this.candidatos[index].correo
                this.consulta_pais_n = this.candidatos[index].pais_nacimiento
                this.consulta_pais_n_id = this.candidatos[index].pais_nacimiento_id
                this.consulta_departamento_n = this.candidatos[index].departamento_nacimiento
                this.consulta_departamento_n_id = this.candidatos[index].departamento_nacimiento_id
                this.consulta_municipio_n = this.candidatos[index].municipio_nacimiento
                this.consulta_municipio_n_id = this.candidatos[index].municipio_nacimiento_id
                this.consulta_tipo_identificacion_candidato = this.candidatos[index].tipo_identificacion
                this.tipo_identificacion_candidato = this.candidatos[index].tipo_identificacion_id
                this.documento_identidad_candidato = this.candidatos[index].documento_identidad_candidato
                this.salario = this.candidatos[index].salario
                this.auxilio_transporte = this.candidatos[index].auxilio_transporte
                this.fecha_inicio_labores = this.candidatos[index].fecha_inicio_labores
                this.consulta_textohtml_especificacion_v = this.candidatos[index].especificaciones_vinculacion
                this.consulta_textohtml_especificacion_s = this.candidatos[index].especificaciones_seleccion
                this.consulta_estado_solicitud = this.candidatos[index].estado_solicitud
                this.estado_solicitud_id = this.candidatos[index].estado_solicitud_id
                this.consulta_laboratorio = this.candidatos[index].nombre_laboratorio
                this.laboratorio_id = this.candidatos[index].laboratorio_id
                this.direccion_laboratorio = this.candidatos[index].direccion_laboratorio
                this.consulta_departamento_u_l = this.candidatos[index].departamento_laboratorio
                this.departamento_u_l_id = this.candidatos[index].departamento_laboratorio_id
                this.consulta_municipio_u_l = this.candidatos[index].municipio_laboratorio
                this.municipio_u_l_id = this.candidatos[index].municipio_laboratorio_id
                this.fecha_examen = this.candidatos[index].fecha_examen_medico
                this.recomendacion_examen_medico = this.candidatos[index].recomendaciones_examen_medico
                this.orientacion_laboratorio = this.candidatos[index].orientacion_laboratorio
                this.bonificaciones = this.candidatos[index].bonificaciones
                this.cargos2 = this.candidatos[index].cargos2
                this.motivo_cancelacion = this.candidatos[index].motivo_cancelacion
                this.candidatos[index].actual = true
                this.tipo_cargo[index] = this.candidatos[index].tipo_cargo_id
                this.categoria_cargo_id = this.candidatos[index].categoria_cargo_id
                this.consulta_subcategoria_cargos[index] = this.candidatos[index].categoria
                this.consulta_lista_cargos[index] = this.candidatos[index].cargo
                this.consulta_textohtml_funciones = this.candidatos[index].consulta_textohtml_funciones
                this.consulta_riesgo_laboral[index] = this.candidatos[index].riesgo_laboral[index]
                this.array_lista_examenes[index] = this.candidatos[index].examenes
                this.array_lista_recomendaciones[index] = this.candidatos[index].recomendaciones

            } else {
                this.getBonificaciones()
            }
        },
        llenarCampoCargo(index = 0) {
            var objeto = JSON.parse(localStorage.getItem('cargos'))
            if (objeto != undefined && objeto.length > 0) {
                this.cargos = JSON.parse(localStorage.getItem('cargos'))
                this.cargos.forEach(function (item) {
                    item.actual = false
                })
                // this.nombres_candidato = this.candidatos[index].nombres
                // this.apellidos_candidato = this.candidatos[index].apellidos
                // this.celular_candidato = this.candidatos[index].celular
                // this.correo_candidato = this.candidatos[index].correo
                // this.consulta_pais_n = this.candidatos[index].pais_nacimiento
                // this.consulta_pais_n_id = this.candidatos[index].pais_nacimiento_id
                // this.consulta_departamento_n = this.candidatos[index].departamento_nacimiento
                // this.consulta_departamento_n_id = this.candidatos[index].departamento_nacimiento_id
                // this.consulta_municipio_n = this.candidatos[index].municipio_nacimiento
                // this.consulta_municipio_n_id = this.candidatos[index].municipio_nacimiento_id
                // this.consulta_tipo_identificacion_candidato = this.candidatos[index].tipo_identificacion
                // this.tipo_identificacion_candidato = this.candidatos[index].tipo_identificacion_id
                // this.documento_identidad_candidato = this.candidatos[index].documento_identidad_candidato
                this.salario = this.cargos[index].salario
                this.auxilio_transporte = this.cargos[index].auxilio_transporte
                this.fecha_inicio_labores = this.cargos[index].fecha_inicio_labores
                this.consulta_textohtml_especificacion_v = this.cargos[index].especificaciones_vinculacion
                this.consulta_textohtml_especificacion_s = this.cargos[index].especificaciones_seleccion
                this.consulta_estado_solicitud = this.cargos[index].estado_solicitud
                this.estado_solicitud_id = this.cargos[index].estado_solicitud_id
                this.consulta_laboratorio = this.cargos[index].nombre_laboratorio
                this.laboratorio_id = this.cargos[index].laboratorio_id
                this.direccion_laboratorio = this.cargos[index].direccion_laboratorio
                this.consulta_departamento_u_l = this.cargos[index].departamento_laboratorio
                this.departamento_u_l_id = this.cargos[index].departamento_laboratorio_id
                this.consulta_municipio_u_l = this.cargos[index].municipio_laboratorio
                this.municipio_u_l_id = this.cargos[index].municipio_laboratorio_id
                this.fecha_examen = this.cargos[index].fecha_examen_medico
                this.recomendacion_examen_medico = this.cargos[index].recomendaciones_examen_medico
                this.orientacion_laboratorio = this.cargos[index].orientacion_laboratorio
                this.bonificaciones = this.cargos[index].bonificaciones
                this.cargos2 = this.cargos[index].cargos2
                this.motivo_cancelacion = this.cargos[index].motivo_cancelacion
                this.cargos[index].actual = true
                this.tipo_cargo[index] = this.cargos[index].tipo_cargo_id
                this.categoria_cargo_id = this.cargos[index].categoria_cargo_id
                this.consulta_subcategoria_cargos[index] = this.cargos[index].categoria
                this.consulta_lista_cargos[index] = this.cargos[index].cargo
                this.consulta_textohtml_funciones = this.cargos[index].consulta_textohtml_funciones
                this.consulta_riesgo_laboral[index] = this.cargos[index].riesgo_laboral[index]
                this.array_lista_examenes[index] = this.cargos[index].examenes
                this.array_lista_recomendaciones[index] = this.cargos[index].recomendaciones

            } else {
                this.getBonificaciones()
            }
        },
        guardarSeccion() {
            if (this.$refs.cliente.checkValidity()) {
                this.cliente = {
                    tipo_persona_id: this.tipo_persona,
                    tipo_persona: this.consulta_tipo_persona,
                    tipo_identificacion_solicitante: this.tipo_identificacion_solicitante,
                    consulta_tipo_identificacion_solicitante: this.consulta_tipo_identificacion_solicitante,
                    numero_identificacion: this.numero_identificacion,
                    nit: this.nit,
                    razon_social: this.razon_social,
                    nombre_solicitante: this.nombre_solicitante,
                    cargo_solicitante: this.cargo_solicitante,
                    celular_solicitante: this.celular_solicitante,
                    correo_solicitante: this.correo_solicitante,
                    servicio_solicitado_id: this.servicio_solicitado_id,
                    servicio_solicitado: this.consulta_servicio_solicitado,
                    departamento_prestacion_servicio: this.consulta_departamento_p_s,
                    departamento_prestacion_servicio_id: this.consulta_departamento_p_s_id,
                    ciudad_prestacion_servicio_id: this.ciudad_prestacion_servicio_id,
                    ciudad_prestacion_servicio: this.consulta_municipio_p_s,
                    numero_vacantes_id: this.vacante_id,
                    numero_vacantes: this.consulta_vacantes
                }
                localStorage.setItem('clienteos', JSON.stringify(this.cliente))
            } else {
                // El formulario no es válido, hacer scroll hasta el primer campo no válido
                const form = this.$refs.candidato;
                const firstInvalidField = Array.from(form.elements).find(
                    element => !element.checkValidity()
                );

                // Hacer scroll al primer campo no válido
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    firstInvalidField.focus();
                }
            }
        },
        siguiente(index = null) {
            if (this.$refs.candidato.checkValidity() && this.correo) {
                var self = this
                var candidato = {
                    nombres: this.nombres_candidato,
                    apellidos: this.apellidos_candidato,
                    celular: this.celular_candidato,
                    correo: this.correo_candidato,
                    pais_nacimiento: this.consulta_pais_n,
                    pais_nacimiento_id: this.consulta_pais_n_id,
                    departamento_nacimiento: this.consulta_departamento_n,
                    departamento_nacimiento_id: this.consulta_departamento_n_id,
                    municipio_nacimiento: this.consulta_municipio_n,
                    municipio_nacimiento_id: this.municipio_nacimiento_id,
                    tipo_identificacion_id: this.tipo_identificacion_candidato,
                    tipo_identificacion: this.consulta_tipo_identificacion_candidato,
                    documento_identidad_candidato: this.documento_identidad_candidato,
                    salario: this.salario,
                    auxilio_transporte: this.auxilio_transporte,
                    fecha_inicio_labores: this.fecha_inicio_labores,
                    especificaciones_vinculacion: this.consulta_textohtml_especificacion_v,
                    especificaciones_seleccion: this.consulta_textohtml_especificacion_s,
                    consulta_textohtml_funciones: this.consulta_textohtml_funciones,
                    nombre_laboratorio: this.consulta_laboratorio,
                    laboratorio_id: this.laboratorio_id,
                    direccion_laboratorio: this.direccion_laboratorio,
                    departamento_laboratorio: this.consulta_departamento_u_l,
                    departamento_laboratorio_id: this.departamento_u_l_id,
                    municipio_laboratorio: this.consulta_municipio_u_l,
                    municipio_laboratorio_id: this.municipio_u_l_id,
                    fecha_examen_medico: this.fecha_examen,
                    recomendaciones_examen_medico: this.recomendacion_examen_medico,
                    orientacion_laboratorio: this.orientacion_laboratorio,
                    estado_solicitud: this.consulta_estado_solicitud,
                    estado_solicitud_id: this.estado_solicitud_id,
                    bonificaciones: this.bonificaciones,
                    cargos2: this.cargos2,
                    motivo_cancelacion: this.motivo_cancelacion,
                    actual: this.actual
                }

                this.cargos2.forEach(function (item, index) {
                    candidato.tipo_cargo = item.tipo_cargo == 1 ? 'Administrativo' : 'Operativo'
                    candidato.tipo_cargo_id = self.tipo_cargo[index]
                    candidato.cargo_id = item.cargo_id
                    candidato.cargo = self.consulta_lista_cargos[index]
                    candidato.riesgo_laboral = self.consulta_riesgo_laboral
                    candidato.categoria = self.consulta_subcategoria_cargos[index]
                    candidato.examenes = item.examenes
                    candidato.recomendaciones = item.recomendaciones
                })

                this.candidatos = []
                if (localStorage.getItem('candidatos') != undefined) {
                    this.candidatos = JSON.parse(localStorage.getItem('candidatos'))
                    if (index != null) {
                        this.candidatos.splice(index, 1, candidato)
                    } else {
                        this.candidatos.push(candidato)
                    }
                    localStorage.setItem('candidatos', JSON.stringify(this.candidatos))
                    if (index != null) {
                        return
                    }
                } else {
                    this.candidatos.push(candidato)
                    localStorage.setItem('candidatos', JSON.stringify(this.candidatos))
                    console.log(this.candidatos)
                }

                this.nombres_candidato = ''
                this.apellidos_candidato = ''
                this.celular_candidato = ''
                this.correo_candidato = ''
                this.documento_identidad_candidato = ''

                document.getElementById('card').className = 'animate__animated animate__fadeOutLeft'
                setTimeout(() => {
                    document.getElementById('card').className = 'animate__animated animate__fadeInRight'
                }, 200);
            } else {
                // El formulario no es válido, hacer scroll hasta el primer campo no válido
                const form = this.$refs.candidato;
                const firstInvalidField = Array.from(form.elements).find(
                    element => !element.checkValidity()
                );

                // Hacer scroll al primer campo no válido
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    firstInvalidField.focus();
                }
            }
        },
        agregarCargo(index = null) {
            if (this.$refs.candidato.checkValidity()) {
                var self = this
                var cargo = {
                    salario: this.salario,
                    auxilio_transporte: this.auxilio_transporte,
                    fecha_inicio_labores: this.fecha_inicio_labores,
                    especificaciones_vinculacion: this.consulta_textohtml_especificacion_v,
                    especificaciones_seleccion: this.consulta_textohtml_especificacion_s,
                    consulta_textohtml_funciones: this.consulta_textohtml_funciones,
                    nombre_laboratorio: this.consulta_laboratorio,
                    laboratorio_id: this.laboratorio_id,
                    direccion_laboratorio: this.direccion_laboratorio,
                    departamento_laboratorio: this.consulta_departamento_u_l,
                    departamento_laboratorio_id: this.departamento_u_l_id,
                    municipio_laboratorio: this.consulta_municipio_u_l,
                    municipio_laboratorio_id: this.municipio_u_l_id,
                    fecha_examen_medico: this.fecha_examen,
                    recomendaciones_examen_medico: this.recomendacion_examen_medico,
                    orientacion_laboratorio: this.orientacion_laboratorio,
                    estado_solicitud: this.consulta_estado_solicitud,
                    estado_solicitud_id: this.estado_solicitud_id,
                    bonificaciones: this.bonificaciones,
                    cargos2: this.cargos2,
                    motivo_cancelacion: this.motivo_cancelacion,
                    actual: this.actual
                }

                this.cargos2.forEach(function (item, index) {
                    cargo.tipo_cargo = item.tipo_cargo == 1 ? 'Administrativo' : 'Operativo'
                    cargo.tipo_cargo_id = self.tipo_cargo[index]
                    cargo.cargo_id = item.cargo_id
                    cargo.cargo = self.consulta_lista_cargos[index]
                    cargo.riesgo_laboral = self.consulta_riesgo_laboral
                    cargo.categoria = self.consulta_subcategoria_cargos[index]
                    cargo.examenes = item.examenes
                    cargo.recomendaciones = item.recomendaciones
                })

                this.cargos = []
                if (localStorage.getItem('cargos') != undefined) {
                    this.cargos = JSON.parse(localStorage.getItem('cargos'))
                    if (index != null) {
                        this.cargos.splice(index, 1, cargo)
                    } else {
                        this.cargos.push(cargo)
                    }
                    localStorage.setItem('cargos', JSON.stringify(this.cargos))
                    if (index != null) {
                        return
                    }
                } else {
                    this.cargos.push(cargo)
                    localStorage.setItem('cargos', JSON.stringify(this.cargos))
                    console.log(this.cargos)
                }

                document.getElementById('card').className = 'animate__animated animate__fadeOutLeft'
                setTimeout(() => {
                    document.getElementById('card').className = 'animate__animated animate__fadeInRight'
                }, 200);
            } else {
                // El formulario no es válido, hacer scroll hasta el primer campo no válido
                const form = this.$refs.candidato;
                const firstInvalidField = Array.from(form.elements).find(
                    element => !element.checkValidity()
                );

                // Hacer scroll al primer campo no válido
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    firstInvalidField.focus();
                }
            }
        },
        atras() {
            if (this.$refs.candidato.checkValidity()) {
                document.getElementById('card').className = 'animate__animated animate__fadeOutRight'
                setTimeout(() => {
                    document.getElementById('card').className = 'animate__animated animate__fadeInLeft'
                }, 200);
            } else {
                // El formulario no es válido, hacer scroll hasta el primer campo no válido
                const form = this.$refs.candidato;
                const firstInvalidField = Array.from(form.elements).find(
                    element => !element.checkValidity()
                );

                // Hacer scroll al primer campo no válido
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    firstInvalidField.focus();
                }
            }
        },
        formatInput(value) {
            const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return formattedValue;

        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        formatInputCamelCase(value) {
            return value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },
        validateNumericField(numero) {
            try {
                if (numero != "") {
                    if (isNaN(numero)) {
                        this.documento_identidad = numero.substr(
                            0,
                            numero.length - 1
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        getTipoPersona(item = null) {
            if (item != null) {
                this.consulta_tipo_persona = item.nombre
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
                this.consulta_tipo_identificacion_solicitante = ''
                this.tipo_identificacion = ''
                this.digito_verificacion = ''
                setTimeout(() => {
                    self.consulta_tipo_identificacion_solicitante = 'No aplica'
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
        setTipoIdentificacion(item = null, campo = null) {
            if (item != null) {
                switch (campo) {
                    case 0:
                        this.tipo_identificacion_solicitante = item.cod_tip;
                        this.consulta_tipo_identificacion_solicitante = item.des_tip
                        break
                    case 1:
                        this.tipo_identificacion_candidato = item.cod_tip;
                        this.consulta_tipo_identificacion_candidato = item.des_tip
                        break
                }
            }
        },
        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        getCliente(id, tipo_id) {
            if (id != null && id.trim() != '') {
                let self = this;
                let config = this.configHeader();
                return axios
                    .get(self.URL_API + "api/v1/clienteexist/" + id + '/' + tipo_id, config)
                    .then(function (result) {
                        if (result.data.nit != undefined && self.$route.params.id == undefined) {
                            self.showAlertConfirm(self.mensaje_cliente, 'success')
                            self.cliente_existe = true
                            return

                        } else if (result.data.numero_identificacion != undefined && self.$route.params.id == undefined) {
                            self.showAlertConfirm(self.mensaje_cliente, 'success')
                            self.cliente_existe = true
                            return
                        } else {
                            self.cliente_existe = false
                            return
                        }
                    });
            }

        },
        getServicios(item = null) {
            if (item != null) {
                this.servicio_solicitado_id = item.id
                this.consulta_servicio_solicitado = item.nombre
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/serviciosordens", config)
                .then(function (result) {
                    self.servicios = result.data
                });
        },
        getVacantes(item = null) {
            if (item != null) {
                this.vacante_id = item.id
                this.consulta_vacantes = item.nombre
            }
            this.numero_vacantes = []
            var numero = ''
            for (let i = 1; i <= 20; i++) {
                numero++;
                this.numero_vacantes.push({ id: i, nombre: "" + numero })
            }
            // let self = this;
            // let config = this.configHeader();
            // axios
            //     .get(self.URL_API + "api/v1/serviciosordens", config)
            //     .then(function (result) {
            //         self.numero_vacantes = result.data
            //     });
        },
        getEstados(item = null) {
            let self = this;
            if (item != null) {
                this.consulta_estado_solicitud = item.nombre
                this.estado_solicitud_id = item.id
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/estadoordens", config)
                .then(function (result) {
                    self.estados_solicitud = result.data
                });
        },
        getLaboratorios(item = null) {
            let self = this;
            if (item != null) {
                console.log(item)
                this.consulta_laboratorio = item.nombre
                this.laboratorio_id = item.id
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/laboratorioos", config)
                .then(function (result) {
                    self.laboratorios = result.data
                });
        },
        getBonificaciones() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/bonificacionordens", config)
                .then(function (result) {
                    self.bonificaciones = result.data
                    self.bonificaciones.forEach(function (item) {
                        item.valor = ''
                        item.isChecked = false
                    });
                });
        },
        getMunicipios(item, ordenCampo, index) {
            let self = this;
            this.setLabelDepartamento(item, ordenCampo, index)
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/municipios/" + item.id, config)
                .then(function (result) {
                    self.municipios = result.data
                });
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
        getDepartamentos(id) {
            let self = this;
            this.setLabelPais(id)
            id = id.id != undefined ? id.id : id
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/departamentos/" + id, config)
                .then(function (result) {
                    self.departamentos = result.data
                });
        },
        setMunicipios(item, campo) {
            if (item != null) {
                switch (campo) {
                    case 0:
                        this.ciudad_prestacion_servicio_id = item.id;
                        this.consulta_municipio_p_s = item.nombre
                        break
                    case 1:
                        this.municipio_nacimiento_id = item.id;
                        this.consulta_municipio_n = item.nombre
                        break
                    case 2:
                        this.municipio_u_l_id = item.id
                        this.consulta_municipio_u_l = item.nombre;
                        break
                }
            }
        },
        getRiesgosLaborales(item = null, index = null) {
            if (item != null) {
                this.cargos2[0].riesgo_laboral_id = item.id;
                this.consulta_riesgo_laboral[index] = item.nombre;
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
        getListaCargos(item = null, index = null) {
            if (item != null) {
                this.categoria_cargo_id = item.id
                this.consulta_subcategoria_cargos[index] = item.nombre
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
                this.cargos2[index].cargo_id = item.id
                this.consulta_lista_cargos[index] = item.nombre
            }
            this.getListaRecomendaciones(index)
            this.getListaExamenes(index)
        },
        retornoTexto(index, texto) {
            switch (index) {
                case 0:
                    this.cargos2[0].funcion_cargo = texto
                    this.consulta_textohtml_funciones = texto
                    break;
                case 1:
                    this.consulta_textohtml_especificacion_v = texto
                    break;
                case 2:
                    this.consulta_textohtml_especificacion_s = texto
                    break;
            }
        },
        setLabelDepartamento(item = null, campo = null) {
            if (item != null) {
                switch (campo) {
                    case 0:
                        this.consulta_departamento_p_s = item.nombre
                        this.consulta_departamento_p_s_id = item.id
                        break
                    case 1:
                        this.consulta_departamento_n = item.nombre
                        this.consulta_departamento_n_id = item.id
                        break
                    case 2:
                        this.consulta_departamento_u_l = item.nombre
                        this.departamento_u_l_id = item.id
                        break
                }
            }
        },
        setLabelPais(item = null) {
            if (item.id != undefined) {
                this.consulta_pais_n_id = item.id
                this.consulta_pais_n = item.nombre
            }
        },
        getSubCategoriaCargo(id, index = null) {
            if (index != null) {
                if (this.cargos2[index].cargo_id != '') {
                    this.consulta_subcategoria_cargos[index] = ' '
                    this.consulta_lista_cargos[index] = ' '
                    this.cargos2[index].cargo_id = ''
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
        getCategoriaCargo() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/categoriacargo", config)
                .then(function (result) {
                    self.tipo_cargos = result.data

                });
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
        getListaRecomendaciones(index = null) {
            if (index != null) {
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
        getListaExamenes(index = null) {
            if (index != null) {
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
        cargarArchivo(event) {
            var self = this
            const file = event.target.files;
            self.file.push(file[0])
        },

    }
};
</script>
<style scoped>
.card {
    width: 100%;
    margin: 40px 0px 40px 0px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

textarea {
    width: 100%;
    border-radius: 5px;
    padding: 15px;
}

#seccion,
.orientacion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

.lista-multiple {
    border: 0.7px rgba(207, 205, 205, 0.815) solid;
    border-radius: 7px;
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
}

.col-md-6 i {
    font-size: 2rem;
    padding: 3px;
    cursor: pointer;
    color: #198754;
}

.check {
    display: flex;
    align-items: center;
    /* Alinea verticalmente los elementos */
}

.check input[type="checkbox"] {
    margin-right: 10px;
    /* Espacio entre el checkbox y la etiqueta */
}

.valor-bonificacion {
    margin-left: 20px;
    border-radius: 5px;
    border: 1px solid;
    border-color: #198754;
    padding: 5px;
}

.pagination li {
    cursor: pointer;
}

.pagination li a {
    color: #198754;
}
</style>