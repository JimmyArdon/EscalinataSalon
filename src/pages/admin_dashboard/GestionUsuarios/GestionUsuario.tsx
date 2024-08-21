import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../components/GestionUsuarios.css";
import { IoPersonAddSharp, IoFilter } from "react-icons/io5";

interface User {
  Id?: number;
  Nombre: string;
  Apellido: string;
  Telefono: string;
  Email: string;
  Usuario: string;
  Contraseña: string;
  Rol_id: number;
  Rol?: string; //sera utilizado para comparar con Rol_id y traer de en vez de mostrar solo un numero se mapeara con la base para mostrar la info de ese id
}

const GestionUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    Nombre: "",
    Apellido: "",
    Telefono: "",
    Email: "",
    Usuario: "",
    Contraseña: "",
    Rol_id: 1,
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    document.title = "Usuarios";
    fetchUsersRoles(); // Usar la nueva función aquí
  }, []);
  

  //Traer los usuarios de la base de datos
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/usuarios");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  //Falta funcion const para traer los usuarios con su correspondiente rol mapeado y muestra el nombre no el id
  const fetchUsersRoles = async () => {
    setLoading(true);
    try {
      // Llamar al endpoint que trae los usuarios
      const responseUsers = await axios.get("http://localhost:4000/usuarios");
  
      // Llamar al endpoint que trae los roles
      const responseRoles = await axios.get("http://localhost:4000/usuarios-roles");
  
      const usersWithRoles = responseUsers.data.map((user: User) => {
        const role = responseRoles.data.find((rol: { id: number }) => rol.id === user.Rol_id);
        return { ...user, Rol: role ? role.nombre : "Rol desconocido" };
      });
  
      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error al obtener los usuarios con roles:", error);
    } finally {
      setLoading(false);
    }
  };
  
  //Agregar usuario a la base de datos
  const handleAddUser = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/usuarios", { ...newUser, Rol_id: newUser.Rol_id });
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      setErrors({ server: "Error al guardar el usuario." });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userId: number) => {
    const user = users.find((u) => u.Id === userId);
    if (user) {
      setNewUser(user);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  //Actualizar usuario de la base de datos por ID
  const handleUpdateUser = async () => {
    if (!validateForm() || newUser.Id === undefined) return;
    setLoading(true);
    try {
      await axios.put(`http://localhost:4000/usuarios/${newUser.Id}`, { ...newUser, Rol_id: newUser.Rol_id });
      await fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setErrors({ server: "Error al actualizar el usuario." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};
    if (!newUser.Nombre) validationErrors.Nombre = "El nombre es obligatorio";
    if (!newUser.Apellido) validationErrors.Apellido = "El apellido es obligatorio";
    if (!newUser.Telefono) validationErrors.Telefono = "El teléfono es obligatorio";
    if (!newUser.Email) validationErrors.Email = "El email es obligatorio";
    if (!newUser.Usuario) validationErrors.Usuario = "El nombre de usuario es obligatorio";
    if (!newUser.Contraseña) validationErrors.Contraseña = "La contraseña es obligatoria";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const resetForm = () => {
    setNewUser({
      Nombre: "",
      Apellido: "",
      Telefono: "",
      Email: "",
      Usuario: "",
      Contraseña: "",
      Rol_id: 1,
    });
    setShowForm(false);
    setIsEditing(false);
    setErrors({});
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  //Eliminar usuario de la base de datos por ID
  const confirmDeleteUser = async () => {
    if (userToDelete) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:4000/usuarios/${userToDelete.Id}`);
        setUsers(users.filter(user => user.Id !== userToDelete.Id));
        setUserToDelete(null);
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredUsers = filterRole
    ? users.filter(user => user.Rol_id === Number(filterRole))
    : users;

  return (
    <div className="gestion-usuarios-container p-8">
      <div className="gestion-usuarios-header">
        <h1 className="title">Gestión de Usuarios</h1>
        <div className="flex mb-4">
          <button className="btn-add flex" onClick={() => {
              resetForm();
              setShowForm(true);
          }}>
            <IoPersonAddSharp className="mr-2" />
            Agregar Usuario
          </button>
          <div className="filter-container flex items-center ml-4">
            <label htmlFor="filterRole" className="flex mr-2">
              <IoFilter /> Filtrar por Rol
            </label>
            <select 
              id="filterRole" 
              value={filterRole} 
              onChange={e => setFilterRole(e.target.value)} 
              className="filter-select border p-2"
            >
              <option value="">Todos</option>
              <option value="1">Estilista</option>
              <option value="2">Administrador</option>
              <option value="3">Recepcionista</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Cargando usuarios...</div>
      ) : (
        <div className="gestion-usuarios-content">
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Usuario</th>
                <th>Rol</th> {/* Mostrar el nombre del rol */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.Id}>
                  <td>{user.Nombre}</td>
                  <td>{user.Apellido}</td>
                  <td>{user.Telefono}</td>
                  <td>{user.Email}</td>
                  <td>{user.Usuario}</td>
                  <td>{user.Rol}</td> {/* Muestra el nombre del rol */}
                  <td>
                    <button onClick={() => handleEditUser(user.Id!)} className="btn-edit p-1">Editar</button>
                    <button onClick={() => handleDeleteUser(user)} className="btn-delete p-1 ml-2">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="form-usuario max-w-md mx-auto p-4 bg-white rounded shadow-lg">
            <h2 className="form-title text-2xl font-bold mb-8">{isEditing ? "Editar Usuario" : "Agregar Usuario"}</h2>

            <input type="text" className="mt-1 p-2 border rounded w-full" name="Nombre" placeholder="Nombre" value={newUser.Nombre} onChange={handleInputChange} />
            {errors.Nombre && <span className="error">{errors.Nombre}</span>}

            <input type="text" className="mt-1 p-2 border rounded w-full" name="Apellido" placeholder="Apellido" value={newUser.Apellido} onChange={handleInputChange} />
            {errors.Apellido && <span className="error">{errors.Apellido}</span>}

            <input type="text" className="mt-1 p-2 border rounded w-full" name="Telefono" placeholder="Teléfono" value={newUser.Telefono} onChange={handleInputChange} />
            {errors.Telefono && <span className="error">{errors.Telefono}</span>}

            <input type="email" className="mt-1 p-2 border rounded w-full" name="Email" placeholder="Email" value={newUser.Email} onChange={handleInputChange} />
            {errors.Email && <span className="error">{errors.Email}</span>}

            <input type="text" className="mt-1 p-2 border rounded w-full" name="Usuario" placeholder="Usuario" value={newUser.Usuario} onChange={handleInputChange} />
            {errors.Usuario && <span className="error">{errors.Usuario}</span>}

            <input type={showPassword ? "text" : "password"} className="mt-1 p-2 border rounded w-full" name="Contraseña" placeholder="Contraseña" value={newUser.Contraseña} onChange={handleInputChange} />
            {errors.Contraseña && <span className="error">{errors.Contraseña}</span>}

            <select value={newUser.Rol_id} onChange={(e) => setNewUser({ ...newUser, Rol_id: Number(e.target.value) })}>
              <option value="">Selecciona un rol</option>
              <option value="1">Administrador</option>
              <option value="2">Estilista</option>
              <option value="3">Recepcionista</option>
            </select>

            <div className="flex justify-center mt-4">
              <button onClick={isEditing ? handleUpdateUser : handleAddUser} className="btn-submit p-2 rounded">
                {isEditing ? "Actualizar Usuario" : "Agregar Usuario"}
              </button>
              <button onClick={resetForm} className="btn-cancel p-2 rounded ml-4">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {userToDelete && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {userToDelete.Nombre}?</p>
            <div className="button-container">
              <button className="btn-confirmar" onClick={confirmDeleteUser}>Sí, eliminar</button>
              <button className="btn-cancelar" onClick={() => setUserToDelete(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;