/*
  File: DoctorCharts.js

  Description:
  This file defines the DoctorCharts component, displaying a responsive area chart representing the last 5 months' appointment data.
  The component uses the 'DoctorCharts.scss' stylesheet for styling.

  Components:
  - DoctorCharts: Functional component rendering the area chart.
*/

import './DoctorCharts.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: "August", Total: 50 },
  { name: "September", Total: 75 },
  { name: "October", Total: 47 },
  { name: "November", Total: 100 },
  { name: "December", Total: 80 },

];

const DoctorCharts = () => {
    
    return (
        <div className="doctorcharts">
          <h2 className='title'>Last 5 Months Appointment</h2>
                <ResponsiveContainer width="100%" aspect={3/1}>
                  <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className='cartegrid'/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
        </div>
    )
}

export default DoctorCharts;