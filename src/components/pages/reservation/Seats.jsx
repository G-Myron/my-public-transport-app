import PropTypes from "prop-types";

import { BusSeats } from "./BusSeats";

import { showElement } from "../../../utils/commonFunctionsDOM";
import "./Seats.css";

const toggleWagonSeats = (wagonId) => {
    document.querySelectorAll(".wagon-seat-selector-wrapper").forEach((wagonSeatSelector) => {
        wagonSeatSelector.classList.add("hide");
    })

    showElement(`wagon-seat-selector-${wagonId}`);
}

export const Seats = ({
        language, activeTrip, setActiveTrip
}) => {

    if (!activeTrip?.seats) {
        return (<span>Παρακαλώ επιλέξτε μία διαδρομή για να εμφανιστούν οι διαθέσιμες θέσεις</span>)
    }

    return (
        Object.keys(activeTrip?.seats)?.length > 0

        ?
        <div className="row mt-2">

                <div className="col-12 px-0 d-flex justify-content-evenly flex-wrap">

                    {/* Wagon selector container */}
                    <div className="wagons-container me-1 d-flex flex-column flex-wrap">
                        {activeTrip?.seats &&
                            Object.keys(activeTrip.seats).map((wagonId) => (
                                <div
                                    key={wagonId}
                                    data-wagon-seat-selector-id={`wagon-seat-selector-${wagonId}`}
                                    className="d-flex flex-column m-1 p-1"
                                    onClick={() =>
                                        toggleWagonSeats(`${activeTrip.tripId}-${wagonId}`)
                                    }
                                >
                                    <span className="text-center my-1">
                                        {wagonId.startsWith("B") ? "Λεωφ.": "Βαγόνι"}
                                    </span>
                                    <span className="text-center my-1">
                                        ({wagonId})
                                    </span>
                                    <span className="text-center my-1">
                                        Κλάση: {activeTrip.seats[wagonId].class}
                                    </span>
                                </div>
                        ))}
                    </div>
                    {/* End wagon selector container */}

                    {/* Seat selector container */}
                    <div className="wagon-seats-container my-1">
                        {activeTrip?.seats &&
                            Object.keys(activeTrip.seats).map((wagonId) => {

                                const seats = activeTrip.seats[wagonId].seats;

                                const key = `${activeTrip.tripId}-${wagonId}`
                                const id = `wagon-seat-selector-${activeTrip.tripId}-${wagonId}`
                                const className = `wagon-seat-selector-wrapper
                                    ${wagonId === Object.keys(activeTrip.seats)[0] ? "" : "hide"}`

                                return (
                                    <div
                                        key={key}
                                        id={id}
                                        className={className}
                                    >
                                        {wagonId.startsWith("B")
                                            ? <BusSeats
                                                tripId={activeTrip.tripId}
                                                wagonId={wagonId}
                                                seats={seats}
                                                />
                                            : <span>Traino {activeTrip.tripId} - {wagonId}</span>
                                        }
                                    </div>
                                )
                            })}
                    </div>
                    {/* End seat selector container */}

                </div>
        </div>

        :
        <span>Αυτό το όχημα δεν υποστηρίζει κράτηση θέσεων</span>
    )
}

Seats.propTypes = {
    language: PropTypes.string.isRequired,
    activeTrip: PropTypes.object.isRequired,
    setActiveTrip: PropTypes.func.isRequired
}
