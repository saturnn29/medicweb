import Sidebar from './Sidenav'
import pstyle from './patientstyle.module.css';

function Userlayout({children}) {
    return (
        <div className={pstyle.LOcontainer}>
            <Sidebar/>
            <div className={pstyle.main}> {children} </div>
        </div>
    );
}

export default Userlayout;