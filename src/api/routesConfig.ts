// rutas de dashboard Recepcionista
export const recepcionistaRoutes = {
  
  "Gestion de Inventarios": "/dashboard-recepcionista/gestion-usuarios",
  "Control de Ventas": "/dashboard-recepcionista/control-ventas",
  "Gestión de Citas": "/dashboard-recepcionista/gestion-citas",
  "Gestión de Servicios": "/dashboard-recepcionista/gestion-de-servicios",
  "Gestión de Proveedores": "/dashboard-recepcionista/gestion-proveedores",
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
  "Reportes y Analisis": "/dashboard-admin/reportes-analisis",
  "Información": "/dashboard-admin/informacion-empresa",
  "Promociones y Bonificaciones": "/dashboard-admin/bonificaciones",

   
} as const;

export type AdminRouteKeys = keyof typeof adminRoutes;

// rutas de dashboard estilista
export const estilistaRoutes = {

"Gestión de Citas": "#",
 
} as const;

export type EstilistaRouteKeys = keyof typeof estilistaRoutes;
