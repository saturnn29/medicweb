import Header from './Header'
import Footer from './Footer'

function homelayout({children}) {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}

export default homelayout;