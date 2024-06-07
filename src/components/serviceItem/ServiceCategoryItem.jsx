import React, { useEffect, useState } from "react";
import "./serviceCategoryItem.css";
import { services } from "../../barberData";

export const ServiceCategoryItem = ({ serviceCategory }) => {
  const [aosAnimation, setAosAnimation] = useState("");

  useEffect(() => {
    const updateAosAnimation = () => {
      if (window.innerWidth <= 768) {
        setAosAnimation("fade-up");
      } else {
        setAosAnimation(
          serviceCategory.id % 2 === 0 ? "fade-right" : "fade-left"
        );
      }
    };

    updateAosAnimation();
    window.addEventListener("resize", updateAosAnimation);

    return () => window.removeEventListener("resize", updateAosAnimation);
  }, [serviceCategory.id]);

  let servicesFiltered = services.filter(
    (service) => service.categoryId == serviceCategory.id
  );

  return (
    <div className="block" data-aos={aosAnimation} data-aos-duration="1800">
      <div className="serviceWrapper">
        <div className={serviceCategory.id % 2 === 1 ? "img" : "img"}>
          <img
            className="icon"
            src={require(`../../media/vector/${serviceCategory.icon}.png`)}
            alt=""
          />
        </div>
        <div className="desc">
          <h5>{serviceCategory.header}</h5>
          <ul>
            {servicesFiltered.map((service, index) => (
              <React.Fragment key={service.id}>
                <li>
                  <span className="serviceName">{service.nazev}</span>
                  <span className="servicePrice">{service.cena}</span>
                </li>
                {/* Render a break after every third item only if category ID is 3 */}
                {(index + 1) % 3 === 0 && serviceCategory.id === 3 && <br />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      {serviceCategory.id !== 5 && (
        <hr
          className={
            serviceCategory.id % 2 === 1 ? "thinHR rightContent" : "thinHR"
          }
        />
      )}
    </div>
  );
};
