import React, { useEffect } from "react";

const PayPalButton = ({ totalAmount }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=INR";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch("https://your-backend-service.onrender.com/api/payment/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 150, currency: "INR" }),
      });
  
      const data = await response.json();
      if (data.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Failed: " + data.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment request failed.");
    }
  };  

  return (
    <button className="proceed-btn" onClick={handlePayment}>
      Pay ₹{totalAmount} with PayPal
    </button>
  );
};

export default PayPalButton;
