<template>
    <div class="container">
        <h2>Recontratación temporal</h2>
        <form>
            <h6 class="tituloseccion">Datos Del Documento Del Empleado</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchTable nombreCampo="Planilla eventual" @getEmpleados="getEmpleados" eventoCampo="getEmpleados"
                            :nombreItem="camposEmpleado" :endpoint="endpointEmpleados" placeholder="Planilla eventual"
                            :showModal="showModal" :datos="empleados" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de identificación" @getTiposIdentificacion="getTiposIdentificacion"
                            eventoCampo="getTiposIdentificacion" nombreItem="des_tip" :registros="tiposIdentificacion"
                            placeholder="Tipo de identificación" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Número de identificación</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Código alterno</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Expedición del documento de
                        identidad</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" nombreItem="nom_pai" :registros="paises" ubicacion="pais expedicion"
                            @getDepartamentos="getDepartamentos" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento expedicion" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad expedicion" placeholder="Ciudad" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Del Empleado</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Primer nombre</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_nombre" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Segundo nombre</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="segundo_nombre" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Primer apellido</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_apellido" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Segundo apellido</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="segundo_apellido" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Ciudad de nacimiento</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais nacimiento" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />date
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento nacimiento" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Género" @getGenero="getGenero" eventoCampo="getGenero" nombreItem="des_gen"
                            :registros="generos" placeholder="Género" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado civil" @getEstadoCivil="getEstadoCivil" eventoCampo="getEstadoCivil"
                            nombreItem="des_est" :registros="estadosCiviles" placeholder="Estado civil" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_nacimiento" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Básicos Del Empleado</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Grupo sanguineo" @getGrupoSanguineo="getGrupoSanguineo"
                            eventoCampo="getGrupoSanguineo" nombreItem="nombre" :registros="gruposSanguineos"
                            placeholder="Grupo sanguineo" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Factor RH" @getFactorRH="getFactorRH" eventoCampo="getFactorRH"
                            :registros="factoresRH" nombreItem="nombre" placeholder="Factor RH" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Clase Libreta Militar" @getClaseLibretaMilitar="getClaseLibretaMilitar"
                            eventoCampo="getClaseLibretaMilitar" :registros="clasesLibretaMilitar" nombreItem="nombre"
                            placeholder="Clase Libreta Militar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Nacionalidad" @getNacionalidad="getNacionalidad"
                            eventoCampo="getNacionalidad" :registros="nacionalidades" nombreItem="nombre"
                            placeholder="Nacionalidad" />
                    </div>
                </div>
                <div class="row" v-if="claseLibretaMilitar != 'No aplica'">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de libreta militar</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_libreta_militar" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Distrito libreta militar</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="distrito_libreta_militar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Estatura</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="estatura" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Peso</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="peso" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Residencia</h6>
            <div id="seccion">
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Ciudad de residencia</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais residencia" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento residencia" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad residencia" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Dirección</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="direccion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Barrio</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="barrio" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="telefono" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Celular</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="celular" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electrónico:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="correo" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electrónico alternativo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="correo_alternativo" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">En caso de emergencia avisar a:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="avisar_emergencia" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Autoriza el manejo de datos a la
                            compañía?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="manejo_datos" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Salariales</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Régimen salarial" @getRegimenSalarial="getRegimenSalarial"
                            eventoCampo="getRegimenSalarial" :registros="regimenesSalariales" nombreItem="nombre"
                            placeholder="Régimen salarial" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Forma de pago" nombreItem="nom_pag" @getFormaPago="getFormaPago"
                            eventoCampo="getFormaPago" :registros="formaspago" placeholder="Forma de pago" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Código del banco" @getBanco="getBanco" eventoCampo="getBanco"
                            nombreItem="nom_ban" :registros="bancos" placeholder="Código del banco" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_cuenta" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pago electrónico:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="pago_electronico" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Modalidad Retención" @getModalidadRetencion="getModalidadRetencion"
                            eventoCampo="getModalidadRetencion" :registros="modalidadesRetencion" nombreItem="nombre"
                            placeholder="Modalidad Retención" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje de Retención:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="porcentaje_retencion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Valor Salud Año Anterior:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="salud_anio_anteior" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Cálculo IMAN" @getCalculoIman="getCalculoIman" eventoCampo="getCalculoIman"
                            :registros="calculosIman" nombreItem="nombre" placeholder="Cálculo IMAN" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Estabilidad Laboral</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="estabilidad_laboral" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Vacaciones" @getVacaciones="getVacaciones" eventoCampo="getVacaciones"
                            :registros="vacaciones" nombreItem="nombre" placeholder="Vacaciones" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Días de vacaciones por año:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="dias_vacaciones" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Sábado es hábil</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="sabado_habil" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Pagar día 31</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="pagar_31" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Del Contrato</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de contrato:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_contrato" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha Celebración:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_celebracion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de contrato" @getTipoContrato="getTipoContrato"
                            eventoCampo="getTipoContrato" nombreItem="nom_con" :registros="tiposcontrato"
                            placeholder="Tipo de contrato" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado Laboral del Empleado"
                            @getEstadoLaboralEmpleado="getEstadoLaboralEmpleado" eventoCampo="getEstadoLaboralEmpleado"
                            nombreItem="nom_est" :registros="estadoslaboralesempleados"
                            placeholder="Estado Laboral del Empleado" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Ciudad de contrato</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais contrato" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento contrato" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad contrato" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Notas al contrato:</label>
                        <textarea class="form-control" v-model="nota_contrato" aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Estructura De Costos</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchTable nombreCampo="Convenio" @getConvenio="getConvenio" eventoCampo="getConvenio"
                            :datos="convenios" endpoint="centrotrabajo" :nombreItem="camposConvenio"
                            placeholder="Compañía" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal conevnio" :registros="municipios" placeholder="Sucursal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Centro de costos convenio" :registros="municipios"
                            placeholder="Centro de costos" />
                    </div>
                </div>
                <div class="row" v-for="item, index in numeroClasificadorConvenio" :key="index + 'b'">
                    <div class="col">
                        <SearchTable :nombreCampo="'Clasificador ' + (index + 1) + ' del Convenio'"
                            @getConvenio="getConvenio" eventoCampo="getConvenio" :datos="convenios"
                            :endpoint="endpointConvenios" :nombreItem="camposConvenio"
                            placeholder="Clasificador del convenio" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span v-if="numeroClasificadorConvenio < 8" id="clasificador"
                            @click="numeroClasificadorConvenio < 8 ? numeroClasificadorConvenio++ : numeroClasificadorConvenio"
                            style="cursor: pointer"><i class="bi bi-plus-circle-fill"></i>
                            Agregar clasificador de convenio
                        </span>
                    </div>
                    <div class="col">
                        <span v-if="numeroClasificadorConvenio > 1" id="clasificador"
                            @click="numeroClasificadorConvenio > 1 ? numeroClasificadorConvenio-- : numeroClasificadorConvenio"
                            style="cursor: pointer"><i class="bi bi-dash-circle-fill"></i>
                            Eliminar clasificador de convenio
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Compañía" @getCompania="getCompania" eventoCampo="getCompania"
                            :registros="companias" nombreItem="nom_cia" placeholder="Compañía" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal" @getSucursales="getSucursales" eventoCampo="getSucursales"
                            :registros="sucursales" nombreItem="nom_suc" placeholder="Sucursal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Centro de costos" @getCentroCosto="getCentroCosto"
                            eventoCampo="getCentroCosto" :registros="centrosCostos" nombreItem="nom_cco"
                            placeholder="Centro de costos" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Distribución por Centro de Costos
                            Local:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="distribucion_centro_costos" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Distribución por Centro de Costos
                            NIIF:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="distribucion_centro_costos_nif" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row" v-for="item, index in numeroClasificador" :key="index + 'a'">
                    <div class="col">
                        <SearchTable :nombreCampo="'Clasificador ' + (index + 1)" :datos="convenios"
                            @getConvenio="getConvenio" eventoCampo="getConvenio" :endpoint="endpointConvenios"
                            :nombreItem="camposConvenio" placeholder="Clasificador del convenio" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span v-if="numeroClasificador < 7" id="clasificador"
                            @click="numeroClasificador < 8 ? numeroClasificador++ : numeroClasificador"
                            style="cursor: pointer"><i class="bi bi-plus-circle-fill"></i>
                            Agregar clasificador
                        </span>
                    </div>
                    <div class="col">
                        <span v-if="numeroClasificador > 1" id="clasificador"
                            @click="numeroClasificador > 1 ? numeroClasificador-- : numeroClasificador"
                            style="cursor: pointer"><i class="bi bi-dash-circle-fill"></i>
                            Eliminar clasificador
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Área" @getArea="getArea" eventoCampo="getArea" :registros="areas"
                            nombreItem="des_area" placeholder="Clasificador del convenio" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal seguridad social" @getSucursalsSS="getSucursalsSS"
                            eventoCampo="getSucursalsSS" :registros="sucursalesss" nombreItem="descripcion"
                            placeholder="Clasificador del convenio" />
                    </div>
                    <div class="col">
                        <SearchTable nombreCampo="Centro de trabajo" @getCentroTrabajo="getCentroTrabajo"
                            eventoCampo="getCentroTrabajo" :datos="convenios" :nombreItem="camposCentroTrabajo"
                            endpoint="centrotrabajo" placeholder="Centro de trabajo" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Cuenta de gastos local" @getCuentagastosl="getCuentagastosl"
                            eventoCampo="getCuentagastosl" :registros="cuentagastosl" nombreItem="descripcion"
                            placeholder="Cuenta de gastos local" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Cuenta de gastos NIF" @getCuentaNIF="getCuentaNIF"
                            eventoCampo="getCuentaNIF" :registros="cuentasNIF" nombreItem="descripcion"
                            placeholder="Cuenta de gastos NIF" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Observaciones:</label>
                        <textarea class="form-control" v-model="observaciones" aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Deducibles</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Vivienda:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="vivienda" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Salud / Medicina Prepagada:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="medicina_prepagada" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Dependiente:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="dependiente" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos De Contratación</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Salario Básico:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="salario_basico" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <SearchTable nombreCampo="Cargo" @getCargo="getCargo" eventoCampo="getCargo" :datos="cargos"
                            :nombreItem="camposCargos" placeholder="Cargo" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Lider?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="lider" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Ciudad de labor</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais labor" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento labor" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad labor" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha ingreso:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_ingreso" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha finalización:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_finalizacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">No. días periodo prueba:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="periodo_prueba" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha finalización periodo prueba:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="finalizacion_periodo_prueba" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Modo de liquidación" @getModoLiquidacion="getModoLiquidacion"
                            eventoCampo="getModoLiquidacion" nombreItem="des_mod" :registros="modosliquidacion"
                            placeholder="Modo de liquidación" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Horas contratadas al mes:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="horas_contratadas" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Valor hora:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="valor_hora" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Clase de salario" @getClaseSalario="getClaseSalario"
                            eventoCampo="getClaseSalario" :registros="clasesSalario" nombreItem="Descripción"
                            placeholder="Clase de salario" />
                    </div>
                    <div class="col">
                        <SearchTable nombreCampo="Fondo de salud" @getFondoSalud="getFondoSalud" eventoCampo="getFondoSalud"
                            :datos="fondosSalud" :nombreItem="camposFondoSalud" placeholder="Fondo de salud" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Fondo de pensión" @getFondoPension="getFondoPension"
                            eventoCampo="getFondoPension" :registros="fondosPension" nombreItem="nom_fdo"
                            placeholder="Fondo de pensión" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Caja de compensación" @getCajaCompensacion="getCajaCompensacion"
                            eventoCampo="getCajaCompensacion" :registros="cajasCompensacion" nombreItem="nom_fdo"
                            placeholder="Caja de compensación" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Administradora de riesgos laborales" @getRiesgoLaboral="getRiesgoLaboral"
                            eventoCampo="getRiesgoLaboral" :registros="riesgosLaborales" nombreItem="nom_fdo"
                            placeholder="Administradora de riesgos laborales" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje ARL:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="porcentaje_arl" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Fondo de Cesantías" @getFondoCesantias="getFondoCesantias"
                            eventoCampo="getFondoCesantias" :registros="fondosCesantias" nombreItem="nom_fdo"
                            placeholder="Fonde de Cesantías" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo medidas certificadas (DIAN)" @getTipoMedidaDian="getTipoMedidaDian"
                            eventoCampo="getTipoMedidaDian" :registros="tiposMedidaDian" nombreItem="Descripcion"
                            placeholder="Tipo medidas certificadas (DIAN)" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de cotizante" @getTipoCotizante="getTipoCotizante"
                            eventoCampo="getTipoCotizante" :registros="tiposCotizante" nombreItem="des_cot"
                            placeholder="Tipo de cotizante" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Subtipo de cotizante" @getSubTipoCotizante="getSubTipoCotizante"
                            eventoCampo="getSubTipoCotizante" :registros="subTiposCotizante" nombreItem="Des_SubTip"
                            placeholder="Subtipo de cotizante" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Extranjero no pensión?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="extranjero_no_pension" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Reside en el extranjero?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="reside_en_extranjero" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Pago por días</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="pago_por_dias" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Es variable - comisiones?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="es_variable" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Plantilla Para Control De Liquidación</h6>
            <div id="seccion">
                <div class="col">
                    <SearchList nombreCampo="Planilla eventual" :registros="municipios" placeholder="Planilla eventual" />
                </div>
            </div>
            <button class="btn btn-success"
                @click="confirmationMessage('Está seguro de guardar la información del formulario?', 'Si', 'Cancelar', 'Información guardada con exito')">Guardar</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import SearchList from './SearchList.vue';
