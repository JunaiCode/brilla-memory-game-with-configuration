import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Home from "./pages/Home";
import CompletePage from "./pages/CompletePage";
import { useState } from "react";

function App() {
  const [win, setWin] = useState(false);
  const [movements, setMovements] = useState(0);
  const [partners, setPartners] = useState(0);
  const [formatedTime, setFormatedTime] = useState('01:00');
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game"
            element={
              <Game
                setWin={setWin}
                movements={movements}
                setMovements={setMovements}
                partners={partners}
                setPartners={setPartners}
                formatedTime={formatedTime}
                setFormatedTime={setFormatedTime}
              />
            }
          />
          <Route
            path="/completeGame"
            element={
              <CompletePage
                win={win}
                movements={movements}
                partners={partners}
                setMovements={setMovements}
                setPartners={setPartners}
                formatedTime={formatedTime}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
