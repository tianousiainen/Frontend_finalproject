import { useState } from "react";
import type { Customers } from "../types/Customers";
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CustomerForm from "./CustomerForm";

type UpdateCustomerprops = {
    fetchCustomers: () => void;
    Customers: Customers;
}

function UpdateCustomer(props: UpdateCustomerprops){
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customers>({} as Customers);

    const handleClickOpen = () => {
        setOpen(true);

        setCustomer({
            firstname: props.Customers.firstname,
            lastname: props.Customers.lastname,
            streetaddress: props.Customers.streetaddress,
            postcode: props.Customers.postcode,
            city: props.Customers.city,
            email: props.Customers.email,
            phone: props.Customers.phone
        })
    };

    const handleClose= () =>{
        setOpen(false);
    };

    const handleSubmit = () => {
        fetch(props.Customers._links?.self.href || "", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(customer)
        })
        .then((response) =>{
            if(!response.ok){
                throw new Error("Error when updating car")
            }
        return response.json()
        })
        .then(() => props.fetchCustomers())
        .catch((err) => console.log(err))
        handleClose();

    };

    return(
        <>
        <IconButton onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update customer</DialogTitle>
            <DialogTitle>Update</DialogTitle>
            <CustomerForm customer={customer} setCustomer={setCustomer}/>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default UpdateCustomer;