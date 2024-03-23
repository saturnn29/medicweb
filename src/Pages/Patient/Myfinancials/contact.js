import React, { Component } from 'react';
import "./contact.css";

 
class Counter extends Component {
    
    
    render() { 
        
        return (
        <div className = 'contact-page' > 
           <h1 className='contact-h1'>Contacts</h1>
            <div className='contact-tableContainer'>
            <table className='contact-table'>
                <thead className='contact-thead'>
                    <tr>
                        <th>PID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {data.map((a, i) => (
                    <tbody className='contact-tbody'>
                        <tr className='contact-tr'>
                            <th className='contact-td'>{a.img}</th>
                            <th className='contact-td'>{a.name}</th>
                            <th className='contact-td'>{a.phone}</th>
                            <th className='contact-td'>{a.email}</th>
                        </tr>
                    </tbody>
                ))}
                
            </table>
            </div>
            
           
        <div className="contact-box">
            <div className='contact-box2'>
                <h3>Contact us</h3>
                <a>80 Duy Tan, Cau Giay, Ha Noi</a><br></br>
                <a href="https://cornhub.website/" style={{ color: 'white' }}>Gmail: assignment1@gmail.com</a><br></br>
                <a href="#" style={{ color: 'white' }}>Hotline: 115</a>
            </div>
        </div>
            


        </div>
        );

    }
}

const data =[
    {
        img : 'img',
        name: 'Minos',
        phone: '0969696969',
        email:'MinosPrime@Ultrakill.com'

    },
    {
        img : 'img',
        name: 'Minos',
        phone: '0969696969',
        email:'MinosPrime@Ultrakill.com'

    },
    {
        img : 'img',
        name: 'Minos',
        phone: '0969696969',
        email:'MinosPrime@Ultrakill.com'

    },
    {
        img : 'img',
        name: 'Minos',
        phone: '0969696969',
        email:'MinosPrime@Ultrakill.com'

    },{
        img : 'img',
        name: 'Minos',
        phone: '0969696969',
        email:'MinosPrime@Ultrakill.com'

    },{
        img : 'img',
        name: 'Minos',
        phone: '0969696969',
        email:'MinosPrime@Ultrakill.com'

    },
]

export default Counter;