import Sidebar from './Sidenav'
import style from './doctorstyle.module.css';

function DoctorLayout({children}) {
    return (
        <div className={style.LOcontainer}>
            <Sidebar/>
            <div className={style.main}> {children} </div>
        </div>
    );
}

export default DoctorLayout;