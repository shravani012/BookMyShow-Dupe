import React, { useEffect, useRef } from "react";

const PayPalButton = ({ totalAmount }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const loadPayPalScript = () => {
      if (window.paypal) {
        renderPayPalButtons();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=INR`;
      script.async = true;
      script.onload = renderPayPalButtons;
      document.body.appendChild(script);
    };

    const renderPayPalButtons = () => {
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
          alert("✅ Payment Successful!");
          console.log("Payment Result:", result);
          window.location.href = "/payment-success"; // Optional success page
        },
        onError: (err) => {
          console.error("❌ PayPal Error:", err);
          alert("Payment failed. Please try again.");
        },
      }).render(paypalRef.current);
    };

    loadPayPalScript();
  }, [totalAmount]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
