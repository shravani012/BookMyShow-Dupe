import React from "react";

const payment = () => {
  const handlepayment = async () => {
    try {
      const response = await fetch("/api/payment", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 150 })  // Replace with actual amount
      });

      const data = await response.json();
      console.log("Payment Success:", data);
      alert("Payment Successful!");
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed!");
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <button onClick={handlepayment}>Pay Now</button>
    </div>
  );
};

export default payment;