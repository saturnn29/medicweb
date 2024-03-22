// Importing necessary components and styles
import './dashboard.scss';
import DoctorWidget from './Widget/Widget';
import Features from './Features/Features';
import DoctorCharts from './Charts/DoctorCharts';
import TransactionTable from './Table/Table';
import withAuth from "../../withAuth.js";

// Dashboard component
const Dashboard = () => {
    return (
        <div className="doctordash">
            {/* Main container for the doctor dashboard */}
            <div className='doctor-dashboard'>
                <div className='doctor-dashboard-container'>
                    {/* Widgets section */}
                    <div className='doctor-widgets'>
                        {/* Display user-related information */}
                        <DoctorWidget type="user"/>
                        
                        {/* Display appointment-related information */}
                        <DoctorWidget type="appointment"/>
                        
                        {/* Display medical record-related information */}
                        <DoctorWidget type="medicalrecord"/>
                        
                        {/* Display balance-related information */}
                        <DoctorWidget type="balance"/>
                    </div>
                    
                    {/* Charts section */}
                    <div className='charts'>
                        {/* Display overall features and statistics */}
                        <Features/>
                        
                        {/* Display charts for doctor-related data */}
                        <DoctorCharts title="Last 5 Months Revenue"/>
                    </div>
                </div>
            </div>

            {/* Transaction table section */}
            <div className="dashtable">
                {/* Display a table with the latest transactions */}
                <TransactionTable/>
            </div>
        </div>
    );
}

export default withAuth(Dashboard, 'doctor');