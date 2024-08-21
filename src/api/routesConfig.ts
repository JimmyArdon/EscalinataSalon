// rutas de dashboard Recepcionista
export const recepcionistaRoutes = {
  
  "Gestion de Inventarios": "/dashboard-recepcionista/inventario",
  "Control de Ventas": "/dashboard-recepcionista/control-ventas",
  "Gestión de Citas": "/dashboard-recepcionista/gestion-citas",
  "Gestión de Servicios": "/dashboard-recepcionista/gestion-de-servicios",
  "Gestión de Proveedores": "/dashboard-recepcionista/gestion-proveedores",
  "Promociones y Bonificaciones": "/dashboard-recepcionista/bonificaciones",
} as const;

export type RecepcionistaRouteKeys = keyof typeof recepcionistaRoutes;

 // rutas de dashboard Admin
 export const adminRoutes = {
  "Gestión de Usuarios": "/dashboard-admin/gestion-usuarios",
  "Gestion de Inventarios": "/dashboard-admin/inventario",
  "Control de Ventas": "/dashboard-admin/control-ventas",
  "Gestión de Citas": "/dashboard-admin/gestion-citas",
  "Gestión de Servicios": "/dashboard-admin/gestion-de-servicios",
  "Gestión de Proveedores": "/dashboard-admin/gestion-proveedores",
  "Clientes": "/dashboard-admin/gestion-clientes",
  "Información": "/dashboard-admin/informacion-empresa",
  "Promociones y Bonificaciones": "/dashboard-admin/bonificaciones",

   
} as const;

export type AdminRouteKeys = keyof typeof adminRoutes;


