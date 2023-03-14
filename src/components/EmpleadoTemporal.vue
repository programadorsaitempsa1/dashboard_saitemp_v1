<template>
    <div class="container">
        <h2>Recontratación temporal</h2>
        <form>
            <h6 class="tituloseccion">Datos del Documento del Empleado</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Código o nombre del empleado" :registros="empleados"
                            placeholder="Código o nombre del empleado" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de identificación" :registros="tiposIdentificacion"
                            placeholder="Tipo de identificación" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de identificación</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Código alterno</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Expedición del documento de
                        identidad</label>
                    <div class="col">
                        <div class="row" id="contenedor-select">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Pais:</label>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                    <input type="text" @click="hover3 = !hover3" autocomplete="off"
                                        @input="filterResults(pais, paises, 'paises')" class="form-control"
                                        id="exampleInputEmail2" placeholder="pais" aria-describedby="emailHelp"
                                        v-model="pais" />
                                    <span class="input-group-text" id="basic-addon3"><i
                                            class="bi bi-chevron-compact-down"></i></span>
                                </div>
                            </div>
                            <div v-if="hover3 && paises.length > 0" id="select1" @mouseleave="hover3 = false">
                                <div id="lista1" v-for="(item, index) in paisesFilter" :key="index"
                                    @click="pais = item.nombre, departamentoId(pais), hover3 = !hover3, filterResults('', paises, 'paises')">
                                    {{ item.nombre }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row" id="contenedor-select">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Departamento:</label>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                    <input type="text" @click="hover4 = !hover4" autocomplete="off"
                                        @input="filterResults(departamento, departamentos, 'departamentos')"
                                        class="form-control" id="exampleInputEmail2"
                                        placeholder="Código o nombre del empleado" aria-describedby="emailHelp"
                                        v-model="departamento" />
                                    <span class="input-group-text" id="basic-addon3"><i
                                            class="bi bi-chevron-compact-down"></i></span>
                                </div>
                            </div>
                            <div v-if="hover4 && departamentos.length > 0" id="select1" @mouseleave="hover4 = false">
                                <div id="lista1" v-for="(item, index) in departamentosFilter" :key="index"
                                    @click="departamento = item.nombre, departamentoId(departamento), hover4 = !hover4, filterResults('', departamentos, 'departamentos')">
                                    {{ item.nombre }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row" id="contenedor-select">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Ciudad:</label>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                    <input type="text" @click="hover5 = !hover5" autocomplete="off"
                                        @input="filterResults(ciudad, ciudades, 'ciudades')" class="form-control"
                                        id="exampleInputEmail2" placeholder="Ciudad" aria-describedby="emailHelp"
                                        v-model="ciudad" />
                                    <span class="input-group-text" id="basic-addon3"><i
                                            class="bi bi-chevron-compact-down"></i></span>
                                </div>
                            </div>
                            <div v-if="hover5 && ciudades.length > 0" id="select1" @mouseleave="hover5 = false">
                                <div id="lista1" v-for="(item, index) in ciudadesFilter" :key="index"
                                    @click="ciudad = item.nombre, departamentoId(ciudad), hover5 = !hover5, filterResults('', ciudades, 'ciudades')">
                                    {{ item.nombre }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos del Empleado</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Primer nombre</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Segundo nombre</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Primer apellido</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Segundo apellido</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Ciudad de nacimiento</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" :registros="paises" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" :registros="departamentos" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" :registros="ciudades" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Género" :registros="ciudades" placeholder="Género" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado civil" :registros="ciudades" placeholder="Estado civil" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Básicos del Empleado</h6>
            <div id="seccion">
                <!-- <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Estado civil" :registros="ciudades" placeholder="Estado civil"/>
                    </div>
                </div> -->
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Grupo sanguineo" :registros="ciudades" placeholder="Grupo sanguineo" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Factor RH" :registros="ciudades" placeholder="Factor RH" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Clase Libreta Militar" :registros="ciudades"
                            placeholder="Clase Libreta Militar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Nacionalidad" :registros="ciudades" placeholder="Nacionalidad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de libreta militar</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Distrito libreta militar</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Estatura</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Peso</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Residencia</h6>
            <div id="seccion">
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Ciudad de nacimiento</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" :registros="ciudades" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" :registros="ciudades" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" :registros="ciudades" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Barrio</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Celular</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electrónico:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electrónico alternativo:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="codigo_alterno" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">En caso de emergencia avisar a:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Autoriza el manejo de datos a la
                            compañía?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Salariales</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Régimen salarial" :registros="ciudades" placeholder="Régimen salarial" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Forma de pago" :registros="ciudades" placeholder="Forma de pago" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Código del banco" :registros="ciudades" placeholder="Código del banco" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pago electrónico:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Modalidad Retención" :registros="ciudades"
                            placeholder="Modalidad Retención" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje de Retención:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Valor Salud Año Anterior:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Cálculo IMAN" :registros="ciudades" placeholder="Cálculo IMAN" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Estabilidad Laboral</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Vacaciones" :registros="ciudades" placeholder="Vacaciones" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Días de vacaciones por año:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Sábado es hábil</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Pagar día 31</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos del Contrato</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de contrato:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha Celebración:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de contrato" :registros="ciudades" placeholder="Tipo de contrato" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado Laboral del Empleado" :registros="ciudades"
                            placeholder="Estado Laboral del Empleado" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Ciudad de contrato</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" :registros="ciudades" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" :registros="ciudades" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" :registros="ciudades" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Notas al contrato:</label>
                        <textarea class="form-control" aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Estructura de Costos</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Compañía" :registros="ciudades" placeholder="Compañía" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal" :registros="ciudades" placeholder="Sucursal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Centro de costos" :registros="ciudades" placeholder="Centro de costos" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Distribución por Centro de Costos
                            Local:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Distribución por Centro de Costos
                            NIIF:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Observaciones:</label>
                        <textarea class="form-control" aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Deducibles</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Vivienda:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Salud / Medicina Prepagada:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Dependiente:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos de la Contratación</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Salario Básico:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Cargo" :registros="ciudades" placeholder="Cargo" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Lider?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Ciudad de labor</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" :registros="ciudades" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" :registros="ciudades" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" :registros="ciudades" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha ingreso:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha finalización:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">No. días periodo prueba:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha finalización periodo prueba:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Modo de liquidación" :registros="ciudades"
                            placeholder="Modo de liquidación" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Horas contratadas al mes:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Valor hora:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Clase de salario" :registros="ciudades" placeholder="Clase de salario" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Fondo de salud" :registros="ciudades" placeholder="Fondo de salud" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Fondo de pensión" :registros="ciudades" placeholder="Fondo de pensión" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Caja de compensación" :registros="ciudades"
                            placeholder="Caja de compensación" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Administradora de riesgos laborales" :registros="ciudades"
                            placeholder="Administradora de riesgos laborales" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje ARL:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Fonde de Cesantías" :registros="ciudades"
                            placeholder="Fonde de Cesantías" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo medidas certificadas (DIAN)" :registros="ciudades"
                            placeholder="Tipo medidas certificadas (DIAN)" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de cotizante" :registros="ciudades" placeholder="Tipo de cotizante" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Subtipo de cotizante" :registros="ciudades"
                            placeholder="Subtipo de cotizante" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Extranjero no pensión?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Reside en el extranjero?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Pago por días</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Es variable - comisiones?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Plantilla para Control de Liquidación</h6>
            <div id="seccion">
                <div class="col">
                    <SearchList nombreCampo="Planilla eventual" :registros="ciudades" placeholder="Planilla eventual" />
                </div>
                <div class="col">
                    <SearchTable :registros="empleados"/>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import SearchList from './SearchList.vue';
import SearchTable from './SearchTable.vue';

export default {
    components: {
        SearchList,
        SearchTable
    },
    data() {
        return {
            pais: '',
            paises: [],
            departamento: '',
            departamentos: [],
            ciudad: '',
            ciudades: [],
            tipoIdentificacion: '',
            tiposIdentificacion: [],
            empleado: '',
            empleados: [],
            numero_identificacion: '',

        };
    },

    created() {
        this.getEmpleados()
        this.getTiposIdentificacion()
        this.getPaises()
        this.getDepartamentos()
        this.getCiudades()
    },

    methods: {
        filterResults(value, array, nombrearray) {
            const search = array.filter(item => item.nombre.toLowerCase().match(value.toLowerCase()));

            if (nombrearray == 'empleados') {
                this.empleadosFilter = search
            }
            if (nombrearray == 'tiposIdentificacion') {
                this.tiposIdentificacionFilter = search
            }
            if (nombrearray == 'paises') {
                this.paisesFilter = search
            }
            if (nombrearray == 'departamentos') {
                this.departamentosFilter = search
            }
            if (nombrearray == 'ciudades') {
                this.ciudadesFilter = search
            }
        },
        getEmpleados() {
            this.empleadosFilter = this.empleados = [
                {
                    "id": 1,
                    "codigo": "7856834653",
                    "nombre": "María Carmen",
                },
                {
                    "id": 2,
                    "codigo": "342345645",
                    "nombre": "juan manuel",
                },
                {
                    "id": 3,
                    "codigo": "37654823456",
                    "nombre": "maria camila",
                },
                {
                    "id": 4,
                    "codigo": "827356823465",
                    "nombre": "mario alberto",
                },
                {
                    "id": 4,
                    "codigo": "827356823465",
                    "nombre": "juan camilo",
                },
                {
                    "id": 4,
                    "codigo": "827356823465",
                    "nombre": "jaime izasa",
                },
                {
                    "id": 4,
                    "codigo": "827356823465",
                    "nombre": "carlos zuluaga",
                },
                {
                    "id": 4,
                    "codigo": "827356823465",
                    "nombre": "alexander jimenes",
                },
            ]
        },
        getTiposIdentificacion() {
            this.tiposIdentificacionFilter = this.tiposIdentificacion = [
                {
                    "id": 1,
                    "codigo": "1",
                    "nombre": "Cédula de ciudadania",
                },
                {
                    "id": 2,
                    "codigo": "2",
                    "nombre": "Cédula de extrangería",
                },
                {
                    "id": 3,
                    "codigo": "3",
                    "nombre": "Pasaporte",
                },

            ]
        },
        getPaises() {
            this.paisesFilter = this.paises = [
                {
                    "id": 1,
                    "codigo": "1",
                    "nombre": "Colombia",
                },
                {
                    "id": 2,
                    "codigo": "2",
                    "nombre": "Venezuela",
                },
                {
                    "id": 3,
                    "codigo": "3",
                    "nombre": "Perú",
                },
                {
                    "id": 4,
                    "codigo": "3",
                    "nombre": "Ecuador",
                },

            ]
        },
        getDepartamentos() {
            // let config = this.configHeader();
            // let self = this;
            // axios.get(self.URL_API + "api/v1/departamentos", config).then(function (result) {
            //     self.departamentos = result.data;
            //     self.departamentosFilter = result.data;
            //     // self.listas.splice(3, 0, result.data)
            // });
            this.departamentosFilter = this.departamentos = [
                {
                    "id": 1,
                    "codigo": "1",
                    "nombre": "Amazonas",
                },
                {
                    "id": 1,
                    "codigo": "2",
                    "nombre": "Antiouia",
                },
                {
                    "id": 2,
                    "codigo": "3",
                    "nombre": "Arauca",
                },
                {
                    "id": 3,
                    "codigo": "4",
                    "nombre": "Atlántico",
                },
                {
                    "id": 4,
                    "codigo": "5",
                    "nombre": "Bogotá",
                },
                {
                    "id": 4,
                    "codigo": "6",
                    "nombre": "Caldas",
                },
                {
                    "id": 4,
                    "codigo": "7",
                    "nombre": "caquetá",
                },
                {
                    "id": 4,
                    "codigo": "8",
                    "nombre": "casanare",
                },
                {
                    "id": 4,
                    "codigo": "9",
                    "nombre": "cauca",
                },
            ]

        },
        getCiudades() {
            this.ciudadesFilter = this.ciudades = [
                {
                    "id": 1,
                    "codigo": "1",
                    "nombre": "Medellín",
                },
                {
                    "id": 1,
                    "codigo": "2",
                    "nombre": "Bogotá",
                },
                {
                    "id": 2,
                    "codigo": "3",
                    "nombre": "Santamarta",
                },
                {
                    "id": 3,
                    "codigo": "4",
                    "nombre": "Itagui",
                },
                {
                    "id": 4,
                    "codigo": "5",
                    "nombre": "caldas",
                },
                {
                    "id": 4,
                    "codigo": "6",
                    "nombre": "cartagena",
                },
            ]

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
    border: solid #D5DBDB 0.5px;
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

/* Fin select con filtro personalizado */</style>