
import React, { useState, useEffect } from 'react';
import { Link ,Outlet} from 'react-router-dom';
import axios from 'axios';
import './ViewEvent.css';

export default function ViewEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:2500/event/events'); // Assuming your API is hosted on the same domain
      // Formatting dates
      const formattedEvents = response.data.map(event => ({
        ...event,
        EDate: new Date(event.EDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const handleEventDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2500/event/events/${id}`);
      // If deletion is successful, refetch events to update the UI
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className='grid'>
      <div className="row justify-content-center">
        {events.map(event => (
          <div key={event._id} className="col-sm-6 col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.Ename}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{event.EChiefName}</h6>
                <p className="card-text">{event.EDate}</p>
                <div>
                {/* <a href="#" className="card-link">Update</a> */}
                <Link to={"/StaffHome/EventUpdate/"+event._id} className='btn btn-success'>Update</Link>

                <a  className="card-link" onClick={() => handleEventDelete(event._id)}>Delete</a>

                <a href={'/StaffHome/StaffView-Eventinfo/'+event._id} className='card-link'>View report</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
