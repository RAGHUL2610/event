import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';

export default function AddEvent() {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [chiefName, setChiefName] = useState('');
  const [permissionLetter, setPermissionLetter] = useState(null);
  const [chiefProfile, setChiefProfile] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const [requestLetter, setRequestLetter] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [feedbackStudents, setFeedbackStudents] = useState(null);
  const [chiefFeedback, setChiefFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');



  const handleAddEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('eventDate', eventDate);
    formData.append('chiefName', chiefName);
    formData.append('permissionLetter', permissionLetter);
    formData.append('chiefProfile', chiefProfile);
    formData.append('agenda', agenda);
    formData.append('requestLetter', requestLetter);
    formData.append('attendance', attendance);
    formData.append('feedbackStudents', feedbackStudents);
    formData.append('chiefFeedback', chiefFeedback);

    try {
      const response = await axios.post('http://localhost:2500/event/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      window.location.reload();
      // Handle success response
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrorMessage(error.response.data.message);
      // Handle error response
    }
  };




  return (
    <div className="add-event-container">
      <div className="add-event-form-container">
        <h2>Add Event</h2>
        <form onSubmit= {handleAddEvent}>
          <div className="add-event-input-container">
            <label htmlFor="event">Name Of the Event</label>
            <input type="text" id="event" required value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>

          <div className="add-event-input-container">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </div>

          <div className="add-event-input-container">
            <label htmlFor="guest">Name of the Resource Person:</label>
            <input type="text" id="guest" required value={chiefName} onChange={(e) => setChiefName(e.target.value)} />
          </div>

          <div className="add-event-file">
            <label htmlFor="permission-letter">Permission letter</label>
            <input type="file" id="permission-letter" required onChange={(e) => setPermissionLetter(e.target.files[0])} />
          </div>

          <div className="add-event-file">
            <label htmlFor="profile">Profile of Chief guest</label>
            <input type="file" id="profile" required onChange={(e) => setChiefProfile(e.target.files[0])} />
          </div>

          <div className="add-event-file">
            <label htmlFor="agenda">Agenda</label>
            <input type="file" id="agenda" required onChange={(e) => setAgenda(e.target.files[0])} />
          </div>

          <div className="add-event-file">
            <label htmlFor="request">Request Letter</label>
            <input type="file" id="request" required onChange={(e) => setRequestLetter(e.target.files[0])} />
          </div>

          <div className="add-event-file">
            <label htmlFor="attendance">Attendance Sheet</label>
            <input type="file" id="attendance" required onChange={(e) => setAttendance(e.target.files[0])} />
          </div>

          <div className="add-event-file">
            <label htmlFor="feedback-students">Feedback of Students</label>
            <input type="file" id="feedback-students" required onChange={(e) => setFeedbackStudents(e.target.files[0])} />
          </div>

          <div className="add-event-file">
            <label htmlFor="guest-feedback">Feedback of guest</label>
            <input type="file" id="guest-feedback" required onChange={(e) => setChiefFeedback(e.target.files[0])} />
          </div>

          <button type="submit" id="submit">Submit</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}
  
