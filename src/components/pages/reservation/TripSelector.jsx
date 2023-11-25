import PropTypes from "prop-types";

import { FaArrowRight } from "react-icons/fa";

import {
    showElement, markSelectedTrip,
    hideElement,
    rotateElement
}
from "../../../utils/commonFunctionsDOM";

export const TripSelector = ({
    id, language, setActiveTrip,
    tripsContainerRef, seatsRef,
    loading, error, subTrips,
}) => {

    const clickHandler = (subTrip) => {
        // Mark selected trip green and remove color from the rest
        markSelectedTrip(`trip-selector-wrapper-${subTrip.tripId}`,
                        "trip-selector-wrapper");

        // Close trip selector if screen is small
        if (window.innerWidth < 768) {
            hideElement("onward-trip-selector-wrapper", true);
            hideElement("return-trip-selector-wrapper", true);

            window.scrollTo({
                top: tripsContainerRef.current.offsetTop - tripsContainerRef.current.offsetHeight - 70,
                behavior: "smooth"
            });

            rotateElement("chevron-1");

        }


        // Show seats selector
        if (seatsRef?.current?.id) {
            // Rotate chevron-2 if seat selector was hidden
            // (now shows that seats selector is visible)
            if (seatsRef.current.className.includes("hide")) {
                rotateElement("chevron-2");
            }

            showElement(seatsRef.current.id)
        }

        setActiveTrip(subTrip);
    }


    return (!loading && !error && subTrips &&
        <div
            className="row d-flex justify-content-start mt-2"
            id={id}
        >
            <div className="col-12 my-2">Ταξίδι Μετάβασης</div>

            {subTrips.map((subTrip) => (
                <div
                    key={subTrip.trainId}
                    className="col-6 col-sm-4 col-md-3 trip-selector-wrapper my-1 mx-2 p-1"
                    style={{minWidth: "max-content"}}
                    id={`trip-selector-wrapper-${subTrip.tripId}`}
                    onClick={() => clickHandler(subTrip)}
                >
                    <div className="d-flex flex-column">
                        <div className="text-center">
                            {subTrip.startStation[language]}&nbsp;
                            ({subTrip.startTime})
                            <FaArrowRight className="ms-1"/>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="text-center">
                            {subTrip.arrivalStation[language]}&nbsp;
                            ({subTrip.arrivalTime})
                        </div>
                    </div>

                </div>
            ))}

        </div>
    )
}

TripSelector.propTypes = {
    // Should be one of: "onward-trip-selector-wrapper", "return-trip-selector-wrapper"
    id: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    setActiveTrip: PropTypes.func.isRequired,
    // Reference to Trips Container
    tripsContainerRef: PropTypes.object.isRequired,
    // Reference to Seats Selector div
    seatsRef: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    subTrips: PropTypes.array.isRequired
}
