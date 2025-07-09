import { useState } from "react";
import "./ConfigModal.css";

const ConfigModal = ({ isOpen, onClose, onSaveConfig, currentConfig }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Definir el arreglo de cartas igual que en Game.jsx
  const uniqueCards = [
    { value: 1, reverseImage: "./images/1.png" },
    { value: 2, reverseImage: "./images/2.png" },
    { value: 3, reverseImage: "./images/3.jpg" },
    { value: 4, reverseImage: "./images/4.png" },
    { value: 5, reverseImage: "./images/5.png" },
    { value: 6, reverseImage: "./images/6.svg" },
    { value: 7, reverseImage: "./images/7.svg" },
    { value: 8, reverseImage: "./images/8.png" },
  ];
  const maxPartners = uniqueCards.length;
  const [config, setConfig] = useState({
    timer: currentConfig.timer || "01:00",
    movements: currentConfig.movements || 16,
    partners: currentConfig.partners || 3
  });
  const [error, setError] = useState("");
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Contraseña tomada de variable de entorno
    if (password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
      setPassword("");
    }
  };

  const handleSave = () => {
    if (config.partners < 1 || config.partners > maxPartners) {
      setError(`El número de parejas debe ser entre 1 y ${maxPartners}`);
      return;
    }
    setError("");
    onSaveConfig(config);
    onClose();
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleClose = () => {
    onClose();
    setIsAuthenticated(false);
    setPassword("");
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div className="config-modal-overlay">
      <div className="config-modal">
        <button className="config-close-btn" onClick={handleClose}>
          ×
        </button>
        
        {!isAuthenticated ? (
          <div className="auth-section">
            <h3>🔧 Configuración del Juego</h3>
            <p>Ingresa la contraseña para acceder a la configuración:</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="password-input"
              />
              <button type="submit" className="auth-btn">
                Acceder
              </button>
            </form>
          </div>
        ) : (
          <div className="config-section">
            <h3>⚙️ Configuración del Juego</h3>
            
            <div className="config-item">
              <label>Tiempo del juego (MM:SS):</label>
              <input
                type="text"
                value={config.timer}
                onChange={(e) => setConfig({...config, timer: e.target.value})}
                placeholder="01:00"
                pattern="[0-9]{2}:[0-9]{2}"
              />
            </div>

            <div className="config-item">
              <label>Movimientos máximos:</label>
              <input
                type="number"
                value={config.movements}
                onChange={(e) => setConfig({...config, movements: parseInt(e.target.value)})}
                min="1"
                max="50"
              />
            </div>

            <div className="config-item">
              <label>Parejas necesarias:</label>
              <input
                type="number"
                value={config.partners}
                onChange={(e) => setConfig({...config, partners: parseInt(e.target.value)})}
                min="1"
                max={maxPartners}
              />
            </div>
            {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}

            <div className="config-buttons">
              <button onClick={handleSave} className="save-btn">
                Guardar
              </button>
              <button onClick={handleClose} className="cancel-btn">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigModal; 