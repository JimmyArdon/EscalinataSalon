// rutas de dashboard Recepcionista
export const recepcionistaRoutes = {
  
    "Gestion de Inventarios": "",
    "Control de Ventas": "#",
    "Gestión de Citas": "#",
    "Gestión de Servicios": "gestion-de-servicios",
    "Gestión de Proveedores": "#",
  } as const;
  
  export type RecepcionistaRouteKeys = keyof typeof recepcionistaRoutes;

 // rutas de dashboard Admin
 export const adminRoutes = {
  "Gestión de Usuarios": "#",
  "Gestion de Inventarios": "",
  "Control de Ventas": "#",
  "Gestión de Citas": "/dashboard-admin/gestion-citas",
  "Gestión de Servicios": "/dashboard-admin/gestion-de-servicios",
  "Gestión de Proveedores": "/dashboard-admin/gestion-proveedores",
  "Reportes y Analisis": "#",
   
} as const;

export type AdminRouteKeys = keyof typeof adminRoutes;

// rutas de dashboard estilista
export const estilistaRoutes = {
 
  "Gestión de Citas": "#",
   
} as const;

export type EstilistaRouteKeys = keyof typeof estilistaRoutes;
  