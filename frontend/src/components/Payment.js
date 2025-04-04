const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://bookmyshow-dupe.onrender.com";

export const createOrder = async (amount) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // ⏳ 10 sec timeout

    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
      credentials: "include",
      signal: controller.signal, // Abort if taking too long
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create order");

    return data.orderId;
  } catch (error) {
    console.error("🚨 Payment Order Error:", error.message);
    return null;
  }
};
