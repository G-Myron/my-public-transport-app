import PropTypes from "prop-types";

import "./Payment.css"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";
import { ContactForm } from "./ContactForm";
import textObject from "../../../assets/language/payment.json";
import creditCard from "../../../assets/images/paymentOptions/creditCard.png"
import payPal from "../../../assets/images/paymentOptions/payPal.png"
import coupons from "../../../assets/images/paymentOptions/coupon.jpg"
import { useEffect } from "react";

let payOptions;

const handlePaymentOption = (elmt)=> {
    payOptions.forEach(opt=> {
        if (opt.classList.contains("active")) opt.classList.remove("active");
    });
    payOptions[elmt].classList.add("active");
}

export const Payment = ({language}) =>{
    const navigate = useNavigate();

    useEffect(()=> {
        payOptions = document.querySelectorAll(".payment-option");
    }, []);

    return <main>
        <div className="payment">
            {/* Navigation buttons */}
            <div className="container-fluid sticky-container">
                <div className="row">
                    <div className="col-12 col-sm-6 d-flex justify-content-start">
                        <button className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                            onClick={() => {
                                navigate("/passengers", {state: {noOfSeats: 0}});
                            }}>
                            <FaArrowLeft className="me-2"/>
                            <span>
                                {textObject.passengers[language]}
                            </span>
                        <MdAirlineSeatReclineExtra className="me-2"/>
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 d-flex justify-content-end">
                        <button
                            id="reservation-btn"
                            className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                            onClick={() => {
                                navigate("/payment");
                            }}
                        >
                            <MdPayment className="mb-1 me-2"/>
                            <span>
                                {textObject.continue[language]}
                            </span>
                            <FaArrowRight className="ms-2"/>
                        </button>
                    </div>
                </div>
            </div>
            {/* End navigation buttons */}

            <div className="container d-flex align-items-center justify-content-center mt-3">
                <h3 id="page-header">{textObject.paymentOptions[language]}</h3>
            </div>

            <div className="d-flex flex-wrap">
                <div className="payment-option" onClick={e=> handlePaymentOption(0)}>
                    <img src={creditCard} alt="Card"/>
                </div>
                <div className="payment-option" onClick={e=> handlePaymentOption(1)}>
                    <img src={payPal} alt="PayPal"/>
                </div>
                <div className="payment-option" onClick={e=> handlePaymentOption(2)}>
                    <img src={coupons} alt="coupons"/>
                </div>
            </div>

            <div className="container d-flex align-items-center justify-content-center mt-3">
                <h3 id="page-header">{textObject.details[language]}</h3>
            </div>

            <ContactForm language={language} textObject={textObject}/>

        </div>
    </main>
};

Payment.propTypes = {
    language: PropTypes.string.isRequired,
    passengers: PropTypes.object.isRequired
};
