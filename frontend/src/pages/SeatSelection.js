import React, { useState } from "react";
import PayPalButton from "./PayPalButton"  ; // Import PayPal button component
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["A3", "A6", "B4", "C2", "C8"]);
  const ticketPrice = 150;

  const BACKEND_URL = "https://your-backend-service.onrender.com"; 

  const seatsLayout = [
    ["A1", "A2", " ", "A3", "A4", "A5", "A6", "A7", " ", "A8", "A9", "A10"],
    ["B1", "B2", " ", "B3", "B4", "B5", "B6", "B7", " ", "B8", "B9", "B10"],
    ["C1", "C2", " ", "C3", "C4", "C5", "C6", "C7", " ", "C8", "C9", "C10"],
  ];

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="screen">📽 SCREEN</div>

      <div className="seats-grid">
        {seatsLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, index) =>
              seat === " " ? (
                <div key={index} className="aisle" />
              ) : (
                <div
                  key={seat}
                  className={`seat ${
                    bookedSeats.includes(seat)
                      ? "booked"
                      : selectedSeats.includes(seat)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <div className="price-details">
        <p>Price per seat: ₹{ticketPrice}</p>
        <p>
          Selected Seats: {selectedSeats.length > 0 ? `${selectedSeats.length} (${selectedSeats.join(", ")})` : "None"}
        </p>
        <p>Total Price: ₹{selectedSeats.length * ticketPrice}</p>
      </div>

      {/* PayPal Button */}
      {selectedSeats.length > 0 && (
        <PayPalButton totalAmount={selectedSeats.length * ticketPrice} />
      )}
    </div>
  );
};

export default SeatSelection;
