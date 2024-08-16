import React, { useState, useEffect } from "react";
import "../../../components/GestionUsuarios.css";
import { IoPersonAddSharp, IoFilter } from "react-icons/io5"; // Importamos los iconos necesarios
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  user: string;
  password: string;
  role: string;
}

const GestionUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      phoneNumber: "123456789",
      email: "juan@example.com",
      user: "juanp",
      password: "password123",
      role: "Admin"
    },
    {
      id: 2,
      firstName: "María",
      lastName: "Gómez",
      phoneNumber: "987654321",
      email: "maria@example.com",
      user: "mariag",
      password: "password123",
      role: "Recepcionista"
    }
  ]);

  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    user: "",
    password: "",
    role: "Estilista",
  });
  const [showForm, setShowForm] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  useEffect(() => {
    document.title = "Usuarios";
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const formErrors: { [key: string]: string } = {};

    if (!newUser.firstName) formErrors.firstName = "El nombre es obligatorio.";
    if (!newUser.lastName) formErrors.lastName = "El apellido es obligatorio.";
    if (!newUser.phoneNumber) formErrors.phoneNumber = "El número de teléfono es obligatorio.";
    if (!newUser.email) {
      formErrors.email = "El correo electrónico es obligatorio.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(newUser.email)) {
        formErrors.email = "El correo electrónico no es válido.";
      }
    }
    if (!newUser.user) formErrors.user = "El usuario es obligatorio.";
    if (!newUser.password) formErrors.password = "La contraseña es obligatoria.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddUser = () => {
    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      setUsers(users.map(user => (user.id === newUser.id ? newUser : user)));
    } else {
      const newId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
      setUsers([...users, { ...newUser, id: newId }]);
    }

    resetForm();
  };

  const handleDeleteUser = (id: number) => {
    setUserToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete !== null) {
      setUsers(users.filter(user => user.id !== userToDelete));
      closeModal();
    }
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowConfirmModal(false);
      setClosing(false);
      setUserToDelete(null);
    }, 300);  // Duracion de la animacion
  };

  const handleEditUser = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setNewUser(userToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(e.target.value);
  };

  const filteredUsers = filterRole ? users.filter(user => user.role === filterRole) : users;

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setNewUser({
      id: 0,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      user: "",
      password: "",
      role: "Estilista",
    });
    setShowForm(false);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="gestion-usuarios p-8">
      <div className="header">
        <h1 className="title text-3xl font-bold mb-8 text-gray-900">Gestión de Usuarios</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-add bg-blue-500 text-white p-2 mb-8 flex items-center">
            <IoPersonAddSharp className="mr-2" />
            Agregar Nuevo Usuario
          </button>
        )}
      </div>

      {showForm ? (
        <div className="form-container mb-8">
          <h2 className="form-title text-2xl font-bold mb-4">{isEditing ? "Editar Usuario" : "Añadir Usuario"}</h2>
          <div className="form-row mb-4">
            <div className="input-container mb-4 w-full">
              <label htmlFor="firstName" className="block text-gray-700">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                className={`input border p-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="error-message text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div className="input-container mb-4 w-full">
              <label htmlFor="lastName" className="block text-gray-700">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                className={`input border p-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <p className="error-message text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="input-container mb-4 w-full">
              <label htmlFor="phoneNumber" className="block text-gray-700">Número de Teléfono</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
                className={`input border p-2 w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
              {errors.phoneNumber && <p className="error-message text-red-500 mt-1">{errors.phoneNumber}</p>}
            </div>
            <div className="input-container mb-4 w-full">
              <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className={`input border p-2 w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="error-message text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div className="input-container mb-4 w-full">
              <label htmlFor="user" className="block text-gray-700">Usuario</label>
              <input
                type="user"
                id="user"
                name="user"
                value={newUser.user}
                onChange={handleInputChange}
                className={`input border p-2 w-full ${errors.user ? 'border-red-500' : ''}`}
              />
              {errors.user && <p className="error-message text-red-500 mt-1">{errors.user}</p>}
            </div>
            
            <div className="input-container mb-4 w-full">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className={`input border p-2 w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
                </span>
              </div>
              {errors.password && <p className="error-message text-red-500 mt-1">{errors.password}</p>}
            </div>

          </div>
          <div className="select-container mb-3">
            <select id="role" name="role" value={newUser.role} onChange={handleInputChange} className="input border p-2 w-full">
              <option value="Admin">Admin</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Estilista">Estilista</option>
            </select>
          </div>
          <div className="form-buttons">
            <button onClick={handleAddUser} className="btn-submit bg-blue-500 text-white p-2 mt-4">
              {isEditing ? "Guardar Cambios" : "Agregar Usuario"}
            </button>
            <button onClick={handleCancel} className="btn-cancel bg-red-500 text-white p-2 mt-4 ml-4">Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div className="filter-container mb-4">
            <label htmlFor="filterRole" className="filter-label flex items-center mr-2">
              <IoFilter /> Filtrar por Rol
            </label>
            <select id="filterRole" value={filterRole} onChange={handleFilterChange} className="filter-select border p-2">
              <option value="">Todos</option>
              <option value="Admin">Admin</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Estilista">Estilista</option>
            </select>
          </div>

          <div>
            {filteredUsers.length > 0 ? (
              <table className="users-table border-collapse w-full">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Nombre</th>
                    <th className="table-cell">Apellido</th>
                    <th className="table-cell">Teléfono</th>
                    <th className="table-cell">Correo Electrónico</th>
                    <th className="table-cell">Usuario</th>
                    <th className="table-cell">Rol</th>
                    <th className="table-cell">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="table-row">
                      <td className="table-cell">{user.firstName}</td>
                      <td className="table-cell">{user.lastName}</td>
                      <td className="table-cell">{user.phoneNumber}</td>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">{user.user}</td>
                      <td className="table-cell">{user.role}</td>
                      <td className="table-cell">
                        <button onClick={() => handleEditUser(user.id)} className="btn-edit bg-yellow-500 text-white p-1">
                          Editar
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="btn-delete bg-red-500 text-white p-1 ml-2">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-users text-gray-500">No hay usuarios disponibles.</p>
            )}
          </div>
        </>
      )}

      {showConfirmModal && (
        <div className={`Overlay ${closing ? "fadeOut" : "fadeIn"}`}>
          <div className={`Modal ${closing ? "fadeOut" : "fadeIn"}`}>
            <p>¿Seguro que deseas eliminarlo?</p>
            <button onClick={confirmDeleteUser} className="btn-submit">Confirmar</button>
            <button onClick={closeModal} className="btn-cancel">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;