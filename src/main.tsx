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
import GestionProveedores from "./pages/admin_dashboard/GestionProveedores";
import EditarProveedor from './pages/admin_dashboard/EditarProveedor';
import ProductosProveedor from './pages/admin_dashboard/ProductosProveedor';
import AgregarProveedor from "./pages/admin_dashboard/AgregarProveedor";
import GestionCitas from "./pages/admin_dashboard/GestionCitas";
import AgregarCita from './pages/admin_dashboard/AgregarCita';
import EditarCita from "./pages/admin_dashboard/EditarCita";

import GestionDeServicios from "./pages/recepcionistas_dashboard/GestionDeServicios/GestionDeServicios";
import AgregarServicio from "./pages/recepcionistas_dashboard/GestionDeServicios/AgregarServicio/AgregarServicio";
import EditarServicio from "./pages/recepcionistas_dashboard/GestionDeServicios/EditarServicio/EditarServicio";
import EditarPromocion from "./pages/recepcionistas_dashboard/GestionDeServicios/EditarPromocion/EditarPromocion";
import AgregarPromocion from "./pages/recepcionistas_dashboard/GestionDeServicios/AgregarPromocion/AgregarPromocion";

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
          <Route
            path="dashboard-recepcionista/main"
            element={<DashboardRecepcionista />}
          />
          <Route path="dashboard-admin/main" element={<DashboardAdmin />} />
          <Route
            path="dashboard-estilista/main"
            element={<DashboardEstilista />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
