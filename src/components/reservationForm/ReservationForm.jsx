import React, { useState, useEffect } from "react";
import dayjs from "dayjs"; // dayjs is a popular choice for date manipulation in JavaScript

import "./reservationForm.css";

const ReservationForm = ({ reservation, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    datum: "",
    zacatek_cas: "",
    konec_cas: "",
    klient_jmeno: "",
    klient_sluzba: "",
    klient_sluzby_dodatecne: "",
    klient_telefon: "",
    klient_email: "",
    klient_cena: "",
  });

  let isFormValid;

  if (!reservation) {
    isFormValid =
      formData.datum &&
      formData.zacatek_cas &&
      formData.konec_cas &&
      formData.klient_jmeno;
  }

  if (reservation) {
    isFormValid = true;
  }

  // Effect to populate form data when editing an existing reservation
  useEffect(() => {
    if (reservation) {
      setFormData({
        id: reservation.id || "",
        datum: dayjs(reservation.datum).format("YYYY-MM-DD") || "",
        zacatek_cas: reservation.zacatek_cas || "",
        konec_cas: reservation.konec_cas || "",
        klient_jmeno: reservation.klient_jmeno || "",
        klient_sluzba: reservation.klient_sluzba || "",
        klient_sluzby_dodatecne: reservation.klient_sluzby_dodatecne || "",
        klient_telefon: reservation.klient_telefon || "",
        klient_email: reservation.klient_email || "",
        klient_cena: reservation.klient_cena || "",
      });
    }
    isFormValid = true;
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // This check might be redundant since the button is disabled when not valid, but it's safe to keep.
      onSave(formData); // Use the onSave passed from the parent, which handles the POST or PUT request.
    }
  };

  console.log("reservation datum: ", formData.datum);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "whitesmoke",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      className="reservationForm"
    >
      <form onSubmit={handleSubmit}>
        <input
          name="datum"
          value={formData.datum}
          placeholder={formData.datum}
          onChange={handleChange}
          type="date"
        />
        <input
          placeholder="Začátek"
          name="zacatek_cas"
          value={formData.zacatek_cas}
          onChange={handleChange}
          type="time"
        />
        <input
          placeholder="Konec"
          name="konec_cas"
          value={formData.konec_cas}
          onChange={handleChange}
          type="time"
        />
        <input
          placeholder="Klient"
          name="klient_jmeno"
          value={formData.klient_jmeno}
          onChange={handleChange}
        />
        <input
          placeholder="Služba"
          name="klient_sluzba"
          value={formData.klient_sluzba}
          onChange={handleChange}
        />
        <input
          placeholder="Přídavkové služby"
          name="klient_sluzby_dodatecne"
          value={formData.klient_sluzby_dodatecne}
          onChange={handleChange}
        />
        <input
          placeholder="Telefon"
          name="klient_telefon"
          value={formData.klient_telefon}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          name="klient_email"
          value={formData.klient_email}
          onChange={handleChange}
        />
        <input
          placeholder="Cena"
          name="klient_cena"
          value={formData.klient_cena}
          onChange={handleChange}
          type="text"
        />
        <button
          type="submit"
          style={{
            backgroundColor: !isFormValid ? "#ccc" : "",
            color: !isFormValid ? "#666" : "",
            cursor: !isFormValid ? "not-allowed" : "",
            border: !isFormValid ? "1px solid #999" : "",
          }}
          disabled={!isFormValid}
        >
          Uložit
        </button>
        <button type="button" onClick={onCancel}>
          Zrušit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
