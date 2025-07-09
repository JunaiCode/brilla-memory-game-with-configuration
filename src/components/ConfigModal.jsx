import { useState } from "react";
import "./ConfigModal.css";

const ConfigModal = ({ isOpen, onClose, onSaveConfig, currentConfig }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [config, setConfig] = useState({
    timer: currentConfig.timer || "01:00",
    movements: currentConfig.movements || 16,
    partners: currentConfig.partners || 3
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Contraseña simple: "admin123"
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
      setPassword("");
    }
  };

  const handleSave = () => {
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
                max="6"
              />
            </div>

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