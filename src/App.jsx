import { useState,useEffect } from 'react';
import './App.css'
import { Route,Routes, json } from 'react-router-dom';
import EmployeeDetails from './Pages/EmployeeDetails/EmployeeDetails';
import Header from './Components/Header/Header';
import DashBoard from './Pages/DashBoard/DashBoard';

function App() {
  const [employees,setEmployees] = useState([]);
  const [currEmployee,setCurrEmployee] = useState(null);
  const [loading,setLoading] = useState(false);


  // initial render
useEffect(()=>{
  // function to fetch employees
    let fetchEmployees = async()=>{
      try{
     let response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
     let jsonResponse = await response.json();
     console.log(jsonResponse.data);
     setEmployees([...jsonResponse.data]);
     localStorage.setItem('employee_data',JSON.stringify(jsonResponse.data))
      }
     catch(error){
       console.log(error);
      }
    }

    // use local storage functionality to limit concurrent call of api
   let employee_data = localStorage.getItem('employee_data')
   if(employee_data){
     setEmployees(JSON.parse(employee_data));
   }
   else{
    fetchEmployees()
   }
},[])


  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/' element={<DashBoard setCurrEmployee={setCurrEmployee} employees={employees}/>}/>
      <Route path='/employee' element={<EmployeeDetails currEmployee={currEmployee}/>}/>
    </Routes>
    </div>

  )
}

export default App
