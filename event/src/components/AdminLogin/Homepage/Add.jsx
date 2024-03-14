import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Add.css';
import { useNavigate } from 'react-router-dom';

export default function Add() {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get('http://localhost:2500/event/events')
  //     .then(res => {
  //       const data = res.data; 
  //       setName(data.name);
  //       setQualification(data.qualification);
  //       setDept(data.department);
  //       setEmail(data.email);
  //       setPassword(data.password);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:2500/staff/adduser', {
      Name: name,
      Qualification: qualification,
      Department: dept,
      Email: email,
      Password: password
    })
      .then(response => {
        alert("Success");
        navigate('/AdminHome/view-event');
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  return (
    
    <div>
      
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
  );
}
