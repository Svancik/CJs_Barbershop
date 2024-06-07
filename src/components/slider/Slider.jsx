import React from "react";
import { useState } from "react";
import "./slider.css";
import { SliderInfo } from "../sliderInfo/SliderInfo";

//TODO: DOKONČIT SLIDER responsivní zobrazení

export const Slider = () => {
  // eslint-disable-next-line

  return (
    <div className="slider" id="uvod" data-aos="fade-down">
      <SliderInfo />
      <div className="container">
        <img
          className="desktop-only"
          src={require("../../media/samBG2.webp")}
          alt=""
        />
        <img
          className="mobile-only"
          src={require("../../media/samBGmobile3.webp")}
          alt=""
        />
      </div>
    </div>
  );
};
