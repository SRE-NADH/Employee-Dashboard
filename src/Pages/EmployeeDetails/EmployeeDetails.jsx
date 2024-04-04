import React from 'react';
import './employeedetails.css'


const EmployeeDetails = ({currEmployee}) => {


  return (
    <div className='employee-details'>
      <div>
        <h1>{currEmployee?.employee_name}</h1>
        <p>Id: {currEmployee?.id}</p>
        <p>Age: {currEmployee?.employee_age}</p>
        <p>Salary: {currEmployee?.employee_salary}</p>
      </div>
    </div>
  )
}

export default EmployeeDetails