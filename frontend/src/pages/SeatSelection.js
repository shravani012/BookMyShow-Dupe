import React, { useState, useEffect } from "react";
import PayPalButton from "../components/PayPalButton"; // Adjust path if needed
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [yourSeats, setYourSeats] = useState([]);
  const [paymentDone, setPaymentDone] = useState(false);
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
    if (bookedSeats.includes(seat) || yourSeats.includes(seat) || paymentDone) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBookingSuccess = () => {
    setYourSeats(selectedSeats);
    setSelectedSeats([]);
    setPaymentDone(true);
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
          <div className="legend-color your-seat"></div>Your Seat
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
                    yourSeats.includes(seat)
                      ? "your-seat"
                      : bookedSeats.includes(seat)
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

      {/* ✅ After Booking Message */}
      {paymentDone && yourSeats.length > 0 && (
        <div className="confirmation-message">
          <h4 className="mt-4">✅ Booking Confirmed!</h4>
          <p>
            Your Seats: <strong>{yourSeats.join(", ")}</strong>
          </p>
          <p>🎟️ Enjoy the show! Details will be sent to your email.</p>
        </div>
      )}

      {/* 💳 Price + Payment (Only Before Payment) */}
      {!paymentDone && (
        <>
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
            <div className="payment-section text-center mt-3">
              <PayPalButton
                totalAmount={selectedSeats.length * ticketPrice}
                selectedSeats={selectedSeats}
                onBookingSuccess={handleBookingSuccess}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SeatSelection;
