import React from "react";
import { useState } from "react";
import { AutoAwesomeMotion, VolumeUp, Autorenew } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FlashCard from "../flash-card";
import Carousel from "react-material-ui-carousel";
import "./style.css";
const FlashCardCarousel = ({ vocabularyList }) => {
  const [currentCard, setCurrentCard] = useState(1);
  const [isAuto, setIsAuto] = useState(false);
  var msg = new SpeechSynthesisUtterance();

  const handleSpeak = (index) => {
    const vocabulary = vocabularyList.find(
      (element, elIndex) => elIndex === index
    );
    msg.text = vocabulary.text;
    msg.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };
  return (
    <div className="flash-card-carousel-container">
      <div className="functioning-container">
        <div className="card-number-status">
          <AutoAwesomeMotion />
          {currentCard + "/" + vocabularyList.length}
        </div>
        <IconButton size="small">
          <VolumeUp onClick={(e) => handleSpeak(currentCard - 1)} />
        </IconButton>
        <IconButton size="small" onClick={(e) => setIsAuto(!isAuto)}>
          {isAuto && <Autorenew color={"secondary"} />}
          {!isAuto && <Autorenew />}
        </IconButton>
      </div>
      <Carousel
        next={(next, active) => {
          if (next !== undefined) {
            setCurrentCard(next + 1);
            handleSpeak(next);
          }
        }}
        prev={(prev, active) => {
          if (prev !== undefined) setCurrentCard(prev + 1);
          handleSpeak(prev);
        }}
        sx={{ background: "transparent" }}
        animation="slide"
        navButtonsAlwaysVisible
        indicators={false}
        cycleNavigation={isAuto}
        autoPlay={isAuto}
      >
        {vocabularyList.map((item, i) => (
          <>
            <FlashCard key={i} text={item.text} meaning={item.meaning} />
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default FlashCardCarousel;
