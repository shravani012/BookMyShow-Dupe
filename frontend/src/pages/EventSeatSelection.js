import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EventSeatSelection.css";

const SEAT_LAYOUT = {
  VIP: { price: 1000, rows: 2, seatsPerRow: 6 },
  Premium: { price: 600, rows: 3, seatsPerRow: 8 },
  General: { price: 300, rows: 4, seatsPerRow: 10 },
};

const EventSeatSelection = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["VIP-0-2", "General-2-5"]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSeatClick = (section, row, index) => {
    if (bookingSuccess) return;
    const seatId = `${section}-${row}-${index}`;
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const section = seatId.split("-")[0];
      return total + SEAT_LAYOUT[section].price;
    }, 0);
  };

  const handlePayment = () => {
    // Mock payment behavior
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setBookingSuccess(true);
  };

  return (
    <div className="event-seat-container">
      <h2 className="text-center mb-4">Event Seat Selection</h2>
      <div className="podium">🎤 Podium</div>

      {Object.keys(SEAT_LAYOUT).map((section) => (
        <div key={section} className={`seat-section ${section.toLowerCase()}`}>
          <h4>{section} - ₹{SEAT_LAYOUT[section].price}</h4>
          {[...Array(SEAT_LAYOUT[section].rows)].map((_, rowIdx) => (
            <div key={rowIdx} className="seat-row">
              {[...Array(SEAT_LAYOUT[section].seatsPerRow)].map((_, seatIdx) => {
                const seatId = `${section}-${rowIdx}-${seatIdx}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                const isYours = bookingSuccess && bookedSeats.includes(seatId) && !["VIP-0-2", "General-2-5"].includes(seatId);

                return (
                  <div
                    key={seatIdx}
                    className={`seat 
                      ${isBooked ? "booked" : ""} 
                      ${isSelected ? "selected" : ""} 
                      ${isYours ? "yours" : ""}
                    `}
                    onClick={() => handleSeatClick(section, rowIdx, seatIdx)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ))}

      <div className="legend mt-4">
        <div><span className="seat available"></span> Available</div>
        <div><span className="seat selected"></span> Selected</div>
        <div><span className="seat yours"></span> Your Booked Seats</div>
        <div><span className="seat booked"></span> Booked</div>
      </div>

      {!bookingSuccess && (
        <div className="summary mt-4">
          <p>Total Seats Selected: {selectedSeats.length}</p>
          <p>Total Price: ₹{calculateTotal()}</p>
          {selectedSeats.length > 0 && (
            <button className="button mt-3 px-4 py-2" onClick={handlePayment}>
              Pay ₹{calculateTotal()} Now
            </button>
          )}
        </div>
      )}

      {bookingSuccess && (
        <div className="summary mt-4 text-center">
          <h4 className="text-success">✅ Booking Successful!</h4>
          <p className="text-primary">Your selected seats are now booked and marked in blue.</p>
          <p>Details will be sent to your email.</p>
        </div>
      )}
    </div>
  );
};

export default EventSeatSelection;
