import './App.css'
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import  CssBaseline  from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
        <CssBaseline>

          <AppBar position='static'>

            <Toolbar>
              <Typography variant='h6' sx={{flexGrow: 1}}>Personal trainer</Typography>

              <Button color='inherit' component={Link} to="/customerlist">Customers</Button>

              <Button color='inherit' component={Link} to="/traininglist">Trainings</Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth={false}
            sx={{
              width: "100%",
              textAlign: "center",
              mt: 5,
            }}>
            <Routes>
              <Route path='/customerlist' element={<CustomerList/>}/>
              <Route path='/traininglist' element={<TrainingList/>}></Route>
            </Routes>
          </Container>
        </CssBaseline>
      </BrowserRouter>
      
    </>
  )
}

export default App
