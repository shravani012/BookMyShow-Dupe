import React, { useEffect } from "react";

const PayPalButton = ({ totalAmount }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=INR";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const response = await fetch("https://your-backend-service.onrender.com/api/payment/paypal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const { approvalUrl } = await response.json();
    window.location.href = approvalUrl;
  };

  return (
    <button className="proceed-btn" onClick={handlePayment}>
      Pay ₹{totalAmount} with PayPal
    </button>
  );
};

export default PayPalButton;
