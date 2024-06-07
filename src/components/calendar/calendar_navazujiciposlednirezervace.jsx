import React from "react";
import "./calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { csCZ } from "@mui/x-date-pickers";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect } from "react";
import "dayjs/locale/cs"; // Import Czech locale
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";

dayjs.extend(localizedFormat);
dayjs.locale("cs"); // Use Czech locale globally

export const Calendar = ({
  setSelectedDateRecord,
  setSelectedTimeRecord,
  serviceTimeTotal,
  servicesTotalPrice,
  setStep,
  bookedDates,
  selectedService,
  selectedAdditionalServices,
  additionalServicesTimeTotal,
}) => {
  const openingHours = "11:00";
  const closingHours = "20:00";

  //- Upravit otevírací dobu dle info níže
  //Pauza: 12:00 - 13:00
  //Odpo pauza: 17:00 - 17:30
  //Sobota: 11:00 - 15:00
  const [vacationDates, setVacationDates] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/dovolenes`);
        console.log(response.data);
        const fetchedVacations = response.data.data.map((item) => ({
          date: item.datum_dovolene,
        }));
        setVacationDates(fetchedVacations);
      } catch (err) {
        console.error("Fetching VACATIONS failed: ", err);
      }
    };
    fetchData();
  }, []);

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };
  // const getTimeBlocks = (date, serviceTimeTotal) => {
  //   if (serviceTimeTotal === 25) serviceTimeTotal = 30;
  //   const formattedSelectedDate = date.format("DD.MM.YYYY");
  //   let opening = convertTimeToMinutes(openingHours);
  //   let closing = convertTimeToMinutes(closingHours);

  //   const dayOfWeek = date.day(); // day() method returns the day of the week where Sunday is 0 and Saturday is 6
  //   const lunchStart = convertTimeToMinutes("12:00");
  //   const lunchEnd = convertTimeToMinutes("13:00");
  //   const dinnerStart = convertTimeToMinutes("17:00");
  //   const dinnerEnd = convertTimeToMinutes("17:30");
  //   const saturdayOpen = convertTimeToMinutes("11:00");
  //   const saturdayClose = convertTimeToMinutes("15:15");

  //   if (serviceTimeTotal > 60 && dayOfWeek !== 6) {
  //     opening = convertTimeToMinutes("13:00");
  //   }

  //   const blocks = [];

  //   for (
  //     let time = opening;
  //     time <= closing - serviceTimeTotal; // Adjust condition to account for service time
  //     time += serviceTimeTotal // Increment by serviceTimeTotal or another strategy if different blocks have different lengths
  //   ) {
  //     const endTime = time + serviceTimeTotal;
  //     if (endTime > closing) break; // This check might be redundant with the adjusted loop condition but is kept for clarity

  //     let formattedStartTime = convertMinutesToTime(time);
  //     const formattedEndTime = convertMinutesToTime(endTime);

  //     // if (time - serviceTimeTotal >= dinnerStart && time - serviceTimeTotal <= dinnerEnd) {
  //     //   time = dinnerEnd;
  //     //   console.log("jsme tu");
  //     // }

  //     // Exclude lunch time on Tuesdays, Wednesdays, Thursdays, and Fridays
  //     if (
  //       dayOfWeek === 2 ||
  //       dayOfWeek === 3 ||
  //       dayOfWeek === 4 ||
  //       dayOfWeek === 5
  //     ) {
  //       if (
  //         (time >= lunchStart && time < lunchEnd) ||
  //         (endTime > lunchStart && endTime <= lunchEnd)
  //       ) {
  //         continue; // Skip adding this time block
  //       }
  //       // Exclude dinner time
  //       if (
  //         (time >= dinnerStart && time < dinnerEnd) ||
  //         (endTime > dinnerStart && endTime <= dinnerEnd) ||
  //         (time < dinnerEnd && endTime > dinnerStart)
  //       ) {
  //         time = dinnerEnd - serviceTimeTotal;
  //         continue; // Skip adding this time block
  //       }
  //     }

  //     //úprava otevírací doby v sobotu
  //     if (dayOfWeek === 6) {
  //       if (time < saturdayOpen || endTime > saturdayClose) continue;
  //     }

  //     const isBooked = bookedDates.some((booking) => {
  //       if (booking.date !== formattedSelectedDate) return false;

  //       const bookingStart = convertTimeToMinutes(booking.startTime);
  //       const bookingEnd = convertTimeToMinutes(booking.finishTime);

  //       return time < bookingEnd && endTime > bookingStart;
  //     });

  //     if (!isBooked) {
  //       blocks.push(`${formattedStartTime}`);
  //     }
  //   }
  //   return blocks;
  // };

  const getTimeBlocks = (date, serviceTimeTotal) => {
    const formattedSelectedDate = date.format("DD.MM.YYYY");
    const dayOfWeek = date.day();

    const openingTime = convertTimeToMinutes(
      dayOfWeek === 6 ? "11:00" : openingHours
    );
    const closingTime = convertTimeToMinutes(
      dayOfWeek === 6 ? "15:15" : closingHours
    );
    const lunchStart = convertTimeToMinutes("12:00");
    const lunchEnd = convertTimeToMinutes("13:00");
    const dinnerStart = convertTimeToMinutes("17:00");
    const dinnerEnd = convertTimeToMinutes("17:30");

    let currentStart = openingTime;

    const blocks = [];
    // Sort booked dates by start time
    const sortedBookings = bookedDates
      .filter((b) => b.date === formattedSelectedDate)
      .sort(
        (a, b) =>
          convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime)
      );

    sortedBookings.forEach((booking, index) => {
      const bookingStart = convertTimeToMinutes(booking.startTime);
      const bookingEnd = convertTimeToMinutes(booking.finishTime);

      // Fill free slots before the current booking
      while (currentStart + serviceTimeTotal <= bookingStart) {
        if (
          !conflictsWithBreaks(
            currentStart,
            serviceTimeTotal,
            lunchStart,
            lunchEnd,
            dinnerStart,
            dinnerEnd
          )
        ) {
          blocks.push(convertMinutesToTime(currentStart));
        }
        currentStart += serviceTimeTotal;
      }

      // Set current start to the end of the booking, avoiding overlap with lunch break
      currentStart = Math.max(currentStart, bookingEnd);
    });

    // Account for breaks explicitly to correct starting time after breaks
    if (
      currentStart < lunchEnd &&
      currentStart + serviceTimeTotal > lunchStart
    ) {
      currentStart = lunchEnd;
    }
    if (
      currentStart < dinnerEnd &&
      currentStart + serviceTimeTotal > dinnerStart
    ) {
      currentStart = dinnerEnd;
    }

    // Fill remaining time after the last booking
    while (currentStart + serviceTimeTotal <= closingTime) {
      if (
        !conflictsWithBreaks(
          currentStart,
          serviceTimeTotal,
          lunchStart,
          lunchEnd,
          dinnerStart,
          dinnerEnd
        )
      ) {
        blocks.push(convertMinutesToTime(currentStart));
      }
      currentStart += serviceTimeTotal;
    }

    return blocks;
  };

  const conflictsWithBreaks = (
    startTime,
    serviceTime,
    lunchStart,
    lunchEnd,
    dinnerStart,
    dinnerEnd
  ) => {
    const endTime = startTime + serviceTime;
    return (
      (startTime < lunchEnd && endTime > lunchStart) ||
      (startTime < dinnerEnd && endTime > dinnerStart)
    );
  };

  // Function to check if there are available time blocks for a service time total
  const hasAvailableTimeBlocks = (date, serviceTimeTotal) => {
    const formattedDate = date.format("DD.MM.YYYY");
    const opening = convertTimeToMinutes(openingHours);
    const closing = convertTimeToMinutes(closingHours);
    let available = false;

    bookedDates.forEach((booking) => {
      if (booking.date === formattedDate) {
        const bookingStart = convertTimeToMinutes(booking.startTime);
        const bookingEnd = convertTimeToMinutes(booking.finishTime);
        if (
          bookingStart - opening >= serviceTimeTotal ||
          closing - bookingEnd >= serviceTimeTotal
        ) {
          available = true;
        }
      }
    });

    // If there are no bookings for the date, the entire day is available
    if (!bookedDates.some((booking) => booking.date === formattedDate)) {
      available = true;
    }
    return available;
  };
  // Function to find the next available date based on service time total
  const findNextAvailableDate = (startDate, serviceTimeTotal) => {
    let date = dayjs(startDate);
    // Loop until an available date is found that is not on a Sunday or Monday
    while (
      !hasAvailableTimeBlocks(date, serviceTimeTotal) ||
      date.day() === 0 ||
      date.day() === 1
    ) {
      date = date.add(1, "day");
    }
    return date;
  };

  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    findNextAvailableDate(dayjs(date), serviceTimeTotal)
  );
  const [availableTimeBlocks, setAvailableTimeBlocks] = useState([]);
  const minDate = findNextAvailableDate(dayjs(date), serviceTimeTotal);
  const disabledDates = [];

  useEffect(() => {
    setSelectedDateRecord(selectedDate);
  }, []);
  useEffect(() => {
    // Check if the date is disabled, directly passing the date to be checked
    if (shouldDisableDate(date)) {
      // If the date is disabled, move to the next day
      setDate(date.add(1, "day"));
    }
  }, [date]);
  useEffect(() => {
    // Ensure selectedDate is always a dayjs object
    if (selectedDate && selectedDate.format) {
      const newAvailableTimeBlocks = getTimeBlocks(
        selectedDate,
        serviceTimeTotal
      );
      setAvailableTimeBlocks(newAvailableTimeBlocks);
    }
  }, [selectedDate, serviceTimeTotal]);

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate)); // This should ensure 'selectedDate' is always a dayjs object
    setSelectedDateRecord(dayjs(newDate));
  };
  const handleTimeBlockClick = (timeBlock) => {
    setSelectedTimeRecord(timeBlock);
    setStep(3);
  };
  const shouldDisableDate = (date) => {
    const dayjsDate = dayjs(date);
    const isSundayOrMonday = dayjsDate.day() === 0 || dayjsDate.day() === 1;
    const isDisabledDate = disabledDates.some((disabledDate) =>
      dayjsDate.isSame(dayjs(disabledDate, "DD.MM.YYYY"), "day")
    );
    const noAvailableBlocks = !hasAvailableTimeBlocks(
      dayjsDate,
      serviceTimeTotal
    );

    return isSundayOrMonday || isDisabledDate || noAvailableBlocks;
  };

  return (
    <div className="reservationBlock">
      <h2 className="reservationTitle"> Zvolte datum a čas služby</h2>

      <div className="calendarWrapper">
        <div className="datePicker">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="cs"
            localeText={
              csCZ.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DateCalendar
              label="Date"
              inputFormat="DD.MM.YYYY"
              fixedWeekNumber={6}
              shouldDisableDate={shouldDisableDate}
              views={["day", "month"]}
              date={date}
              minDate={minDate}
              disableHighlightToday
              value={selectedDate}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </div>
        <div className="timeBlocksWrapper">
          <div className="timeBlocks">
            {availableTimeBlocks.length > 0 ? (
              availableTimeBlocks.map((block, index) => (
                <div
                  key={index}
                  className="timeBlock"
                  onClick={() => handleTimeBlockClick(block)}
                >
                  {block}
                </div>
              ))
            ) : (
              <p>Není k dispozici žádný termín v tento den.</p>
            )}
          </div>
        </div>
      </div>
      {selectedService.nazev && (
        <div className="calendar-overview">
          <ContentCutIcon className="overViewIconCal" />{" "}
          <span>
            Vybraná služba:<b> {selectedService.nazev}</b>
            {/* {selectedAdditionalServices.length >= 1 && (
            <>
              <AddShoppingCartIcon className="overViewIconCal" />
              Extra služby:{" "}
              <b>
                {selectedAdditionalServices.map((s, index) => (
                  <React.Fragment key={s.nazev}>
                    {" "}
                    <i>{s.nazev}</i>
                    {index < selectedAdditionalServices.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </b>
            </>
          )} */}
            <CalendarMonthIcon className="overViewIconCal" />
            Datum: <b>{selectedDate.format("DD.MM.YYYY")}</b>
            <HourglassEmpty className="overViewIconCal" />
            Délka návštěvy <b>{serviceTimeTotal}min</b>
            <AttachMoneyIcon className="overViewIconCal" />
            Cena: <b>{selectedService.cena + servicesTotalPrice} Kč</b>
          </span>
        </div>
      )}
    </div>
  );
};
