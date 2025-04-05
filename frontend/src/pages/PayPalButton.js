import React, { useEffect, useRef } from "react";

const PayPalButton = ({ totalAmount }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const addPayPalScript = () => {
      const existingScript = document.querySelector("#paypal-sdk");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "paypal-sdk";
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=INR`;
        console.log("PayPal Client ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
        script.async = true;
        script.onload = renderPayPalButtons;
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    };

    const renderPayPalButtons = () => {
      if (!window.paypal) return;

      window.paypal.Buttons({
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
      }).render(paypalRef.current);
    };

    addPayPalScript();
  }, [totalAmount]);

  return (
    <div>
      <h3>Complete Payment</h3>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PayPalButton;
