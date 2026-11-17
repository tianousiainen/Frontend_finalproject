import { useEffect, useState } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import type { Trainings } from "../types/Trainings";
import type { Customers } from "../types/Customers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const activities = [
    "Gym training",
    "Jogging",
    "Spinning",
    "Zumba",
    "Fitness",
    "Yoga",
    "Walking",
];

const API_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

type TrainingFormProps = {
    training: Trainings;
    setTrainings: React.Dispatch<React.SetStateAction<Trainings>>;
};

function TrainingForm({ training, setTrainings }: TrainingFormProps) {
    const [customers, setCustomers] = useState<Customers[]>([]);

    useEffect(() => {
        fetch(API_URL + "/customers")
            .then((res) => res.json())
            .then((data) => setCustomers(data._embedded?.customers ?? []))
            .catch((err) => console.error(err));
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Date"
                value={training.date ?? null}
                onChange={(newValue: Dayjs | null) =>
                    setTrainings({ ...training, date: newValue ?? dayjs() })
                }
            />

            <TextField
                required
                margin="dense"
                label="Duration (min)"
                type="number"
                value={training.duration ?? ""}
                onChange={(e) =>
                    setTrainings({ ...training, duration: Number(e.target.value) })
                }
                fullWidth
                variant="standard"
            />

           <Autocomplete
                freeSolo
                options={activities}
                inputValue={training.activity ?? ""}
                onInputChange={(_, newValue) =>
                    setTrainings({ ...training, activity: newValue })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        margin="dense"
                        label="Activity"
                        variant="standard"
                    />
                )}
            />

            <TextField
                select
                required
                margin="dense"
                label="Customer"
                value={training.customer ?? ""}
                onChange={(e) =>
                    setTrainings({ ...training, customer: e.target.value })
                }
                fullWidth
                variant="standard"
            >
            {customers.map((c) => {
                const href = c._links?.self.href;
                if (!href) return null;
                return (
                    <MenuItem key={href} value={href}>
                        {c.firstname} {c.lastname}
                    </MenuItem>
                );
            })}
            </TextField>
        </LocalizationProvider>
    );
}

export default TrainingForm;