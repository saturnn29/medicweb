import React, { useState } from 'react';
import {FaBars,}from "react-icons/fa";
import { MdOutlineMedicalInformation, MdMeetingRoom } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { RiBillFill } from "react-icons/ri";
import { RxActivityLog } from "react-icons/rx";

import { NavLink } from 'react-router-dom';
import pstyle from '../patientstyle.module.css';


const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/patient/home",
            name:"Medical Summary",
            icon:<MdOutlineMedicalInformation/>
        },
        {
            path:"/patient/treatment",
            name:"Treatment Plan",
            icon:<RxActivityLog/>
        },
        {
            path:"/patient/finance",
            name:"My Finance",
            icon:<RiBillFill/>
        },
        {
            path:"/patient/appointment",
            name:"Appointment",
            icon:<MdMeetingRoom/>
        },
        {
            path:"/patient/wallet",
            name:"Wallet",
            icon:<CiWallet/>
        },
    ]
    return (
        <div className={pstyle.SNcontainer}>
           <div style={{width: isOpen ? "250px" : "50px"}} className={pstyle.sidebar}>
               <div className={pstyle.top_section}>
                   <h1 style={{display: isOpen ? "block" : "none"}} className={pstyle.logo}>AuspexCare</h1>
                   <div style={{marginLeft: isOpen ? "10px" : "0px"}} className={pstyle.bars}>
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className={pstyle.link} activeclassName={pstyle.active}>
                           <div className={pstyle.icon}>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={pstyle.link_text}>{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
        </div>
    );
};

export default Sidebar;