import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateEvent.css'; // Import CSS file

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
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`http://localhost:2500/event/events/${id}`);
      const eventData = response.data;

      console.log(eventData);
      setEventName(eventData.Ename);

      const Edate = new Date(eventDate.EDate)
      setEventDate(eventData.EDate);
      setChiefName(eventData.EChiefName);

      // Populate file inputs if files exist
      if (eventData.EPermission) {
        const permissionLetterFile = new File([eventData.EPermission], eventData.EPermissionName, {
          type: eventData.EPermissionType,
        });
        setPermissionLetter(permissionLetterFile);
      }

      if (eventData.EChiefProfile) {
        const chiefProfileFile = new File([eventData.EChiefProfile], eventData.EChiefProfileName, {
          type: eventData.EChiefProfileType,
        });
        setChiefProfile(chiefProfileFile);
      }

      if (eventData.EAgenda) {
        const agendaFile = new File([eventData.EAgenda], eventData.EAgendaName, {
          type: eventData.EAgendaType,
        });
        setAgenda(agendaFile);
      }

      if (eventData.ERequestLetter) {
        const requestLetterFile = new File([eventData.ERequestLetter], eventData.ERequestLetterName, {
          type: eventData.ERequestLetterType,
        });
        setRequestLetter(requestLetterFile);
      }

      if (eventData.EAttendance) {
        const attendanceFile = new File([eventData.EAttendance], eventData.EAttendanceName, {
          type: eventData.EAttendanceType,
        });
        setAttendance(attendanceFile);
      }

      if (eventData.EFeedbackStudents) {
        const feedbackStudentsFile = new File([eventData.EFeedbackStudents], eventData.EFeedbackStudentsName, {
          type: eventData.EFeedbackStudentsType,
        });
        setFeedbackStudents(feedbackStudentsFile);
      }

      if (eventData.EChiefFeedback) {
        const chiefFeedbackFile = new File([eventData.EChiefFeedback], eventData.EChiefFeedbackName, {
          type: eventData.EChiefFeedbackType,
        });
        setChiefFeedback(chiefFeedbackFile);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const handleUpdateEvent = async (e) => {
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
      window.location.href = '/view-event';
    } catch (error) {
      console.error('Error updating event:', error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="add-event-container"> {/* Update class name */}
      <div className="add-event-form-container"> {/* Update class name */}
        <h2>Update Event</h2>
        <form onSubmit={handleUpdateEvent}>
          <div className="add-event-input-container"> {/* Update class name */}
            <label htmlFor="eventName">Event Name</label>
            <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div className="add-event-input-container"> {/* Update class name */}
            <label htmlFor="eventDate">Event Date</label>
            <input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </div>
          <div className="add-event-input-container"> {/* Update class name */}
            <label htmlFor="chiefName">Chief Name</label>
            <input type="text" id="chiefName" value={chiefName} onChange={(e) => setChiefName(e.target.value)} />
          </div>
          {/* File input fields */}
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="permissionLetter">Permission Letter</label>
            <input type="file" id="permissionLetter" onChange={(e) => setPermissionLetter(e.target.files[0])} />
          </div>
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="chiefProfile">Chief Profile</label>
            <input type="file" id="chiefProfile" onChange={(e) => setChiefProfile(e.target.files[0])} />
          </div>
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="agenda">Agenda</label>
            <input type="file" id="agenda" onChange={(e) => setAgenda(e.target.files[0])} />
          </div>
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="requestLetter">Request Letter</label>
            <input type="file" id="requestLetter" onChange={(e) => setRequestLetter(e.target.files[0])} />
          </div>
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="attendance">Attendance Sheet</label>
            <input type="file" id="attendance" onChange={(e) => setAttendance(e.target.files[0])} />
          </div>
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="feedbackStudents">Feedback of Students</label>
            <input type="file" id="feedbackStudents" onChange={(e) => setFeedbackStudents(e.target.files[0])} />
          </div>
          <div className="add-event-file"> {/* Update class name */}
            <label htmlFor="chiefFeedback">Chief Feedback</label>
            <input type="file" id="chiefFeedback" onChange={(e) => setChiefFeedback(e.target.files[0])} />
          </div>
          <button type="submit">Update</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
