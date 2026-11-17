import type { Trainings } from "./types/Trainings";

const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

export const addTrainings = async (training: Trainings) => {
    const response = await fetch(API_URL + "/trainings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training),
    });
    if (!response.ok) {
        throw new Error("Error when adding a new training");
    }
    return response.json();
};

export function deleteTrainings(url: string){
    return fetch(url, {method: 'DELETE'})
    .then(response => {
        if(!response.ok){
            throw new Error("Error when deleting a training")
        }
        return response.json().catch(() => null);
    })
}