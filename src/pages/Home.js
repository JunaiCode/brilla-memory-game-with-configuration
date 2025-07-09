import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfigModal from "../components/ConfigModal";

const Home = ({ setGameConfig }) => {
  const navigate = useNavigate();
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    timer: "01:00",
    movements: 16,
    partners: 3
  });

  const navigateToGame = () => {
    // Pasar la configuración al juego
    navigate("/game");
  };

  const handleConfigSave = (newConfig) => {
    setConfig(newConfig);
    setGameConfig(newConfig);
  };

  const handleConfigClick = (e) => {
    e.preventDefault();
    setShowConfig(true);
  };

  return (
    <div>
      <article className="hero-image">
        <aside className="hero-image-opacity">
          <div className="hero-image-content">
            <h2 className="hero-image-title">Bienvenid@s</h2>
            <img src="images/logo.svg" className="logo-home" alt="LogoHome" />
            <button onClick={navigateToGame} className="play-button">
              Jugar
            </button>
          </div>
        </aside>
        <img src="images/corner.png" className="corner" alt="corner" />
        
        {/* Botón oculto de configuración */}
        <button 
          onClick={handleConfigClick}
          className="config-button"
          title="Configuración"
        >
          ⚙️
        </button>
      </article>

      <ConfigModal
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        onSaveConfig={handleConfigSave}
        currentConfig={config}
      />
    </div>
  );
};

export default Home;
