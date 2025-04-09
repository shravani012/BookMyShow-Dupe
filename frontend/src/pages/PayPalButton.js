import React, { useEffect, useRef } from "react";

const PayPalButton = ({ totalAmount }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const loadPayPalScript = () => {
      if (!document.getElementById("paypal-sdk")) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=INR`;
        script.id = "paypal-sdk";
        script.async = true;
        script.onload = () => {
          console.log("✅ PayPal SDK loaded");
        };
        document.body.appendChild(script);
      }
    };

    loadPayPalScript();
  }, []);

  const handlePayNow = () => {
    if (!window.paypal) {
      alert("PayPal not loaded yet. Please try again.");
      return;
    }

    window.paypal
      .Buttons({
        createOrder: async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount }),
          });
          const data = await res.json();
          return data.orderId;
        },
        onApprove: async (data) => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          const result = await res.json();
          alert("✅ Payment successful!");
        },
        onError: (err) => {
          console.error("❌ PayPal Button Error:", err);
          alert("Payment failed. Please try again.");
        },
      })
      .render(paypalRef.current);
  };

  return (
    <div>
      <div ref={paypalRef}></div>
      <button
        onClick={handlePayNow}
        style={{
          backgroundColor: "#00796B",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "25px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Pay ₹{totalAmount} Now
      </button>
    </div>
  );
};

export default PayPalButton;
