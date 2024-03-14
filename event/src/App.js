import logo from './logo.svg';
import './App.css';
import LoginForm from './components/Stafflogin/LoginForm';
import Admin from './components/AdminLogin/Admin';
import Home from './components/AdminLogin/Homepage/Home';
 import Add from './components/AdminLogin/Homepage/Add';
import View from './components/AdminLogin/Homepage/View';
// import Addevent from './components/Stafflogin/AddEvent';
import AddEvent from './components/Stafflogin/AddEvent';
import SHome from './components/Stafflogin/SHome';
import ViewEvent from './components/Stafflogin/ViewEvent';
import { Route, Routes } from 'react-router-dom';
import Update from './components/AdminLogin/Homepage/Update';
import UpdateEvent from './components/Stafflogin/UpdateEvent';
import ViewEventsInfo from './components/Stafflogin/ViewEventsInfo';


function App() {
  return (
    <div className="App">
      {/* <LoginForm/> */}
      {/* <Admin/> */}
      {/* <App/> */}
      {/* <Home/> */}
      {/* <Add/> */}
      {/* <View/> */}
      {/* <AddEvent/> */}
      {/* <View/> */}
    <Routes>
      <Route path='/StaffLogin' Component={LoginForm} />
      <Route path='/AdminLogin' Component={Admin} />

      <Route path='/AdminHome' Component={Home}>
        
        <Route path='Add-Event' Component={Add}/>
        <Route path='View-Event' Component={View}/>
        <Route path='Update-Staff/:id' Component={Update}/>


      </Route>
      <Route path='/StaffHome' Component={SHome}>
        <Route path='StaffAdd-Event' Component={AddEvent}/>
        <Route path='StaffView-Event' Component={ViewEvent}/>
        <Route path='EventUpdate/:id' Component={UpdateEvent}/>
        <Route path='StaffView-EventInfo/:id' Component={ViewEventsInfo}/>
      </Route>



    </Routes>

     
    </div>
  );
}

export default App;
