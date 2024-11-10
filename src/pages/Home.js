import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const navigateToGame = () => {
    navigate("/game");
  };
  return (
    <div>
      <article className="hero-image">
        <aside className="hero-image-opacity">
          <div className="hero-image-content">
          <img src="images/historias-home.svg" className="logo-historias" alt="historias-logo" />
          <div className="button-home">
          <img src="images/celsia-logo-home.svg" className="logo-celsia" alt="celsia-logo" />
            <button onClick={navigateToGame} className="play-button">
              Comencemos
            </button>
            </div>
          </div>
        </aside>
      </article>
    </div>
  );
};

export default Home;
