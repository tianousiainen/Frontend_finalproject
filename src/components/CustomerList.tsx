import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import type { Customers } from "../types/Customers"
import { useEffect, useState } from "react"

function CustomerList(){
    const [customers, setCustomers] = useState<Customers[] | null>();

    const columns: GridColDef[]= [
        {field: "firstname", headerName:"First name"},
        {field: "lastname", headerName: "Last name"},
        {field: "streetaddress", headerName: "Street address", flex: 1},
        {field: "postcode", headerName: "Post code"},
        {field: "city", headerName: "City"},
        {field: "email", headerName: "Email"},
        {field: "phone", headerName: "Phone"},
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
        fetch(import.meta.env.VITE_API_URL + "/customers")
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
            <div>
                <DataGrid
                    rows={customers || []}
                    columns={columns}
                    autoPageSize
                    getRowId={(row) => row._links.customers.href}
                />
            </div>
        </>
    )
}

export default CustomerList