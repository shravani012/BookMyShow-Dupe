const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const makePayment = async (paymentData) => {
    const response = await fetch(`${API_URL}/api/payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
    });

    return response.json();
};
