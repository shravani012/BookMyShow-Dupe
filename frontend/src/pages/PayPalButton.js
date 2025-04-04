import React, { useEffect, useState } from "react";

const PayPalButton = ({ totalAmount }) => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = () => {
      if (document.querySelector("#paypal-sdk")) return;

      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=INR`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    addPayPalScript();
  }, []);


  const handlePayment = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
  
      const data = await response.json();
      if (data.orderId) {
        window.location.href = `https://www.paypal.com/checkoutnow?token=${data.orderId}`;
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
