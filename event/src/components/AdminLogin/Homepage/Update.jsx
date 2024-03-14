import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
// import { Outlet,Link } from 'react-router-dom';
export default function Update() 
{
  const {id}=useParams();


  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
   const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:2500/staff/updateuser/'+id, {
      Name: name,
      Qualification: qualification,
      Department: dept,
      Email: email,
      Password: password
    })
      .then(response => {
        alert("Success");
        navigate('/');
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

//  useEffect(() => {
//     axios.get('http://localhost:2500/event/events')
//       .then(res => {
//         const data = res.data; 
//         setName(data.name);
//         setQualification(data.qualification);
//         setDept(data.department);
//         setEmail(data.email);
//         setPassword(data.password);
//       })
//       .catch(err => console.log(err));
//   }, []);
useEffect(()=>
{
  axios.get('http://localhost:2500/staff/user/'+id)
  .then(res=>{
    setName(res.data.Sname);
    setQualification(res.data.Squalification);
    setDept(res.data.SDepartment);
    setEmail(res.data.SEmail);
    setPassword(res.data. SPassword);

  })
  .catch(err=> console.log(err));
},[])

    return (
      <div>
      Add Staff
      <div className='add'>
        <form onSubmit={handleSubmit}>
          <div>Staff Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
          </div>
          <div>Qualification
            <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} /><br />
          </div>
          <div>Department
            <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} required /><br />
          </div>

          <div>Email
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button type='submit' id='submit'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
