import './App.css'
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import  CssBaseline  from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import TrainingCalendar from './components/TrainingCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const navStyle = {
  '&.active': {
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  borderBottom: '2px solid white',  
  },
};

function App() {
  return (
    <>
    <BrowserRouter>
        <CssBaseline>

          <AppBar position='static'>

            <Toolbar sx={{justifyContent: 'space-between'}}>
              <Typography variant='h6' sx={{mr: 'auto'}}>Personal Trainer</Typography>

              <Button color='inherit' component={NavLink} to="/customerlist" sx={navStyle}>Customers</Button>

              <Button color='inherit' component={NavLink} to="/traininglist" sx={navStyle}>Trainings</Button>

              <Button color='inherit' component={NavLink} to="/trainingcalendar" sx={navStyle}>Calendar</Button>
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
              <Route path='/trainingcalendar' element={<TrainingCalendar/>}></Route>
            </Routes>
          </Container>
        </CssBaseline>
      </BrowserRouter>
      
    </>
  )
}

export default App
