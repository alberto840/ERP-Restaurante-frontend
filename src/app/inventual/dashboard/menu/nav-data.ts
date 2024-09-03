import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: '/dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'empleados',
    icon: 'fal fa-user',
    label: 'Gestion Empleados',
    items: [
      {
        routeLink: '/usuarios/agregar',
        label: 'Agregar Usuario / Empleado',
      },
      {
        routeLink: '/usuarios/lista',
        label: 'Lista de Usuarios',
      },
      {
        routeLink: '/empleados/lista',
        label: 'Lista de Empleados',
      },
    ],
  },
  {
    routeLink: '/salarios',
    icon: 'fal fa-file-invoice-dollar',
    label: 'Salarios',
  },
  {
    routeLink: 'vacaciones',
    icon: 'fal fa-calendar',
    label: 'Vacaciones',
    items: [
      {
        routeLink: '/empleados/vacaciones/agregar',
        label: 'Agregar Vacacion',
      },
      {
        routeLink: '/empleados/vacaciones/lista',
        label: 'Lista Vacaciones',
      },
    ],
  },
  {
    routeLink: 'trading/invoice',
    icon: 'fal fa-wind-warning',
    label: 'Descuentos',
    items: [
      {
        routeLink: '/empleados/descuentos/agregar',
        label: 'Agregar Bono',
      },
      {
        routeLink: '/empleados/descuentos/lista',
        label: 'Lista Bonos',
      },
    ],
  },
  {
    routeLink: 'trading/invoice',
    icon: 'fal fa-money-bill',
    label: 'Bonos',
    items: [
      {
        routeLink: '/empleados/bonos/agregar',
        label: 'Agregar Vacacion',
      },
      {
        routeLink: '/empleados/bonos/lista',
        label: 'Lista Vacacion',
      },
    ],
  },
  {
    routeLink: 'trading/invoice',
    icon: 'fal fa-clock',
    label: 'Horarios',
    items: [
      {
        routeLink: '/trading/invoice/saleinvoice',
        label: 'Agregar Horario',
      },
      {
        routeLink: '/trading/invoice/salesinvoice',
        label: 'Lista Horario',
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
