import React, { useState,useEffect } from 'react';
import './employeecard.css';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({data,setCurrEmployee,setDeleteEmployee,select,setSelectedArray}) => {
    const navigate = useNavigate();
    const [cardSelect,setCardSelect] = useState(false);

    // handle delete
    function handleDelete(e){
        // avoid deleting if select is true
        if(select) return;
        setDeleteEmployee(data);
        // avoid unwanted propagation
        e.stopPropagation();

    }

    // handle onClick
    function handleClick(e){
        if(select){
            setCardSelect(!cardSelect);
        }
        else{
            setCurrEmployee(data);
            navigate('/employee');
        }
    }
    

    // trigger when cardelect state  changes
    useEffect(()=>{

        // implement unselect function
        if(!cardSelect){
            setSelectedArray((prev)=>{
                let tmp = prev.filter((item)=>{
                    return item.id!==data.id
                });
                return [...tmp]
            })
        }
        //select
        else{
            setSelectedArray((prev)=>{
              return [...prev,data]
            })
        }

    },[cardSelect])
   
    // Update cardSelect when select prop changes
    useEffect(() => {
        setCardSelect(false);
    }, [select]);

  return (
    <div onClick={handleClick} className={cardSelect && select?'employee-card select':'employee-card'}>
        <h2>{data.employee_name}</h2>
        <div className='card-content'>
           <p>id: {data.id}</p>
        </div>
        <div className='card-buttons'>
          <button onClick={handleDelete}>Delete</button>
          <button>edit</button>
        </div>
    </div>
  )
}
export default EmployeeCard