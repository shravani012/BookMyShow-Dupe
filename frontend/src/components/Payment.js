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
      console.log("payment Success:", data);
      alert("payment Successful!");
    } catch (error) {
      console.error("payment Error:", error);
      alert("payment Failed!");
    }
  };

  return (
    <div>
      <h2>Make a payment</h2>
      <button onClick={handlepayment}>Pay Now</button>
    </div>
  );
};

export default payment;