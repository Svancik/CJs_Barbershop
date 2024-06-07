import React from "react";
import { Slider } from "../../components/slider/Slider";
import { Services } from "../../components/services/Services";
import { Gallery } from "../../components/gallery/Gallery";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import ScrollToHashElement from "../../components/ScrollToHashElement";
import { AboutMe } from "../../components/aboutMe/AboutMe";
import "./home.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>CJ's BarberShop - Vítej u Sama</title>
        <meta
          name="description"
          content=" Jmenuji se Sam a s hrdostí mohu říci, že stříhání a holení není jen
          mojí prací, ale vášní, které se věnuji už přes 7 let. Můj osobitý
          přístup ke každému klientovi spočívá v tom, že se snažím nejen
          pochopit, co od svého účesu očekává, ale také se s ním skutečně
          spojit a vytvořit vztah založený na důvěře a vzájemném respektu."
        />
        <meta
          name="keywords"
          content="Barbershop, CJsBarbershop, Vlasy jednou velikostí,  Klasický střih, Buzzcut (vršek strojkem, strany skin fade), Premium střih (skin fade), Vlasy dlouhé, Holení vlasů do hladka, Vousy krátké, Vousy dlouhé, Holení dohladka, Vlasy, vousy/holení do hladka, péče o pleť, styling, balzám na vousy, nápoj, káva zdarma "
        />
        <meta property="og:title" content="CJ's BarberShop - Vítej u Sama" />
        <meta
          property="og:description"
          content=" Jmenuji se Sam a s hrdostí mohu říci, že stříhání a holení není jen
          mojí prací, ale vášní, které se věnuji už přes 7 let. Můj osobitý
          přístup ke každému klientovi spočívá v tom, že se snažím nejen
          pochopit, co od svého účesu očekává, ale také se s ním skutečně
          spojit a vytvořit vztah založený na důvěře a vzájemném respektu."
        />
        <meta
          property="og:image"
          content="https://cjsbarber.shop/logo192.png"
        />
        <meta property="og:url" content={`https://cjsbarber.shop`} />
        <meta name="twitter:title" content={`CJ's BarberShop - Vítej u Sama`} />
        <meta
          name="twitter:description"
          content=" Jmenuji se Sam a s hrdostí mohu říci, že stříhání a holení není jen
          mojí prací, ale vášní, které se věnuji už přes 7 let. Můj osobitý
          přístup ke každému klientovi spočívá v tom, že se snažím nejen
          pochopit, co od svého účesu očekává, ale také se s ním skutečně
          spojit a vytvořit vztah založený na důvěře a vzájemném respektu."
        />
        <meta
          name="twitter:image"
          content="https://cjsbarber.shop/logo192.png"
        />
      </Helmet>
      <div className="pageWrapper">
        <ScrollToHashElement />
        <nav>
          <Navbar />
        </nav>
        <div className="bodyContent">
          <Slider />
          <Services />
          <AboutMe />
          <Gallery />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
