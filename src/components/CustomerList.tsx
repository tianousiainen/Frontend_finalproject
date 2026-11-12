import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import type { Customers } from "../types/Customers"
import { useEffect, useState } from "react"
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from "./AddCustomer";

function CustomerList(){
    const [customers, setCustomers] = useState<Customers[] | null>();

    const columns: GridColDef[]= [
        {field: "firstname", headerName:"First name"},
        {field: "lastname", headerName: "Last name"},
        {field: "streetaddress", headerName: "Street address", flex: 2},
        {field: "postcode", headerName: "Post code"},
        {field: "city", headerName: "City"},
        {field: "email", headerName: "Email", flex: 2},
        {field: "phone", headerName: "Phone", flex: 2},
        {
            field:"_links.self.href",
            headerName: "", 
        },
        {
            field:"_links.customer.href",
            headerName: "",
        },
        {
            field:"_links.trainings.href",
            headerName: "",
        }

    ]

    const fetchCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "customers")
        .then((response) => {
            if(!response.ok){
                throw new Error("Error when fetching customers")
            }
            return response.json();
        })
        .then((data) =>  setCustomers(data._embedded.customers))
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchCustomers();
    },[]);

    return(
        <>
            <h1>Customers</h1>
            <AddCar fetchCustomers={fetchCustomers} />
            <div style={{width: '90', height: 500, marginTop: 10}}>
                <DataGrid
                    rows={customers || []}
                    columns={columns}
                    autoPageSize
                    getRowId={(row) => row._links.self.href}
                />
            </div>
        </>
    )
}

export default CustomerList