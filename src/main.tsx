import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import "./index.css";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Layout from "./components/layouts/Layout";
import Layout_Login from "./components/layouts/Layout_Login";
import DashboardRecepcionista from "./pages/recepcionistas_dashboard/DashboardRecepcion";
import DashboardAdmin from "./pages/admin_dashboard/DashboardAdmin";
import DashboardEstilista from "./pages/estilistas_dashboard/DashboardEstilista";
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
//import EditarServicio from "./pages/recepcionistas_dashboard/EditarServicio";
import AgregarPromocion from "./pages/admin_dashboard/GestionServicios/AgregarPromocion";
//import EditarPromocion from "./pages/recepcionistas_dashboard/EditarPromocion";

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
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas con Layout_Login */}
        <Route path="/" element={<Layout_Login />}>

        {/* Rutas Recepcionista */}
          <Route path="dashboard-recepcionista/main" element={<DashboardRecepcionista />}/>
          <Route path="dashboard-recepcionista/perfil" element={<Perfil />} />
          <Route path="dashboard-recepcionista/cambiar-contrasena" element={<CambiarContrasena />} />
          {/*<Route path="dashboard-recepcionista/gestion-de-servicios" element={<GestionDeServicios />} />
          <Route path="dashboard-recepcionista/gestion-de-servicios/servicio" element={<AgregarServicio />} />
          <Route path="dashboard-recepcionista/gestion-de-servicios/servicios/edit/:id" element={<EditarServicio />} /> 
          <Route path="dashboard-recepcionista/gestion-de-servicios/promociones" element={<AgregarPromocion />} />
          <Route path="dashboard-recepcionista/gestion-de-servicios/promociones/edit/:id" element={<EditarPromocion />} />*/}  

        {/* Rutas Administracion*/}
        <Route path="dashboard-admin/main" element={<DashboardAdmin />} />
        <Route path="dashboard-admin/gestion-proveedores" element={<GestionProveedores />} />
        <Route path="dashboard-admin/editar-proveedor/:id" element={<EditarProveedor />} />
        <Route path="dashboard-admin/productos-proveedor/:id" element={<ProductosProveedor />} />
        <Route path="dashboard-admin/agregar-proveedor/" element={<AgregarProveedor />} />

        <Route path="dashboard-admin/gestion-citas/" element={<GestionCitas />} />
        <Route path="dashboard-admin/agregar-cita/" element={<AgregarCita />} />
        <Route path="dashboard-admin/editar-cita/:id" element={<EditarCita />} />

        <Route path="dashboard-admin/perfil" element={<Perfil />} />
        <Route path="dashboard-admin/cambiar-contrasena" element={<CambiarContrasena />} />
        
        <Route path="dashboard-admin/gestion-de-servicios" element={<GestionDeServicios />} />
        <Route path="dashboard-admin/gestion-de-servicios/servicio" element={<AgregarServicio />}/>
        {/*<Route path="dashboard-admin/gestion-de-servicios/servicios/edit/:id" element={<EditarServicio />}/> */}        
        <Route path="dashboard-admin/gestion-de-servicios/promociones" element={<AgregarPromocion />} />
        {/*<Route path="dashboard-admin/gestion-de-servicios/promociones/edit/:id" element={<EditarPromocion />} />*/}  
            

        {/* Rutas Estilista*/}
          <Route path="dashboard-estilista/main" element={<DashboardEstilista />}/>
          <Route path="dashboard-estilista/perfil" element={<Perfil />} />
          <Route path="dashboard-estilista/cambiar-contrasena" element={<CambiarContrasena />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
