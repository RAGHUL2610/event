
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './ViewEventInfo.css'

export default function ViewEventsInfo() {
    const { id } = useParams();
    const [views, setViews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:2500/event/eventsdata/${id}`)
            .then((res) => {
                setViews([res.data]);
            })
            .catch(err => console.log(err));
    }, [id]);

    function GeneratePDFData() {
        const doc = new jsPDF();
        let yPos = 10; // Initial Y position for content

        views.forEach((item) => {
            const { Ename, EDate, EChiefName, EPermission, EChiefProfile, EChiefAgenda, ERequestLetter, EAttendance, EFeedback, EChiefFeedback } = item;

            doc.text(`Event Name: ${Ename}`, 10, yPos);
            doc.text(`Date: ${new Date(item.EDate).toLocaleDateString('en-GB')}`, 10, yPos + 10);
            doc.text(`Chief Name: ${EChiefName}`, 10, yPos + 20);

            if (EPermission) {
                doc.text(`Permission Letter:`, 10, yPos + 30);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${EPermission}`}`, 'JPEG', 10, yPos + 40, 180, 150);
                yPos += 200; // Adjust spacing between sections
            }

            doc.addPage("p")
            if (EChiefProfile) {
                doc.text(`Chief Guest Profile:`, 10, 10);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${EChiefProfile}`}`, 'JPEG', 10, 20, 180, 120);
            }

            if (EChiefAgenda) {
                doc.text(`Agenda:`, 10, 150);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${EChiefAgenda}`}`, 'JPEG', 10, 160, 180, 120);
            }

            doc.addPage("p")

            if (ERequestLetter) {
                doc.text(`Request Letter:`, 10, 10);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${ERequestLetter}`}`, 'JPEG', 10,  20, 180, 120);
            }

            if (EAttendance) {
                doc.text(`Attendance Sheet:`, 10, 150);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${EAttendance}`}`, 'JPEG', 10, 160, 180, 120);
            }

            doc.addPage("p")

            if (EFeedback) {
                doc.text(`Feedback of Students:`, 10, 10);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${EFeedback}`}`, 'JPEG', 10, 20, 180, 120);
            }

            

            if (EChiefFeedback) {
                doc.text(`Feedback of Chief:`, 10, 150);
                doc.addImage(`${`http://localhost:2500/event/eventfiles/${EChiefFeedback}`}`, 'JPEG', 10, 160, 180, 120);
            }

            
        });

        doc.save(`${views[0].Ename}.pdf`);
    }

    return (
        <div>
            {views.map((items, index) => (
                <div key={index} className="event-item">
                <h1>Event Name: {items.Ename}</h1>
                <h1>Date: {new Date(items.EDate).toLocaleDateString('en-GB')}</h1>
            
                <h1>Chief Name: {items.EChiefName}</h1>
            
                {/* Render other data here */}
                <div className="image-container">
                    <h3 className="section-title">Permission Letter</h3>
                    {items.EPermission && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EPermission}`} alt="Permission Letter" />}
            
                    <h3 className="section-title">Chief Profile</h3>
                    {items.EChiefProfile && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EChiefProfile}`} alt="Chief Guest Profile" />}
            
                    <h3 className="section-title">Agenda</h3>
                    {items.EChiefAgenda && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EChiefAgenda}`} alt="Agenda" />}
            
                    <h3 className="section-title">Request Letter</h3>
                    {items.ERequestLetter && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.ERequestLetter}`} alt="Request Letter" />}
            
                    <h3 className="section-title">Attendance Sheet</h3>
                    {items.EAttendance && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EAttendance}`} alt="Attendance Sheet" />}
            
                    <h3 className="section-title">Student Feedback</h3>
                    {items.EFeedback && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EFeedback}`} alt="Feedback of Students" />}
            
                    <h3 className="section-title">Chief Guest Feedback</h3>
                    {items.EChiefFeedback && <img className="centered-image" height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EChiefFeedback}`} alt="Feedback of Chief" />}

                    <button className='btn btn-success' onClick={GeneratePDFData}>Generate PDF</button>
                    <div style={{ height: '50px' }}></div>


                </div>
            </div>
            
            ))}
        </div>
    );
}
