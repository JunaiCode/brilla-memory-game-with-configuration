import { useNavigate } from "react-router-dom";
const CompletePage = ({
  win,
  movements,
  partners,
  setMovements,
  setPartners,
  formatedTime,
}) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    setMovements(0);
    setPartners(0);
    navigate("/");
  };
  if(partners === 0 && movements === 0){
    win = false;
  }
  return (
    <div>
      <article className="complete-page">
        <aside className="complete-page-opacity">
          <div className="complete-page-content">
            {win && (
              <h2 className="complete-page-title">
                ¡Felicidades! Has completado {partners} parejas en {movements} movimientos, y te sobraron {formatedTime.split(":")[1]} segundos antes del tiempo límite.
              </h2>
            )}
            {!win && (
              <h2 className="complete-page-title">
                Oops! excediste los 16 movimientos o te pasaste del limite de tiempo, vuelve a intentarlo.
              </h2>
            )}
            <button onClick={navigateToHome} className="play-button">
              Jugar de nuevo
            </button>
          </div>
        </aside>
      </article>
    </div>
  );
};

export default CompletePage;
