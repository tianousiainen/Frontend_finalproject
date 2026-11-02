
import { useEffect, useState } from "react";
import type { Trainings } from "../types/Trainings";
import type { Customers } from "../types/Customers";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

type TrainingsWithCustomers = Trainings & {
    customerName: string;
};

function TrainingList() {
    const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

    const [trainings, setTrainings] = useState<TrainingsWithCustomers[]>([]);

    const columns: GridColDef[] = [
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            valueFormatter: (value) =>
                value ? new Date(value).toLocaleString("fi-FI") : "",
        },
        { field: "duration", headerName: "Duration (min)", flex: 1 },
        { field: "activity", headerName: "Activity", flex: 2 },
        { field: "customerName", headerName: "Customer", flex: 1 },
    ];

    const fetchData = async () => {
        try {
            const [trainingResponse, customerResponse] = await Promise.all([
                fetch(API_URL + "/trainings"),
                fetch(API_URL + "/customers"),
            ]);

            if (!trainingResponse.ok || !customerResponse.ok) {
                throw new Error("Error when fetching data");
            }

            const trainingData = await trainingResponse.json();
            const customerData = await customerResponse.json();

            const trainingList: Trainings[] = trainingData._embedded.trainings;
            const customerList: Customers[] = customerData._embedded.customers;

        const trainingsWithCustomers: TrainingsWithCustomers[] =
            await Promise.all(
            trainingList.map(async (training) => {
                const customerUrl = training._links?.customer.href;

                if (!customerUrl) {
                    return { ...training, customerName: "Unknown" };
                }

                const response = await fetch(customerUrl);
                const customer = await response.json();

                return {
                    ...training,
                    customerName: customer.firstname + " " + customer.lastname,
                };
            })
        );

            setTrainings(trainingsWithCustomers);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Trainings</h1>

            <div style={{ width: "90%", height: 500, marginTop: 10 }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    autoPageSize
                    getRowId={(row) => row._links?.self.href ?? row.activity + String(row.date)}
                />
            </div>
        </>
    );
}

export default TrainingList;
