import { useState } from "react";
import type { Trainings } from "../types/Trainings";
import { addTrainings } from "../trainingapi";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import TrainingForm from "./TrainingForm";

type Addtrainingprops = {
    fetchTrainings: () => void;
}

function AddTraining(props: Addtrainingprops){
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<Trainings>({} as Trainings);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
        setTraining({} as Trainings)
    };

    const handleSubmit = () => {
        if(!training.customer){
            alert("Select a customer")
            return;
        }
        addTrainings(training)
        .then(() => {
            props.fetchTrainings()
            handleClose()
        })    
        .catch((err) => console.log(err))
        
    }

    return(
        <>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogTitle>
            <TrainingForm training={training} setTrainings={setTraining}/>
        </DialogTitle>

        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    )
}

export default AddTraining;