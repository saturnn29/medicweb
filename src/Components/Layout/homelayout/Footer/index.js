import './styleFooter.css'; 

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">affiliate program</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">refund policy</a></li>
                            <li><a href="#">payment options</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>contact us</h4>
                        <ul>
                            <li><a href="#"><i className="fas fa-phone"></i> 123456789</a></li>
                            <li><a href="https://gmail.com"><i className="fas fa-envelope"></i> clonemail@gmail.com</a></li>
                            <li><a href="https://bit.ly/hanoilocation"><i className="fas fa-map-marker-alt"></i> Hanoi, Vietnam</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
