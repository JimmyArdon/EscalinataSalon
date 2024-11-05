import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../components/GestionUsuarios.css";
import { IoPersonAddSharp, IoFilter } from "react-icons/io5";
import { FaEdit, FaKey, FaTrash } from "react-icons/fa"; 

interface User {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  usuario: string;
  contraseña: string;
  rol_id: number;
  Rol?: string; 
}

const GestionUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    usuario: "",
    contraseña: "",
    rol_id: 1,
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string }>({});
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<{ id: number; descripcion: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    document.title = "Usuarios";
    fetchUsersRoles(); 
    fetchRoles();
  }, []);
  
//Falta funcion const para traer los usuarios con su correspondiente rol mapeado y muestra el nombre no el id
const fetchUsersRoles = async () => {
  setLoading(true);
  try {
    // Llamar al endpoint que trae los usuarios con roles ya mapeados
    const response = await axios.get("http://localhost:4000/usuarios-roles");
    console.log(response.data); // Verifica que la respuesta contiene el campo 'rol'
    // Los datos ya están en el formato esperado, solo actualizamos el estado
    setUsers(response.data);
  } catch (error) {
    console.error("Error al obtener los usuarios con roles:", error);
  } finally {
    setLoading(false);
  }
};

const fetchRoles = async () => {
  setLoading(true);
  try {
    const response = await axios.get("http://localhost:4000/roles"); // Ajusta el endpoint según tu API
    setRoles(response.data);
  } catch (error) {
    console.error("Error al obtener roles:", error);
  } finally {
    setLoading(false);
  }
};

  //Agregar usuario a la base de datos
  const handleAddUser = async () => {
    if (!validateForm()) return;
    setLoading(true);
    console.log(newUser);  
    try {
      const response = await axios.post("http://localhost:4000/usuarios", { ...newUser, rol_id: newUser.rol_id });
      setUsers([...users, response.data]);
      console.log('Usuario agregado:', response.data);
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      setErrors({ server: "Error al guardar el usuario." });
    } finally {
      setLoading(false);
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
        setPasswordErrors({ confirmPassword: "Las contraseñas no coinciden" });
        return;
    }
    setPasswordErrors({});
    setLoading(true);

    if (!newUser.id) {
        console.error("User ID is not defined");
        setPasswordErrors({ server: "No se pudo obtener el ID del usuario." });
        setLoading(false);
        return;
    }

    try {
        await axios.put(`http://localhost:4000/usuarios/${newUser.id}`, { nuevaContraseña: newPassword });
        setShowPasswordForm(false);
        alert("Contraseña cambiada con éxito");
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        setPasswordErrors({ server: "Error al cambiar la contraseña." });
    } finally {
        setLoading(false);
    }
  };


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
  
   // Actualizar usuario por ID
   const handleUpdateUser = async () => {
    if (!validateForm() || newUser.id === undefined) return;
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:4000/usuarios/${newUser.id}`, newUser);
      setUsers(users.map(user => user.id === newUser.id ? response.data : user));
      fetchUsersRoles();
      resetForm();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setErrors({ server: "Error al actualizar el usuario." });
    } finally {
      setLoading(false);
    }
  };

  // Manejar la edición de usuario
  const handleEditUser = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setNewUser(user);
      setEditForm(true);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};
    if (!newUser.nombre) validationErrors.Nombre = "El nombre es obligatorio";
    if (!newUser.apellido) validationErrors.Apellido = "El apellido es obligatorio";
    if (!newUser.telefono) validationErrors.Telefono = "El teléfono es obligatorio";
    if (!newUser.email) validationErrors.Email = "El email es obligatorio";
    if (!newUser.usuario) validationErrors.Usuario = "El nombre de usuario es obligatorio";
    if (!newUser.contraseña) validationErrors.Contraseña = "La contraseña es obligatoria";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const resetForm = () => {
    setNewUser({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      usuario: "",
      contraseña: "",
      rol_id: 0,
    });
    setShowForm(false);
    setEditForm(false);
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
        await axios.delete(`http://localhost:4000/usuarios/${userToDelete.id}`);
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setUserToDelete(null);
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      } finally {
        setLoading(false);
      }
    }
  };

 const filteredUsers = selectedRole
  ? users.filter(user => user.Rol === selectedRole)
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
    value={selectedRole} 
    onChange={e => setSelectedRole(e.target.value)} 
    className="filter-select border p-2"
  >
    <option value="">Todos</option>
    {roles.map(role => (
      <option key={role.id} value={role.descripcion}>
        {role.descripcion}
      </option>
    ))}
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
                <th>Nombre Completo</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Usuario</th>
                <th>Rol</th> {/* Mostrar el nombre del rol */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre + " " + user.apellido}</td>
                  <td>{user.telefono}</td>
                  <td>{user.email}</td>
                  <td>{user.usuario}</td>
                  <td>{user.Rol}</td> {/* Muestra el nombre del rol */}
                  <td>
                  <button onClick={() => handleEditUser(user.id!)} className="p-1">
                      <FaEdit className="text-yellow-500" />
                    </button>
                    <button onClick={() => setShowPasswordForm(true)} className="p-1">
                      <FaKey className="text-green-500" />
                    </button>
                    <button onClick={() => handleDeleteUser(user)} className="p-1">
                      <FaTrash className="text-red-500" />
                    </button>

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
            <h2 className="form-title text-2xl font-bold mb-8">{"Agregar Usuario"}</h2>

            <input type="text" className="mt-1 p-2 border rounded w-full" name="nombre" placeholder="Nombre" value={newUser.nombre} onChange={handleInputChange} />
            {errors.Nombre && <span className="error">{errors.Nombre}</span>}

            <input type="text" className="mt-1 p-2 border rounded w-full" name="apellido" placeholder="Apellido" value={newUser.apellido} onChange={handleInputChange} />
            {errors.Apellido && <span className="error">{errors.Apellido}</span>}

            <input type="text" className="mt-1 p-2 border rounded w-full" name="telefono" placeholder="Teléfono" value={newUser.telefono} onChange={handleInputChange} />
            {errors.Telefono && <span className="error">{errors.Telefono}</span>}

            <input type="email" className="mt-1 p-2 border rounded w-full" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
            {errors.Email && <span className="error">{errors.Email}</span>}

            <input type="text" className="mt-1 p-2 border rounded w-full" name="usuario" placeholder="Usuario" value={newUser.usuario} onChange={handleInputChange} />
            {errors.Usuario && <span className="error">{errors.Usuario}</span>}

            <input type={showPasswordForm ? "text" : "password"} className="mt-1 p-2 border rounded w-full" name="contraseña" placeholder="Contraseña" value={newUser.contraseña} onChange={handleInputChange} />
            {errors.Contraseña && <span className="error">{errors.Contraseña}</span>}

            <select value={newUser.rol_id} onChange={(e) => setNewUser({ ...newUser, rol_id: Number(e.target.value) })}>
              <option value="">Selecciona un rol</option>
              <option value="1">Administrador</option>
              <option value="2">Estilista</option>
              <option value="3">Recepcionista</option>
            </select>

            <div className="flex justify-center mt-4">
              <button onClick={ handleAddUser} className="btn-submit p-2 rounded">
                {"Agregar Usuario"}
              </button>
              <button onClick={resetForm} className="btn-cancel p-2 rounded ml-4">Cancelar</button>
            </div>
          </div>
        </div>
      )}
{editForm && (
  <div className="modal">
    <div className="form-usuario max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="form-title text-2xl font-bold mb-8">Editar Usuario</h2>
      <input type="text" className="mt-1 p-2 border rounded w-full" name="nombre" placeholder="Nombre" value={newUser.nombre} onChange={handleInputChange} />
      {errors.Nombre && <span className="error">{errors.Nombre}</span>}
      <input type="text" className="mt-1 p-2 border rounded w-full" name="apellido" placeholder="Apellido" value={newUser.apellido} onChange={handleInputChange} />
      {errors.Apellido && <span className="error">{errors.Apellido}</span>}
      <input type="text" className="mt-1 p-2 border rounded w-full" name="telefono" placeholder="Teléfono" value={newUser.telefono} onChange={handleInputChange} />
      {errors.Telefono && <span className="error">{errors.Telefono}</span>}
      <input type="email" className="mt-1 p-2 border rounded w-full" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
      {errors.Email && <span className="error">{errors.Email}</span>}
      <input type="text" className="mt-1 p-2 border rounded w-full" name="usuario" placeholder="Usuario" value={newUser.usuario} onChange={handleInputChange} />
      {errors.Usuario && <span className="error">{errors.Usuario}</span>}
      <select value={newUser.rol_id} onChange={(e) => setNewUser({ ...newUser, rol_id: Number(e.target.value) })}>
        <option value="">Selecciona un rol</option>
        <option value="1">Administrador</option>
        <option value="2">Estilista</option>
        <option value="3">Recepcionista</option>
      </select>
      <div className="flex justify-center mt-4">
        <button onClick={handleUpdateUser} className="btn-submit p-2 rounded">Actualizar Usuario</button>
        <button onClick={resetForm} className="btn-cancel p-2 rounded ml-4">Cancelar</button>
      </div>
    </div>
  </div>
)}
      {/* Formulario para cambiar contraseña */}
    {showPasswordForm && (
      <div className="modal">
        <div className="form-usuario max-w-md mx-auto p-4 bg-white rounded shadow-lg">
          <h2 className="form-title text-2xl font-bold mb-8">Cambiar Contraseña</h2>

          <input
            type="password"
            className="mt-1 p-2 border rounded w-full"
            name="contraseña"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {passwordErrors.confirmPassword && <span className="error">{passwordErrors.confirmPassword}</span>}
          
          <input
            type="password"
            className="mt-1 p-2 border rounded w-full"
            name="contraseña"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordErrors.confirmPassword && <span className="error">{passwordErrors.confirmPassword}</span>}

          <div className="flex justify-center mt-4">
            <button onClick={() => handleChangePassword()} className="btn-submit p-2 rounded">
              Cambiar Contraseña
            </button>
            <button onClick={() => setShowPasswordForm(false)} className="btn-cancel p-2 rounded ml-4">Cancelar</button>
          </div>
        </div>
      </div>
    )}
    
      {userToDelete && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {userToDelete.nombre}?</p>
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