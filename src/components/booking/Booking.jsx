import React, { useEffect } from "react";
import { services, servicesCategories } from "../../barberData";
import { CategoryBlock } from "./../categoryBlock/CategoryBlock";
import { useState } from "react";
import "./booking.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
export const Booking = ({
  setSelectedService,
  selectedService,
  setAdditionalServicesTimeTotal,
  selectedAdditionalServices,
  setSelectedAdditionalServices,
  setServicesTotalPrice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    icon: "vlasyStrih",
    header: "Vlasy",
  });

  const servicesOfSelectedCategory = services.filter(
    (service) => service.categoryId === selectedCategory.id
  );

  const additionalServices = services.filter(
    (service) => service.categoryId === 5
  );

  const [checkedState, setCheckedState] = useState(
    new Array(additionalServices.length).fill(false)
  );

  const handleCheckboxOnChange = (position, additional) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + additionalServices[index].cena;
        }
        return sum;
      },
      0
    );

    const totalTime = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + additionalServices[index].delkaTrvani;
      }
      return sum;
    }, 0);

    /* 
     Níže zkontrolujeme zda ve state vyfiltrujeme pole o objektech jejich id je shodné s id služby vybrané přes checkbox - pokud není - length=0
     Pokud je shodné tak odfiltrujeme tuto službu ze state - protože uživatel klikl 2x na checkbox a tím to odchecknul = musíme odebrat ze state.
     */

    selectedAdditionalServices.filter((s) => s.id === additional.id).length ===
    0
      ? setSelectedAdditionalServices([
          ...selectedAdditionalServices,
          additional,
        ])
      : setSelectedAdditionalServices(
          selectedAdditionalServices.filter(
            (service) => service.id !== additional.id
          )
        );

    setServicesTotalPrice(totalPrice);
    setAdditionalServicesTimeTotal(totalTime);
    console.log("total time: ", totalTime);
  };

  useEffect(() => {
    setSelectedService("");
    setServicesTotalPrice("");
    setSelectedAdditionalServices([]);
    setCheckedState(new Array(additionalServices.length).fill(false));
  }, [selectedCategory]);

  return (
    <div className="bookingWrapper ">
      <h2 className="reservationTitle"> Zvolte službu </h2>

      <div className="mainSelect">
        <div className="categorySelectWrapper">
          {servicesCategories.map(
            (category) =>
              !category.isAdditional && (
                <CategoryBlock
                  onClick={() => setSelectedCategory(category)}
                  serviceCategory={category}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategoryID={selectedCategory.id}
                />
              )
          )}
        </div>

        <div className="wrapperOfServices">
          <div className="serviceSelectWrapper">
            <div className="serviceSelectHeader">
              <div className="categoryHeader">
                <img
                  className="icon"
                  src={require(`../../media/vector/${selectedCategory.icon}.png`)}
                  alt=""
                />
                <h1 className="categoryHeaderTitle">
                  {selectedCategory.header}{" "}
                  {/* <hr className="headerUnderline" /> */}
                </h1>
              </div>
            </div>

            <div className="serviceSelectBody">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {servicesOfSelectedCategory.map((service) => (
                    <FormControlLabel
                      value={service.id}
                      control={<Radio />}
                      label={`${service.nazev} - ${service.cena},–`}
                      onClick={() => setSelectedService(service)}
                      className={`formControlLabel ${
                        selectedService.id == service.id ? "selected" : ""
                      }`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="additionalSelect">
            <h3>Zvolte extra služby (volitelné):</h3>
            <div className="checkBoxGrid">
              {additionalServices.map((additional, index) => (
                <>
                  {(selectedCategory.header === "Extravagant"
                    ? index === 2 || index === 3
                    : true) && (
                    <label className="additionalService">
                      <input
                        disabled={
                          ((additional.id == 143 || additional.id == 43) &&
                            !selectedService) ||
                          (additional.id == 91 && selectedService)
                        }
                        type="checkbox"
                        onChange={() =>
                          handleCheckboxOnChange(index, additional)
                        }
                        checked={checkedState[index]}
                      />
                      <span>{`${additional.nazev} - ${additional.cena},–`}</span>
                    </label>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
