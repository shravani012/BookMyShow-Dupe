import React, { useState } from "react";

const Payment = ({ totalAmount }) => {
  const [orderId, setOrderId] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await response.json();
      setOrderId(data.id); // PayPal order ID
      alert("Redirecting to PayPal...");
      window.location.href = `https://www.paypal.com/checkoutnow?token=${data.id}`;
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed!");
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <p>Total Amount: ${totalAmount}</p>
      <button onClick={handlePayment}>Pay with PayPal</button>
    </div>
  );
};

export default Payment;