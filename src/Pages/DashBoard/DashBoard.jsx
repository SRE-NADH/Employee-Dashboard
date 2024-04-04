import React, { useEffect, useState } from 'react'
import './dashboard.css'
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard'

const DashBoard = ({employees,setCurrEmployee}) => {
  const [deleteEmployee, setDeleteEmployee] = useState(null); // keep track of clicking delete button
  const [tmpEmployees,setTmpEmployees]  = useState([]);
  const [searchValue,setSearchValue] = useState('');
  const [searchEmployee,setSearchEmployee] = useState(null); // keeep track of search employee
  const [select,setSelect] = useState(false);// keep track of clicking select button
  const [selectedArray,setSelectedArray] = useState([]);


  // only trigger when click on delete buton
useEffect(()=>{
  if(deleteEmployee){
  // delete element  
  let tmp = tmpEmployees.filter((item)=>{
      return item.id!==deleteEmployee.id  });
      setTmpEmployees([...tmp])
  }
},[deleteEmployee])



useEffect(()=>{
 setTmpEmployees([...employees]) 
},[employees]);


function handleSearch(){
  // find searched employee based on id
  let tmp = tmpEmployees.find((item)=>{
    return searchValue.trim().includes(item.id);
  })
  if(!tmp && searchValue.trim()!==""){
    window.alert("Employee not found");
    return;
  }
  setSearchEmployee(tmp);  
}

function handleSelect(e){
 setSelect(!select)
 if(select){
    deleteElements();
 }
}

// function to delete array of elements
function deleteElements(){
  let tmp = tmpEmployees;
  selectedArray.forEach((item,index)=>{
      tmp = tmp.filter((employee)=>{
        return employee.id!==item.id
      })
  });
  setTmpEmployees([...tmp])
}

// console.log(selectedArray);

  return (
    <div className='dashboard'>
      <div className='search-box'>
         <input type='search' onChange={(e)=>{setSearchValue(e.target.value)}} placeholder='Search By  Id'  />
         <button onClick={handleSearch} >Search</button>
         <button onClick={handleSelect} >{select?'Delete':'Select'}</button>
      </div>
     <div className='employee-container'>
         {
          searchEmployee ? <EmployeeCard key={searchEmployee.id} setDeleteEmployee={setDeleteEmployee} setCurrEmployee={setCurrEmployee} data={searchEmployee} select={select} setSelectedArray={setSelectedArray} /> :
            tmpEmployees && tmpEmployees.map((item,index)=>(
              <EmployeeCard key={index} setDeleteEmployee={setDeleteEmployee} setCurrEmployee={setCurrEmployee} data={item} select={select} setSelectedArray={setSelectedArray}/>
            ))
         }
         
     </div>

    </div>
  )
}

export default DashBoard