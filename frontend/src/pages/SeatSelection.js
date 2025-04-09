import React, { useState, useEffect } from "react";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [yourSeats, setYourSeats] = useState([]);
  const [paymentDone, setPaymentDone] = useState(false);
  const [seatOwners, setSeatOwners] = useState({});
  const ticketPrice = 150;

  useEffect(() => {
    const allSeats = "ABCDE".split("").flatMap((row) =>
      Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`)
    );
    const randomBookedSeats = [...allSeats]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setBookedSeats(randomBookedSeats);

    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support Speech Recognition.");
    }
  }, []);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat) || yourSeats.includes(seat) || paymentDone)
      return;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );

    // Remove owner if seat is deselected
    if (selectedSeats.includes(seat)) {
      const updatedOwners = { ...seatOwners };
      delete updatedOwners[seat];
      setSeatOwners(updatedOwners);
    }
  };

  const handleCustomPayment = () => {
    alert("✅ Booking successful!");
    setYourSeats(selectedSeats);
    setSelectedSeats([]);
    setPaymentDone(true);
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Voice command:", command);

      const match = command.match(/book\s+(\d+)\s+seats?\s+in\s+row\s+([a-e])/i);
      if (match) {
        const count = parseInt(match[1]);
        const row = match[2].toUpperCase();

        const rowSeats = Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`);
        const availableInRow = rowSeats.filter(
          (seat) => !bookedSeats.includes(seat) && !yourSeats.includes(seat)
        );
        const toSelect = availableInRow.slice(0, count);

        if (toSelect.length < count) {
          alert(`❌ Only ${toSelect.length} seats available in Row ${row}`);
          return;
        }

        setSelectedSeats((prev) => [...prev, ...toSelect]);
      } else {
        alert("🎙️ Please say something like: 'Book 3 seats in Row B'");
      }
    };

    recognition.onerror = (e) => {
      console.error("Voice recognition error:", e);
      alert("⚠️ Voice recognition failed. Try again.");
    };
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

      {/* ✅ After booking message */}
      {paymentDone && yourSeats.length > 0 && (
        <div className="confirmation-message">
          <h4 className="mt-4">✅ Booking Confirmed!</h4>
          <p>
            Your Seats: <strong>{yourSeats.join(", ")}</strong>
          </p>
          <p>
            Split Among:
            <ul>
              {Object.entries(seatOwners).map(([seat, owner], idx) => (
                <li key={idx}>
                  {seat} - {owner || "You"}
                </li>
              ))}
            </ul>
          </p>
          <p>🎟 Enjoy the show! Details will be sent to your email.</p>
        </div>
      )}

      {/* ⬇ Price details only before payment */}
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

          {/* 👥 Split Booking Input Fields */}
          {selectedSeats.length > 0 && (
            <div className="split-payment mt-4">
              <h5>Assign Friends to Seats</h5>
              {selectedSeats.map((seat, idx) => (
                <div key={idx} className="seat-assign-row">
                  <label className="seat-label">{seat}</label>
                  <input
                    type="text"
                    placeholder="Enter friend's name"
                    value={seatOwners[seat] || ""}
                    onChange={(e) =>
                      setSeatOwners((prev) => ({
                        ...prev,
                        [seat]: e.target.value,
                      }))
                    }
                    className="seat-owner-input"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 🎙 Voice Book Button */}
          <div className="text-center my-3">
            <button className="button px-4 py-2" onClick={handleVoiceCommand}>
              🎙️ Voice Book
            </button>
          </div>

          {/* 💳 Pay Button */}
          {selectedSeats.length > 0 && (
            <div className="payment-section text-center">
              <button
                className="button mt-4 px-4 py-2"
                onClick={handleCustomPayment}
              >
                Pay ₹{selectedSeats.length * ticketPrice} Now
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SeatSelection;
