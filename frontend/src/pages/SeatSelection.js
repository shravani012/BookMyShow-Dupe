import React, { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const ticketPrice = 150;

  useEffect(() => {
    const allSeats = "ABCDE".split("").flatMap((row) =>
      Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`)
    );
    const randomBookedSeats = [...allSeats]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setBookedSeats(randomBookedSeats);
  }, []);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const seatsLayout = "ABCDE".split("").map((row) =>
    Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`)
  );

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="screen">📽 SCREEN</div>

      {/* Seat Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>Available
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>Selected
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>Booked
        </div>
      </div>

      <div className="seats-grid">
        {seatsLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, index) => (
              <React.Fragment key={seat}>
                {index === 6 && <div className="aisle"></div>}
                <div
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
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <div className="price-details">
        <p>Price per seat: ₹{ticketPrice}</p>
        <p>
          Selected Seats:{" "}
          {selectedSeats.length > 0
            ? `${selectedSeats.length} (${selectedSeats.join(", ")})`
            : "None"}
        </p>
        <p>Total Price: ₹{selectedSeats.length * ticketPrice}</p>
      </div>

      {selectedSeats.length > 0 && (
        <PayPalButton totalAmount={selectedSeats.length * ticketPrice} />
      )}
    </div>
  );
};

export default SeatSelection;
