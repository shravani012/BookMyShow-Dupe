export const createOrder = async (amount) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
      credentials: "include", // Ensures cookies/session are included
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create order");

    return data.orderId;
  } catch (error) {
    console.error("🚨 Payment Order Error:", error.message);
    return null;
  }
};

export const captureOrder = async (orderId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/capture-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
      credentials: "include", // Ensures cookies/session are included
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to capture payment");

    return data;
  } catch (error) {
    console.error("🚨 Payment Capture Error:", error.message);
    return null;
  }
};
