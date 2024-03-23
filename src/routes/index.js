import homelayout from "../Components/Layout/homelayout";
import DoctorLayout from "../Components/Layout/doctorlayout";
import Userlayout from "../Components/Layout/userlayout";

//Doctor Pages
import Dashboard from "../Pages/Doctor/Dashboard/Dashboard";
import MedicalRecord from "../Pages/Doctor/MedicalRecord/MedicalRecord";
import DoctorDetails from "../Pages/Doctor/Information/information";
import Appointment from "../Pages/Doctor/Appointment/appointment";
import Contact from "../Pages/Doctor/Contact/contact";
import Edit from "../Pages/Doctor/Appointment/EditAppointment";
import SearchPa from "../Pages/Doctor/MedicalRecord/Form/SearchPa";

//Patient Pages
import MedicalSummary from "../Pages/Patient/MedicalSummary/MedicalSummary";
import AppointmentP from "../Pages/Patient/AppointmentP/AppointmentP";
import Bill from "../Pages/Patient/Myfinancials/bill";
import TreatmentPlan from "../Pages/Patient/TreatmentPlan/treatmentplan";
import Wallet from "../Pages/Patient/Wallet/wallet";

import Login from "../Pages/LoginSignup/login"
import Signup from "../Pages/LoginSignup/signup";

//Home Page
import Home from "../Pages/Home/home";
import Services from '../Pages/Home/services';
import doctorList from "../Pages/Home/doctorList";
import bookAppointment from "../Pages/Home/bookAppointment"
import EditPatientInfo from "../Pages/Doctor/MedicalRecord/Form/EditPI";

const publicRoutes = [
    { path: '/', component: Home, layout: homelayout},

    { path: '/doctor/home', component: Dashboard, layout: DoctorLayout},
    { path: '/doctor/medicalrecord', component: MedicalRecord, layout: DoctorLayout},
    { path: '/doctor/information', component: DoctorDetails, layout: DoctorLayout},
    { path: '/doctor/appointment', component: Appointment, layout: DoctorLayout},
    { path: '/doctor/contact', component: Contact, layout: DoctorLayout},
    { path: '/doctor/edit/:appId', component: Edit, layout: DoctorLayout},
    { path: '/doctor/searchpatient', component: SearchPa, layout: DoctorLayout},
    { path: '/patient/edit/:PID', component: EditPatientInfo, layout: DoctorLayout},
    
    { path: '/patient/home', component: MedicalSummary, layout: Userlayout},
    { path: '/patient/appointment', component: AppointmentP, layout: Userlayout},
    { path: '/patient/finance', component: Bill, layout: Userlayout},
    { path: '/patient/treatment', component: TreatmentPlan, layout: Userlayout},
    { path: '/patient/wallet', component: Wallet, layout: Userlayout},

    { path: '/login', component: Login, layout: null},
    { path: '/signup', component: Signup, layout: null},

    { path: '/home', component: Home, layout: homelayout },
    { path: '/services', component: Services, layout: homelayout },
    { path: '/doctorList', component: doctorList, layout: homelayout },
    { path: '/bookAppointment', component: bookAppointment, layout: homelayout }
];

const privateRoutes = [

]

export { publicRoutes, privateRoutes}