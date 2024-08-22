import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import "./index.css";
import Login from "./pages/Login";
import Layout from "./components/layouts/Layout";
import Layout_Login from "./components/layouts/Layout_Login";
import DashboardRecepcionista from "./pages/recepcionistas_dashboard/DashboardRecepcion";
import DashboardAdmin from "./pages/admin_dashboard/DashboardAdmin";
import DashboardEstilista from "./pages/estilistas_dashboard/DashboardEstilista";
import GestionUsuarios from "./pages/admin_dashboard/GestionUsuarios/GestionUsuario";
import GestionProveedores from "./pages/admin_dashboard/GestionProveedores/GestionProveedores";
import EditarProveedor from "./pages/admin_dashboard/GestionProveedores/EditarProveedor";
import ProductosProveedor from "./pages/admin_dashboard/GestionProveedores/ProductosProveedor";
import AgregarProveedor from "./pages/admin_dashboard/GestionProveedores/AgregarProveedor";
import GestionCitas from "./pages/admin_dashboard/GestionCitas/GestionCitas";
import AgregarCita from "./pages/admin_dashboard/GestionCitas/AgregarCita";
import EditarCita from "./pages/admin_dashboard/GestionCitas/EditarCita";
import Perfil from "./components/pages/Perfil";
import CambiarContrasena from "./components/pages/CambiarContraseña";
import GestionDeServicios from "./pages/admin_dashboard/GestionServicios/GestionDeServicios";
import AgregarServicio from "./pages/admin_dashboard/GestionServicios/AgregarServicio";
import EditarServicio from "./pages/admin_dashboard/GestionServicios/EditarServicio";
import AgregarPromocion from "./pages/admin_dashboard/Bonificaciones/AgregarPromocion";
import EditarPromocion from "./pages/admin_dashboard/Bonificaciones/EditarPromocion";
import BorrarServicio from "./pages/admin_dashboard/GestionServicios/BorrarServicio";
import BorrarPromocion from "./pages/admin_dashboard/Bonificaciones/BorrarPromocion";
import Bonificaciones from "./pages/admin_dashboard/Bonificaciones/Bonificaciones";
import BorrarProveedor from "./pages/admin_dashboard/GestionProveedores/BorrarProveedor";
import BorrarCita from "./pages/admin_dashboard/GestionCitas/BorrarCita";
import DetallesEmpresa from "./pages/admin_dashboard/InformacionEmpresa/DetallesEmpresa";
import EditarDetallesEmpresa from "./pages/admin_dashboard/InformacionEmpresa/EditarDetallesEmpresa";
import GestionInventario from './pages/admin_dashboard/GestionInventario/GestionInventario';
import AgregarProducto from "./pages/admin_dashboard/GestionInventario/AgregarProducto";
import EditarProducto from "./pages/admin_dashboard/GestionInventario/EditarProducto";
import BorrarProducto from "./pages/admin_dashboard/GestionInventario/BorrarProducto";
import AgregarBonificacion from "./pages/admin_dashboard/Bonificaciones/AgregarBonificacion";
import EditarBonificacion from "./pages/admin_dashboard/Bonificaciones/EditarBonificacion";
import BorrarBonificacion from "./pages/admin_dashboard/Bonificaciones/BorrarBonificacion";
import Dashboard from "./pages/admin_dashboard/ControlVentas/Dashboard";
import Venta from "./pages/admin_dashboard/ControlVentas/RealizarVenta";
import Cotizacion from "./pages/admin_dashboard/ControlVentas/Cotizacion";
import HistorialVenta from "./pages/admin_dashboard/ControlVentas/HistorialVenta";
import GestionClientes from "./pages/admin_dashboard/ControlVentas/BDClientes/Clientes";
import AgregarCliente from "./pages/admin_dashboard/ControlVentas/BDClientes/AgregarCliente";
import EditarCliente from "./pages/admin_dashboard/ControlVentas/BDClientes/EditarCliente";
import VentasCredito from "./pages/admin_dashboard/ControlVentas/VentasCredito";
import GestionProveedoresR from "./pages/recepcionistas_dashboard/GestionProveedores/GestionProveedoresR";
import ProductosProveedorR from "./pages/recepcionistas_dashboard/GestionProveedores/ProductosProveedorR";
import GestionCitasR from "./pages/recepcionistas_dashboard/GestionCitas/GestionCitasR";
import AgregarCitaR from "./pages/recepcionistas_dashboard/GestionCitas/AgregarCitaR";
import EditarCitaR from "./pages/recepcionistas_dashboard/GestionCitas/EditarCitaR";
import BorrarCitaR from "./pages/recepcionistas_dashboard/GestionCitas/BorrarCitaR";
import DashboardR from "./pages/recepcionistas_dashboard/ControlVentas/DashboardR";
import VentaR from "./pages/recepcionistas_dashboard/ControlVentas/RealizarVentaR";
import CotizacionR from "./pages/recepcionistas_dashboard/ControlVentas/CotizacionR";
import HistorialVentaR from "./pages/recepcionistas_dashboard/ControlVentas/HistorialVentaR";
import GestionClientesR from "./pages/recepcionistas_dashboard/ControlVentas/BDClientesR/ClientesR";
import AgregarClienteR from "./pages/recepcionistas_dashboard/ControlVentas/BDClientesR/AgregarClienteR";
import EditarClienteR from "./pages/recepcionistas_dashboard/ControlVentas/BDClientesR/EditarClienteR";
import VentasCreditoR from "./pages/recepcionistas_dashboard/ControlVentas/VentasCreditoR";
import GestionDeServiciosR from "./pages/recepcionistas_dashboard/GestionServicios/GestionDeServiciosR";
import GestionInventarioR from './pages/recepcionistas_dashboard/GestionInventario/GestionInventarioR';
import AgregarProductoR from "./pages/recepcionistas_dashboard/GestionInventario/AgregarProductoR";
import EditarProductoR from "./pages/recepcionistas_dashboard/GestionInventario/EditarProductoR";
import BorrarProductoR from "./pages/recepcionistas_dashboard/GestionInventario/BorrarProductoR";
import AgregarPromocionR from "./pages/recepcionistas_dashboard/Bonificaciones/AgregarPromocionR";
import EditarPromocionR from "./pages/recepcionistas_dashboard/Bonificaciones/EditarPromocionR";
import BorrarPromocionR from "./pages/recepcionistas_dashboard/Bonificaciones/BorrarPromocionR";
import BonificacionesR from "./pages/recepcionistas_dashboard/Bonificaciones/BonificacionesR";
import AgregarBonificacionR from "./pages/recepcionistas_dashboard/Bonificaciones/AgregarBonificacionR";
import EditarBonificacionR from "./pages/recepcionistas_dashboard/Bonificaciones/EditarBonificacionR";
import BorrarBonificacionR from "./pages/recepcionistas_dashboard/Bonificaciones/BorrarBonificacionR";
import Logout from "./pages/Logout";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement

);

