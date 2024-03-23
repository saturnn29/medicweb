import Counter from "../../Patient/Myfinancials/contact";
import withAuth from "../../withAuth.js";

function Contact() {
    return <Counter/>;
}

export default withAuth(Contact, 'doctor');