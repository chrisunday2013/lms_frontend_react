import {Link, useParams} from 'react-router-dom';

function Footer(){
    return (
    <footer className="py-3 my-5">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Home</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Contact Us</Link></li>
        <li className="nav-item"><Link to="/faq" className="nav-link px-2 text-muted">FAQs</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Support</Link></li>
        </ul>
    <p className="text-center text-muted">© 2022 Uclassic Dev</p>
  </footer>
    )
}

export default Footer;