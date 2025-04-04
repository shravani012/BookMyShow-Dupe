export const createOrder = async (amount) => {
  try {
    const response = await fetch("https://bookmyshow-dupe.onrender.com/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
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
    const response = await fetch("https://bookmyshow-dupe.onrender.com/api/payment/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to capture payment");

    return data;
  } catch (error) {
    console.error("🚨 Payment Capture Error:", error.message);
    return null;
  }
};
