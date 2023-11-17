import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BrowserView } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import {
    FaChevronDown, FaRegClock,
    FaHashtag, FaSign
}
from "react-icons/fa";

import "./Trip.css";

import textObject from "../../../assets/language/trips.json";
import { useEffect } from "react";

const hideElement = (elementId) => {
    const element = document.getElementById(elementId);
    element.classList.add("hide");
}

const showElement = (elementId) => {
    const element = document.getElementById(elementId);
    element.classList.remove("hide");
}

const removeTooltip = (targetId) => {
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.removeAttribute("data-tooltip-content");
};


const setInfoTooltip = (targetId, language) => {
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.setAttribute("data-tooltip-content",
        textObject.tooltipInfo[language]);

};

const resetTooltip = (targetId, language) => {
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.setAttribute("data-tooltip-content",
        textObject.tooltipSelect[language]);
};

const markSelectedTrip = (tripWrapperId) => {
    const otherTripWrappers = document.querySelectorAll(".trip-wrapper");
    otherTripWrappers.forEach((tripWrapper) => {
        tripWrapper.classList.remove("trip-selected");
        // tripWrapper.classList.remove("alert-success");
        // tripWrapper.classList.remove("alert");
    });

    const tripWrapper = document.getElementById(tripWrapperId);
    tripWrapper.classList.add("trip-selected");
    // tripWrapper.classList.add("alert-success");
    // tripWrapper.classList.add("alert");

};


export const Trip = ({language, trip, stations,
    tripsTransition, tripType,
    selectedTrip, setSelectedTrip,
    selectedReturnTrip, setSelectedReturnTrip,
    isReturningTrip
}) => {
    const navigate = useNavigate();

    const toggleDetails = (targetId, event) => {
        const toggleElement = document.getElementById(targetId);
        toggleElement.classList.toggle("hide");
        event.stopPropagation();
    };

    const handleOneWayTrip = (tripWrapperId) => {
        setSelectedTrip(trip);
        // navigate("/reservation");
    }

    const handleReturningTrip = (tripWrapperId) => {
        console.log("handleReturningTrip")
        console.log(selectedTrip);
        console.log(selectedReturnTrip);
        console.log(trip);

        // hideElement("successful-message");
        // hideElement("warning-message");

        if (isReturningTrip) {
            // Case: user clicked a returning trp
            setSelectedReturnTrip(trip);
            // markSelectedTrip(tripWrapperId);
            if (selectedTrip?.tripId) {
                // Case: user clicked a returning trip
                //       and has already selected an onward trip
                // showElement("successful-message");
                console.log("READY TO PROCEED")
            }
            else {
                // Case: user clicked a returning trip
                //       but has not selected an onward trip
                console.log("NEED TO SET SELECTED_TRIP")
                // showElement("warning-message");
            }
        }
        else {
            // Case: user clicked an onward trip
            setSelectedTrip(trip)
            // markSelectedTrip(tripWrapperId);
            if (selectedReturnTrip?.tripId) {
                // Case: user clicked an onward trip
                //       and has already selected a returning trip
                console.log("READY TO PROCEED")
                // showElement("successful-message");
            }
            else {
                // Case: user clicked an onward trip
                //       but has not selected a returning trip
                console.log("NEED TO SET SELECT_RETURN_TRIP");
                // showElement("warning-message");
            }
        }

    }

    const confirmTrip = (tripWrapperId) => {
        if (tripType === "oneWayTrip") {
            handleOneWayTrip(tripWrapperId);
        }
        else if (tripType === "returningTrip") {
            handleReturningTrip(tripWrapperId);
        }
    };

    useEffect(() => {
        if (selectedTrip?.tripId === trip?.tripId) {
            markSelectedTrip("trip-wrapper-" + trip.tripId);
        }
        if (selectedReturnTrip?.tripId === trip?.tripId) {
            markSelectedTrip("trip-wrapper-" + trip.tripId);
        }

    }, [trip, selectedTrip, selectedReturnTrip]);

    return (
        <>
            {/* <div className="position-fixed top-50 hide" id="successful-message">
                <div className="alert alert-success alert-dismissible" role="alert">
                    <strong>Success!</strong>
                    <button
                        className="btn-close" aria-label="Close"
                        onClick={() => hideElement("successful-message")}>
                    </button>
                </div>
            </div>
            <div className="position-fixed top-50 hide" id="warning-message">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong>
                    <button
                        className="btn-close" aria-label="Close"
                        onClick={() => hideElement("warning-message")}
                        >
                    </button>
                </div>
            </div> */}

            <div
                key={"trip-" + trip.tripId}
                className="row mt-3 trip-wrapper" id={`trip-wrapper-${trip.tripId}`}
                onClick={() => confirmTrip(`trip-wrapper-${trip.tripId}`)}
                data-tooltip-id={`trip-wrapper-${trip.tripId}`}
                data-tooltip-content={textObject.tooltipSelect[language]}
                data-tooltip-float
            >

                <BrowserView className="BrowserView"><Tooltip id={`trip-wrapper-${trip.tripId}`}/></BrowserView>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.startTime || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.arrivalTime || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.interchanges.length || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.duration || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.basicCost || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    <button className="btn btn-link"
                        onClick={(event) => {
                            removeTooltip("trip-wrapper-" + trip.tripId);
                            toggleDetails("trip-info-" + trip.tripId, event);
                        }}
                        onMouseEnter={() => setInfoTooltip("trip-wrapper-" + trip.tripId, language)}
                        onMouseLeave={() => resetTooltip("trip-wrapper-" + trip.tripId, language)}
                    >
                        <FaChevronDown/>
                    </button>
                </div>
                <BrowserView className="BrowserView"></BrowserView>
            </div>

            <div
                className="container mt-2 trip-info-wrapper hide"
                id={`trip-info-${trip.tripId}`}
            >
                <div
                    key={"info-" + trip.tripId}
                    className="row trip-info-header-wrapper">
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaHashtag/></div>
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaRegClock/></div>
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaSign/></div>
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaHashtag/></div>
                </div>
                {trip.interchanges.map((interchange) => {
                    const stationId = interchange.stationId;
                    const stationName = stations?.stations ?
                    stations.stations[stationId][language] : "-";
                    return (
                        <div
                            className="row trip-info-content-wrapper"
                            key={"interchange-" + trip.tripId + interchange}
                        >
                            <div className="col-3 d-flex align-items-center justify-content-center">{interchange.trainId1}</div>
                            <div className="col-3 d-flex align-items-center justify-content-center">{interchange.time}</div>
                            <div className="col-3 d-flex align-items-center justify-content-center">{stationName}</div>
                            <div className="col-3 d-flex align-items-center justify-content-center">{interchange.trainId2}</div>
                        </div>
                    )
                }
                )}
            </div>

        </>
    )
}

Trip.propTypes = {
    // The selected language
    language: PropTypes.string.isRequired,
    trip: PropTypes.object.isRequired,
    // The trip type specified by user (oneWay/returning)
    tripType: PropTypes.string.isRequired,
    // The stations
    stations: PropTypes.object.isRequired,
    // Selected onward Trip
    selectedTrip: PropTypes.object.isRequired,
    setSelectedTrip: PropTypes.func.isRequired,
    // Selected returning Trip
    selectedReturnTrip: PropTypes.object.isRequired,
    setSelectedReturnTrip: PropTypes.func.isRequired,
    // The function that triggers the transition effect between
    tripsTransition: PropTypes.func.isRequired,
    // If true, this Trip is the returning Trip,
    // Else, this Trip is the onward Trip
    isReturningTrip: PropTypes.bool.isRequired
}
