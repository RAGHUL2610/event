// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';

// export default function ViewEventsInfo() {
//     const {id}=useParams();
//     const[views,setViews] = useState([]);
    


//     useEffect(()=>{
//         axios.get('http://localhost:2500/event/eventsdata/'+id)
//         .then((res)=>{
//             setViews((e)=>[...e,res.data])
//             // console.log(res.data);
//         })
//         .catch(err => console.log(err))

//     },[])
//     console.log(views);
//   return (
//     <div>
//         {
//             views.map((items)=>{
//                 return(
//                     <div>
//                        <h1>Event Name: {items.Ename}</h1>
//                         <h1>Date :{items.EDate}</h1>
//                         <h1>Chief Name{items.EChiefName}</h1>
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EPermission}`} />
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EChiefProfile}`} />
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EChiefAgenda}`} />
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.ERequestLetter}`} />
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EAttendance}`} />
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EFeedback}`} />
//                         <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${items.EChiefFeedback}`} />
//                     </div>
//                 )
//             })
            
//         }
//     </div>
//   )
// }

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ViewEventsInfo() {
  const { id } = useParams();
  const [views, setViews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:2500/event/eventsdata/${id}`)
      .then((res) => {
        setViews(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    // Check if views is an array
    if (Array.isArray(views)) {
      // Loop through each image and add it to the PDF
      views.forEach((item, index) => {
        const img = document.getElementById(`image-${index}`);
        html2canvas(img).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

          // Add image to PDF
          pdf.addImage(imgData, 'PNG', 10, 10, 180, 120);
          
          // If it's the last image, save and download the PDF
          if (index === views.length - 1) {
            pdf.save('event_images.pdf');
          } else {
            // If not the last image, add a new page
            pdf.addPage();
          }
        });
      });
    }
  };

  return (
    <div>
      {Array.isArray(views) && views.map((item, index) => (
        <div key={index} id={`image-${index}`}>
          <h1>Event Name: {item.Ename}</h1>
          <h1>Date: {item.EDate}</h1>
          <h1>Chief Name: {item.EChiefName}</h1>
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.EPermission}`} alt={`Event ${index}`} />
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.EChiefProfile}`} alt={`Event ${index}`} />
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.EChiefAgenda}`} alt={`Event ${index}`} />
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.ERequestLetter}`} alt={`Event ${index}`} />
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.EAttendance}`} alt={`Event ${index}`} />
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.EFeedback}`} alt={`Event ${index}`} />
          <img height={400} width={800} src={`http://localhost:2500/event/eventfiles/${item.EChiefFeedback}`} alt={`Event ${index}`} />
        </div>
      ))}
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}
