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
  const [bookedSeats] = useState(["VIP-0-2", "General-2-5"]); // Example booked seats

  const handleSeatClick = (section, row, index) => {
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

  return (
    <div className="event-seat-container">
      <h2 className="text-center mb-4">Event Seat Selection</h2>
      <div className="podium">Podium</div>

      {Object.keys(SEAT_LAYOUT).map((section) => (
        <div key={section} className={`seat-section ${section.toLowerCase()}`}>
          <h4>{section} - ₹{SEAT_LAYOUT[section].price}</h4>
          {[...Array(SEAT_LAYOUT[section].rows)].map((_, rowIdx) => (
            <div key={rowIdx} className="seat-row">
              {[...Array(SEAT_LAYOUT[section].seatsPerRow)].map((_, seatIdx) => {
                const seatId = `${section}-${rowIdx}-${seatIdx}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                return (
                  <div
                    key={seatIdx}
                    className={`seat ${isSelected ? "selected" : ""} ${
                      isBooked ? "booked" : ""
                    }`}
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
        <div><span className="seat booked"></span> Booked</div>
      </div>

      <div className="summary mt-4">
        <p>Total Seats Selected: {selectedSeats.length}</p>
        <p>Total Price: ₹{calculateTotal()}</p>
        <button className="btn btn-success">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default EventSeatSelection;
