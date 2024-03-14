
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Outlet,Link } from 'react-router-dom';

export default function View() {


  const [views,SetViews]=useState([]);

  useEffect(()=>
  {
    axios.get('http://localhost:2500/staff/user')
    .then(res=>SetViews(res.data))
    .catch(err=> console.log(err));
  },[])

  const handleDelete=(id)=>
  {
    axios.delete('http://localhost:2500/staff/deleteuser/'+id)

    .then(res=>{console.log(res)
    window.location.reload()})
    .catch(err=>console.log(err))
  }

  // const handleDelete = (id) => {
  //   console.log("Deleting item with ID:", id); 
  //   axios.delete('http://localhost:2500/deleteuser/' + id)
  //     .then(res => {
  //       console.log("Delete response:", res.data); 
  //       window.location.reload();
  //     })
  //     .catch(err => console.log(err));
  // }
  



  return (
    <div style={{ margin: '20px auto', maxWidth: '800px' }}>
      <header style={{ backgroundColor: '#f2f2f2', padding: '10px', marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', margin: '0' }}>STAFF</h1>
      </header>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S Name</th>
              <th>Qualification</th>
              <th>Department</th>
              <th>EmailId</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
    views.map((items,index)=>
    {
      return(
        <tr key={index}>
             <td>{items.Sname}</td>
             <td>{items.Squalification}</td>
             <td>{items.SDepartment}</td>
             <td>{items.SEmail}</td>
             {/* <td>{items.SPassword}</td> */}
             <td>
             <Link to={"/AdminHome/Update-Staff/"+items._id} className='btn btn-success'>Update</Link>

              {/* <button type='button' className='btn btn-success'>Update</button> */}
                <button type='button' className='btn btn-danger' onClick={(e)=>handleDelete(items._id)}>Delete</button>
                
                </td>

        </tr>
      )
    })
  }
          </tbody>
        </table>
      </div>
    </div>
  );
 
}
