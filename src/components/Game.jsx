import { useEffect, useState } from "react";
import Square from "./Square";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const Game = ({ movements, setMovements, partners, setPartners, setWin, formatedTime, setFormatedTime }) => {
  const [previousValue, setPreviousValue] = useState(null); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [previousCard, setPreviousCard] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const defaultImage = "./images/celsia-logo-home.svg";
  const necesaryMovements = 16;
  const necesaryPartners = 3;
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    validateWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partners, movements]);

  const confirmMovement = (value, card, image) => {
    if (value === previousValue) {
      setPartners((prev) => prev + 1);
    } else {
      setTimeout(() => {
        previousCard.disabled = false;
        card.disabled = false;
        previousImage.src = defaultImage;
        previousImage.style = "object-fit: contain;";
        card.style = "border: none;";
        previousCard.style = "border: none;";
        image.style = "object-fit: contain;";
        image.src = defaultImage;
      }, 1000);
    }
    setPreviousCard(null);
    setPreviousImage(null);
    setPreviousValue(null);
    setMovements((prev) => prev + 1);
  };

  const changeValues = (value, card, image, reverseImage) => {
    disabledCard(card);
    validateImage(image, reverseImage);
    if (previousValue == null) {
      setPreviousValue(value);
    } else {
      confirmMovement(value, card, image);
    }
  };

  const generateRandomCards = () => {
    const cards = [
      {
        value: 1,
        reverseImage: "./images/1.svg",
      },
      {
        value: 2,
        reverseImage: "./images/2.svg",
      },
      {
        value: 3,
        reverseImage: "./images/3.svg",
      },
      {
        value: 4,
        reverseImage: "./images/4.svg",
      },
      {
        value: 5,
        reverseImage: "./images/5.svg",
      },
      {
        value: 6,
        reverseImage: "./images/6.svg",
      },
    ];
    // duplicar el array
    const pairs = [...cards, ...cards];
    setCards(shuffle(pairs));
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    // Mientras queden elementos a mezclar...
    while (currentIndex !== 0) {
      // Elegir un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // E intercambiarlo con el elemento actual
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const disabledCard = (card) => {
    if (previousCard == null) {
      setPreviousCard(card);
    }
    card.disabled = true;
  };

  const validateImage = (image, reversImage) => {
    image.src = reversImage;
    if (previousImage == null) {
      setPreviousImage(image);
    }
  };

  const resetGame = () => {
    setMovements(0);
    setPartners(0);
    setPreviousValue(null);
    setPreviousCard(null);
    generateRandomCards();
  };

  const validateWin = () => {
    if (partners === 0 && movements === 0) return;

    if (movements <= necesaryMovements && partners === necesaryPartners) {
      setWin(true);
      navigate("/completegame");
    } else {
      if (movements >= necesaryMovements) {
        setWin(false);
        navigate("/completegame");
      }
      if(partners === 0 && movements === 0){
        setWin(false);
        navigate("/completegame");
      }
    }
  };

  return (
    <div className="div-game">
      <nav className="nav-celsia">
        <img src="/images/logo-navbar.svg" className="logo-nav-bar" alt="logo" />
      </nav>
      <h1 className="title">
        ¡Arma {necesaryPartners} parejas en menos de {necesaryMovements}{" "}
        movimientos y gana!
      </h1>
      <Timer formatedTime={formatedTime} setFormatedTime={setFormatedTime} />
      <Stats movements={movements} partners={partners}/>
      <div className="grid">
      <img src="/images/historias-game.svg" alt="buena-energia" />
      <Square
        cards={cards}
        changeValues={changeValues}
        defaultImage={defaultImage}
      />
      </div>
    </div>
  );
};

export default Game;
