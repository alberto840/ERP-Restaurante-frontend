import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: '/sucursales',
    icon: 'fal fa-file-invoice-dollar',
    label: 'Sucursales',
  },
  {
    routeLink: 'empleados',
    icon: 'fal fa-user',
    label: 'Gestion Empleados',
    items: [
      {
        routeLink: '/empleados/registro',
        label: 'Registrar Empleado',
      },
      {
        routeLink: '/empleados/contratos',
        icon: 'fal fa-file-invoice-dollar',
        label: 'Contratos',
      },
      {
        routeLink: '/empleados/lista',
        label: 'Lista de Empleados',
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
        routeLink: '/horarios/turnos',
        label: 'Gestion Turnos',
      },
      {
        routeLink: '/horarios',
        label: 'Asignar Horario',
      },
      {
        routeLink: '/horarios/lista',
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
    ],
  },
];