import SearchTable from './SearchTable.vue';
import {Token} from '../Mixins/Token'

export default {
    components: {
        SearchList,
        SearchTable
    },
    mixins:[Token],
    props: {
        menu: []
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            pais: '',
            paises: [],
            departamento: '',
            departamentos: [],
            ciudad: '',
            municipio: '',
            municipios: [],
            tipoIdentificacion: '',
            tiposIdentificacion: [],
            genero: '',
            generos: [],
            estadoCivil: '',
            estadosCiviles: [],
            sucursalsss: '',
            sucursalesss: [],
            formapago: '',
            formaspago: [],
            banco: '',
            bancos: [],
            tipocontrato: '',
            tiposcontrato: [],
            compania: '',
            companias: [],
            sucursal: '',
            sucursales: [],
            centroCosto: '',
            centrosCostos: [],
            area: '',
            areas: [],
            convenio: '',
            convenios: [],
            camposConvenio: ['cod_conv', 'nom_conv'],
            centroTrabajo: '',
            centrosTrabajo: [],
            camposCentroTrabajo: ['cod_CT', 'descripcion'],
            endpointConvenios: '',
            empleado: '',
            empleados: [],
            camposEmpleado: ['cod_emp', 'nom_emp'],
            endpointEmpleados: 'empleado',
            estadolaboralempleado: '',
            estadoslaboralesempleados: [],
            cuentagastol: '',
            cuentagastosl: [],
            cuentaNIF: '',
            cuentasNIF: [],
            cargo: '',
            cargos: [],
            camposCargos: ['cod_car', 'nom_car'],
            modoliquidacion: '',
            modosliquidacion: [],
            claseSalario: '',
            clasesSalario: [],
            fondoSalud: '',
            fondosSalud: [],
            camposFondoSalud: ['cod_fdo', 'nom_fdo'],
            fondoPension: '',
            fondosPension: [],
            cajaCompensacion: '',
            cajasCompensacion: [],
            riesgoLaboral: '',
            riesgosLaborales: [],
            fondoCesantias: '',
            fondosCesantias: [],
            tipoCotizante: '',
            tiposCotizante: [],
            subTipoCotizante: '',
            subTiposCotizante: [],
            grupoSanguineo: '',
            gruposSanguineos: [],
            factorRH: '',
            factoresRH: [],
            claseLibretaMilitar: '',
            clasesLibretaMilitar: [],
            nacionalidad: '',
            nacionalidades: [],
            regimenSalarial: '',
            regimenesSalariales: [],
            modalidadRetencion: '',
            modalidadesRetencion: [],
            calculoIman: '',
            calculosIman: [],
            vacacion: '',
            vacaciones: [],
            tipoMedidaDian: '',
            tiposMedidaDian: [],
            showModal: true,
            numero_identificacion: '',
            codigo_alterno: '',
            primer_nombre: '',
            segundo_nombre: '',
            primer_apellido: '',
            segundo_apellido: '',
            fecha_nacimiento: '',
            numero_libreta_militar: '',
            distrito_libreta_militar: '',
            estatura: '',
            peso: '',
            direccion: '',
            barrio: '',
            telefono: '',
            celular: '',
            correo: '',
            correo_alternativo: '',
            avisar_emergencia: '',
            manejo_datos: false,
            numero_cuenta: '',
            pago_electronico: '',
            porcentaje_retencion: '',
            salud_anio_anteior: '',
            estabilidad_laboral: false,
            dias_vacaciones: '',
            sabado_habil: false,
            pagar_31: false,
            numero_contrato: '',
            fecha_celebracion: '',
            nota_contrato: '',
            distribucion_centro_costos: false,
            distribucion_centro_costos_nif: false,
            observaciones: '',
            vivienda: '',
            medicina_prepagada: '',
            dependiente: false,
            salario_basico: false,
            lider: false,
            fecha_ingreso: '',
            fecha_finalizacion: '',
            periodo_prueba: '',
            finalizacion_periodo_prueba: '',
            horas_contratadas: '',
            valor_hora: '',
            porcentaje_arl: '',
            extranjero_no_pension: false,
            reside_en_extranjero: false,
            pago_por_dias: false,
            es_variable: false,
            numeroClasificadorConvenio: 1,
            numeroClasificador: 1,
            paisExpedicion: '',
            departamentoExpedicion: '',
            ciudadExpedicion: '',
            paisNacimiento: '',
            departamentoNacimiento: '',
            ciudadNacimiento: '',
            paisResidencia: '',
            departamentoResidencia: '',
            ciudadResidencia: '',
            paisContrato: '',
            departamentoContrato: '',
            ciudadContrato: '',
            paisLabor: '',
            departamentoLabor: '',
            ciudadLabor: '',
            autorizacionModulo: false,
            ruta:''
        };
    },

    created() {
        // this.getEmpleados()
        // this.getTiposIdentificacion()
        this.getPaises()
        // this.getGenero()
        // this.getEstadoCivil()
        // this.getFormaPago()
        // this.getBanco()
        // this.getTipoContrato()
        // this.getEstadoLaboralEmpleado()
        // this.getConvenio()
        // this.getSucursalsSS()
        // this.getCompania()
        // this.getSucursales()
        // this.getCentroCosto()
        // this.getArea()
        // this.getCentroTrabajo()
        // this.getCuentagastosl()
        // this.getCargo()
        // this.getModoLiquidacion()
        // this.getClaseSalario()
        // this.getFondoSalud()
        // this.getFondoPension()
        // this.getCajaCompensacion()
        // this.getRiesgoLaboral()
        // this.getFondoCesantias()
        // this.getTipoCotizante()
        // this.getSubTipoCotizante()
        // this.getGrupoSanguineo()
        // this.getFactorRH()
        // this.getClaseLibretaMilitar()
        // this.getNacionalidad()
        // this.getRegimenSalarial()
        // this.getModalidadRetencion()
        // this.getCalculoIman()
        // this.getVacaciones()
    },
    mounted() {
        this.ruta = this.$route.path.substring(1)
    },
    // watch: {
    //     ruta() {
    //         this.autorizado(this.menu)
    //     }
    // },
    methods: {
        // autorizado(menu) {
        //     let autoriced = ''
        //     autoriced = menu.filter(menus => menus.url === this.ruta);
        //     if (autoriced.length == 0) {
        //         this.$router.go(-1);
        //     }
        // },
        getEmpleados(valor = null) {
            if (valor != null) {
                this.empleado = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/empleado", config).then(function (result) {
                self.empleados = result.data;
            });
        },
        getPaises(valor = null) {
            if (valor != null) {
                this.pais = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/paises", config).then(function (result) {
                self.paises = result.data;
            });
        },
        getDepartamentos(item, campo, valor) {
            this.asignarUbicacion(campo, valor)
            if (!isNaN(item)) {
                this.departamento = item;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/departamentos/" + item, config).then(function (result) {
                self.departamentos = result.data;
            });
        },
        getMunicipios(item, campo, valor) {
            this.asignarUbicacion(campo, valor)
            if (!isNaN(item)) {
                this.municipio = item;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/municipios/" + item, config).then(function (result) {
                self.municipios = result.data;
            });
        },
        setMunicipios(item, campo, valor) {
            this.asignarUbicacion(campo, valor)
        },
        asignarUbicacion(campo, valor) {
            switch (campo) {
                case 'pais expedicion':
                    this.paisExpedicion = valor;
                    break;
                case 'departamento expedicion':
                    this.departamentoExpedicion = valor;
                    break;
                case 'ciudad expedicion':
                    this.ciudadExpedicion = valor
                    break;
                case 'pais nacimiento':
                    this.paisNacimiento = valor;
                    break;
                case 'departamento nacimiento':
                    this.departamentoNacimiento = valor;
                    break;
                case 'ciudad nacimiento':
                    this.ciudadNacimiento = valor;
                    break;
                case 'pais residencia':
                    this.paisResidencia = valor;
                    break;
                case 'departamento residencia':
                    this.departamentoResidencia = valor;
                    break;
                case 'ciudad residencia':
                    this.ciudadResidencia = valor;
                    break;
                case 'pais contrato':
                    this.paisContrato = valor;
                    break;
                case 'departamento contrato':
                    this.departamentoContrato = valor;
                    break;
                case 'ciudad contrato':
                    this.ciudadContrato = valor;
                    break;
                case 'pais labor':
                    this.paisLabor = valor;
                    break;
                case 'departamento labor':
                    this.departamentoLabor = valor;
                    break;
                case 'ciudad labor':
                    this.ciudadLabor = valor;
                    break;
            }
        },
        getTiposIdentificacion(valor = null) {
            if (valor != null) {
                this.tipoIdentificacion = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/tipodocumentolista", config).then(function (result) {
                self.tiposIdentificacion = result.data;
            });
        },
        getGenero(valor = null) {
            if (valor != null) {
                this.genero = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/genero", config).then(function (result) {
                self.generos = result.data;
            });
        },
        getEstadoCivil(valor = null) {
            if (valor != null) {
                this.estadoCivil = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/estadocivil", config).then(function (result) {
                self.estadosCiviles = result.data;
            });
        },
        getFormaPago(valor = null) {
            if (valor != null) {
                this.formapago = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/formapago", config).then(function (result) {
                self.formaspago = result.data;
            });
        },
        getBanco(valor = null) {
            if (valor != null) {
                this.banco = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/banco", config).then(function (result) {
                self.bancos = result.data;
            });
        },
        getTipoContrato(valor = null) {
            if (valor != null) {
                this.tipocontrato = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/tipocontrato", config).then(function (result) {
                self.tiposcontrato = result.data;
            });
        },
        getEstadoLaboralEmpleado(valor = null) {
            if (valor != null) {
                this.estadolaboralempleado = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/estadolaboralempleado", config).then(function (result) {
                self.estadoslaboralesempleados = result.data;
            });
        },
        getConvenio(valor = null) {
            if (valor != null) {
                this.convenio = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/convenio", config).then(function (result) {
                self.convenios = result.data;
            });
        },
        getSucursalsSS(valor = null) {
            if (valor != null) {
                this.sucursalsss = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/sucursalss", config).then(function (result) {
                self.sucursalesss = result.data;
            });
        },
        getCompania(valor = null) {
            if (valor != null) {
                this.compania = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/compania", config).then(function (result) {
                self.companias = result.data;
            });
        },
        getSucursales(valor = null) {
            if (valor != null) {
                this.sucursal = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/sucursal", config).then(function (result) {
                self.sucursales = result.data;
            });
        },
        getCentroCosto(valor = null) {
            if (valor != null) {
                this.centroCosto = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/centrocostos", config).then(function (result) {
                self.centrosCostos = result.data;
            });
        },
        getArea(valor = null) {
            if (valor != null) {
                this.area = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/area", config).then(function (result) {
                self.areas = result.data;
            });
        },
        getCentroTrabajo(valor = null) {
            if (valor != null) {
                this.centroTrabajo = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/centrotrabajo", config).then(function (result) {
                self.centrosTrabajo = result.data;
            });
        },
        getCuentagastosl(valor = null) {
            if (valor != null) {
                this.cuentagastol = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/cuentagastosl", config).then(function (result) {
                self.cuentagastosl = result.data;
            });
        },
        getCuentaNIF(valor = null) {
            if (valor != null) {
                this.cuentaNIF = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/cuentagastosl", config).then(function (result) {
                self.cuentasNIF = result.data;
            });
        },
        getCargo(valor = null) {
            if (valor != null) {
                this.cargo = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/cargo", config).then(function (result) {
                self.cargos = result.data;
            });
        },
        getModoLiquidacion(valor = null) {
            if (valor != null) {
                this.modoliquidacion = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/modoliquidacion", config).then(function (result) {
                self.modosliquidacion = result.data;
            });
        },
        getClaseSalario(valor = null) {
            if (valor != null) {
                this.claseSalario = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/clasesalario", config).then(function (result) {
                self.clasesSalario = result.data;
            });
        },
        getFondoSalud(valor = null) {
            if (valor != null) {
                this.fondoSalud = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/fondosalud", config).then(function (result) {
                self.fondosSalud = result.data;
            });
        },
        getFondoPension(valor = null) {
            if (valor != null) {
                this.fondoPension = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/fondopension", config).then(function (result) {
                self.fondosPension = result.data;
            });
        },
        getCajaCompensacion(valor = null) {
            if (valor != null) {
                this.cajaCompensacion = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/fondopension", config).then(function (result) {
                self.cajasCompensacion = result.data;
            });
        },
        getRiesgoLaboral(valor = null) {
            if (valor != null) {
                this.riesgoLaboral = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/riesgolaboral", config).then(function (result) {
                self.riesgosLaborales = result.data;
            });
        },
        getFondoCesantias(valor = null) {
            if (valor != null) {
                this.fondoCesantias = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/fondocesantias", config).then(function (result) {
                self.fondosCesantias = result.data;
            });
        },
        getTipoCotizante(valor = null) {
            if (valor != null) {
                this.tipoCotizante = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/tipocotizante", config).then(function (result) {
                self.tiposCotizante = result.data;
            });
        },
        getSubTipoCotizante(valor = null) {
            if (valor != null) {
                this.subTipoCotizante = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/subtipocotizante", config).then(function (result) {
                self.subTiposCotizante = result.data;
            });
        },
        getTipoMedidaDian(valor = null) {
            if (valor != null) {
                this.tipoMedidaDian = valor;
            }
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/tipomedidadian", config).then(function (result) {
                self.tiposMedidaDian = result.data;
            });
        },
        getGrupoSanguineo(valor = null) {
            if (valor != null) {
                this.grupoSanguineo = valor;
            }
            this.gruposSanguineos = [
                { codigo: '01', nombre: 'A' },
                { codigo: '02', nombre: 'B' },
                { codigo: '03', nombre: 'AB' },
                { codigo: '04', nombre: 'O' },
            ]
        },
        getFactorRH(valor = null) {
            if (valor != null) {
                this.factorRH = valor;
            }
            this.factoresRH = [
                { codigo: '01', nombre: '+' },
                { codigo: '02', nombre: '-' },

            ]
        },
        getClaseLibretaMilitar(valor = null) {
            if (valor != null) {
                this.claseLibretaMilitar = valor;
            }
            this.clasesLibretaMilitar = [
                { codigo: '01', nombre: 'No aplica' },
                { codigo: '02', nombre: 'Primera' },
                { codigo: '02', nombre: 'Segunda' },

            ]
        },
        getNacionalidad(valor = null) {
            if (valor != null) {
                this.nacionalidad = valor;
            }
            this.nacionalidades = [
                { codigo: '01', nombre: 'Colombiano' },
                { codigo: '02', nombre: 'Doble' },
                { codigo: '03', nombre: 'Extrangero' },

            ]
        },
        getRegimenSalarial(valor = null) {
            if (valor != null) {
                this.regimenSalarial = valor;
            }
            this.regimenesSalariales = [
                { codigo: '01', nombre: 'Anterior' },
                { codigo: '02', nombre: 'Ley 50' },

            ]
        },
        getModalidadRetencion(valor = null) {
            if (valor != null) {
                this.modalidadRetencion = valor;
            }
            this.modalidadesRetencion = [
                { codigo: '01', nombre: 'Modalidad 1' },
                { codigo: '02', nombre: 'Modalidad 2' },

            ]
        },
        getCalculoIman(valor = null) {
            if (valor != null) {
                this.calculoIman = valor;
            }
            this.calculosIman = [
                { codigo: '01', nombre: 'No aplica' },
                { codigo: '02', nombre: 'Aplica' },
                { codigo: '03', nombre: 'Trabajador por cuenta propia' },
            ]
        },
        getVacaciones(valor = null) {
            if (valor != null) {
                this.vacacion = valor;
            }
            this.vacaciones = [
                { codigo: '01', nombre: 'Individuales' },
                { codigo: '02', nombre: 'Colectivas' },
            ]
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
                    this.showAlert(messageConfirm, 'success')
                } else if (result.isDenied) {
                    this.showAlert('Accion cancelada', 'info')
                }
            })
        },
    },
};
</script>
<style scoped>
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

/* Select con filtro personalizado */
#contenedor-select {
    position: relative;
}

#select1 {
    z-index: 200;
}

#select2 {
    z-index: 100;
}

#select1,
#select2 {
    padding: 5px;
    border: solid #7c7e7e 0.5px;
    border-radius: 10px;
    text-align: left;
    max-height: 250px;
    width: 97%;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    top: 70px;
    left: 13px;
    background-color: white;
    cursor: pointer;
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

#select1 #lista1,
#select2 #lista2 {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

#select1 #lista1:hover,
#select2 #lista2:hover {
    background-color: #0d6efd;
    color: white;
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

button {
    margin: 30px;
}
</style>