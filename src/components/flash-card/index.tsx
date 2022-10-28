import React,{useState} from "react";
import "./style.css";
const FlashCard = (props) => {
  const [isFlip, setIsFlip] = useState(false);
  return (
    <div className="flip-card" onClick={(e) => {setIsFlip(!isFlip); console.log("click")}}>
      <div className={isFlip ? "flip-card-inner flip-card-inner-rotate":"flip-card-inner"}>
        <div className="flip-card-front">
          <h1>{props.text}</h1>
        </div>
        <div className="flip-card-back">
          <h1>{props.meaning}</h1>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
