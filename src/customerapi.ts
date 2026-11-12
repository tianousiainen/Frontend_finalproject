import type { Customers } from "./types/Customers";

const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

export const addCustomer = async (customer: Customers) => {
    const response = await fetch(API_URL + "/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error("Error when adding a new customer");
    }
    return response.json();
};