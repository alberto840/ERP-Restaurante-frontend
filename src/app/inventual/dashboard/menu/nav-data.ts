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
        routeLink: '/empleados/registro',
        label: 'Registrar Usuario / Empleado',
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
        routeLink: 'vacaciones/registro',
        label: 'Registrar Vacacion',
      },
      {
        routeLink: 'vacaciones/lista',
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
        routeLink: 'descuentos/registro',
        label: 'Registrar Descuento',
      },
      {
        routeLink: 'descuentos/lista',
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
        routeLink: '/trading/invoice/saleinvoice',
        label: 'Registrar Horario',
      },
      {
        routeLink: '/trading/invoice/salesinvoice',
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
