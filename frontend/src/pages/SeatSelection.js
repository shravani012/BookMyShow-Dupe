import React, { useState } from "react";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["A3", "A6", "B4", "C2", "C8"]);
  const ticketPrice = 150;

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

  const handlePayment = async () => {
    if (selectedSeats.length === 0) return;
    
    const totalAmount = selectedSeats.length * ticketPrice;

    try {
      // Call backend API to create an order
      const response = await fetch("http://localhost:5000/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        alert("Failed to initiate payment. Please try again.");
        return;
      }

      // Initialize Razorpay Payment
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
        amount: totalAmount * 100, // Convert to paise
        currency: "INR",
        name: "Movie Ticket Booking",
        description: `Seats: ${selectedSeats.join(", ")}`,
        order_id: orderData.id,
        handler: function (response) {
          alert(
            `Payment successful!\nPayment ID: ${response.razorpay_payment_id}\nSelected Seats: ${selectedSeats.join(", ")}`
          );

          // Update booked seats on successful payment
          setBookedSeats((prevBookedSeats) => [...prevBookedSeats, ...selectedSeats]);
          setSelectedSeats([]);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
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
