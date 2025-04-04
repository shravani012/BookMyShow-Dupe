import React, { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const ticketPrice = 150;

  useEffect(() => {
    // Generate seat IDs
    const allSeats = "ABCDE".split("").flatMap((row) =>
      Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`)
    );

    // Randomly book 10 seats
    const randomBookedSeats = [...allSeats]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setBookedSeats(randomBookedSeats);
  }, []);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const seatsLayout = "ABCDE".split("").map((row) =>
    Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`)
  );

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="screen">📽 SCREEN</div>

      <div className="seats-grid">
        {seatsLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, index) => (
              <React.Fragment key={seat}>
                {index === 6 && <div className="aisle"></div>} {/* Add aisle after 6 seats */}
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

      {/* PayPal Button */}
{selectedSeats.length > 0 && (
  <PayPalButton totalAmount={selectedSeats.length * ticketPrice} />
)}
    </div>
  );
};

export default SeatSelection;
