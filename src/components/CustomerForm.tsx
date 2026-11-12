import { DialogContent, TextField } from "@mui/material";
import type { Customers } from "../types/Customers";

type CustomerFormprops = {
    customer: Customers
    setCustomer:  React.Dispatch<React.SetStateAction<Customers>>
}

function CustomerForm({customer, setCustomer}: CustomerFormprops){


    return(
        <DialogContent>
            <TextField
                required
                margin="dense"
                label="firstname"
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                fullWidth
                variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="lastname"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            fullWidth
            variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="street address"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            fullWidth
            variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            fullWidth
            variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="city"
            value={customer.city}
            //type='number'
            onChange={e => setCustomer({...customer, city: (e.target.value)})}
            fullWidth
            variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="email"
            value={customer.email}
           // type='number'
            onChange={e => setCustomer({...customer, email: (e.target.value)})}
            fullWidth
            variant="standard"
            />
        
        <TextField
            required
            margin="dense"
            label="phone"
            value={customer.phone}
           // type='number'
            onChange={e => setCustomer({...customer, phone: (e.target.value)})}
            fullWidth
            variant="standard"
            />
        </DialogContent>
    )
}

export default CustomerForm;