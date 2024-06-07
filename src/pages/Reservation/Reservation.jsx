import React, { useEffect, useState } from "react";
import { Navbar } from "./../../components/navbar/Navbar";
import { Booking } from "../../components/booking/Booking";
import { Footer } from "./../../components/footer/Footer";
import { Calendar } from "../../components/calendar/Calendar";
import { OverView } from "./../../components/overView/OverView";
import { ClientInfo } from "../../components/clientInfo/ClientInfo";
import { GoldButton } from "../../components/button/Buttons";
import { Link, useNavigate } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import emailjs from "emailjs-com";
import dayjs from "dayjs";
import axios from "axios";
import "./reservation.css";

export const Reservation = () => {
  const [selectedService, setSelectedService] = useState(false);
  const [step, setStep] = useState();
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState(
    []
  );
  const [servicesTotalPrice, setServicesTotalPrice] = useState(0);
  const [additionalServicesTimeTotal, setAdditionalServicesTimeTotal] =
    useState(0);
  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [selectedDateRecord, setSelectedDateRecord] = useState("");
  const [selectedTimeRecord, setSelectedTimeRecord] = useState("");
  const [serviceTimeTotal, setServiceTimeTotal] = useState(15);
  useEffect(() => {
    setStep(1);
    setAdditionalServicesTimeTotal(0);
    setSelectedAdditionalServices([]);
    setServicesTotalPrice(0);
    setServiceTimeTotal(15);
    setSelectedTimeRecord("");
    setClientData({
      fullName: "",
      email: "",
      phone: "",
    });
  }, []);

  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL_FETCH);
        console.log("Fetched data:", response.data); // Check what the data looks like
        const fetchedReservations = response.data.map((item) => ({
          id: item.id,
          date: dayjs(item.datum).format("DD.MM.YYYY"),
          startTime: dayjs(item.zacatek_cas, "HH:mm:ss").format("HH:mm"),
          finishTime: dayjs(item.konec_cas, "HH:mm:ss").format("HH:mm"),
        }));
        console.log("fetched success");
        setBookedDates(fetchedReservations);
      } catch (err) {
        console.error("Fetching reservations failed: ", err);
      }
    };
    fetchData();
  }, []);

  console.log("bookedDates: ", bookedDates);

  useEffect(() => {
    selectedService.nazev
      ? setServiceTimeTotal(
          selectedService.delkaTrvani + additionalServicesTimeTotal
        )
      : setServiceTimeTotal(additionalServicesTimeTotal);
  }, [selectedService, additionalServicesTimeTotal]);

  const sendEmail = () => {
    let additionalServicesString = "";
    if (selectedAdditionalServices && selectedAdditionalServices.length > 0) {
      additionalServicesString = selectedAdditionalServices
        .map((service) => service.nazev)
        .join(", ");
    }

    const postData = {
      datum: selectedDateRecord.format("YYYY-MM-DD"),
      zacatek_cas: dayjs(selectedTimeRecord, "HH:mm").format("HH:mm:ss.SSS"),
      konec_cas: dayjs(selectedTimeRecord, "HH:mm")
        .add(serviceTimeTotal, "minute")
        .format("HH:mm:ss.SSS"),
      klient_jmeno: clientData.fullName,
      klient_sluzba: selectedService.nazev,
      klient_sluzby_dodatecne: additionalServicesString,
      klient_telefon: clientData.phone,
      klient_email: clientData.email,
      klient_cena: selectedService.cena + servicesTotalPrice,
    };

    // const postReservationData = async () => {
    //   console.log(postData);
    //   try {
    //     const response = await axios.post(process.env.REACT_APP_API_URL, {
    //       data: postData, // Ensure this matches the expected format of your Strapi backend
    //     });

    //     // If you want to do something with the response, like updating the state
    //     console.log("Successfully posted data", response.data);

    //     // Optionally, refresh the data list or notify the user of success
    //   } catch (err) {
    //     console.error("Posting reservation failed:", err);
    //     // Optionally, handle errors, e.g., show an error message to the user
    //   }
    // };

    const postReservationData = async (postData) => {
      console.log("Sending data:", postData);
      console.log(postData);
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL_SUBMIT,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Successfully posted data", response.data);
        // Optionally, refresh the data list or notify the user of success
      } catch (err) {
        console.error("Posting reservation failed:", err);
        // Optionally, handle errors, e.g., show an error message to the user
      }
    };

    postReservationData(postData);

    const templateParams = {
      clientName: clientData.fullName,
      clientPhone: clientData.phone,
      clientEmail: clientData.email,
      service: selectedService.nazev, // Assuming selectedService has a name property
      date: selectedDateRecord.format("DD.MM.YYYY"),
      time: selectedTimeRecord,
      totalPrice: selectedService.cena + servicesTotalPrice,
      duration: serviceTimeTotal,
      additionalServices: additionalServicesString,
    };

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS values
    emailjs
      .send(
        "service_e4xh0ba",
        "template_uiettdu",
        templateParams,
        "nOyGaG-s7iiBDCwhS"
      )
      .then(
        (response) => {
          console.log("Email successfully sent!", response);
          alert(
            "Rezervace proběhla úspěšně, zkontrolujte si svůj email s termínem rezervace."
          );
        },
        (err) => {
          console.error("Failed to send email. Error: ", err);
          alert("Failed to send reservation confirmation email.");
        }
      );
  };
  //https://www.emailjs.com/ POKRAČOVÁNÍ ZÍTRA

  return (
    <div className="reservation">
      <div className="pageWrapper">
        <nav>
          <Navbar />
        </nav>
        <div className="bodyContent">
          {step > 1 && (
            <ArrowBackIosNewIcon
              style={{ height: "5rem", width: "5rem" }}
              className="arrowBackIcon desktop-only"
              onClick={() => {
                setStep(step - 1);
                setAdditionalServicesTimeTotal(0);
              }}
              data-aos="fade-right"
              data-aos-duration="1200"
            />
          )}
          {step === 1 && (
            <div className="reservationSection">
              <div
                className="reservationFrame mobileFullWidth"
                data-aos="fade-down"
                data-aos-duration="1200"
              >
                <Booking
                  setSelectedService={setSelectedService}
                  selectedService={selectedService}
                  setServicesTotalPrice={setServicesTotalPrice}
                  selectedAdditionalServices={selectedAdditionalServices}
                  setSelectedAdditionalServices={setSelectedAdditionalServices}
                  setAdditionalServicesTimeTotal={
                    setAdditionalServicesTimeTotal
                  }
                />

                <button
                  className="reserveBtn"
                  text="Rezervovat termín"
                  onClick={() => {
                    setStep(2);
                  }}
                  step={step}
                  disabled={!(selectedService || selectedAdditionalServices)}
                >
                  Vybrat termín
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="reservationSection">
              <div
                className="reservationFrame"
                data-aos="fade-down"
                data-aos-duration="1200"
              >
                <Calendar
                  setSelectedDateRecord={setSelectedDateRecord}
                  setSelectedTimeRecord={setSelectedTimeRecord}
                  serviceTimeTotal={serviceTimeTotal}
                  additionalServicesTimeTotal={additionalServicesTimeTotal}
                  bookedDates={bookedDates}
                  setStep={setStep}
                  selectedService={selectedService}
                  selectedAdditionalServices={selectedAdditionalServices}
                  servicesTotalPrice={servicesTotalPrice}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="reservationSection">
              <div
                className="reservationFrame"
                data-aos="fade-down"
                data-aos-duration="1200"
              >
                <ClientInfo setClientData={setClientData} />
                <OverView
                  servicesTotalPrice={servicesTotalPrice}
                  serviceTimeTotal={serviceTimeTotal}
                  selectedAdditionalServices={selectedAdditionalServices}
                  selectedService={selectedService}
                  selectedTimeRecord={selectedTimeRecord}
                  selectedDateRecord={selectedDateRecord}
                />
                <span className="cancelReservation">
                  Zrušte svou rezervaci minimálně 2h před termínem pomocí
                  zavolání, či SMS načíslo 777 607 447. <br></br>
                  <b>
                    V případě nedostavení a neomluvení se min. 2 hodiny předem,
                    bude při další návštěvě navíc účtovaná částka 50% ze služby.
                  </b>
                </span>
                <Link className="link" to="/">
                  <button
                    className="reserveBtn"
                    text="Rezervovat termín"
                    setStep={setStep}
                    onClick={sendEmail}
                    step={step}
                    disabled={
                      !(
                        clientData.fullName &&
                        clientData.email &&
                        clientData.phone
                      )
                    }
                  >
                    Rezervovat termín
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
