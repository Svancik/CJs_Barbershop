import "./App.css";
import React, { useState } from "react";
import AOS from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import axios from "axios";
import { useEffect } from "react";
import { Reservation } from "./pages/Reservation/Reservation";
import { Admin } from "./pages/Admin/Admin";
import ProtectedRoute from "./ProtectedRoute"; // Import if it's in a separate file
import Login from "./pages/Login/Login";

/*
TODO:


- POUŽÍT FOTO SALONU JAKO Background


API:
? Database name: CJsBarber
? Host: (127.0.0.1)
? Port: (3306)
? Username: root
? password: Awesome1998

STRAPI:
Firstname: CJ
Lastname: Barber
email: sam294@seznam.cz
pass: CJbarbershop23!

MYSQL:
root
Awesome1998


Hostinger:
Barber29042001
sam294@seznam.cz

Hostinger Mail:
rezervace
Barber29042001!

backend
sam294
barber294

TODO:

Dodělat BE - nahrát strapi na HOSTINGER - jak na to? - https://support.hostinger.com/en/articles/9054766-how-to-use-the-strapi-vps-template
EmailJS nefunguje - dodělat pro firemní mail
Napojení na server níže
https://www.youtube.com/watch?v=Q3ixb1w-QaY
*/

function App() {
  AOS.init();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await axios.get(process.env.REACT_APP_API_URL, {
        //   Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
        // });
        const data = await axios.get(process.env.REACT_APP_API_URL);

        console.log(data.data.data[1].s);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rezervace" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
