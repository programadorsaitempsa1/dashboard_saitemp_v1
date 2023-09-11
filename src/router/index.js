/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import FormularioSig from "../components/FormularioSig.vue";
import InicioSesion from "../components/InicioSesion.vue";
import NavBar from "../components/NavBar.vue";
import Usuarios from "../components/Usuarios.vue";
import RolesUsuario from "../components/RolesUsuario.vue";
import MenuRoles from "../components/MenuRoles.vue";
import PermisoRoles from "../components/PermisoRoles.vue";
import Zonas from "../components/Zonas.vue";
import Empleadoss from "../components/Empleadoss.vue";
import SigContratos from "../components/SigContratos.vue";
import EstadoContrato from "../components/EstadoContrato.vue";
import EstadoEmpleados from "../components/EstadoEmpleados.vue";
import TipoDocumentoIdentidad from "../components/TipoDocumentoIdentidad.vue";
import CargoEmpleado from "../components/CargoEmpleado.vue";
import ContratoEmpleado from "../components/ContratoEmpleado.vue";
import OrdenTrabajoSig from "../components/OrdenTrabajoSig.vue";
import EstadoOrdenTrabajoSig from "../components/EstadoOrdenTrabajoSig.vue";
import OrdenTrabajoEmpleados from "../components/OrdenTrabajoEmpleados.vue";
import IngresarUsuario from "../views/IngresarUsuario.vue";
import EditarUsuario from "../views/EditarUsuario.vue";
import Costos from "../components/Costos.vue";
import CodigoCostos from "../components/CodigoCostos.vue";
import UnidadMedida from "../components/UnidadMedida.vue";
import ReporteItems from "../components/ReporteItems.vue";
import EmpleadoTemporal from "../components/EmpleadoTemporal.vue";
import UsuariosDA from "../components/UsuariosDA.vue";
import Estadistica from "../components/Estadistica.vue";
import Empleados from "../components/Empleados.vue";
import Empleado from "../components/Empleado.vue";
import Reportes from "../components/Reportes.vue";
import Trump from "../components/Trump.vue";
import ProcesosEspeciales from "../components/ProcesosEspeciales.vue";
import PowerBi from "../components/PowerBi.vue";
import Ddashboard from "../components/Ddashboard.vue";
import DdClientes from "../components/DdClientes.vue";
import DdFormularioCliente from "../components/DdFormularioCliente.vue";
import FormularioRegistro from "../components/FormularioRegistro.vue";
import NovedadesNomina from "../components/NovedadesNomina.vue";
import SolicitudNovedadesNomina from "../components/SolicitudNovedadesNomina.vue";
import ConsultaNN from "../components/ConsultaNN.vue";
import GestionCliente from "../components/GestionCliente.vue";
import FormularioSupervision from "../components/FormularioSupervision.vue";
import MapaVue from "../components/MapaVue.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: InicioSesion,
  },
  {
    path: "/formularioregistro",
    name: "formularioregistro",
    component: FormularioRegistro,
  },
  {
    path: "/navbar",
    name: "navbar",
    component: NavBar,
    children: [
      {
        path: "formulariosig",
        name: "Formulariosig",
        component: FormularioSig,
      },
      {
        path: "editarUsuario/:id",
        name: "editarUsuario",
        component: EditarUsuario,
      },
      {
        path: "ingresarUsuario",
        name: "ingresarUsuario",
        component: IngresarUsuario,
      },
      {
        path: "usuarios",
        name: "usuarios",
        component: Usuarios,
      },
      {
        path: "rolesUsuario",
        name: "rolesUsuario",
        component: RolesUsuario,
      },
      {
        path: "menuRoles",
        name: "menuRoles",
        component: MenuRoles,
      },
      {
        path: "permisoRoles",
        name: "permisoRoles",
        component: PermisoRoles,
      },
      {
        path: "empleadoss",
        name: "empleadoss",
        component: Empleadoss,
      },
      {
        path: "zonas",
        name: "zonas",
        component: Zonas,
      },
      {
        path: "sigContratos",
        name: "sigContratos",
        component: SigContratos,
      },
      {
        path: "estadoContrato",
        name: "estadoContrato",
        component: EstadoContrato,
      },
      {
        path: "estadoEmpleados",
        name: "estadoEmpleados",
        component: EstadoEmpleados,
      },
      {
        path: "tipoDocumentoIdentidad",
        name: "tipoDocumentoIdentidad",
        component: TipoDocumentoIdentidad,
      },
      {
        path: "cargoEmpleado",
        name: "cargoEmpleado",
        component: CargoEmpleado,
      },
      {
        path: "contratoEmpleado",
        name: "contratoEmpleado",
        component: ContratoEmpleado,
      },
      {
        path: "OrdenTrabajoSig",
        name: "OrdenTrabajoSig",
        component: OrdenTrabajoSig,
      },
      {
        path: "EstadoOrdenTrabajoSig",
        name: "EstadoOrdenTrabajoSig",
        component: EstadoOrdenTrabajoSig,
      },
      {
        path: "OrdenTrabajoEmpleados",
        name: "OrdenTrabajoEmpleados",
        component: OrdenTrabajoEmpleados,
      },
      {
        path: "costos",
        name: "Costos",
        component: Costos,
      },
      {
        path: "codigoCostos",
        name: "CodigoCostos",
        component: CodigoCostos,
      },
      {
        path: "unidadMedida",
        name: "UnidadMedida",
        component: UnidadMedida,
      },
      {
        path: "reporteItems",
        name: "ReporteItems",
        component: ReporteItems,
      },
      {
        path: "empleadoTemporal",
        name: "EmpleadoTemporal",
        component: EmpleadoTemporal,
      },
      {
        path: "usuariosDA",
        name: "UsuariosDA",
        component: UsuariosDA,
      },
      {
        path: "estadistica",
        name: "Estadistica",
        component: Estadistica,
      },
      {
        path: "empleados/:id?",
        name: "empleados",
        component: Empleados,
      },
      {
        path: "empleado/:id",
        name: "empleado",
        component: Empleado,
      },
      {
        path: "reportes",
        name: "reportes",
        component: Reportes,
      },
      {
        path: "trump",
        name: "trump",
        component: Trump,
      },
      {
        path: "procesosEspeciales",
        name: "procesosEspeciales",
        component: ProcesosEspeciales,
      },
      {
        path: "powerBi/:id",
        name: "powerBi",
        component: PowerBi,
      },
      {
        path: "debida-diligencia/dashboard",
        name: "debida-diligencia/dashboard",
        component: Ddashboard,
      },
      {
        path: "debida-diligencia/clientes",
        name: "debida-diligencia/clientes",
        component: DdClientes,
      },
      {
        path: "debida-diligencia/formulario-clientes/:id?",
        name: "debida-diligencia/formulario-clientes",
        component: DdFormularioCliente,
      },
      {
        path: "gestion-novedades-nomina",
        name: "gestion-novedades-nomina",
        component: NovedadesNomina,
      },
      {
        path: "solicitud-novedades-nomina",
        name: "solicitud-novedades-nomina",
        component: SolicitudNovedadesNomina,
      },
      {
        path: "correo-novedades-nomina",
        name: "correo-novedades-nomina",
        component: ConsultaNN,
      },
      {
        path: "estados-cliente",
        name: "estados-cliente",
        component: GestionCliente,
      },
      {
        path: "formulario-supervision/:id?",
        name: "formulario-supervision",
        component: FormularioSupervision,
      },
      {
        path: "mapa",
        name: "mapa",
        component: MapaVue,
      },
    ],
  },

];

const router = new VueRouter({
  routes,
});

export default router;
