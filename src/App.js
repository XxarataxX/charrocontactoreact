import React, { useState } from 'react';
import QRModal from './components/QRModal';
import { registrarCharro } from './services/api';
import './App.css'; // Crearemos este archivo para los estilos

const App = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', show: false, success: false });
  const [showQRModal, setShowQRModal] = useState(false);
  const [uuid, setUuid] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateUUID = () => {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ ...message, show: false });

    const newUuid = generateUUID();
    setUuid(newUuid);

    try {
      await registrarCharro({
        uuid: newUuid,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        empresa: formData.empresa,
        cargo: formData.cargo
      });
      setMessage({
        text: '¡Charro registrado con éxito!',
        show: true,
        success: true,
      });
      setFormData({ nombre: '', email: '', telefono: '' });
      setShowQRModal(true);
    } catch (error) {
      let errorMessage = 'Error al registrar charro';
      if (error.response) {
        errorMessage = error.response.data.error || error.response.statusText;
      } else if (error.request) {
        errorMessage = 'No se pudo conectar al servidor';
      }
      setMessage({
        text: errorMessage,
        show: true,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <link 
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Raleway:wght@400;600&display=swap" 
        rel="stylesheet"
      />
      
      <div className="form-container">
      <img 
        src={require('./muncocharro.png')} 
        alt="Sombrero charro" 
        className="sombrero-image"
      />

        <h2>Registro</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej. Juan Pérez Hernández"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Ej. juan@charro.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Número de teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              placeholder="Ej. 55 1234 5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="empresa">Empresa:</label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Ej. Charros Mexicanos S.A."
            />
          </div>

          <div className="form-group">
            <label htmlFor="cargo">Cargo:</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Ej. Gerente de Ventas"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="loading"></span>
                Enviando...
              </>
            ) : (
              'Registrar'
            )}
          </button>
        </form>

        {message.show && (
          <div className={`response-message ${message.success ? 'success' : 'error'}`}>
            {message.text}
          </div>
        )}

        {showQRModal && <QRModal uuid={uuid} onClose={() => setShowQRModal(false)} />}
      </div>
    </div>
  );
};

export default App;