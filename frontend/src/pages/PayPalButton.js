const PayPalButton = ({ totalAmount, selectedSeats, onBookingSuccess }) => {
  const paypalRef = useRef();
  const isRendered = useRef(false); // 👈 new flag

  useEffect(() => {
    const loadPayPalScript = () => {
      if (!document.getElementById("paypal-sdk")) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=INR`;
        script.id = "paypal-sdk";
        script.async = true;
        script.onload = renderPayPalButtons;
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    };

    const renderPayPalButtons = () => {
      if (isRendered.current || !window.paypal) return; // 👈 prevent multiple renders
      isRendered.current = true;

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
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          });

          const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book-seats`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ seats: selectedSeats }),
          });

          const bookingData = await bookingRes.json();
          if (bookingData.success) {
            onBookingSuccess();
          } else {
            alert("⚠️ Booking failed after payment. Please contact support.");
          }
        },
        onError: (err) => {
          console.error("❌ PayPal Error:", err);
          alert("Payment failed. Please try again.");
        },
      }).render(paypalRef.current);
    };

    loadPayPalScript();
  }, [totalAmount, selectedSeats]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
