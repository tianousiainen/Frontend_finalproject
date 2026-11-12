import { useState } from "react";
import type { Customers } from "../types/Customers";
import { addCustomer } from "../customerapi";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";

type Addcustomerprops = {
    fetchCustomers: () => void;
}

function AddCar(props: Addcustomerprops){
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customers>({} as Customers);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCustomer({} as Customers)
    };

    const handleSubmit = () => {
        addCustomer(customer)
        .then(() => props.fetchCustomers())
        .catch((err) => console.log(err))
        handleClose();
    };

    return(
        <>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
            </DialogTitle>

        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    )
}

export default AddCar;