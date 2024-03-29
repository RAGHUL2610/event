


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { forwardRef } from 'react';

// export default function UpdateEvent() {
//   const { id } = useParams();

//   const [eventName, setEventName] = useState('');
//   const [eventDate, setEventDate] = useState('');
//   const [chiefName, setChiefName] = useState('');
//   const [permissionLetter, setPermissionLetter] = useState(null);
//   const [chiefProfile, setChiefProfile] = useState(null);
//   const [agenda, setAgenda] = useState(null);
//   const [requestLetter, setRequestLetter] = useState(null);
//   const [attendance, setAttendance] = useState(null);
//   const [feedbackStudents, setFeedbackStudents] = useState(null);
//   const [chiefFeedback, setChiefFeedback] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     axios.get(`http://localhost:2500/event/eventsdata/${id}`)
//     .then(res=>{
//         setEventName(res.data.Ename);
//         setChiefName(res.data.EChiefName);
//     })
//   }, []);

  
      

//   async function handleUpdateEvent(e) {
//       e.preventDefault();

//       const formData = new FormData();
//       formData.append('eventName', eventName);
//       formData.append('eventDate', eventDate);
//       formData.append('chiefName', chiefName);
//       formData.append('permissionLetter', permissionLetter);
//       formData.append('chiefProfile', chiefProfile);
//       formData.append('agenda', agenda);
//       formData.append('requestLetter', requestLetter);
//       formData.append('attendance', attendance);
//       formData.append('feedbackStudents', feedbackStudents);
//       formData.append('chiefFeedback', chiefFeedback);

//       try {
//         await axios.put(`http://localhost:2500/event/events/${id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         // Redirect to view event page after successful update
//         window.location.href = '/StaffView-Event';

//       } catch (error) {
//         console.error('Error updating event:', error.response.data);
//         setErrorMessage(error.response.data.message);
//       }
//     }

//   return (
//     <div>
//       <h2>Update Event</h2>
//       <form onSubmit={handleUpdateEvent}>
//         <div>
//           <label htmlFor="eventName">Event Name</label>
//           <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="eventDate">Event Date</label>
//           <input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="chiefName">Chief Name</label>
//           <input type="text" id="chiefName" value={chiefName} onChange={(e) => setChiefName(e.target.value)} />
//         </div>
//         {/* File input fields */}
//         <div>
//           <label htmlFor="permissionLetter">Permission Letter</label>
//           <input type="file" file={permissionLetter} id="permissionLetter" onChange={(e) => setPermissionLetter(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="chiefProfile">Chief Profile</label>
//           <input type="file" id="chiefProfile" onChange={(e) => setChiefProfile(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="agenda">Agenda</label>
//           <input type="file" id="agenda" onChange={(e) => setAgenda(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="requestLetter">Request Letter</label>
//           <input type="file" id="requestLetter" onChange={(e) => setRequestLetter(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="attendance">Attendance Sheet</label>
//           <input type="file" id="attendance" onChange={(e) => setAttendance(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="feedbackStudents">Feedback of Students</label>
//           <input type="file" id="feedbackStudents" onChange={(e) => setFeedbackStudents(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="chiefFeedback">Chief Feedback</label>
//           <input type="file" id="chiefFeedback" onChange={(e) => setChiefFeedback(e.target.files[0])} />
//         </div>
//         <button type="submit">Update</button>
//         {errorMessage && <p>{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateEvent() {
  const { id } = useParams();

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

  useEffect(() => {
    axios.get(`http://localhost:2500/event/eventsdata/${id}`)
    .then(res=>{
        setEventName(res.data.Ename);
        setEventDate(res.data.Edate);
        setChiefName(res.data.EChiefName);

        // Assuming res.data contains URLs or file paths for the uploaded files
        // Pre-fill the file input fields with the uploaded files
        setPermissionLetter(res.data.EPermission);
        setChiefProfile(res.data.EChiefProfile);
        setAgenda(res.data.EChiefAgenda);
        setRequestLetter(res.data.ERequestLetter);
        setAttendance(res.data.EAttendance);
        setFeedbackStudents(res.data.EFeedback);
        setChiefFeedback(res.data.EChiefFeedback);
    })
  }, [id]);

  async function handleUpdateEvent(e) {
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
        await axios.put(`http://localhost:2500/event/events/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Redirect to view event page after successful update
        window.location.href = '/StaffView-Event';

      } catch (error) {
        console.error('Error updating event:', error.response.data);
        setErrorMessage(error.response.data.message);
      }
    }

  return (
    <div>
      <h2>Update Event</h2>
      <form onSubmit={handleUpdateEvent}>
        <div>
          <label htmlFor="eventName">Event Name</label>
          <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date</label>
          <input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="chiefName">Chief Name</label>
          <input type="text" id="chiefName" value={chiefName} onChange={(e) => setChiefName(e.target.value)} />
        </div>
        {/* File input fields */}
        <div>
          <label htmlFor="permissionLetter">Permission Letter</label>
          <input type="file" id="permissionLetter" onChange={(e) => setPermissionLetter(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="chiefProfile">Chief Profile</label>
          <input type="file" id="chiefProfile" onChange={(e) => setChiefProfile(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="agenda">Agenda</label>
          <input type="file" id="agenda" onChange={(e) => setAgenda(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="requestLetter">Request Letter</label>
          <input type="file" id="requestLetter" onChange={(e) => setRequestLetter(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="attendance">Attendance Sheet</label>
          <input type="file" id="attendance" onChange={(e) => setAttendance(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="feedbackStudents">Feedback of Students</label>
          <input type="file" id="feedbackStudents" onChange={(e) => setFeedbackStudents(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="chiefFeedback">Chief Feedback</label>
          <input type="file" id="chiefFeedback" onChange={(e) => setChiefFeedback(e.target.files[0])} />
        </div>
        <button type="submit">Update</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
