import { useRef } from "react";

const Card = ({ value, changeValues, defaultImage, reverseImage }) => {
  let refImage = useRef(null);
  let refButton = useRef(null);
  const handleClick = () => {
    changeValues(value, refButton.current, refImage.current, reverseImage);
    if(refImage.current.src.split("/").pop() !== defaultImage.split("/").pop()){
    refImage.current.style = "object-fit: fill; border: 2px solid #d9772d;";
    refButton.current.style = "padding: 0; background-color: transparent;";
    }else{
    refButton.current.style = "background-color: transparent; border: 2px solid #d9772d;";
    }
  };

  return (
    <button className="card" onClick={handleClick} ref={refButton}>
      <img src={defaultImage} alt="" ref={refImage} />
    </button>
  );
};

export default Card;
