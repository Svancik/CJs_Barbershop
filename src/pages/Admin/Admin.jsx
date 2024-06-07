import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // dayjs is a popular choice for date manipulation in JavaScript
import { useEffect } from "react";
import "./admin.css";
import ReservationsTable from "./../../components/reservationsTable/ReservationsTable";
import ReservationForm from "./../../components/reservationForm/ReservationForm";

export const Admin = () => {
  const [editingReservation, setEditingReservation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = React.useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [reservations, setReservations] = useState([]);

  const fetchReservations = () => {
    axios
      .get(process.env.REACT_APP_API_URL_FETCH)
      .then((response) => {
        const today = dayjs().format("YYYY-MM-DD"); // Gets today's date
        const filteredData = response.data
          .filter((item) => {
            const itemDate = dayjs(item.datum).format("YYYY-MM-DD");
            return filterDate ? itemDate === filterDate : itemDate >= today;
          })
          .map((item) => {
            // Convert date format for display
            return {
              ...item,
              zacatek_cas: dayjs(item.zacatek_cas, "HH:mm:ss").format("HH:mm"),
              konec_cas: dayjs(item.konec_cas, "HH:mm:ss").format("HH:mm"),
            };
          });

        setReservations(filteredData);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setShowForm(true); // Show form with data to edit
  };

  const handleAddNew = () => {
    setEditingReservation(null); // Clear any existing data
    setShowForm(true); // Show empty form for new reservation
  };

  const handleSave = (formData) => {
    console.log("formData.id: ", formData.id);
    const method = formData.id ? "put" : "post";
    const url = formData.id
      ? `${process.env.REACT_APP_API_URL_EDIT}?id=${formData.id}` // Assuming edit.php handles updates
      : process.env.REACT_APP_API_URL_SUBMIT;

    axios[method](url, formData)
      .then(() => {
        setShowForm(false); // Hide form after save
        fetchReservations(); // Refetch data after save
        console.log("Data saved successfully");
        // You may want to refresh or update data in your table here
      })
      .catch((error) => console.error("Failed to save data:", error));
  };

  const handleDelete = (reservationId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_DELETE}?id=${reservationId}`)
      .then(() => {
        console.log("Deleted successfully");
        // Refresh data or adjust state here, for example:
        fetchReservations();
      })
      .catch((error) => console.error("Failed to delete:", error));
  };

  const handleCancel = () => {
    setShowForm(false); // Hide the form when cancel is clicked
  };

  return (
    <div className="admin">
      <button
        className="add"
        style={{
          position: "fixed",
          bottom: 20,
          left: 100,
        }}
        onClick={handleAddNew}
      >
        Vytvořit novou rezervaci
      </button>
      <ReservationsTable
        data={reservations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <ReservationForm
          reservation={editingReservation}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