root.render(
  <>
    <BrowserRouter>
      <Routes>
        {/* Rutas que utilizan el Layout por defecto */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="about" element={<About />} />
        </Route>


        {/* Rutas con Layout_Login */}
        <Route path="/" element={<Layout_Login />}>
       


        {/* Rutas Recepcionista */}

        <Route path="dashboard-recepcionista/control-ventas/gestion-clientes" element={<GestionClientesR />} /> 
        <Route path="dashboard-recepcionista/control-ventas/gestion-clientes/agregar-cliente" element={<AgregarClienteR />} /> 
        <Route path="dashboard-recepcionista/control-ventas/gestion-clientes/editar-cliente/:id" element={<EditarClienteR />} /> 

        <Route path="dashboard-recepcionista/control-ventas" element={<DashboardR />} />  
        <Route path="dashboard-recepcionista/control-ventas/venta" element={<VentaR />} />  
        <Route path="dashboard-recepcionista/control-ventas/cotizacion" element={<CotizacionR />} />  
        <Route path="dashboard-recepcionista/control-ventas/historial-venta" element={<HistorialVentaR />} />   
        <Route path="dashboard-recepcionista/control-ventas/ventas-creditos" element={<VentasCreditoR/>} /> 
        
        <Route path="dashboard-recepcionista/gestion-citas/" element={<GestionCitasR />} />
        <Route path="dashboard-recepcionista/gestion-citas/agregar-cita/" element={<AgregarCitaR />} />
        <Route path="dashboard-recepcionista/gestion-citas/editar-cita/:id" element={<EditarCitaR />} />
        <Route path="dashboard-recepcionista/gestion-citas/borrar-cita/:id" element={<BorrarCitaR />} />


          <Route path="dashboard-recepcionista/main" element={<DashboardRecepcionista />}/>
          <Route path="dashboard-recepcionista/perfil" element={<Perfil />} />
          <Route path="dashboard-recepcionista/cambiar-contrasena" element={<CambiarContrasena />} />
          <Route path="dashboard-recepcionista/gestion-proveedores" element={<GestionProveedoresR />} />
          <Route path="dashboard-recepcionista/gestion-proveedores/productos-proveedor/:id" element={<ProductosProveedorR />} />
         
        <Route path="dashboard-recepcionista/gestion-de-servicios" element={<GestionDeServiciosR />} />
  
        <Route path="dashboard-recepcionista/inventario" element={<GestionInventarioR />} />
        <Route path="dashboard-recepcionista/inventario/agregar-producto" element={<AgregarProductoR />}/>
        <Route path="dashboard-recepcionista/inventario/editar-producto" element={<EditarProductoR />}/> 
        <Route path="dashboard-recepcionista/inventario/borrar-producto" element={<BorrarProductoR />} />   

        <Route path="dashboard-recepcionista/bonificaciones" element={<BonificacionesR/>}/>
        <Route path="dashboard-recepcionista/bonificaciones/agregar-promociones" element={<AgregarPromocionR />} />
        <Route path="dashboard-recepcionista/bonificaciones/editar-promociones" element={<EditarPromocionR />} />  
        <Route path="dashboard-recepcionista/bonificaciones/borrar-promociones" element={<BorrarPromocionR />} />
        <Route path="dashboard-recepcionista/bonificaciones/agregar-bonificacion" element={<AgregarBonificacionR />}/>
        <Route path="dashboard-recepcionista/bonificaciones/editar-bonificacion" element={<EditarBonificacionR />}/>
        <Route path="dashboard-recepcionista/bonificaciones/borrar-bonificacion" element={<BorrarBonificacionR />}/>

        {/* Rutas Administracion*/}
        <Route path="dashboard-admin/main" element={<DashboardAdmin />} />
        <Route path="dashboard-admin/gestion-proveedores" element={<GestionProveedores />} />
        <Route path="dashboard-admin/gestion-proveedores/editar-proveedor" element={<EditarProveedor />} />
        <Route path="dashboard-admin/gestion-proveedores/productos-proveedor/:id" element={<ProductosProveedor />} />
        <Route path="dashboard-admin/gestion-proveedores/agregar-proveedor" element={<AgregarProveedor />} />
        <Route path="dashboard-admin/gestion-proveedores/borrar-proveedor" element={<BorrarProveedor />} />

        <Route path="dashboard-admin/gestion-citas/" element={<GestionCitas />} />
        <Route path="dashboard-admin/gestion-citas/agregar-cita/" element={<AgregarCita />} />
        <Route path="dashboard-admin/gestion-citas/editar-cita/:id" element={<EditarCita />} />
        <Route path="dashboard-admin/gestion-citas/borrar-cita/:id" element={<BorrarCita/>} />

        <Route path="dashboard-admin/perfil" element={<Perfil />} />
        <Route path="dashboard-admin/cambiar-contrasena" element={<CambiarContrasena />} />
        
        <Route path="dashboard-admin/gestion-de-servicios" element={<GestionDeServicios />} />
        <Route path="dashboard-admin/gestion-de-servicios/agregar-servicio" element={<AgregarServicio />}/>
        <Route path="dashboard-admin/gestion-de-servicios/editar-servicio" element={<EditarServicio />}/> 
        <Route path="dashboard-admin/gestion-de-servicios/borrar-servicio" element={<BorrarServicio />} />    

        <Route path="dashboard-admin/gestion-usuarios" element={<GestionUsuarios />} />

        <Route path="dashboard-admin/bonificaciones" element={<Bonificaciones/>}/>
        <Route path="dashboard-admin/bonificaciones/agregar-promociones" element={<AgregarPromocion />} />
        <Route path="dashboard-admin/bonificaciones/editar-promociones" element={<EditarPromocion />} />  
        <Route path="dashboard-admin/bonificaciones/borrar-promociones" element={<BorrarPromocion />} />
        <Route path="dashboard-admin/bonificaciones/agregar-bonificacion" element={<AgregarBonificacion/>}/>
        <Route path="dashboard-admin/bonificaciones/editar-bonificacion" element={<EditarBonificacion/>}/>
        <Route path="dashboard-admin/bonificaciones/borrar-bonificacion" element={<BorrarBonificacion/>}/>


        <Route path="dashboard-admin/informacion-empresa" element={<DetallesEmpresa />} />
        <Route path="dashboard-admin/informacion-empresa/editar-detalles" element={<EditarDetallesEmpresa />} />  

        <Route path="dashboard-admin/inventario" element={<GestionInventario />} />
        <Route path="dashboard-admin/inventario/agregar-producto" element={<AgregarProducto />}/>
        <Route path="dashboard-admin/inventario/editar-producto" element={<EditarProducto />}/> 
        <Route path="dashboard-admin/inventario/borrar-producto" element={<BorrarProducto />} />   

        <Route path="dashboard-admin/control-ventas" element={<Dashboard />} />  
        <Route path="dashboard-admin/control-ventas/venta" element={<Venta />} />  
        <Route path="dashboard-admin/control-ventas/cotizacion" element={<Cotizacion />} />  
        <Route path="dashboard-admin/control-ventas/historial-venta" element={<HistorialVenta />} />   
    
        <Route path="dashboard-admin/control-ventas/ventas-creditos" element={<VentasCredito/>} /> 

        <Route path="dashboard-admin/gestion-clientes" element={<GestionClientes />} /> 
        <Route path="dashboard-admin/gestion-clientes/agregar-cliente" element={<AgregarCliente />} /> 
        <Route path="dashboard-admin/gestion-clientes/editar-cliente/:id" element={<EditarCliente />} /> 

        {/* Rutas Estilista*/}
          <Route path="dashboard-estilista/main" element={<DashboardEstilista />}/>
          <Route path="dashboard-estilista/perfil" element={<Perfil />} />
          <Route path="dashboard-estilista/cambiar-contrasena" element={<CambiarContrasena />} />

          <Route path="/cerrar-sesion" element={<Logout />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
