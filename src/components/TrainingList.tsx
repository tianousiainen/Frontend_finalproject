import { useEffect, useState } from "react";
import type { Trainings } from "../types/Trainings";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import AddTraining from "./AddTraining";
import { deleteTrainings } from "../trainingapi";
import { Snackbar } from "@mui/material";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TrainingsWithCustomers = Trainings & {
    customerName: string;
};

function TrainingList() {
    const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

    const [trainings, setTrainings] = useState<TrainingsWithCustomers[]>([]);
    const [open, setOpen] = useState(false);

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
        {
            field:"_links.self.href",
            headerName: "", 
            renderCell: (params: GridRenderCellParams) =>
                <IconButton onClick={() => handleDelete(params.row._links.self.href)}>
                    <DeleteIcon color="error" />
                </IconButton>
        }
    ];

    const fetchData = async () => {
        try {
            const trainingResponse = await fetch(API_URL + "/trainings");

            if (!trainingResponse.ok) {
                throw new Error("Error when fetching trainings");
            }

            const trainingData = await trainingResponse.json();
            const trainingList: Trainings[] = trainingData._embedded?.trainings ?? [];

            const trainingsWithCustomers: TrainingsWithCustomers[] = await Promise.all(
                trainingList.map(async (training) => {
                    const customerUrl = training._links?.customer?.href;

                    if (!customerUrl) {
                        return { ...training, customerName: "Unknown" };
                    }

                    try {
                        const response = await fetch(customerUrl);
                        if (!response.ok) {
                            return { ...training, customerName: "Unknown" };
                        }
                        const customer = await response.json();
                        return {
                            ...training,
                            customerName: customer.firstname + " " + customer.lastname,
                        };
                    } catch {
                        return { ...training, customerName: "Unknown" };
                    }
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

    const handleDelete = (url: string) => {
        if(window.confirm("Are you sure?")){
            deleteTrainings(url)
            .then(() => {
                fetchData();
                setOpen(true)
            })
            .catch((err) => console.log(err))
        }
    }
    

    return (
        <>
            <h1>Trainings</h1>
            <AddTraining fetchTrainings={fetchData} />

            <div style={{ width: "90%", height: 500, marginTop: 10 }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    autoPageSize
                    getRowId={(row) => row._links?.self.href ?? row.activity + String(row.date)}
                />
            </div>

            <Snackbar
                open={open}
                message="Training deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                />
        </>
    );
}

export default TrainingList;