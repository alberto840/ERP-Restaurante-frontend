import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: '/salarios',
    icon: 'fal fa-file-invoice-dollar',
    label: 'Salarios',
  },
  {
    routeLink: '/sucursales',
    icon: 'fal fa-file-invoice-dollar',
    label: 'Sucursales',
  },
  {
    routeLink: '/empleados/contratos',
    icon: 'fal fa-file-invoice-dollar',
    label: 'Contratos',
  },
  {
    routeLink: 'empleados',
    icon: 'fal fa-user',
    label: 'Gestion Empleados',
    items: [
      {
        routeLink: '/empleados/registro',
        label: 'Registrar Usuario / Empleado',
      },
      {
        routeLink: '/empleados/lista',
        label: 'Lista de Empleados',
      },
      {
        routeLink: '/empleados/actividades',
        label: 'Lista de Actividades',
      },
      {
        routeLink: '/empleados/asistencia',
        label: 'Control de Asistencia',
      },
    ],
  },
  {
    routeLink: 'vacaciones',
    icon: 'fal fa-calendar',
    label: 'Vacaciones',
    items: [
      {
        routeLink: '/vacaciones/registro',
        label: 'Registrar Vacacion',
      },
      {
        routeLink: '/vacaciones/lista',
        label: 'Lista Vacaciones',
      },
    ],
  },
  {
    routeLink: 'descuentos',
    icon: 'fal fa-wind-warning',
    label: 'Descuentos',
    items: [
      {
        routeLink: '/descuentos/registro',
        label: 'Registrar Descuento',
      },
      {
        routeLink: '/descuentos/lista',
        label: 'Lista Descuentos',
      },
    ],
  },
  {
    routeLink: 'bonos',
    icon: 'fal fa-money-bill',
    label: 'Bonos',
    items: [
      {
        routeLink: '/bonos/registro',
        label: 'Registrar Bono',
      },
      {
        routeLink: '/bonos/lista',
        label: 'Lista Bonos',
      },
    ],
  },
  {
    routeLink: 'horarios',
    icon: 'fal fa-clock',
    label: 'Horarios',
    items: [
      {
        routeLink: '/horarios',
        label: 'Lista Horarios',
      },
    ],
  },
  {
    routeLink: 'rolepermission',
    icon: 'fal fa-shield',
    label: 'Gestion Roles',
    items: [
      {
        routeLink: '/rol/agregar',
        label: 'Crear Rol',
      },
      {
        routeLink: '/rolepermission',
        label: 'Permisos de Rol',
      },
    ],
  },
];
