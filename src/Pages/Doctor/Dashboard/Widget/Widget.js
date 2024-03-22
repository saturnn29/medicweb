/*
  File: DoctorWidget.js
  Author: [Your Name]
  Date: [Date]

  Description:
  This file defines the DoctorWidget component, rendering a widget with information based on the provided type.
  The component uses the 'Widget.scss' stylesheet for styling.

  Components:
  - DoctorWidget: Functional component rendering a widget with information based on the provided type.
*/

import "./Widget.scss";

const DoctorWidget = ({type}) => {
    let select;
    const amount = 100;
    const diff = 20;

    switch(type) {
        case "user":
            
            select = {
                title: "USERS",
                isCash: false,
                link: 'See all users',
                icon: (
                    <span className="icon" style={{color: "crimson", backgroundColor: "#FFCCCC",}}>
                        <i className="fa-regular fa-user" ></i>
                    </span>
                )
        };
        break;
        case "appointment":
            
                select = {
                    title: "APPOINTMENT",
                    link: 'See all appointment',
                    isCash: false,
                    icon: (
                        <span className="icon" style={{color: "darkblue", backgroundColor: "#CCCCFF",}}>
                            <i class="fa-regular fa-calendar-check"></i>
                        </span>
                    ) 
        };
        break;
        case "medicalrecord":
            
                select = {
                    title: "MEDICAL RECORD",
                    link: 'See all medical records',
                    isCash: false,
                    icon: (
                        <span className="icon" style={{color: "purple", backgroundColor: "#CC99FF",}}>
                            <i class="fa-solid fa-coins"></i>
                        </span>
                    )               
        };
        break;
        case "balance":
            
                select = {
                    title: "BALANCE",
                    link: 'See the balance',
                    isCash: true,
                    icon: (
                        <span className="icon" style={{color: "green", backgroundColor: "#CCFFCC",}}>
                            <i class="fa-brands fa-ethereum"></i>
                        </span>
                    )               
        };
        break;
        default:
        break;
    }

    return (
        <div className="doctor-widget">
            <div className='left'>
                <span className="title">{select.title}</span>
                <span className="count">{select.isCash && "$"} {amount}</span>
                <span className="link">{select.link}</span>               
            </div>
            <div className='right'>             
                <div className="percentage positive">
                    <i className="fa-solid fa-angle-up"></i>
                    {diff}%
                </div>
                {select.icon}
            </div>           
        </div>
    )
}

export default DoctorWidget;