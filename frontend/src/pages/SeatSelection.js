import React, { useState } from "react";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = 150;

  const bookedSeats = ["A3", "A6", "B4", "C2", "C8"];

  const seatsLayout = [
    ["A1", "A2", " ", "A3", "A4", "A5", "A6", "A7", " ", "A8", "A9", "A10"],
    ["B1", "B2", " ", "B3", "B4", "B5", "B6", "B7", " ", "B8", "B9", "B10"],
    ["C1", "C2", " ", "C3", "C4", "C5", "C6", "C7", " ", "C8", "C9", "C10"],
  ];

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) return;

    alert(
      `Payment completed.\nSelected seats: ${selectedSeats.join(", ")}\nTickets will be sent to your registered Gmail.`
    );

    // Simulate booking by adding selected seats to bookedSeats
    bookedSeats.push(...selectedSeats);
    setSelectedSeats([]); // Clear selected seats
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="screen">📽️ SCREEN</div>

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
          Selected Seats: {selectedSeats.length}{" "}
          {selectedSeats.length > 0 ? `(${selectedSeats.join(", ")})` : ""}
        </p>
        <p>Total Price: ₹{selectedSeats.length * ticketPrice}</p>
      </div>

      <button
        className="proceed-btn"
        onClick={handlePayment}
        disabled={selectedSeats.length === 0}
      >
        Proceed to Payment (₹{selectedSeats.length * ticketPrice})
      </button>
    </div>
  );
};

export default SeatSelection;

